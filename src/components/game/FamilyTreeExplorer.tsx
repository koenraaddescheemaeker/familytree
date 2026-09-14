import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, HelpCircle, CheckCircle2, XCircle, Lightbulb, TreeDeciduous, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { useAchievementSound } from '@/hooks/useAchievementSound';
import DifficultySelector, { Difficulty } from './DifficultySelector';
import MuteButton from './MuteButton';

interface Ancestor {
  id: string;
  name: string;
  years: string;
  profession: Record<string, string>;
  location: string;
  hints: Record<string, string[]>;
}

const ancestors: Ancestor[] = [
  {
    id: 'hubert',
    name: 'Hubert Deleforge',
    years: '1662-1720',
    profession: {
      nl: 'Boquillon (houthakker)',
      en: 'Boquillon (woodcutter)',
      fr: 'Boquillon (bûcheron)',
      de: 'Boquillon (Holzfäller)',
      es: 'Boquillon (leñador)',
      pcd: 'Boquillon (bûcheron)',
      vls: 'Boquillon (houtkapper)',
    },
    location: 'Hallennes-lez-Haubourdin',
    hints: {
      nl: ['Deze persoon werkte in het bos', 'Hij trouwde in 1685', 'Hij migreerde naar Izegem rond 1699', 'Hij was de eerste van de familie in West-Vlaanderen'],
      en: ['This person worked in the forest', 'He married in 1685', 'He migrated to Izegem around 1699', 'He was the first of the family in West Flanders'],
      fr: ['Cette personne travaillait dans la forêt', 'Il s\'est marié en 1685', 'Il a migré vers Izegem vers 1699', 'Il était le premier de la famille en Flandre occidentale'],
      de: ['Diese Person arbeitete im Wald', 'Er heiratete 1685', 'Er wanderte um 1699 nach Izegem aus', 'Er war der Erste der Familie in Westflandern'],
      es: ['Esta persona trabajaba en el bosque', 'Se casó en 1685', 'Migró a Izegem alrededor de 1699', 'Fue el primero de la familia en Flandes Occidental'],
      pcd: ['Chti personne travaillot dins l\' forêt', 'Il s\'a marié in 1685', 'Il a migré vers Izegem vers 1699', 'Il étot l\' premier d\' la famile in Flandre occidentale'],
      vls: ['Dezen persoon werkte in \'t bos', 'Hij trouwde in 1685', 'Hij migreerde noa Izegem rond 1699', 'Hij was de eerste van de familie in West-Vloandern'],
    }
  },
  {
    id: 'antoinette',
    name: 'Antoinette Follet',
    years: '1665-1730',
    profession: {
      nl: 'Pachtersdochter',
      en: 'Farmer\'s daughter',
      fr: 'Fille de fermier',
      de: 'Pächterstochter',
      es: 'Hija de granjero',
      pcd: 'File d\' fermier',
      vls: 'Pachtersdochter',
    },
    location: 'Hallennes-lez-Haubourdin',
    hints: {
      nl: ['Deze persoon kwam uit een pachtersfamilie', 'Ze trouwde met een houthakker', 'Haar huwelijkscontract is bewaard gebleven', 'Ze is de stammoeder van de Izegemse tak'],
      en: ['This person came from a farming family', 'She married a woodcutter', 'Her marriage contract has been preserved', 'She is the matriarch of the Izegem branch'],
      fr: ['Cette personne venait d\'une famille de fermiers', 'Elle a épousé un bûcheron', 'Son contrat de mariage a été conservé', 'Elle est la matriarche de la branche d\'Izegem'],
      de: ['Diese Person kam aus einer Pächterfamilie', 'Sie heiratete einen Holzfäller', 'Ihr Ehevertrag ist erhalten geblieben', 'Sie ist die Stammmutter des Izegemer Zweigs'],
      es: ['Esta persona venía de una familia de granjeros', 'Se casó con un leñador', 'Su contrato matrimonial se ha conservado', 'Ella es la matriarca de la rama de Izegem'],
      pcd: ['Chti personne v\'not d\'eune famile d\' fermiers', 'Ale a épousé un bûcheron', 'Sin contrat d\' mariache a été conservé', 'Ale est l\' matriarche d\' la branche d\'Izegem'],
      vls: ['Dezen persoon kwam uut een pachtersfamilie', 'Ze trouwde me een houtkapper', 'Heur trouwcontract is bewoard geblevn', 'Ze is de stammoeder van de Izegemse tak'],
    }
  },
  {
    id: 'charles-louis',
    name: 'Charles Louis Deforce',
    years: '1857-1938',
    profession: {
      nl: 'Timmerman & Houtsnijder',
      en: 'Carpenter & Woodcarver',
      fr: 'Charpentier & Sculpteur sur bois',
      de: 'Zimmermann & Holzschnitzer',
      es: 'Carpintero & Tallador de madera',
      pcd: 'Carpintier & Sculpteur su bos',
      vls: 'Timmerman & Houtsnyder',
    },
    location: 'Izegem',
    hints: {
      nl: ['Deze persoon leefde in de 19e en 20e eeuw', 'Hij trouwde drie keer', 'Hij was timmerman en houtsnijder', 'Hij is de overgrootvader van de auteur'],
      en: ['This person lived in the 19th and 20th century', 'He married three times', 'He was a carpenter and woodcarver', 'He is the great-grandfather of the author'],
      fr: ['Cette personne a vécu aux 19e et 20e siècles', 'Il s\'est marié trois fois', 'Il était charpentier et sculpteur sur bois', 'Il est l\'arrière-grand-père de l\'auteur'],
      de: ['Diese Person lebte im 19. und 20. Jahrhundert', 'Er heiratete dreimal', 'Er war Zimmermann und Holzschnitzer', 'Er ist der Urgroßvater des Autors'],
      es: ['Esta persona vivió en los siglos XIX y XX', 'Se casó tres veces', 'Era carpintero y tallador de madera', 'Es el bisabuelo del autor'],
      pcd: ['Chti personne a vécu au 19e et 20e siècles', 'Il s\'a marié trois fois', 'Il étot carpintier et sculpteur su bos', 'Il est l\'arrière-grand-père d\' l\'auteur'],
      vls: ['Dezen persoon leefde in de 19e en 20e eeuw', 'Hij trouwde drie keer', 'Hij was timmerman en houtsnyder', 'Hij is de overgrootvader van de auteur'],
    }
  },
  {
    id: 'marcel',
    name: 'Marcel Deforce',
    years: '1893-1975',
    profession: {
      nl: 'Familiepatriarch',
      en: 'Family patriarch',
      fr: 'Patriarche de la famille',
      de: 'Familienpatriarch',
      es: 'Patriarca de la familia',
      pcd: 'Patriarche d\' la famile',
      vls: 'Familiepatriarch',
    },
    location: 'Izegem',
    hints: {
      nl: ['Hij leefde in de 20e eeuw', 'Hij trouwde met Magdalena Geldof', 'De familiereünies zijn ter ere van hem', 'Zijn nakomelingen kwamen samen in 2024'],
      en: ['He lived in the 20th century', 'He married Magdalena Geldof', 'The family reunions are in his honor', 'His descendants gathered in 2024'],
      fr: ['Il a vécu au 20e siècle', 'Il a épousé Magdalena Geldof', 'Les réunions de famille sont en son honneur', 'Ses descendants se sont réunis en 2024'],
      de: ['Er lebte im 20. Jahrhundert', 'Er heiratete Magdalena Geldof', 'Die Familientreffen sind ihm zu Ehren', 'Seine Nachkommen kamen 2024 zusammen'],
      es: ['Vivió en el siglo XX', 'Se casó con Magdalena Geldof', 'Las reuniones familiares son en su honor', 'Sus descendientes se reunieron en 2024'],
      pcd: ['Il a vécu au 20e siècle', 'Il a épousé Magdalena Geldof', 'Les réunions d\' famile sont in sin honneur', 'Ses descendants s\'ont réunis in 2024'],
      vls: ['Hij leefde in de 20e eeuw', 'Hij trouwde me Magdalena Geldof', 'De familiereünies zyn ter ere van hem', 'Zyn noakomelinge kwamn samen in 2024'],
    }
  },
  {
    id: 'jean-baptiste',
    name: 'Jean Baptiste Deforce',
    years: '1779-1850',
    profession: {
      nl: 'Schrijnwerker',
      en: 'Joiner',
      fr: 'Menuisier',
      de: 'Schreiner',
      es: 'Ebanista',
      pcd: 'Menuisier',
      vls: 'Schrynwerker',
    },
    location: 'Izegem',
    hints: {
      nl: ['Hij leefde tijdens de Franse Revolutie', 'Hij was schrijnwerker van beroep', 'Hij zette de familietraditie van houtbewerking voort', 'Hij woonde in Izegem'],
      en: ['He lived during the French Revolution', 'He was a joiner by profession', 'He continued the family tradition of woodworking', 'He lived in Izegem'],
      fr: ['Il a vécu pendant la Révolution française', 'Il était menuisier de profession', 'Il a perpétué la tradition familiale du travail du bois', 'Il vivait à Izegem'],
      de: ['Er lebte während der Französischen Revolution', 'Er war Schreiner von Beruf', 'Er setzte die Familientradition der Holzverarbeitung fort', 'Er wohnte in Izegem'],
      es: ['Vivió durante la Revolución Francesa', 'Era ebanista de profesión', 'Continuó la tradición familiar de la carpintería', 'Vivía en Izegem'],
      pcd: ['Il a vécu pendant la Révolution française', 'Il étot menuisier d\' profession', 'Il a perpétué l\' tradition familliale du travail du bos', 'Il vivot à Izegem'],
      vls: ['Hij leefde tydens de Franse Revolusie', 'Hij was schrynwerker van beroep', 'Hij zette de familietradisie van houtbewerking voort', 'Hij woonde in Izegem'],
    }
  }
];

