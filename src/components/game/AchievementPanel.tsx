import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Lock, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { Progress } from '@/components/ui/progress';

interface AchievementPanelProps {
  onBack: () => void;
}

const AchievementPanel = ({ onBack }: AchievementPanelProps) => {
  const { t } = useLanguage();
  const { achievements, totalScore } = useGame();

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const progressPercentage = (unlockedCount / achievements.length) * 100;

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
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gold/20 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-gold" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t('game.achievements.title')}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t('game.achievements.subtitle')}
          </p>

          {/* Progress */}
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">{t('game.achievements.progress')}</span>
              <span className="text-foreground font-medium">{unlockedCount} / {achievements.length}</span>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            <p className="text-sm text-muted-foreground mt-2">
              {t('game.totalScore')}: <span className="text-gold font-medium">{totalScore}</span> {t('game.points')}
            </p>
          </div>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`relative p-5 rounded-xl border ${
                achievement.unlocked 
                  ? 'bg-gold/5 border-gold/30' 
                  : 'bg-card border-border opacity-60'
              }`}
            >
              {/* Status Icon */}
              <div className="absolute top-3 right-3">
                {achievement.unlocked ? (
                  <CheckCircle className="w-5 h-5 text-gold" />
                ) : (
                  <Lock className="w-5 h-5 text-muted-foreground" />
                )}
              </div>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-3 ${
                achievement.unlocked ? 'bg-gold/20' : 'bg-secondary grayscale'
              }`}>
                {achievement.icon}
              </div>

              {/* Content */}
              <h3 className={`font-serif text-lg font-semibold mb-1 ${
                achievement.unlocked ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {t(achievement.nameKey)}
              </h3>
              <p className="text-sm text-muted-foreground">
                {t(achievement.descriptionKey)}
              </p>

              {/* Unlocked Date */}
              {achievement.unlocked && achievement.unlockedAt && (
                <p className="text-xs text-gold mt-3">
                  {new Date(achievement.unlockedAt).toLocaleDateString()}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-muted-foreground text-sm mt-8"
        >
          {t('game.achievements.hint')}
        </motion.p>
      </div>
    </section>
  );
};

export default AchievementPanel;
