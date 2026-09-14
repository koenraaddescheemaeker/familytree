import { useState, useEffect } from 'react';
import { motion, Reorder } from 'framer-motion';
import { ArrowLeft, Clock, CheckCircle2, RotateCcw, Shuffle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { useAchievementSound } from '@/hooks/useAchievementSound';
import DifficultySelector, { Difficulty } from './DifficultySelector';
import MuteButton from './MuteButton';

interface TimelineEvent {
  id: string;
  year: number;
  titleKey: string;
  descKey: string;
}

const allEvents: TimelineEvent[] = [
  { id: 'marriage', year: 1685, titleKey: 'game.timeline.event.marriage', descKey: 'game.timeline.event.marriageDesc' },
  { id: 'migration', year: 1699, titleKey: 'game.timeline.event.migration', descKey: 'game.timeline.event.migrationDesc' },
  { id: 'charlesBirth', year: 1857, titleKey: 'game.timeline.event.charlesBirth', descKey: 'game.timeline.event.charlesBirthDesc' },
  { id: 'marcelBirth', year: 1893, titleKey: 'game.timeline.event.marcelBirth', descKey: 'game.timeline.event.marcelBirthDesc' },
  { id: 'ww1', year: 1914, titleKey: 'game.timeline.event.ww1', descKey: 'game.timeline.event.ww1Desc' },
  { id: 'reunion1962', year: 1962, titleKey: 'game.timeline.event.reunion1962', descKey: 'game.timeline.event.reunion1962Desc' },
  { id: 'reunion2024', year: 2024, titleKey: 'game.timeline.event.reunion2024', descKey: 'game.timeline.event.reunion2024Desc' },
];

interface TimelinePuzzleProps {
  onBack: () => void;
  difficulty: Difficulty;
  onDifficultyChange: (d: Difficulty) => void;
}

const getDifficultySettings = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'easy':
      return { eventCount: 4, scoreMultiplier: 0.8 };
    case 'normal':
      return { eventCount: 5, scoreMultiplier: 1.0 };
    case 'hard':
      return { eventCount: 7, scoreMultiplier: 1.5 };
  }
};

const TimelinePuzzle = ({ onBack, difficulty, onDifficultyChange }: TimelinePuzzleProps) => {
  const { t } = useLanguage();
  const { addScore, unlockAchievement, isAchievementUnlocked, setBestScore, getBestScore } = useGame();
  const { playSuccessSound, playErrorSound, playAchievementSound } = useAchievementSound();
  
  const currentBestScore = getBestScore('timeline', difficulty);
  
  const settings = getDifficultySettings(difficulty);
  const gameEvents = allEvents.slice(0, settings.eventCount);
  
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [correctPositions, setCorrectPositions] = useState<Set<string>>(new Set());

  useEffect(() => {
    shuffleEvents();
  }, [difficulty]);

  const shuffleEvents = () => {
    const shuffled = [...gameEvents].sort(() => Math.random() - 0.5);
    setEvents(shuffled);
    setIsComplete(false);
    setAttempts(0);
    setCorrectPositions(new Set());
  };

  const checkOrder = () => {
    setIsChecking(true);
    setAttempts(prev => prev + 1);
    
    const sortedEvents = [...gameEvents].sort((a, b) => a.year - b.year);
    const correct = new Set<string>();
    let allCorrect = true;
    
    events.forEach((event, index) => {
      if (event.id === sortedEvents[index].id) {
        correct.add(event.id);
      } else {
        allCorrect = false;
      }
    });
    
    setCorrectPositions(correct);
    
    if (allCorrect) {
      playAchievementSound();
      const basePoints = Math.max(300 - (attempts * 50), 50);
      const pointsEarned = Math.round(basePoints * settings.scoreMultiplier);
      setScore(pointsEarned);
      addScore(pointsEarned);
      setBestScore('timeline', difficulty, pointsEarned);
      setIsComplete(true);
      
      if (!isAchievementUnlocked('tijdlijn_meester')) {
        unlockAchievement('tijdlijn_meester');
      }
    } else {
      playErrorSound();
    }
    
    setTimeout(() => setIsChecking(false), 500);
  };

  const resetGame = () => {
    shuffleEvents();
    setScore(0);
  };

  if (isComplete) {
    return (
      <section className="section-padding bg-gradient-to-b from-background to-card min-h-screen">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl p-8 text-center shadow-elevated"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              {t('game.timeline.complete')}
            </h2>
            <p className="text-muted-foreground mb-2">
              {t('game.timeline.attempts')}: {attempts}
            </p>
            <p className="text-muted-foreground mb-2">
              {t('game.timeline.finalScore')}: <span className="text-primary font-bold text-2xl">{score}</span> {t('game.points')}
            </p>
            {currentBestScore > 0 && (
              <p className="text-muted-foreground mb-6">
                {t('game.best')} ({t(`game.difficulty.${difficulty}`)}): {currentBestScore} {t('game.points')}
              </p>
            )}
            <div className="flex gap-4 justify-center">
              <Button onClick={resetGame} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                {t('game.timeline.playAgain')}
              </Button>
              <Button onClick={onBack}>
                {t('game.back')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-b from-background to-card min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t('game.back')}
          </Button>
          <div className="flex items-center gap-4">
            <MuteButton />
            <span className="text-muted-foreground">
              {t('game.timeline.attempts')}: {attempts}
            </span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-primary mb-4">
              <Clock className="w-5 h-5" />
              <span className="uppercase tracking-widest text-sm font-medium">
                {t('game.timeline.puzzle')}
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
              {t('game.timeline.title')}
            </h2>
            <p className="text-muted-foreground mb-4">
              {t('game.timeline.instruction')}
            </p>
            <DifficultySelector
              selectedDifficulty={difficulty}
              onSelect={onDifficultyChange}
            />
          </div>

          <div className="bg-card border border-border rounded-xl p-6 shadow-card">
            <Reorder.Group axis="y" values={events} onReorder={setEvents} className="space-y-3">
              {events.map((event) => {
                const isCorrect = correctPositions.has(event.id);
                
                return (
                  <Reorder.Item
                    key={event.id}
                    value={event}
                    className={`p-4 rounded-lg border cursor-grab active:cursor-grabbing transition-colors ${
                      isCorrect
                        ? 'bg-green-500/10 border-green-500'
                        : 'bg-background border-border hover:border-primary'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs text-primary">↕</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">
                          {t(event.titleKey)}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {t(event.descKey)}
                        </p>
                      </div>
                      {isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
          </div>

          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={shuffleEvents}>
              <Shuffle className="w-4 h-4 mr-2" />
              {t('game.timeline.shuffle')}
            </Button>
            <Button onClick={checkOrder} disabled={isChecking}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              {t('game.timeline.check')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelinePuzzle;