interface FamilyTreeExplorerProps {
  onBack: () => void;
  difficulty: Difficulty;
  onDifficultyChange: (d: Difficulty) => void;
}

const getDifficultySettings = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'easy':
      return { rounds: 3, optionCount: 3, hintsVisible: 2, scoreMultiplier: 0.8 };
    case 'normal':
      return { rounds: 4, optionCount: 4, hintsVisible: 1, scoreMultiplier: 1.0 };
    case 'hard':
      return { rounds: 5, optionCount: 4, hintsVisible: 1, scoreMultiplier: 1.5 };
  }
};

const FamilyTreeExplorer = ({ onBack, difficulty, onDifficultyChange }: FamilyTreeExplorerProps) => {
  const { t, language } = useLanguage();
  
  // Get hints for current language with fallback
  const getHints = (ancestor: Ancestor): string[] => {
    return ancestor.hints[language] || ancestor.hints['nl'];
  };
  
  // Get profession for current language with fallback
  const getProfession = (ancestor: Ancestor): string => {
    return ancestor.profession[language] || ancestor.profession['nl'];
  };
  const { addScore, unlockAchievement, isAchievementUnlocked, setBestScore, getBestScore } = useGame();
  const { playSuccessSound, playErrorSound, playAchievementSound } = useAchievementSound();
  
  const currentBestScore = getBestScore('explorer', difficulty);
  
  const settings = getDifficultySettings(difficulty);
  
  const [currentRound, setCurrentRound] = useState(0);
  const [hintsRevealed, setHintsRevealed] = useState(settings.hintsVisible);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [shuffledAncestors, setShuffledAncestors] = useState<Ancestor[]>([]);
  const [options, setOptions] = useState<Ancestor[]>([]);

  useEffect(() => {
    startNewGame();
  }, [difficulty]);

  const startNewGame = () => {
    const shuffled = [...ancestors].sort(() => Math.random() - 0.5).slice(0, settings.rounds);
    setShuffledAncestors(shuffled);
    setCurrentRound(0);
    setScore(0);
    setGameComplete(false);
    setHintsRevealed(settings.hintsVisible);
    setSelectedAnswer(null);
    setIsCorrect(null);
    generateOptions(shuffled, 0);
  };

  const generateOptions = (ancestorList: Ancestor[], round: number) => {
    if (round >= ancestorList.length) return;
    
    const correct = ancestorList[round];
    const others = ancestors.filter(a => a.id !== correct.id);
    const shuffledOthers = others.sort(() => Math.random() - 0.5).slice(0, settings.optionCount - 1);
    const allOptions = [correct, ...shuffledOthers].sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const revealHint = () => {
    const currentHints = getHints(shuffledAncestors[currentRound]);
    if (hintsRevealed < currentHints.length) {
      setHintsRevealed(prev => prev + 1);
    }
  };

  const handleAnswer = (ancestorId: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(ancestorId);
    const correct = ancestorId === shuffledAncestors[currentRound].id;
    setIsCorrect(correct);
    
    if (correct) {
      playSuccessSound();
      const basePoints = Math.max(100 - (hintsRevealed - settings.hintsVisible) * 20, 20);
      const pointsEarned = Math.round(basePoints * settings.scoreMultiplier);
      setScore(prev => prev + pointsEarned);
      addScore(pointsEarned);
    } else {
      playErrorSound();
    }

    setTimeout(() => {
      if (currentRound + 1 >= shuffledAncestors.length) {
        setGameComplete(true);
        setBestScore('explorer', difficulty, score);
        playAchievementSound();
        if (!isAchievementUnlocked('stamboom_expert')) {
          unlockAchievement('stamboom_expert');
        }
      } else {
        setCurrentRound(prev => prev + 1);
        setHintsRevealed(settings.hintsVisible);
        setSelectedAnswer(null);
        setIsCorrect(null);
        generateOptions(shuffledAncestors, currentRound + 1);
      }
    }, 1500);
  };

  if (gameComplete) {
    return (
      <section className="section-padding bg-gradient-to-b from-background to-card min-h-screen">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl p-8 text-center shadow-elevated"
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <TreeDeciduous className="w-10 h-10 text-primary" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              {t('game.explorer.complete')}
            </h2>
            <p className="text-muted-foreground mb-2">
              {t('game.explorer.finalScore')}: <span className="text-primary font-bold text-2xl">{score}</span> {t('game.points')}
            </p>
            {currentBestScore > 0 && (
              <p className="text-muted-foreground mb-6">
                {t('game.best')} ({t(`game.difficulty.${difficulty}`)}): {currentBestScore} {t('game.points')}
              </p>
            )}
            <div className="flex gap-4 justify-center">
              <Button onClick={startNewGame} variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" />
                {t('game.explorer.playAgain')}
              </Button>
              <Button onClick={onBack}>
                {t('game.back')}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const currentAncestor = shuffledAncestors[currentRound];
  if (!currentAncestor) return null;

  return (
    <section className="section-padding bg-gradient-to-b from-background to-card min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t('game.back')}
          </Button>
          <div className="flex items-center gap-4">
            <MuteButton />
            <span className="text-muted-foreground">
              {t('game.explorer.round')} {currentRound + 1}/{shuffledAncestors.length}
            </span>
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
              {score} {t('game.points')}
            </span>
          </div>
        </div>

        <motion.div
          key={currentRound}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-primary mb-4">
              <HelpCircle className="w-5 h-5" />
              <span className="uppercase tracking-widest text-sm font-medium">
                {t('game.explorer.whoIs')}
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              {t('game.explorer.title')}
            </h2>
            <DifficultySelector
              selectedDifficulty={difficulty}
              onSelect={onDifficultyChange}
            />
          </div>

          {/* Hints */}
          <div className="bg-card border border-border rounded-xl p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-gold" />
                {t('game.explorer.hints')}
              </h3>
              {hintsRevealed < getHints(currentAncestor).length && !selectedAnswer && (
                <Button variant="outline" size="sm" onClick={revealHint}>
                  {t('game.explorer.moreHints')} (-20 {t('game.points')})
                </Button>
              )}
            </div>
            <ul className="space-y-3">
              <AnimatePresence mode="popLayout">
                {getHints(currentAncestor).slice(0, hintsRevealed).map((hint, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center flex-shrink-0">
                      {index + 1}
                    </span>
                    {hint}
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>

          {/* Options */}
          <div className="grid md:grid-cols-2 gap-4">
            {options.map((ancestor) => {
              const isSelected = selectedAnswer === ancestor.id;
              const isCorrectAnswer = ancestor.id === currentAncestor.id;
              const showResult = selectedAnswer !== null;

              return (
                <motion.button
                  key={ancestor.id}
                  whileHover={!selectedAnswer ? { scale: 1.02 } : {}}
                  whileTap={!selectedAnswer ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswer(ancestor.id)}
                  disabled={!!selectedAnswer}
                  className={`p-5 rounded-xl border text-left transition-all ${
                    showResult
                      ? isCorrectAnswer
                        ? 'bg-green-500/10 border-green-500'
                        : isSelected
                        ? 'bg-red-500/10 border-red-500'
                        : 'bg-card border-border opacity-50'
                      : 'bg-card border-border hover:border-primary hover:shadow-card'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-foreground mb-1">
                        {ancestor.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">{ancestor.years}</p>
                      <p className="text-sm text-primary">{getProfession(ancestor)}</p>
                    </div>
                    {showResult && (
                      isCorrectAnswer ? (
                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                      ) : isSelected ? (
                        <XCircle className="w-6 h-6 text-red-500" />
                      ) : null
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FamilyTreeExplorer;
