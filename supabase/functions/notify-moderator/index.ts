import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const MODERATOR_EMAIL = Deno.env.get("MODERATOR_EMAIL");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotifyRequest {
  name: string;
  message: string;
  location?: string;
  relation?: string;
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

const handler = async (req: Request): Promise<Response> => {
  console.log("notify-moderator function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Note: This endpoint does not require authentication since guestbook entries
    // can be submitted anonymously. Rate limiting is handled via the guestbook_entries
    // RLS policies and visitor_id tracking. The content is validated and sanitized below.

    const body = await req.json();
    const { name, message, location, relation }: NotifyRequest = body;

    // Input validation
    if (!name || typeof name !== 'string' || name.length === 0 || name.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Invalid name (required, max 100 characters)' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!message || typeof message !== 'string' || message.length === 0 || message.length > 2000) {
      return new Response(
        JSON.stringify({ error: 'Invalid message (required, max 2000 characters)' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (location && (typeof location !== 'string' || location.length > 200)) {
      return new Response(
        JSON.stringify({ error: 'Invalid location (max 200 characters)' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (relation && (typeof relation !== 'string' || relation.length > 200)) {
      return new Response(
        JSON.stringify({ error: 'Invalid relation (max 200 characters)' }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Validated guestbook entry notification request:", { name: name.substring(0, 20), location, relation });

    // Sanitize all user input for HTML
    const safeName = escapeHtml(name);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br>');
    const safeLocation = location ? escapeHtml(location) : null;
    const safeRelation = relation ? escapeHtml(relation) : null;

    // Get moderator email from environment (required)
    if (!MODERATOR_EMAIL) {
      console.error('MODERATOR_EMAIL environment variable not set');
      return new Response(
        JSON.stringify({ error: 'Notification service not configured' }),
        { status: 503, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    const moderatorEmail = MODERATOR_EMAIL;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; border-top: none; border-radius: 0 0 8px 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
            .value { margin-top: 5px; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #8B4513; margin-top: 10px; }
            .button { display: inline-block; background: #8B4513; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; color: #888; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">📖 Nieuw Gastboekbericht</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Familie Deforche/Deforce Genealogie</p>
            </div>
            <div class="content">
              <p>Er is een nieuw bericht achtergelaten in het gastboek dat op uw goedkeuring wacht.</p>
              
              <div class="field">
                <div class="label">Van</div>
                <div class="value"><strong>${safeName}</strong></div>
              </div>
              
              ${safeLocation ? `
              <div class="field">
                <div class="label">Locatie</div>
                <div class="value">${safeLocation}</div>
              </div>
              ` : ''}
              
              ${safeRelation ? `
              <div class="field">
                <div class="label">Relatie tot familie</div>
                <div class="value">${safeRelation}</div>
              </div>
              ` : ''}
              
              <div class="field">
                <div class="label">Bericht</div>
                <div class="message-box">${safeMessage}</div>
              </div>
              
              <a href="https://7959f7cb-58b5-4839-9b65-f2ae90a71da1.lovableproject.com/moderatie" class="button">
                Bekijk in Moderatiepaneel →
              </a>
            </div>
            <div class="footer">
              <p>Deze e-mail is automatisch verzonden door het gastboeksysteem.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Deforche Genealogie <onboarding@resend.dev>",
        to: [moderatorEmail],
        subject: `📖 Nieuw gastboekbericht van ${safeName}`,
        html: emailHtml,
      }),
    });

    const emailData = await emailResponse.json();
    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true, emailData }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error) {
    console.error("Error in notify-moderator function:", error instanceof Error ? error.message : error);
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
