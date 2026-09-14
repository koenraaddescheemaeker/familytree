import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { ArrowLeft, HelpCircle, CheckCircle2, XCircle, RotateCcw, Star, Clock, Zap, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Confetti from '@/components/ui/Confetti';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { useAchievementSound } from '@/hooks/useAchievementSound';
import DifficultySelector, { Difficulty } from './DifficultySelector';
import MuteButton from './MuteButton';

interface Question {
  id: string;
  question: Record<string, string>;
  options: Record<string, string[]>;
  correctIndex: number;
  explanation: Record<string, string>;
}

interface ShuffledQuestion extends Question {
  shuffledIndices: number[]; // Maps display index to original index
}

const ALL_QUESTIONS: Question[] = [
  {
    id: 'origin',
    question: {
      nl: 'Waar komt de familienaam De Force oorspronkelijk vandaan?',
      fr: "D'où vient le nom de famille De Force?",
      en: 'Where does the surname De Force originally come from?',
      de: 'Woher stammt der Familienname De Force ursprünglich?',
      sv: 'Varifrån kommer familjenamnet De Force ursprungligen?',
    },
    options: {
      nl: ['Brussel', 'Frans-Vlaanderen', 'Parijs', 'Antwerpen'],
      fr: ['Bruxelles', 'Flandre française', 'Paris', 'Anvers'],
      en: ['Brussels', 'French Flanders', 'Paris', 'Antwerp'],
      de: ['Brüssel', 'Französisch-Flandern', 'Paris', 'Antwerpen'],
      sv: ['Bryssel', 'Franska Flandern', 'Paris', 'Antwerpen'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'De familie De Force komt oorspronkelijk uit Frans-Vlaanderen, rond de regio Rijsel.',
      fr: 'La famille De Force est originaire de la Flandre française, autour de la région de Lille.',
      en: 'The De Force family originally comes from French Flanders, around the Lille region.',
      de: 'Die Familie De Force stammt ursprünglich aus Französisch-Flandern, in der Region um Lille.',
      sv: 'Familjen De Force kommer ursprungligen från Franska Flandern, runt Lille-regionen.',
    },
  },
  {
    id: 'profession',
    question: {
      nl: 'Welk beroep oefenden veel De Force familieleden uit?',
      fr: 'Quel métier exerçaient beaucoup de membres de la famille De Force?',
      en: 'What profession did many De Force family members practice?',
      de: 'Welchen Beruf übten viele Mitglieder der Familie De Force aus?',
      sv: 'Vilket yrke utövade många medlemmar av familjen De Force?',
    },
    options: {
      nl: ['Bakker', 'Houtbewerker/Schrijnwerker', 'Smid', 'Visser'],
      fr: ['Boulanger', 'Menuisier/Ébéniste', 'Forgeron', 'Pêcheur'],
      en: ['Baker', 'Woodworker/Carpenter', 'Blacksmith', 'Fisherman'],
      de: ['Bäcker', 'Holzarbeiter/Tischler', 'Schmied', 'Fischer'],
      sv: ['Bagare', 'Träarbetare/Snickare', 'Smed', 'Fiskare'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Houtbewerking en schrijnwerkerij waren traditionele beroepen in de familie De Force.',
      fr: "Le travail du bois et la menuiserie étaient des métiers traditionnels dans la famille De Force.",
      en: 'Woodworking and carpentry were traditional professions in the De Force family.',
      de: 'Holzverarbeitung und Tischlerei waren traditionelle Berufe in der Familie De Force.',
      sv: 'Träbearbetning och snickeri var traditionella yrken i familjen De Force.',
    },
  },
  {
    id: 'charles_louis',
    question: {
      nl: 'Wie was Charles-Louis De Force?',
      fr: 'Qui était Charles-Louis De Force?',
      en: 'Who was Charles-Louis De Force?',
      de: 'Wer war Charles-Louis De Force?',
      sv: 'Vem var Charles-Louis De Force?',
    },
    options: {
      nl: ['Een beroemde schilder', 'Een stamvader van de familie', 'Een burgemeester', 'Een soldaat'],
      fr: ['Un peintre célèbre', 'Un ancêtre de la famille', 'Un maire', 'Un soldat'],
      en: ['A famous painter', 'An ancestor of the family', 'A mayor', 'A soldier'],
      de: ['Ein berühmter Maler', 'Ein Vorfahre der Familie', 'Ein Bürgermeister', 'Ein Soldat'],
      sv: ['En berömd målare', 'En stamfader i familjen', 'En borgmästare', 'En soldat'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Charles-Louis De Force was een belangrijke stamvader van de familie.',
      fr: 'Charles-Louis De Force était un important ancêtre de la famille.',
      en: 'Charles-Louis De Force was an important ancestor of the family.',
      de: 'Charles-Louis De Force war ein wichtiger Vorfahre der Familie.',
      sv: 'Charles-Louis De Force var en viktig stamfader i familjen.',
    },
  },
  {
    id: 'izegem',
    question: {
      nl: 'In welke Belgische stad vestigden veel De Force familieleden zich?',
      fr: 'Dans quelle ville belge beaucoup de membres de la famille De Force se sont-ils installés?',
      en: 'In which Belgian city did many De Force family members settle?',
      de: 'In welcher belgischen Stadt ließen sich viele Mitglieder der Familie De Force nieder?',
      sv: 'I vilken belgisk stad bosatte sig många medlemmar av familjen De Force?',
    },
    options: {
      nl: ['Gent', 'Brugge', 'Izegem', 'Kortrijk'],
      fr: ['Gand', 'Bruges', 'Izegem', 'Courtrai'],
      en: ['Ghent', 'Bruges', 'Izegem', 'Kortrijk'],
      de: ['Gent', 'Brügge', 'Izegem', 'Kortrijk'],
      sv: ['Gent', 'Brygge', 'Izegem', 'Kortrijk'],
    },
    correctIndex: 2,
    explanation: {
      nl: 'Izegem werd een belangrijke vestigingsplaats voor de familie De Force in België.',
      fr: "Izegem est devenu un lieu d'établissement important pour la famille De Force en Belgique.",
      en: 'Izegem became an important settlement for the De Force family in Belgium.',
      de: 'Izegem wurde ein wichtiger Niederlassungsort für die Familie De Force in Belgien.',
      sv: 'Izegem blev en viktig bosättningsort för familjen De Force i Belgien.',
    },
  },
  {
    id: 'dialect',
    question: {
      nl: 'Welk dialect werd gesproken in de oorspronkelijke regio van de familie?',
      fr: 'Quel dialecte était parlé dans la région d\'origine de la famille?',
      en: 'What dialect was spoken in the original region of the family?',
      de: 'Welcher Dialekt wurde in der Ursprungsregion der Familie gesprochen?',
      sv: 'Vilken dialekt talades i familjens ursprungsregion?',
    },
    options: {
      nl: ['Brabants', 'Picardisch/Ch\'ti', 'Limburgs', 'Zeeuws'],
      fr: ['Brabançon', 'Picard/Ch\'ti', 'Limbourgeois', 'Zélandais'],
      en: ['Brabantian', 'Picard/Ch\'ti', 'Limburgish', 'Zeelandic'],
      de: ['Brabantisch', 'Pikardisch/Ch\'ti', 'Limburgisch', 'Seeländisch'],
      sv: ['Brabantska', 'Pikardiska/Ch\'ti', 'Limburgska', 'Zeeländska'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Het Picardisch dialect, ook bekend als Ch\'ti, werd gesproken in Frans-Vlaanderen.',
      fr: 'Le dialecte picard, également connu sous le nom de Ch\'ti, était parlé en Flandre française.',
      en: 'The Picard dialect, also known as Ch\'ti, was spoken in French Flanders.',
      de: 'Der pikardische Dialekt, auch bekannt als Ch\'ti, wurde in Französisch-Flandern gesprochen.',
      sv: 'Den pikardiska dialekten, även känd som Ch\'ti, talades i Franska Flandern.',
    },
  },
  {
    id: 'migration',
    question: {
      nl: 'Waarom migreerden veel families van Frans-Vlaanderen naar België?',
      fr: 'Pourquoi de nombreuses familles ont-elles migré de la Flandre française vers la Belgique?',
      en: 'Why did many families migrate from French Flanders to Belgium?',
      de: 'Warum wanderten viele Familien von Französisch-Flandern nach Belgien aus?',
      sv: 'Varför migrerade många familjer från Franska Flandern till Belgien?',
    },
    options: {
      nl: ['Voor betere economische kansen', 'Vanwege oorlogen en crisissen', 'Voor het klimaat', 'Voor onderwijs'],
      fr: ['Pour de meilleures opportunités économiques', 'À cause des guerres et des crises', 'Pour le climat', 'Pour l\'éducation'],
      en: ['For better economic opportunities', 'Due to wars and crises', 'For the climate', 'For education'],
      de: ['Für bessere wirtschaftliche Möglichkeiten', 'Wegen Kriegen und Krisen', 'Wegen des Klimas', 'Für Bildung'],
      sv: ['För bättre ekonomiska möjligheter', 'På grund av krig och kriser', 'För klimatet', 'För utbildning'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Oorlogen, hongersnoden en economische crisissen dreven veel families naar België.',
      fr: 'Les guerres, les famines et les crises économiques ont poussé de nombreuses familles vers la Belgique.',
      en: 'Wars, famines, and economic crises drove many families to Belgium.',
      de: 'Kriege, Hungersnöte und Wirtschaftskrisen trieben viele Familien nach Belgien.',
      sv: 'Krig, hungersnöd och ekonomiska kriser drev många familjer till Belgien.',
    },
  },
  {
    id: 'spelling',
    question: {
      nl: 'Welke spellingvarianten van de familienaam bestaan er?',
      fr: 'Quelles variantes orthographiques du nom de famille existent?',
      en: 'What spelling variants of the surname exist?',
      de: 'Welche Schreibvarianten des Familiennamens gibt es?',
      sv: 'Vilka stavningsvarianter av familjenamnet finns det?',
    },
    options: {
      nl: ['Alleen De Force', 'De Force, Deforce, Deforche', 'De Fors, Defors', 'Le Force, Laforce'],
      fr: ['Seulement De Force', 'De Force, Deforce, Deforche', 'De Fors, Defors', 'Le Force, Laforce'],
      en: ['Only De Force', 'De Force, Deforce, Deforche', 'De Fors, Defors', 'Le Force, Laforce'],
      de: ['Nur De Force', 'De Force, Deforce, Deforche', 'De Fors, Defors', 'Le Force, Laforce'],
      sv: ['Bara De Force', 'De Force, Deforce, Deforche', 'De Fors, Defors', 'Le Force, Laforce'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'De familienaam kent verschillende spellingvarianten: De Force, Deforce en Deforche.',
      fr: 'Le nom de famille connaît plusieurs variantes orthographiques: De Force, Deforce et Deforche.',
      en: 'The surname has several spelling variants: De Force, Deforce, and Deforche.',
      de: 'Der Familienname hat mehrere Schreibvarianten: De Force, Deforce und Deforche.',
      sv: 'Familjenamnet har flera stavningsvarianter: De Force, Deforce och Deforche.',
    },
  },
  {
    id: 'meaning',
    question: {
      nl: 'Wat betekent de naam "De Force" waarschijnlijk?',
      fr: 'Que signifie probablement le nom "De Force"?',
      en: 'What does the name "De Force" probably mean?',
      de: 'Was bedeutet der Name "De Force" wahrscheinlich?',
      sv: 'Vad betyder namnet "De Force" troligen?',
    },
    options: {
      nl: ['De sterke', 'Van het bos', 'De smid', 'De boer'],
      fr: ['Le fort', 'De la forêt', 'Le forgeron', 'Le fermier'],
      en: ['The strong one', 'From the forest', 'The blacksmith', 'The farmer'],
      de: ['Der Starke', 'Aus dem Wald', 'Der Schmied', 'Der Bauer'],
      sv: ['Den starke', 'Från skogen', 'Smeden', 'Bonden'],
    },
    correctIndex: 0,
    explanation: {
      nl: 'De naam "De Force" is afgeleid van het Franse woord voor kracht of sterkte.',
      fr: 'Le nom "De Force" est dérivé du mot français pour force ou puissance.',
      en: 'The name "De Force" is derived from the French word for strength or power.',
      de: 'Der Name "De Force" leitet sich vom französischen Wort für Kraft oder Stärke ab.',
      sv: 'Namnet "De Force" härstammar från det franska ordet för styrka eller kraft.',
    },
  },
  {
    id: 'lille',
    question: {
      nl: 'Hoe heet Rijsel in het Frans?',
      fr: 'Comment s\'appelle Lille en néerlandais?',
      en: 'What is the Dutch name for Lille?',
      de: 'Wie heißt Lille auf Niederländisch?',
      sv: 'Vad heter Lille på nederländska?',
    },
    options: {
      nl: ['Lyon', 'Lille', 'Luik', 'Lens'],
      fr: ['Lyon', 'Rijsel', 'Liège', 'Lens'],
      en: ['Lyon', 'Rijsel', 'Liège', 'Lens'],
      de: ['Lyon', 'Rijsel', 'Lüttich', 'Lens'],
      sv: ['Lyon', 'Rijsel', 'Liège', 'Lens'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Rijsel is de Nederlandse naam voor de Franse stad Lille.',
      fr: 'Rijsel est le nom néerlandais de la ville française de Lille.',
      en: 'Rijsel is the Dutch name for the French city of Lille.',
      de: 'Rijsel ist der niederländische Name für die französische Stadt Lille.',
      sv: 'Rijsel är det nederländska namnet på den franska staden Lille.',
    },
  },
  {
    id: 'century',
    question: {
      nl: 'In welke eeuw begon de migratie van de familie naar België?',
      fr: 'En quel siècle a commencé la migration de la famille vers la Belgique?',
      en: 'In which century did the family migration to Belgium begin?',
      de: 'In welchem Jahrhundert begann die Migration der Familie nach Belgien?',
      sv: 'I vilket århundrade började familjens migration till Belgien?',
    },
    options: {
      nl: ['16e eeuw', '17e eeuw', '18e eeuw', '19e eeuw'],
      fr: ['16e siècle', '17e siècle', '18e siècle', '19e siècle'],
      en: ['16th century', '17th century', '18th century', '19th century'],
      de: ['16. Jahrhundert', '17. Jahrhundert', '18. Jahrhundert', '19. Jahrhundert'],
      sv: ['1500-talet', '1600-talet', '1700-talet', '1800-talet'],
    },
    correctIndex: 2,
    explanation: {
      nl: 'De migratie naar België begon voornamelijk in de 18e en 19e eeuw.',
      fr: 'La migration vers la Belgique a commencé principalement aux 18e et 19e siècles.',
      en: 'The migration to Belgium began mainly in the 18th and 19th centuries.',
      de: 'Die Migration nach Belgien begann hauptsächlich im 18. und 19. Jahrhundert.',
      sv: 'Migrationen till Belgien började huvudsakligen på 1700- och 1800-talet.',
    },
  },
  {
    id: 'potato_famine',
    question: {
      nl: 'Welke ramp trof Vlaanderen in de jaren 1840?',
      fr: 'Quelle catastrophe a frappé la Flandre dans les années 1840?',
      en: 'What disaster struck Flanders in the 1840s?',
      de: 'Welche Katastrophe traf Flandern in den 1840er Jahren?',
      sv: 'Vilken katastrof drabbade Flandern på 1840-talet?',
    },
    options: {
      nl: ['Een grote brand', 'De aardappelplaag', 'Een overstroming', 'Een pestepidemie'],
      fr: ['Un grand incendie', 'La maladie de la pomme de terre', 'Une inondation', 'Une épidémie de peste'],
      en: ['A great fire', 'The potato blight', 'A flood', 'A plague epidemic'],
      de: ['Ein großer Brand', 'Die Kartoffelfäule', 'Eine Überschwemmung', 'Eine Pestepidemie'],
      sv: ['En stor brand', 'Potatispesten', 'En översvämning', 'En pestepidemi'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'De aardappelplaag van 1845-1850 veroorzaakte grote hongersnood en dwong vele families te migreren.',
      fr: 'La maladie de la pomme de terre de 1845-1850 a causé une grande famine et forcé de nombreuses familles à migrer.',
      en: 'The potato blight of 1845-1850 caused great famine and forced many families to migrate.',
      de: 'Die Kartoffelfäule von 1845-1850 verursachte große Hungersnot und zwang viele Familien zur Migration.',
      sv: 'Potatispesten 1845-1850 orsakade stor hungersnöd och tvingade många familjer att migrera.',
    },
  },
  {
    id: 'linen_crisis',
    question: {
      nl: 'Welke crisis trof de Vlaamse textielindustrie in de 19e eeuw?',
      fr: 'Quelle crise a frappé l\'industrie textile flamande au 19e siècle?',
      en: 'What crisis hit the Flemish textile industry in the 19th century?',
      de: 'Welche Krise traf die flämische Textilindustrie im 19. Jahrhundert?',
      sv: 'Vilken kris drabbade den flamländska textilindustrin på 1800-talet?',
    },
    options: {
      nl: ['Wolcrisis', 'Linnencrisis', 'Katoencrisis', 'Zijdecrisis'],
      fr: ['Crise de la laine', 'Crise du lin', 'Crise du coton', 'Crise de la soie'],
      en: ['Wool crisis', 'Linen crisis', 'Cotton crisis', 'Silk crisis'],
      de: ['Wollkrise', 'Leinenkrise', 'Baumwollkrise', 'Seidenkrise'],
      sv: ['Ullkris', 'Linnekris', 'Bomullskris', 'Sidenkris'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'De linnencrisis door mechanisatie maakte veel handwevers werkloos en dwong tot migratie.',
      fr: 'La crise du lin due à la mécanisation a mis de nombreux tisserands au chômage et les a forcés à migrer.',
      en: 'The linen crisis due to mechanization left many handweavers unemployed and forced migration.',
      de: 'Die Leinenkrise durch Mechanisierung machte viele Handweber arbeitslos und erzwang Migration.',
      sv: 'Linnekrisen på grund av mekanisering gjorde många handvävare arbetslösa och tvingade till migration.',
    },
  },
  {
    id: 'halennes',
    question: {
      nl: 'Welke plaats in Frans-Vlaanderen is belangrijk voor de familie De Force?',
      fr: 'Quel lieu en Flandre française est important pour la famille De Force?',
      en: 'Which place in French Flanders is important for the De Force family?',
      de: 'Welcher Ort in Französisch-Flandern ist wichtig für die Familie De Force?',
      sv: 'Vilken plats i Franska Flandern är viktig för familjen De Force?',
    },
    options: {
      nl: ['Parijs', 'Halennes-lez-Haubourdin', 'Lyon', 'Marseille'],
      fr: ['Paris', 'Halennes-lez-Haubourdin', 'Lyon', 'Marseille'],
      en: ['Paris', 'Halennes-lez-Haubourdin', 'Lyon', 'Marseille'],
      de: ['Paris', 'Halennes-lez-Haubourdin', 'Lyon', 'Marseille'],
      sv: ['Paris', 'Halennes-lez-Haubourdin', 'Lyon', 'Marseille'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Halennes-lez-Haubourdin bij Rijsel is een belangrijke stamplaats van de familie.',
      fr: 'Halennes-lez-Haubourdin près de Lille est un lieu d\'origine important de la famille.',
      en: 'Halennes-lez-Haubourdin near Lille is an important ancestral place of the family.',
      de: 'Halennes-lez-Haubourdin bei Lille ist ein wichtiger Stammort der Familie.',
      sv: 'Halennes-lez-Haubourdin nära Lille är en viktig stamort för familjen.',
    },
  },
  {
    id: 'cholera',
    question: {
      nl: 'Welke ziekte veroorzaakte epidemieën in de 19e eeuw?',
      fr: 'Quelle maladie a causé des épidémies au 19e siècle?',
      en: 'What disease caused epidemics in the 19th century?',
      de: 'Welche Krankheit verursachte Epidemien im 19. Jahrhundert?',
      sv: 'Vilken sjukdom orsakade epidemier på 1800-talet?',
    },
    options: {
      nl: ['Pokken', 'Cholera', 'Griep', 'Malaria'],
      fr: ['Variole', 'Choléra', 'Grippe', 'Paludisme'],
      en: ['Smallpox', 'Cholera', 'Flu', 'Malaria'],
      de: ['Pocken', 'Cholera', 'Grippe', 'Malaria'],
      sv: ['Smittkoppor', 'Kolera', 'Influensa', 'Malaria'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Cholera-epidemieën in 1832, 1848 en 1866 eisten veel levens in Vlaanderen.',
      fr: 'Les épidémies de choléra de 1832, 1848 et 1866 ont fait de nombreuses victimes en Flandre.',
      en: 'Cholera epidemics in 1832, 1848, and 1866 claimed many lives in Flanders.',
      de: 'Cholera-Epidemien in 1832, 1848 und 1866 forderten viele Opfer in Flandern.',
      sv: 'Koleraepidemier 1832, 1848 och 1866 krävde många liv i Flandern.',
    },
  },
  {
    id: 'king_louis',
    question: {
      nl: 'Welke Franse koning heerste over Frans-Vlaanderen in de 17e eeuw?',
      fr: 'Quel roi français a régné sur la Flandre française au 17e siècle?',
      en: 'Which French king ruled over French Flanders in the 17th century?',
      de: 'Welcher französische König herrschte im 17. Jahrhundert über Französisch-Flandern?',
      sv: 'Vilken fransk kung härskade över Franska Flandern på 1600-talet?',
    },
    options: {
      nl: ['Lodewijk XIII', 'Lodewijk XIV', 'Lodewijk XV', 'Napoleon'],
      fr: ['Louis XIII', 'Louis XIV', 'Louis XV', 'Napoléon'],
      en: ['Louis XIII', 'Louis XIV', 'Louis XV', 'Napoleon'],
      de: ['Ludwig XIII', 'Ludwig XIV', 'Ludwig XV', 'Napoleon'],
      sv: ['Ludvig XIII', 'Ludvig XIV', 'Ludvig XV', 'Napoleon'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Lodewijk XIV, de Zonnekoning, veroverde Frans-Vlaanderen en voerde een verfransingspolitiek.',
      fr: 'Louis XIV, le Roi Soleil, a conquis la Flandre française et mené une politique de francisation.',
      en: 'Louis XIV, the Sun King, conquered French Flanders and pursued a policy of Frenchification.',
      de: 'Ludwig XIV., der Sonnenkönig, eroberte Französisch-Flandern und führte eine Französisierungspolitik.',
      sv: 'Ludvig XIV, Solkungen, erövrade Franska Flandern och förde en förfranskningspolitik.',
    },
  },
  {
    id: 'emelgem',
    question: {
      nl: 'Welke gemeente fuseerde later met Izegem?',
      fr: 'Quelle commune a fusionné plus tard avec Izegem?',
      en: 'Which municipality later merged with Izegem?',
      de: 'Welche Gemeinde fusionierte später mit Izegem?',
      sv: 'Vilken kommun sammanslogs senare med Izegem?',
    },
    options: {
      nl: ['Roeselare', 'Emelgem', 'Kortrijk', 'Tielt'],
      fr: ['Roulers', 'Emelgem', 'Courtrai', 'Tielt'],
      en: ['Roeselare', 'Emelgem', 'Kortrijk', 'Tielt'],
      de: ['Roeselare', 'Emelgem', 'Kortrijk', 'Tielt'],
      sv: ['Roeselare', 'Emelgem', 'Kortrijk', 'Tielt'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Emelgem werd in 1977 gefuseerd met Izegem, waar veel De Force families woonden.',
      fr: 'Emelgem a fusionné avec Izegem en 1977, où vivaient de nombreuses familles De Force.',
      en: 'Emelgem merged with Izegem in 1977, where many De Force families lived.',
      de: 'Emelgem wurde 1977 mit Izegem fusioniert, wo viele De Force Familien lebten.',
      sv: 'Emelgem sammanslogs med Izegem 1977, där många De Force-familjer bodde.',
    },
  },
  {
    id: 'reunion',
    question: {
      nl: 'In welk jaar vond een belangrijke familiereünie plaats?',
      fr: 'En quelle année a eu lieu une importante réunion de famille?',
      en: 'In which year did an important family reunion take place?',
      de: 'In welchem Jahr fand ein wichtiges Familientreffen statt?',
      sv: 'Vilket år ägde en viktig familjeåterförening rum?',
    },
    options: {
      nl: ['1950', '1962', '1975', '1990'],
      fr: ['1950', '1962', '1975', '1990'],
      en: ['1950', '1962', '1975', '1990'],
      de: ['1950', '1962', '1975', '1990'],
      sv: ['1950', '1962', '1975', '1990'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'In 1962 vond een historische familiereünie plaats die de banden tussen familietakken versterkte.',
      fr: 'En 1962, une réunion de famille historique a renforcé les liens entre les branches familiales.',
      en: 'In 1962, a historic family reunion strengthened bonds between family branches.',
      de: '1962 fand ein historisches Familientreffen statt, das die Bindungen zwischen den Familienzweigen stärkte.',
      sv: '1962 ägde en historisk familjeåterförening rum som stärkte banden mellan familjegrenarna.',
    },
  },
  {
    id: 'bastille',
    question: {
      nl: 'Welke historische gebeurtenis in 1789 beïnvloedde Frans-Vlaanderen?',
      fr: 'Quel événement historique de 1789 a influencé la Flandre française?',
      en: 'What historical event in 1789 influenced French Flanders?',
      de: 'Welches historische Ereignis von 1789 beeinflusste Französisch-Flandern?',
      sv: 'Vilken historisk händelse 1789 påverkade Franska Flandern?',
    },
    options: {
      nl: ['Industriële Revolutie', 'Franse Revolutie', 'Amerikaanse Onafhankelijkheid', 'Wener Congres'],
      fr: ['Révolution industrielle', 'Révolution française', 'Indépendance américaine', 'Congrès de Vienne'],
      en: ['Industrial Revolution', 'French Revolution', 'American Independence', 'Congress of Vienna'],
      de: ['Industrielle Revolution', 'Französische Revolution', 'Amerikanische Unabhängigkeit', 'Wiener Kongress'],
      sv: ['Industriella revolutionen', 'Franska revolutionen', 'Amerikanska självständigheten', 'Wienkongressen'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'De Franse Revolutie bracht grote veranderingen in eigendomsrechten en kerkelijke registers.',
      fr: 'La Révolution française a apporté de grands changements dans les droits de propriété et les registres paroissiaux.',
      en: 'The French Revolution brought major changes in property rights and church records.',
      de: 'Die Französische Revolution brachte große Veränderungen bei Eigentumsrechten und Kirchenregistern.',
      sv: 'Franska revolutionen medförde stora förändringar i äganderätt och kyrkliga register.',
    },
  },
  {
    id: 'ww1',
    question: {
      nl: 'Waar vonden de zwaarste gevechten van WO1 in België plaats?',
      fr: 'Où ont eu lieu les combats les plus violents de la Première Guerre mondiale en Belgique?',
      en: 'Where did the heaviest WW1 fighting in Belgium take place?',
      de: 'Wo fanden die schwersten Kämpfe des Ersten Weltkriegs in Belgien statt?',
      sv: 'Var utkämpades de hårdaste striderna under första världskriget i Belgien?',
    },
    options: {
      nl: ['Brussel', 'Antwerpen', 'De IJzervlakte', 'Luik'],
      fr: ['Bruxelles', 'Anvers', 'La plaine de l\'Yser', 'Liège'],
      en: ['Brussels', 'Antwerp', 'The Yser plains', 'Liège'],
      de: ['Brüssel', 'Antwerpen', 'Die Yser-Ebene', 'Lüttich'],
      sv: ['Bryssel', 'Antwerpen', 'Yser-slätten', 'Liège'],
    },
    correctIndex: 2,
    explanation: {
      nl: 'De IJzervlakte was het toneel van loopgravenoorlog en had grote impact op de bevolking.',
      fr: 'La plaine de l\'Yser fut le théâtre d\'une guerre de tranchées et eut un grand impact sur la population.',
      en: 'The Yser plains were the scene of trench warfare and had a major impact on the population.',
      de: 'Die Yser-Ebene war Schauplatz des Stellungskriegs und hatte große Auswirkungen auf die Bevölkerung.',
      sv: 'Yser-slätten var skådeplatsen för skyttegravskrig och hade stor inverkan på befolkningen.',
    },
  },
  {
    id: 'ferraris',
    question: {
      nl: 'Welke beroemde kaart uit 1777 toont de Vlaamse regio?',
      fr: 'Quelle célèbre carte de 1777 montre la région flamande?',
      en: 'Which famous map from 1777 shows the Flemish region?',
      de: 'Welche berühmte Karte von 1777 zeigt die flämische Region?',
      sv: 'Vilken berömd karta från 1777 visar den flamländska regionen?',
    },
    options: {
      nl: ['Mercatorkaart', 'Ferrariskaart', 'Orteliuskaart', 'Blaeukaart'],
      fr: ['Carte de Mercator', 'Carte de Ferraris', 'Carte d\'Ortelius', 'Carte de Blaeu'],
      en: ['Mercator map', 'Ferraris map', 'Ortelius map', 'Blaeu map'],
      de: ['Mercator-Karte', 'Ferraris-Karte', 'Ortelius-Karte', 'Blaeu-Karte'],
      sv: ['Mercator-kartan', 'Ferraris-kartan', 'Ortelius-kartan', 'Blaeu-kartan'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'De Ferrariskaart is een gedetailleerde historische kaart die dorpen en wegen uit die tijd toont.',
      fr: 'La carte de Ferraris est une carte historique détaillée montrant les villages et les routes de l\'époque.',
      en: 'The Ferraris map is a detailed historical map showing villages and roads from that time.',
      de: 'Die Ferraris-Karte ist eine detaillierte historische Karte, die Dörfer und Straßen jener Zeit zeigt.',
      sv: 'Ferraris-kartan är en detaljerad historisk karta som visar byar och vägar från den tiden.',
    },
  },
  {
    id: 'pvba_year',
    question: {
      nl: 'In welk jaar werd de PVBA "Marcel Deforce & Zonen" opgericht?',
      fr: 'En quelle année la PVBA "Marcel Deforce & Fils" a-t-elle été fondée?',
      en: 'In what year was the PVBA "Marcel Deforce & Sons" founded?',
      de: 'In welchem Jahr wurde die PVBA „Marcel Deforce & Söhne" gegründet?',
      sv: 'Vilket år grundades PVBA "Marcel Deforce & Söner"?',
    },
    options: {
      nl: ['1940', '1945', '1950', '1935'],
      fr: ['1940', '1945', '1950', '1935'],
      en: ['1940', '1945', '1950', '1935'],
      de: ['1940', '1945', '1950', '1935'],
      sv: ['1940', '1945', '1950', '1935'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'De oprichtingsakte werd geregistreerd op 5 juni 1945, kort na het einde van de oorlog.',
      fr: "L'acte de fondation a été enregistré le 5 juin 1945, peu après la fin de la guerre.",
      en: 'The founding deed was registered on June 5, 1945, shortly after the end of the war.',
      de: 'Die Gründungsurkunde wurde am 5. Juni 1945 registriert, kurz nach Kriegsende.',
      sv: 'Grundningshandlingen registrerades den 5 juni 1945, kort efter krigets slut.',
    },
  },
  {
    id: 'izegem_liberation',
    question: {
      nl: 'Wanneer werd Izegem bevrijd in de Tweede Wereldoorlog?',
      fr: "Quand Izegem a-t-il été libéré pendant la Seconde Guerre mondiale?",
      en: 'When was Izegem liberated in World War II?',
      de: 'Wann wurde Izegem im Zweiten Weltkrieg befreit?',
      sv: 'När befriades Izegem under andra världskriget?',
    },
    options: {
      nl: ['6 juni 1944', '8 september 1944', '11 november 1944', '5 mei 1945'],
      fr: ['6 juin 1944', '8 septembre 1944', '11 novembre 1944', '5 mai 1945'],
      en: ['June 6, 1944', 'September 8, 1944', 'November 11, 1944', 'May 5, 1945'],
      de: ['6. Juni 1944', '8. September 1944', '11. November 1944', '5. Mai 1945'],
      sv: ['6 juni 1944', '8 september 1944', '11 november 1944', '5 maj 1945'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Izegem werd bevrijd op 8 september 1944 door geallieerde pantserwagens vanuit Sint-Eloois-Winkel.',
      fr: "Izegem a été libéré le 8 septembre 1944 par des blindés alliés venant de Sint-Eloois-Winkel.",
      en: 'Izegem was liberated on September 8, 1944 by Allied armored vehicles from Sint-Eloois-Winkel.',
      de: 'Izegem wurde am 8. September 1944 durch alliierte Panzerfahrzeuge aus Sint-Eloois-Winkel befreit.',
      sv: 'Izegem befriades den 8 september 1944 av allierade pansarfordon från Sint-Eloois-Winkel.',
    },
  },
  {
    id: 'marcel_death',
    question: {
      nl: 'In welk jaar overleed Marcel Deforce?',
      fr: 'En quelle année Marcel Deforce est-il décédé?',
      en: 'In what year did Marcel Deforce pass away?',
      de: 'In welchem Jahr starb Marcel Deforce?',
      sv: 'Vilket år avled Marcel Deforce?',
    },
    options: {
      nl: ['1958', '1960', '1963', '1970'],
      fr: ['1958', '1960', '1963', '1970'],
      en: ['1958', '1960', '1963', '1970'],
      de: ['1958', '1960', '1963', '1970'],
      sv: ['1958', '1960', '1963', '1970'],
    },
    correctIndex: 2,
    explanation: {
      nl: 'Marcel Deforce overleed in 1963. Zijn zonen zetten het familiebedrijf voort.',
      fr: 'Marcel Deforce est décédé en 1963. Ses fils ont continué l\'entreprise familiale.',
      en: 'Marcel Deforce passed away in 1963. His sons continued the family business.',
      de: 'Marcel Deforce starb 1963. Seine Söhne führten das Familienunternehmen weiter.',
      sv: 'Marcel Deforce avled 1963. Hans söner fortsatte familjeföretaget.',
    },
  },
  {
    id: 'madeleine_redcross',
    question: {
      nl: 'Bij welke organisatie was Madeleine Geldof actief tijdens de oorlog?',
      fr: 'Dans quelle organisation Madeleine Geldof était-elle active pendant la guerre?',
      en: 'In which organization was Madeleine Geldof active during the war?',
      de: 'In welcher Organisation war Madeleine Geldof während des Krieges aktiv?',
      sv: 'I vilken organisation var Madeleine Geldof aktiv under kriget?',
    },
    options: {
      nl: ['Het Leger', 'Het Rode Kruis', 'De Vrijmetselarij', 'De Boerenbond'],
      fr: ["L'armée", 'La Croix-Rouge', 'La Franc-maçonnerie', 'La Ligue des fermiers'],
      en: ['The Army', 'The Red Cross', 'Freemasonry', "The Farmers' League"],
      de: ['Die Armee', 'Das Rote Kreuz', 'Die Freimaurerei', 'Der Bauernbund'],
      sv: ['Armén', 'Röda Korset', 'Frimureriet', 'Bondeförbundet'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Madeleine Geldof zette zich in voor het Rode Kruis, een humanitaire organisatie.',
      fr: "Madeleine Geldof s'est engagée pour la Croix-Rouge, une organisation humanitaire.",
      en: 'Madeleine Geldof volunteered for the Red Cross, a humanitarian organization.',
      de: 'Madeleine Geldof engagierte sich beim Roten Kreuz, einer humanitären Organisation.',
      sv: 'Madeleine Geldof engagerade sig i Röda Korset, en humanitär organisation.',
    },
  },
  {
    id: 'emile_geldof',
    question: {
      nl: 'Wie was Emile Geldof in relatie tot Marcel Deforce?',
      fr: 'Qui était Emile Geldof par rapport à Marcel Deforce?',
      en: 'Who was Emile Geldof in relation to Marcel Deforce?',
      de: 'Wer war Emile Geldof in Bezug auf Marcel Deforce?',
      sv: 'Vem var Emile Geldof i förhållande till Marcel Deforce?',
    },
    options: {
      nl: ['Zijn vader', 'Zijn schoonvader', 'Zijn broer', 'Zijn neef'],
      fr: ['Son père', 'Son beau-père', 'Son frère', 'Son cousin'],
      en: ['His father', 'His father-in-law', 'His brother', 'His cousin'],
      de: ['Sein Vater', 'Sein Schwiegervater', 'Sein Bruder', 'Sein Cousin'],
      sv: ['Hans far', 'Hans svärfar', 'Hans bror', 'Hans kusin'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Emile Geldof was de vader van Magdalena Geldof, de echtgenote van Marcel Deforce.',
      fr: "Emile Geldof était le père de Magdalena Geldof, l'épouse de Marcel Deforce.",
      en: 'Emile Geldof was the father of Magdalena Geldof, the wife of Marcel Deforce.',
      de: 'Emile Geldof war der Vater von Magdalena Geldof, der Ehefrau von Marcel Deforce.',
      sv: 'Emile Geldof var far till Magdalena Geldof, hustrun till Marcel Deforce.',
    },
  },
  {
    id: 'gezinsbond',
    question: {
      nl: 'Voor welke organisatie werd het gezin Deforce gehuldigd als groot gezin?',
      fr: 'Par quelle organisation la famille Deforce a-t-elle été honorée comme grande famille?',
      en: 'By which organization was the Deforce family honored as a large family?',
      de: 'Von welcher Organisation wurde die Familie Deforce als kinderreiche Familie geehrt?',
      sv: 'Av vilken organisation hedrades familjen Deforce som en stor familj?',
    },
    options: {
      nl: ['Het Rode Kruis', 'De Gezinsbond', 'De Boerenbond', 'De Kerkfabriek'],
      fr: ['La Croix-Rouge', 'La Ligue des familles', 'La Ligue des fermiers', 'La fabrique d\'église'],
      en: ['The Red Cross', 'The Family League', "The Farmers' League", 'The Church Board'],
      de: ['Das Rote Kreuz', 'Der Familienbund', 'Der Bauernbund', 'Der Kirchenvorstand'],
      sv: ['Röda Korset', 'Familjeförbundet', 'Bondeförbundet', 'Kyrkorådet'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'De Gezinsbond huldigde het gezin Deforce als groot gezin, een erkenning van hun kroostrijk gezin.',
      fr: "La Ligue des familles a honoré la famille Deforce comme grande famille.",
      en: 'The Family League honored the Deforce family as a large family.',
      de: 'Der Familienbund ehrte die Familie Deforce als kinderreiche Familie.',
      sv: 'Familjeförbundet hedrade familjen Deforce som en stor familj.',
    },
  },
  {
    id: 'marcel_soldier',
    question: {
      nl: 'In welke oorlog diende Marcel Deforce als soldaat?',
      fr: 'Dans quelle guerre Marcel Deforce a-t-il servi comme soldat?',
      en: 'In which war did Marcel Deforce serve as a soldier?',
      de: 'In welchem Krieg diente Marcel Deforce als Soldat?',
      sv: 'I vilket krig tjänstgjorde Marcel Deforce som soldat?',
    },
    options: {
      nl: ['Tweede Wereldoorlog', 'Eerste Wereldoorlog', 'Koreaanse Oorlog', 'Frans-Duitse Oorlog'],
      fr: ['Seconde Guerre mondiale', 'Première Guerre mondiale', 'Guerre de Corée', 'Guerre franco-allemande'],
      en: ['World War II', 'World War I', 'Korean War', 'Franco-Prussian War'],
      de: ['Zweiter Weltkrieg', 'Erster Weltkrieg', 'Koreakrieg', 'Deutsch-Französischer Krieg'],
      sv: ['Andra världskriget', 'Första världskriget', 'Koreakriget', 'Fransk-tyska kriget'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Marcel Deforce diende als soldaat tijdens de Eerste Wereldoorlog (1914-1918).',
      fr: 'Marcel Deforce a servi comme soldat pendant la Première Guerre mondiale (1914-1918).',
      en: 'Marcel Deforce served as a soldier during World War I (1914-1918).',
      de: 'Marcel Deforce diente als Soldat im Ersten Weltkrieg (1914-1918).',
      sv: 'Marcel Deforce tjänstgjorde som soldat under första världskriget (1914-1918).',
    },
  },
  {
    id: 'meubel_label',
    question: {
      nl: 'Wat werd op elk meubel geplakt dat het atelier Deforce verliet?',
      fr: "Qu'est-ce qui était apposé sur chaque meuble quittant l'atelier Deforce?",
      en: 'What was placed on every piece of furniture leaving the Deforce workshop?',
      de: 'Was wurde auf jedes Möbelstück geklebt, das die Werkstatt Deforce verließ?',
      sv: 'Vad placerades på varje möbel som lämnade Deforce-verkstaden?',
    },
    options: {
      nl: ['Een zegel', 'Een label met productnummer', 'Een handtekening', 'Een stempel'],
      fr: ['Un sceau', 'Une étiquette avec numéro de produit', 'Une signature', 'Un tampon'],
      en: ['A seal', 'A label with product number', 'A signature', 'A stamp'],
      de: ['Ein Siegel', 'Ein Etikett mit Produktnummer', 'Eine Unterschrift', 'Ein Stempel'],
      sv: ['Ett sigill', 'En etikett med produktnummer', 'En signatur', 'En stämpel'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Elk meubel kreeg een label met productnummer en kleurcode, een teken van kwaliteit en traceerbaarheid.',
      fr: "Chaque meuble recevait une étiquette avec numéro de produit et code couleur, signe de qualité et traçabilité.",
      en: 'Each piece of furniture received a label with product number and color code, a sign of quality and traceability.',
      de: 'Jedes Möbelstück erhielt ein Etikett mit Produktnummer und Farbcode, ein Zeichen für Qualität und Rückverfolgbarkeit.',
      sv: 'Varje möbel fick en etikett med produktnummer och färgkod, ett tecken på kvalitet och spårbarhet.',
    },
  },
  {
    id: 'reunion_2024',
    question: {
      nl: 'In welk jaar vond de meest recente familiereünie van de Deforce-familie plaats?',
      fr: 'En quelle année a eu lieu la plus récente réunion de la famille Deforce?',
      en: 'In which year did the most recent Deforce family reunion take place?',
      de: 'In welchem Jahr fand das jüngste Familientreffen der Familie Deforce statt?',
      sv: 'Vilket år ägde den senaste familjeåterföreningen för familjen Deforce rum?',
    },
    options: {
      nl: ['2010', '2018', '2024', '2020'],
      fr: ['2010', '2018', '2024', '2020'],
      en: ['2010', '2018', '2024', '2020'],
      de: ['2010', '2018', '2024', '2020'],
      sv: ['2010', '2018', '2024', '2020'],
    },
    correctIndex: 2,
    explanation: {
      nl: 'In 2024 vond de meest recente familiereünie plaats, meer dan 60 jaar na die van 1962.',
      fr: "En 2024, la réunion de famille la plus récente a eu lieu, plus de 60 ans après celle de 1962.",
      en: 'In 2024, the most recent family reunion took place, more than 60 years after the 1962 one.',
      de: '2024 fand das jüngste Familientreffen statt, mehr als 60 Jahre nach dem von 1962.',
      sv: '2024 ägde den senaste familjeåterföreningen rum, mer än 60 år efter den 1962.',
    },
  },
  {
    id: 'drei_zusjes',
    question: {
      nl: 'Hoe heetten de drie zusjes Deforce die op een bekende familiefoto staan?',
      fr: 'Comment s\'appelaient les trois sœurs Deforce sur une célèbre photo de famille?',
      en: 'What were the names of the three Deforce sisters in a famous family photo?',
      de: 'Wie hießen die drei Schwestern Deforce auf einem bekannten Familienfoto?',
      sv: 'Vad hette de tre systrarna Deforce på ett känt familjefoto?',
    },
    options: {
      nl: ['Maria, Anna, Clara', 'Monique, Bérénice, Félice', 'Louise, Marie, Jeanne', 'Irène, Simonne, Denise'],
      fr: ['Maria, Anna, Clara', 'Monique, Bérénice, Félice', 'Louise, Marie, Jeanne', 'Irène, Simonne, Denise'],
      en: ['Maria, Anna, Clara', 'Monique, Bérénice, Félice', 'Louise, Marie, Jeanne', 'Irène, Simonne, Denise'],
      de: ['Maria, Anna, Clara', 'Monique, Bérénice, Félice', 'Louise, Marie, Jeanne', 'Irène, Simonne, Denise'],
      sv: ['Maria, Anna, Clara', 'Monique, Bérénice, Félice', 'Louise, Marie, Jeanne', 'Irène, Simonne, Denise'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Monique, Bérénice en Félice Deforce poseren samen op een charmante foto uit de jaren 1950.',
      fr: 'Monique, Bérénice et Félice Deforce posent ensemble sur une charmante photo des années 1950.',
      en: 'Monique, Bérénice, and Félice Deforce pose together in a charming 1950s photo.',
      de: 'Monique, Bérénice und Félice Deforce posieren zusammen auf einem charmanten Foto aus den 1950er Jahren.',
      sv: 'Monique, Bérénice och Félice Deforce poserar tillsammans på ett charmigt foto från 1950-talet.',
    },
  },
  // === Overledenen / Demografische analyse ===
  {
    id: 'deceased_child_mortality',
    question: {
      nl: 'Hoeveel kinderen verloor Charles Louis Deforce als baby of peuter in de jaren 1880–1890?',
      fr: 'Combien d\'enfants Charles Louis Deforce a-t-il perdus en bas âge dans les années 1880–1890?',
      en: 'How many children did Charles Louis Deforce lose as infants in the 1880s–1890s?',
      de: 'Wie viele Kinder verlor Charles Louis Deforce als Säuglinge in den 1880er–1890er Jahren?',
      sv: 'Hur många barn förlorade Charles Louis Deforce som spädbarn under 1880–1890-talen?',
      pcd: 'Combin d\'éfants Charles Louis Deforce il o perdu in bas âche dins les années 1880–1890?',
      vls: 'Hoeveel kinders verloor Charles Louis Deforce as baby in de joarn 1880–1890?',
    },
    options: {
      nl: ['Twee', 'Vier', 'Zes', 'Eén'],
      fr: ['Deux', 'Quatre', 'Six', 'Un'],
      en: ['Two', 'Four', 'Six', 'One'],
      de: ['Zwei', 'Vier', 'Sechs', 'Eins'],
      sv: ['Två', 'Fyra', 'Sex', 'Ett'],
      pcd: ['Deux', 'Quate', 'Six', 'Un'],
      vls: ['Twêe', 'Viere', 'Zesse', 'Eén'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Charles Louis verloor minstens vier kinderen als baby: Achille (†1885), Odile (†1891), Elisa (†1893) en Joseph (†1897).',
      fr: 'Charles Louis a perdu au moins quatre enfants en bas âge : Achille (†1885), Odile (†1891), Elisa (†1893) et Joseph (†1897).',
      en: 'Charles Louis lost at least four children as infants: Achille (†1885), Odile (†1891), Elisa (†1893) and Joseph (†1897).',
      de: 'Charles Louis verlor mindestens vier Kinder als Säuglinge: Achille (†1885), Odile (†1891), Elisa (†1893) und Joseph (†1897).',
      sv: 'Charles Louis förlorade minst fyra barn som spädbarn: Achille (†1885), Odile (†1891), Elisa (†1893) och Joseph (†1897).',
      pcd: 'Charles Louis il o perdu au moins quate éfants in bas âche : Achille (†1885), Odile (†1891), Elisa (†1893) et Joseph (†1897).',
      vls: 'Charles Louis verloor minstens viere kinders as baby: Achille (†1885), Odile (†1891), Elisa (†1893) en Joseph (†1897).',
    },
  },
  {
    id: 'deceased_marcel_children',
    question: {
      nl: 'Hoeveel kinderen kregen Marcel en Magdalena Deforce-Geldof?',
      fr: 'Combien d\'enfants ont eu Marcel et Magdalena Deforce-Geldof?',
      en: 'How many children did Marcel and Magdalena Deforce-Geldof have?',
      de: 'Wie viele Kinder hatten Marcel und Magdalena Deforce-Geldof?',
      sv: 'Hur många barn hade Marcel och Magdalena Deforce-Geldof?',
      pcd: 'Combin d\'éfants ont eu Marcel et Magdalena Deforce-Geldof?',
      vls: 'Hoeveel kinders kreegn Marcel en Magdalena Deforce-Geldof?',
    },
    options: {
      nl: ['8', '10', '13', '15'],
      fr: ['8', '10', '13', '15'],
      en: ['8', '10', '13', '15'],
      de: ['8', '10', '13', '15'],
      sv: ['8', '10', '13', '15'],
      pcd: ['8', '10', '13', '15'],
      vls: ['8', '10', '13', '15'],
    },
    correctIndex: 2,
    explanation: {
      nl: 'Marcel en Magdalena kregen 13 kinderen tussen 1918 en 1945 — een uitzonderlijk groot gezin, zelfs voor die tijd.',
      fr: 'Marcel et Magdalena ont eu 13 enfants entre 1918 et 1945 — une famille exceptionnellement nombreuse, même pour l\'époque.',
      en: 'Marcel and Magdalena had 13 children between 1918 and 1945 — an exceptionally large family, even for that era.',
      de: 'Marcel und Magdalena hatten 13 Kinder zwischen 1918 und 1945 — eine außergewöhnlich große Familie, selbst für diese Zeit.',
      sv: 'Marcel och Magdalena fick 13 barn mellan 1918 och 1945 — en exceptionellt stor familj, även för den tiden.',
      pcd: 'Marcel et Magdalena i ont eu 13 éfants intre 1918 et 1945 — eune famille exceptionn\'ment grande, même pour ch\'t\'époque.',
      vls: 'Marcel en Magdalena kreegn 13 kinders tussn 1918 en 1945 — een uitzonderlik grôot gezin, zelfs vo die tied.',
    },
  },
  {
    id: 'deceased_pill',
    question: {
      nl: 'Wanneer werd de anticonceptiepil beschikbaar in België?',
      fr: 'Quand la pilule contraceptive est-elle devenue disponible en Belgique?',
      en: 'When did the contraceptive pill become available in Belgium?',
      de: 'Wann wurde die Antibabypille in Belgien verfügbar?',
      sv: 'När blev p-pillret tillgängligt i Belgien?',
      pcd: 'Quand qu\'eul pilule contraceptive al est d\'venue disponibe in Belgique?',
      vls: 'Wanneer wierd de anticonceptiepille beschikboar in België?',
    },
    options: {
      nl: ['1955–1956', '1962–1963', '1970–1971', '1975–1976'],
      fr: ['1955–1956', '1962–1963', '1970–1971', '1975–1976'],
      en: ['1955–1956', '1962–1963', '1970–1971', '1975–1976'],
      de: ['1955–1956', '1962–1963', '1970–1971', '1975–1976'],
      sv: ['1955–1956', '1962–1963', '1970–1971', '1975–1976'],
      pcd: ['1955–1956', '1962–1963', '1970–1971', '1975–1976'],
      vls: ['1955–1956', '1962–1963', '1970–1971', '1975–1976'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'De pil werd in 1962–1963 beschikbaar in België, al bleef open gebruik in katholiek Vlaanderen aanvankelijk taboe.',
      fr: 'La pilule est devenue disponible en Belgique en 1962–1963, bien que son usage ouvert soit resté tabou en Flandre catholique.',
      en: 'The pill became available in Belgium in 1962–1963, though open use remained taboo in Catholic Flanders.',
      de: 'Die Pille wurde 1962–1963 in Belgien verfügbar, obwohl ihre offene Verwendung im katholischen Flandern zunächst tabu blieb.',
      sv: 'P-pillret blev tillgängligt i Belgien 1962–1963, även om öppen användning förblev tabu i det katolska Flandern.',
      pcd: 'Eul pilule al est d\'venue disponibe in Belgique in 1962–1963, même si l\'usage ouvert i restot tabou in Flandre catholique.',
      vls: 'De pille wierd in 1962–1963 beschikboar in België, al bleef open gebruuk in \'t katholieke Vloandern oanvankelijk taboe.',
    },
  },
  {
    id: 'deceased_demographic_transition',
    question: {
      nl: 'Wat is de "demografische transitie" die zichtbaar is in de familiegegevens?',
      fr: 'Qu\'est-ce que la "transition démographique" visible dans les données familiales?',
      en: 'What is the "demographic transition" visible in the family data?',
      de: 'Was ist der "demografische Wandel", der in den Familiendaten sichtbar ist?',
      sv: 'Vad är den "demografiska övergången" som syns i familjedata?',
      pcd: 'Qu\'est-che que l\'"transition démographique" qu\'in voit dins les données familiales?',
      vls: 'Wat is de "demografische transitie" die zichtboar is in de familiegegevns?',
    },
    options: {
      nl: ['Verhuizing van stad naar platteland', 'Van veel geboorten/sterfte naar weinig geboorten/sterfte', 'Verandering van beroep', 'Taalverschuiving'],
      fr: ['Déménagement de la ville à la campagne', 'De beaucoup de naissances/décès à peu', 'Changement de profession', 'Changement de langue'],
      en: ['Moving from city to countryside', 'From many births/deaths to few', 'Change of profession', 'Language shift'],
      de: ['Umzug von Stadt aufs Land', 'Von vielen Geburten/Todesfällen zu wenigen', 'Berufswechsel', 'Sprachwechsel'],
      sv: ['Flytt från stad till landsbygd', 'Från många födslar/dödsfall till få', 'Yrkesbyte', 'Språkskifte'],
      pcd: ['Déménachemint del ville à l\'campagne', 'Ed plein d\'naissances/décès à peu', 'Changemint d\'métier', 'Changemint d\'langue'],
      vls: ['Verhuuzing van stad noa \'t platteland', 'Van vele geboortes/sterfte noa weinig', 'Veroandering van beroep', 'Toalverschuuving'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'De demografische transitie toont de overgang van een pre-modern patroon (veel geboorten, hoge kindersterfte) naar het moderne patroon (weinig geboorten, lage sterfte).',
      fr: 'La transition démographique montre le passage d\'un modèle pré-moderne (beaucoup de naissances, forte mortalité infantile) au modèle moderne (peu de naissances, faible mortalité).',
      en: 'The demographic transition shows the shift from a pre-modern pattern (many births, high child mortality) to the modern pattern (few births, low mortality).',
      de: 'Der demografische Wandel zeigt den Übergang von einem vormodernen Muster (viele Geburten, hohe Kindersterblichkeit) zum modernen Muster (wenige Geburten, niedrige Sterblichkeit).',
      sv: 'Den demografiska övergången visar skiftet från ett förmodernt mönster (många födslar, hög barnadödlighet) till det moderna mönstret (få födslar, låg dödlighet).',
      pcd: 'Eul transition démographique cha montre el passage d\'un modèle d\'avant (plein d\'naissances, forte mortalité des éfants) au modèle moderne (peu d\'naissances, faibe mortalité).',
      vls: 'De demografische transitie toont de overgang van een pre-modern patrôon (vele geboortes, hôoge kindersterfte) noa \'t moderne patrôon (weinig geboortes, loage sterfte).',
    },
  },
  {
    id: 'deceased_oldest',
    question: {
      nl: 'Wie is de oudst bekende voorvader van de familie Deforce?',
      fr: 'Qui est le plus ancien ancêtre connu de la famille Deforce?',
      en: 'Who is the oldest known ancestor of the Deforce family?',
      de: 'Wer ist der älteste bekannte Vorfahre der Familie Deforce?',
      sv: 'Vem är den äldste kände förfadern i familjen Deforce?',
      pcd: 'Qui ch\'est l\'pus ancien ancêtre connu del famille Deforce?',
      vls: 'Wie is de oudst bekende vôorvoader van de familie Deforce?',
    },
    options: {
      nl: ['Hubert Deleforge', 'Bauduin Deleforge', 'Charles Louis Deforce', 'Marcel Deforce'],
      fr: ['Hubert Deleforge', 'Bauduin Deleforge', 'Charles Louis Deforce', 'Marcel Deforce'],
      en: ['Hubert Deleforge', 'Bauduin Deleforge', 'Charles Louis Deforce', 'Marcel Deforce'],
      de: ['Hubert Deleforge', 'Bauduin Deleforge', 'Charles Louis Deforce', 'Marcel Deforce'],
      sv: ['Hubert Deleforge', 'Bauduin Deleforge', 'Charles Louis Deforce', 'Marcel Deforce'],
      pcd: ['Hubert Deleforge', 'Bauduin Deleforge', 'Charles Louis Deforce', 'Marcel Deforce'],
      vls: ['Hubert Deleforge', 'Bauduin Deleforge', 'Charles Louis Deforce', 'Marcel Deforce'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Bauduin Deleforge (~1555–~1620) is de vroegste bekende voorvader van de familie.',
      fr: 'Bauduin Deleforge (~1555–~1620) est le plus ancien ancêtre connu de la famille.',
      en: 'Bauduin Deleforge (~1555–~1620) is the earliest known ancestor of the family.',
      de: 'Bauduin Deleforge (~1555–~1620) ist der früheste bekannte Vorfahre der Familie.',
      sv: 'Bauduin Deleforge (~1555–~1620) är den äldste kände förfadern i familjen.',
      pcd: 'Bauduin Deleforge (~1555–~1620) ch\'est l\'pus ancien ancêtre connu del famille.',
      vls: 'Bauduin Deleforge (~1555–~1620) is de vroegste bekende vôorvoader van de familie.',
    },
  },
  {
    id: 'deceased_beatrice',
    question: {
      nl: 'Wat is bijzonder aan de naam Béatrice in het gezin van Marcel en Magdalena?',
      fr: 'Qu\'y a-t-il de particulier avec le prénom Béatrice dans la famille de Marcel et Magdalena?',
      en: 'What is notable about the name Béatrice in Marcel and Magdalena\'s family?',
      de: 'Was ist bemerkenswert am Namen Béatrice in der Familie von Marcel und Magdalena?',
      sv: 'Vad är anmärkningsvärt med namnet Béatrice i Marcel och Magdalenas familj?',
      pcd: 'Qu\'est-che qu\'il y o d\'particulier aveuc l\'prénom Béatrice dins l\'famille ed Marcel et Magdalena?',
      vls: 'Wat is bizonder an de noame Béatrice in \'t gezin van Marcel en Magdalena?',
    },
    options: {
      nl: ['Het was de naam van hun moeder', 'Twee dochters kregen die naam, beide stierven jong', 'Het was een populaire naam in Izegem', 'Zij werd de oudste van het gezin'],
      fr: ['C\'était le nom de leur mère', 'Deux filles ont reçu ce nom, toutes deux décédées jeunes', 'C\'était un nom populaire à Izegem', 'Elle est devenue l\'aînée de la famille'],
      en: ['It was their mother\'s name', 'Two daughters received that name, both died young', 'It was a popular name in Izegem', 'She became the eldest of the family'],
      de: ['Es war der Name ihrer Mutter', 'Zwei Töchter erhielten den Namen, beide starben jung', 'Es war ein beliebter Name in Izegem', 'Sie wurde die Älteste der Familie'],
      sv: ['Det var deras mors namn', 'Två döttrar fick det namnet, båda dog unga', 'Det var ett populärt namn i Izegem', 'Hon blev den äldsta i familjen'],
      pcd: ['Ch\'étot l\'nom d\'leu mère', 'Deux filles i ont reçu ch\'nom, toutes deux mortes jeunes', 'Ch\'étot un nom populaire à Izegem', 'Alle est d\'venue l\'ainée del famille'],
      vls: ['\'t Was de noame van hun moeder', 'Twêe dochters kreegn die noame, beidn stierven jong', '\'t Was een populaire noame in Izegem', 'Zij wierd de oudste van \'t gezin'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Béatrice Thérèse (†1924, 1 jaar) en Béatrice Euphrasie (†1926, 2 jaar) stierven beide als peuter. Het was gebruikelijk om de naam opnieuw te geven.',
      fr: 'Béatrice Thérèse (†1924, 1 an) et Béatrice Euphrasie (†1926, 2 ans) sont toutes deux décédées en bas âge. Il était courant de redonner le même prénom.',
      en: 'Béatrice Thérèse (†1924, age 1) and Béatrice Euphrasie (†1926, age 2) both died as toddlers. It was common to reuse the name.',
      de: 'Béatrice Thérèse (†1924, 1 Jahr) und Béatrice Euphrasie (†1926, 2 Jahre) starben beide als Kleinkinder. Es war üblich, den Namen erneut zu vergeben.',
      sv: 'Béatrice Thérèse (†1924, 1 år) och Béatrice Euphrasie (†1926, 2 år) dog båda som småbarn. Det var vanligt att återanvända namnet.',
      pcd: 'Béatrice Thérèse (†1924, 1 an) et Béatrice Euphrasie (†1926, 2 ans) i sont mortes toutes deux in bas âche. Ch\'étot courant ed r\'donner l\'même prénom.',
      vls: 'Béatrice Thérèse (†1924, 1 joar) en Béatrice Euphrasie (†1926, 2 joar) stierven beidns as peuter. \'t Was gebruukelik om de noame opnieuw te geevn.',
    },
  },
  {
    id: 'deceased_marcel_death',
    question: {
      nl: 'In welk jaar overleed Marcel August Deforce?',
      fr: 'En quelle année Marcel August Deforce est-il décédé?',
      en: 'In what year did Marcel August Deforce die?',
      de: 'In welchem Jahr starb Marcel August Deforce?',
      sv: 'Vilket år dog Marcel August Deforce?',
      pcd: 'In quelle année Marcel August Deforce il est décédé?',
      vls: 'In welk joar overleed Marcel August Deforce?',
    },
    options: {
      nl: ['1958', '1963', '1971', '1955'],
      fr: ['1958', '1963', '1971', '1955'],
      en: ['1958', '1963', '1971', '1955'],
      de: ['1958', '1963', '1971', '1955'],
      sv: ['1958', '1963', '1971', '1955'],
      pcd: ['1958', '1963', '1971', '1955'],
      vls: ['1958', '1963', '1971', '1955'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Marcel August Deforce overleed op 9 december 1963 op 69-jarige leeftijd.',
      fr: 'Marcel August Deforce est décédé le 9 décembre 1963 à l\'âge de 69 ans.',
      en: 'Marcel August Deforce died on December 9, 1963, at the age of 69.',
      de: 'Marcel August Deforce starb am 9. Dezember 1963 im Alter von 69 Jahren.',
      sv: 'Marcel August Deforce dog den 9 december 1963, 69 år gammal.',
      pcd: 'Marcel August Deforce il est décédé l\'9 décembre 1963 à l\'âche ed 69 ans.',
      vls: 'Marcel August Deforce overleed ip 9 december 1963 ip 69-joarigen ouderdom.',
    },
  },
  {
    id: 'deceased_jan_emiel',
    question: {
      nl: 'Wie was Jan Emiel Louis Deforce en wat overkwam hem?',
      fr: 'Qui était Jan Emiel Louis Deforce et que lui est-il arrivé?',
      en: 'Who was Jan Emiel Louis Deforce and what happened to him?',
      de: 'Wer war Jan Emiel Louis Deforce und was geschah mit ihm?',
      sv: 'Vem var Jan Emiel Louis Deforce och vad hände honom?',
      pcd: 'Qui ch\'étot Jan Emiel Louis Deforce et qu\'est-che qu\'il li est arrivé?',
      vls: 'Wie was Jan Emiel Louis Deforce en wat overkwam em?',
    },
    options: {
      nl: ['Een oorlogsheld die sneuvelde', 'Een baby die op 4 maanden overleed', 'Een meubelmaker in Izegem', 'De jongste zoon van Charles Louis'],
      fr: ['Un héros de guerre tombé au combat', 'Un bébé décédé à 4 mois', 'Un ébéniste à Izegem', 'Le plus jeune fils de Charles Louis'],
      en: ['A war hero who fell in battle', 'A baby who died at 4 months', 'A furniture maker in Izegem', 'The youngest son of Charles Louis'],
      de: ['Ein Kriegsheld, der im Kampf fiel', 'Ein Baby, das mit 4 Monaten starb', 'Ein Möbelmacher in Izegem', 'Der jüngste Sohn von Charles Louis'],
      sv: ['En krigshjälte som stupade', 'En baby som dog vid 4 månaders ålder', 'En möbelsnickare i Izegem', 'Den yngste sonen till Charles Louis'],
      pcd: ['Un héros d\'guerre tombé au combat', 'Un bébé décédé à 4 mois', 'Un ébéniste à Izegem', 'L\'pus jeune fils ed Charles Louis'],
      vls: ['Een oorlogseld die sneuvelde', 'Een baby die ip 4 moanden overleed', 'Een meubelmoaker in Izegem', 'De jongste zeune van Charles Louis'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Jan Emiel Louis Deforce (°11/11/1945 – †21/03/1946) overleed als baby van slechts 4 maanden oud, een tragisch voorbeeld van kindersterfte in de naoorlogse periode.',
      fr: 'Jan Emiel Louis Deforce (°11/11/1945 – †21/03/1946) est décédé à l\'âge de seulement 4 mois, un exemple tragique de mortalité infantile dans l\'après-guerre.',
      en: 'Jan Emiel Louis Deforce (°11/11/1945 – †21/03/1946) died as a baby of only 4 months, a tragic example of infant mortality in the post-war period.',
      de: 'Jan Emiel Louis Deforce (°11/11/1945 – †21/03/1946) starb als Baby von nur 4 Monaten, ein tragisches Beispiel für Säuglingssterblichkeit in der Nachkriegszeit.',
      sv: 'Jan Emiel Louis Deforce (°11/11/1945 – †21/03/1946) dog som baby vid bara 4 månaders ålder, ett tragiskt exempel på spädbarnsdödlighet under efterkrigstiden.',
      pcd: 'Jan Emiel Louis Deforce (°11/11/1945 – †21/03/1946) il est décédé comme bébé ed seulement 4 mois, un exemple tragique ed mortalité des éfants dins l\'après-guerre.',
      vls: 'Jan Emiel Louis Deforce (°11/11/1945 – †21/03/1946) overleed as baby van moar 4 moanden oud, een tragisch vôorbeeld van kindersterfte in de noa-oorlogse periode.',
    },
  },
  {
    id: 'deceased_bishops_1968',
    question: {
      nl: 'Wat publiceerden de Belgische bisschoppen in 1968 met betrekking tot de anticonceptiepil?',
      fr: 'Qu\'ont publié les évêques belges en 1968 concernant la pilule contraceptive?',
      en: 'What did the Belgian bishops publish in 1968 regarding the contraceptive pill?',
      de: 'Was veröffentlichten die belgischen Bischöfe 1968 bezüglich der Antibabypille?',
      sv: 'Vad publicerade de belgiska biskoparna 1968 angående p-pillret?',
      pcd: 'Qu\'est-che que les évêques belges i ont publié in 1968 à propos del pilule contraceptive?',
      vls: 'Wat publiceerden de Belgische bisschopn in 1968 mè betrekking tot de anticonceptiepille?',
    },
    options: {
      nl: ['Een totaalverbod', 'Een gewetensverklaring die individuele keuze toestond', 'Een verplichte cursus', 'Een excommunicatiedreiging'],
      fr: ['Une interdiction totale', 'Une déclaration de conscience autorisant le choix individuel', 'Un cours obligatoire', 'Une menace d\'excommunication'],
      en: ['A total ban', 'A declaration of conscience allowing individual choice', 'A mandatory course', 'A threat of excommunication'],
      de: ['Ein Totalverbot', 'Eine Gewissenserklärung, die individuelle Entscheidung zuließ', 'Einen Pflichtkurs', 'Eine Exkommunikationsdrohung'],
      sv: ['Ett totalförbud', 'En samvetsförklaring som tillät individuellt val', 'En obligatorisk kurs', 'Ett hot om exkommunicering'],
      pcd: ['Eune interdiction totale', 'Eune déclaration d\'conscience qu\'i autorisot l\'choix individuel', 'Un cours obligatoire', 'Eune menache d\'excommunication'],
      vls: ['Een totaalverbod', 'Een gewetensverkloaring die individuele keuze toestond', 'Een verplichten cursus', 'Een excommunicatiedreiging'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'De Belgische bisschoppen publiceerden een unieke gewetensverklaring die — in tegenstelling tot de pauselijke encycliek Humanae Vitae — individuele keuze inzake anticonceptie toestond.',
      fr: 'Les évêques belges ont publié une déclaration de conscience unique qui — contrairement à l\'encyclique papale Humanae Vitae — autorisait le choix individuel en matière de contraception.',
      en: 'The Belgian bishops published a unique declaration of conscience that — contrary to the papal encyclical Humanae Vitae — allowed individual choice regarding contraception.',
      de: 'Die belgischen Bischöfe veröffentlichten eine einzigartige Gewissenserklärung, die — im Gegensatz zur päpstlichen Enzyklika Humanae Vitae — individuelle Entscheidung bezüglich Verhütung zuließ.',
      sv: 'De belgiska biskoparna publicerade en unik samvetsförklaring som — i motsats till den påvliga encyklikan Humanae Vitae — tillät individuellt val gällande preventivmedel.',
      pcd: 'Les évêques belges i ont publié eune déclaration d\'conscience unique qui — à l\'encontre del\'encyclique papale Humanae Vitae — autorisot l\'choix individuel pour l\'contraception.',
      vls: 'De Belgische bisschopn publiceerden een unieke gewetensverkloaring die — in tegenstellienge tot de pauselijke encycliek Humanae Vitae — individuele keuze inzoake anticonceptie toestond.',
    },
  },
  {
    id: 'deceased_emile_wife_death',
    question: {
      nl: 'Hoe overleed Marie-Louise d\'Artois, de eerste echtgenote van Emile Geldof?',
      fr: 'Comment est décédée Marie-Louise d\'Artois, la première épouse d\'Emile Geldof?',
      en: 'How did Marie-Louise d\'Artois, Emile Geldof\'s first wife, die?',
      de: 'Wie starb Marie-Louise d\'Artois, die erste Ehefrau von Emile Geldof?',
      sv: 'Hur dog Marie-Louise d\'Artois, Emile Geldofs första hustru?',
      pcd: 'Comment qu\'al est morte Marie-Louise d\'Artois, eul première femme d\'Emile Geldof?',
      vls: 'Oe overleed Marie-Louise d\'Artois, de eerste vrouwe van Emile Geldof?',
    },
    options: {
      nl: ['Aan cholera', 'Na een bevalling', 'Door een ongeval', 'Aan ouderdom'],
      fr: ['Du choléra', 'Après un accouchement', 'Par accident', 'De vieillesse'],
      en: ['Of cholera', 'After childbirth', 'In an accident', 'Of old age'],
      de: ['An Cholera', 'Nach einer Geburt', 'Bei einem Unfall', 'An Altersschwäche'],
      sv: ['Av kolera', 'Efter en förlossning', 'I en olycka', 'Av ålderdom'],
      pcd: ['Du choléra', 'Après un accouchemint', 'Par accident', 'Ed vieillesse'],
      vls: ['An cholera', 'Noa een bevalling', 'Deur een ongeval', 'An ouderdom'],
    },
    correctIndex: 1,
    explanation: {
      nl: 'Marie-Louise d\'Artois (~1866–1893) overleed na de bevalling van haar dochtertje Maria Magdalena, dat zelf ook op 2-jarige leeftijd stierf.',
      fr: 'Marie-Louise d\'Artois (~1866–1893) est décédée après l\'accouchement de sa fille Maria Magdalena, qui elle-même est décédée à l\'âge de 2 ans.',
      en: 'Marie-Louise d\'Artois (~1866–1893) died after giving birth to her daughter Maria Magdalena, who herself died at age 2.',
      de: 'Marie-Louise d\'Artois (~1866–1893) starb nach der Geburt ihrer Tochter Maria Magdalena, die selbst im Alter von 2 Jahren starb.',
      sv: 'Marie-Louise d\'Artois (~1866–1893) dog efter förlossningen av sin dotter Maria Magdalena, som själv dog vid 2 års ålder.',
      pcd: 'Marie-Louise d\'Artois (~1866–1893) al est morte après l\'accouchemint ed s\'fille Maria Magdalena, qu\'al est elle-même morte à l\'âche ed 2 ans.',
      vls: 'Marie-Louise d\'Artois (~1866–1893) overleed noa de bevalling van heur dochterke Maria Magdalena, da zelf ôok ip 2-joarigen ouderdom stierf.',
    },
  },
];

interface HistoryQuizProps {
  onBack: () => void;
  difficulty: Difficulty;
  onDifficultyChange: (d: Difficulty) => void;
}

const getDifficultySettings = (difficulty: Difficulty) => {
  switch (difficulty) {
    case 'easy':
      return { questionCount: 5, timePerQuestion: 30, scoreMultiplier: 0.8 };
    case 'normal':
      return { questionCount: 7, timePerQuestion: 20, scoreMultiplier: 1.0 };
    case 'hard':
      return { questionCount: 10, timePerQuestion: 15, scoreMultiplier: 1.5 };
  }
};

// Memoized answer option button
interface AnswerOptionProps {
  option: string;
  index: number;
  isSelected: boolean;
  isCorrect: boolean;
  isWrong: boolean;
  isDisabled: boolean;
  onSelect: (index: number) => void;
}

const AnswerOption = memo(function AnswerOption({
  option,
  index,
  isSelected,
  isCorrect,
  isWrong,
  isDisabled,
  onSelect,
}: AnswerOptionProps) {
  return (
    <button
      onClick={() => onSelect(index)}
      disabled={isDisabled}
      className={`w-full p-4 rounded-xl text-left transition-all ${
        isCorrect
          ? 'bg-green-500/20 border-2 border-green-500 text-green-600'
          : isWrong
          ? 'bg-destructive/20 border-2 border-destructive text-destructive'
          : isSelected
          ? 'bg-muted/50 border-2 border-foreground/30'
          : 'bg-card border border-border hover:border-foreground/30 hover:bg-muted/30'
      } ${isDisabled && !isCorrect && !isWrong ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className="flex items-center gap-3">
        <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-medium text-sm">
          {String.fromCharCode(65 + index)}
        </span>
        <span className="flex-1">{option}</span>
        {isCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
        {isWrong && <XCircle className="w-5 h-5 text-destructive" />}
      </div>
    </button>
  );
});

const HistoryQuiz = ({ onBack, difficulty, onDifficultyChange }: HistoryQuizProps) => {
  const { language } = useLanguage();
  const { t } = useLanguage();
  const { addScore, unlockAchievement, isAchievementUnlocked, setBestScore, getBestScore } = useGame();
  const { playSuccessSound, playAchievementSound } = useAchievementSound();

  const currentBestScore = getBestScore('quiz', difficulty);
  const settings = getDifficultySettings(difficulty);

  const [questions, setQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(settings.timePerQuestion);
  const [gameComplete, setGameComplete] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const lang = useMemo(() => {
    // Map es, pcd, vls to their closest equivalent
    if (language === 'es') return 'en'; // Spanish users can read English
    if (language === 'pcd') return 'fr'; // Picard is similar to French
    if (language === 'vls') return 'nl'; // West Flemish is similar to Dutch
    if (language === 'sv') return 'sv';
    return ['nl', 'fr', 'en', 'de'].includes(language) ? language : 'nl';
  }, [language]);

  // Shuffle answer options for each question
  const shuffleOptions = useCallback((question: Question): ShuffledQuestion => {
    const indices = [0, 1, 2, 3];
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return {
      ...question,
      shuffledIndices: indices,
    };
  }, []);

  const initGame = useCallback(() => {
    const shuffledQuestions = [...ALL_QUESTIONS].sort(() => Math.random() - 0.5);
    const questionsWithShuffledOptions = shuffledQuestions
      .slice(0, settings.questionCount)
      .map(shuffleOptions);
    setQuestions(questionsWithShuffledOptions);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setCorrectAnswers(0);
    setTimeRemaining(settings.timePerQuestion);
    setGameComplete(false);
    setShowConfetti(false);
    setStreak(0);
    setMaxStreak(0);
  }, [settings.questionCount, settings.timePerQuestion, shuffleOptions]);

  useEffect(() => {
    initGame();
  }, [initGame, difficulty]);

  // Timer effect
  useEffect(() => {
    if (gameComplete || showResult || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestionIndex, gameComplete, showResult, questions.length]);

  const handleTimeUp = useCallback(() => {
    setShowResult(true);
    setStreak(0);
    setTimeout(() => nextQuestion(), 2000);
  }, []);

  const handleAnswerSelect = useCallback((displayIndex: number) => {
    if (showResult || selectedAnswer !== null) return;

    setSelectedAnswer(displayIndex);
    setShowResult(true);

    const currentQuestion = questions[currentQuestionIndex];
    // Map display index to original index to check if correct
    const originalIndex = currentQuestion.shuffledIndices[displayIndex];
    const isCorrect = originalIndex === currentQuestion.correctIndex;

    if (isCorrect) {
      playSuccessSound();
      const timeBonus = Math.round(timeRemaining * 2);
      const basePoints = 100;
      const streakBonus = streak * 10;
      const points = Math.round((basePoints + timeBonus + streakBonus) * settings.scoreMultiplier);
      
      setScore(prev => prev + points);
      addScore(points);
      setCorrectAnswers(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        setMaxStreak(current => Math.max(current, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    setTimeout(() => nextQuestion(), 2500);
  }, [showResult, selectedAnswer, questions, currentQuestionIndex, timeRemaining, streak, settings.scoreMultiplier, playSuccessSound, addScore]);

  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex + 1 >= questions.length) {
      // Game complete
      const finalScore = score;
      setGameComplete(true);
      setBestScore('quiz', difficulty, finalScore);
      
      if (correctAnswers === questions.length) {
        setShowConfetti(true);
        playAchievementSound();
        if (!isAchievementUnlocked('quiz_perfectie')) {
          unlockAchievement('quiz_perfectie');
        }
      }
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeRemaining(settings.timePerQuestion);
    }
  }, [currentQuestionIndex, questions.length, score, difficulty, correctAnswers, settings.timePerQuestion, setBestScore, playAchievementSound, isAchievementUnlocked, unlockAchievement]);

  const currentQuestion = questions[currentQuestionIndex];

  if (gameComplete) {
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    return (
      <>
        <Confetti isActive={showConfetti} duration={4000} />
        <section className="section-padding bg-gradient-to-b from-background to-card min-h-screen">
          <div className="container mx-auto max-w-2xl">
            <div className="bg-card border border-border rounded-2xl p-8 text-center shadow-elevated animate-enter">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-primary" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
                {t('game.quiz.complete')}
              </h2>
              <div className="space-y-3 mb-6">
                <p className="text-muted-foreground">
                  {t('game.quiz.correctAnswers')}: <span className="text-foreground font-medium">{correctAnswers}/{questions.length}</span> ({percentage}%)
                </p>
                {maxStreak > 1 && (
                  <p className="text-gold font-medium flex items-center justify-center gap-1">
                    <Zap className="w-4 h-4" />
                    {t('game.quiz.bestStreak')}: {maxStreak}
                  </p>
                )}
                <p className="text-muted-foreground">
                  {t('game.quiz.finalScore')}: <span className="text-primary font-bold text-2xl">{score}</span> {t('game.points')}
                </p>
              </div>
              {currentBestScore > 0 && (
                <p className="text-muted-foreground mb-6">
                  {t('game.best')} ({t(`game.difficulty.${difficulty}`)}): {currentBestScore} {t('game.points')}
                </p>
              )}
              <div className="flex gap-4 justify-center">
                <Button onClick={initGame} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {t('game.quiz.playAgain')}
                </Button>
                <Button onClick={onBack}>
                  {t('game.back')}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <section className="section-padding bg-gradient-to-b from-background to-card min-h-screen">
      <div className="container mx-auto max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" onClick={onBack} className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            {t('game.back')}
          </Button>
          <div className="flex items-center gap-4">
            <MuteButton />
            <div className={`flex items-center gap-2 rounded-lg px-3 py-2 ${timeRemaining <= 5 ? 'bg-destructive/10 border border-destructive/50' : 'bg-card border border-border'}`}>
              <Clock className={`w-4 h-4 ${timeRemaining <= 5 ? 'text-destructive' : 'text-primary'}`} />
              <span className={`font-mono ${timeRemaining <= 5 ? 'text-destructive font-bold' : 'text-foreground'}`}>{timeRemaining}s</span>
            </div>
            <span className="text-muted-foreground">
              {currentQuestionIndex + 1}/{questions.length}
            </span>
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full font-medium">
              {score} {t('game.points')}
            </span>
          </div>
        </div>

        <div className="space-y-6 animate-fade-in">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 text-primary mb-4">
              <HelpCircle className="w-5 h-5" />
              <span className="uppercase tracking-widest text-sm font-medium">
                {t('game.quiz.category')}
              </span>
            </div>
            <h2 className="font-serif text-3xl font-bold text-foreground mb-4">
              {t('game.quiz.title')}
            </h2>
            <DifficultySelector
              selectedDifficulty={difficulty}
              onSelect={onDifficultyChange}
            />
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
            />
          </div>

          {/* Question card */}
          <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <div className="mb-6">
              {streak >= 2 && (
                <div className="inline-flex items-center gap-1 bg-gold/20 text-gold px-3 py-1 rounded-full text-sm font-medium mb-4">
                  <Zap className="w-4 h-4" />
                  {streak}x streak!
                </div>
              )}
              <h3 className="text-xl font-medium text-foreground">
                {currentQuestion.question[lang] || currentQuestion.question.nl}
              </h3>
            </div>

            <div className="space-y-3">
              {currentQuestion.shuffledIndices.map((originalIndex, displayIndex) => {
                const options = currentQuestion.options[lang] || currentQuestion.options.nl;
                const option = options[originalIndex];
                const isCorrectAnswer = originalIndex === currentQuestion.correctIndex;
                return (
                  <AnswerOption
                    key={displayIndex}
                    option={option}
                    index={displayIndex}
                    isSelected={selectedAnswer === displayIndex}
                    isCorrect={showResult && isCorrectAnswer}
                    isWrong={showResult && selectedAnswer === displayIndex && !isCorrectAnswer}
                    isDisabled={showResult}
                    onSelect={handleAnswerSelect}
                  />
                );
              })}
            </div>

            {/* Explanation */}
            {showResult && (
              <div className={`mt-6 p-4 rounded-xl ${
                currentQuestion.shuffledIndices[selectedAnswer!] === currentQuestion.correctIndex 
                  ? 'bg-green-500/10 border border-green-500/30' 
                  : 'bg-muted'
              }`}>
                <p className="text-sm text-muted-foreground">
                  {currentQuestion.explanation[lang] || currentQuestion.explanation.nl}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center">
            <Button variant="outline" onClick={initGame}>
              <RotateCcw className="w-4 h-4 mr-2" />
              {t('game.quiz.restart')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistoryQuiz;
