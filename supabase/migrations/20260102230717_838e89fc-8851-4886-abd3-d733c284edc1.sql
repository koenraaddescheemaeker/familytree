-- Create leaderboard table for family member scores
CREATE TABLE public.leaderboard (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  total_score INTEGER NOT NULL DEFAULT 0,
  achievements_count INTEGER NOT NULL DEFAULT 0,
  sections_visited INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can view the leaderboard
CREATE POLICY "Leaderboard is publicly viewable"
ON public.leaderboard
FOR SELECT
USING (true);

-- Policy: Users can insert their own entry
CREATE POLICY "Users can create their own leaderboard entry"
ON public.leaderboard
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own entry
CREATE POLICY "Users can update their own leaderboard entry"
ON public.leaderboard
FOR UPDATE
USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_leaderboard_updated_at
BEFORE UPDATE ON public.leaderboard
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();