-- Create public view for site_updates without created_by field
-- This prevents exposure of admin user UUIDs while maintaining public access to update info

CREATE VIEW site_updates_public AS
SELECT id, title, description, created_at
FROM site_updates;

-- Grant access to the view for anon and authenticated users
GRANT SELECT ON site_updates_public TO anon, authenticated;