-- Change default for approved to false (new entries need approval)
ALTER TABLE public.guestbook_entries 
ALTER COLUMN approved SET DEFAULT false;

-- Add policy for updating entries (for moderation)
CREATE POLICY "Authenticated users can update guestbook entries" 
ON public.guestbook_entries 
FOR UPDATE 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Add policy for deleting entries (for moderation)
CREATE POLICY "Authenticated users can delete guestbook entries" 
ON public.guestbook_entries 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- Allow authenticated users to read all entries (including unapproved)
CREATE POLICY "Authenticated users can read all guestbook entries" 
ON public.guestbook_entries 
FOR SELECT 
USING (auth.role() = 'authenticated');