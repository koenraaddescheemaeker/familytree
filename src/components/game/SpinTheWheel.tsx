import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, Trophy, Sparkles, Star, CheckCircle, XCircle, Zap, Target, Flame, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { useAchievementSound } from '@/hooks/useAchievementSound';
import MuteButton from './MuteButton';
import Confetti from '@/components/ui/Confetti';

interface SpinTheWheelProps {
  onBack: () => void;
}

interface WheelSegment {
  id: string;
  color: string;
  gradientEnd: string;
  basePoints: number;
  icon: string;
}

interface Question {
  questionKey: string;
  options: string[];
  correctIndex: number;
  difficulty: 'easy' | 'normal' | 'hard';
}

type Difficulty = 'easy' | 'normal' | 'hard';

// Difficulty settings with timer for hard mode
const difficultySettings = {
  easy: { multiplier: 0.75, questionsCount: 6, label: 'game.wheel.diff.easy', timerSeconds: 0 },
  normal: { multiplier: 1.0, questionsCount: 8, label: 'game.wheel.diff.normal', timerSeconds: 0 },
  hard: { multiplier: 1.5, questionsCount: 10, label: 'game.wheel.diff.hard', timerSeconds: 15 },
};

// 8 colored segments for the wheel with base points
const wheelSegments: WheelSegment[] = [
  { id: '1', color: '#7c3aed', gradientEnd: '#a78bfa', basePoints: 20, icon: '' },
  { id: '2', color: '#f59e0b', gradientEnd: '#fbbf24', basePoints: 30, icon: '' },
  { id: '3', color: '#8b5cf6', gradientEnd: '#c4b5fd', basePoints: 25, icon: '' },
  { id: '4', color: '#10b981', gradientEnd: '#34d399', basePoints: 40, icon: '' },
  { id: '5', color: '#06b6d4', gradientEnd: '#67e8f9', basePoints: 35, icon: '' },
  { id: '6', color: '#3b82f6', gradientEnd: '#93c5fd', basePoints: 25, icon: '' },
  { id: '7', color: '#eab308', gradientEnd: '#fde047', basePoints: 50, icon: '' },
  { id: '8', color: '#ec4899', gradientEnd: '#f9a8d4', basePoints: 30, icon: '' },
];

// Questions categorized by difficulty
const familyQuestions: Question[] = [
  // Easy questions - basic facts
  { questionKey: 'game.wheel.q.year1685', options: ['1680', '1685', '1690', '1695'], correctIndex: 1, difficulty: 'easy' },
  { questionKey: 'game.wheel.q.region', options: ['Normandië', 'Bretagne', 'Frans-Vlaanderen', 'Picardië'], correctIndex: 2, difficulty: 'easy' },
  { questionKey: 'game.wheel.q.century', options: ['16e eeuw', '17e eeuw', '18e eeuw', '19e eeuw'], correctIndex: 1, difficulty: 'easy' },
  { questionKey: 'game.wheel.q.migration', options: ['Brugge', 'Gent', 'Izegem', 'Kortrijk'], correctIndex: 2, difficulty: 'easy' },
  { questionKey: 'game.wheel.q.hubert', options: ['Antoinette Follet', 'Marie Dubois', 'Catherine Leroy', 'Jeanne Martin'], correctIndex: 0, difficulty: 'easy' },
  { questionKey: 'game.wheel.q.hallennesLeHaut', options: ['game.wheel.o.village', 'game.wheel.o.city', 'game.wheel.o.river', 'game.wheel.o.forest'], correctIndex: 0, difficulty: 'easy' },
  { questionKey: 'game.wheel.q.lodewijk', options: ['Lodewijk XIII', 'Lodewijk XIV', 'Lodewijk XV', 'Napoleon'], correctIndex: 1, difficulty: 'easy' },
  { questionKey: 'game.wheel.q.chatellennie', options: ['Rijsel (Lille)', 'Parijs', 'Brugge', 'Gent'], correctIndex: 0, difficulty: 'easy' },
  
  // Normal questions - more specific
  { questionKey: 'game.wheel.q.profession', options: ['game.wheel.o.farmer', 'game.wheel.o.blacksmith', 'game.wheel.o.boquillon', 'game.wheel.o.baker'], correctIndex: 2, difficulty: 'normal' },
  { questionKey: 'game.wheel.q.charlesLouis', options: ['game.wheel.o.farmer', 'game.wheel.o.carpenter', 'game.wheel.o.teacher', 'game.wheel.o.merchant'], correctIndex: 1, difficulty: 'normal' },
  { questionKey: 'game.wheel.q.nameChange', options: ['Deforce', 'Delforge', 'Laforce', 'Deforche'], correctIndex: 0, difficulty: 'normal' },
  { questionKey: 'game.wheel.q.craftsman', options: ['game.wheel.o.stonework', 'game.wheel.o.woodwork', 'game.wheel.o.metalwork', 'game.wheel.o.leatherwork'], correctIndex: 1, difficulty: 'normal' },
  { questionKey: 'game.wheel.q.dialect', options: ['Vlaams', 'Picardisch/Chti', 'Waals', 'Bretons'], correctIndex: 1, difficulty: 'normal' },
  { questionKey: 'game.wheel.q.jeanFollet', options: ['game.wheel.o.baker', 'game.wheel.o.surgeon', 'game.wheel.o.farmer', 'game.wheel.o.blacksmith'], correctIndex: 1, difficulty: 'normal' },
  { questionKey: 'game.wheel.q.bridePrice', options: ['200 pond', '400 pond', '600 pond', '1000 pond'], correctIndex: 1, difficulty: 'normal' },
  { questionKey: 'game.wheel.q.capinghem', options: ['Hubert Deleforge', 'Antoinette Follet', 'Jean Follet', 'Pierre Deleforge'], correctIndex: 1, difficulty: 'normal' },
  
  // Hard questions - detailed knowledge
  { questionKey: 'game.wheel.q.forest', options: ['Bois de Boulogne', 'Bois d\'Haubourdin', 'Forêt de Nieppe', 'Forêt de Raismes'], correctIndex: 1, difficulty: 'hard' },
  { questionKey: 'game.wheel.q.peaceAken', options: ['1648', '1659', '1668', '1678'], correctIndex: 2, difficulty: 'hard' },
  { questionKey: 'game.wheel.q.edictNantes', options: ['1598', '1648', '1685', '1715'], correctIndex: 2, difficulty: 'hard' },
  { questionKey: 'game.wheel.q.mandelvallei', options: ['Rijsel', 'Izegem', 'Gent', 'Antwerpen'], correctIndex: 1, difficulty: 'hard' },
  { questionKey: 'game.wheel.q.distanceKm', options: ['25 km', '50 km', '100 km', '200 km'], correctIndex: 1, difficulty: 'hard' },
  { questionKey: 'game.wheel.q.signeSystem', options: ['game.wheel.o.reward', 'game.wheel.o.punishment', 'game.wheel.o.diploma', 'game.wheel.o.uniform'], correctIndex: 1, difficulty: 'hard' },
  { questionKey: 'game.wheel.q.notaryType', options: ['game.wheel.o.verbal', 'game.wheel.o.written', 'game.wheel.o.church', 'game.wheel.o.royal'], correctIndex: 1, difficulty: 'hard' },
  { questionKey: 'game.wheel.q.weddingMonth', options: ['Januari', 'April', 'Juli', 'December'], correctIndex: 1, difficulty: 'hard' },
];

const SpinTheWheel = ({ onBack }: SpinTheWheelProps) => {
  const { t } = useLanguage();
  const { addScore, unlockAchievement } = useGame();
  const { 
    playAchievementSound, 
    playMemoryMatchSound, 
    playWheelTickSound, 
    playJackpotSound, 
    playBonusSound,
    playWheelStartSound 
  } = useAchievementSound();

  // Game state
  const [gameStarted, setGameStarted] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [questionsRemaining, setQuestionsRemaining] = useState(8);
  const [totalWon, setTotalWon] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [currentSegment, setCurrentSegment] = useState<WheelSegment | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerResult, setAnswerResult] = useState<'correct' | 'wrong' | null>(null);
  const [pulsePointer, setPulsePointer] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(0);
  const [usedQuestions, setUsedQuestions] = useState<number[]>([]);
  const [tickIntervalId, setTickIntervalId] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [bonusPoints, setBonusPoints] = useState<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const segmentAngle = 360 / wheelSegments.length;
  const currentSettings = difficultySettings[difficulty];

  // Get wheel segments with adjusted points based on difficulty
  const getAdjustedSegments = useCallback(() => {
    return wheelSegments.map(seg => ({
      ...seg,
      points: Math.round(seg.basePoints * currentSettings.multiplier),
      icon: String(Math.round(seg.basePoints * currentSettings.multiplier)),
    }));
  }, [currentSettings.multiplier]);

  const adjustedSegments = getAdjustedSegments();

  // Animated glow effect and tick sounds during spin
  useEffect(() => {
    if (isSpinning) {
      const glowInterval = setInterval(() => {
        setGlowIntensity(prev => (prev + 0.1) % 1);
      }, 50);
      
      let tickDelay = 50;
      let tickCount = 0;
      const maxTicks = 60;
      
      const scheduleTick = () => {
        if (tickCount >= maxTicks) return;
        
        const timeout = setTimeout(() => {
          playWheelTickSound();
          tickCount++;
          tickDelay = 50 + (tickCount / maxTicks) * 300;
          scheduleTick();
        }, tickDelay);
        
        setTickIntervalId(timeout);
      };
      
      playWheelStartSound();
      scheduleTick();
      
      return () => {
        clearInterval(glowInterval);
        if (tickIntervalId) clearTimeout(tickIntervalId);
      };
    } else {
      setGlowIntensity(0);
    }
  }, [isSpinning, playWheelTickSound, playWheelStartSound]);

  // Filter questions by difficulty - include easier questions in harder modes
  const getAvailableQuestions = useCallback(() => {
    if (difficulty === 'easy') {
      return familyQuestions.filter(q => q.difficulty === 'easy');
    } else if (difficulty === 'normal') {
      return familyQuestions.filter(q => q.difficulty === 'easy' || q.difficulty === 'normal');
    }
    return familyQuestions; // hard mode gets all questions
  }, [difficulty]);

  const getRandomQuestion = useCallback(() => {
    const difficultyQuestions = getAvailableQuestions();
    const availableQuestions = difficultyQuestions
      .map((q, i) => ({ ...q, originalIndex: familyQuestions.indexOf(q) }))
      .filter(q => !usedQuestions.includes(q.originalIndex));
    
    if (availableQuestions.length === 0) {
      setUsedQuestions([]);
      const randomIndex = Math.floor(Math.random() * difficultyQuestions.length);
      return { question: difficultyQuestions[randomIndex], index: familyQuestions.indexOf(difficultyQuestions[randomIndex]) };
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selected = availableQuestions[randomIndex];
    return { question: selected, index: selected.originalIndex };
  }, [usedQuestions, getAvailableQuestions]);

  const spinWheel = useCallback(() => {
    if (isSpinning || questionsRemaining <= 0) return;

    setIsSpinning(true);
    setShowQuestion(false);
    setCurrentSegment(null);
    setSelectedAnswer(null);
    setAnswerResult(null);
    setPulsePointer(true);

    const segments = adjustedSegments;
    const fullRotations = (5 + Math.random() * 3) * 360;
    const randomSegment = Math.floor(Math.random() * segments.length);
    const segmentOffset = randomSegment * segmentAngle + segmentAngle / 2;
    const newRotation = rotation + fullRotations + segmentOffset;

    setRotation(newRotation);

    setTimeout(() => {
      const segment = segments[randomSegment];
      setCurrentSegment(segment);
      setIsSpinning(false);
      setPulsePointer(false);

      // Get a random question
      const { question, index } = getRandomQuestion();
      setCurrentQuestion(question);
      setUsedQuestions(prev => [...prev, index]);
      setShowQuestion(true);
      
      // Start timer for hard mode
      if (difficulty === 'hard' && difficultySettings.hard.timerSeconds > 0) {
        setTimeRemaining(difficultySettings.hard.timerSeconds);
      }
      
      playMemoryMatchSound();
    }, 4000);
  }, [isSpinning, questionsRemaining, rotation, segmentAngle, getRandomQuestion, playMemoryMatchSound, adjustedSegments, difficulty]);

  // Timer effect for hard mode
  useEffect(() => {
    if (showQuestion && difficulty === 'hard' && timeRemaining > 0 && selectedAnswer === null) {
      timerRef.current = setTimeout(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
    
    // Time's up - auto-submit wrong answer
    if (showQuestion && difficulty === 'hard' && timeRemaining === 0 && selectedAnswer === null && currentQuestion) {
      handleTimeUp();
    }
  }, [showQuestion, difficulty, timeRemaining, selectedAnswer]);

  const handleTimeUp = useCallback(() => {
    if (selectedAnswer !== null || !currentQuestion || !currentSegment) return;
    
    // Mark as wrong answer due to timeout
    setSelectedAnswer(-1); // -1 indicates timeout
    setAnswerResult('wrong');
    playBonusSound();
    
    setTimeout(() => {
      setShowQuestion(false);
      setCurrentQuestion(null);
      setTimeRemaining(0);
      setQuestionsRemaining(prev => prev - 1);
      
      if (questionsRemaining <= 1) {
        setGameComplete(true);
        if (correctAnswers >= 6) {
          unlockAchievement('wheel_master');
        }
        if (totalWon >= 200) {
          unlockAchievement('wheel_jackpot');
        }
      }
    }, 2000);
  }, [selectedAnswer, currentQuestion, currentSegment, questionsRemaining, correctAnswers, totalWon, playBonusSound, unlockAchievement]);

  // Calculate points based on current segment (with difficulty multiplier already applied)
  const getCurrentPoints = useCallback(() => {
    if (!currentSegment) return 0;
    // Find the adjusted segment to get correct points
    const segmentIndex = wheelSegments.findIndex(s => s.id === currentSegment.id);
    if (segmentIndex === -1) return 0;
    return adjustedSegments[segmentIndex].points;
  }, [currentSegment, adjustedSegments]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || !currentQuestion || !currentSegment) return;
    
    // Clear timer and calculate bonus
    if (timerRef.current) clearTimeout(timerRef.current);
    
    // Calculate speed bonus for hard mode (up to 50% extra points based on remaining time)
    let speedBonus = 0;
    if (difficulty === 'hard' && timeRemaining > 0) {
      const maxTime = difficultySettings.hard.timerSeconds;
      const timeRatio = timeRemaining / maxTime;
      speedBonus = Math.round(getCurrentPoints() * 0.5 * timeRatio);
    }
    setBonusPoints(speedBonus);
    setTimeRemaining(0);
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestion.correctIndex;
    setAnswerResult(isCorrect ? 'correct' : 'wrong');
    
    if (isCorrect) {
      const basePoints = getCurrentPoints();
      const totalPoints = basePoints + speedBonus;
      setTotalWon(prev => prev + totalPoints);
      setCorrectAnswers(prev => prev + 1);
      addScore(totalPoints);
      
      if (totalPoints >= 50) {
        playJackpotSound();
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      } else {
        playAchievementSound();
      }
    } else {
      playBonusSound();
    }
    
    setTimeout(() => {
      setShowQuestion(false);
      setCurrentQuestion(null);
      setBonusPoints(0);
      setQuestionsRemaining(prev => prev - 1);
      
      // Check game complete after decrementing
      if (questionsRemaining <= 1) {
        setGameComplete(true);
        if (correctAnswers >= 6) {
          unlockAchievement('wheel_master');
        }
        if (totalWon >= 200) {
          unlockAchievement('wheel_jackpot');
        }
      }
    }, 2000);
  };

  const startGame = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setQuestionsRemaining(difficultySettings[selectedDifficulty].questionsCount);
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setQuestionsRemaining(currentSettings.questionsCount);
    setTotalWon(0);
    setCorrectAnswers(0);
    setRotation(0);
    setCurrentSegment(null);
    setCurrentQuestion(null);
    setShowQuestion(false);
    setGameComplete(false);
    setSelectedAnswer(null);
    setAnswerResult(null);
    setUsedQuestions([]);
    setTimeRemaining(0);
    setBonusPoints(0);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // Difficulty selection screen
  if (!gameStarted) {
    return (
      <section className="section-padding bg-gradient-to-b from-background to-card min-h-screen overflow-hidden">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{t('game.back')}</span>
            </button>
            <MuteButton />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('game.wheel.title')}
            </h2>
            <p className="text-muted-foreground mb-12 max-w-xl mx-auto">
              {t('game.wheel.instructionQuiz')}
            </p>

            <h3 className="text-xl font-semibold text-foreground mb-6">
              {t('game.wheel.selectDifficulty')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              {/* Easy */}
              <motion.button
                onClick={() => startGame('easy')}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="relative p-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-600/10 border-2 border-green-500/30 hover:border-green-500 transition-all group"
              >
                <div className="absolute top-4 right-4 px-2 py-1 bg-green-500/20 rounded-full text-xs text-green-500 font-medium">
                  x0.75
                </div>
                <Zap className="w-12 h-12 mx-auto mb-4 text-green-500" />
                <h4 className="text-xl font-bold text-green-500 mb-2">{t('game.wheel.diff.easy')}</h4>
                <p className="text-sm text-muted-foreground mb-3">{t('game.wheel.diff.easyDesc')}</p>
                <div className="text-sm text-green-500/80">
                  {difficultySettings.easy.questionsCount} {t('game.wheel.questionsLeft')}
                </div>
              </motion.button>

              {/* Normal */}
              <motion.button
                onClick={() => startGame('normal')}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="relative p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/30 hover:border-primary transition-all group"
              >
                <div className="absolute top-4 right-4 px-2 py-1 bg-primary/20 rounded-full text-xs text-primary font-medium">
                  x1.0
                </div>
                <Target className="w-12 h-12 mx-auto mb-4 text-primary" />
                <h4 className="text-xl font-bold text-primary mb-2">{t('game.wheel.diff.normal')}</h4>
                <p className="text-sm text-muted-foreground mb-3">{t('game.wheel.diff.normalDesc')}</p>
                <div className="text-sm text-primary/80">
                  {difficultySettings.normal.questionsCount} {t('game.wheel.questionsLeft')}
                </div>
              </motion.button>

              {/* Hard */}
              <motion.button
                onClick={() => startGame('hard')}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="relative p-6 rounded-2xl bg-gradient-to-br from-red-500/20 to-red-600/10 border-2 border-red-500/30 hover:border-red-500 transition-all group"
              >
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className="px-2 py-1 bg-red-500/20 rounded-full text-xs text-red-500 font-medium">
                    x1.5
                  </span>
                  <span className="px-2 py-1 bg-red-500/20 rounded-full text-xs text-red-500 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {difficultySettings.hard.timerSeconds}s
                  </span>
                </div>
                <Flame className="w-12 h-12 mx-auto mb-4 text-red-500" />
                <h4 className="text-xl font-bold text-red-500 mb-2">{t('game.wheel.diff.hard')}</h4>
                <p className="text-sm text-muted-foreground mb-3">{t('game.wheel.diff.hardDesc')}</p>
                <div className="text-sm text-red-500/80">
                  {difficultySettings.hard.questionsCount} {t('game.wheel.questionsLeft')}
                </div>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding bg-gradient-to-b from-background to-card min-h-screen overflow-hidden">
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
            {/* Difficulty indicator */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
              difficulty === 'easy' ? 'bg-green-500/10 border-green-500/30 text-green-500' :
              difficulty === 'hard' ? 'bg-red-500/10 border-red-500/30 text-red-500' :
              'bg-primary/10 border-primary/30 text-primary'
            }`}>
              {difficulty === 'easy' && <Zap className="w-4 h-4" />}
              {difficulty === 'normal' && <Target className="w-4 h-4" />}
              {difficulty === 'hard' && <Flame className="w-4 h-4" />}
              <span className="text-sm font-medium">{t(`game.wheel.diff.${difficulty}`)}</span>
            </div>
            <motion.div 
              className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 shadow-card"
              animate={{ scale: questionsRemaining <= 2 ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 0.5, repeat: questionsRemaining <= 2 ? Infinity : 0 }}
            >
              <Sparkles className="w-4 h-4 text-gold" />
              <span className="text-foreground font-medium">{questionsRemaining}</span>
              <span className="text-muted-foreground text-sm">{t('game.wheel.questionsLeft')}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-2 bg-card border border-border rounded-lg px-3 py-2 shadow-card"
            >
              <Trophy className="w-4 h-4 text-primary" />
              <span className="text-foreground font-medium">{totalWon}</span>
              <span className="text-muted-foreground text-sm">{t('game.points')}</span>
            </motion.div>
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t('game.wheel.title')}
          </h2>
          <p className="text-muted-foreground">
            {t('game.wheel.instructionQuiz')}
          </p>
        </motion.div>

        {/* Confetti */}
        <Confetti isActive={showConfetti} duration={3000} />

        {/* Wheel Container */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Decorative lights around the wheel */}
          <div className="absolute w-80 h-80 md:w-[26rem] md:h-[26rem] rounded-full">
            {[...Array(16)].map((_, i) => {
              const angle = (i * 22.5 * Math.PI) / 180;
              const x = Math.cos(angle) * 48;
              const y = Math.sin(angle) * 48;
              return (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    left: `calc(50% + ${x}% - 6px)`,
                    top: `calc(50% + ${y}% - 6px)`,
                    background: isSpinning 
                      ? `hsl(${(i * 22.5 + glowIntensity * 360) % 360}, 70%, 60%)` 
                      : 'hsl(var(--gold))',
                    boxShadow: isSpinning 
                      ? `0 0 10px 3px hsl(${(i * 22.5 + glowIntensity * 360) % 360}, 70%, 60%)` 
                      : '0 0 8px 2px hsl(var(--gold) / 0.5)',
                  }}
                  animate={isSpinning ? { 
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  } : { scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.3, 
                    repeat: isSpinning ? Infinity : 0, 
                    delay: i * 0.05 
                  }}
                />
              );
            })}
          </div>

          {/* Pointer with 3D effect */}
          <motion.div 
            className="absolute top-0 z-30"
            style={{ transform: 'translateY(-5px)' }}
            animate={pulsePointer ? { 
              scale: [1, 1.1, 1],
              filter: ['drop-shadow(0 4px 8px rgba(0,0,0,0.3))', 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))', 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))']
            } : {}}
            transition={{ duration: 0.5, repeat: pulsePointer ? Infinity : 0 }}
          >
            <svg width="50" height="60" viewBox="0 0 50 60" className="drop-shadow-lg">
              <defs>
                <linearGradient id="pointerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="50%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--primary) / 0.7)" />
                </linearGradient>
                <filter id="pointerShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.4"/>
                </filter>
              </defs>
              <polygon 
                points="25,55 5,5 25,15 45,5" 
                fill="url(#pointerGradient)"
                filter="url(#pointerShadow)"
                stroke="hsl(var(--primary-foreground) / 0.3)"
                strokeWidth="1"
              />
              <polygon 
                points="25,50 10,10 25,18" 
                fill="hsl(var(--primary) / 0.3)"
              />
            </svg>
          </motion.div>

          {/* 3D Wheel with enhanced visuals */}
          <div 
            className="relative w-72 h-72 md:w-96 md:h-96"
            style={{ perspective: '1000px' }}
          >
            {/* Outer glow ring */}
            <motion.div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #7c3aed, #f59e0b, #10b981, #3b82f6, #ec4899, #7c3aed)',
                filter: 'blur(20px)',
                opacity: isSpinning ? 0.6 : 0.3,
              }}
              animate={isSpinning ? { 
                rotate: 360,
                scale: [1, 1.05, 1]
              } : {}}
              transition={{ 
                rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                scale: { duration: 0.5, repeat: Infinity }
              }}
            />

            {/* Main wheel container with 3D tilt */}
            <motion.div
              className="relative w-full h-full"
              style={{ 
                transformStyle: 'preserve-3d',
              }}
              animate={isSpinning ? {
                rotateX: [0, 5, 0, -5, 0],
                rotateY: [0, 5, 0, -5, 0],
              } : {}}
              transition={{ duration: 0.3, repeat: isSpinning ? Infinity : 0 }}
            >
              {/* Wheel shadow */}
              <div 
                className="absolute inset-4 rounded-full bg-black/30 blur-xl"
                style={{ transform: 'translateY(10px) translateZ(-20px)' }}
              />

              {/* Main wheel */}
              <motion.div
                className="w-full h-full rounded-full relative overflow-hidden"
                style={{ 
                  rotate: rotation,
                  boxShadow: `
                    0 0 0 8px hsl(var(--border)),
                    0 0 0 12px hsl(var(--card)),
                    0 0 30px 5px rgba(0,0,0,0.3),
                    inset 0 0 30px rgba(0,0,0,0.2)
                  `,
                }}
                animate={{ rotate: rotation }}
                transition={{ duration: 4, ease: [0.2, 0.8, 0.2, 1] }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <defs>
                    {adjustedSegments.map((segment, index) => (
                      <linearGradient 
                        key={`gradient-${segment.id}`}
                        id={`segmentGradient${index}`}
                        x1="0%" 
                        y1="0%" 
                        x2="100%" 
                        y2="100%"
                      >
                        <stop offset="0%" stopColor={segment.color} />
                        <stop offset="100%" stopColor={segment.gradientEnd} />
                      </linearGradient>
                    ))}
                    <filter id="innerShadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
                      <feOffset in="blur" dx="1" dy="1" result="offsetBlur"/>
                      <feComposite in="SourceGraphic" in2="offsetBlur" operator="over"/>
                    </filter>
                  </defs>
                  
                  {adjustedSegments.map((segment, index) => {
                    const startAngle = index * segmentAngle - 90;
                    const endAngle = startAngle + segmentAngle;
                    const startRad = (startAngle * Math.PI) / 180;
                    const endRad = (endAngle * Math.PI) / 180;
                    
                    const x1 = 50 + 48 * Math.cos(startRad);
                    const y1 = 50 + 48 * Math.sin(startRad);
                    const x2 = 50 + 48 * Math.cos(endRad);
                    const y2 = 50 + 48 * Math.sin(endRad);
                    
                    const largeArcFlag = segmentAngle > 180 ? 1 : 0;
                    const pathData = `M 50 50 L ${x1} ${y1} A 48 48 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                    
                    const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180;
                    const textX = 50 + 32 * Math.cos(midAngle);
                    const textY = 50 + 32 * Math.sin(midAngle);
                    const textRotation = (startAngle + endAngle) / 2 + 90;
                    
                    return (
                      <g key={segment.id}>
                        <path
                          d={pathData}
                          fill={`url(#segmentGradient${index})`}
                          stroke="rgba(255,255,255,0.3)"
                          strokeWidth="0.5"
                          filter="url(#innerShadow)"
                        />
                        <path
                          d={`M 50 50 L ${x1} ${y1}`}
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth="0.3"
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill="white"
                          fontSize="5"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${textRotation}, ${textX}, ${textY})`}
                          style={{ 
                            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                          }}
                        >
                          {segment.icon}
                        </text>
                      </g>
                    );
                  })}
                  
                  {/* Outer ring decoration */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="49" 
                    fill="none" 
                    stroke="rgba(255,255,255,0.2)" 
                    strokeWidth="1"
                  />
                  
                  {/* Center hub with 3D effect */}
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="12" 
                    fill="url(#centerGradient)"
                    stroke="hsl(var(--border))"
                    strokeWidth="1"
                  />
                  <defs>
                    <radialGradient id="centerGradient" cx="30%" cy="30%">
                      <stop offset="0%" stopColor="hsl(var(--card))" />
                      <stop offset="100%" stopColor="hsl(var(--background))" />
                    </radialGradient>
                  </defs>
                  <circle 
                    cx="50" 
                    cy="50" 
                    r="8" 
                    fill="hsl(var(--primary))"
                    style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                  />
                  <circle 
                    cx="48" 
                    cy="48" 
                    r="3" 
                    fill="rgba(255,255,255,0.3)"
                  />
                  {/* Question mark in center */}
                  <text
                    x="50"
                    y="51"
                    fill="white"
                    fontSize="8"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    ?
                  </text>
                </svg>
              </motion.div>
            </motion.div>
          </div>

          {/* Spin Button with enhanced styling */}
          <motion.button
            onClick={spinWheel}
            disabled={isSpinning || questionsRemaining <= 0}
            className="mt-10 px-10 py-5 rounded-2xl font-bold text-lg shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
            style={{
              background: isSpinning 
                ? 'linear-gradient(135deg, hsl(var(--muted)), hsl(var(--muted-foreground)))' 
                : 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.8))',
              color: 'hsl(var(--primary-foreground))',
              boxShadow: isSpinning 
                ? '0 4px 15px rgba(0,0,0,0.2)' 
                : '0 8px 30px hsl(var(--primary) / 0.4)',
            }}
            whileHover={{ scale: isSpinning ? 1 : 1.05, y: isSpinning ? 0 : -2 }}
            whileTap={{ scale: 0.95 }}
            animate={!isSpinning && questionsRemaining > 0 ? {
              boxShadow: [
                '0 8px 30px hsl(var(--primary) / 0.4)',
                '0 12px 40px hsl(var(--primary) / 0.6)',
                '0 8px 30px hsl(var(--primary) / 0.4)',
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            
            <span className="relative z-10 flex items-center gap-2">
              {isSpinning ? (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    ⭐
                  </motion.span>
                  {t('game.wheel.spinning')}
                </>
              ) : (
                <>
                  <Star className="w-5 h-5" />
                  {t('game.wheel.spinForQuestion')}
                </>
              )}
            </span>
          </motion.button>
        </div>

        {/* Question Modal */}
        <AnimatePresence>
          {showQuestion && currentQuestion && currentSegment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
                animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-card border-2 border-primary/30 rounded-3xl p-8 max-w-lg w-full shadow-elevated"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--card) / 0.9))',
                }}
              >
                {/* Timer and Points indicator */}
                <div className="flex justify-center items-center gap-4 mb-4">
                  <div 
                    className="px-4 py-2 rounded-full text-white font-bold text-lg"
                    style={{ background: `linear-gradient(135deg, ${currentSegment.color}, ${currentSegment.gradientEnd})` }}
                  >
                    +{getCurrentPoints()} {t('game.points')}
                  </div>
                  
                  {difficulty === 'hard' && timeRemaining > 0 && selectedAnswer === null && (
                    <motion.div 
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-lg ${
                        timeRemaining <= 5 ? 'bg-red-500 text-white' : 'bg-orange-500/20 text-orange-500 border border-orange-500/30'
                      }`}
                      animate={timeRemaining <= 5 ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      <Clock className="w-5 h-5" />
                      <span>{timeRemaining}s</span>
                    </motion.div>
                  )}
                </div>

                <motion.div 
                  className="text-5xl mb-4 text-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                >
                  ❓
                </motion.div>
                
                <h3 className="font-serif text-xl md:text-2xl font-bold text-foreground mb-6 text-center">
                  {t(currentQuestion.questionKey)}
                </h3>
                
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = selectedAnswer === index;
                    const isCorrect = index === currentQuestion.correctIndex;
                    const showResult = selectedAnswer !== null;
                    
                    let buttonStyle = 'bg-secondary hover:bg-secondary/80';
                    if (showResult) {
                      if (isCorrect) {
                        buttonStyle = 'bg-green-500 text-white';
                      } else if (isSelected && !isCorrect) {
                        buttonStyle = 'bg-red-500 text-white';
                      }
                    }
                    
                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={selectedAnswer !== null}
                        className={`px-6 py-4 rounded-xl font-medium text-lg transition-all flex items-center justify-between ${buttonStyle} disabled:cursor-not-allowed`}
                        whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                        whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                      >
                        <span>{option.startsWith('game.wheel.o.') ? t(option) : option}</span>
                        {showResult && isCorrect && <CheckCircle className="w-5 h-5" />}
                        {showResult && isSelected && !isCorrect && <XCircle className="w-5 h-5" />}
                      </motion.button>
                    );
                  })}
                </div>
                
                {answerResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-6 text-center text-lg font-bold ${answerResult === 'correct' ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {answerResult === 'correct' ? (
                      <div className="flex flex-col items-center gap-1">
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircle className="w-6 h-6" />
                          {t('game.wheel.correctAnswer')} +{getCurrentPoints()} {t('game.points')}!
                        </span>
                        {bonusPoints > 0 && (
                          <motion.span 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-gold flex items-center gap-1"
                          >
                            <Zap className="w-4 h-4" />
                            +{bonusPoints} {t('game.wheel.speedBonus')}!
                          </motion.span>
                        )}
                      </div>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <XCircle className="w-6 h-6" />
                        {selectedAnswer === -1 ? t('game.wheel.timeUp') : t('game.wheel.wrongAnswer')}
                      </span>
                    )}
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-card border-2 border-gold/30 rounded-3xl p-8 max-w-md w-full text-center shadow-elevated"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--background)))',
                }}
              >
                <motion.div 
                  className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    boxShadow: '0 8px 30px rgba(245, 158, 11, 0.4)',
                  }}
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Trophy className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="font-serif text-3xl font-bold text-foreground mb-2">
                  {t('game.wheel.complete')}
                </h3>
                <p className="text-muted-foreground mb-2">
                  {t('game.wheel.correctCount').replace('{count}', correctAnswers.toString()).replace('{total}', '8')}
                </p>
                <motion.div 
                  className="text-4xl font-bold text-gold mb-6"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {totalWon} {t('game.points')}
                </motion.div>
                
                <div className="flex flex-col gap-3">
                  <motion.button
                    onClick={resetGame}
                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground font-bold text-lg shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RotateCcw className="w-5 h-5" />
                    {t('game.wheel.playAgain')}
                  </motion.button>
                  <button
                    onClick={onBack}
                    className="w-full py-4 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
                  >
                    {t('game.back')}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reset Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium hover:bg-secondary/80 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            {t('game.wheel.reset')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpinTheWheel;
