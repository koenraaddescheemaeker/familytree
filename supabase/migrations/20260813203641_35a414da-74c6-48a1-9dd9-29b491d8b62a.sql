REVOKE EXECUTE ON FUNCTION public.check_tts_rate_limit(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.cleanup_old_rate_limits() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.increment_share_view_count(text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.notify_update_subscribers() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.get_shared_note(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_shared_note(text) TO anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.get_approved_grootouder_verhalen() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_approved_grootouder_verhalen() TO anon, authenticated;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO anon, authenticated, service_role;