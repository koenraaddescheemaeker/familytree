-- Restrict site_visits table to admin-only read access
-- The table is used for visitor counting which should only be visible to admins

-- First, drop the existing overly permissive SELECT policy
DROP POLICY IF EXISTS "Anyone can read visits" ON public.site_visits;

-- Create admin-only SELECT policy
CREATE POLICY "Only admins can read visits" 
ON public.site_visits 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Keep the public INSERT policy since visitor tracking needs to work for all visitors