import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PartyPopper, X, Sparkles } from 'lucide-react';
import { useGame, ALL_SECTIONS } from '@/contexts/GameContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Confetti from '@/components/ui/Confetti';
import { useAchievementSound } from '@/hooks/useAchievementSound';

const ExplorationComplete = () => {
  const { visitedSections, celebrationTrigger } = useGame();
  const { t } = useLanguage();
  const { playAchievementSound } = useAchievementSound();
  const [showCelebration, setShowCelebration] = useState(false);
  const [hasShownCelebration, setHasShownCelebration] = useState(() => {
    return localStorage.getItem('deforce_exploration_celebrated') === 'true';
  });

  const isComplete = visitedSections.size >= ALL_SECTIONS.length;

  // Automatic trigger when all sections are visited for the first time
  useEffect(() => {
    if (isComplete && !hasShownCelebration) {
      // Delay to let achievement popup show first
      const timer = setTimeout(() => {
        setShowCelebration(true);
        playAchievementSound();
        localStorage.setItem('deforce_exploration_celebrated', 'true');
        setHasShownCelebration(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isComplete, hasShownCelebration, playAchievementSound]);

  // Manual trigger via celebrationTrigger
  useEffect(() => {
    if (celebrationTrigger > 0 && isComplete) {
      setShowCelebration(true);
      playAchievementSound();
    }
  }, [celebrationTrigger, isComplete, playAchievementSound]);

  const handleClose = () => {
    setShowCelebration(false);
  };

  return (
    <>
      <Confetti isActive={showCelebration} duration={6000} />
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="relative bg-gradient-to-br from-gold/20 via-card to-accent/10 border-2 border-gold rounded-2xl p-8 max-w-md w-full shadow-elevated text-center"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-foreground/50 hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center"
              >
                <PartyPopper className="w-12 h-12 text-gold-foreground" />
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2"
              >
                {t('exploration.complete.title')}
              </motion.h2>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-muted-foreground mb-6"
              >
                {t('exploration.complete.subtitle')}
              </motion.p>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-2 text-gold font-medium"
              >
                <Sparkles className="w-5 h-5" />
                <span>{ALL_SECTIONS.length} {t('exploration.complete.sections')}</span>
                <Sparkles className="w-5 h-5" />
              </motion.div>

              {/* Close button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                onClick={handleClose}
                className="mt-6 px-6 py-2 bg-gold text-gold-foreground rounded-full font-medium hover:bg-gold/90 transition-colors"
              >
                {t('exploration.complete.close')}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExplorationComplete;
