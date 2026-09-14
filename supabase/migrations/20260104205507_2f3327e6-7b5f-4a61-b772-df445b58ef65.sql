-- Create site_visits table for tracking anonymous visits
CREATE TABLE public.site_visits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_id text NOT NULL,
  visited_at timestamp with time zone NOT NULL DEFAULT now(),
  page_path text DEFAULT '/'
);

-- Enable RLS
ALTER TABLE public.site_visits ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert a visit (anonymous tracking)
CREATE POLICY "Anyone can insert visits"
ON public.site_visits
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow anyone to read visit counts (for the counter)
CREATE POLICY "Anyone can read visits"
ON public.site_visits
FOR SELECT
TO anon, authenticated
USING (true);

-- Create index for faster counting
CREATE INDEX idx_site_visits_visitor_id ON public.site_visits(visitor_id);
CREATE INDEX idx_site_visits_visited_at ON public.site_visits(visited_at);