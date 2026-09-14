import { useState, useRef, useEffect } from 'react';
import { Volume2, Loader2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';

interface ChtiAudioButtonProps {
  text: string;
  className?: string;
  showRemainingCount?: boolean;
}

// Get or create a visitor ID for anonymous rate limiting
const getVisitorId = (): string => {
  const storageKey = 'tts_visitor_id';
  let visitorId = localStorage.getItem(storageKey);
  
  if (!visitorId) {
    // Generate a random visitor ID
    visitorId = `v_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    localStorage.setItem(storageKey, visitorId);
  }
  
  return visitorId;
};

// Browser TTS fallback using Web Speech API
const speakWithBrowserTTS = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Browser TTS not supported'));
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR'; // French for best Ch'ti approximation
    utterance.rate = 0.9; // Slightly slower for clarity
    utterance.pitch = 1.0;

    // Try to find a French voice
    const voices = speechSynthesis.getVoices();
    const frenchVoice = voices.find(v => v.lang.startsWith('fr')) || voices[0];
    if (frenchVoice) {
      utterance.voice = frenchVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);

    speechSynthesis.speak(utterance);
  });
};

// Global state for remaining requests (shared across all buttons)
let globalRemaining: number | null = null;
let globalMax: number = 10;
const listeners = new Set<(remaining: number | null, max: number) => void>();

const updateGlobalRemaining = (remaining: number | null, max: number = 10) => {
  globalRemaining = remaining;
  globalMax = max;
  listeners.forEach(listener => listener(remaining, max));
};

export const ChtiAudioButton = ({ text, className = '', showRemainingCount = false }: ChtiAudioButtonProps) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [remaining, setRemaining] = useState<number | null>(globalRemaining);
  const [max, setMax] = useState<number>(globalMax);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Check auth status and fetch remaining count on mount
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const authenticated = !!session?.access_token;
      setIsAuthenticated(authenticated);

      // Fetch remaining count for anonymous users
      if (!authenticated) {
        try {
          const visitorId = getVisitorId();
          const response = await fetch(
            `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
                'x-visitor-id': visitorId,
              },
              body: JSON.stringify({ checkOnly: true, visitorId }),
            }
          );
          const data = await response.json();
          if (data.remaining !== undefined) {
            updateGlobalRemaining(data.remaining, data.max || 10);
          }
        } catch (error) {
          console.error('Failed to fetch remaining count:', error);
        }
      }
    };
    checkAuth();

    // Listen for global remaining updates
    const listener = (newRemaining: number | null, newMax: number) => {
      setRemaining(newRemaining);
      setMax(newMax);
    };
    listeners.add(listener);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      const authenticated = !!session?.access_token;
      setIsAuthenticated(authenticated);
      if (authenticated) {
        updateGlobalRemaining(null, 10);
      }
    });

    return () => {
      subscription.unsubscribe();
      listeners.delete(listener);
    };
  }, []);

  const handlePlay = async () => {
    if (isLoading || isPlaying) return;

    setIsLoading(true);
    setHasPlayed(false);

    try {
      // Get current session for auth
      const { data: { session } } = await supabase.auth.getSession();
      
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      };

      const body: Record<string, string> = { text };

      // Add auth header if authenticated, otherwise add visitor ID for rate limiting
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      } else {
        const visitorId = getVisitorId();
        headers['x-visitor-id'] = visitorId;
        body['visitorId'] = visitorId;
      }

      // Try ElevenLabs
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error('ElevenLabs failed');
      }

      const contentType = response.headers.get('content-type') || '';
      
      // Check if we got actual audio or an error JSON
      if (contentType.includes('application/json')) {
        const errorData = await response.json();
        if (errorData.status === 429) {
          updateGlobalRemaining(0, errorData.max || 10);
          toast.error(t('game.errors.rateLimited'));
          throw new Error('Rate limit exceeded');
        }
        throw new Error(errorData.error || 'ElevenLabs returned error');
      }

      // Update remaining count from headers
      const remainingHeader = response.headers.get('X-Remaining-Requests');
      const maxHeader = response.headers.get('X-Max-Requests');
      if (remainingHeader !== null) {
        updateGlobalRemaining(parseInt(remainingHeader, 10), parseInt(maxHeader || '10', 10));
      }

      const audioBlob = await response.blob();

      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }

      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => {
        setIsPlaying(false);
        setHasPlayed(true);
        URL.revokeObjectURL(audioUrl);
      };
      audio.onerror = () => {
        throw new Error('Audio playback failed');
      };

      setIsLoading(false);
      await audio.play();
    } catch (error) {
      // Fallback to browser TTS
      console.log('Falling back to browser TTS:', error);
      try {
        setIsLoading(false);
        setIsPlaying(true);
        await speakWithBrowserTTS(text);
        setIsPlaying(false);
        setHasPlayed(true);
      } catch (ttsError) {
        console.error('Browser TTS also failed:', ttsError);
        setIsPlaying(false);
        toast.error(t('game.errors.audioFailed'));
      }
    }
  };

  const showBadge = showRemainingCount && isAuthenticated === false && remaining !== null;

  return (
    <div className="inline-flex items-center gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={handlePlay}
        disabled={isLoading || isPlaying}
        className={`h-8 w-8 p-0 hover:bg-primary/10 ${className}`}
        title={isAuthenticated === false ? `Luister (${remaining ?? '?'}/${max} over)` : "Luister naar de uitspraak"}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        ) : isPlaying ? (
          <Volume2 className="h-4 w-4 text-primary animate-pulse" />
        ) : hasPlayed ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Volume2 className="h-4 w-4 text-muted-foreground hover:text-primary" />
        )}
      </Button>
      {showBadge && (
        <Badge 
          variant={remaining === 0 ? "destructive" : remaining <= 3 ? "secondary" : "outline"} 
          className="text-xs px-1.5 py-0 h-5"
        >
          {remaining}/{max}
        </Badge>
      )}
    </div>
  );
};

// Export a component to show remaining count separately
export const RemainingAudioRequests = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [remaining, setRemaining] = useState<number | null>(globalRemaining);
  const [max, setMax] = useState<number>(globalMax);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session?.access_token);
    };
    checkAuth();

    const listener = (newRemaining: number | null, newMax: number) => {
      setRemaining(newRemaining);
      setMax(newMax);
    };
    listeners.add(listener);

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session?.access_token);
    });

    return () => {
      subscription.unsubscribe();
      listeners.delete(listener);
    };
  }, []);

  if (isAuthenticated !== false || remaining === null) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Volume2 className="h-4 w-4" />
      <span>
        Audio verzoeken: <strong className={remaining === 0 ? 'text-destructive' : remaining <= 3 ? 'text-amber-500' : 'text-foreground'}>{remaining}/{max}</strong>
      </span>
      {remaining <= 3 && (
        <a href="/auth" className="text-primary hover:underline text-xs">
          Log in voor onbeperkt
        </a>
      )}
    </div>
  );
};
