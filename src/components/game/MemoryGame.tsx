import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, Trophy, Clock, Zap, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { useAchievementSound } from '@/hooks/useAchievementSound';
import DifficultySelector, { Difficulty } from './DifficultySelector';
import MuteButton from './MuteButton';
import Confetti from '@/components/ui/Confetti';

// Import some family images
import charlesLouis from '@/assets/charles-louis-portrait.jpg';
import reunion2024 from '@/assets/reunion-2024-new.jpg';
import oudeKerk from '@/assets/oude-kerk.jpg';
import huwelijkscontract from '@/assets/huwelijkscontract-1685.jpg';
import izegemKaart from '@/assets/izegem-kaart-1850.jpg';
import ferraris from '@/assets/ferraris-izegem-1777.jpg';

interface Card {
  id: number;
  type: string;
  image: string;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface MemoryGameProps {
  onBack: () => void;
  difficulty: Difficulty;
  onDifficultyChange: (d: Difficulty) => void;
}

const allCardData = [
  { type: 'charles', image: charlesLouis, labelKey: 'game.memory.charlesLouis' },
  { type: 'reunion', image: reunion2024, labelKey: 'game.memory.reunion' },
  { type: 'kerk', image: oudeKerk, labelKey: 'game.memory.kerk' },
  { type: 'contract', image: huwelijkscontract, labelKey: 'game.memory.contract' },
  { type: 'izegem', image: izegemKaart, labelKey: 'game.memory.izegem' },
  { type: 'ferraris', image: ferraris, labelKey: 'game.memory.ferraris' },
];

const getDifficultySettings = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'easy':
      return { cardCount: 4, scoreMultiplier: 0.8 }; // 8 cards (4 pairs)
    case 'normal':
      return { cardCount: 6, scoreMultiplier: 1.0 }; // 12 cards (6 pairs)
    case 'hard':
      return { cardCount: 6, scoreMultiplier: 1.5, showTimer: true }; // 12 cards, faster pace
  }
};

