import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Send, Plus, Trash2, Users, Mail, BarChart3, TrendingUp, Globe, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SiteUpdate {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
}

interface RegisteredUser {
  id: string;
  email: string;
  created_at: string;
  last_sign_in_at: string | null;
}

interface VisitorStats {
  totalVisitors: number;
  todayVisitors: number;
  weeklyVisitors: number;
  recentVisits: { date: string; count: number }[];
  popularPages: { path: string; count: number }[];
}

const AdminUpdateManager = () => {
  const { language } = useLanguage();
  const [isAdmin, setIsAdmin] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updates, setUpdates] = useState<SiteUpdate[]>([]);
  const [users, setUsers] = useState<RegisteredUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("updates");
  const [stats, setStats] = useState<VisitorStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  const labels: Record<string, { 
    addUpdate: string; 
    title: string; 
    description: string; 
    send: string; 
    success: string;
    error: string;
    delete: string;
    dialogTitle: string;
    dialogDesc: string;
    usersTab: string;
    updatesTab: string;
    analyticsTab: string;
    registeredUsers: string;
    noUsers: string;
    lastLogin: string;
    registeredOn: string;
    totalVisitors: string;
    todayVisitors: string;
    weeklyVisitors: string;
    last7Days: string;
  }> = {
    nl: { 
      addUpdate: "Admin Beheer", 
      title: "Titel", 
      description: "Beschrijving (optioneel)", 
      send: "Verstuur update",
      success: "Update verstuurd en notificaties verzonden!",
      error: "Er ging iets mis bij het versturen",
      delete: "Verwijderen",
      dialogTitle: "Admin Beheer",
      dialogDesc: "Beheer updates, bekijk gebruikers en analytics.",
      usersTab: "Gebruikers",
      updatesTab: "Updates",
      analyticsTab: "Analytics",
      registeredUsers: "Geregistreerde gebruikers",
      noUsers: "Geen gebruikers gevonden",
      lastLogin: "Laatst ingelogd",
      registeredOn: "Geregistreerd op",
      totalVisitors: "Totaal bezoekers",
      todayVisitors: "Vandaag",
      weeklyVisitors: "Deze week",
      last7Days: "Laatste 7 dagen",
    },
    fr: { 
      addUpdate: "Gestion Admin", 
      title: "Titre", 
      description: "Description (optionnel)", 
      send: "Envoyer la mise à jour",
      success: "Mise à jour envoyée et notifications envoyées!",
      error: "Une erreur s'est produite",
      delete: "Supprimer",
      dialogTitle: "Gestion Admin",
      dialogDesc: "Gérez les mises à jour, utilisateurs et analytics.",
      usersTab: "Utilisateurs",
      updatesTab: "Mises à jour",
      analyticsTab: "Analytics",
      registeredUsers: "Utilisateurs enregistrés",
      noUsers: "Aucun utilisateur trouvé",
      lastLogin: "Dernière connexion",
      registeredOn: "Inscrit le",
      totalVisitors: "Visiteurs totaux",
      todayVisitors: "Aujourd'hui",
      weeklyVisitors: "Cette semaine",
      last7Days: "7 derniers jours",
    },
    en: { 
      addUpdate: "Admin Management", 
      title: "Title", 
      description: "Description (optional)", 
      send: "Send update",
      success: "Update sent and notifications delivered!",
      error: "Something went wrong",
      delete: "Delete",
      dialogTitle: "Admin Management",
      dialogDesc: "Manage updates, users and analytics.",
      usersTab: "Users",
      updatesTab: "Updates",
      analyticsTab: "Analytics",
      registeredUsers: "Registered users",
      noUsers: "No users found",
      lastLogin: "Last login",
      registeredOn: "Registered on",
      totalVisitors: "Total visitors",
      todayVisitors: "Today",
      weeklyVisitors: "This week",
      last7Days: "Last 7 days",
    },
    es: { 
      addUpdate: "Gestión Admin", 
      title: "Título", 
      description: "Descripción (opcional)", 
      send: "Enviar actualización",
      success: "¡Actualización enviada y notificaciones entregadas!",
      error: "Algo salió mal",
      delete: "Eliminar",
      dialogTitle: "Gestión Admin",
      dialogDesc: "Gestione actualizaciones, usuarios y analytics.",
      usersTab: "Usuarios",
      updatesTab: "Actualizaciones",
      analyticsTab: "Analytics",
      registeredUsers: "Usuarios registrados",
      noUsers: "No se encontraron usuarios",
      lastLogin: "Último acceso",
      registeredOn: "Registrado el",
      totalVisitors: "Visitantes totales",
      todayVisitors: "Hoy",
      weeklyVisitors: "Esta semana",
      last7Days: "Últimos 7 días",
    },
    vls: { 
      addUpdate: "Admin Beheer", 
      title: "Titel", 
      description: "Beschriving (optioneel)", 
      send: "Verstuur update",
      success: "Update verstuurd en notificaties verzonden!",
      error: "Er ging iets mis",
      delete: "Verwijderen",
      dialogTitle: "Admin Beheer",
      dialogDesc: "Beheer updates, bekijk gebruikers en analytics.",
      usersTab: "Gebruikers",
      updatesTab: "Updates",
      analyticsTab: "Analytics",
      registeredUsers: "Geregistreerde gebruikers",
      noUsers: "Geen gebruikers gevonden",
      lastLogin: "Laatst ingelogd",
      registeredOn: "Geregistreerd op",
      totalVisitors: "Totaal bezoekers",
      todayVisitors: "Vandaag",
      weeklyVisitors: "Deze week",
      last7Days: "Laatste 7 dagen",
    },
    pcd: { 
      addUpdate: "Gestion Admin", 
      title: "Titr", 
      description: "Deskription (optionel)", 
      send: "Invoyer l' mij a jour",
      success: "Mij a jour invoyée!",
      error: "Y a eu un problème",
      delete: "Effacher",
      dialogTitle: "Gestion Admin",
      dialogDesc: "Gérez les mij a jour, utilisateurs et analytics.",
      usersTab: "Utilisateurs",
      updatesTab: "Mij a jour",
      analyticsTab: "Analytics",
      registeredUsers: "Utilisateurs enregistrés",
      noUsers: "Aucun utilisateur trouvé",
      lastLogin: "Dernière connexion",
      registeredOn: "Inscrit le",
      totalVisitors: "Visiteurs totaux",
      todayVisitors: "Aujourd'hui",
      weeklyVisitors: "Cette semaine",
      last7Days: "7 derniers jours",
    },
  };

  const label = labels[language] || labels.nl;

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return;

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);

      const hasAdmin = roles?.some(r => r.role === "admin");
      setIsAdmin(hasAdmin || false);

      if (hasAdmin) {
        fetchUpdates();
      }
    };

    checkAdmin();
  }, []);

  const fetchUpdates = async () => {
    const { data } = await supabase
      .from("site_updates")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (data) {
      setUpdates(data);
    }
  };

  const fetchUsers = async () => {
    // Check if user still has a valid session
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      console.error("No active session for fetching users");
      setIsAdmin(false);
      return;
    }

    setIsLoadingUsers(true);
    try {
      const { data, error } = await supabase.functions.invoke("get-registered-users");
      if (error) throw error;
      if (data?.users) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const fetchStats = async () => {
    setIsLoadingStats(true);
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      weekAgo.setHours(0, 0, 0, 0);

      // Get total unique visitors
      const { count: totalCount } = await supabase
        .from("site_visits")
        .select("visitor_id", { count: "exact", head: true });

      // Get today's unique visitors
      const { data: todayData } = await supabase
        .from("site_visits")
        .select("visitor_id")
        .gte("visited_at", today.toISOString());
      
      const todayUnique = new Set(todayData?.map(v => v.visitor_id) || []).size;

      // Get this week's unique visitors
      const { data: weekData } = await supabase
        .from("site_visits")
        .select("visitor_id")
        .gte("visited_at", weekAgo.toISOString());
      
      const weekUnique = new Set(weekData?.map(v => v.visitor_id) || []).size;

      // Get daily counts for last 7 days
      const recentVisits: { date: string; count: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const dayStart = new Date();
        dayStart.setDate(dayStart.getDate() - i);
        dayStart.setHours(0, 0, 0, 0);
        
        const dayEnd = new Date(dayStart);
        dayEnd.setHours(23, 59, 59, 999);

        const { data: dayData } = await supabase
          .from("site_visits")
          .select("visitor_id")
          .gte("visited_at", dayStart.toISOString())
          .lte("visited_at", dayEnd.toISOString());

        const dayUnique = new Set(dayData?.map(v => v.visitor_id) || []).size;
        recentVisits.push({
          date: dayStart.toLocaleDateString("nl-BE", { weekday: "short", day: "numeric" }),
          count: dayUnique,
        });
      }

      // Get popular pages
      const { data: pageData } = await supabase
        .from("site_visits")
        .select("page_path");

      const pageCounts: Record<string, number> = {};
      pageData?.forEach(visit => {
        const path = visit.page_path || "/";
        pageCounts[path] = (pageCounts[path] || 0) + 1;
      });

      const popularPages = Object.entries(pageCounts)
        .map(([path, count]) => ({ path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setStats({
        totalVisitors: totalCount || 0,
        todayVisitors: todayUnique,
        weeklyVisitors: weekUnique,
        recentVisits,
        popularPages,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsLoadingStats(false);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "users" && users.length === 0) {
      fetchUsers();
    }
    if (value === "analytics" && !stats) {
      fetchStats();
    }
  };


  const handleSubmit = async () => {
    if (!title.trim()) return;

    setIsSubmitting(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error("Not authenticated");

      // Insert the update
      const { data: updateData, error: insertError } = await supabase
        .from("site_updates")
        .insert({
          title: title.trim(),
          description: description.trim() || null,
          created_by: session.user.id,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      // Send email notifications via edge function
      const { error: notifyError } = await supabase.functions.invoke("send-update-notification", {
        body: {
          updateId: updateData.id,
          title: updateData.title,
          description: updateData.description,
        },
      });

      if (notifyError) {
        console.error("Notification error:", notifyError);
        // Don't throw - update was still created
      }

      toast({
        title: label.success,
        description: `${title}`,
      });

      setTitle("");
      setDescription("");
      setIsOpen(false);
      fetchUpdates();
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        title: label.error,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("site_updates")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchUpdates();
    }
  };

  if (!isAdmin) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-20 left-4 z-50 gap-2"
        >
          <Plus className="w-4 h-4" />
          {label.addUpdate}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>{label.dialogTitle}</DialogTitle>
          <DialogDescription>{label.dialogDesc}</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="updates" className="gap-2">
              <Send className="w-4 h-4" />
              {label.updatesTab}
            </TabsTrigger>
            <TabsTrigger value="users" className="gap-2">
              <Users className="w-4 h-4" />
              {label.usersTab}
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              {label.analyticsTab}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="updates" className="flex-1 overflow-auto">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">{label.title}</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Nieuwe functie toegevoegd..."
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">{label.description}</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Extra details over de update..."
                  rows={3}
                />
              </div>
              <Button
                onClick={handleSubmit}
                disabled={!title.trim() || isSubmitting}
                className="w-full gap-2"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "..." : label.send}
              </Button>

              {updates.length > 0 && (
                <div className="border-t pt-4 mt-4">
                  <h4 className="text-sm font-medium mb-2">Recente updates</h4>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {updates.map((update) => (
                      <div
                        key={update.id}
                        className="flex items-center justify-between p-2 bg-muted rounded text-sm"
                      >
                        <div>
                          <p className="font-medium">{update.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(update.created_at).toLocaleString()}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(update.id)}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="users" className="flex-1 overflow-auto">
            <div className="space-y-4">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Users className="w-4 h-4" />
                {label.registeredUsers} ({users.length})
              </h4>
              
              {isLoadingUsers ? (
                <div className="text-center py-8 text-muted-foreground">
                  Laden...
                </div>
              ) : users.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {label.noUsers}
                </div>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      className="p-3 bg-muted rounded text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{user.email}</span>
                      </div>
                      <div className="mt-1 text-xs text-muted-foreground space-y-0.5">
                        <p>{label.registeredOn}: {new Date(user.created_at).toLocaleDateString()}</p>
                        {user.last_sign_in_at && (
                          <p>{label.lastLogin}: {new Date(user.last_sign_in_at).toLocaleString()}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="flex-1 overflow-auto">
            <div className="space-y-4">
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchStats}
                  disabled={isLoadingStats}
                  className="gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingStats ? 'animate-spin' : ''}`} />
                  Vernieuwen
                </Button>
              </div>
              {isLoadingStats ? (
                <div className="text-center py-8 text-muted-foreground">
                  Laden...
                </div>
              ) : stats ? (
                <>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-muted rounded text-center">
                      <Globe className="w-5 h-5 mx-auto mb-1 text-primary" />
                      <p className="text-2xl font-bold">{stats.totalVisitors}</p>
                      <p className="text-xs text-muted-foreground">{label.totalVisitors}</p>
                    </div>
                    <div className="p-3 bg-muted rounded text-center">
                      <TrendingUp className="w-5 h-5 mx-auto mb-1 text-green-500" />
                      <p className="text-2xl font-bold">{stats.todayVisitors}</p>
                      <p className="text-xs text-muted-foreground">{label.todayVisitors}</p>
                    </div>
                    <div className="p-3 bg-muted rounded text-center">
                      <BarChart3 className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                      <p className="text-2xl font-bold">{stats.weeklyVisitors}</p>
                      <p className="text-xs text-muted-foreground">{label.weeklyVisitors}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">{label.last7Days}</h4>
                    <div className="space-y-1">
                      {stats.recentVisits.map((day, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <span className="w-16 text-muted-foreground">{day.date}</span>
                          <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ 
                                width: `${Math.max(5, (day.count / Math.max(...stats.recentVisits.map(d => d.count))) * 100)}%` 
                              }}
                            />
                          </div>
                          <span className="w-8 text-right font-medium">{day.count}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {stats.popularPages.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Populairste pagina's</h4>
                      <div className="space-y-1">
                        {stats.popularPages.map((page, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm">
                            <span className="flex-1 truncate text-muted-foreground">{page.path}</span>
                            <span className="font-medium">{page.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  Geen data beschikbaar
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdminUpdateManager;
