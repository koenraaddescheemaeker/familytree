import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Users, Trophy, Star, HelpCircle, Check, X, Heart, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { useAchievementSound } from '@/hooks/useAchievementSound';
import DifficultySelector, { Difficulty } from './DifficultySelector';
import GameLeaderboard from './GameLeaderboard';
import FamilyRelationDiagram from './FamilyRelationDiagram';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import reunionPhoto from '@/assets/reunion-1962.jpg';

interface PersonData {
  id: number;
  name: string;
  fatherId: number | null;
  motherId: number | null;
}

// Correcte familie data van de foto van 1962 (uit Familie.tsx - personenData)
const personenData: Record<number, PersonData> = {
  1: { id: 1, name: "Hedwige Hoet", fatherId: null, motherId: null },
  2: { id: 2, name: "Luc Deforce", fatherId: 31, motherId: 19 },
  3: { id: 3, name: "Félice Deforce", fatherId: 25, motherId: 29 },
  4: { id: 4, name: "Michel Goddaer", fatherId: null, motherId: null },
  5: { id: 5, name: "Marc Deforce", fatherId: 31, motherId: 19 },
  6: { id: 6, name: "Erna de Four", fatherId: null, motherId: null },
  7: { id: 7, name: "Gabriël Deforce", fatherId: 25, motherId: 29 },
  8: { id: 8, name: "Maria Decaigny", fatherId: null, motherId: null },
  9: { id: 9, name: "Lucien Deforce", fatherId: 25, motherId: 29 },
  10: { id: 10, name: "Hendrik Deforce", fatherId: 25, motherId: 29 },
  11: { id: 11, name: "Caroline Goddaer", fatherId: 4, motherId: 3 },
  13: { id: 13, name: "Geert Deforce", fatherId: 31, motherId: 19 },
  14: { id: 14, name: "Monique Deforce", fatherId: 25, motherId: 29 },
  15: { id: 15, name: "Patrick Deforce", fatherId: 10, motherId: 16 },
  16: { id: 16, name: "Monique Carter", fatherId: null, motherId: null },
  17: { id: 17, name: "Ann Deforce", fatherId: 31, motherId: 19 },
  18: { id: 18, name: "Hans Deforce", fatherId: 31, motherId: 19 },
  19: { id: 19, name: "Simonne Vandeputte", fatherId: null, motherId: null },
  20: { id: 20, name: "Francina Brion", fatherId: null, motherId: null },
  21: { id: 21, name: "Max Autier", fatherId: null, motherId: null },
  22: { id: 22, name: "Daniel Deforce", fatherId: 25, motherId: 29 },
  23: { id: 23, name: "Rosemie Deforce", fatherId: 31, motherId: 19 },
  24: { id: 24, name: "Maria Deforce", fatherId: 25, motherId: 29 },
  25: { id: 25, name: "Marcel Deforce", fatherId: null, motherId: null },
  26: { id: 26, name: "Leen Deforce", fatherId: 31, motherId: 19 },
  27: { id: 27, name: "Micheline Goddaer", fatherId: 4, motherId: 3 },
  28: { id: 28, name: "Karel Goddaer", fatherId: 4, motherId: 3 },
  29: { id: 29, name: "Magdalena Geldof", fatherId: null, motherId: null },
  30: { id: 30, name: "Karien Deforce", fatherId: 31, motherId: 19 },
  31: { id: 31, name: "Georges Deforce", fatherId: 25, motherId: 29 },
  32: { id: 32, name: "Pascale Autier", fatherId: 21, motherId: 33 },
  33: { id: 33, name: "Bérénice Deforce", fatherId: 25, motherId: 29 },
  34: { id: 34, name: "Kathy Deforce", fatherId: 31, motherId: 19 },
};

// Helper functies voor relaties
const getPersonById = (id: number): PersonData | undefined => personenData[id];

const getSiblings = (person: PersonData): PersonData[] => {
  if (!person.fatherId || !person.motherId) return [];
  return Object.values(personenData).filter(p => 
    p.id !== person.id && 
    p.fatherId === person.fatherId && 
    p.motherId === person.motherId
  );
};

const getChildren = (personId: number): PersonData[] => {
  return Object.values(personenData).filter(p => 
    p.fatherId === personId || p.motherId === personId
  );
};

const getParents = (person: PersonData): PersonData[] => {
  const parents: PersonData[] = [];
  if (person.fatherId && personenData[person.fatherId]) {
    parents.push(personenData[person.fatherId]);
  }
  if (person.motherId && personenData[person.motherId]) {
    parents.push(personenData[person.motherId]);
  }
  return parents;
};

// Familieleden met Deforce/Goddaer achternaam (de "kernfamilie")
const deforceMembers = Object.values(personenData).filter(p => 
  p.name.includes('Deforce') || p.name.includes('Goddaer')
);

// Aangetrouwde familieleden
const spouseMembers = Object.values(personenData).filter(p => 
  !p.name.includes('Deforce') && !p.name.includes('Goddaer')
);

