import { motion } from 'framer-motion';
import { Trophy, ArrowLeft, Medal, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame, GameBestScores, Difficulty } from '@/contexts/GameContext';

interface HighscoreOverviewProps {
  onBack: () => void;
}

const HighscoreOverview = ({ onBack }: HighscoreOverviewProps) => {
  const { t } = useLanguage();
  const { bestScores } = useGame();

  const games: { id: keyof GameBestScores; nameKey: string; icon: string; color: string }[] = [
    { id: 'memory', nameKey: 'game.memory.title', icon: '🧠', color: 'from-primary/20 to-primary/5 border-primary/30' },
    { id: 'timeline', nameKey: 'game.timeline.title', icon: '📅', color: 'from-blue-500/20 to-blue-500/5 border-blue-500/30' },
    { id: 'wordsearch', nameKey: 'game.wordsearch.title', icon: '🔍', color: 'from-purple-500/20 to-purple-500/5 border-purple-500/30' },
    { id: 'explorer', nameKey: 'game.explorer.title', icon: '🌳', color: 'from-green-500/20 to-green-500/5 border-green-500/30' },
    { id: 'namespelling', nameKey: 'game.namespelling.title', icon: '✍️', color: 'from-orange-500/20 to-orange-500/5 border-orange-500/30' },
  ];

  const difficulties: { key: Difficulty; labelKey: string; icon: React.ReactNode }[] = [
    { key: 'easy', labelKey: 'game.difficulty.easy', icon: <Star className="w-4 h-4 text-green-500" /> },
    { key: 'normal', labelKey: 'game.difficulty.normal', icon: <Medal className="w-4 h-4 text-gold" /> },
    { key: 'hard', labelKey: 'game.difficulty.hard', icon: <Zap className="w-4 h-4 text-red-500" /> },
  ];

  const getTotalScore = () => {
    let total = 0;
    games.forEach(game => {
      difficulties.forEach(diff => {
        total += bestScores[game.id][diff.key];
      });
    });
    return total;
  };

  const getGameTotal = (gameId: keyof GameBestScores) => {
    return difficulties.reduce((sum, diff) => sum + bestScores[gameId][diff.key], 0);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-background to-card">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('game.backToHub')}
          </Button>

          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-gold mb-4">
              <Trophy className="w-6 h-6" />
              <span className="uppercase tracking-widest text-sm font-medium">
                {t('game.highscores.title')}
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              {t('game.highscores.subtitle')}
            </h2>
            <p className="text-muted-foreground">
              {t('game.highscores.description')}
            </p>
          </div>

          {/* Total Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 rounded-2xl p-6 mb-8 text-center shadow-card"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="w-8 h-8 text-gold" />
              <span className="text-4xl font-bold text-foreground">{getTotalScore()}</span>
            </div>
            <p className="text-muted-foreground">{t('game.highscores.totalPoints')}</p>
          </motion.div>

          {/* Highscore Table */}
          <div className="space-y-4">
            {/* Header Row */}
            <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground">
              <div>{t('game.highscores.game')}</div>
              {difficulties.map(diff => (
                <div key={diff.key} className="flex items-center gap-1 justify-center">
                  {diff.icon}
                  <span>{t(diff.labelKey)}</span>
                </div>
              ))}
              <div className="text-right">{t('game.highscores.total')}</div>
            </div>

            {/* Game Rows */}
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className={`bg-gradient-to-br ${game.color} border rounded-xl p-4 shadow-card`}
              >
                {/* Mobile Layout */}
                <div className="md:hidden">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{game.icon}</span>
                    <span className="font-semibold text-foreground">{t(game.nameKey)}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {difficulties.map(diff => (
                      <div key={diff.key} className="bg-background/50 rounded-lg p-2">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          {diff.icon}
                          <span className="text-xs text-muted-foreground">{t(diff.labelKey)}</span>
                        </div>
                        <span className="font-bold text-foreground">
                          {bestScores[game.id][diff.key]}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-right text-sm">
                    <span className="text-muted-foreground">{t('game.highscores.total')}: </span>
                    <span className="font-bold text-gold">{getGameTotal(game.id)}</span>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden md:grid grid-cols-5 gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{game.icon}</span>
                    <span className="font-semibold text-foreground">{t(game.nameKey)}</span>
                  </div>
                  {difficulties.map(diff => (
                    <div
                      key={diff.key}
                      className="text-center bg-background/50 rounded-lg py-2 px-3"
                    >
                      <span className="font-bold text-foreground text-lg">
                        {bestScores[game.id][diff.key]}
                      </span>
                    </div>
                  ))}
                  <div className="text-right">
                    <span className="font-bold text-gold text-lg">{getGameTotal(game.id)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HighscoreOverview;
