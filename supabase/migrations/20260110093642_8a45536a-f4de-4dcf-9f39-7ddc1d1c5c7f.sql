-- Create table for shared notes
CREATE TABLE public.shared_notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  note_id uuid NOT NULL REFERENCES public.user_notes(id) ON DELETE CASCADE,
  share_token text NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(16), 'hex'),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  expires_at timestamp with time zone,
  view_count integer NOT NULL DEFAULT 0,
  user_id uuid NOT NULL
);

-- Enable RLS
ALTER TABLE public.shared_notes ENABLE ROW LEVEL SECURITY;

-- Users can create share links for their own notes
CREATE POLICY "Users can create share links for their own notes"
ON public.shared_notes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Users can view their own share links
CREATE POLICY "Users can view their own share links"
ON public.shared_notes
FOR SELECT
USING (auth.uid() = user_id);

-- Users can delete their own share links
CREATE POLICY "Users can delete their own share links"
ON public.shared_notes
FOR DELETE
USING (auth.uid() = user_id);

-- Create a view for public access to shared notes (no user_id exposed)
CREATE VIEW public.shared_notes_public AS
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

-- Function to increment view count (called from edge function)
CREATE OR REPLACE FUNCTION public.increment_share_view_count(p_share_token text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.shared_notes
  SET view_count = view_count + 1
  WHERE share_token = p_share_token
    AND (expires_at IS NULL OR expires_at > now());
END;
$$;