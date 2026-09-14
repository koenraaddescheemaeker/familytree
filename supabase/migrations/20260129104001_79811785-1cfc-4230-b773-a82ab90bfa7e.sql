-- Allow everyone (including anonymous users) to read site updates via the public view
CREATE POLICY "Anyone can view site updates"
ON public.site_updates
FOR SELECT
USING (true);