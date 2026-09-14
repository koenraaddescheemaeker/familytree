-- Fix: Remove overly permissive RLS policy on tts_rate_limits
-- The edge function uses service role key which bypasses RLS, so public access is not needed

-- Drop the existing overly permissive policy
DROP POLICY IF EXISTS "Allow edge function access" ON public.tts_rate_limits;

-- Create a restrictive policy that blocks all public/anon access
-- Service role key will still work as it bypasses RLS
CREATE POLICY "Deny all public access"
ON public.tts_rate_limits
FOR ALL
TO anon, authenticated
USING (false)
WITH CHECK (false);