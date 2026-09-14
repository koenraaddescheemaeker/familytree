import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, RotateCcw, MapPin, Calendar, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';

interface TimeTravelProps {
  onBack: () => void;
}

interface StoryScene {
  id: string;
  year: number;
  titleKey: string;
  descriptionKey: string;
  locationKey: string;
  characterKey: string;
  choices: {
    textKey: string;
    nextScene: string;
    points?: number;
  }[];
  ending?: boolean;
  goodEnding?: boolean;
}

const storyScenes: StoryScene[] = [
  {
    id: 'start',
    year: 1685,
    titleKey: 'game.tt.start.title',
    descriptionKey: 'game.tt.start.desc',
    locationKey: 'game.tt.start.location',
    characterKey: 'game.tt.start.character',
    choices: [
      { textKey: 'game.tt.start.choice1', nextScene: 'wedding', points: 10 },
      { textKey: 'game.tt.start.choice2', nextScene: 'forest', points: 10 },
    ],
  },
  {
    id: 'wedding',
    year: 1685,
    titleKey: 'game.tt.wedding.title',
    descriptionKey: 'game.tt.wedding.desc',
    locationKey: 'game.tt.wedding.location',
    characterKey: 'game.tt.wedding.character',
    choices: [
      { textKey: 'game.tt.wedding.choice1', nextScene: 'contract', points: 15 },
      { textKey: 'game.tt.wedding.choice2', nextScene: 'celebration', points: 10 },
    ],
  },
  {
    id: 'forest',
    year: 1685,
    titleKey: 'game.tt.forest.title',
    descriptionKey: 'game.tt.forest.desc',
    locationKey: 'game.tt.forest.location',
    characterKey: 'game.tt.forest.character',
    choices: [
      { textKey: 'game.tt.forest.choice1', nextScene: 'boquillon', points: 15 },
      { textKey: 'game.tt.forest.choice2', nextScene: 'wedding', points: 10 },
    ],
  },
  {
    id: 'contract',
    year: 1685,
    titleKey: 'game.tt.contract.title',
    descriptionKey: 'game.tt.contract.desc',
    locationKey: 'game.tt.contract.location',
    characterKey: 'game.tt.contract.character',
    choices: [
      { textKey: 'game.tt.contract.choice1', nextScene: 'migration_reason', points: 20 },
    ],
  },
  {
    id: 'celebration',
    year: 1685,
    titleKey: 'game.tt.celebration.title',
    descriptionKey: 'game.tt.celebration.desc',
    locationKey: 'game.tt.celebration.location',
    characterKey: 'game.tt.celebration.character',
    choices: [
      { textKey: 'game.tt.celebration.choice1', nextScene: 'migration_reason', points: 15 },
    ],
  },
  {
    id: 'boquillon',
    year: 1685,
    titleKey: 'game.tt.boquillon.title',
    descriptionKey: 'game.tt.boquillon.desc',
    locationKey: 'game.tt.boquillon.location',
    characterKey: 'game.tt.boquillon.character',
    choices: [
      { textKey: 'game.tt.boquillon.choice1', nextScene: 'migration_reason', points: 20 },
    ],
  },
  {
    id: 'migration_reason',
    year: 1699,
    titleKey: 'game.tt.migration.title',
    descriptionKey: 'game.tt.migration.desc',
    locationKey: 'game.tt.migration.location',
    characterKey: 'game.tt.migration.character',
    choices: [
      { textKey: 'game.tt.migration.choice1', nextScene: 'journey', points: 15 },
      { textKey: 'game.tt.migration.choice2', nextScene: 'stay', points: 10 },
    ],
  },
  {
    id: 'journey',
    year: 1699,
    titleKey: 'game.tt.journey.title',
    descriptionKey: 'game.tt.journey.desc',
    locationKey: 'game.tt.journey.location',
    characterKey: 'game.tt.journey.character',
    choices: [
      { textKey: 'game.tt.journey.choice1', nextScene: 'izegem', points: 20 },
    ],
  },
  {
    id: 'stay',
    year: 1699,
    titleKey: 'game.tt.stay.title',
    descriptionKey: 'game.tt.stay.desc',
    locationKey: 'game.tt.stay.location',
    characterKey: 'game.tt.stay.character',
    choices: [
      { textKey: 'game.tt.stay.choice1', nextScene: 'journey', points: 10 },
    ],
  },
  {
    id: 'izegem',
    year: 1700,
    titleKey: 'game.tt.izegem.title',
    descriptionKey: 'game.tt.izegem.desc',
    locationKey: 'game.tt.izegem.location',
    characterKey: 'game.tt.izegem.character',
    choices: [
      { textKey: 'game.tt.izegem.choice1', nextScene: 'craftsmanship', points: 15 },
      { textKey: 'game.tt.izegem.choice2', nextScene: 'integration', points: 15 },
    ],
  },
  {
    id: 'craftsmanship',
    year: 1750,
    titleKey: 'game.tt.craftsmanship.title',
    descriptionKey: 'game.tt.craftsmanship.desc',
    locationKey: 'game.tt.craftsmanship.location',
    characterKey: 'game.tt.craftsmanship.character',
    choices: [
      { textKey: 'game.tt.craftsmanship.choice1', nextScene: 'charles_louis', points: 20 },
    ],
  },
  {
    id: 'integration',
    year: 1720,
    titleKey: 'game.tt.integration.title',
    descriptionKey: 'game.tt.integration.desc',
    locationKey: 'game.tt.integration.location',
    characterKey: 'game.tt.integration.character',
    choices: [
      { textKey: 'game.tt.integration.choice1', nextScene: 'charles_louis', points: 20 },
    ],
  },
  {
    id: 'charles_louis',
    year: 1857,
    titleKey: 'game.tt.charlesLouis.title',
    descriptionKey: 'game.tt.charlesLouis.desc',
    locationKey: 'game.tt.charlesLouis.location',
    characterKey: 'game.tt.charlesLouis.character',
    choices: [
      { textKey: 'game.tt.charlesLouis.choice1', nextScene: 'modern', points: 25 },
    ],
  },
  {
    id: 'modern',
    year: 2024,
    titleKey: 'game.tt.modern.title',
    descriptionKey: 'game.tt.modern.desc',
    locationKey: 'game.tt.modern.location',
    characterKey: 'game.tt.modern.character',
    choices: [],
    ending: true,
    goodEnding: true,
  },
];

