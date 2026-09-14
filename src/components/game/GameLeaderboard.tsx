import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Crown, User, Clock, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Difficulty } from './DifficultySelector';

interface GameScore {
  id: string;
  display_name: string;
  score: number;
  difficulty: string;
  created_at: string;
}

interface GameLeaderboardProps {
  gameType: string;
  currentDifficulty: Difficulty;
}

const translations = {
  nl: {
    title: 'Leaderboard',
    rank: 'Rang',
    player: 'Speler',
    score: 'Score',
    date: 'Datum',
    noScores: 'Nog geen scores',
    beFirst: 'Wees de eerste!',
    loading: 'Laden...',
    showMore: 'Toon meer',
    easy: 'Makkelijk',
    normal: 'Normaal',
    hard: 'Moeilijk',
  },
  fr: {
    title: 'Classement',
    rank: 'Rang',
    player: 'Joueur',
    score: 'Score',
    date: 'Date',
    noScores: 'Pas encore de scores',
    beFirst: 'Soyez le premier!',
    loading: 'Chargement...',
    showMore: 'Afficher plus',
    easy: 'Facile',
    normal: 'Normal',
    hard: 'Difficile',
  },
  en: {
    title: 'Leaderboard',
    rank: 'Rank',
    player: 'Player',
    score: 'Score',
    date: 'Date',
    noScores: 'No scores yet',
    beFirst: 'Be the first!',
    loading: 'Loading...',
    showMore: 'Show more',
    easy: 'Easy',
    normal: 'Normal',
    hard: 'Hard',
  },
  es: {
    title: 'Clasificación',
    rank: 'Rango',
    player: 'Jugador',
    score: 'Puntuación',
    date: 'Fecha',
    noScores: 'Sin puntuaciones aún',
    beFirst: '¡Sé el primero!',
    loading: 'Cargando...',
    showMore: 'Mostrar más',
    easy: 'Fácil',
    normal: 'Normal',
    hard: 'Difícil',
  },
  pcd: {
    title: 'Classement',
    rank: 'Rang',
    player: 'Joueur',
    score: 'Score',
    date: 'Date',
    noScores: 'Pas co d\'scores',
    beFirst: 'Soyez l\'premier!',
    loading: 'Chargement...',
    showMore: 'Montrer pus',
    easy: 'Facile',
    normal: 'Normal',
    hard: 'Difficile',
  },
  vls: {
    title: 'Rangschikking',
    rank: 'Rang',
    player: 'Speler',
    score: 'Score',
    date: 'Datum',
    noScores: 'Nog geen scores',
    beFirst: 'Wees de eerste!',
    loading: 'Loaden...',
    showMore: 'Toon meer',
    easy: 'Gemakkelijk',
    normal: 'Normaal',
    hard: 'Moeilijk',
  },
  de: {
    title: 'Bestenliste',
    rank: 'Rang',
    player: 'Spieler',
    score: 'Punktzahl',
    date: 'Datum',
    noScores: 'Noch keine Punktzahlen',
    beFirst: 'Sei der Erste!',
    loading: 'Laden...',
    showMore: 'Mehr anzeigen',
    easy: 'Einfach',
    normal: 'Normal',
    hard: 'Schwer',
  },
};

const GameLeaderboard = ({ gameType, currentDifficulty }: GameLeaderboardProps) => {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations] || translations.nl;
  
  const [scores, setScores] = useState<GameScore[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(currentDifficulty);
  const [showCount, setShowCount] = useState(5);

  useEffect(() => {
    fetchScores();
  }, [gameType, selectedDifficulty]);

  const fetchScores = async () => {
    setLoading(true);
    try {
      // Use anonymized public view (no user_id exposed)
      const { data, error } = await supabase
        .from('game_scores_public')
        .select('*')
        .eq('game_type', gameType)
        .eq('difficulty', selectedDifficulty)
        .order('score', { ascending: false })
        .limit(20);

      if (error) throw error;
      setScores(data || []);
    } catch (error) {
      console.error('Error fetching scores:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'nl' || language === 'vls' ? 'nl-NL' : 
      language === 'fr' || language === 'pcd' ? 'fr-FR' : 
      language === 'es' ? 'es-ES' : 
      language === 'de' ? 'de-DE' : 'en-US', {
      day: 'numeric',
      month: 'short',
    });
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-medium text-muted-foreground">{rank}</span>;
    }
  };

  const getDifficultyLabel = (diff: Difficulty) => {
    switch (diff) {
      case 'easy': return t.easy;
      case 'normal': return t.normal;
      case 'hard': return t.hard;
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-gold" />
          <h3 className="font-semibold">{t.title}</h3>
        </div>
        
        {/* Difficulty tabs */}
        <div className="flex gap-1 bg-muted/50 rounded-lg p-1">
          {(['easy', 'normal', 'hard'] as Difficulty[]).map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                selectedDifficulty === diff
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {getDifficultyLabel(diff)}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-muted-foreground">
          {t.loading}
        </div>
      ) : scores.length === 0 ? (
        <div className="text-center py-8">
          <Trophy className="w-12 h-12 text-muted-foreground/30 mx-auto mb-2" />
          <p className="text-muted-foreground">{t.noScores}</p>
          <p className="text-sm text-muted-foreground/70">{t.beFirst}</p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            <AnimatePresence>
              {scores.slice(0, showCount).map((score, index) => (
                <motion.div
                  key={score.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    index === 0 ? 'bg-yellow-500/10 border border-yellow-500/30' :
                    index === 1 ? 'bg-gray-400/10 border border-gray-400/30' :
                    index === 2 ? 'bg-amber-600/10 border border-amber-600/30' :
                    'bg-muted/30'
                  }`}
                >
                  <div className="w-8 flex justify-center">
                    {getRankIcon(index + 1)}
                  </div>
                  
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <User className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="font-medium truncate">{score.display_name}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`font-bold ${
                      index === 0 ? 'text-yellow-500' :
                      index === 1 ? 'text-gray-400' :
                      index === 2 ? 'text-amber-600' :
                      'text-foreground'
                    }`}>
                      {score.score}
                    </span>
                    
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {formatDate(score.created_at)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {scores.length > showCount && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCount(prev => prev + 5)}
              className="w-full mt-3"
            >
              <ChevronDown className="w-4 h-4 mr-1" />
              {t.showMore}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default GameLeaderboard;
