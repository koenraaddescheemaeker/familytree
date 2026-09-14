-- Create guestbook entries table
CREATE TABLE public.guestbook_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  location TEXT,
  relation TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  approved BOOLEAN NOT NULL DEFAULT true,
  visitor_id TEXT NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.guestbook_entries ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved entries
CREATE POLICY "Anyone can read approved guestbook entries" 
ON public.guestbook_entries 
FOR SELECT 
USING (approved = true);

-- Anyone can insert entries
CREATE POLICY "Anyone can insert guestbook entries" 
ON public.guestbook_entries 
FOR INSERT 
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_guestbook_created_at ON public.guestbook_entries(created_at DESC);

-- Add comment
COMMENT ON TABLE public.guestbook_entries IS 'Guestbook entries from visitors';