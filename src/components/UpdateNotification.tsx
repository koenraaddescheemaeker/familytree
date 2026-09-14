import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface UnreadUpdate {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
}

const UpdateNotification = () => {
  const { language } = useLanguage();
  const [unreadUpdates, setUnreadUpdates] = useState<UnreadUpdate[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const labels: Record<string, { title: string; markRead: string; noUpdates: string }> = {
    nl: { title: "Nieuwe updates", markRead: "Gelezen", noUpdates: "Geen nieuwe updates" },
    fr: { title: "Nouvelles mises à jour", markRead: "Lu", noUpdates: "Pas de nouvelles mises à jour" },
    en: { title: "New updates", markRead: "Mark as read", noUpdates: "No new updates" },
    es: { title: "Nuevas actualizaciones", markRead: "Leído", noUpdates: "Sin nuevas actualizaciones" },
    vls: { title: "Nieuwe updates", markRead: "Gelezen", noUpdates: "Geen nieuwe updates" },
    pcd: { title: "Nouviaus mij a jour", markRead: "Lu", noUpdates: "Pont ed nouviaus mij a jour" },
  };

  const label = labels[language] || labels.nl;

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        fetchUnreadUpdates(session.user.id);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUserId(session.user.id);
        fetchUnreadUpdates(session.user.id);
      } else {
        setUserId(null);
        setUnreadUpdates([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUnreadUpdates = async (uid: string) => {
    // Get all updates using public view to avoid exposing admin UUIDs
    const { data: allUpdates, error: updatesError } = await supabase
      .from("site_updates_public")
      .select("id, title, description, created_at")
      .order("created_at", { ascending: false });

    if (updatesError || !allUpdates) return;

    // Get read updates for this user
    const { data: readUpdates, error: readError } = await supabase
      .from("user_update_reads")
      .select("update_id")
      .eq("user_id", uid);

    if (readError) return;

    const readIds = new Set(readUpdates?.map(r => r.update_id) || []);
    const unread = allUpdates.filter(u => !readIds.has(u.id));
    setUnreadUpdates(unread);
  };

  const markAsRead = async (updateId: string) => {
    if (!userId) return;

    const { error } = await supabase
      .from("user_update_reads")
      .insert({ user_id: userId, update_id: updateId });

    if (!error) {
      setUnreadUpdates(prev => prev.filter(u => u.id !== updateId));
    }
  };

  const markAllAsRead = async () => {
    if (!userId) return;

    const inserts = unreadUpdates.map(u => ({
      user_id: userId,
      update_id: u.id,
    }));

    const { error } = await supabase
      .from("user_update_reads")
      .insert(inserts);

    if (!error) {
      setUnreadUpdates([]);
      setIsOpen(false);
    }
  };

  // Listen for new updates in realtime
  useEffect(() => {
    if (!userId) return;

    const channel = supabase
      .channel("updates-notification")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "site_updates",
        },
        (payload) => {
          const newUpdate = payload.new as UnreadUpdate;
          setUnreadUpdates(prev => [newUpdate, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  if (!userId) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-80 bg-card border border-border rounded-lg shadow-xl overflow-hidden"
          >
            <div className="p-4 border-b border-border bg-primary/5">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{label.title}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {unreadUpdates.length === 0 ? (
                <p className="p-4 text-muted-foreground text-center text-sm">
                  {label.noUpdates}
                </p>
              ) : (
                <>
                  {unreadUpdates.map((update) => (
                    <div
                      key={update.id}
                      className="p-3 border-b border-border last:border-b-0 hover:bg-muted/50"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-medium text-sm text-foreground">
                            {update.title}
                          </p>
                          {update.description && (
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {update.description}
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(update.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs"
                          onClick={() => markAsRead(update.id)}
                        >
                          {label.markRead}
                        </Button>
                      </div>
                    </div>
                  ))}
                  {unreadUpdates.length > 1 && (
                    <div className="p-3 bg-muted/30">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={markAllAsRead}
                      >
                        {label.markRead} ({unreadUpdates.length})
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-full w-12 h-12 shadow-lg"
        variant={unreadUpdates.length > 0 ? "default" : "secondary"}
      >
        <Bell className="w-5 h-5" />
        {unreadUpdates.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {unreadUpdates.length}
          </span>
        )}
      </Button>
    </div>
  );
};

export default UpdateNotification;
