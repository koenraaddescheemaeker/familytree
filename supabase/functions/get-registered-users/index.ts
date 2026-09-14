import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  console.log("get-registered-users function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify the user is authenticated and is an admin
    const authHeader = req.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.error('Missing or invalid authorization header');
      return new Response(
        JSON.stringify({ error: 'Authentication required' }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Use anon key with auth header for user verification
    const supabaseAuth = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } }
    });

    // Use getClaims to verify the JWT token
    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsError } = await supabaseAuth.auth.getClaims(token);
    
    if (claimsError || !claimsData?.claims?.sub) {
      console.error('Authentication failed:', claimsError?.message || 'No valid claims');
      return new Response(
        JSON.stringify({ error: 'Invalid or expired authentication' }),
        { status: 401, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const userId = claimsData.claims.sub;

    // Check if user has admin role
    const { data: roles, error: rolesError } = await supabaseAuth
      .from('user_roles')
      .select('role')
      .eq('user_id', userId);

    if (rolesError) {
      console.error('Error checking user roles:', rolesError);
      return new Response(
        JSON.stringify({ error: 'Failed to verify permissions' }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const isAdmin = roles?.some((r: any) => r.role === 'admin');
    if (!isAdmin) {
      console.error(`User ${userId} attempted to access users list without admin role`);
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Admin user ${userId} fetching registered users`);

    // Use service role to fetch all users
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: usersData, error: usersError } = await supabase.auth.admin.listUsers();

    if (usersError) {
      console.error("Error fetching users:", usersError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch users' }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Map to only return necessary fields
    const users = usersData.users.map((u: any) => ({
      id: u.id,
      email: u.email,
      created_at: u.created_at,
      last_sign_in_at: u.last_sign_in_at,
    }));

    console.log(`Found ${users.length} registered users`);

    return new Response(
      JSON.stringify({ users }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in get-registered-users function:", error instanceof Error ? error.message : error);
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
