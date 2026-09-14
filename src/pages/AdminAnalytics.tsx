import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  Calendar, 
  Loader2, 
  Shield, 
  LogIn, 
  Eye, 
  EyeOff,
  ArrowLeft,
  RefreshCw,
  FileText,
  UserPlus,
  UserCheck
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

interface DailyVisit {
  date: string;
  visitors: number;
  pageviews: number;
}

interface PageStats {
  page: string;
  count: number;
}

interface VisitorTypeStats {
  name: string;
  value: number;
  color: string;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F', '#FFBB28', '#FF8042'];

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [hasAdminRole, setHasAdminRole] = useState<boolean | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Analytics data
  const [dailyVisits, setDailyVisits] = useState<DailyVisit[]>([]);
  const [pageStats, setPageStats] = useState<PageStats[]>([]);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [todayVisitors, setTodayVisitors] = useState(0);
  const [weekVisitors, setWeekVisitors] = useState(0);
  const [visitorTypeStats, setVisitorTypeStats] = useState<VisitorTypeStats[]>([]);
  const [newVisitorsCount, setNewVisitorsCount] = useState(0);
  const [returningVisitorsCount, setReturningVisitorsCount] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
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
      fetchAnalytics();
    }
  }, [hasAdminRole]);

  const checkUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);

      if (error) throw error;
      
      const isAdmin = data?.some(r => r.role === "admin") ?? false;
      setHasAdminRole(isAdmin);
      setIsLoading(false);
    } catch (error) {
      console.error("Error checking user role:", error);
      setHasAdminRole(false);
      setIsLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    setIsRefreshing(true);
    try {
      // Fetch ALL visits to determine returning visitors correctly
      const { data: allTimeData, error: allTimeError } = await supabase
        .from("site_visits")
        .select("visited_at, visitor_id");

      if (allTimeError) throw allTimeError;

      // Build a map of first visit date per visitor
      const firstVisitMap = new Map<string, Date>();
      allTimeData?.forEach(visit => {
        const visitDate = new Date(visit.visited_at);
        const existing = firstVisitMap.get(visit.visitor_id);
        if (!existing || visitDate < existing) {
          firstVisitMap.set(visit.visitor_id, visitDate);
        }
      });

      // Fetch daily visits for the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { data: visitsData, error: visitsError } = await supabase
        .from("site_visits")
        .select("visited_at, visitor_id, page_path")
        .gte("visited_at", thirtyDaysAgo.toISOString());

      if (visitsError) throw visitsError;

      // Process daily visits
      const dailyMap = new Map<string, { visitors: Set<string>, pageviews: number }>();
      const pageMap = new Map<string, number>();
      const allVisitors = new Set<string>();
      const todayStr = new Date().toISOString().split('T')[0];
      const todayVisitorSet = new Set<string>();
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      const weekVisitorSet = new Set<string>();

      // Track new vs returning visitors in the 30-day window
      const newVisitors = new Set<string>();
      const returningVisitors = new Set<string>();

      visitsData?.forEach(visit => {
        const dateStr = visit.visited_at.split('T')[0];
        const visitDate = new Date(visit.visited_at);
        
        // Daily aggregation
        if (!dailyMap.has(dateStr)) {
          dailyMap.set(dateStr, { visitors: new Set(), pageviews: 0 });
        }
        const dayData = dailyMap.get(dateStr)!;
        dayData.visitors.add(visit.visitor_id);
        dayData.pageviews += 1;

        // Page stats
        const pagePath = visit.page_path || '/';
        pageMap.set(pagePath, (pageMap.get(pagePath) || 0) + 1);

        // Total unique visitors
        allVisitors.add(visit.visitor_id);

        // Today's visitors
        if (dateStr === todayStr) {
          todayVisitorSet.add(visit.visitor_id);
        }

        // This week's visitors
        if (visitDate >= weekAgo) {
          weekVisitorSet.add(visit.visitor_id);
        }

        // Determine if new or returning visitor
        const firstVisit = firstVisitMap.get(visit.visitor_id);
        if (firstVisit && firstVisit >= thirtyDaysAgo) {
          // First visit was within the 30-day window = new visitor
          newVisitors.add(visit.visitor_id);
        } else {
          // First visit was before the 30-day window = returning visitor
          returningVisitors.add(visit.visitor_id);
        }
      });

      // Convert to arrays for charts
      const dailyArray: DailyVisit[] = Array.from(dailyMap.entries())
        .map(([date, data]) => ({
          date: formatDate(date),
          visitors: data.visitors.size,
          pageviews: data.pageviews
        }))
        .sort((a, b) => a.date.localeCompare(b.date));

      const pageArray: PageStats[] = Array.from(pageMap.entries())
        .map(([page, count]) => ({
          page: formatPageName(page),
          count
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Visitor type stats for pie chart
      const visitorTypes: VisitorTypeStats[] = [
        { name: 'Nieuwe bezoekers', value: newVisitors.size, color: '#22c55e' },
        { name: 'Terugkerende bezoekers', value: returningVisitors.size, color: '#3b82f6' }
      ];

      setDailyVisits(dailyArray);
      setPageStats(pageArray);
      setTotalVisitors(allVisitors.size);
      setTodayVisitors(todayVisitorSet.size);
      setWeekVisitors(weekVisitorSet.size);
      setVisitorTypeStats(visitorTypes);
      setNewVisitorsCount(newVisitors.size);
      setReturningVisitorsCount(returningVisitors.size);
      
    } catch (error) {
      console.error("Error fetching analytics:", error);
      toast.error("Fout bij laden van analytics");
    } finally {
      setIsRefreshing(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  };

  const formatPageName = (path: string) => {
    if (path === '/') return 'Home';
    return path.replace('/', '').replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase());
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      toast.success("Succesvol ingelogd");
    } catch (error: any) {
      toast.error(error.message || "Inloggen mislukt");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Laden...</p>
        </motion.div>
      </div>
    );
  }

  // Login form for unauthenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle>Admin Analytics</CardTitle>
              <CardDescription>
                Log in met je admin-account om toegang te krijgen tot de bezoekersstatistieken.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder="E-mailadres"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Wachtwoord"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <Button type="submit" className="w-full" disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <LogIn className="w-4 h-4 mr-2" />
                  )}
                  Inloggen
                </Button>
              </form>
              <div className="mt-4 text-center">
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
                  ← Terug naar home
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Access denied for non-admins
  if (hasAdminRole === false) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="mx-auto mb-4 p-4 bg-destructive/10 rounded-full w-fit">
            <Shield className="w-12 h-12 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Geen toegang</h1>
          <p className="text-muted-foreground mb-6">
            Je hebt geen admin-rechten om deze pagina te bekijken.
          </p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Terug naar home
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Link>
            </Button>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-xl font-semibold flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Analytics Dashboard
            </h1>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchAnalytics}
            disabled={isRefreshing}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Vernieuwen
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vandaag</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{todayVisitors}</div>
                <p className="text-xs text-muted-foreground">unieke bezoekers</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Deze Week</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weekVisitors}</div>
                <p className="text-xs text-muted-foreground">unieke bezoekers</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Laatste 30 Dagen</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalVisitors}</div>
                <p className="text-xs text-muted-foreground">unieke bezoekers</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-green-500/30 bg-green-500/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Nieuwe Bezoekers</CardTitle>
                <UserPlus className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{newVisitorsCount}</div>
                <p className="text-xs text-muted-foreground">
                  {totalVisitors > 0 ? Math.round((newVisitorsCount / totalVisitors) * 100) : 0}% van totaal
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border-blue-500/30 bg-blue-500/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Terugkerend</CardTitle>
                <UserCheck className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{returningVisitorsCount}</div>
                <p className="text-xs text-muted-foreground">
                  {totalVisitors > 0 ? Math.round((returningVisitorsCount / totalVisitors) * 100) : 0}% van totaal
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Charts */}
        <Tabs defaultValue="visitors" className="space-y-4">
          <TabsList>
            <TabsTrigger value="visitors">Bezoekers</TabsTrigger>
            <TabsTrigger value="returning">Nieuw vs Terugkerend</TabsTrigger>
            <TabsTrigger value="pages">Pagina's</TabsTrigger>
          </TabsList>

          <TabsContent value="visitors" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Dagelijkse Bezoekers</CardTitle>
                  <CardDescription>
                    Unieke bezoekers per dag over de afgelopen 30 dagen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={dailyVisits}>
                        <defs>
                          <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis 
                          dataKey="date" 
                          className="text-xs fill-muted-foreground"
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          className="text-xs fill-muted-foreground"
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                          labelStyle={{ color: 'hsl(var(--foreground))' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="visitors" 
                          stroke="hsl(var(--primary))" 
                          fillOpacity={1} 
                          fill="url(#colorVisitors)"
                          name="Bezoekers"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Paginaweergaven vs Bezoekers</CardTitle>
                  <CardDescription>
                    Vergelijking tussen totale paginaweergaven en unieke bezoekers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={dailyVisits}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis 
                          dataKey="date" 
                          className="text-xs fill-muted-foreground"
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          className="text-xs fill-muted-foreground"
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="visitors" fill="hsl(var(--primary))" name="Bezoekers" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="pageviews" fill="hsl(var(--muted-foreground))" name="Paginaweergaven" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="returning" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Bezoekers Verdeling
                    </CardTitle>
                    <CardDescription>
                      Nieuwe bezoekers vs terugkerende bezoekers (laatste 30 dagen)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={visitorTypeStats}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {visitorTypeStats.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Bezoekersstatistieken</CardTitle>
                    <CardDescription>
                      Gedetailleerde analyse van bezoekers
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-green-500/20">
                            <UserPlus className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">Nieuwe Bezoekers</p>
                            <p className="text-sm text-muted-foreground">Eerste bezoek in laatste 30 dagen</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">{newVisitorsCount}</p>
                          <p className="text-sm text-muted-foreground">
                            {totalVisitors > 0 ? Math.round((newVisitorsCount / totalVisitors) * 100) : 0}%
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-full bg-blue-500/20">
                            <UserCheck className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Terugkerende Bezoekers</p>
                            <p className="text-sm text-muted-foreground">Bezochten site eerder dan 30 dagen geleden</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{returningVisitorsCount}</p>
                          <p className="text-sm text-muted-foreground">
                            {totalVisitors > 0 ? Math.round((returningVisitorsCount / totalVisitors) * 100) : 0}%
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="font-medium mb-3">Retentie-indicator</h4>
                      <div className="relative h-4 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                          style={{ width: `${totalVisitors > 0 ? (newVisitorsCount / totalVisitors) * 100 : 0}%` }}
                        />
                        <div 
                          className="absolute top-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
                          style={{ 
                            left: `${totalVisitors > 0 ? (newVisitorsCount / totalVisitors) * 100 : 0}%`,
                            width: `${totalVisitors > 0 ? (returningVisitorsCount / totalVisitors) * 100 : 0}%` 
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-500" />
                          Nieuw
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-blue-500" />
                          Terugkerend
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="pages" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Top Pagina's</CardTitle>
                    <CardDescription>
                      Meest bezochte pagina's (laatste 30 dagen)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={pageStats} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis type="number" className="text-xs fill-muted-foreground" />
                          <YAxis 
                            dataKey="page" 
                            type="category" 
                            width={120}
                            className="text-xs fill-muted-foreground"
                            tick={{ fontSize: 11 }}
                          />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar 
                            dataKey="count" 
                            fill="hsl(var(--primary))" 
                            name="Bezoeken"
                            radius={[0, 4, 4, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Verdeling per Pagina</CardTitle>
                    <CardDescription>
                      Procentuele verdeling van paginabezoeken
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pageStats.slice(0, 7)}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ page, percent }) => `${page} (${(percent * 100).toFixed(0)}%)`}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="count"
                          >
                            {pageStats.slice(0, 7).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))',
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
              </Card>
              </motion.div>
            </div>

            {/* Page list */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Alle Pagina's
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {pageStats.map((page, index) => (
                      <div 
                        key={page.page}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-muted-foreground w-6">
                            #{index + 1}
                          </span>
                          <span className="font-medium">{page.page}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {page.count} bezoeken
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminAnalytics;
