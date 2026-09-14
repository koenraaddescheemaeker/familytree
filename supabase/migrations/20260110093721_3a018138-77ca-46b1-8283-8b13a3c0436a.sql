-- Drop the security definer view and recreate as regular view with SECURITY INVOKER
DROP VIEW IF EXISTS public.shared_notes_public;

-- Create view with SECURITY INVOKER (default, explicit for clarity)
CREATE VIEW public.shared_notes_public 
WITH (security_invoker = true)
AS
SELECT 
  sn.id,
  sn.share_token,
  sn.created_at,
  sn.expires_at,
  sn.view_count,
  un.section_id,
  un.content,
  un.created_at as note_created_at,
  un.updated_at as note_updated_at
FROM public.shared_notes sn
JOIN public.user_notes un ON sn.note_id = un.id
WHERE sn.expires_at IS NULL OR sn.expires_at > now();

-- Grant public access to the view
GRANT SELECT ON public.shared_notes_public TO anon, authenticated;

-- Create a security definer function to fetch shared note by token (bypasses RLS safely)
CREATE OR REPLACE FUNCTION public.get_shared_note(p_share_token text)
RETURNS TABLE (
  id uuid,
  share_token text,
  created_at timestamp with time zone,
  expires_at timestamp with time zone,
  view_count integer,
  section_id text,
  content text,
  note_created_at timestamp with time zone,
  note_updated_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Input validation
  IF p_share_token IS NULL OR length(p_share_token) != 32 OR p_share_token !~ '^[a-f0-9]+$' THEN
    RETURN;
  END IF;

  -- Increment view count
  UPDATE public.shared_notes
  SET view_count = shared_notes.view_count + 1
  WHERE shared_notes.share_token = p_share_token
    AND (shared_notes.expires_at IS NULL OR shared_notes.expires_at > now());

  -- Return the shared note
  RETURN QUERY
  SELECT 
    sn.id,
    sn.share_token,
    sn.created_at,
    sn.expires_at,
    sn.view_count,
    un.section_id,
    un.content,
    un.created_at as note_created_at,
    un.updated_at as note_updated_at
  FROM public.shared_notes sn
  JOIN public.user_notes un ON sn.note_id = un.id
  WHERE sn.share_token = p_share_token
    AND (sn.expires_at IS NULL OR sn.expires_at > now());
END;
$$;