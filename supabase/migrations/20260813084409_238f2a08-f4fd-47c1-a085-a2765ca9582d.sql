CREATE TABLE public.grootouder_verhalen (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  naam text NOT NULL,
  woonplaats text,
  geboortejaar text,
  relatie text,
  email text,
  antwoorden jsonb NOT NULL DEFAULT '{}'::jsonb,
  foto_url text,
  approved boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT INSERT ON public.grootouder_verhalen TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.grootouder_verhalen TO authenticated;
GRANT ALL ON public.grootouder_verhalen TO service_role;

ALTER TABLE public.grootouder_verhalen ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a grandparent story"
ON public.grootouder_verhalen FOR INSERT TO anon, authenticated
WITH CHECK (approved = false);

CREATE POLICY "Admins and moderators can read all stories"
ON public.grootouder_verhalen FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'moderator'::app_role));

CREATE POLICY "Admins and moderators can update stories"
ON public.grootouder_verhalen FOR UPDATE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'moderator'::app_role));

CREATE POLICY "Admins and moderators can delete stories"
ON public.grootouder_verhalen FOR DELETE TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'moderator'::app_role));

CREATE TRIGGER update_grootouder_verhalen_updated_at
BEFORE UPDATE ON public.grootouder_verhalen
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.get_approved_grootouder_verhalen()
RETURNS TABLE(id uuid, naam text, woonplaats text, geboortejaar text, relatie text, antwoorden jsonb, foto_url text, created_at timestamp with time zone)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT g.id, g.naam, g.woonplaats, g.geboortejaar, g.relatie, g.antwoorden, g.foto_url, g.created_at
  FROM public.grootouder_verhalen g
  WHERE g.approved = true
  ORDER BY g.created_at DESC
$$;

GRANT EXECUTE ON FUNCTION public.get_approved_grootouder_verhalen() TO anon, authenticated;

CREATE POLICY "Anyone can view grandparent photos"
ON storage.objects FOR SELECT
USING (bucket_id = 'grootouder-fotos');

CREATE POLICY "Anyone can upload a grandparent photo"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'grootouder-fotos');