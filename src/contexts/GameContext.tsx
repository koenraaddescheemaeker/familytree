import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Achievement {
  id: string;
  nameKey: string;
  descriptionKey: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export type Difficulty = 'easy' | 'normal' | 'hard';

export interface DifficultyScores {
  easy: number;
  normal: number;
  hard: number;
}

export interface GameBestScores {
  memory: DifficultyScores;
  quiz: DifficultyScores;
  timeline: DifficultyScores;
  wordsearch: DifficultyScores;
  explorer: DifficultyScores;
  namespelling: DifficultyScores;
}

const defaultDifficultyScores: DifficultyScores = { easy: 0, normal: 0, hard: 0 };

const defaultBestScores: GameBestScores = {
  memory: { ...defaultDifficultyScores },
  quiz: { ...defaultDifficultyScores },
  timeline: { ...defaultDifficultyScores },
  wordsearch: { ...defaultDifficultyScores },
  explorer: { ...defaultDifficultyScores },
  namespelling: { ...defaultDifficultyScores },
};

interface GameContextType {
  achievements: Achievement[];
  unlockAchievement: (id: string) => void;
  isAchievementUnlocked: (id: string) => boolean;
  totalScore: number;
  addScore: (points: number) => void;
  // Legacy single score methods (for backwards compatibility)
  memoryBestScore: number;
  setMemoryBestScore: (score: number) => void;
  quizBestScore: number;
  setQuizBestScore: (score: number) => void;
  timelineBestScore: number;
  setTimelineBestScore: (score: number) => void;
  // New difficulty-based scores
  bestScores: GameBestScores;
  setBestScore: (game: keyof GameBestScores, difficulty: Difficulty, score: number) => void;
  getBestScore: (game: keyof GameBestScores, difficulty: Difficulty) => number;
  showAchievementPopup: Achievement | null;
  dismissAchievementPopup: () => void;
  isSoundMuted: boolean;
  toggleSoundMute: () => void;
  markSectionVisited: (sectionId: string) => void;
  visitedSections: Set<string>;
  resetReadingProgress: () => void;
  triggerCelebration: () => void;
  celebrationTrigger: number;
}

// All trackable sections on the website
export const ALL_SECTIONS = [
  'voorwoord', 'tijdlijn', 'zoektocht', 'picardisch',
  'historische-kaart', 'kaart', 'stamouders', 'oorlogen', 'oorlogskaart',
  'vakmanschap', 'charles-louis', 'emile-geldof', 'generaties', 'galerij', 'videos',
  'stamboom', 'familie', 'bronnen', 'quiz', 'spellen', 'contact'
] as const;

const defaultAchievements: Achievement[] = [
  { id: 'first_visit', nameKey: 'game.achievement.firstVisit', descriptionKey: 'game.achievement.firstVisitDesc', icon: '👋', unlocked: false },
  { id: 'stamouder_ontdekker', nameKey: 'game.achievement.stamouderOntdekker', descriptionKey: 'game.achievement.stamouderOntdekkerDesc', icon: '🌳', unlocked: false },
  { id: 'quiz_starter', nameKey: 'game.achievement.quizStarter', descriptionKey: 'game.achievement.quizStarterDesc', icon: '❓', unlocked: false },
  { id: 'quiz_meester', nameKey: 'game.achievement.quizMeester', descriptionKey: 'game.achievement.quizMeesterDesc', icon: '🏆', unlocked: false },
  { id: 'tijdreiziger', nameKey: 'game.achievement.tijdreiziger', descriptionKey: 'game.achievement.tijdreizigerDesc', icon: '⏰', unlocked: false },
  { id: 'foto_detective', nameKey: 'game.achievement.fotoDetective', descriptionKey: 'game.achievement.fotoDetectiveDesc', icon: '📷', unlocked: false },
  { id: 'taalkundige', nameKey: 'game.achievement.taalkundige', descriptionKey: 'game.achievement.taalkundigeDesc', icon: '🌍', unlocked: false },
  { id: 'kaart_verkenner', nameKey: 'game.achievement.kaartVerkenner', descriptionKey: 'game.achievement.kaartVerkennerDesc', icon: '🗺️', unlocked: false },
  { id: 'memory_beginner', nameKey: 'game.achievement.memoryBeginner', descriptionKey: 'game.achievement.memoryBeginnerDesc', icon: '🃏', unlocked: false },
  { id: 'memory_expert', nameKey: 'game.achievement.memoryExpert', descriptionKey: 'game.achievement.memoryExpertDesc', icon: '🧠', unlocked: false },
  { id: 'avonturier', nameKey: 'game.achievement.avonturier', descriptionKey: 'game.achievement.avonturierDesc', icon: '⚔️', unlocked: false },
  { id: 'verhaal_complete', nameKey: 'game.achievement.verhaalComplete', descriptionKey: 'game.achievement.verhaalCompleteDesc', icon: '📖', unlocked: false },
  { id: 'site_verkenner', nameKey: 'game.achievement.siteVerkenner', descriptionKey: 'game.achievement.siteVerkennerDesc', icon: '🧭', unlocked: false },
  { id: 'stamboom_expert', nameKey: 'game.achievement.stamboomExpert', descriptionKey: 'game.achievement.stamboomExpertDesc', icon: '🌲', unlocked: false },
  { id: 'tijdlijn_meester', nameKey: 'game.achievement.tijdlijnMeester', descriptionKey: 'game.achievement.tijdlijnMeesterDesc', icon: '📅', unlocked: false },
  { id: 'woordzoeker_meester', nameKey: 'game.achievement.woordzoekerMeester', descriptionKey: 'game.achievement.woordzoekerMeesterDesc', icon: '🔍', unlocked: false },
  { id: 'naamspelling_meester', nameKey: 'game.achievement.naamspellingMeester', descriptionKey: 'game.achievement.naamspellingMeesterDesc', icon: '✍️', unlocked: false },
];

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [achievements, setAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem('deforce_achievements');
    if (saved) {
      return JSON.parse(saved);
    }
    return defaultAchievements;
  });

  const [totalScore, setTotalScore] = useState(() => {
    return parseInt(localStorage.getItem('deforce_total_score') || '0');
  });

  const [memoryBestScore, setMemoryBestScoreState] = useState(() => {
    return parseInt(localStorage.getItem('deforce_memory_best') || '0');
  });

  const [quizBestScore, setQuizBestScoreState] = useState(() => {
    return parseInt(localStorage.getItem('deforce_quiz_best') || '0');
  });

  const [timelineBestScore, setTimelineBestScoreState] = useState(() => {
    return parseInt(localStorage.getItem('deforce_timeline_best') || '0');
  });

  const [bestScores, setBestScoresState] = useState<GameBestScores>(() => {
    const saved = localStorage.getItem('deforce_best_scores');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          memory: { ...defaultDifficultyScores, ...parsed.memory },
          quiz: { ...defaultDifficultyScores, ...parsed.quiz },
          timeline: { ...defaultDifficultyScores, ...parsed.timeline },
          wordsearch: { ...defaultDifficultyScores, ...parsed.wordsearch },
          explorer: { ...defaultDifficultyScores, ...parsed.explorer },
          namespelling: { ...defaultDifficultyScores, ...parsed.namespelling },
        };
      } catch {
        return defaultBestScores;
      }
    }
    return defaultBestScores;
  });

  const [showAchievementPopup, setShowAchievementPopup] = useState<Achievement | null>(null);

  const [isSoundMuted, setIsSoundMuted] = useState(() => {
    return localStorage.getItem('deforce_sound_muted') === 'true';
  });

  const toggleSoundMute = () => {
    setIsSoundMuted(prev => {
      const newValue = !prev;
      localStorage.setItem('deforce_sound_muted', newValue.toString());
      return newValue;
    });
  };

  const [visitedSections, setVisitedSections] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('deforce_visited_sections');
    if (saved) {
      return new Set(JSON.parse(saved));
    }
    return new Set();
  });

  const [celebrationTrigger, setCelebrationTrigger] = useState(0);

  const triggerCelebration = () => {
    setCelebrationTrigger(prev => prev + 1);
  };

  const markSectionVisited = (sectionId: string) => {
    setVisitedSections(prev => {
      if (prev.has(sectionId)) return prev;
      const newSet = new Set(prev);
      newSet.add(sectionId);
      localStorage.setItem('deforce_visited_sections', JSON.stringify([...newSet]));
      
      // Check if all sections are visited
      if (newSet.size >= ALL_SECTIONS.length) {
        setTimeout(() => unlockAchievement('site_verkenner'), 500);
      }
      
      return newSet;
    });
  };

  const resetReadingProgress = () => {
    setVisitedSections(new Set());
    localStorage.removeItem('deforce_visited_sections');
  };

  useEffect(() => {
    localStorage.setItem('deforce_achievements', JSON.stringify(achievements));
  }, [achievements]);

  useEffect(() => {
    localStorage.setItem('deforce_total_score', totalScore.toString());
  }, [totalScore]);

  useEffect(() => {
    localStorage.setItem('deforce_best_scores', JSON.stringify(bestScores));
  }, [bestScores]);

  const unlockAchievement = (id: string) => {
    setAchievements(prev => {
      const achievement = prev.find(a => a.id === id);
      if (achievement && !achievement.unlocked) {
        const updated = prev.map(a => 
          a.id === id ? { ...a, unlocked: true, unlockedAt: new Date() } : a
        );
        setShowAchievementPopup(updated.find(a => a.id === id) || null);
        setTotalScore(s => s + 100);
        return updated;
      }
      return prev;
    });
  };

  const isAchievementUnlocked = (id: string) => {
    return achievements.find(a => a.id === id)?.unlocked || false;
  };

  const addScore = (points: number) => {
    setTotalScore(s => s + points);
  };

  const setMemoryBestScore = (score: number) => {
    if (score > memoryBestScore) {
      setMemoryBestScoreState(score);
      localStorage.setItem('deforce_memory_best', score.toString());
    }
  };

  const setQuizBestScore = (score: number) => {
    if (score > quizBestScore) {
      setQuizBestScoreState(score);
      localStorage.setItem('deforce_quiz_best', score.toString());
    }
  };

  const setTimelineBestScore = (score: number) => {
    if (score > timelineBestScore) {
      setTimelineBestScoreState(score);
      localStorage.setItem('deforce_timeline_best', score.toString());
    }
  };

  const setBestScore = (game: keyof GameBestScores, difficulty: Difficulty, score: number) => {
    setBestScoresState(prev => {
      if (score > prev[game][difficulty]) {
        const newScores = {
          ...prev,
          [game]: {
            ...prev[game],
            [difficulty]: score,
          },
        };
        return newScores;
      }
      return prev;
    });
  };

  const getBestScore = (game: keyof GameBestScores, difficulty: Difficulty) => {
    return bestScores[game][difficulty];
  };

  const dismissAchievementPopup = () => {
    setShowAchievementPopup(null);
  };

  // Unlock first visit achievement on mount
  useEffect(() => {
    const hasVisited = localStorage.getItem('deforce_visited');
    if (!hasVisited) {
      localStorage.setItem('deforce_visited', 'true');
      setTimeout(() => unlockAchievement('first_visit'), 2000);
    }
  }, []);

  return (
    <GameContext.Provider value={{
      achievements,
      unlockAchievement,
      isAchievementUnlocked,
      totalScore,
      addScore,
      memoryBestScore,
      setMemoryBestScore,
      quizBestScore,
      setQuizBestScore,
      timelineBestScore,
      setTimelineBestScore,
      bestScores,
      setBestScore,
      getBestScore,
      showAchievementPopup,
      dismissAchievementPopup,
      isSoundMuted,
      toggleSoundMute,
      markSectionVisited,
      visitedSections,
      resetReadingProgress,
      triggerCelebration,
      celebrationTrigger,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
