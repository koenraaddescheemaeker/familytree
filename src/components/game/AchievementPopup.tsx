import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy } from 'lucide-react';
import { useGame } from '@/contexts/GameContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAchievementSound } from '@/hooks/useAchievementSound';
import Confetti from '@/components/ui/Confetti';

const AchievementPopup = () => {
  const { showAchievementPopup, dismissAchievementPopup } = useGame();
  const { t } = useLanguage();
  const { playAchievementSound } = useAchievementSound();
  const [showConfetti, setShowConfetti] = useState(false);

  // Play sound and show confetti when achievement popup appears
  useEffect(() => {
    if (showAchievementPopup) {
      playAchievementSound();
      setShowConfetti(true);
      
      // Hide confetti after animation
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [showAchievementPopup, playAchievementSound]);

  return (
    <>
      <Confetti isActive={showConfetti} duration={3000} />
      <AnimatePresence>
        {showAchievementPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-[100] max-w-sm"
          >
            <div className="bg-gradient-to-br from-gold/20 to-gold-light/10 border-2 border-gold rounded-xl p-4 shadow-elevated backdrop-blur-sm">
              <button
                onClick={dismissAchievementPopup}
                className="absolute top-2 right-2 text-foreground/50 hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex items-start gap-4">
                <motion.div
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="w-14 h-14 rounded-full bg-gold/20 flex items-center justify-center text-3xl shrink-0"
                >
                  {showAchievementPopup.icon}
                </motion.div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-gold mb-1">
                    <Trophy className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-wider font-medium">
                      {t('game.achievementUnlocked')}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-semibold text-foreground truncate">
                    {t(showAchievementPopup.nameKey)}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {t(showAchievementPopup.descriptionKey)}
                  </p>
                  <p className="text-xs text-gold mt-2 font-medium">
                    +100 {t('game.points')}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AchievementPopup;

