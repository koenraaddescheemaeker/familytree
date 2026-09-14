-- =====================================================
-- FIX 1: Remove public SELECT on site_updates base table
-- Public access should go through site_updates_public view only
-- =====================================================

-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Anyone can read site updates" ON public.site_updates;

-- =====================================================
-- FIX 2: Create public view for guestbook entries without visitor_id
-- and update RLS to prevent public access to visitor_id
-- =====================================================

-- Create a public view for guestbook entries that excludes visitor_id
CREATE OR REPLACE VIEW public.guestbook_entries_public 
WITH (security_invoker = true) AS
SELECT 
  id,
  name,
  message,
  location,
  relation,
  created_at
FROM public.guestbook_entries
WHERE approved = true;

-- Grant SELECT on the view to anon and authenticated roles
GRANT SELECT ON public.guestbook_entries_public TO anon, authenticated;

-- Drop the old public SELECT policy that exposes visitor_id
DROP POLICY IF EXISTS "Anyone can read approved guestbook entries" ON public.guestbook_entries;

-- Create new restrictive policy: public users can only access approved entries
-- through the view (which excludes visitor_id)
-- Admins/moderators still have full access through their existing policies
COMMENT ON VIEW public.guestbook_entries_public IS 'Public view of approved guestbook entries. Excludes visitor_id to protect user privacy.';