const MemoryGame = ({ onBack, difficulty, onDifficultyChange }: MemoryGameProps) => {
  const { t } = useLanguage();
  const { unlockAchievement, setBestScore, getBestScore, addScore } = useGame();
  const { playMemoryMatchSound, playErrorSound, playAchievementSound } = useAchievementSound();
  
  const currentBestScore = getBestScore('memory', difficulty);
  
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [isShowingHint, setIsShowingHint] = useState(false);

  const settings = getDifficultySettings(difficulty);
  const maxHints = difficulty === 'easy' ? 3 : difficulty === 'normal' ? 2 : 1;

  const initializeGame = useCallback(() => {
    const cardData = allCardData.slice(0, settings.cardCount);
    const duplicatedCards = [...cardData, ...cardData];
    const shuffledCards = duplicatedCards
      .map((card, index) => ({
        id: index,
        type: card.type,
        image: card.image,
        label: t(card.labelKey),
        isFlipped: false,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);
    
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setTimer(0);
    setGameComplete(false);
    setGameStarted(false);
    setIsChecking(false);
    setHintsUsed(0);
    setIsShowingHint(false);
  }, [t, settings.cardCount]);

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;
    if (gameStarted && !gameComplete) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameComplete]);

  useEffect(() => {
    if (matches === settings.cardCount && matches > 0) {
      setGameComplete(true);
      const hintPenalty = hintsUsed * 50;
      const baseScore = Math.max(1000 - (moves * 10) - (timer * 2) - hintPenalty, 100);
      const finalScore = Math.round(baseScore * settings.scoreMultiplier);
      addScore(finalScore);
      setBestScore('memory', difficulty, finalScore);
      
      // Play victory sound
      playAchievementSound();
      
      // Unlock achievements
      unlockAchievement('memory_beginner');
      if (moves <= settings.cardCount * 2) {
        unlockAchievement('memory_expert');
      }
    }
  }, [matches, moves, timer, hintsUsed, addScore, setBestScore, unlockAchievement, playAchievementSound, settings.cardCount, settings.scoreMultiplier, difficulty]);

  const useHint = useCallback(() => {
    if (hintsUsed >= maxHints || isShowingHint || gameComplete) return;
    
    setIsShowingHint(true);
    setHintsUsed(prev => prev + 1);
    
    // Flip all unmatched cards
    setCards(prev => prev.map(card => 
      card.isMatched ? card : { ...card, isFlipped: true }
    ));
    
    // Flip them back after 1.5 seconds
    setTimeout(() => {
      setCards(prev => prev.map(card => 
        card.isMatched ? card : { ...card, isFlipped: false }
      ));
      setFlippedCards([]);
      setIsShowingHint(false);
    }, 1500);
  }, [hintsUsed, maxHints, isShowingHint, gameComplete]);

  const handleCardClick = (id: number) => {
    if (isShowingHint) return;
    if (isChecking) return;
    if (flippedCards.length === 2) return;
    if (cards[id].isFlipped || cards[id].isMatched) return;

    if (!gameStarted) setGameStarted(true);

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);
    setFlippedCards(prev => [...prev, id]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsChecking(true);
      setMoves(m => m + 1);
      
      const [first, second] = flippedCards;
      
      if (cards[first].type === cards[second].type) {
        // Match found - play success sound
        playMemoryMatchSound();
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) => 
            idx === first || idx === second 
              ? { ...card, isMatched: true }
              : card
          ));
          setMatches(m => m + 1);
          setFlippedCards([]);
          setIsChecking(false);
        }, 500);
      } else {
        // No match - play error sound
        setTimeout(() => {
          playErrorSound();
          setCards(prev => prev.map((card, idx) => 
            idx === first || idx === second 
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  }, [flippedCards, cards, playMemoryMatchSound, playErrorSound]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            <MuteButton />
            <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="font-mono text-foreground">{formatTime(timer)}</span>
            </div>
            <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2">
              <Zap className="w-4 h-4 text-gold" />
              <span className="text-foreground">{moves} {t('game.memory.moves')}</span>
            </div>
            <button
              onClick={useHint}
              disabled={hintsUsed >= maxHints || isShowingHint || gameComplete}
              className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title={t('game.memory.hintTooltip')}
            >
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-foreground">{maxHints - hintsUsed}</span>
            </button>
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t('game.memory.title')}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t('game.memory.instruction')}
          </p>
          <DifficultySelector
            selectedDifficulty={difficulty}
            onSelect={(d) => {
              onDifficultyChange(d);
            }}
          />
        </motion.div>

        {/* Confetti Animation */}
        <Confetti isActive={gameComplete} duration={4000} />

        {/* Game Complete Modal */}
        <AnimatePresence>
          {gameComplete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card border border-border rounded-2xl p-8 max-w-md w-full text-center shadow-elevated"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gold/20 flex items-center justify-center">
                  <Trophy className="w-10 h-10 text-gold" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                  {t('game.memory.complete')}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {t('game.memory.stats')
                    .replace('{moves}', moves.toString())
                    .replace('{time}', formatTime(timer))}
                </p>
                
                <div className="flex flex-col gap-3">
                  <button
                    onClick={initializeGame}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    {t('game.memory.playAgain')}
                  </button>
                  <button
                    onClick={onBack}
                    className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                  >
                    {t('game.back')}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Game Grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
          {cards.map((card) => (
            <motion.button
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              disabled={card.isFlipped || card.isMatched || isChecking}
              className="aspect-square relative perspective-1000"
              whileHover={{ scale: card.isFlipped || card.isMatched ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="w-full h-full relative preserve-3d"
                animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Back of card */}
                <div 
                  className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-primary/70 border-2 border-primary/30 flex items-center justify-center backface-hidden shadow-card"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <span className="font-serif text-3xl md:text-4xl text-primary-foreground opacity-50">?</span>
                </div>
                
                {/* Front of card */}
                <div 
                  className={`absolute inset-0 rounded-xl overflow-hidden border-2 ${card.isMatched ? 'border-green-500' : 'border-border'} shadow-card`}
                  style={{ 
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                >
                  <img 
                    src={card.image} 
                    alt={card.label}
                    className="w-full h-full object-cover"
                  />
                  {card.isMatched && (
                    <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                      <span className="text-2xl">✓</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.button>
          ))}
        </div>

        {/* Best Score */}
        {currentBestScore > 0 && (
          <div className="text-center mt-8 text-muted-foreground">
            {t('game.best')} ({t(`game.difficulty.${difficulty}`)}): {currentBestScore} {t('game.points')}
          </div>
        )}

        {/* Reset Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={initializeGame}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            {t('game.memory.reset')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default MemoryGame;
