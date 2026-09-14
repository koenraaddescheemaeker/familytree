import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, Loader2, Check, X, Trophy, RotateCcw, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import DifficultySelector, { Difficulty } from './DifficultySelector';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ChtiAudioQuizProps {
  onBack: () => void;
  difficulty: Difficulty;
  onDifficultyChange: (d: Difficulty) => void;
}

interface Expression {
  expression: string;
  meaning: string;
  category: string;
}

const allExpressions: Expression[] = [
  { expression: "Cha va ti?", meaning: "Hoe gaat het?", category: "greetings" },
  { expression: "Bonjour, biloute!", meaning: "Hallo, schat!", category: "greetings" },
  { expression: "Salut, min garchon!", meaning: "Dag, mijn jongen!", category: "greetings" },
  { expression: "À l'arvoïure!", meaning: "Tot ziens!", category: "greetings" },
  { expression: "Ch'est du carbon!", meaning: "Dat is geweldig!", category: "exclamations" },
  { expression: "Vingt dieusse!", meaning: "Hemeltje!", category: "exclamations" },
  { expression: "Milliard ed'z'os!", meaning: "Miljard beenderen!", category: "exclamations" },
  { expression: "Ej t'aime, min biloute", meaning: "Ik hou van je, schat", category: "love" },
  { expression: "T'es min p'tit cœur", meaning: "Je bent mijn hartje", category: "love" },
  { expression: "Viens m'faire un bisou", meaning: "Kom me een kusje geven", category: "love" },
  { expression: "J'ai faim comme un leu", meaning: "Ik heb honger als een wolf", category: "daily" },
  { expression: "I pleut des cordes", meaning: "Het regent pijpenstelen", category: "daily" },
];

// Browser TTS fallback
const speakWithBrowserTTS = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Browser TTS not supported'));
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr-FR';
    utterance.rate = 0.9;
    const voices = speechSynthesis.getVoices();
    const frenchVoice = voices.find(v => v.lang.startsWith('fr')) || voices[0];
    if (frenchVoice) utterance.voice = frenchVoice;
    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);
    speechSynthesis.speak(utterance);
  });
};

