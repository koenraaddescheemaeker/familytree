import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, X, Crown, User, LogIn } from 'lucide-react';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { useGame, ALL_SECTIONS } from '@/contexts/GameContext';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { sanitizeDisplayName } from '@/lib/sanitize';

interface LeaderboardEntry {
  id: string;
  display_name: string;
  total_score: number;
  achievements_count: number;
  sections_visited: number;
  updated_at: string;
}

interface LeaderboardEntryWithUserId extends LeaderboardEntry {
  user_id: string;
}

interface LeaderboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const SYNC_COOLDOWN_MS = 60000; // 1 minute cooldown between syncs
const STORAGE_KEY = 'leaderboard_last_sync';

const Leaderboard = ({ isOpen, onClose }: LeaderboardProps) => {
  const { t, language } = useLanguage();
  const { totalScore, achievements, visitedSections } = useGame();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [userEntry, setUserEntry] = useState<LeaderboardEntry | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const sectionsCount = visitedSections.size;

  // Check and update cooldown timer
  useEffect(() => {
    const checkCooldown = () => {
      const lastSync = localStorage.getItem(STORAGE_KEY);
      if (lastSync) {
        const elapsed = Date.now() - parseInt(lastSync, 10);
        const remaining = Math.max(0, SYNC_COOLDOWN_MS - elapsed);
        setCooldownRemaining(remaining);
      } else {
        setCooldownRemaining(0);
      }
    };

    checkCooldown();
    const interval = setInterval(checkCooldown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Check auth state
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Fetch leaderboard using anonymized public view
  useEffect(() => {
    if (!isOpen) return;

    const fetchLeaderboard = async () => {
      setLoading(true);
      
      // Fetch public leaderboard (no user_id exposed)
      const { data, error } = await supabase
        .from('leaderboard_public')
        .select('*')
        .order('total_score', { ascending: false })
        .limit(50);

      if (error) {
        console.error('Error fetching leaderboard:', error);
      } else {
        setEntries(data || []);
      }
      
      // If user is logged in, fetch their own entry separately to identify it
      if (user) {
        const { data: userData } = await supabase
          .from('leaderboard')
          .select('*')
          .eq('user_id', user.id)
          .single();
        setUserEntry(userData || null);
      } else {
        setUserEntry(null);
      }
      
      setLoading(false);
    };

    fetchLeaderboard();
  }, [isOpen, user]);

  // Sync score to leaderboard with rate limiting
  const syncScore = async () => {
    if (!user) {
      navigate('/auth');
      onClose();
      return;
    }

    // Check rate limit
    if (cooldownRemaining > 0) {
      const secondsRemaining = Math.ceil(cooldownRemaining / 1000);
      toast({
        title: t('leaderboard.rateLimited'),
        description: t('leaderboard.waitSeconds').replace('{seconds}', secondsRemaining.toString()),
        variant: 'destructive',
      });
      return;
    }

    setSyncing(true);
    const rawDisplayName = user.user_metadata?.display_name || user.email?.split('@')[0] || 'Anoniem';
    const displayName = sanitizeDisplayName(rawDisplayName);

    try {
      const { error } = await supabase
        .from('leaderboard')
        .upsert({
          user_id: user.id,
          display_name: displayName,
          total_score: totalScore,
          achievements_count: unlockedCount,
          sections_visited: sectionsCount,
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      // Set rate limit timestamp
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
      setCooldownRemaining(SYNC_COOLDOWN_MS);

      toast({
        title: t('leaderboard.synced'),
        description: t('leaderboard.syncedDesc'),
      });

      // Refresh leaderboard using public view
      const { data } = await supabase
        .from('leaderboard_public')
        .select('*')
        .order('total_score', { ascending: false })
        .limit(50);
      
      setEntries(data || []);
      
      // Refresh user's own entry
      const { data: userData } = await supabase
        .from('leaderboard')
        .select('*')
        .eq('user_id', user.id)
        .single();
      setUserEntry(userData || null);
    } catch (error: any) {
      console.error('Leaderboard sync error:', error);
      
      // Show user-friendly error message without exposing system details
      let userMessage = t('errors.saveFailed');
      if (error.message?.includes('policy')) {
        userMessage = t('errors.permissionDenied');
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        userMessage = t('errors.networkError');
      } else if (error.message?.includes('timeout')) {
        userMessage = t('errors.timeout');
      }
      
      toast({
        title: t('errors.unexpectedError'),
        description: userMessage,
        variant: 'destructive',
      });
    } finally {
      setSyncing(false);
    }
  };

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Crown className="w-5 h-5 text-gold" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 text-center text-muted-foreground font-medium">{position + 1}</span>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg md:max-h-[85vh] bg-card border border-border rounded-2xl shadow-elevated z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-foreground">
                    {t('leaderboard.title')}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {t('leaderboard.subtitle')}
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* User Score Card */}
            <div className="p-4 border-b border-border bg-accent/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{t('leaderboard.yourScore')}</p>
                    <p className="font-bold text-lg text-foreground">{totalScore} {t('game.points')}</p>
                  </div>
                </div>
                <Button 
                  onClick={syncScore} 
                  size="sm" 
                  disabled={syncing || (cooldownRemaining > 0 && !!user)}
                >
                  {syncing ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      {t('leaderboard.syncing')}
                    </span>
                  ) : cooldownRemaining > 0 && user ? (
                    <span className="flex items-center gap-2">
                      {Math.ceil(cooldownRemaining / 1000)}s
                    </span>
                  ) : user ? (
                    t('leaderboard.sync')
                  ) : (
                    <span className="flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      {t('leaderboard.loginToSync')}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {/* Leaderboard List */}
            <div className="flex-1 overflow-y-auto p-4">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                </div>
              ) : entries.length === 0 ? (
                <div className="text-center py-12">
                  <Trophy className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                  <p className="text-muted-foreground">{t('leaderboard.empty')}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t('leaderboard.beFirst')}</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {entries.map((entry, index) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`flex items-center gap-3 p-3 rounded-xl border ${
                        userEntry && entry.id === userEntry.id
                          ? 'bg-accent/10 border-accent/30'
                          : 'bg-secondary/30 border-border/50'
                      }`}
                    >
                      {/* Position */}
                      <div className="w-8 flex justify-center">
                        {getMedalIcon(index)}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {sanitizeDisplayName(entry.display_name || '')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {entry.achievements_count} {t('game.achievementsUnlocked')} • {entry.sections_visited}/{ALL_SECTIONS.length} {language === 'de' ? 'Bereiche' : language === 'en' ? 'sections' : language === 'fr' ? 'sections' : language === 'es' ? 'secciones' : 'secties'}
                        </p>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <p className="font-bold text-gold">{entry.total_score}</p>
                        <p className="text-xs text-muted-foreground">{t('game.points')}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Leaderboard;