// Posities van de nummers op de foto (percentages van breedte/hoogte)
// Exacte posities overgenomen uit Familie.tsx
const photoPositions: Record<number, { x: number; y: number }> = {
  // Achterste rij (borst/schouder niveau)
  1: { x: 6, y: 40 },
  2: { x: 18, y: 20 },
  3: { x: 28, y: 24 },
  4: { x: 34, y: 32 },
  5: { x: 44, y: 18 },
  6: { x: 58, y: 18 },
  7: { x: 64, y: 30 },
  8: { x: 71, y: 29 },
  9: { x: 78, y: 28 },
  // Middelste rij
  10: { x: 15, y: 40 },
  11: { x: 25, y: 36 },
  13: { x: 42, y: 35 },
  14: { x: 48, y: 41 },
  15: { x: 51, y: 36 },
  16: { x: 56, y: 40 },
  17: { x: 62, y: 42 },
  18: { x: 67, y: 48 },
  // Voorste rij (zittend)
  19: { x: 75, y: 42 },
  20: { x: 82, y: 40 },
  21: { x: 89, y: 42 },
  22: { x: 12, y: 61 },
  23: { x: 18, y: 52 },
  24: { x: 28, y: 64 },
  25: { x: 36, y: 58 },
  // Kinderen vooraan
  26: { x: 42, y: 61 },
  27: { x: 48, y: 60 },
  28: { x: 53, y: 63 },
  29: { x: 58, y: 60 },
  30: { x: 68, y: 63 },
  31: { x: 75, y: 56 },
  32: { x: 80, y: 64 },
  33: { x: 85, y: 60 },
  34: { x: 92, y: 60 },
};

interface QuestionType {
  type: 'identify' | 'parent' | 'sibling' | 'spouse' | 'generation' | 'profession' | 'oldest' | 'youngest';
  question: string;
  correctAnswer: number | number[] | string;
  options: { id: number | string; name: string }[];
  hint?: string;
  explanation?: string;
}

interface FamilyPhotoQuizProps {
  onBack: () => void;
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const getDifficultySettings = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'easy':
      return { rounds: 6, options: 3, hints: 3, timeLimit: 0, pointsPerCorrect: 10 };
    case 'normal':
      return { rounds: 10, options: 4, hints: 2, timeLimit: 0, pointsPerCorrect: 15 };
    case 'hard':
      return { rounds: 15, options: 5, hints: 1, timeLimit: 25, pointsPerCorrect: 25 };
  }
};

const FamilyPhotoQuiz = ({ onBack, difficulty, onDifficultyChange }: FamilyPhotoQuizProps) => {
  const { language } = useLanguage();
  const { unlockAchievement, setBestScore, getBestScore } = useGame();
  const { playSuccessSound, playErrorSound, playAchievementSound } = useAchievementSound();
  const navigate = useNavigate();
  
  const settings = getDifficultySettings(difficulty);
  
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [hintsRemaining, setHintsRemaining] = useState(settings.hints);
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [highlightedMember, setHighlightedMember] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(settings.timeLimit);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [leaderboardKey, setLeaderboardKey] = useState(0);
  const [showDiagram, setShowDiagram] = useState(false);

  const translations = {
    nl: {
      title: 'Wie is Wie?',
      subtitle: 'Herken de familieleden op de reüniefoto van 1962',
      round: 'Vraag',
      score: 'Score',
      hint: 'Hint',
      hintsLeft: 'hints over',
      noHints: 'Geen hints meer',
      correct: 'Correct!',
      incorrect: 'Helaas!',
      next: 'Volgende vraag',
      finish: 'Resultaat bekijken',
      gameComplete: 'Spel voltooid!',
      yourScore: 'Je score',
      points: 'punten',
      playAgain: 'Opnieuw spelen',
      back: 'Terug',
      perfect: 'Perfect! Je kent de hele familie!',
      great: 'Uitstekend! Je kent bijna iedereen!',
      good: 'Goed gedaan!',
      tryAgain: 'Probeer het nog eens!',
      identify: 'Wie is nummer',
      whoIsParent: 'Wie zijn de ouders van',
      whoIsChild: 'Welk kind hoort bij',
      whoIsSpouse: 'Met wie is getrouwd',
      whoIsSibling: 'Wie is de broer/zus van',
      whichGeneration: 'Tot welke generatie behoort',
      whatProfession: 'Wat was het beroep van',
      whoIsOldest: 'Wie is de oudste van de kinderen van',
      whoIsYoungest: 'Wie is de jongste van de kinderen van',
      timeLeft: 'Tijd over',
      submitScore: 'Score indienen',
      yourName: 'Jouw naam',
      namePlaceholder: 'Voer je naam in',
      submitted: 'Ingediend!',
      gen1: 'Generatie 1 (Grootouders)',
      gen2: 'Generatie 2 (Ouders)',
      gen3: 'Generatie 3 (Kinderen)',
      viewDiagram: 'Bekijk stamboom',
    },
    en: {
      title: 'Who is Who?',
      subtitle: 'Identify family members in the 1962 reunion photo',
      round: 'Question',
      score: 'Score',
      hint: 'Hint',
      hintsLeft: 'hints left',
      noHints: 'No hints left',
      correct: 'Correct!',
      incorrect: 'Wrong!',
      next: 'Next question',
      finish: 'View results',
      gameComplete: 'Game complete!',
      yourScore: 'Your score',
      points: 'points',
      playAgain: 'Play again',
      back: 'Back',
      perfect: 'Perfect! You know the whole family!',
      great: 'Excellent! You know almost everyone!',
      good: 'Well done!',
      tryAgain: 'Try again!',
      identify: 'Who is number',
      whoIsParent: 'Who are the parents of',
      whoIsChild: 'Which child belongs to',
      whoIsSpouse: 'Who is married to',
      whoIsSibling: 'Who is the sibling of',
      whichGeneration: 'Which generation does belong to',
      whatProfession: 'What was the profession of',
      whoIsOldest: 'Who is the oldest child of',
      whoIsYoungest: 'Who is the youngest child of',
      timeLeft: 'Time left',
      submitScore: 'Submit score',
      yourName: 'Your name',
      namePlaceholder: 'Enter your name',
      submitted: 'Submitted!',
      gen1: 'Generation 1 (Grandparents)',
      gen2: 'Generation 2 (Parents)',
      gen3: 'Generation 3 (Children)',
      viewDiagram: 'View family tree',
    },
    fr: {
      title: 'Qui est Qui?',
      subtitle: 'Identifiez les membres de la famille sur la photo de réunion de 1962',
      round: 'Question',
      score: 'Score',
      hint: 'Indice',
      hintsLeft: 'indices restants',
      noHints: 'Plus d\'indices',
      correct: 'Correct!',
      incorrect: 'Faux!',
      next: 'Question suivante',
      finish: 'Voir les résultats',
      gameComplete: 'Jeu terminé!',
      yourScore: 'Votre score',
      points: 'points',
      playAgain: 'Rejouer',
      back: 'Retour',
      perfect: 'Parfait! Vous connaissez toute la famille!',
      great: 'Excellent! Vous connaissez presque tout le monde!',
      good: 'Bien joué!',
      tryAgain: 'Essayez encore!',
      identify: 'Qui est le numéro',
      whoIsParent: 'Qui sont les parents de',
      whoIsChild: 'Quel enfant appartient à',
      whoIsSpouse: 'Qui est marié à',
      whoIsSibling: 'Qui est le frère/sœur de',
      whichGeneration: 'À quelle génération appartient',
      whatProfession: 'Quelle était la profession de',
      whoIsOldest: 'Qui est l\'aîné des enfants de',
      whoIsYoungest: 'Qui est le cadet des enfants de',
      timeLeft: 'Temps restant',
      submitScore: 'Soumettre le score',
      yourName: 'Votre nom',
      namePlaceholder: 'Entrez votre nom',
      submitted: 'Soumis!',
      gen1: 'Génération 1 (Grands-parents)',
      gen2: 'Génération 2 (Parents)',
      gen3: 'Génération 3 (Enfants)',
      viewDiagram: 'Voir arbre généalogique',
    },
    de: {
      title: 'Wer ist Wer?',
      subtitle: 'Erkenne die Familienmitglieder auf dem Treffen-Foto von 1962',
      round: 'Frage',
      score: 'Punktzahl',
      hint: 'Hinweis',
      hintsLeft: 'Hinweise übrig',
      noHints: 'Keine Hinweise mehr',
      correct: 'Richtig!',
      incorrect: 'Leider falsch!',
      next: 'Nächste Frage',
      finish: 'Ergebnis ansehen',
      gameComplete: 'Spiel abgeschlossen!',
      yourScore: 'Deine Punktzahl',
      points: 'Punkte',
      playAgain: 'Nochmal spielen',
      back: 'Zurück',
      perfect: 'Perfekt! Du kennst die ganze Familie!',
      great: 'Ausgezeichnet! Du kennst fast alle!',
      good: 'Gut gemacht!',
      tryAgain: 'Versuche es nochmal!',
      identify: 'Wer ist Nummer',
      whoIsParent: 'Wer sind die Eltern von',
      whoIsChild: 'Welches Kind gehört zu',
      whoIsSpouse: 'Mit wem ist verheiratet',
      whoIsSibling: 'Wer ist das Geschwister von',
      whichGeneration: 'Zu welcher Generation gehört',
      whatProfession: 'Was war der Beruf von',
      whoIsOldest: 'Wer ist das älteste Kind von',
      whoIsYoungest: 'Wer ist das jüngste Kind von',
      timeLeft: 'Zeit übrig',
      submitScore: 'Punktzahl einreichen',
      yourName: 'Dein Name',
      namePlaceholder: 'Gib deinen Namen ein',
      submitted: 'Eingereicht!',
      gen1: 'Generation 1 (Großeltern)',
      gen2: 'Generation 2 (Eltern)',
      gen3: 'Generation 3 (Kinder)',
      viewDiagram: 'Stammbaum ansehen',
    },
    es: {
      title: '¿Quién es Quién?',
      subtitle: 'Identifica a los miembros de la familia en la foto de la reunión de 1962',
      round: 'Pregunta',
      score: 'Puntuación',
      hint: 'Pista',
      hintsLeft: 'pistas restantes',
      noHints: 'No quedan pistas',
      correct: '¡Correcto!',
      incorrect: '¡Incorrecto!',
      next: 'Siguiente pregunta',
      finish: 'Ver resultados',
      gameComplete: '¡Juego completado!',
      yourScore: 'Tu puntuación',
      points: 'puntos',
      playAgain: 'Jugar de nuevo',
      back: 'Volver',
      perfect: '¡Perfecto! ¡Conoces a toda la familia!',
      great: '¡Excelente! ¡Conoces a casi todos!',
      good: '¡Bien hecho!',
      tryAgain: '¡Inténtalo de nuevo!',
      identify: 'Quién es el número',
      whoIsParent: 'Quiénes son los padres de',
      whoIsChild: 'Qué hijo pertenece a',
      whoIsSpouse: 'Con quién está casado/a',
      whoIsSibling: 'Quién es el hermano/a de',
      whichGeneration: 'A qué generación pertenece',
      whatProfession: 'Cuál era la profesión de',
      whoIsOldest: 'Quién es el hijo mayor de',
      whoIsYoungest: 'Quién es el hijo menor de',
      timeLeft: 'Tiempo restante',
      submitScore: 'Enviar puntuación',
      yourName: 'Tu nombre',
      namePlaceholder: 'Ingresa tu nombre',
      submitted: '¡Enviado!',
      gen1: 'Generación 1 (Abuelos)',
      gen2: 'Generación 2 (Padres)',
      gen3: 'Generación 3 (Hijos)',
      viewDiagram: 'Ver árbol genealógico',
    },
    pcd: {
      title: 'Qui qu\'chest Qui?',
      subtitle: 'Erconnais les gins d\' famile su l\' foto d\' réunion d\' 1962',
      round: 'Question',
      score: 'Score',
      hint: 'Indice',
      hintsLeft: 'indices restants',
      noHints: 'Pu d\'indices',
      correct: 'Correct!',
      incorrect: 'Faux!',
      next: 'Question suivante',
      finish: 'Vir les résultats',
      gameComplete: 'Jeu terminé!',
      yourScore: 'Tin score',
      points: 'points',
      playAgain: 'Rejouer',
      back: 'Retour',
      perfect: 'Parfait! Tu connais toute la famile!',
      great: 'Excellent! Tu connais presque tout l\' monde!',
      good: 'Bien joué!',
      tryAgain: 'Essaye encore!',
      identify: 'Qui qu\'chest l\' numéro',
      whoIsParent: 'Qui sont les parints d\'',
      whoIsChild: 'Quel éfant appartient à',
      whoIsSpouse: 'Aveu qui qu\'est marié',
      whoIsSibling: 'Qui qu\'chest l\' frère/sœur d\'',
      whichGeneration: 'À quelle génération appartient',
      whatProfession: 'Queu qu\'étot l\' métier d\'',
      whoIsOldest: 'Qui qu\'chest l\' aîné des éfants d\'',
      whoIsYoungest: 'Qui qu\'chest l\' cadet des éfants d\'',
      timeLeft: 'Temps restant',
      submitScore: 'Soumettre l\' score',
      yourName: 'Tin nom',
      namePlaceholder: 'Entre tin nom',
      submitted: 'Soumis!',
      gen1: 'Génération 1 (Grands-parints)',
      gen2: 'Génération 2 (Parints)',
      gen3: 'Génération 3 (Éfants)',
      viewDiagram: 'Vir l\' arbre généalogique',
    },
    vls: {
      title: 'Wie is Wie?',
      subtitle: 'Herken de familieleedn op de reüniefoto van 1962',
      round: 'Vroage',
      score: 'Score',
      hint: 'Hint',
      hintsLeft: 'hints over',
      noHints: 'Geen hints mee',
      correct: 'Juust!',
      incorrect: 'Spijtig!',
      next: 'Volgende vroage',
      finish: 'Resultaat bekiekn',
      gameComplete: 'Spel kloor!',
      yourScore: 'Joen score',
      points: 'puntn',
      playAgain: 'Opniew speeln',
      back: 'Terug',
      perfect: 'Perfect! Ge kent de hele familie!',
      great: 'Uitsteknd! Ge kent bijnoa iedereen!',
      good: 'Goe gedoan!',
      tryAgain: 'Probeer \'t nog ne kee!',
      identify: 'Wie is nummer',
      whoIsParent: 'Wie zyn de ouders van',
      whoIsChild: 'Welk kind hoort by',
      whoIsSpouse: 'Me wie is getrouwd',
      whoIsSibling: 'Wie is de broer/zus van',
      whichGeneration: 'Tot welke generasie behoort',
      whatProfession: 'Wa was \'t beroep van',
      whoIsOldest: 'Wie is de oudste van de kienders van',
      whoIsYoungest: 'Wie is de jongste van de kienders van',
      timeLeft: 'Tyd over',
      submitScore: 'Score indienen',
      yourName: 'Joen naam',
      namePlaceholder: 'Voer je naam in',
      submitted: 'Ingediend!',
      gen1: 'Generasie 1 (Grootouders)',
      gen2: 'Generasie 2 (Ouders)',
      gen3: 'Generasie 3 (Kienders)',
      viewDiagram: 'Bekiek stamboom',
    },
    sv: {
      title: 'Vem är Vem?',
      subtitle: 'Känn igen familjemedlemmarna på återföreningsfotot från 1962',
      round: 'Fråga',
      score: 'Poäng',
      hint: 'Ledtråd',
      hintsLeft: 'ledtrådar kvar',
      noHints: 'Inga ledtrådar kvar',
      correct: 'Rätt!',
      incorrect: 'Fel!',
      next: 'Nästa fråga',
      finish: 'Visa resultat',
      gameComplete: 'Spelet klart!',
      yourScore: 'Din poäng',
      points: 'poäng',
      playAgain: 'Spela igen',
      back: 'Tillbaka',
      perfect: 'Perfekt! Du känner hela familjen!',
      great: 'Utmärkt! Du känner nästan alla!',
      good: 'Bra gjort!',
      tryAgain: 'Försök igen!',
      identify: 'Vem är nummer',
      whoIsParent: 'Vilka är föräldrarna till',
      whoIsChild: 'Vilket barn tillhör',
      whoIsSpouse: 'Vem är gift med',
      whoIsSibling: 'Vem är syskon till',
      whichGeneration: 'Till vilken generation hör',
      whatProfession: 'Vad var yrket för',
      whoIsOldest: 'Vem är det äldsta barnet till',
      whoIsYoungest: 'Vem är det yngsta barnet till',
      timeLeft: 'Tid kvar',
      submitScore: 'Skicka in poäng',
      yourName: 'Ditt namn',
      namePlaceholder: 'Ange ditt namn',
      submitted: 'Inskickat!',
      gen1: 'Generation 1 (Morföräldrar)',
      gen2: 'Generation 2 (Föräldrar)',
      gen3: 'Generation 3 (Barn)',
      viewDiagram: 'Visa släktträd',
    },
  };

  const t = translations[language as keyof typeof translations] || translations.nl;

  // Alle personen als array
  const allPersons = Object.values(personenData);

  const generateQuestions = (): QuestionType[] => {
    const questionPool: QuestionType[] = [];
    
    // Type 1: Identificeer wie nummer X is
    allPersons.slice(0, 12).forEach((person) => {
      const otherPersons = allPersons.filter(p => p.id !== person.id);
      const shuffled = [...otherPersons].sort(() => Math.random() - 0.5);
      const options = [person, ...shuffled.slice(0, settings.options - 1)].sort(() => Math.random() - 0.5);
      
      questionPool.push({
        type: 'identify',
        question: `${t.identify} ${person.id}?`,
        correctAnswer: person.id,
        options: options.map(p => ({ id: p.id, name: p.name })),
        hint: person.fatherId && personenData[person.fatherId] 
          ? `Kind van ${personenData[person.fatherId].name}` 
          : undefined,
      });
    });

    // Type 2: Wie zijn de ouders van X?
    const personsWithParents = allPersons.filter(p => p.fatherId && p.motherId);
    personsWithParents.forEach((person) => {
      const father = personenData[person.fatherId!];
      if (father) {
        const otherParents = allPersons.filter(p => 
          p.id !== father.id && 
          (p.name.includes('Deforce') || p.name.includes('Goddaer') || !p.fatherId)
        );
        const shuffled = [...otherParents].sort(() => Math.random() - 0.5);
        const options = [father, ...shuffled.slice(0, settings.options - 1)].sort(() => Math.random() - 0.5);
        
        questionPool.push({
          type: 'parent',
          question: `Wie is de vader van ${person.name}?`,
          correctAnswer: father.id,
          options: options.map(p => ({ id: p.id, name: p.name })),
          hint: `Kijk naar nummer ${father.id} op de foto`,
        });
      }
    });

    // Type 3: Wie is de broer/zus van X?
    personsWithParents.forEach((person) => {
      const siblings = getSiblings(person);
      if (siblings.length > 0) {
        const correctSibling = siblings[Math.floor(Math.random() * siblings.length)];
        const nonSiblings = allPersons.filter(p => 
          !siblings.some(s => s.id === p.id) && 
          p.id !== person.id
        );
        const shuffled = [...nonSiblings].sort(() => Math.random() - 0.5);
        const options = [correctSibling, ...shuffled.slice(0, settings.options - 1)].sort(() => Math.random() - 0.5);
        
        const father = person.fatherId ? personenData[person.fatherId] : null;
        questionPool.push({
          type: 'sibling',
          question: `${t.whoIsSibling} ${person.name}?`,
          correctAnswer: correctSibling.id,
          options: options.map(p => ({ id: p.id, name: p.name })),
          hint: father ? `Dezelfde ouders: ${father.name}` : undefined,
        });
      }
    });

    // Type 4: Wie zijn de kinderen van X?
    const parentsWithChildren = allPersons.filter(p => getChildren(p.id).length > 0);
    parentsWithChildren.forEach((parent) => {
      const children = getChildren(parent.id);
      if (children.length > 0) {
        const correctChild = children[Math.floor(Math.random() * children.length)];
        const nonChildren = allPersons.filter(p => 
          !children.some(c => c.id === p.id) && p.id !== parent.id
        );
        const shuffled = [...nonChildren].sort(() => Math.random() - 0.5);
        const options = [correctChild, ...shuffled.slice(0, settings.options - 1)].sort(() => Math.random() - 0.5);
        
        questionPool.push({
          type: 'parent',
          question: `Wie is een kind van ${parent.name}?`,
          correctAnswer: correctChild.id,
          options: options.map(p => ({ id: p.id, name: p.name })),
          hint: `${parent.name} heeft ${children.length} kinderen op de foto`,
        });
      }
    });

    // Type 5: Is X een Deforce of aangetrouwd?
    allPersons.forEach((person) => {
      const isDeforce = person.name.includes('Deforce') || person.name.includes('Goddaer');
      const options = [
        { id: 'deforce', name: 'Deforce/Goddaer familie' },
        { id: 'aangetrouwd', name: 'Aangetrouwd' },
      ];
      
      questionPool.push({
        type: 'generation',
        question: `Is ${person.name} familie of aangetrouwd?`,
        correctAnswer: isDeforce ? 'deforce' : 'aangetrouwd',
        options: options,
        hint: isDeforce ? 'Kijk naar de achternaam' : 'Geen Deforce achternaam',
      });
    });

    // Type 6: Hoeveel kinderen heeft X?
    parentsWithChildren.forEach((parent) => {
      const children = getChildren(parent.id);
      const correctCount = children.length.toString();
      const options = ['1', '2', '3', '4', '5', '6', '7', '8']
        .filter(n => n !== correctCount)
        .sort(() => Math.random() - 0.5)
        .slice(0, settings.options - 1);
      options.push(correctCount);
      options.sort(() => Math.random() - 0.5);
      
      questionPool.push({
        type: 'generation',
        question: `Hoeveel kinderen heeft ${parent.name} op de foto?`,
        correctAnswer: correctCount,
        options: options.map(n => ({ id: n, name: n })),
        hint: `Tel de kinderen met ${parent.name} als ouder`,
      });
    });

    // Shuffle en selecteer het juiste aantal vragen
    const shuffledQuestions = [...questionPool].sort(() => Math.random() - 0.5);
    return shuffledQuestions.slice(0, settings.rounds);
  };


  const initializeGame = () => {
    setQuestions(generateQuestions());
    setCurrentRound(0);
    setScore(0);
    setHintsRemaining(settings.hints);
    setShowHint(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setGameComplete(false);
    setHighlightedMember(null);
    setTimeLeft(settings.timeLimit);
    setPlayerName('');
    setShowNameInput(false);
    setScoreSubmitted(false);
  };

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  // Timer voor hard mode
  useEffect(() => {
    if (difficulty === 'hard' && !gameComplete && selectedAnswer === null && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleAnswer(-1); // Tijd op = fout antwoord
            return settings.timeLimit;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [difficulty, gameComplete, selectedAnswer, timeLeft, currentRound]);

  const handleAnswer = (answerId: number | string) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerId);
    const currentQuestion = questions[currentRound];
    const correct = answerId === currentQuestion.correctAnswer || 
      (typeof answerId === 'number' && answerId === currentQuestion.correctAnswer) ||
      (typeof answerId === 'string' && answerId === currentQuestion.correctAnswer);
    setIsCorrect(correct);

    if (correct) {
      playSuccessSound();
      const bonusPoints = showHint ? Math.floor(settings.pointsPerCorrect / 2) : settings.pointsPerCorrect;
      const timeBonus = difficulty === 'hard' ? Math.floor(timeLeft / 2) : 0;
      setScore(prev => prev + bonusPoints + timeBonus);
    } else {
      playErrorSound();
    }
  };

  const nextRound = () => {
    if (currentRound + 1 >= settings.rounds) {
      setGameComplete(true);
      
      // Check achievements
      const percentage = (score / (settings.rounds * settings.pointsPerCorrect)) * 100;
      if (percentage === 100) {
        unlockAchievement('family_expert');
      }
      if (percentage >= 80) {
        unlockAchievement('photo_detective');
      }
      
      // Update best score
      const currentBest = getBestScore('familyphoto' as any, difficulty);
      if (score > currentBest) {
        setBestScore('familyphoto' as any, difficulty, score);
      }
      
      setShowNameInput(true);
    } else {
      setCurrentRound(prev => prev + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setShowHint(false);
      setHighlightedMember(null);
      setTimeLeft(settings.timeLimit);
    }
  };

  const useHint = () => {
    if (hintsRemaining > 0 && !showHint) {
      setHintsRemaining(prev => prev - 1);
      setShowHint(true);
    }
  };

  const submitScoreToLeaderboard = async () => {
    const trimmedName = playerName.trim().slice(0, 100);
    if (!trimmedName) return;
    
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
          game_type: 'familyphoto',
          difficulty: difficulty,
          score: score,
        });

      if (error) throw error;
      
      setScoreSubmitted(true);
      setLeaderboardKey(prev => prev + 1);
      playAchievementSound();
    } catch (err: any) {
      console.error('Error submitting score:', err);
      // Silent fail is acceptable - user can still see local score
    }
  };

  const getResultMessage = () => {
    const percentage = (score / (settings.rounds * settings.pointsPerCorrect)) * 100;
    if (percentage === 100) return t.perfect;
    if (percentage >= 75) return t.great;
    if (percentage >= 50) return t.good;
    return t.tryAgain;
  };

  const currentQuestion = questions[currentRound];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-card py-8">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t.back}
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setShowDiagram(true)} className="gap-2">
              <GitBranch className="w-4 h-4" />
              {t.viewDiagram}
            </Button>
            <DifficultySelector selectedDifficulty={difficulty} onSelect={onDifficultyChange} />
          </div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 text-primary mb-2">
            <Users className="w-5 h-5" />
            <span className="uppercase tracking-widest text-sm font-medium">Familiefoto 1962</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            {t.title}
          </h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </motion.div>

        {!gameComplete ? (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Foto sectie met interactieve nummers */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-border shadow-elevated">
                <img 
                  src={reunionPhoto} 
                  alt="Familie Deforche reünie 1962"
                  className="w-full h-auto"
                />
                
                {/* Interactieve nummers op de foto */}
                {Object.entries(photoPositions).map(([id, pos]) => {
                  const personId = parseInt(id);
                  const person = personenData[personId];
                  const isHighlighted = highlightedMember === personId;
                  const isCurrentQuestionTarget = currentQuestion?.type === 'identify' && 
                    currentQuestion.question.includes(id);
                  
                  return (
                    <motion.button
                      key={personId}
                      initial={{ scale: 0 }}
                      animate={{ 
                        scale: isHighlighted ? 1.3 : 1,
                        zIndex: isHighlighted ? 50 : 10
                      }}
                      whileHover={{ scale: 1.2 }}
                      style={{
                        position: 'absolute',
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                      className={`
                        w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center
                        text-xs md:text-sm font-bold cursor-pointer
                        transition-all duration-200 shadow-lg
                        ${isHighlighted 
                          ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 ring-offset-background' 
                          : isCurrentQuestionTarget
                            ? 'bg-amber-500 text-white animate-pulse'
                            : 'bg-background/90 text-foreground hover:bg-primary hover:text-primary-foreground border border-border'
                        }
                      `}
                      onClick={() => setHighlightedMember(isHighlighted ? null : personId)}
                      title={isHighlighted ? person?.name : `Nummer ${personId}`}
                    >
                      {personId}
                    </motion.button>
                  );
                })}
                
                {/* Info popup voor highlighted member */}
                <AnimatePresence>
                  {highlightedMember && personenData[highlightedMember] && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card border border-border rounded-xl px-4 py-3 shadow-elevated z-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                          {highlightedMember}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{personenData[highlightedMember].name}</p>
                          {personenData[highlightedMember].fatherId && personenData[highlightedMember].motherId && (
                            <p className="text-xs text-muted-foreground">
                              Kind van {personenData[personenData[highlightedMember].fatherId!]?.name} 
                              {' & '}{personenData[personenData[highlightedMember].motherId!]?.name}
                            </p>
                          )}
                        </div>
                        <button 
                          onClick={() => setHighlightedMember(null)}
                          className="ml-2 text-muted-foreground hover:text-foreground"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-4">
                Klik op een nummer om de persoon te identificeren
              </p>
            </motion.div>

            {/* Vraag sectie */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Score en voortgang */}
              <div className="flex items-center justify-between bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground uppercase">{t.round}</div>
                    <div className="font-bold text-foreground">{currentRound + 1}/{settings.rounds}</div>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center">
                    <div className="text-xs text-muted-foreground uppercase">{t.score}</div>
                    <div className="font-bold text-primary">{score}</div>
                  </div>
                </div>
                
                {/* Timer voor hard mode */}
                {difficulty === 'hard' && (
                  <div className="relative w-12 h-12">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke="hsl(var(--muted))"
                        strokeWidth="4"
                      />
                      <motion.circle
                        cx="24"
                        cy="24"
                        r="20"
                        fill="none"
                        stroke={timeLeft <= 10 ? "hsl(var(--destructive))" : "hsl(var(--primary))"}
                        strokeWidth="4"
                        strokeDasharray={125.6}
                        strokeDashoffset={125.6 * (1 - timeLeft / settings.timeLimit)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${timeLeft <= 10 ? 'text-destructive' : 'text-foreground'}`}>
                      {timeLeft}
                    </span>
                  </div>
                )}
              </div>

              {/* Vraag */}
              {currentQuestion && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                    {currentQuestion.question}
                  </h3>

                  {/* Hint knop */}
                  <div className="flex justify-center mb-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={useHint}
                      disabled={hintsRemaining === 0 || showHint || selectedAnswer !== null}
                      className="gap-2"
                    >
                      <HelpCircle className="w-4 h-4" />
                      {showHint ? currentQuestion.hint : `${t.hint} (${hintsRemaining} ${t.hintsLeft})`}
                    </Button>
                  </div>

                  {/* Antwoord opties */}
                  <div className="grid grid-cols-1 gap-3">
                    <AnimatePresence mode="wait">
                      {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedAnswer === option.id;
                        const isCorrectAnswer = option.id === currentQuestion.correctAnswer;
                        
                        let buttonClass = "border-border hover:border-primary hover:bg-primary/5";
                        if (selectedAnswer !== null) {
                          if (isCorrectAnswer) {
                            buttonClass = "border-green-500 bg-green-500/10";
                          } else if (isSelected && !isCorrectAnswer) {
                            buttonClass = "border-destructive bg-destructive/10";
                          }
                        }

                        return (
                          <motion.button
                            key={option.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => handleAnswer(option.id)}
                            disabled={selectedAnswer !== null}
                            onMouseEnter={() => typeof option.id === 'number' && setHighlightedMember(option.id)}
                            onMouseLeave={() => setHighlightedMember(null)}
                            className={`p-4 rounded-xl border ${buttonClass} transition-all text-left flex items-center justify-between group`}
                          >
                            <span className="font-medium text-foreground">{option.name}</span>
                            {selectedAnswer !== null && isCorrectAnswer && (
                              <Check className="w-5 h-5 text-green-500" />
                            )}
                            {selectedAnswer !== null && isSelected && !isCorrectAnswer && (
                              <X className="w-5 h-5 text-destructive" />
                            )}
                          </motion.button>
                        );
                      })}
                    </AnimatePresence>
                  </div>

                  {/* Feedback */}
                  {selectedAnswer !== null && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 text-center"
                    >
                      <div className={`text-lg font-bold mb-4 ${isCorrect ? 'text-green-500' : 'text-destructive'}`}>
                        {isCorrect ? t.correct : t.incorrect}
                      </div>
                      <Button onClick={nextRound} className="gap-2">
                        {currentRound + 1 >= settings.rounds ? t.finish : t.next}
                      </Button>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        ) : (
          /* Game Complete Screen */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center"
              >
                <Trophy className="w-10 h-10 text-primary" />
              </motion.div>

              <h2 className="font-serif text-3xl font-bold text-foreground mb-2">
                {t.gameComplete}
              </h2>
              <p className="text-muted-foreground mb-6">{getResultMessage()}</p>

              <div className="flex items-center justify-center gap-2 text-4xl font-bold text-primary mb-8">
                <Star className="w-8 h-8 text-gold" />
                <span>{score}</span>
                <span className="text-lg text-muted-foreground">{t.points}</span>
              </div>

              {/* Score submission */}
              {showNameInput && !scoreSubmitted && (
                <div className="mb-6 space-y-4">
                  <div className="flex gap-2 max-w-sm mx-auto">
                    <Input
                      placeholder={t.namePlaceholder}
                      value={playerName}
                      onChange={(e) => setPlayerName(e.target.value)}
                      className="flex-1"
                      maxLength={100}
                    />
                    <Button onClick={submitScoreToLeaderboard} disabled={!playerName.trim()}>
                      {t.submitScore}
                    </Button>
                  </div>
                </div>
              )}

              {scoreSubmitted && (
                <div className="mb-6 text-green-500 font-medium flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  {t.submitted}
                </div>
              )}

              <div className="flex justify-center gap-4 mb-8">
                <Button variant="outline" onClick={onBack}>
                  {t.back}
                </Button>
                <Button onClick={initializeGame} className="gap-2">
                  <Heart className="w-4 h-4" />
                  {t.playAgain}
                </Button>
              </div>

              {/* Leaderboard */}
              <GameLeaderboard 
                key={leaderboardKey}
                gameType="familyphoto" 
                currentDifficulty={difficulty} 
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Family Relation Diagram Modal */}
      <FamilyRelationDiagram 
        isOpen={showDiagram} 
        onClose={() => setShowDiagram(false)} 
      />
    </div>
  );
};

export default FamilyPhotoQuiz;
