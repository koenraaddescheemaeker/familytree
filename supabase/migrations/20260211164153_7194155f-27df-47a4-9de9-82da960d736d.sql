
-- Create storage bucket for GEDCOM files
INSERT INTO storage.buckets (id, name, public)
VALUES ('gedcom-files', 'gedcom-files', true)
ON CONFLICT (id) DO NOTHING;

-- Allow everyone to read/download GEDCOM files
CREATE POLICY "Anyone can read gedcom files"
ON storage.objects FOR SELECT
USING (bucket_id = 'gedcom-files');

-- Only admins can upload GEDCOM files
CREATE POLICY "Admins can upload gedcom files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'gedcom-files'
  AND public.has_role(auth.uid(), 'admin')
);

-- Only admins can update GEDCOM files
CREATE POLICY "Admins can update gedcom files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'gedcom-files'
  AND public.has_role(auth.uid(), 'admin')
);

-- Only admins can delete GEDCOM files
CREATE POLICY "Admins can delete gedcom files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'gedcom-files'
  AND public.has_role(auth.uid(), 'admin')
);
