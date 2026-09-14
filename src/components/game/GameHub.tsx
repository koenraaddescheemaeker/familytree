import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Brain, Clock, Gamepad2, Star, Target, TreeDeciduous, GripVertical, Medal, Keyboard, Users, Headphones, HelpCircle, CircleDot } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import MemoryGame from './MemoryGame';
import TimeTravel from './TimeTravel';
import AchievementPanel from './AchievementPanel';
import FamilyTreeExplorer from './FamilyTreeExplorer';
import TimelinePuzzle from './TimelinePuzzle';
import HistoryQuiz from './HistoryQuiz';
import HighscoreOverview from './HighscoreOverview';
import NameSpellingChallenge from './NameSpellingChallenge';
import FamilyPhotoQuiz from './FamilyPhotoQuiz';
import ChtiAudioQuiz from './ChtiAudioQuiz';
import SpinTheWheel from './SpinTheWheel';
import { Difficulty } from './DifficultySelector';

type GameMode = 'hub' | 'memory' | 'timetravel' | 'achievements' | 'explorer' | 'timeline' | 'historyquiz' | 'highscores' | 'namespelling' | 'familyphoto' | 'chtiquiz' | 'spinwheel';

const GameHub = () => {
  const { t } = useLanguage();
  const { totalScore, achievements, getBestScore } = useGame();
  const [gameMode, setGameMode] = useState<GameMode>('hub');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  // Helper to get best score across all difficulties
  const getMaxBestScore = (game: 'memory' | 'quiz' | 'timeline' | 'explorer' | 'namespelling') => {
    return Math.max(
      getBestScore(game, 'easy'),
      getBestScore(game, 'normal'),
      getBestScore(game, 'hard')
    );
  };

  const games = [
    {
      id: 'memory',
      icon: Brain,
      titleKey: 'game.memory.title',
      descKey: 'game.memory.desc',
      bestScore: getMaxBestScore('memory'),
      color: 'from-primary/20 to-primary/5',
      borderColor: 'border-primary/30',
    },
    {
      id: 'timetravel',
      icon: Clock,
      titleKey: 'game.timetravel.title',
      descKey: 'game.timetravel.desc',
      bestScore: null,
      color: 'from-gold/20 to-gold/5',
      borderColor: 'border-gold/30',
    },
    {
      id: 'explorer',
      icon: TreeDeciduous,
      titleKey: 'game.explorer.title',
      descKey: 'game.explorer.desc',
      bestScore: getMaxBestScore('explorer'),
      color: 'from-green-500/20 to-green-500/5',
      borderColor: 'border-green-500/30',
    },
    {
      id: 'timeline',
      icon: GripVertical,
      titleKey: 'game.timeline.title',
      descKey: 'game.timeline.desc',
      bestScore: getMaxBestScore('timeline'),
      color: 'from-blue-500/20 to-blue-500/5',
      borderColor: 'border-blue-500/30',
    },
    {
      id: 'historyquiz',
      icon: HelpCircle,
      titleKey: 'game.quiz.title',
      descKey: 'game.quiz.desc',
      bestScore: getMaxBestScore('quiz'),
      color: 'from-purple-500/20 to-purple-500/5',
      borderColor: 'border-purple-500/30',
    },
    {
      id: 'namespelling',
      icon: Keyboard,
      titleKey: 'game.namespelling.title',
      descKey: 'game.namespelling.desc',
      bestScore: getMaxBestScore('namespelling'),
      color: 'from-orange-500/20 to-orange-500/5',
      borderColor: 'border-orange-500/30',
    },
    {
      id: 'familyphoto',
      icon: Users,
      titleKey: 'game.familyphoto.title',
      descKey: 'game.familyphoto.desc',
      bestScore: null,
      color: 'from-rose-500/20 to-rose-500/5',
      borderColor: 'border-rose-500/30',
    },
    {
      id: 'chtiquiz',
      icon: Headphones,
      titleKey: 'game.chtiquiz.title',
      descKey: 'game.chtiquiz.desc',
      bestScore: null,
      color: 'from-cyan-500/20 to-cyan-500/5',
      borderColor: 'border-cyan-500/30',
    },
    {
      id: 'spinwheel',
      icon: CircleDot,
      titleKey: 'game.wheel.title',
      descKey: 'game.wheel.desc',
      bestScore: null,
      color: 'from-amber-500/20 to-amber-500/5',
      borderColor: 'border-amber-500/30',
    },
    {
      id: 'highscores',
      icon: Medal,
      titleKey: 'game.highscores.title',
      descKey: 'game.highscores.description',
      bestScore: null,
      color: 'from-gold/30 to-gold/10',
      borderColor: 'border-gold/30',
    },
    {
      id: 'achievements',
      icon: Trophy,
      titleKey: 'game.achievements.title',
      descKey: 'game.achievements.desc',
      bestScore: null,
      badge: `${unlockedCount}/${achievements.length}`,
      color: 'from-secondary/30 to-secondary/10',
      borderColor: 'border-secondary/30',
    },
  ];

  if (gameMode === 'memory') {
    return (
      <MemoryGame 
        onBack={() => setGameMode('hub')} 
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
      />
    );
  }

  if (gameMode === 'timetravel') {
    return <TimeTravel onBack={() => setGameMode('hub')} />;
  }

  if (gameMode === 'achievements') {
    return <AchievementPanel onBack={() => setGameMode('hub')} />;
  }

  if (gameMode === 'explorer') {
    return (
      <FamilyTreeExplorer 
        onBack={() => setGameMode('hub')} 
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
      />
    );
  }

  if (gameMode === 'timeline') {
    return (
      <TimelinePuzzle 
        onBack={() => setGameMode('hub')} 
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
      />
    );
  }

  if (gameMode === 'historyquiz') {
    return (
      <HistoryQuiz 
        onBack={() => setGameMode('hub')} 
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
      />
    );
  }

  if (gameMode === 'highscores') {
    return <HighscoreOverview onBack={() => setGameMode('hub')} />;
  }

  if (gameMode === 'namespelling') {
    return (
      <NameSpellingChallenge 
        onBack={() => setGameMode('hub')} 
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
      />
    );
  }

  if (gameMode === 'familyphoto') {
    return (
      <FamilyPhotoQuiz 
        onBack={() => setGameMode('hub')} 
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
      />
    );
  }

  if (gameMode === 'chtiquiz') {
    return (
      <ChtiAudioQuiz 
        onBack={() => setGameMode('hub')} 
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
      />
    );
  }

  if (gameMode === 'spinwheel') {
    return <SpinTheWheel onBack={() => setGameMode('hub')} />;
  }

  return (
    <section id="spellen" className="section-padding bg-gradient-to-b from-background to-card" aria-labelledby="spellen-heading">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Gamepad2 className="w-5 h-5" aria-hidden="true" />
            <span className="uppercase tracking-widest text-sm font-medium">
              {t('game.interactive')}
            </span>
          </div>
          <h2 id="spellen-heading" className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('game.hub.title')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {t('game.hub.subtitle')}
          </p>

          {/* Score Display */}
          <div className="inline-flex items-center gap-6 bg-card border border-border rounded-xl px-6 py-3 shadow-card" role="status" aria-live="polite" aria-label={`${totalScore} ${t('game.points')}, ${unlockedCount} ${t('game.achievementsUnlocked')}`}>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-gold" aria-hidden="true" />
              <span className="text-foreground font-medium">{totalScore}</span>
              <span className="text-muted-foreground text-sm">{t('game.points')}</span>
            </div>
            <div className="w-px h-6 bg-border" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" aria-hidden="true" />
              <span className="text-foreground font-medium">{unlockedCount}</span>
              <span className="text-muted-foreground text-sm">{t('game.achievementsUnlocked')}</span>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" role="list" aria-label={t('game.hub.title')}>
          {games.map((game, index) => (
            <motion.button
              key={game.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setGameMode(game.id as GameMode)}
              aria-label={`${t(game.titleKey)}${game.bestScore !== null && game.bestScore > 0 ? `, ${t('game.best')}: ${game.bestScore}` : ''}${game.badge ? `, ${game.badge}` : ''}`}
              className={`group relative text-left p-6 rounded-2xl border ${game.borderColor} bg-gradient-to-br ${game.color} hover:scale-[1.02] transition-all duration-300 shadow-card hover:shadow-elevated`}
              role="listitem"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-xl bg-background/50 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <game.icon className="w-7 h-7 text-foreground" aria-hidden="true" />
                </div>
                {game.badge && (
                  <span className="px-3 py-1 rounded-full bg-background/80 text-sm font-medium text-foreground" aria-hidden="true">
                    {game.badge}
                  </span>
                )}
                {game.bestScore !== null && game.bestScore > 0 && (
                  <span className="px-3 py-1 rounded-full bg-gold/20 text-sm font-medium text-gold" aria-hidden="true">
                    {t('game.best')}: {game.bestScore}
                  </span>
                )}
              </div>

              <h3 className="font-serif text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors" aria-hidden="true">
                {t(game.titleKey)}
              </h3>
              <p className="text-muted-foreground text-sm" aria-hidden="true">
                {t(game.descKey)}
              </p>

              <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">
                <span>{t('game.play')}</span>
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GameHub;
