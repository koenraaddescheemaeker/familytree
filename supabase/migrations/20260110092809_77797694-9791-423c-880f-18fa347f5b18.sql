-- Create table for user favorites (saved sections)
CREATE TABLE public.user_favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  section_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, section_id)
);

-- Enable RLS
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- Policies for user_favorites
CREATE POLICY "Users can view their own favorites"
ON public.user_favorites
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own favorites"
ON public.user_favorites
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites"
ON public.user_favorites
FOR DELETE
USING (auth.uid() = user_id);

-- Create table for user notes
CREATE TABLE public.user_notes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  section_id TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_notes ENABLE ROW LEVEL SECURITY;

-- Policies for user_notes
CREATE POLICY "Users can view their own notes"
ON public.user_notes
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own notes"
ON public.user_notes
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own notes"
ON public.user_notes
FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own notes"
ON public.user_notes
FOR DELETE
USING (auth.uid() = user_id);

-- Add trigger for updated_at on notes
CREATE TRIGGER update_user_notes_updated_at
BEFORE UPDATE ON public.user_notes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();