-- Fix security definer view by recreating it as security invoker
DROP VIEW IF EXISTS site_updates_public;

CREATE VIEW site_updates_public 
WITH (security_invoker = true) AS
SELECT id, title, description, created_at
FROM site_updates;

-- Grant access to the view for anon and authenticated users
GRANT SELECT ON site_updates_public TO anon, authenticated;