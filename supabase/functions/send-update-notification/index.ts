import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface UpdateNotificationRequest {
  updateId: string;
  title: string;
  description?: string;
}

interface WebhookPayload {
  type: 'INSERT';
  table: string;
  record: {
    id: string;
    title: string;
    description?: string;
    created_at: string;
    created_by?: string;
  };
  schema: string;
  old_record: null;
}

// HTML sanitization to prevent XSS in email content
function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function sendNotificationEmails(
  supabase: any,
  updateId: string,
  title: string,
  description: string | null,
  siteUrl: string
) {
  // Sanitize inputs for HTML
  const safeTitle = escapeHtml(title);
  const safeDescription = description ? escapeHtml(description) : null;

  // Get all registered users
  const { data: users, error: usersError } = await supabase.auth.admin.listUsers();
  
  if (usersError) {
    console.error("Error fetching users:", usersError);
    throw usersError;
  }

  console.log(`Found ${users.users.length} registered users`);

  // Send email to each user
  const emailPromises = users.users
    .filter((user: any) => user.email) // Only users with email
    .map(async (user: any) => {
      try {
        const emailResponse = await resend.emails.send({
          from: "Deforce Familiegeschiedenis <onboarding@resend.dev>",
          to: [user.email!],
          subject: `🆕 Site Update: ${safeTitle}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="font-family: Georgia, serif; background-color: #f5f5dc; padding: 20px; margin: 0;">
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #8B4513; margin: 0; font-size: 28px;">🏠 Deforce Familiegeschiedenis</h1>
                  <p style="color: #666; margin-top: 10px;">Nieuwe update beschikbaar!</p>
                </div>
                
                <div style="border-left: 4px solid #8B4513; padding-left: 20px; margin-bottom: 30px;">
                  <h2 style="color: #333; margin: 0 0 10px 0;">${safeTitle}</h2>
                  ${safeDescription ? `<p style="color: #666; margin: 0; line-height: 1.6;">${safeDescription}</p>` : ''}
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                  <a href="${siteUrl}" 
                     style="display: inline-block; background-color: #8B4513; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                    Bekijk de update
                  </a>
                </div>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                
                <p style="color: #999; font-size: 12px; text-align: center; margin: 0;">
                  Je ontvangt deze e-mail omdat je geregistreerd bent op de Deforce familiegeschiedenis website.
                </p>
              </div>
            </body>
            </html>
          `,
        });
        console.log(`Email sent to ${user.email}:`, emailResponse);
        return { email: user.email, success: true };
      } catch (emailError) {
        console.error(`Failed to send email to ${user.email}:`, emailError);
        return { email: user.email, success: false, error: emailError };
      }
    });

  const results = await Promise.all(emailPromises);
  const successCount = results.filter((r: any) => r.success).length;
  const failCount = results.filter((r: any) => !r.success).length;

  console.log(`Notification results: ${successCount} sent, ${failCount} failed`);

  return { successCount, failCount };
}

// Compute HMAC-SHA256 signature for webhook verification
async function computeHmacSha256(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);
  
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const signature = await crypto.subtle.sign("HMAC", cryptoKey, messageData);
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-update-notification function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const siteUrl = 'https://boekdeforce600.lovable.app';

    const body = await req.json();
    
    // Check if this is a webhook call from database trigger
    if (body.type === 'INSERT' && body.table === 'site_updates' && body.record) {
      console.log("Received database webhook for new site update");
      
      // Verify HMAC signature for webhook calls
      const providedSignature = req.headers.get('X-Webhook-Signature');
      if (!providedSignature) {
        console.error("Missing webhook signature header");
        return new Response(
          JSON.stringify({ error: 'Missing webhook signature' }),
          { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      
      // Fetch the shared secret from database using service role
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
      const { data: secretData, error: secretError } = await supabaseAdmin
        .from('webhook_secrets')
        .select('secret')
        .eq('purpose', 'send_update_notification')
        .single();
      
      if (secretError || !secretData?.secret) {
        console.error("Failed to fetch webhook secret:", secretError?.message);
        return new Response(
          JSON.stringify({ error: 'Internal configuration error' }),
          { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      
      // Compute expected signature from the raw body
      // Note: PostgreSQL sends the payload as JSONB, so we need to match its serialization
      const expectedSignature = await computeHmacSha256(secretData.secret, JSON.stringify(body));
      
      if (providedSignature !== expectedSignature) {
        console.error("Invalid webhook signature - request rejected");
        return new Response(
          JSON.stringify({ error: 'Invalid webhook signature' }),
          { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }
      
      console.log("Webhook signature verified successfully");
      
      const webhookPayload = body as WebhookPayload;
      const { id, title, description } = webhookPayload.record;
      
      if (!title) {
        console.error("Webhook payload missing title");
        return new Response(
          JSON.stringify({ error: 'Missing title in webhook payload' }),
          { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      }

      console.log("Processing webhook for update:", { id, title: title.substring(0, 50) });

      // Use service role for webhook calls
      const supabase = createClient(supabaseUrl, supabaseServiceKey);
      
      const { successCount, failCount } = await sendNotificationEmails(
        supabase,
        id,
        title,
        description || null,
        siteUrl
      );

      return new Response(
        JSON.stringify({ 
          success: true, 
          emailsSent: successCount, 
          emailsFailed: failCount,
          source: 'webhook'
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Regular authenticated admin call
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      console.error('Missing authorization header for manual call');
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Use anon key with auth header for user verification
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    const { data: { user }, error: authError } = await supabaseAuth.auth.getUser();
    if (authError || !user) {
      console.error('Authentication failed:', authError?.message);
      return new Response(
        JSON.stringify({ error: 'Invalid or expired authentication' }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Check if user has admin role
    const { data: roles, error: rolesError } = await supabaseAuth
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id);

    if (rolesError) {
      console.error('Error checking user roles:', rolesError);
      return new Response(
        JSON.stringify({ error: 'Failed to verify permissions' }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const isAdmin = roles?.some((r: any) => r.role === 'admin');
    if (!isAdmin) {
      console.error(`User ${user.id} attempted admin action without admin role`);
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Admin user ${user.id} sending update notifications`);

    const { updateId, title, description }: UpdateNotificationRequest = body;

    // Input validation
    if (!updateId || typeof updateId !== 'string' || updateId.length === 0 || updateId.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Invalid updateId' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!title || typeof title !== 'string' || title.length === 0 || title.length > 200) {
      return new Response(
        JSON.stringify({ error: 'Invalid title (required, max 200 characters)' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (description && (typeof description !== 'string' || description.length > 1000)) {
      return new Response(
        JSON.stringify({ error: 'Invalid description (max 1000 characters)' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Sending notification for update:", { updateId, title: title.substring(0, 50) });

    // Use service role for fetching all users
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { successCount, failCount } = await sendNotificationEmails(
      supabase,
      updateId,
      title,
      description || null,
      siteUrl
    );

    return new Response(
      JSON.stringify({ 
        success: true, 
        emailsSent: successCount, 
        emailsFailed: failCount,
        source: 'admin'
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in send-update-notification function:", error instanceof Error ? error.message : error);
    // Generic error message to prevent information leakage
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
