import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Lock, CheckCircle, X, Compass } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame, ALL_SECTIONS } from '@/contexts/GameContext';
import { Progress } from '@/components/ui/progress';

interface AchievementOverviewProps {
  isOpen: boolean;
  onClose: () => void;
}

const AchievementOverview = ({ isOpen, onClose }: AchievementOverviewProps) => {
  const { t } = useLanguage();
  const { achievements, totalScore, visitedSections } = useGame();

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const progressPercentage = (unlockedCount / achievements.length) * 100;
  const sectionsVisited = visitedSections.size;
  const totalSections = ALL_SECTIONS.length;
  const sectionProgressPercentage = (sectionsVisited / totalSections) * 100;

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
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[85vh] bg-card border border-border rounded-2xl shadow-elevated z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h2 className="font-serif text-xl font-bold text-foreground">
                    {t('game.achievements.title')}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {unlockedCount} / {achievements.length} {t('game.achievements.unlocked')}
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

            {/* Progress Section */}
            <div className="p-6 border-b border-border bg-card/50">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Achievement Progress */}
                <div className="p-4 rounded-xl bg-background border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="w-4 h-4 text-gold" />
                    <span className="text-sm font-medium text-foreground">{t('game.achievements.progress')}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {t('game.totalScore')}: <span className="text-gold font-medium">{totalScore}</span> {t('game.points')}
                  </p>
                </div>

                {/* Section Progress */}
                <div className="p-4 rounded-xl bg-background border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Compass className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium text-foreground">{t('game.achievements.sections')}</span>
                  </div>
                  <Progress value={sectionProgressPercentage} className="h-2 mb-2" />
                  <p className="text-xs text-muted-foreground">
                    {sectionsVisited} / {totalSections} {t('game.achievements.sectionsVisited')}
                  </p>
                </div>
              </div>
            </div>

            {/* Achievements Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid sm:grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`relative p-4 rounded-xl border flex items-start gap-3 ${
                      achievement.unlocked 
                        ? 'bg-gold/5 border-gold/30' 
                        : 'bg-secondary/30 border-border/50 opacity-70'
                    }`}
                  >
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl shrink-0 ${
                      achievement.unlocked ? 'bg-gold/20' : 'bg-secondary grayscale'
                    }`}>
                      {achievement.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`font-serif font-semibold leading-tight ${
                          achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {t(achievement.nameKey)}
                        </h3>
                        {achievement.unlocked ? (
                          <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                        ) : (
                          <Lock className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {t(achievement.descriptionKey)}
                      </p>
                      {achievement.unlocked && achievement.unlockedAt && (
                        <p className="text-xs text-gold mt-1">
                          {new Date(achievement.unlockedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer Hint */}
            <div className="p-4 border-t border-border bg-card text-center">
              <p className="text-xs text-muted-foreground">
                {t('game.achievements.hint')}
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AchievementOverview;
