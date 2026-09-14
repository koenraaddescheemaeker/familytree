import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Trash2, User, MapPin, Users, Calendar, Loader2, Shield, LogIn, LogOut, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  location: string | null;
  relation: string | null;
  created_at: string;
  approved: boolean;
}

const GastboekModeratie = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [hasAdminRole, setHasAdminRole] = useState<boolean | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [filter, setFilter] = useState<"pending" | "approved" | "all">("pending");

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer role check with setTimeout to prevent deadlock
        if (session?.user) {
          setTimeout(() => {
            checkUserRole(session.user.id);
          }, 0);
        } else {
          setHasAdminRole(null);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkUserRole(session.user.id);
      } else {
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (hasAdminRole === true) {
      fetchEntries();
    }
  }, [hasAdminRole, filter]);

  const checkUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);

      if (error) throw error;
      
      const isAdmin = data?.some(r => r.role === "admin" || r.role === "moderator") ?? false;
      setHasAdminRole(isAdmin);
    } catch (error) {
      console.error("Error checking role:", error);
      setHasAdminRole(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (error) throw error;
      
      toast.success("Ingelogd!");
    } catch (error: unknown) {
      console.error("Login error:", error);
      toast.error("Inloggen mislukt. Controleer uw gegevens.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setHasAdminRole(null);
    setEntries([]);
  };

  const fetchEntries = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("guestbook_entries")
        .select("*")
        .order("created_at", { ascending: false });

      if (filter === "pending") {
        query = query.eq("approved", false);
      } else if (filter === "approved") {
        query = query.eq("approved", true);
      }

      const { data, error } = await query;

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error("Error fetching entries:", error);
      toast.error("Fout bij ophalen berichten. Controleer uw rechten.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from("guestbook_entries")
        .update({ approved: true })
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Bericht goedgekeurd!");
      setEntries(entries.map(e => e.id === id ? { ...e, approved: true } : e));
    } catch (error) {
      console.error("Error approving entry:", error);
      toast.error("Fout bij goedkeuren");
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from("guestbook_entries")
        .update({ approved: false })
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Bericht afgekeurd");
      setEntries(entries.map(e => e.id === id ? { ...e, approved: false } : e));
    } catch (error) {
      console.error("Error rejecting entry:", error);
      toast.error("Fout bij afkeuren");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Weet u zeker dat u dit bericht wilt verwijderen?")) return;
    
    try {
      const { error } = await supabase
        .from("guestbook_entries")
        .delete()
        .eq("id", id);

      if (error) throw error;
      
      toast.success("Bericht verwijderd");
      setEntries(entries.filter(e => e.id !== id));
    } catch (error) {
      console.error("Error deleting entry:", error);
      toast.error("Fout bij verwijderen");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const pendingCount = entries.filter(e => !e.approved).length;
  const approvedCount = entries.filter(e => e.approved).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card border border-border rounded-2xl p-8 shadow-elevated">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h1 className="font-serif text-2xl text-primary mb-2">Gastboek Moderatie</h1>
              <p className="text-muted-foreground text-sm">Log in met uw beheerder-account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Wachtwoord
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 rounded-lg bg-background border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
              >
                {isLoggingIn ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <LogIn className="w-5 h-5" />
                )}
                Inloggen
              </button>
            </form>

            <button
              onClick={() => navigate("/")}
              className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Terug naar website
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Logged in but no admin/moderator role
  if (hasAdminRole === false) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-card border border-border rounded-2xl p-8 shadow-elevated text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
            <h1 className="font-serif text-2xl text-primary mb-2">Geen toegang</h1>
            <p className="text-muted-foreground text-sm mb-6">
              U bent ingelogd als <strong>{user.email}</strong>, maar dit account heeft geen beheerdersrechten.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-secondary text-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Uitloggen en opnieuw inloggen
              </button>
              <button
                onClick={() => navigate("/")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Terug naar website
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-accent" />
            <h1 className="font-serif text-xl text-primary">Gastboek Moderatie</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user.email}
            </span>
            <button
              onClick={() => navigate("/")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Website
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "pending"
                ? "bg-amber-500 text-white"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            Wachtend op goedkeuring
            {filter !== "pending" && pendingCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full">
                {pendingCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "approved"
                ? "bg-green-500 text-white"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            Goedgekeurd ({approvedCount})
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-accent text-accent-foreground"
                : "bg-secondary text-foreground hover:bg-secondary/80"
            }`}
          >
            Alles ({entries.length})
          </button>
        </div>

        {/* Entries */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : entries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              {filter === "pending" 
                ? "Geen berichten wachten op goedkeuring" 
                : filter === "approved"
                ? "Geen goedgekeurde berichten"
                : "Geen berichten gevonden"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {entries.map((entry) => (
                <motion.div
                  key={entry.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  className={`bg-card border rounded-xl p-5 shadow-sm ${
                    entry.approved ? "border-green-200" : "border-amber-200"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        entry.approved ? "bg-green-100" : "bg-amber-100"
                      }`}>
                        <User className={`w-5 h-5 ${entry.approved ? "text-green-600" : "text-amber-600"}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{entry.name}</h4>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          {entry.location && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {entry.location}
                            </span>
                          )}
                          {entry.relation && (
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {entry.relation}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        entry.approved 
                          ? "bg-green-100 text-green-700" 
                          : "bg-amber-100 text-amber-700"
                      }`}>
                        {entry.approved ? "Goedgekeurd" : "Wachtend"}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {formatDate(entry.created_at)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap mb-4 p-3 bg-secondary/50 rounded-lg">
                    {entry.message}
                  </p>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2">
                    {!entry.approved && (
                      <button
                        onClick={() => handleApprove(entry.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
                      >
                        <Check className="w-4 h-4" />
                        Goedkeuren
                      </button>
                    )}
                    {entry.approved && (
                      <button
                        onClick={() => handleReject(entry.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        Afkeuren
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      Verwijderen
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
};

export default GastboekModeratie;
