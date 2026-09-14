DROP POLICY IF EXISTS "Anyone can read gedcom files" ON storage.objects;
CREATE POLICY "Authenticated users can read gedcom files"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'gedcom-files');

DROP POLICY IF EXISTS "Anyone can view grandparent photos" ON storage.objects;
CREATE POLICY "Approved grandparent photos are viewable"
ON storage.objects FOR SELECT TO anon, authenticated
USING (
  bucket_id = 'grootouder-fotos'
  AND (
    EXISTS (
      SELECT 1 FROM public.grootouder_verhalen g
      WHERE g.approved = true AND g.foto_url = storage.objects.name
    )
    OR public.has_role(auth.uid(), 'admin'::app_role)
    OR public.has_role(auth.uid(), 'moderator'::app_role)
  )
);

DROP POLICY IF EXISTS "Anyone can upload a grandparent photo" ON storage.objects;
CREATE POLICY "Anyone can upload a grandparent photo"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (
  bucket_id = 'grootouder-fotos'
  AND name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\.(jpg|jpeg|png|webp|heic|gif)$'
);

REVOKE EXECUTE ON FUNCTION public.check_tts_rate_limit(text, integer, integer) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.cleanup_old_rate_limits() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.increment_share_view_count(text) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.notify_update_subscribers() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated;