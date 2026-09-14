import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RotateCcw, Trophy, Check, X, Keyboard, Sparkles, Timer, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { useAchievementSound } from '@/hooks/useAchievementSound';
import DifficultySelector, { Difficulty } from './DifficultySelector';
import MuteButton from './MuteButton';
import GameLeaderboard from './GameLeaderboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

// All 19 historical variants of the family name
const NAME_VARIANTS = [
  'Deforce',
  'Deforche',
  'Delforge',
  'Delforce',
  'Deleforge',
  'De Force',
  'De Forche',
  'De Forge',
  'Del Forge',
  'Del Force',
  'De la Forge',
  'Delaforge',
  'Deleforce',
  'De le Forge',
  'De le Force',
  'Delforghe',
  'Deforcq',
  'Deforck',
  'Deforch',
];

interface NameSpellingChallengeProps {
  onBack: () => void;
  difficulty: Difficulty;
  onDifficultyChange: (d: Difficulty) => void;
}

const getDifficultySettings = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'easy':
      return { 
        targetCount: 8, 
        scoreMultiplier: 0.8, 
        showHints: true,
        timeLimit: 0, // no time limit
      };
    case 'normal':
      return { 
        targetCount: 12, 
        scoreMultiplier: 1.0, 
        showHints: false,
        timeLimit: 0,
      };
    case 'hard':
      return { 
        targetCount: 19, 
        scoreMultiplier: 1.5, 
        showHints: false,
        timeLimit: 180, // 3 minutes
      };
  }
};

const translations = {
  nl: {
    title: 'Naamspelling Challenge',
    subtitle: 'Type alle historische varianten van de familienaam',
    found: 'Gevonden',
    remaining: 'resterend',
    inputPlaceholder: 'Type een naamvariant...',
    alreadyFound: 'Al gevonden!',
    correct: 'Correct!',
    incorrect: 'Niet correct',
    complete: 'Fantastisch!',
    completeDesc: 'Je hebt alle naamvarianten gevonden!',
    score: 'Score',
    bestScore: 'Beste score',
    newBest: 'Nieuw record!',
    playAgain: 'Opnieuw spelen',
    back: 'Terug',
    hint: 'Hint: probeer variaties met "De", "Del", "Dela" of dubbele letters',
    timeLeft: 'Tijd over',
    timeUp: 'Tijd is op!',
    variants: 'varianten',
    showHint: 'Toon hint',
    hintsUsed: 'Hints gebruikt',
    hintCost: 'Kost 25 punten',
    submitScore: 'Score opslaan',
    yourName: 'Jouw naam',
    namePlaceholder: 'Voer je naam in...',
    submitted: 'Opgeslagen!',
  },
  fr: {
    title: 'Défi d\'orthographe',
    subtitle: 'Tapez toutes les variantes historiques du nom de famille',
    found: 'Trouvés',
    remaining: 'restants',
    inputPlaceholder: 'Tapez une variante...',
    alreadyFound: 'Déjà trouvé!',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    complete: 'Fantastique!',
    completeDesc: 'Vous avez trouvé toutes les variantes!',
    score: 'Score',
    bestScore: 'Meilleur score',
    newBest: 'Nouveau record!',
    playAgain: 'Rejouer',
    back: 'Retour',
    hint: 'Indice: essayez les variations avec "De", "Del", "Dela" ou lettres doubles',
    timeLeft: 'Temps restant',
    timeUp: 'Temps écoulé!',
    variants: 'variantes',
    showHint: 'Afficher indice',
    hintsUsed: 'Indices utilisés',
    hintCost: 'Coûte 25 points',
    submitScore: 'Enregistrer le score',
    yourName: 'Votre nom',
    namePlaceholder: 'Entrez votre nom...',
    submitted: 'Enregistré!',
  },
  en: {
    title: 'Name Spelling Challenge',
    subtitle: 'Type all historical variants of the family name',
    found: 'Found',
    remaining: 'remaining',
    inputPlaceholder: 'Type a name variant...',
    alreadyFound: 'Already found!',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    complete: 'Fantastic!',
    completeDesc: 'You found all name variants!',
    score: 'Score',
    bestScore: 'Best score',
    newBest: 'New record!',
    playAgain: 'Play again',
    back: 'Back',
    hint: 'Hint: try variations with "De", "Del", "Dela" or double letters',
    timeLeft: 'Time left',
    timeUp: 'Time\'s up!',
    variants: 'variants',
    showHint: 'Show hint',
    hintsUsed: 'Hints used',
    hintCost: 'Costs 25 points',
    submitScore: 'Submit score',
    yourName: 'Your name',
    namePlaceholder: 'Enter your name...',
    submitted: 'Submitted!',
  },
  es: {
    title: 'Desafío de ortografía',
    subtitle: 'Escribe todas las variantes históricas del apellido',
    found: 'Encontrados',
    remaining: 'restantes',
    inputPlaceholder: 'Escribe una variante...',
    alreadyFound: '¡Ya encontrado!',
    correct: '¡Correcto!',
    incorrect: 'Incorrecto',
    complete: '¡Fantástico!',
    completeDesc: '¡Has encontrado todas las variantes!',
    score: 'Puntuación',
    bestScore: 'Mejor puntuación',
    newBest: '¡Nuevo récord!',
    playAgain: 'Jugar de nuevo',
    back: 'Volver',
    hint: 'Pista: prueba variaciones con "De", "Del", "Dela" o letras dobles',
    timeLeft: 'Tiempo restante',
    timeUp: '¡Tiempo agotado!',
    variants: 'variantes',
    showHint: 'Mostrar pista',
    hintsUsed: 'Pistas usadas',
    hintCost: 'Cuesta 25 puntos',
    submitScore: 'Guardar puntuación',
    yourName: 'Tu nombre',
    namePlaceholder: 'Ingresa tu nombre...',
    submitted: '¡Guardado!',
  },
  pcd: {
    title: 'Défi d\'orthographe',
    subtitle: 'Tapez toutes les variantes du nom d\' famile',
    found: 'Trouvés',
    remaining: 'restants',
    inputPlaceholder: 'Tapez eune variante...',
    alreadyFound: 'Déjà trouvé!',
    correct: 'Correct!',
    incorrect: 'Incorrect',
    complete: 'Fantastique!',
    completeDesc: 'Vous avez trouvé toutes les variantes!',
    score: 'Score',
    bestScore: 'Meilleur score',
    newBest: 'Nouveau record!',
    playAgain: 'Rejouer',
    back: 'Retour',
    hint: 'Indice: essayez aveuc "De", "Del", "Dela" ou lettres doubles',
    timeLeft: 'Temps restant',
    timeUp: 'Temps écoulé!',
    variants: 'variantes',
    showHint: 'Afficher indice',
    hintsUsed: 'Indices utilisés',
    hintCost: 'Coûte 25 points',
    submitScore: 'Enregistrer l\'score',
    yourName: 'Votre nom',
    namePlaceholder: 'Entrez votre nom...',
    submitted: 'Enregistré!',
  },
  vls: {
    title: 'Naamspelling Challenge',
    subtitle: 'Type olle historische varianten van de familienoame',
    found: 'Gevonden',
    remaining: 'over',
    inputPlaceholder: 'Type e noamvariant...',
    alreadyFound: 'Al gevonden!',
    correct: 'Correct!',
    incorrect: 'Nie juust',
    complete: 'Fantastisch!',
    completeDesc: 'Ge eit olle noamvarianten gevonden!',
    score: 'Score',
    bestScore: 'Beste score',
    newBest: 'Nieuw record!',
    playAgain: 'Opnieuw speeln',
    back: 'Terug',
    hint: 'Hint: probeer variasies me "De", "Del", "Dela" of dubbele letters',
    timeLeft: 'Tyd over',
    timeUp: 'Tyd is op!',
    variants: 'varianten',
    showHint: 'Toon hint',
    hintsUsed: 'Hints gebruikt',
    hintCost: 'Kost 25 punten',
    submitScore: 'Score opslaan',
    yourName: 'Jouw naam',
    namePlaceholder: 'Voer je naam in...',
    submitted: 'Opgeslagen!',
  },
  de: {
    title: 'Namens-Schreibchallenge',
    subtitle: 'Tippe alle historischen Varianten des Familiennamens',
    found: 'Gefunden',
    remaining: 'übrig',
    inputPlaceholder: 'Tippe eine Namensvariante...',
    alreadyFound: 'Bereits gefunden!',
    correct: 'Richtig!',
    incorrect: 'Falsch',
    complete: 'Fantastisch!',
    completeDesc: 'Du hast alle Namensvarianten gefunden!',
    score: 'Punktzahl',
    bestScore: 'Beste Punktzahl',
    newBest: 'Neuer Rekord!',
    playAgain: 'Nochmal spielen',
    back: 'Zurück',
    hint: 'Tipp: probiere Variationen mit "De", "Del", "Dela" oder Doppelbuchstaben',
    timeLeft: 'Zeit übrig',
    timeUp: 'Zeit ist um!',
    variants: 'Varianten',
    showHint: 'Tipp anzeigen',
    hintsUsed: 'Tipps verwendet',
    hintCost: 'Kostet 25 Punkte',
    submitScore: 'Punktzahl speichern',
    yourName: 'Dein Name',
    namePlaceholder: 'Gib deinen Namen ein...',
    submitted: 'Gespeichert!',
  },
  sv: {
    title: 'Namnstavningsutmaning',
    subtitle: 'Skriv alla historiska varianter av familjenamnet',
    found: 'Hittade',
    remaining: 'kvar',
    inputPlaceholder: 'Skriv en namnvariant...',
    alreadyFound: 'Redan hittad!',
    correct: 'Rätt!',
    incorrect: 'Fel',
    complete: 'Fantastiskt!',
    completeDesc: 'Du hittade alla namnvarianter!',
    score: 'Poäng',
    bestScore: 'Bästa poäng',
    newBest: 'Nytt rekord!',
    playAgain: 'Spela igen',
    back: 'Tillbaka',
    hint: 'Ledtråd: prova variationer med "De", "Del", "Dela" eller dubbla bokstäver',
    timeLeft: 'Tid kvar',
    timeUp: 'Tiden är ute!',
    variants: 'varianter',
    showHint: 'Visa ledtråd',
    hintsUsed: 'Ledtrådar använda',
    hintCost: 'Kostar 25 poäng',
    submitScore: 'Spara poäng',
    yourName: 'Ditt namn',
    namePlaceholder: 'Ange ditt namn...',
    submitted: 'Sparat!',
  },
};

const NameSpellingChallenge = ({ onBack, difficulty, onDifficultyChange }: NameSpellingChallengeProps) => {
  const { language } = useLanguage();
  const { unlockAchievement, setBestScore, getBestScore, addScore } = useGame();
  const { playMemoryMatchSound, playErrorSound, playAchievementSound } = useAchievementSound();
  const navigate = useNavigate();
  
  const t = translations[language as keyof typeof translations] || translations.nl;
  const settings = getDifficultySettings(difficulty);
  const currentBestScore = getBestScore('namespelling', difficulty);
  
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Select target variants based on difficulty
  const [targetVariants, setTargetVariants] = useState<string[]>([]);
  const [foundVariants, setFoundVariants] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'correct' | 'incorrect' | 'duplicate' | null; message: string }>({ type: null, message: '' });
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(settings.timeLimit);
  const [gameStarted, setGameStarted] = useState(false);
  const [isNewBest, setIsNewBest] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [revealedHints, setRevealedHints] = useState<Record<string, string>>({});
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [leaderboardKey, setLeaderboardKey] = useState(0);

  const initializeGame = useCallback(() => {
    // Shuffle and select variants based on difficulty
    const shuffled = [...NAME_VARIANTS].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, settings.targetCount);
    setTargetVariants(selected);
    setFoundVariants([]);
    setInputValue('');
    setFeedback({ type: null, message: '' });
    setGameComplete(false);
    setScore(0);
    setTimer(settings.timeLimit);
    setGameStarted(false);
    setIsNewBest(false);
    setTimeUp(false);
    setHintsUsed(0);
    setRevealedHints({});
    setShowNameInput(false);
    setScoreSubmitted(false);
  }, [settings.targetCount, settings.timeLimit]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame, difficulty]);

  // Timer effect for hard mode
  useEffect(() => {
    if (!gameStarted || settings.timeLimit === 0 || gameComplete || timeUp) return;
    
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          setTimeUp(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [gameStarted, settings.timeLimit, gameComplete, timeUp]);

  // Handle time up
  useEffect(() => {
    if (timeUp && !gameComplete) {
      const hintPenalty = hintsUsed * 25;
      const finalScore = Math.max(0, Math.round(foundVariants.length * 50 * settings.scoreMultiplier) - hintPenalty);
      setScore(finalScore);
      addScore(finalScore);
      
      if (finalScore > currentBestScore) {
        setBestScore('namespelling', difficulty, finalScore);
        setIsNewBest(true);
      }
    }
  }, [timeUp, gameComplete, foundVariants.length, settings.scoreMultiplier, addScore, currentBestScore, setBestScore, difficulty, hintsUsed]);

  const normalizeInput = (str: string) => {
    return str.trim().toLowerCase().replace(/\s+/g, ' ');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!gameStarted) {
      setGameStarted(true);
    }
    
    const normalizedInput = normalizeInput(inputValue);
    
    // Check if it's already found
    const alreadyFound = foundVariants.some(v => normalizeInput(v) === normalizedInput);
    if (alreadyFound) {
      setFeedback({ type: 'duplicate', message: t.alreadyFound });
      playErrorSound();
      setTimeout(() => setFeedback({ type: null, message: '' }), 1500);
      return;
    }
    
    // Check if it's a valid variant in our target list
    const matchedVariant = targetVariants.find(v => normalizeInput(v) === normalizedInput);
    
    if (matchedVariant) {
      const newFound = [...foundVariants, matchedVariant];
      setFoundVariants(newFound);
      setFeedback({ type: 'correct', message: t.correct });
      playMemoryMatchSound();
      setInputValue('');
      
      // Check if game complete
      if (newFound.length === targetVariants.length) {
        const timeBonus = settings.timeLimit > 0 ? Math.round(timer * 2) : 0;
        const hintPenalty = hintsUsed * 25;
        const finalScore = Math.max(0, Math.round((newFound.length * 100 + timeBonus) * settings.scoreMultiplier) - hintPenalty);
        setScore(finalScore);
        setGameComplete(true);
        addScore(finalScore);
        
        if (finalScore > currentBestScore) {
          setBestScore('namespelling', difficulty, finalScore);
          setIsNewBest(true);
        }
        
        // Unlock achievement for finding all 19 variants
        if (newFound.length === 19) {
          setTimeout(() => {
            unlockAchievement('naamspelling_meester');
            playAchievementSound();
          }, 500);
        }
      }
      
      setTimeout(() => setFeedback({ type: null, message: '' }), 1000);
    } else {
      setFeedback({ type: 'incorrect', message: t.incorrect });
      playErrorSound();
      setTimeout(() => setFeedback({ type: null, message: '' }), 1500);
    }
    
    inputRef.current?.focus();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get unfound variants for hint system
  const getUnfoundVariants = () => {
    return targetVariants.filter(v => !foundVariants.includes(v));
  };

  // Generate a hint for a specific variant (reveal more letters progressively)
  const generateHintForVariant = (variant: string, currentHint?: string) => {
    const revealCount = currentHint ? currentHint.replace(/[_\s]/g, '').length + 1 : 1;
    let hint = '';
    const indices: number[] = [];
    
    // First reveal first letter, then last letter, then random middle letters
    if (revealCount === 1) {
      indices.push(0);
    } else if (revealCount === 2) {
      indices.push(0, variant.length - 1);
    } else {
      indices.push(0, variant.length - 1);
      // Add random middle indices
      const middleIndices = Array.from({ length: variant.length - 2 }, (_, i) => i + 1);
      middleIndices.sort(() => Math.random() - 0.5);
      indices.push(...middleIndices.slice(0, revealCount - 2));
    }
    
    for (let i = 0; i < variant.length; i++) {
      if (variant[i] === ' ') {
        hint += ' ';
      } else if (indices.includes(i)) {
        hint += variant[i];
      } else {
        hint += '_';
      }
    }
    
    return hint;
  };

  const useHint = () => {
    const unfound = getUnfoundVariants();
    if (unfound.length === 0) return;
    
    // Pick a random unfound variant or one that already has partial hints
    const variantsWithHints = unfound.filter(v => revealedHints[v]);
    const variantsWithoutHints = unfound.filter(v => !revealedHints[v]);
    
    let targetVariant: string;
    if (variantsWithHints.length > 0 && Math.random() > 0.5) {
      // 50% chance to expand an existing hint
      targetVariant = variantsWithHints[Math.floor(Math.random() * variantsWithHints.length)];
    } else if (variantsWithoutHints.length > 0) {
      // Give hint for a new variant
      targetVariant = variantsWithoutHints[Math.floor(Math.random() * variantsWithoutHints.length)];
    } else {
      // All have hints, expand one
      targetVariant = variantsWithHints[Math.floor(Math.random() * variantsWithHints.length)];
    }
    
    const currentHint = revealedHints[targetVariant];
    const newHint = generateHintForVariant(targetVariant, currentHint);
    
    setRevealedHints(prev => ({
      ...prev,
      [targetVariant]: newHint
    }));
    setHintsUsed(prev => prev + 1);
    
    if (!gameStarted) {
      setGameStarted(true);
    }
  };

  const submitScoreToLeaderboard = async () => {
    const trimmedName = playerName.trim().slice(0, 100);
    if (!trimmedName || scoreSubmitted) return;
    
    try {
      // Require authentication for score submission
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        // Redirect to auth if not logged in
        navigate('/auth');
        return;
      }
      
      const { error } = await supabase
        .from('game_scores')
        .insert({
          user_id: user.id,
          display_name: trimmedName,
          game_type: 'namespelling',
          difficulty: difficulty,
          score: score,
        });
      
      if (error) throw error;
      
      setScoreSubmitted(true);
      setLeaderboardKey(prev => prev + 1); // Refresh leaderboard
    } catch (error: any) {
      console.error('Error submitting score:', error);
      // Silent fail is acceptable - user can still see local score
    }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-background to-card">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Button>
          
          <div className="flex items-center gap-4">
            <MuteButton />
            <DifficultySelector
              selectedDifficulty={difficulty}
              onSelect={(d) => {
                onDifficultyChange(d);
              }}
            />
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Keyboard className="w-5 h-5" />
            <span className="uppercase tracking-widest text-sm font-medium">
              {t.title}
            </span>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Progress & Timer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-6 mb-8"
        >
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2">
            <Check className="w-5 h-5 text-green-500" />
            <span className="font-medium">{foundVariants.length}</span>
            <span className="text-muted-foreground">/ {targetVariants.length} {t.found}</span>
          </div>
          
          {settings.timeLimit > 0 && (
            <div className={`relative flex items-center gap-3 rounded-xl px-4 py-2 border ${
              timer <= 30 ? 'bg-destructive/10 border-destructive/30 text-destructive' : 'bg-card border-border'
            }`}>
              {/* Circular Timer Animation */}
              <div className="relative w-10 h-10">
                <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                  {/* Background circle */}
                  <circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    className="stroke-muted/30"
                    strokeWidth="3"
                  />
                  {/* Animated progress circle */}
                  <motion.circle
                    cx="18"
                    cy="18"
                    r="15"
                    fill="none"
                    className={timer <= 30 ? 'stroke-destructive' : 'stroke-primary'}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={94.2} // 2 * PI * 15
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ 
                      strokeDashoffset: 94.2 * (1 - timer / settings.timeLimit)
                    }}
                    transition={{ duration: 0.5, ease: "linear" }}
                  />
                </svg>
                {/* Center pulse when low time */}
                {timer <= 30 && timer > 0 && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <div className="w-4 h-4 rounded-full bg-destructive/20" />
                  </motion.div>
                )}
              </div>
              
              {/* Time display */}
              <div className="flex flex-col">
                <span className={`font-bold font-mono text-lg leading-none ${
                  timer <= 30 ? 'animate-pulse' : ''
                }`}>
                  {formatTime(timer)}
                </span>
                <span className="text-xs text-muted-foreground">{t.timeLeft}</span>
              </div>
              
              {/* Warning indicator when time is low */}
              {timer <= 30 && timer > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-1 -right-1"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
                  </span>
                </motion.div>
              )}
            </div>
          )}
          
          {currentBestScore > 0 && (
            <div className="flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-xl px-4 py-2">
              <Trophy className="w-5 h-5 text-gold" />
              <span className="text-sm">{t.bestScore}: {currentBestScore}</span>
            </div>
          )}
        </motion.div>

        {/* Game Area */}
        {!gameComplete && !timeUp ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            {/* Input Form */}
            <form onSubmit={handleSubmit} className="mb-8">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={t.inputPlaceholder}
                    className={`text-lg h-14 ${
                      feedback.type === 'correct' ? 'border-green-500 bg-green-500/10' :
                      feedback.type === 'incorrect' || feedback.type === 'duplicate' ? 'border-destructive bg-destructive/10' : ''
                    }`}
                    autoFocus
                    autoComplete="off"
                    autoCapitalize="off"
                    spellCheck={false}
                  />
                  <AnimatePresence>
                    {feedback.type && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`absolute -bottom-6 left-0 text-sm font-medium ${
                          feedback.type === 'correct' ? 'text-green-500' : 'text-destructive'
                        }`}
                      >
                        {feedback.message}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Button type="submit" size="lg" className="h-14 px-8">
                  <Check className="w-5 h-5" />
                </Button>
              </div>
            </form>

            {/* Hint Button and Info */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <Button
                type="button"
                variant="outline"
                onClick={useHint}
                disabled={getUnfoundVariants().length === 0}
                className="flex items-center gap-2"
              >
                <Lightbulb className="w-4 h-4" />
                {t.showHint}
                <span className="text-xs text-muted-foreground">({t.hintCost})</span>
              </Button>
              
              {hintsUsed > 0 && (
                <span className="text-sm text-muted-foreground">
                  {t.hintsUsed}: {hintsUsed} (-{hintsUsed * 25} punten)
                </span>
              )}
            </div>

            {/* Hint for easy mode */}
            {settings.showHints && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-muted-foreground text-sm mb-6"
              >
                💡 {t.hint}
              </motion.p>
            )}

            {/* Found Variants Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {targetVariants.map((variant, index) => {
                const isFound = foundVariants.includes(variant);
                const hint = revealedHints[variant];
                return (
                  <motion.div
                    key={variant}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.02 }}
                    className={`p-3 rounded-lg border text-center font-medium transition-all ${
                      isFound 
                        ? 'bg-green-500/20 border-green-500/50 text-green-700 dark:text-green-400' 
                        : hint
                          ? 'bg-amber-500/20 border-amber-500/50 text-amber-700 dark:text-amber-400'
                          : 'bg-muted/30 border-border/50 text-muted-foreground/30'
                    }`}
                  >
                    {isFound ? (
                      <span className="flex items-center justify-center gap-1">
                        <Check className="w-4 h-4" />
                        {variant}
                      </span>
                    ) : hint ? (
                      <span className="font-mono tracking-wider">{hint}</span>
                    ) : (
                      <span>{'?'.repeat(variant.length > 8 ? 8 : variant.length)}</span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          /* Game Complete / Time Up Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center"
            >
              {gameComplete ? (
                <Sparkles className="w-10 h-10 text-gold" />
              ) : (
                <Timer className="w-10 h-10 text-muted-foreground" />
              )}
            </motion.div>
            
            <h3 className="font-serif text-3xl font-bold text-foreground mb-2">
              {gameComplete ? t.complete : t.timeUp}
            </h3>
            <p className="text-muted-foreground mb-6">
              {gameComplete ? t.completeDesc : `${foundVariants.length} / ${targetVariants.length} ${t.variants}`}
            </p>
            
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">{score}</p>
                <p className="text-sm text-muted-foreground">{t.score}</p>
              </div>
              {isNewBest && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="px-4 py-2 bg-gold/20 rounded-lg border border-gold/30"
                >
                  <Trophy className="w-5 h-5 text-gold mx-auto mb-1" />
                  <p className="text-sm font-medium text-gold">{t.newBest}</p>
                </motion.div>
              )}
            </div>

            {/* Submit to Leaderboard */}
            {score > 0 && !scoreSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8 p-4 bg-muted/30 rounded-xl border border-border"
              >
                <p className="text-sm font-medium mb-3">{t.yourName}</p>
                <div className="flex gap-2">
                  <Input
                    type="text"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="flex-1"
                    maxLength={100}
                  />
                  <Button 
                    onClick={submitScoreToLeaderboard}
                    disabled={!playerName.trim()}
                  >
                    <Trophy className="w-4 h-4 mr-2" />
                    {t.submitScore}
                  </Button>
                </div>
              </motion.div>
            )}

            {scoreSubmitted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8 p-3 bg-green-500/20 rounded-lg border border-green-500/30 text-green-700 dark:text-green-400"
              >
                <Check className="w-5 h-5 inline mr-2" />
                {t.submitted}
              </motion.div>
            )}

            {/* Show all found variants */}
            <div className="mb-8">
              <h4 className="text-sm font-medium text-muted-foreground mb-3">{t.found}:</h4>
              <div className="flex flex-wrap justify-center gap-2">
                {foundVariants.map((variant) => (
                  <span
                    key={variant}
                    className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-sm text-green-700 dark:text-green-400"
                  >
                    {variant}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.back}
              </Button>
              <Button onClick={initializeGame}>
                <RotateCcw className="w-4 h-4 mr-2" />
                {t.playAgain}
              </Button>
            </div>

            {/* Leaderboard */}
            <GameLeaderboard 
              key={leaderboardKey}
              gameType="namespelling" 
              currentDifficulty={difficulty} 
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default NameSpellingChallenge;