const TimeTravel = ({ onBack }: TimeTravelProps) => {
  const { t } = useLanguage();
  const { unlockAchievement, addScore } = useGame();
  
  const [currentSceneId, setCurrentSceneId] = useState('start');
  const [totalPoints, setTotalPoints] = useState(0);
  const [visitedScenes, setVisitedScenes] = useState<string[]>(['start']);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentScene = storyScenes.find(s => s.id === currentSceneId) || storyScenes[0];

  const handleChoice = (nextScene: string, points: number = 0) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTotalPoints(p => p + points);
    
    if (!visitedScenes.includes(nextScene)) {
      setVisitedScenes(prev => [...prev, nextScene]);
    }

    setTimeout(() => {
      setCurrentSceneId(nextScene);
      setIsAnimating(false);

      // Check for ending
      const next = storyScenes.find(s => s.id === nextScene);
      if (next?.ending) {
        addScore(totalPoints + points);
        unlockAchievement('avonturier');
        if (next.goodEnding) {
          unlockAchievement('verhaal_complete');
        }
      }
    }, 500);
  };

  const handleRestart = () => {
    setCurrentSceneId('start');
    setTotalPoints(0);
    setVisitedScenes(['start']);
  };

  return (
    <section className="section-padding bg-gradient-to-b from-background to-card min-h-screen">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{t('game.back')}</span>
          </button>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
              <span className="text-gold font-medium">{totalPoints}</span>
              <span className="text-muted-foreground text-sm">{t('game.points')}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>{t('game.tt.progress')}</span>
            <span>{visitedScenes.length} / {storyScenes.length}</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${(visitedScenes.length / storyScenes.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Scene Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSceneId}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            className="bg-card border border-border rounded-2xl overflow-hidden shadow-elevated"
          >
            {/* Scene Header */}
            <div className="bg-gradient-to-r from-sepia/20 to-transparent p-6 border-b border-border">
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                <span className="flex items-center gap-1.5 bg-background/50 px-3 py-1 rounded-full">
                  <Calendar className="w-4 h-4" />
                  {currentScene.year}
                </span>
                <span className="flex items-center gap-1.5 bg-background/50 px-3 py-1 rounded-full">
                  <MapPin className="w-4 h-4" />
                  {t(currentScene.locationKey)}
                </span>
                <span className="flex items-center gap-1.5 bg-background/50 px-3 py-1 rounded-full">
                  <User className="w-4 h-4" />
                  {t(currentScene.characterKey)}
                </span>
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                {t(currentScene.titleKey)}
              </h2>
            </div>

            {/* Scene Content */}
            <div className="p-6">
              <p className="text-foreground/90 leading-relaxed mb-8 text-lg">
                {t(currentScene.descriptionKey)}
              </p>

              {/* Choices or Ending */}
              {currentScene.ending ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                    {t('game.tt.congratulations')}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {t('game.tt.finalScore')}: {totalPoints} {t('game.points')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={handleRestart}
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      {t('game.tt.playAgain')}
                    </button>
                    <button
                      onClick={onBack}
                      className="px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                    >
                      {t('game.back')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground mb-4 font-medium">
                    {t('game.tt.whatDoYouDo')}
                  </p>
                  {currentScene.choices.map((choice, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleChoice(choice.nextScene, choice.points)}
                      disabled={isAnimating}
                      className="w-full text-left p-4 rounded-xl border border-border bg-background hover:bg-secondary/50 hover:border-primary/30 transition-all group"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-foreground group-hover:text-primary transition-colors">
                          {t(choice.textKey)}
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      {choice.points && (
                        <span className="text-xs text-gold mt-1 block">
                          +{choice.points} {t('game.points')}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Timeline indicator */}
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>1685</span>
          <div className="flex-1 max-w-xs h-1 bg-secondary rounded-full relative">
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full"
              animate={{ 
                left: `${((currentScene.year - 1685) / (2024 - 1685)) * 100}%` 
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <span>2024</span>
        </div>
      </div>
    </section>
  );
};

export default TimeTravel;