const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const ChtiAudioQuiz = ({ onBack, difficulty, onDifficultyChange }: ChtiAudioQuizProps) => {
  const { t, language } = useLanguage();
  const { addScore, unlockAchievement } = useGame();
  
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState<Expression[]>([]);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [hasListened, setHasListened] = useState(false);

  const questionsCount = difficulty === 'easy' ? 5 : difficulty === 'normal' ? 8 : 12;
  const optionsCount = difficulty === 'easy' ? 3 : difficulty === 'normal' ? 4 : 4;

  const generateOptions = useCallback((correctAnswer: string, count: number) => {
    const wrongAnswers = allExpressions
      .filter(e => e.meaning !== correctAnswer)
      .map(e => e.meaning);
    const shuffledWrong = shuffleArray(wrongAnswers).slice(0, count - 1);
    return shuffleArray([correctAnswer, ...shuffledWrong]);
  }, []);

  const startGame = useCallback(() => {
    const shuffled = shuffleArray(allExpressions).slice(0, questionsCount);
    setQuestions(shuffled);
    setCurrentQuestionIndex(0);
    setScore(0);
    setGameStarted(true);
    setGameOver(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setHasListened(false);
    
    if (shuffled.length > 0) {
      setOptions(generateOptions(shuffled[0].meaning, optionsCount));
    }
  }, [questionsCount, optionsCount, generateOptions]);

  const playAudio = async () => {
    if (isPlaying || isLoading || !questions[currentQuestionIndex]) return;
    
    setIsLoading(true);
    const text = questions[currentQuestionIndex].expression;

    try {
      // Get current session for auth
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.access_token) {
        // Fall back to browser TTS for unauthenticated users
        throw new Error('Not authenticated');
      }

      // Try ElevenLabs with user auth
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/elevenlabs-tts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) throw new Error('ElevenLabs failed');
      
      const audioBlob = await response.blob();
      if (audioBlob.type.includes('application/json')) throw new Error('Error response');

      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onplay = () => {
        setIsPlaying(true);
        setIsLoading(false);
      };
      audio.onended = () => {
        setIsPlaying(false);
        setHasListened(true);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch {
      // Fallback to browser TTS
      try {
        setIsLoading(false);
        setIsPlaying(true);
        await speakWithBrowserTTS(text);
        setIsPlaying(false);
        setHasListened(true);
      } catch {
        setIsPlaying(false);
        setIsLoading(false);
        toast.error(t('game.errors.audioFailed'));
      }
    }
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answer);
    const correct = answer === questions[currentQuestionIndex].meaning;
    setIsCorrect(correct);

    if (correct) {
      const points = difficulty === 'easy' ? 10 : difficulty === 'normal' ? 15 : 20;
      setScore(prev => prev + points);
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setHasListened(false);
        setOptions(generateOptions(questions[currentQuestionIndex + 1].meaning, optionsCount));
      } else {
        setGameOver(true);
        const finalScore = score + (correct ? (difficulty === 'easy' ? 10 : difficulty === 'normal' ? 15 : 20) : 0);
        addScore(finalScore);
        unlockAchievement('chti_listener');
        if (finalScore >= questionsCount * (difficulty === 'easy' ? 8 : difficulty === 'normal' ? 12 : 16)) {
          unlockAchievement('chti_expert');
        }
      }
    }, 1500);
  };

  // Translations
  const getTexts = () => {
    switch (language) {
      case 'nl':
        return {
          title: "Ch'ti Audio Quiz",
          subtitle: "Luister naar de uitdrukking en kies de juiste betekenis",
          start: "Start Quiz",
          listen: "Luister",
          question: "Vraag",
          score: "Score",
          gameOver: "Quiz Voltooid!",
          playAgain: "Opnieuw spelen",
          correct: "Correct!",
          wrong: "Fout!",
          listenFirst: "Luister eerst naar de uitdrukking",
        };
      case 'en':
        return {
          title: "Ch'ti Audio Quiz",
          subtitle: "Listen to the expression and choose the correct meaning",
          start: "Start Quiz",
          listen: "Listen",
          question: "Question",
          score: "Score",
          gameOver: "Quiz Complete!",
          playAgain: "Play Again",
          correct: "Correct!",
          wrong: "Wrong!",
          listenFirst: "Listen to the expression first",
        };
      case 'de':
        return {
          title: "Ch'ti Audio-Quiz",
          subtitle: "Hören Sie den Ausdruck und wählen Sie die richtige Bedeutung",
          start: "Quiz starten",
          listen: "Anhören",
          question: "Frage",
          score: "Punktzahl",
          gameOver: "Quiz abgeschlossen!",
          playAgain: "Erneut spielen",
          correct: "Richtig!",
          wrong: "Falsch!",
          listenFirst: "Hören Sie zuerst den Ausdruck",
        };
      case 'es':
        return {
          title: "Quiz de Audio Ch'ti",
          subtitle: "Escucha la expresión y elige el significado correcto",
          start: "Iniciar Quiz",
          listen: "Escuchar",
          question: "Pregunta",
          score: "Puntuación",
          gameOver: "¡Quiz Completado!",
          playAgain: "Jugar de nuevo",
          correct: "¡Correcto!",
          wrong: "¡Incorrecto!",
          listenFirst: "Primero escucha la expresión",
        };
      case 'fr':
        return {
          title: "Quiz Audio Ch'ti",
          subtitle: "Écoutez l'expression et choisissez le bon sens",
          start: "Commencer le Quiz",
          listen: "Écouter",
          question: "Question",
          score: "Score",
          gameOver: "Quiz Terminé!",
          playAgain: "Rejouer",
          correct: "Correct!",
          wrong: "Faux!",
          listenFirst: "Écoutez d'abord l'expression",
        };
      case 'pcd':
        return {
          title: "Quiz Audio Ch'ti",
          subtitle: "Écoutez l'expression pi choisissez l' bon sens",
          start: "Commeincher l' Quiz",
          listen: "Écouter",
          question: "Question",
          score: "Score",
          gameOver: "Quiz Terminé!",
          playAgain: "Rejouer",
          correct: "Correct!",
          wrong: "Faux!",
          listenFirst: "Écoutez d'abord l'expression",
        };
      case 'vls':
        return {
          title: "Ch'ti Audio Quiz",
          subtitle: "Luuster noa de uitdrukking en kies de juuste betekenis",
          start: "Start Quiz",
          listen: "Luustern",
          question: "Vroage",
          score: "Score",
          gameOver: "Quiz Kloor!",
          playAgain: "Opniew speeln",
          correct: "Juust!",
          wrong: "Fout!",
          listenFirst: "Luuster eerst noa de uitdrukking",
        };
      case 'sv':
        return {
          title: "Ch'ti Audioquiz",
          subtitle: "Lyssna på uttrycket och välj rätt betydelse",
          start: "Starta quiz",
          listen: "Lyssna",
          question: "Fråga",
          score: "Poäng",
          gameOver: "Quiz klar!",
          playAgain: "Spela igen",
          correct: "Rätt!",
          wrong: "Fel!",
          listenFirst: "Lyssna på uttrycket först",
        };
      default:
        return {
          title: "Ch'ti Audio Quiz",
          subtitle: "Luister naar de uitdrukking en kies de juiste betekenis",
          start: "Start Quiz",
          listen: "Luister",
          question: "Vraag",
          score: "Score",
          gameOver: "Quiz Voltooid!",
          playAgain: "Opnieuw spelen",
          correct: "Correct!",
          wrong: "Fout!",
          listenFirst: "Luister eerst naar de uitdrukking",
        };
    }
  };
  
  const texts = getTexts();

  if (!gameStarted) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('game.back')}
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 flex items-center justify-center">
            <Headphones className="w-10 h-10 text-cyan-500" />
          </div>
          
          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
            {texts.title}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {texts.subtitle}
          </p>

          <DifficultySelector 
            selectedDifficulty={difficulty} 
            onSelect={onDifficultyChange} 
          />

          <Button 
            size="lg" 
            onClick={startGame}
            className="mt-8 bg-cyan-500 hover:bg-cyan-600"
          >
            <Headphones className="w-5 h-5 mr-2" />
            {texts.start}
          </Button>
        </motion.div>
      </div>
    );
  }

  if (gameOver) {
    const maxScore = questionsCount * (difficulty === 'easy' ? 10 : difficulty === 'normal' ? 15 : 20);
    const percentage = Math.round((score / maxScore) * 100);

    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center">
            <Trophy className="w-12 h-12 text-gold" />
          </div>

          <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
            {texts.gameOver}
          </h2>

          <div className="text-5xl font-bold text-primary mb-2">{score}</div>
          <p className="text-muted-foreground mb-8">
            {percentage}% {language === 'nl' ? 'correct' : 'correct'}
          </p>

          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t('game.back')}
            </Button>
            <Button onClick={startGame} className="bg-cyan-500 hover:bg-cyan-600">
              <RotateCcw className="w-4 h-4 mr-2" />
              {texts.playAgain}
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('game.back')}
        </Button>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground">
            {texts.question} {currentQuestionIndex + 1}/{questions.length}
          </span>
          <span className="font-bold text-primary">{texts.score}: {score}</span>
        </div>
      </div>

      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-card rounded-2xl border border-border p-8 shadow-card"
      >
        {/* Audio Player */}
        <div className="text-center mb-8">
          <Button
            size="lg"
            onClick={playAudio}
            disabled={isLoading || isPlaying}
            className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 shadow-lg"
          >
            {isLoading ? (
              <Loader2 className="w-12 h-12 animate-spin" />
            ) : isPlaying ? (
              <Volume2 className="w-12 h-12 animate-pulse" />
            ) : (
              <Volume2 className="w-12 h-12" />
            )}
          </Button>
          <p className="mt-4 text-muted-foreground">
            {isPlaying ? "..." : texts.listen}
          </p>
          {!hasListened && selectedAnswer === null && (
            <p className="mt-2 text-sm text-amber-500">{texts.listenFirst}</p>
          )}
        </div>

        {/* Answer Feedback */}
        <AnimatePresence mode="wait">
          {isCorrect !== null && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`text-center mb-4 p-3 rounded-lg ${
                isCorrect ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                <span className="font-medium">{isCorrect ? texts.correct : texts.wrong}</span>
              </div>
              {!isCorrect && (
                <p className="text-sm mt-1 text-foreground/70">
                  "{questions[currentQuestionIndex].expression}" = {questions[currentQuestionIndex].meaning}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Options */}
        <div className="grid gap-3">
          {options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === questions[currentQuestionIndex].meaning;
            const showResult = selectedAnswer !== null;

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => hasListened && handleAnswer(option)}
                disabled={selectedAnswer !== null || !hasListened}
                className={`p-4 rounded-xl text-left transition-all border ${
                  !hasListened 
                    ? 'opacity-50 cursor-not-allowed border-border bg-muted/30'
                    : showResult
                      ? isCorrectOption
                        ? 'bg-green-500/20 border-green-500'
                        : isSelected
                          ? 'bg-red-500/20 border-red-500'
                          : 'border-border bg-card'
                      : 'border-border bg-card hover:border-cyan-500 hover:bg-cyan-500/5 cursor-pointer'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {showResult && isCorrectOption && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                  {showResult && isSelected && !isCorrectOption && (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default ChtiAudioQuiz;
