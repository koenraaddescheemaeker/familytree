import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-visitor-id',
};

const MAX_REQUESTS_ANONYMOUS = 10;
const WINDOW_MINUTES = 60;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // NOTE: Some clients (and Lovable runtime overlays) treat non-2xx edge function responses as hard errors.
  // We therefore return 200 for "expected" upstream failures and include the intended status in the JSON body.
  const jsonError = (status: number, error: string, extra?: Record<string, unknown>) =>
    new Response(JSON.stringify({ error, status, ...(extra ?? {}) }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    // Check for authenticated user first
    const authHeader = req.headers.get('Authorization');
    let isAuthenticated = false;
    let userId: string | null = null;

    if (authHeader) {
      const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: authHeader } }
      });
      const { data: { user } } = await supabaseAuth.auth.getUser();
      if (user) {
        isAuthenticated = true;
        userId = user.id;
        console.log(`TTS request from authenticated user: ${userId}`);
      }
    }

    const body = await req.json().catch(() => ({}));
    const text = typeof body?.text === 'string' ? body.text : '';
    const voiceId = typeof body?.voiceId === 'string' ? body.voiceId : undefined;
    const visitorId = typeof body?.visitorId === 'string' ? body.visitorId : req.headers.get('x-visitor-id');
    const checkOnly = body?.checkOnly === true;

    // For check-only requests (just get remaining count)
    if (checkOnly && !isAuthenticated && visitorId) {
      const supabaseService = createClient(supabaseUrl, supabaseServiceKey);
      const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();
      
      const { data: usageData } = await supabaseService
        .from('tts_rate_limits')
        .select('request_count')
        .eq('visitor_id', visitorId)
        .gt('window_start', windowStart);
      
      const currentCount = usageData?.reduce((sum, row) => sum + row.request_count, 0) || 0;
      const remaining = Math.max(0, MAX_REQUESTS_ANONYMOUS - currentCount);
      
      return new Response(JSON.stringify({ remaining, max: MAX_REQUESTS_ANONYMOUS }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Input validation
    if (!text) {
      return jsonError(400, 'Text is required');
    }

    // Limit text length to prevent abuse (max 500 characters for TTS)
    if (text.length > 500) {
      return jsonError(400, 'Text exceeds maximum length of 500 characters');
    }

    // Validate voiceId format if provided (alphanumeric only)
    if (voiceId && !/^[a-zA-Z0-9]+$/.test(voiceId)) {
      return jsonError(400, 'Invalid voice ID format');
    }

    let remaining: number | null = null;

    // Rate limiting for anonymous users
    if (!isAuthenticated) {
      if (!visitorId) {
        return jsonError(400, 'Visitor ID is required for anonymous requests');
      }

      // Validate visitor ID format (should be a reasonable identifier)
      if (visitorId.length > 100 || !/^[a-zA-Z0-9_-]+$/.test(visitorId)) {
        return jsonError(400, 'Invalid visitor ID format');
      }

      // Use service role to check/update rate limits
      const supabaseService = createClient(supabaseUrl, supabaseServiceKey);
      
      // Get current count before checking
      const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();
      const { data: usageData } = await supabaseService
        .from('tts_rate_limits')
        .select('request_count')
        .eq('visitor_id', visitorId)
        .gt('window_start', windowStart);
      
      const currentCount = usageData?.reduce((sum, row) => sum + row.request_count, 0) || 0;
      
      // Check if limit exceeded
      if (currentCount >= MAX_REQUESTS_ANONYMOUS) {
        console.log(`Rate limit exceeded for visitor: ${visitorId}`);
        return new Response(JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later or log in for unlimited access.',
          status: 429,
          remaining: 0,
          max: MAX_REQUESTS_ANONYMOUS
        }), {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Insert new request record
      await supabaseService
        .from('tts_rate_limits')
        .insert({ visitor_id: visitorId, request_count: 1, window_start: new Date().toISOString() });

      remaining = MAX_REQUESTS_ANONYMOUS - currentCount - 1;
      console.log(`TTS request from anonymous visitor: ${visitorId}, remaining: ${remaining}`);
    }

    // Try connector secret first, fall back to manual secret
    const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY_1') || Deno.env.get('ELEVENLABS_API_KEY');

    if (!ELEVENLABS_API_KEY) {
      console.error('ELEVENLABS_API_KEY not configured');
      return jsonError(503, 'Text-to-speech service is not configured');
    }

    const resolvedVoiceId = voiceId || 'JBFqnCBsd6RMkjVDRZzb';
    console.log(`Generating TTS for text: "${text.substring(0, 50)}..." with voice: ${resolvedVoiceId}`);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${resolvedVoiceId}?output_format=mp3_44100_128`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error:', response.status, errorText);

      // Preserve upstream status when possible; map "unusual activity" to 429 to avoid generic 500s.
      const mappedStatus = errorText.includes('detected_unusual_activity') ? 429 : response.status;
      // Generic error message - detailed logging above for debugging
      return jsonError(mappedStatus, 'Text-to-speech service temporarily unavailable');
    }

    const audioBuffer = await response.arrayBuffer();
    console.log(`Successfully generated audio, size: ${audioBuffer.byteLength} bytes`);

    // Add remaining count header for anonymous users
    const responseHeaders: Record<string, string> = {
      ...corsHeaders,
      'Content-Type': 'audio/mpeg',
    };
    
    if (remaining !== null) {
      responseHeaders['X-Remaining-Requests'] = String(remaining);
      responseHeaders['X-Max-Requests'] = String(MAX_REQUESTS_ANONYMOUS);
    }

    return new Response(audioBuffer, { headers: responseHeaders });
  } catch (error) {
    console.error('Error in elevenlabs-tts function:', error instanceof Error ? error.message : error);
    // Generic error message to prevent information leakage
    return jsonError(500, 'An unexpected error occurred');
  }
});
