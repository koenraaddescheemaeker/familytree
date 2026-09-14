import { motion } from 'framer-motion';
import { Zap, Target, Flame } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export type Difficulty = 'easy' | 'normal' | 'hard';

interface DifficultySelectorProps {
  selectedDifficulty: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
  showLabels?: boolean;
}

const DifficultySelector = ({ selectedDifficulty, onSelect, showLabels = true }: DifficultySelectorProps) => {
  const { t } = useLanguage();

  const difficulties: { id: Difficulty; icon: typeof Zap; labelKey: string; color: string; bgColor: string }[] = [
    {
      id: 'easy',
      icon: Zap,
      labelKey: 'game.difficulty.easy',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10 border-green-500/30 hover:border-green-500',
    },
    {
      id: 'normal',
      icon: Target,
      labelKey: 'game.difficulty.normal',
      color: 'text-primary',
      bgColor: 'bg-primary/10 border-primary/30 hover:border-primary',
    },
    {
      id: 'hard',
      icon: Flame,
      labelKey: 'game.difficulty.hard',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10 border-red-500/30 hover:border-red-500',
    },
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      {showLabels && (
        <span className="text-sm text-muted-foreground">{t('game.difficulty.label')}</span>
      )}
      <div className="flex gap-2">
        {difficulties.map((diff) => {
          const isSelected = selectedDifficulty === diff.id;
          const Icon = diff.icon;

          return (
            <motion.button
              key={diff.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(diff.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                isSelected
                  ? `${diff.bgColor.replace('hover:', '')} border-2`
                  : `bg-card border-border ${diff.bgColor.split(' ').slice(0, 2).join(' ')}`
              }`}
            >
              <Icon className={`w-4 h-4 ${diff.color}`} />
              <span className={`text-sm font-medium ${isSelected ? diff.color : 'text-foreground'}`}>
                {t(diff.labelKey)}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default DifficultySelector;
