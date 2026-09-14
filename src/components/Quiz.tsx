import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGame } from "@/contexts/GameContext";
import { useAchievementSound } from "@/hooks/useAchievementSound";
import { CheckCircle, XCircle, Trophy, RotateCcw, ChevronRight, Award, Star, Clock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Question {
  id: number;
  questionNl: string;
  questionFr: string;
  questionEn: string;
  questionEs: string;
  questionPcd?: string;
  questionVls?: string;
  questionDe?: string;
  options: {
    nl: string;
    fr: string;
    en: string;
    es: string;
    pcd?: string;
    vls?: string;
    de?: string;
  }[];
  correctAnswer: number;
  explanationNl: string;
  explanationFr: string;
  explanationEn: string;
  explanationEs: string;
  explanationPcd?: string;
  explanationVls?: string;
  explanationDe?: string;
}

const questions: Question[] = [
  {
    id: 1,
    questionNl: "Wie waren de stamouders van de familie Deforce?",
    questionFr: "Qui étaient les ancêtres fondateurs de la famille Deforce?",
    questionEn: "Who were the founding ancestors of the Deforce family?",
    questionEs: "¿Quiénes fueron los ancestros fundadores de la familia Deforce?",
    questionVls: "Wie woaren de stamouders van de familie Deforce?",
    questionPcd: "Qui étoétent les anchiêtres fondateurs d'el famille Deforce?",
    questionDe: "Wer waren die Stammeltern der Familie Deforce?",
    options: [
      { nl: "Jean François & Francisca Vandewalle", fr: "Jean François & Francisca Vandewalle", en: "Jean François & Francisca Vandewalle", es: "Jean François & Francisca Vandewalle", vls: "Jean François & Francisca Vandewalle", pcd: "Jean François & Francisca Vandewalle", de: "Jean François & Francisca Vandewalle" },
      { nl: "Hubert Deleforge & Antoinette Follet", fr: "Hubert Deleforge & Antoinette Follet", en: "Hubert Deleforge & Antoinette Follet", es: "Hubert Deleforge & Antoinette Follet", vls: "Hubert Deleforge & Antoinette Follet", pcd: "Hubert Deleforge & Antoinette Follet", de: "Hubert Deleforge & Antoinette Follet" },
      { nl: "Charles Louis & Marie Leonie", fr: "Charles Louis & Marie Leonie", en: "Charles Louis & Marie Leonie", es: "Charles Louis & Marie Leonie", vls: "Charles Louis & Marie Leonie", pcd: "Charles Louis & Marie Leonie", de: "Charles Louis & Marie Leonie" },
      { nl: "Marcel & Magdalena Geldof", fr: "Marcel & Magdalena Geldof", en: "Marcel & Magdalena Geldof", es: "Marcel & Magdalena Geldof", vls: "Marcel & Magdalena Geldof", pcd: "Marcel & Magdalena Geldof", de: "Marcel & Magdalena Geldof" }
    ],
    correctAnswer: 1,
    explanationNl: "Hubert Deleforge en Antoinette Follet trouwden op 18 april 1685 te Lille en zijn de stamouders van de familie.",
    explanationFr: "Hubert Deleforge et Antoinette Follet se sont mariés le 18 avril 1685 à Lille et sont les ancêtres fondateurs de la famille.",
    explanationEn: "Hubert Deleforge and Antoinette Follet married on April 18, 1685 in Lille and are the founding ancestors of the family.",
    explanationEs: "Hubert Deleforge y Antoinette Follet se casaron el 18 de abril de 1685 en Lille y son los ancestros fundadores de la familia.",
    explanationVls: "Hubert Deleforge en Antoinette Follet trouwdn op 18 april 1685 te Rysel en zyn de stamouders van de familie.",
    explanationPcd: "Hubert Deleforge et Antoinette Follet s'ont marié l'18 avri 1685 à Lille et sont les anchiêtres fondateurs d'el famille.",
    explanationDe: "Hubert Deleforge und Antoinette Follet heirateten am 18. April 1685 in Lille und sind die Stammeltern der Familie."
  },
  {
    id: 2,
    questionNl: "In welk jaar migreerde Hubert Deleforge naar Izegem?",
    questionFr: "En quelle année Hubert Deleforge a-t-il migré vers Izegem?",
    questionEn: "In what year did Hubert Deleforge migrate to Izegem?",
    questionEs: "¿En qué año emigró Hubert Deleforge a Izegem?",
    questionVls: "In welk joar migreerde Hubert Deleforge noar Izegem?",
    questionPcd: "In quelle année Hubert Deleforge o-t-i migré vers Izegem?",
    questionDe: "In welchem Jahr wanderte Hubert Deleforge nach Izegem aus?",
    options: [
      { nl: "1685", fr: "1685", en: "1685", es: "1685", vls: "1685", pcd: "1685", de: "1685" },
      { nl: "1699", fr: "1699", en: "1699", es: "1699", vls: "1699", pcd: "1699", de: "1699" },
      { nl: "1718", fr: "1718", en: "1718", es: "1718", vls: "1718", pcd: "1718", de: "1718" },
      { nl: "1750", fr: "1750", en: "1750", es: "1750", vls: "1750", pcd: "1750", de: "1750" }
    ],
    correctAnswer: 1,
    explanationNl: "Hubert Deleforge migreerde rond 1699 van Hallennes naar Izegem, 50 km noordwaarts naar West-Vlaanderen.",
    explanationFr: "Hubert Deleforge a migré vers 1699 de Hallennes vers Izegem, 50 km au nord en Flandre Occidentale.",
    explanationEn: "Hubert Deleforge migrated around 1699 from Hallennes to Izegem, 50 km northward to West Flanders.",
    explanationEs: "Hubert Deleforge emigró alrededor de 1699 de Hallennes a Izegem, 50 km hacia el norte a Flandes Occidental.",
    explanationVls: "Hubert Deleforge migreerde rond 1699 van Hallennes noar Izegem, 50 km noordwoarts noar West-Vloanderen.",
    explanationPcd: "Hubert Deleforge o migré vers 1699 d'Hallennes vers Izegem, 50 km au nord in Flande Occidentale.",
    explanationDe: "Hubert Deleforge wanderte um 1699 von Hallennes nach Izegem aus, 50 km nördlich nach Westflandern."
  },
  {
    id: 3,
    questionNl: "Wat was het beroep van Antoinettes vader Jean Follet?",
    questionFr: "Quel était le métier du père d'Antoinette, Jean Follet?",
    questionEn: "What was the profession of Antoinette's father Jean Follet?",
    questionEs: "¿Cuál era la profesión del padre de Antoinette, Jean Follet?",
    questionVls: "Wat was t beroep van Antoinettes vader Jean Follet?",
    questionPcd: "Quoé étot l'métier du père d'Antoinette, Jean Follet?",
    questionDe: "Was war der Beruf von Antoinettes Vater Jean Follet?",
    options: [
      { nl: "Timmerman", fr: "Charpentier", en: "Carpenter", es: "Carpintero", vls: "Timmerman", pcd: "Carpintier", de: "Zimmermann" },
      { nl: "Smid", fr: "Forgeron", en: "Blacksmith", es: "Herrero", vls: "Smid", pcd: "Forgeron", de: "Schmied" },
      { nl: "Meester-chirurgijn", fr: "Maître-chirurgien", en: "Master surgeon", es: "Maestro cirujano", vls: "Meester-chirurgyn", pcd: "Maîte-chirurgien", de: "Meisterchirurg" },
      { nl: "Bakker", fr: "Boulanger", en: "Baker", es: "Panadero", vls: "Bakker", pcd: "Boulangier", de: "Bäcker" }
    ],
    correctAnswer: 2,
    explanationNl: "Jean Follet was meester-chirurgijn in Capinghem en genoot aanzien tot buiten het dorp.",
    explanationFr: "Jean Follet était maître-chirurgien à Capinghem et jouissait d'une renommée au-delà du village.",
    explanationEn: "Jean Follet was a master surgeon in Capinghem and enjoyed recognition beyond the village.",
    explanationEs: "Jean Follet era maestro cirujano en Capinghem y gozaba de reconocimiento más allá del pueblo.",
    explanationVls: "Jean Follet was meester-chirurgyn in Capinghem en genoot oanziên tot buutn t dorp.",
    explanationPcd: "Jean Follet étot maîte-chirurgien à Capinghem et jouissot d'eune renommée au-delà du villache.",
    explanationDe: "Jean Follet war Meisterchirurg in Capinghem und genoss Ansehen über das Dorf hinaus."
  },
  {
    id: 4,
    questionNl: "Wanneer werd Charles Louis Deforce geboren?",
    questionFr: "Quand Charles Louis Deforce est-il né?",
    questionEn: "When was Charles Louis Deforce born?",
    questionEs: "¿Cuándo nació Charles Louis Deforce?",
    questionVls: "Wanneer wierd Charles Louis Deforce geboarn?",
    questionPcd: "Quand Charles Louis Deforce est-i né?",
    questionDe: "Wann wurde Charles Louis Deforce geboren?",
    options: [
      { nl: "10 juni 1847", fr: "10 juin 1847", en: "June 10, 1847", es: "10 de junio de 1847", vls: "10 juni 1847", pcd: "10 jun 1847", de: "10. Juni 1847" },
      { nl: "10 juni 1857", fr: "10 juin 1857", en: "June 10, 1857", es: "10 de junio de 1857", vls: "10 juni 1857", pcd: "10 jun 1857", de: "10. Juni 1857" },
      { nl: "10 juni 1867", fr: "10 juin 1867", en: "June 10, 1867", es: "10 de junio de 1867", vls: "10 juni 1867", pcd: "10 jun 1867", de: "10. Juni 1867" },
      { nl: "10 juni 1877", fr: "10 juin 1877", en: "June 10, 1877", es: "10 de junio de 1877", vls: "10 juni 1877", pcd: "10 jun 1877", de: "10. Juni 1877" }
    ],
    correctAnswer: 1,
    explanationNl: "Charles Louis Deforce werd geboren op 10 juni 1857 te Emelgem als achtste en jongste kind van Jean François Deforche & Francisca Vandewalle.",
    explanationFr: "Charles Louis Deforce est né le 10 juin 1857 à Emelgem en tant que huitième et plus jeune enfant de Jean François Deforche & Francisca Vandewalle.",
    explanationEn: "Charles Louis Deforce was born on June 10, 1857 in Emelgem as the eighth and youngest child of Jean François Deforche & Francisca Vandewalle.",
    explanationEs: "Charles Louis Deforce nació el 10 de junio de 1857 en Emelgem como el octavo y más joven hijo de Jean François Deforche y Francisca Vandewalle.",
    explanationVls: "Charles Louis Deforce wierd geboarn op 10 juni 1857 te Emelgem ols achtste en jongste kind van Jean François Deforche & Francisca Vandewalle.",
    explanationPcd: "Charles Louis Deforce est né l'10 jun 1857 à Emelgem comme huitième et pus jeune éfant d'Jean François Deforche & Francisca Vandewalle.",
    explanationDe: "Charles Louis Deforce wurde am 10. Juni 1857 in Emelgem als achtes und jüngstes Kind von Jean François Deforche & Francisca Vandewalle geboren."
  },
  {
    id: 5,
    questionNl: "Hoeveel kinderen had Charles Louis Deforce met zijn eerste vrouw Marie Leonie?",
    questionFr: "Combien d'enfants Charles Louis Deforce a-t-il eu avec sa première femme Marie Leonie?",
    questionEn: "How many children did Charles Louis Deforce have with his first wife Marie Leonie?",
    questionEs: "¿Cuántos hijos tuvo Charles Louis Deforce con su primera esposa Marie Leonie?",
    questionVls: "Hoeveel kinders had Charles Louis Deforce mee zyn eerste vrouwe Marie Leonie?",
    questionPcd: "Combin d'éfants Charles Louis Deforce o-t-i eu avuc s'preumière femme Marie Leonie?",
    questionDe: "Wie viele Kinder hatte Charles Louis Deforce mit seiner ersten Frau Marie Leonie?",
    options: [
      { nl: "5 kinderen", fr: "5 enfants", en: "5 children", es: "5 hijos", vls: "5 kinders", pcd: "5 éfants", de: "5 Kinder" },
      { nl: "6 kinderen", fr: "6 enfants", en: "6 children", es: "6 hijos", vls: "6 kinders", pcd: "6 éfants", de: "6 Kinder" },
      { nl: "8 kinderen", fr: "8 enfants", en: "8 children", es: "8 hijos", vls: "8 kinders", pcd: "8 éfants", de: "8 Kinder" },
      { nl: "10 kinderen", fr: "10 enfants", en: "10 children", es: "10 hijos", vls: "10 kinders", pcd: "10 éfants", de: "10 Kinder" }
    ],
    correctAnswer: 2,
    explanationNl: "Charles Louis en Marie Leonie Vandenbroucke kregen samen 8 kinderen, waarvan slechts 3 in leven bleven.",
    explanationFr: "Charles Louis et Marie Leonie Vandenbroucke eurent ensemble 8 enfants, dont seulement 3 survécurent.",
    explanationEn: "Charles Louis and Marie Leonie Vandenbroucke had 8 children together, of which only 3 survived.",
    explanationEs: "Charles Louis y Marie Leonie Vandenbroucke tuvieron 8 hijos juntos, de los cuales solo 3 sobrevivieron.",
    explanationVls: "Charles Louis en Marie Leonie Vandenbroucke kreegn soamn 8 kinders, woarvan mor 3 in leevn bleevn.",
    explanationPcd: "Charles Louis et Marie Leonie Vandenbroucke eurent insambe 8 éfants, dont seulmint 3 survécurent.",
    explanationDe: "Charles Louis und Marie Leonie Vandenbroucke hatten zusammen 8 Kinder, von denen nur 3 überlebten."
  },
  {
    id: 6,
    questionNl: "Welk beroep had Charles Louis tijdens zijn legerdienst (1877-1880)?",
    questionFr: "Quel métier Charles Louis exerçait-il pendant son service militaire (1877-1880)?",
    questionEn: "What profession did Charles Louis have during his military service (1877-1880)?",
    questionEs: "¿Qué profesión tenía Charles Louis durante su servicio militar (1877-1880)?",
    questionVls: "Welk beroep had Charles Louis tydns zyn légerdiênst (1877-1880)?",
    questionPcd: "Quoé métier Charles Louis exerçot-i pendant s'service militaire (1877-1880)?",
    questionDe: "Welchen Beruf hatte Charles Louis während seines Militärdienstes (1877-1880)?",
    options: [
      { nl: "Infanterist", fr: "Fantassin", en: "Infantryman", es: "Infante", vls: "Infanterist", pcd: "Fantassin", de: "Infanterist" },
      { nl: "Mineur (loopgravengraver)", fr: "Mineur (creuseur de tranchées)", en: "Miner (trench digger)", es: "Minero (excavador de trincheras)", vls: "Mineur (lôopgraavengraver)", pcd: "Mineur (creuseux d'tranchées)", de: "Mineur (Schützengräber)" },
      { nl: "Cavalerie", fr: "Cavalerie", en: "Cavalry", es: "Caballería", vls: "Cavalerie", pcd: "Cavalerie", de: "Kavallerie" },
      { nl: "Artillerist", fr: "Artilleur", en: "Artilleryman", es: "Artillero", vls: "Artillerist", pcd: "Artilleur", de: "Artillerist" }
    ],
    correctAnswer: 1,
    explanationNl: "Charles Louis diende als 'mineur de 1e classe' bij het regiment van de genie, gespecialiseerd in het graven van loopgraven.",
    explanationFr: "Charles Louis servit comme 'mineur de 1re classe' au régiment du génie, spécialisé dans le creusement de tranchées.",
    explanationEn: "Charles Louis served as 'first class miner' in the engineering regiment, specialized in digging trenches.",
    explanationEs: "Charles Louis sirvió como 'minero de primera clase' en el regimiento de ingeniería, especializado en excavar trincheras.",
    explanationVls: "Charles Louis diênde ols 'mineur de 1e classe' by t regiment van de genie, gespecialiseerd in t graven van lôopgraavn.",
    explanationPcd: "Charles Louis servit comme 'mineur d'1re classe' au régimint du génie, spécialisé dins l'creusmint d'tranchées.",
    explanationDe: "Charles Louis diente als 'Mineur 1. Klasse' beim Pionierregiment, spezialisiert auf das Graben von Schützengräben."
  },
  {
    id: 7,
    questionNl: "Hoeveel keer is Charles Louis Deforce getrouwd?",
    questionFr: "Combien de fois Charles Louis Deforce s'est-il marié?",
    questionEn: "How many times did Charles Louis Deforce marry?",
    questionEs: "¿Cuántas veces se casó Charles Louis Deforce?",
    questionVls: "Hoeveel kee is Charles Louis Deforce getrouwd?",
    questionPcd: "Combin d'foes Charles Louis Deforce s'est-i marié?",
    questionDe: "Wie oft hat Charles Louis Deforce geheiratet?",
    options: [
      { nl: "1 keer", fr: "1 fois", en: "1 time", es: "1 vez", vls: "1 kee", pcd: "1 foe", de: "1 Mal" },
      { nl: "2 keer", fr: "2 fois", en: "2 times", es: "2 veces", vls: "2 kee", pcd: "2 foes", de: "2 Mal" },
      { nl: "3 keer", fr: "3 fois", en: "3 times", es: "3 veces", vls: "3 kee", pcd: "3 foes", de: "3 Mal" },
      { nl: "4 keer", fr: "4 fois", en: "4 times", es: "4 veces", vls: "4 kee", pcd: "4 foes", de: "4 Mal" }
    ],
    correctAnswer: 2,
    explanationNl: "Charles Louis trouwde 3 keer: met Marie Leonie Vandenbroucke (1884), Leonie Plancke (1898) en Silvia Maria Van Coillie (1918).",
    explanationFr: "Charles Louis s'est marié 3 fois : avec Marie Leonie Vandenbroucke (1884), Leonie Plancke (1898) et Silvia Maria Van Coillie (1918).",
    explanationEn: "Charles Louis married 3 times: to Marie Leonie Vandenbroucke (1884), Leonie Plancke (1898) and Silvia Maria Van Coillie (1918).",
    explanationEs: "Charles Louis se casó 3 veces: con Marie Leonie Vandenbroucke (1884), Leonie Plancke (1898) y Silvia Maria Van Coillie (1918).",
    explanationVls: "Charles Louis trouwde 3 kee: mee Marie Leonie Vandenbroucke (1884), Leonie Plancke (1898) en Silvia Maria Van Coillie (1918).",
    explanationPcd: "Charles Louis s'est marié 3 foes : avuc Marie Leonie Vandenbroucke (1884), Leonie Plancke (1898) et Silvia Maria Van Coillie (1918).",
    explanationDe: "Charles Louis heiratete 3 Mal: Marie Leonie Vandenbroucke (1884), Leonie Plancke (1898) und Silvia Maria Van Coillie (1918)."
  },
  {
    id: 8,
    questionNl: "Wie was de grootvader van de auteur van deze website?",
    questionFr: "Qui était le grand-père de l'auteur de ce site?",
    questionEn: "Who was the grandfather of the author of this website?",
    questionEs: "¿Quién era el abuelo del autor de este sitio web?",
    questionVls: "Wie was de grôotvader van de auteur van deze website?",
    questionPcd: "Qui étot l'grand-père d'l'auteur d'chest site?",
    questionDe: "Wer war der Großvater des Autors dieser Website?",
    options: [
      { nl: "Charles Louis Deforce", fr: "Charles Louis Deforce", en: "Charles Louis Deforce", es: "Charles Louis Deforce", vls: "Charles Louis Deforce", pcd: "Charles Louis Deforce", de: "Charles Louis Deforce" },
      { nl: "Jean François Cyrille", fr: "Jean François Cyrille", en: "Jean François Cyrille", es: "Jean François Cyrille", vls: "Jean François Cyrille", pcd: "Jean François Cyrille", de: "Jean François Cyrille" },
      { nl: "Marcel Deforce", fr: "Marcel Deforce", en: "Marcel Deforce", es: "Marcel Deforce", vls: "Marcel Deforce", pcd: "Marcel Deforce", de: "Marcel Deforce" },
      { nl: "Alberic Camiel", fr: "Alberic Camiel", en: "Alberic Camiel", es: "Alberic Camiel", vls: "Alberic Camiel", pcd: "Alberic Camiel", de: "Alberic Camiel" }
    ],
    correctAnswer: 2,
    explanationNl: "Marcel Deforce (1894-1963) was de grootvader van de auteur en een van de drie overlevende kinderen van Charles Louis.",
    explanationFr: "Marcel Deforce (1894-1963) était le grand-père de l'auteur et l'un des trois enfants survivants de Charles Louis.",
    explanationEn: "Marcel Deforce (1894-1963) was the grandfather of the author and one of the three surviving children of Charles Louis.",
    explanationEs: "Marcel Deforce (1894-1963) era el abuelo del autor y uno de los tres hijos sobrevivientes de Charles Louis.",
    explanationVls: "Marcel Deforce (1894-1963) was de grôotvader van de auteur en een van de drie overleevende kinders van Charles Louis.",
    explanationPcd: "Marcel Deforce (1894-1963) étot l'grand-père d'l'auteur et un des troés éfants survivants d'Charles Louis.",
    explanationDe: "Marcel Deforce (1894-1963) war der Großvater des Autors und eines der drei überlebenden Kinder von Charles Louis."
  },
  {
    id: 9,
    questionNl: "Wat betekent de oorspronkelijke familienaam 'Deleforge'?",
    questionFr: "Que signifie le nom de famille original 'Deleforge'?",
    questionEn: "What does the original family name 'Deleforge' mean?",
    questionEs: "¿Qué significa el apellido original 'Deleforge'?",
    questionVls: "Wat betekent de oorspronkelike familienoame 'Deleforge'?",
    questionPcd: "Quoé signifie l'nom d'famille original 'Deleforge'?",
    questionDe: "Was bedeutet der ursprüngliche Familienname 'Deleforge'?",
    options: [
      { nl: "Van het bos", fr: "De la forêt", en: "From the forest", es: "Del bosque", vls: "Van t bos", pcd: "Du bos", de: "Vom Wald" },
      { nl: "Van de smidse", fr: "De la forge", en: "From the forge", es: "De la fragua", vls: "Van de smidse", pcd: "D'el forge", de: "Von der Schmiede" },
      { nl: "Van de berg", fr: "De la montagne", en: "From the mountain", es: "De la montaña", vls: "Van de berg", pcd: "D'el montagne", de: "Vom Berg" },
      { nl: "Van de rivier", fr: "De la rivière", en: "From the river", es: "Del río", vls: "Van de rivier", pcd: "D'el rivière", de: "Vom Fluss" }
    ],
    correctAnswer: 1,
    explanationNl: "'Deleforge' is de Picardische vorm van 'De la Forge' wat 'van de smidse' betekent, vergelijkbaar met 'Vandersmissen' in het Nederlands.",
    explanationFr: "'Deleforge' est la forme picarde de 'De la Forge', comparable à 'Vandersmissen' en néerlandais.",
    explanationEn: "'Deleforge' is the Picard form of 'De la Forge' meaning 'from the forge', comparable to 'Vandersmissen' in Dutch.",
    explanationEs: "'Deleforge' es la forma picarda de 'De la Forge' que significa 'de la fragua', comparable a 'Vandersmissen' en neerlandés.",
    explanationVls: "'Deleforge' is de Pikoardische vorm van 'De la Forge' wat 'van de smidse' betekent, vergelykbaar mee 'Vandersmissen' in t Nederlands.",
    explanationPcd: "'Deleforge' est el forme picarde éd 'De la Forge' qu'signifie 'd'el forge', comparable à 'Vandersmissen' in néerlandais.",
    explanationDe: "'Deleforge' ist die pikardische Form von 'De la Forge', was 'von der Schmiede' bedeutet, vergleichbar mit 'Vandersmissen' im Niederländischen."
  },
  {
    id: 10,
    questionNl: "In hoeveel verschillende schrijfwijzen kwam de familienaam voor?",
    questionFr: "En combien d'orthographes différentes le nom de famille apparaissait-il?",
    questionEn: "In how many different spellings did the family name appear?",
    questionEs: "¿En cuántas ortografías diferentes apareció el apellido?",
    questionVls: "In hoeveel verschillende schryfwyzn kwam de familienoame vôor?",
    questionPcd: "In combin d'ortografes différintes l'nom d'famille apparaissot-i?",
    questionDe: "In wie vielen verschiedenen Schreibweisen kam der Familienname vor?",
    options: [
      { nl: "10 varianten", fr: "10 variantes", en: "10 variants", es: "10 variantes", vls: "10 varianten", pcd: "10 variantes", de: "10 Varianten" },
      { nl: "15 varianten", fr: "15 variantes", en: "15 variants", es: "15 variantes", vls: "15 varianten", pcd: "15 variantes", de: "15 Varianten" },
      { nl: "21 varianten", fr: "21 variantes", en: "21 variants", es: "21 variantes", vls: "21 varianten", pcd: "21 variantes", de: "21 Varianten" },
      { nl: "30 varianten", fr: "30 variantes", en: "30 variants", es: "30 variantes", vls: "30 varianten", pcd: "30 variantes", de: "30 Varianten" }
    ],
    correctAnswer: 2,
    explanationNl: "De familienaam kwam in maar liefst 21 verschillende schrijfwijzen voor, zoals Deforce, Deforche, Deleforge, Delforce, etc.",
    explanationFr: "Le nom de famille apparaissait dans pas moins de 21 orthographes différentes, comme Deforce, Deforche, Deleforge, Delforce, etc.",
    explanationEn: "The family name appeared in no less than 21 different spellings, such as Deforce, Deforche, Deleforge, Delforce, etc.",
    explanationEs: "El apellido apareció en nada menos que 21 ortografías diferentes, como Deforce, Deforche, Deleforge, Delforce, etc.",
    explanationVls: "De familienoame kwam in mor liefst 21 verschillende schryfwyzn vôor, gelyk Deforce, Deforche, Deleforge, Delforce, enz.",
    explanationPcd: "L'nom d'famille apparaissot dins pas moins d'21 ortografes différintes, comme Deforce, Deforche, Deleforge, Delforce, etc.",
    explanationDe: "Der Familienname kam in nicht weniger als 21 verschiedenen Schreibweisen vor, wie Deforce, Deforche, Deleforge, Delforce, usw."
  },
  {
    id: 11,
    questionNl: "Wat was een 'boquillon' in het oude Frans?",
    questionFr: "Qu'était un 'boquillon' en ancien français?",
    questionEn: "What was a 'boquillon' in old French?",
    questionEs: "¿Qué era un 'boquillon' en francés antiguo?",
    questionVls: "Wat was e 'boquillon' in t oud Frans?",
    questionPcd: "Qu'étot un 'boquillon' in ancien français?",
    questionDe: "Was war ein 'boquillon' im alten Französisch?",
    options: [
      { nl: "Een bakker", fr: "Un boulanger", en: "A baker", es: "Un panadero", vls: "E bakker", pcd: "Un boulangier", de: "Ein Bäcker" },
      { nl: "Een houtarbeider/houthakker", fr: "Un travailleur du bois/bûcheron", en: "A woodworker/lumberjack", es: "Un trabajador de la madera/leñador", vls: "E houtarbeider/houthakker", pcd: "Un ouvrier du bos/boquillon", de: "Ein Holzarbeiter/Holzfäller" },
      { nl: "Een soldaat", fr: "Un soldat", en: "A soldier", es: "Un soldado", vls: "E soldoat", pcd: "Un soldat", de: "Ein Soldat" },
      { nl: "Een visser", fr: "Un pêcheur", en: "A fisherman", es: "Un pescador", vls: "E visser", pcd: "Un péqueur", de: "Ein Fischer" }
    ],
    correctAnswer: 1,
    explanationNl: "Een boquillon was een houtarbeider die bomen velde, hout kloofde en soms als houtsnijder werkte. Het woord komt van 'bosc' (bos).",
    explanationFr: "Un boquillon était un travailleur du bois qui abattait les arbres, fendait le bois et travaillait parfois comme sculpteur. Le mot vient de 'bosc' (bois).",
    explanationEn: "A boquillon was a woodworker who felled trees, split wood and sometimes worked as a carver. The word comes from 'bosc' (forest).",
    explanationEs: "Un boquillon era un trabajador de la madera que talaba árboles, partía leña y a veces trabajaba como tallador. La palabra proviene de 'bosc' (bosque).",
    explanationVls: "E boquillon was e houtarbeider die bôomn velde, hout kloofde en soms ols houtsnyder werkte. T woord komt van 'bosc' (bos).",
    explanationPcd: "Un boquillon étot un ouvrier du bos qui abattot les arbres, fendot l'bos et ouvrot parfoes comme sculpteur. L'mot vient d'\"bosc\" (bos).",
    explanationDe: "Ein Boquillon war ein Holzarbeiter, der Bäume fällte, Holz spaltete und manchmal als Holzschnitzer arbeitete. Das Wort kommt von 'bosc' (Wald)."
  },
  {
    id: 12,
    questionNl: "Welke oorlog woedde toen Hubert Deleforge besloot te migreren?",
    questionFr: "Quelle guerre faisait rage quand Hubert Deleforge décida de migrer?",
    questionEn: "Which war was raging when Hubert Deleforge decided to migrate?",
    questionEs: "¿Qué guerra estaba en curso cuando Hubert Deleforge decidió emigrar?",
    questionVls: "Welke oorlog woedde toen Hubert Deleforge besloot te migreern?",
    questionPcd: "Quelle guère faisot rage quand Hubert Deleforge décida d'migrer?",
    questionDe: "Welcher Krieg wütete, als Hubert Deleforge beschloss auszuwandern?",
    options: [
      { nl: "De Tachtigjarige Oorlog", fr: "La Guerre de Quatre-Vingts Ans", en: "The Eighty Years' War", es: "La Guerra de los Ochenta Años", vls: "De Tachtigjoarige Oorlog", pcd: "El Guère d'Quate-Vingts Ans", de: "Der Achtzigjährige Krieg" },
      { nl: "De Negenjarige Oorlog", fr: "La Guerre de Neuf Ans", en: "The Nine Years' War", es: "La Guerra de los Nueve Años", vls: "De Neegnjoarige Oorlog", pcd: "El Guère d'Neuf Ans", de: "Der Neunjährige Krieg" },
      { nl: "De Dertigjarige Oorlog", fr: "La Guerre de Trente Ans", en: "The Thirty Years' War", es: "La Guerra de los Treinta Años", vls: "De Dertigjoarige Oorlog", pcd: "El Guère d'Trinte Ans", de: "Der Dreißigjährige Krieg" },
      { nl: "De Napoleontische Oorlogen", fr: "Les Guerres napoléoniennes", en: "The Napoleonic Wars", es: "Las Guerras Napoleónicas", vls: "De Napoleontische Oorlogn", pcd: "Les Guères napoléoniennes", de: "Die Napoleonischen Kriege" }
    ],
    correctAnswer: 1,
    explanationNl: "De Negenjarige Oorlog (1688-1697) verwoestte hele dorpen rond Rijsel en was een belangrijke reden voor Huberts migratie.",
    explanationFr: "La Guerre de Neuf Ans (1688-1697) dévasta des villages entiers autour de Lille et fut une raison importante de la migration de Hubert.",
    explanationEn: "The Nine Years' War (1688-1697) devastated entire villages around Lille and was an important reason for Hubert's migration.",
    explanationEs: "La Guerra de los Nueve Años (1688-1697) devastó pueblos enteros alrededor de Lille y fue una razón importante para la migración de Hubert.",
    explanationVls: "De Neegnjoarige Oorlog (1688-1697) verwoestte hele dorpn rond Rysel en was e belangryke redn vôo Huberts migroasje.",
    explanationPcd: "El Guère d'Neuf Ans (1688-1697) dévasta des villaches intiers alintour d'Lille et fut eune raison importante d'el migrateon d'Hubert.",
    explanationDe: "Der Neunjährige Krieg (1688-1697) verwüstete ganze Dörfer rund um Lille und war ein wichtiger Grund für Huberts Auswanderung."
  },
  {
    id: 13,
    questionNl: "Wie was Jacobus Franciscus Deleforge?",
    questionFr: "Qui était Jacobus Franciscus Deleforge?",
    questionEn: "Who was Jacobus Franciscus Deleforge?",
    questionEs: "¿Quién era Jacobus Franciscus Deleforge?",
    questionVls: "Wie was Jacobus Franciscus Deleforge?",
    questionPcd: "Qui étot Jacobus Franciscus Deleforge?",
    questionDe: "Wer war Jacobus Franciscus Deleforge?",
    options: [
      { nl: "De stamvader", fr: "L'ancêtre fondateur", en: "The founding ancestor", es: "El ancestro fundador", vls: "De stamvader", pcd: "L'anchiêtre fondateur", de: "Der Stammvater" },
      { nl: "De rechtstreekse voorvader (2e generatie)", fr: "L'ancêtre direct (2e génération)", en: "The direct ancestor (2nd generation)", es: "El ancestro directo (2ª generación)", vls: "De rechtstreekse vôorvader (2e generoasje)", pcd: "L'anchiêtre direct (2e générateon)", de: "Der direkte Vorfahre (2. Generation)" },
      { nl: "De overgrootvader", fr: "L'arrière-grand-père", en: "The great-grandfather", es: "El bisabuelo", vls: "De overgrôotvader", pcd: "L'arrière-grand-père", de: "Der Urgroßvater" },
      { nl: "De auteur van de website", fr: "L'auteur du site", en: "The author of the website", es: "El autor del sitio web", vls: "De auteur van de website", pcd: "L'auteur du site", de: "Der Autor der Website" }
    ],
    correctAnswer: 1,
    explanationNl: "Jacobus Franciscus Deleforge (1694-1772) was onze rechtstreekse voorvader uit de 2e generatie, die in 1718 trouwde met Veronica Barbier.",
    explanationFr: "Jacobus Franciscus Deleforge (1694-1772) était notre ancêtre direct de la 2e génération, qui épousa Veronica Barbier en 1718.",
    explanationEn: "Jacobus Franciscus Deleforge (1694-1772) was our direct ancestor from the 2nd generation, who married Veronica Barbier in 1718.",
    explanationEs: "Jacobus Franciscus Deleforge (1694-1772) era nuestro ancestro directo de la 2ª generación, que se casó con Veronica Barbier en 1718.",
    explanationVls: "Jacobus Franciscus Deleforge (1694-1772) was uuze rechtstreekse vôorvader uut de 2e generoasje, die in 1718 trouwde mee Veronica Barbier.",
    explanationPcd: "Jacobus Franciscus Deleforge (1694-1772) étot note anchiêtre direct d'el 2e générateon, qui s'maria avuc Veronica Barbier in 1718.",
    explanationDe: "Jacobus Franciscus Deleforge (1694-1772) war unser direkter Vorfahre aus der 2. Generation, der 1718 Veronica Barbier heiratete."
  },
  {
    id: 14,
    questionNl: "Hoeveel afstammelingen waren er op de familiereünie van 2024?",
    questionFr: "Combien de descendants étaient présents à la réunion de famille de 2024?",
    questionEn: "How many descendants were at the 2024 family reunion?",
    questionEs: "¿Cuántos descendientes había en la reunión familiar de 2024?",
    questionVls: "Hoeveel ofstammelingn woaren der op de familiereünie van 2024?",
    questionPcd: "Combin d'descendants étoétent présints à l'réunion d'famille d'2024?",
    questionDe: "Wie viele Nachkommen waren beim Familientreffen 2024 anwesend?",
    options: [
      { nl: "75 afstammelingen", fr: "75 descendants", en: "75 descendants", es: "75 descendientes", vls: "75 ofstammelingn", pcd: "75 descendants", de: "75 Nachkommen" },
      { nl: "95 afstammelingen", fr: "95 descendants", en: "95 descendants", es: "95 descendientes", vls: "95 ofstammelingn", pcd: "95 descendants", de: "95 Nachkommen" },
      { nl: "112 afstammelingen", fr: "112 descendants", en: "112 descendants", es: "112 descendientes", vls: "112 ofstammelingn", pcd: "112 descendants", de: "112 Nachkommen" },
      { nl: "150 afstammelingen", fr: "150 descendants", en: "150 descendants", es: "150 descendientes", vls: "150 ofstammelingn", pcd: "150 descendants", de: "150 Nachkommen" }
    ],
    correctAnswer: 2,
    explanationNl: "De familiereünie op 29 september 2024 in Het Prullenbos te Laarne bracht 112 afstammelingen samen.",
    explanationFr: "La réunion de famille du 29 septembre 2024 au Prullenbos à Laarne a réuni 112 descendants.",
    explanationEn: "The family reunion on September 29, 2024 at Het Prullenbos in Laarne brought together 112 descendants.",
    explanationEs: "La reunión familiar del 29 de septiembre de 2024 en Het Prullenbos en Laarne reunió a 112 descendientes.",
    explanationVls: "De familiereünie op 29 september 2024 in Het Prullenbos te Laarne bracht 112 ofstammelingn soamn.",
    explanationPcd: "El réunion d'famille du 29 septimbe 2024 au Prullenbos à Laarne o réuni 112 descendants.",
    explanationDe: "Das Familientreffen am 29. September 2024 im Prullenbos in Laarne brachte 112 Nachkommen zusammen."
  },
  {
    id: 15,
    questionNl: "In welk jaar overleed Charles Louis Deforce?",
    questionFr: "En quelle année Charles Louis Deforce est-il décédé?",
    questionEn: "In what year did Charles Louis Deforce die?",
    questionEs: "¿En qué año murió Charles Louis Deforce?",
    questionVls: "In welk joar overleed Charles Louis Deforce?",
    questionPcd: "In quelle année Charles Louis Deforce est-i décédé?",
    questionDe: "In welchem Jahr starb Charles Louis Deforce?",
    options: [
      { nl: "1928", fr: "1928", en: "1928", es: "1928", vls: "1928", pcd: "1928", de: "1928" },
      { nl: "1933", fr: "1933", en: "1933", es: "1933", vls: "1933", pcd: "1933", de: "1933" },
      { nl: "1938", fr: "1938", en: "1938", es: "1938", vls: "1938", pcd: "1938", de: "1938" },
      { nl: "1943", fr: "1943", en: "1943", es: "1943", vls: "1943", pcd: "1943", de: "1943" }
    ],
    correctAnswer: 2,
    explanationNl: "Charles Louis Deforce overleed op 6 maart 1938, na een leven van 80 jaar.",
    explanationFr: "Charles Louis Deforce est décédé le 6 mars 1938, après une vie de 80 ans.",
    explanationEn: "Charles Louis Deforce died on March 6, 1938, after a life of 80 years.",
    explanationEs: "Charles Louis Deforce murió el 6 de marzo de 1938, después de una vida de 80 años.",
    explanationVls: "Charles Louis Deforce overleed op 6 maart 1938, no e leevn van 80 joar.",
    explanationPcd: "Charles Louis Deforce est décédé l'6 mars 1938, après eune vie d'80 ans.",
    explanationDe: "Charles Louis Deforce starb am 6. März 1938, nach einem Leben von 80 Jahren."
  },
  {
    id: 16,
    questionNl: "Welke gebeurtenis vond plaats in 1685, het jaar van het huwelijk van de stamouders?",
    questionFr: "Quel événement eut lieu en 1685, l'année du mariage des ancêtres fondateurs?",
    questionEn: "What event took place in 1685, the year of the founding ancestors' marriage?",
    questionEs: "¿Qué evento tuvo lugar en 1685, el año del matrimonio de los ancestros fundadores?",
    questionVls: "Welke gebeurtenisse vond ploatse in 1685, t joar van t huweliek van de stamouders?",
    questionPcd: "Quoé événemint eut lieu in 1685, l'année du mariache des anchiêtres fondateurs?",
    questionDe: "Welches Ereignis fand 1685 statt, im Jahr der Hochzeit der Stammeltern?",
    options: [
      { nl: "De Devolutieoorlog", fr: "La Guerre de Dévolution", en: "The War of Devolution", es: "La Guerra de Devolución", vls: "De Devolutieoorlog", pcd: "El Guère d'Dévoluteon", de: "Der Devolutionskrieg" },
      { nl: "De herroeping van het Edict van Nantes", fr: "La révocation de l'Édit de Nantes", en: "The revocation of the Edict of Nantes", es: "La revocación del Edicto de Nantes", vls: "De herroeping van t Edict van Nantes", pcd: "El révocateon d'l'Édit d'Nantes", de: "Die Aufhebung des Edikts von Nantes" },
      { nl: "De Hollandse Oorlog", fr: "La Guerre de Hollande", en: "The Franco-Dutch War", es: "La Guerra Franco-Holandesa", vls: "De Hollandse Oorlog", pcd: "El Guère d'Hollande", de: "Der Holländische Krieg" },
      { nl: "De Spaanse Successieoorlog", fr: "La Guerre de Succession d'Espagne", en: "The War of Spanish Succession", es: "La Guerra de Sucesión Española", vls: "De Spaanse Successieoorlog", pcd: "El Guère d'Successeon d'Espagne", de: "Der Spanische Erbfolgekrieg" }
    ],
    correctAnswer: 1,
    explanationNl: "In 1685 herriep Lodewijk XIV het Edict van Nantes, wat het einde betekende van de religieuze tolerantie voor protestanten.",
    explanationFr: "En 1685, Louis XIV révoqua l'Édit de Nantes, ce qui signifiait la fin de la tolérance religieuse pour les protestants.",
    explanationEn: "In 1685, Louis XIV revoked the Edict of Nantes, which meant the end of religious tolerance for Protestants.",
    explanationEs: "En 1685, Luis XIV revocó el Edicto de Nantes, lo que significó el fin de la tolerancia religiosa para los protestantes.",
    explanationVls: "In 1685 herriep Lodewyk XIV t Edict van Nantes, wat t einde betekende van de religieuze tolerantie vôo protestanten.",
    explanationPcd: "In 1685, Louis XIV révoqua l'Édit d'Nantes, ch'qui signifiot l'fin d'el tolérance religieuse pour les protestants.",
    explanationDe: "1685 widerrief Ludwig XIV. das Edikt von Nantes, was das Ende der religiösen Toleranz für Protestanten bedeutete."
  },
  {
    id: 17,
    questionNl: "Wie was de oudste bekende voorvader van de familie?",
    questionFr: "Qui était le plus ancien ancêtre connu de la famille?",
    questionEn: "Who was the oldest known ancestor of the family?",
    questionEs: "¿Quién era el ancestro conocido más antiguo de la familia?",
    questionVls: "Wie was de oudste bekende vôorvader van de familie?",
    questionPcd: "Qui étot l'pus ancien anchiêtre connu d'el famille?",
    questionDe: "Wer war der älteste bekannte Vorfahre der Familie?",
    options: [
      { nl: "Hubert Deleforge", fr: "Hubert Deleforge", en: "Hubert Deleforge", es: "Hubert Deleforge", vls: "Hubert Deleforge", pcd: "Hubert Deleforge", de: "Hubert Deleforge" },
      { nl: "Bauduin Deleforge", fr: "Bauduin Deleforge", en: "Bauduin Deleforge", es: "Bauduin Deleforge", vls: "Bauduin Deleforge", pcd: "Bauduin Deleforge", de: "Bauduin Deleforge" },
      { nl: "Jacobus Franciscus", fr: "Jacobus Franciscus", en: "Jacobus Franciscus", es: "Jacobus Franciscus", vls: "Jacobus Franciscus", pcd: "Jacobus Franciscus", de: "Jacobus Franciscus" },
      { nl: "Hypolite Deleforge", fr: "Hypolite Deleforge", en: "Hypolite Deleforge", es: "Hypolite Deleforge", vls: "Hypolite Deleforge", pcd: "Hypolite Deleforge", de: "Hypolite Deleforge" }
    ],
    correctAnswer: 1,
    explanationNl: "Bauduin Deleforge, geboren rond 1550 en overleden in 1613 in Halluin, is de oudste bekende voorvader.",
    explanationFr: "Bauduin Deleforge, né vers 1550 et décédé en 1613 à Halluin, est le plus ancien ancêtre connu.",
    explanationEn: "Bauduin Deleforge, born around 1550 and died in 1613 in Halluin, is the oldest known ancestor.",
    explanationEs: "Bauduin Deleforge, nacido alrededor de 1550 y fallecido en 1613 en Halluin, es el ancestro conocido más antiguo.",
    explanationVls: "Bauduin Deleforge, geboarn rond 1550 en overledn in 1613 in Halluin, is de oudste bekende vôorvader.",
    explanationPcd: "Bauduin Deleforge, né vers 1550 et décédé in 1613 à Halluin, est l'pus ancien anchiêtre connu.",
    explanationDe: "Bauduin Deleforge, geboren um 1550 und gestorben 1613 in Halluin, ist der älteste bekannte Vorfahre."
  },
  {
    id: 18,
    questionNl: "Wat was de waarde van de bruidsschat bij het huwelijk van 1685?",
    questionFr: "Quelle était la valeur de la dot au mariage de 1685?",
    questionEn: "What was the value of the dowry at the 1685 marriage?",
    questionEs: "¿Cuál era el valor de la dote en el matrimonio de 1685?",
    questionVls: "Wat was de weerde van de bruudsschat by t huweliek van 1685?",
    questionPcd: "Quelle étot l'valeur d'el dot au mariache d'1685?",
    questionDe: "Was war der Wert der Mitgift bei der Hochzeit von 1685?",
    options: [
      { nl: "400 pond parisis", fr: "400 livres parisis", en: "400 pounds parisis", es: "400 libras parisis", vls: "400 pond parisis", pcd: "400 livres parisis", de: "400 Pfund Parisis" },
      { nl: "600 pond parisis", fr: "600 livres parisis", en: "600 pounds parisis", es: "600 libras parisis", vls: "600 pond parisis", pcd: "600 livres parisis", de: "600 Pfund Parisis" },
      { nl: "800 pond parisis", fr: "800 livres parisis", en: "800 pounds parisis", es: "800 libras parisis", vls: "800 pond parisis", pcd: "800 livres parisis", de: "800 Pfund Parisis" },
      { nl: "1000 pond parisis", fr: "1000 livres parisis", en: "1000 pounds parisis", es: "1000 libras parisis", vls: "1000 pond parisis", pcd: "1000 livres parisis", de: "1000 Pfund Parisis" }
    ],
    correctAnswer: 2,
    explanationNl: "De totale waarde van de bruidsschat was 800 pond parisis, wat overeenkwam met 2-3 jaarlonen van een goed verdienende ambachtsman.",
    explanationFr: "La valeur totale de la dot était de 800 livres parisis, ce qui correspondait à 2-3 années de salaire d'un artisan bien rémunéré.",
    explanationEn: "The total value of the dowry was 800 pounds parisis, which corresponded to 2-3 annual wages of a well-paid craftsman.",
    explanationEs: "El valor total de la dote era de 800 libras parisis, lo que correspondía a 2-3 años de salario de un artesano bien remunerado.",
    explanationVls: "De totale weerde van de bruudsschat was 800 pond parisis, wat overeen kwam mee 2-3 joarlôonn van e goed verdienende ambachtsman.",
    explanationPcd: "El valeur totale d'el dot étot d'800 livres parisis, ch'qui correspondot à 2-3 années d'salaire d'un artisan bien rémunéré.",
    explanationDe: "Der Gesamtwert der Mitgift betrug 800 Pfund Parisis, was 2-3 Jahreslöhnen eines gut verdienenden Handwerkers entsprach."
  },
  {
    id: 19,
    questionNl: "Hoe werd Charles Louis in het dagelijks leven genoemd in Izegem?",
    questionFr: "Comment Charles Louis était-il appelé dans la vie quotidienne à Izegem?",
    questionEn: "How was Charles Louis called in daily life in Izegem?",
    questionEs: "¿Cómo llamaban a Charles Louis en la vida cotidiana en Izegem?",
    questionVls: "Hoe wierd Charles Louis in t dagelieks leevn genoemd in Izegem?",
    questionPcd: "Commint Charles Louis étot-i appelé dins l'vie d'tos les jours à Izegem?",
    questionDe: "Wie wurde Charles Louis im täglichen Leben in Izegem genannt?",
    options: [
      { nl: "Karel", fr: "Karel", en: "Karel", es: "Karel", vls: "Karel", pcd: "Karel", de: "Karel" },
      { nl: "Charlewie", fr: "Charlewie", en: "Charlewie", es: "Charlewie", vls: "Charlewie", pcd: "Charlewie", de: "Charlewie" },
      { nl: "Louis", fr: "Louis", en: "Louis", es: "Louis", vls: "Louis", pcd: "Louis", de: "Louis" },
      { nl: "Carolus", fr: "Carolus", en: "Carolus", es: "Carolus", vls: "Carolus", pcd: "Carolus", de: "Carolus" }
    ],
    correctAnswer: 1,
    explanationNl: "In Izegem werd Charles-Louis meestal gemeenzaam uitgesproken als 'Charlewie'.",
    explanationFr: "À Izegem, Charles-Louis était généralement appelé familièrement 'Charlewie'.",
    explanationEn: "In Izegem, Charles-Louis was usually called colloquially 'Charlewie'.",
    explanationEs: "En Izegem, Charles-Louis era llamado coloquialmente 'Charlewie'.",
    explanationVls: "In Izegem wierd Charles-Louis meestol gemeenzoam uutgesprôokn ols 'Charlewie'.",
    explanationPcd: "À Izegem, Charles-Louis étot généralmint appelé familièremint 'Charlewie'.",
    explanationDe: "In Izegem wurde Charles-Louis normalerweise umgangssprachlich 'Charlewie' genannt."
  },
  {
    id: 20,
    questionNl: "Welke dochter van Charles Louis werd 'Tante Leine' genoemd?",
    questionFr: "Quelle fille de Charles Louis était appelée 'Tante Leine'?",
    questionEn: "Which daughter of Charles Louis was called 'Aunt Leine'?",
    questionEs: "¿Qué hija de Charles Louis era llamada 'Tía Leine'?",
    questionVls: "Welke dochter van Charles Louis wierd 'Tante Leine' genoemd?",
    questionPcd: "Quelle fille d'Charles Louis étot appelée 'Tante Leine'?",
    questionDe: "Welche Tochter von Charles Louis wurde 'Tante Leine' genannt?",
    options: [
      { nl: "Elisa Palmyre", fr: "Elisa Palmyre", en: "Elisa Palmyre", es: "Elisa Palmyre", vls: "Elisa Palmyre", pcd: "Elisa Palmyre", de: "Elisa Palmyre" },
      { nl: "Odile Camille", fr: "Odile Camille", en: "Odile Camille", es: "Odile Camille", vls: "Odile Camille", pcd: "Odile Camille", de: "Odile Camille" },
      { nl: "Maria Magdalena", fr: "Maria Magdalena", en: "Maria Magdalena", es: "Maria Magdalena", vls: "Maria Magdalena", pcd: "Maria Magdalena", de: "Maria Magdalena" },
      { nl: "Antonia", fr: "Antonia", en: "Antonia", es: "Antonia", vls: "Antonia", pcd: "Antonia", de: "Antonia" }
    ],
    correctAnswer: 2,
    explanationNl: "Maria Magdalena (1889-1970) werd bekend als 'Tante Leine' en was een van de drie overlevende kinderen.",
    explanationFr: "Maria Magdalena (1889-1970) était connue sous le nom de 'Tante Leine' et était l'un des trois enfants survivants.",
    explanationEn: "Maria Magdalena (1889-1970) was known as 'Aunt Leine' and was one of the three surviving children.",
    explanationEs: "Maria Magdalena (1889-1970) era conocida como 'Tía Leine' y era una de los tres hijos sobrevivientes.",
    explanationVls: "Maria Magdalena (1889-1970) wierd bekend ols 'Tante Leine' en was een van de drie overleevende kinders.",
    explanationPcd: "Maria Magdalena (1889-1970) étot connue sous l'nom d''Tante Leine' et étot une des troés éfants survivants.",
    explanationDe: "Maria Magdalena (1889-1970) war als 'Tante Leine' bekannt und war eines der drei überlebenden Kinder."
  },
  {
    id: 21,
    questionNl: "Hoe groot was de Châtellenie de Lille, het gebied waar Hubert Deleforge opgroeide?",
    questionFr: "Quelle était la superficie de la Châtellenie de Lille, la région où Hubert Deleforge a grandi?",
    questionEn: "How large was the Châtellenie de Lille, the area where Hubert Deleforge grew up?",
    questionEs: "¿Qué tan grande era la Châtellenie de Lille, la zona donde creció Hubert Deleforge?",
    questionVls: "Hoe grôot was de Châtellenie de Lille, t gebied woar Hubert Deleforge opgroeide?",
    questionPcd: "Quelle étot l'superficie d'el Châtellenie d'Lille, l'région oùsqu'Hubert Deleforge o grandi?",
    questionDe: "Wie groß war die Châtellenie de Lille, das Gebiet, in dem Hubert Deleforge aufwuchs?",
    options: [
      { nl: "500 vierkante kilometer", fr: "500 kilomètres carrés", en: "500 square kilometers", es: "500 kilómetros cuadrados", vls: "500 vierkante kilometer", pcd: "500 kilomètes carrés", de: "500 Quadratkilometer" },
      { nl: "700 vierkante kilometer", fr: "700 kilomètres carrés", en: "700 square kilometers", es: "700 kilómetros cuadrados", vls: "700 vierkante kilometer", pcd: "700 kilomètes carrés", de: "700 Quadratkilometer" },
      { nl: "900 vierkante kilometer", fr: "900 kilomètres carrés", en: "900 square kilometers", es: "900 kilómetros cuadrados", vls: "900 vierkante kilometer", pcd: "900 kilomètes carrés", de: "900 Quadratkilometer" },
      { nl: "1200 vierkante kilometer", fr: "1200 kilomètres carrés", en: "1200 square kilometers", es: "1200 kilómetros cuadrados", vls: "1200 vierkante kilometer", pcd: "1200 kilomètes carrés", de: "1200 Quadratkilometer" }
    ],
    correctAnswer: 2,
    explanationNl: "De Châtellenie de Lille strekte zich uit over ongeveer 900 vierkante kilometer, begrensd door de Leie, de Deûle en de Scarpe.",
    explanationFr: "La Châtellenie de Lille s'étendait sur environ 900 kilomètres carrés, bordée par la Lys, la Deûle et la Scarpe.",
    explanationEn: "The Châtellenie de Lille extended over approximately 900 square kilometers, bordered by the Lys, the Deûle and the Scarpe.",
    explanationEs: "La Châtellenie de Lille se extendía sobre aproximadamente 900 kilómetros cuadrados, limitada por el Lys, el Deûle y el Scarpe.",
    explanationVls: "De Châtellenie de Lille strekte hoarzelf uut over omtrent 900 vierkante kilometer, begrènsd deur de Leie, de Deûle en de Scarpe.",
    explanationPcd: "El Châtellenie d'Lille s'étindot sus environ 900 kilomètes carrés, bordée par el Lys, el Deûle et el Scarpe.",
    explanationDe: "Die Châtellenie de Lille erstreckte sich über etwa 900 Quadratkilometer, begrenzt durch die Leie, die Deûle und die Scarpe."
  },
  {
    id: 22,
    questionNl: "Wat was het 'signe'-systeem in de Franse scholen?",
    questionFr: "Qu'était le système du 'signe' dans les écoles françaises?",
    questionEn: "What was the 'signe' system in French schools?",
    questionEs: "¿Qué era el sistema del 'signe' en las escuelas francesas?",
    questionVls: "Wat was t 'signe'-systeem in de Fransche schôoln?",
    questionPcd: "Qu'étot l'système du 'signe' dins les écoles françaises?",
    questionDe: "Was war das 'signe'-System in den französischen Schulen?",
    options: [
      { nl: "Een beloningssysteem voor goede leerlingen", fr: "Un système de récompense pour les bons élèves", en: "A reward system for good students", es: "Un sistema de recompensa para buenos estudiantes", vls: "E beloningssysteem vôo goei leerlingn", pcd: "Un système d'récompinse pour les bons élèves", de: "Ein Belohnungssystem für gute Schüler" },
      { nl: "Een strafsysteem voor kinderen die Vlaams spraken", fr: "Un système punitif pour les enfants qui parlaient flamand", en: "A punishment system for children who spoke Flemish", es: "Un sistema de castigo para niños que hablaban flamenco", vls: "E strafsysteem vôo kinders die Vloams sprôokn", pcd: "Un système punitif pour les éfants qui parloétent flamand", de: "Ein Bestrafungssystem für Kinder, die Flämisch sprachen" },
      { nl: "Een gebarentaal voor dove kinderen", fr: "Une langue des signes pour les enfants sourds", en: "A sign language for deaf children", es: "Un lenguaje de señas para niños sordos", vls: "E gebaarentoale vôo dôove kinders", pcd: "Eune langue des signes pour les éfants sourds", de: "Eine Gebärdensprache für gehörlose Kinder" },
      { nl: "Een schrijfmethode voor beginners", fr: "Une méthode d'écriture pour débutants", en: "A writing method for beginners", es: "Un método de escritura para principiantes", vls: "E schryfmethode vôo beginners", pcd: "Eune méthode d'écriture pour débutants", de: "Eine Schreibmethode für Anfänger" }
    ],
    correctAnswer: 1,
    explanationNl: "Kinderen die Vlaams spraken kregen een houten bord om de nek met 'Parlez français'. Ze moesten een ander kind betrappen om het bord door te geven, en wie het aan het eind van de dag had werd gestraft.",
    explanationFr: "Les enfants qui parlaient flamand recevaient une planche en bois autour du cou avec 'Parlez français'. Ils devaient surprendre un autre enfant pour passer la planche, et celui qui l'avait à la fin de la journée était puni.",
    explanationEn: "Children who spoke Flemish received a wooden board around their neck with 'Parlez français'. They had to catch another child to pass the board, and whoever had it at the end of the day was punished.",
    explanationEs: "Los niños que hablaban flamenco recibían una tabla de madera alrededor del cuello con 'Parlez français'. Tenían que atrapar a otro niño para pasar la tabla, y quien la tuviera al final del día era castigado.",
    explanationVls: "Kinders die Vloams sprôokn kreegn e houtne bord rond de nekke mee 'Parlez français'. Ze moesten e ander kind betrappn vôo t bord deur te geevn, en wie da t had op t einde van de dag wierd gestraft.",
    explanationPcd: "Les éfants qui parloétent flamand recevoétent eune planche in bos autour du cou avuc 'Parlez français'. I devoétent surprinde un aute éfant pour passer el planche, et chti qui l'avot à l'fin d'el journée étot puni.",
    explanationDe: "Kinder, die Flämisch sprachen, bekamen ein Holzbrett um den Hals mit 'Parlez français'. Sie mussten ein anderes Kind ertappen, um das Brett weiterzugeben, und wer es am Ende des Tages hatte, wurde bestraft."
  },
  {
    id: 23,
    questionNl: "Hoeveel bedroeg de dagelijkse soldij van Charles Louis als mineur bij de genie?",
    questionFr: "Combien s'élevait la solde journalière de Charles Louis comme mineur au génie?",
    questionEn: "How much was Charles Louis's daily pay as a miner in the engineering corps?",
    questionEs: "¿Cuánto era el sueldo diario de Charles Louis como minero en el cuerpo de ingenieros?",
    questionVls: "Hoeveel bedroeg de dagelikse soldye van Charles Louis ols mineur by de genie?",
    questionPcd: "Combin s'élevot el solde journalière d'Charles Louis comme mineur au génie?",
    questionDe: "Wie hoch war der tägliche Sold von Charles Louis als Mineur beim Pionierkorps?",
    options: [
      { nl: "15-20 centimen", fr: "15-20 centimes", en: "15-20 centimes", es: "15-20 céntimos", vls: "15-20 centimen", pcd: "15-20 centimes", de: "15-20 Centimes" },
      { nl: "30-33 centimen", fr: "30-33 centimes", en: "30-33 centimes", es: "30-33 céntimos", vls: "30-33 centimen", pcd: "30-33 centimes", de: "30-33 Centimes" },
      { nl: "50-55 centimen", fr: "50-55 centimes", en: "50-55 centimes", es: "50-55 céntimos", vls: "50-55 centimen", pcd: "50-55 centimes", de: "50-55 Centimes" },
      { nl: "75-80 centimen", fr: "75-80 centimes", en: "75-80 centimes", es: "75-80 céntimos", vls: "75-80 centimen", pcd: "75-80 centimes", de: "75-80 Centimes" }
    ],
    correctAnswer: 1,
    explanationNl: "Charles Louis verdiende als mineur de 1e classe aanvankelijk 30, later 33 centimen per dag tijdens zijn legerdienst van 1877 tot 1880.",
    explanationFr: "Charles Louis gagnait comme mineur de 1re classe initialement 30, puis 33 centimes par jour pendant son service militaire de 1877 à 1880.",
    explanationEn: "Charles Louis earned as first class miner initially 30, later 33 centimes per day during his military service from 1877 to 1880.",
    explanationEs: "Charles Louis ganaba como minero de primera clase inicialmente 30, luego 33 céntimos por día durante su servicio militar de 1877 a 1880.",
    explanationVls: "Charles Louis verdiênde ols mineur de 1e classe anfankeliek 30, loater 33 centimen per dag tydens zyn légerdiênst van 1877 tot 1880.",
    explanationPcd: "Charles Louis gagnot comme mineur d'1re classe initialemint 30, pis 33 centimes par jour pendant s'service militaire d'1877 à 1880.",
    explanationDe: "Charles Louis verdiente als Mineur 1. Klasse zunächst 30, später 33 Centimes pro Tag während seines Militärdienstes von 1877 bis 1880."
  },
  {
    id: 24,
    questionNl: "Welke Vrede bracht de streek rond Rijsel onder Frans bestuur in 1668?",
    questionFr: "Quel traité de paix a placé la région autour de Lille sous domination française en 1668?",
    questionEn: "Which Peace treaty brought the region around Lille under French rule in 1668?",
    questionEs: "¿Qué tratado de paz puso la región alrededor de Lille bajo dominio francés en 1668?",
    questionVls: "Welke Vrede bracht de streeke rond Rysel onder Frans bestuur in 1668?",
    questionPcd: "Quoé traité d'paix o placé l'région autour d'Lille sous dominateon française in 1668?",
    questionDe: "Welcher Frieden brachte die Region um Lille 1668 unter französische Herrschaft?",
    options: [
      { nl: "Vrede van Westfalen", fr: "Paix de Westphalie", en: "Peace of Westphalia", es: "Paz de Westfalia", vls: "Vrede van Westfalen", pcd: "Paix d'Westphalie", de: "Westfälischer Frieden" },
      { nl: "Vrede van Aken", fr: "Paix d'Aix-la-Chapelle", en: "Peace of Aachen", es: "Paz de Aquisgrán", vls: "Vrede van Aoken", pcd: "Paix d'Aix-la-Chapelle", de: "Frieden von Aachen" },
      { nl: "Vrede van Utrecht", fr: "Paix d'Utrecht", en: "Peace of Utrecht", es: "Paz de Utrecht", vls: "Vrede van Utrecht", pcd: "Paix d'Utrecht", de: "Frieden von Utrecht" },
      { nl: "Vrede van Rijswijk", fr: "Paix de Ryswick", en: "Peace of Ryswick", es: "Paz de Rijswijk", vls: "Vrede van Ryswyk", pcd: "Paix d'Ryswick", de: "Frieden von Rijswijk" }
    ],
    correctAnswer: 1,
    explanationNl: "De Vrede van Aken (1668) droeg de Châtellenie de Lille over van de Spaanse Nederlanden aan Frankrijk.",
    explanationFr: "La Paix d'Aix-la-Chapelle (1668) a transféré la Châtellenie de Lille des Pays-Bas espagnols à la France.",
    explanationEn: "The Peace of Aachen (1668) transferred the Châtellenie de Lille from the Spanish Netherlands to France.",
    explanationEs: "La Paz de Aquisgrán (1668) transfirió la Châtellenie de Lille de los Países Bajos españoles a Francia.",
    explanationVls: "De Vrede van Aoken (1668) droeg de Châtellenie de Lille over van de Spaansche Nederlanden oan Frankryk.",
    explanationPcd: "El Paix d'Aix-la-Chapelle (1668) o transféré el Châtellenie d'Lille des Pays-Bas espagnols à el France.",
    explanationDe: "Der Frieden von Aachen (1668) übertrug die Châtellenie de Lille von den Spanischen Niederlanden an Frankreich."
  },
  {
    id: 25,
    questionNl: "Wat was het belangrijkste bestanddeel van het dagelijks dieet in Frans-Vlaanderen rond 1685?",
    questionFr: "Quel était l'élément principal du régime quotidien en Flandre française vers 1685?",
    questionEn: "What was the main component of the daily diet in French Flanders around 1685?",
    questionEs: "¿Cuál era el componente principal de la dieta diaria en Flandes francés alrededor de 1685?",
    questionVls: "Wat was t belangrykste bestanddeel van t dagelieks dieet in Frans-Vloandern rond 1685?",
    questionPcd: "Quoé étot l'élémint principal du régime quotidien in Flande française vers 1685?",
    questionDe: "Was war der Hauptbestandteil der täglichen Ernährung in Französisch-Flandern um 1685?",
    options: [
      { nl: "Vlees en vis", fr: "Viande et poisson", en: "Meat and fish", es: "Carne y pescado", vls: "Vleesch en vis", pcd: "Viande et poésson", de: "Fleisch und Fisch" },
      { nl: "Brood, bonen en kool", fr: "Pain, haricots et chou", en: "Bread, beans and cabbage", es: "Pan, frijoles y repollo", vls: "Brôod, bôonn en kôole", pcd: "Pain, haricots et chou", de: "Brot, Bohnen und Kohl" },
      { nl: "Aardappelen en melk", fr: "Pommes de terre et lait", en: "Potatoes and milk", es: "Papas y leche", vls: "Eerdappels en melk", pcd: "Pomes d'terre et lait", de: "Kartoffeln und Milch" },
      { nl: "Rijst en groenten", fr: "Riz et légumes", en: "Rice and vegetables", es: "Arroz y verduras", vls: "Ryst en groenten", pcd: "Riz et légumes", de: "Reis und Gemüse" }
    ],
    correctAnswer: 1,
    explanationNl: "Het dieet bestond voornamelijk uit brood, bonen, erwten, kool en spek. Vlees was een luxe en aardappelen waren nog niet wijdverspreid.",
    explanationFr: "Le régime alimentaire se composait principalement de pain, haricots, pois, chou et lard. La viande était un luxe et les pommes de terre n'étaient pas encore répandues.",
    explanationEn: "The diet consisted mainly of bread, beans, peas, cabbage and bacon. Meat was a luxury and potatoes were not yet widespread.",
    explanationEs: "La dieta consistía principalmente en pan, frijoles, guisantes, repollo y tocino. La carne era un lujo y las papas aún no estaban extendidas.",
    explanationVls: "T dieet bestond vôornoameliek uut brôod, bôonn, erwtn, kôole en spek. Vleesch was e luxe en eerdappels woarn nog nie wydverspreid.",
    explanationPcd: "L'régime alimentaire s'composot principalemint d'pain, haricots, poes, chou et lard. El viande étot un luxe et les pomes d'terre n'étoétent point incore répandues.",
    explanationDe: "Die Ernährung bestand hauptsächlich aus Brot, Bohnen, Erbsen, Kohl und Speck. Fleisch war ein Luxus und Kartoffeln waren noch nicht weit verbreitet."
  },
  {
    id: 26,
    questionNl: "Welke drank was in 1685 veiliger dan water en werd dagelijks gedronken?",
    questionFr: "Quelle boisson était plus sûre que l'eau en 1685 et était consommée quotidiennement?",
    questionEn: "Which drink was safer than water in 1685 and was consumed daily?",
    questionEs: "¿Qué bebida era más segura que el agua en 1685 y se consumía diariamente?",
    questionVls: "Welke drank was in 1685 veiliger dan woater en wierd dagelieks gedronkn?",
    questionPcd: "Quelle boésson étot pus sûre que l'iau in 1685 et étot consommée quotidiennemint?",
    questionDe: "Welches Getränk war 1685 sicherer als Wasser und wurde täglich getrunken?",
    options: [
      { nl: "Wijn", fr: "Vin", en: "Wine", es: "Vino", vls: "Wyn", pcd: "Vin", de: "Wein" },
      { nl: "Thee", fr: "Thé", en: "Tea", es: "Té", vls: "Thee", pcd: "Thé", de: "Tee" },
      { nl: "Bier", fr: "Bière", en: "Beer", es: "Cerveza", vls: "Bier", pcd: "Bière", de: "Bier" },
      { nl: "Koffie", fr: "Café", en: "Coffee", es: "Café", vls: "Koffie", pcd: "Café", de: "Kaffee" }
    ],
    correctAnswer: 2,
    explanationNl: "Bier was de dagelijkse drank omdat het veiliger was dan water. Koffie en thee waren onbekend, en wijn was duur en zeldzaam.",
    explanationFr: "La bière était la boisson quotidienne car elle était plus sûre que l'eau. Le café et le thé étaient inconnus, et le vin était cher et rare.",
    explanationEn: "Beer was the daily drink because it was safer than water. Coffee and tea were unknown, and wine was expensive and rare.",
    explanationEs: "La cerveza era la bebida diaria porque era más segura que el agua. El café y el té eran desconocidos, y el vino era caro y raro.",
    explanationVls: "Bier was de dagelikse drank omdat t veiliger was dan woater. Koffie en thee woarn onbekend, en wyn was duur en zeldzaem.",
    explanationPcd: "El bière étot el boésson quotidienne pasqu'elle étot pus sûre que l'iau. L'café et l'thé étoétent inconnus, et l'vin étot quier et rare.",
    explanationDe: "Bier war das tägliche Getränk, weil es sicherer als Wasser war. Kaffee und Tee waren unbekannt, und Wein war teuer und selten."
  },
  {
    id: 27,
    questionNl: "Wat was de Bois d'Haubourdin waar Huberts familie werkte?",
    questionFr: "Qu'était le Bois d'Haubourdin où travaillait la famille de Hubert?",
    questionEn: "What was the Bois d'Haubourdin where Hubert's family worked?",
    questionEs: "¿Qué era el Bois d'Haubourdin donde trabajaba la familia de Hubert?",
    questionVls: "Wat was de Bois d'Haubourdin woar Hubert zyn familie werkte?",
    questionPcd: "Qu'étot l'Bos d'Haubourdin oùsqu'el famille d'Hubert ouvrot?",
    questionDe: "Was war der Bois d'Haubourdin, wo Huberts Familie arbeitete?",
    options: [
      { nl: "Een rivierdal", fr: "Une vallée fluviale", en: "A river valley", es: "Un valle fluvial", vls: "E rivierdale", pcd: "Eune vallée fluviale", de: "Ein Flusstal" },
      { nl: "Een bos waar houthakkers werkten", fr: "Une forêt où travaillaient les bûcherons", en: "A forest where woodcutters worked", es: "Un bosque donde trabajaban los leñadores", vls: "E bos woar houthakkers werktn", pcd: "Eune forêt oùsque les boquillons ouvroétent", de: "Ein Wald, in dem Holzfäller arbeiteten" },
      { nl: "Een textielfabriek", fr: "Une usine textile", en: "A textile factory", es: "Una fábrica textil", vls: "E textielfabriek", pcd: "Eune usine textile", de: "Eine Textilfabrik" },
      { nl: "Een klooster", fr: "Un monastère", en: "A monastery", es: "Un monasterio", vls: "E klooster", pcd: "Un monastère", de: "Ein Kloster" }
    ],
    correctAnswer: 1,
    explanationNl: "De Bois d'Haubourdin was een van de vele bosgebieden in de streek waar de familie Deleforge als houthakkers (boquillons) werkte.",
    explanationFr: "Le Bois d'Haubourdin était l'une des nombreuses zones forestières de la région où la famille Deleforge travaillait comme bûcherons (boquillons).",
    explanationEn: "The Bois d'Haubourdin was one of the many forest areas in the region where the Deleforge family worked as woodcutters (boquillons).",
    explanationEs: "El Bois d'Haubourdin era una de las muchas áreas forestales de la región donde la familia Deleforge trabajaba como leñadores (boquillons).",
    explanationVls: "De Bois d'Haubourdin was een van de vele bosgebiedn in de streeke woar de familie Deleforge ols houthakkers (boquillons) werkte.",
    explanationPcd: "L'Bos d'Haubourdin étot eune des nombreuses zones forestières d'el région oùsqu'el famille Deleforge ouvrot comme boquillons.",
    explanationDe: "Der Bois d'Haubourdin war eines der vielen Waldgebiete in der Region, in dem die Familie Deleforge als Holzfäller (boquillons) arbeitete."
  },
  {
    id: 28,
    questionNl: "Hoe lang was de afstand die Hubert en Antoinette aflegden bij hun migratie naar Izegem?",
    questionFr: "Quelle distance Hubert et Antoinette ont-ils parcourue lors de leur migration vers Izegem?",
    questionEn: "How far did Hubert and Antoinette travel during their migration to Izegem?",
    questionEs: "¿Qué distancia recorrieron Hubert y Antoinette en su migración a Izegem?",
    questionVls: "Hoe lange was de ofstand die Hubert en Antoinette oflegdn by hunder migroasje noar Izegem?",
    questionPcd: "Quelle distance Hubert et Antoinette ont-i parcourue lors d'leu migrateon vers Izegem?",
    questionDe: "Wie weit war die Strecke, die Hubert und Antoinette bei ihrer Migration nach Izegem zurücklegten?",
    options: [
      { nl: "Ongeveer 25 kilometer", fr: "Environ 25 kilomètres", en: "About 25 kilometers", es: "Aproximadamente 25 kilómetros", vls: "Omtrent 25 kilometer", pcd: "Environ 25 kilomètes", de: "Etwa 25 Kilometer" },
      { nl: "Ongeveer 50 kilometer", fr: "Environ 50 kilomètres", en: "About 50 kilometers", es: "Aproximadamente 50 kilómetros", vls: "Omtrent 50 kilometer", pcd: "Environ 50 kilomètes", de: "Etwa 50 Kilometer" },
      { nl: "Ongeveer 100 kilometer", fr: "Environ 100 kilomètres", en: "About 100 kilometers", es: "Aproximadamente 100 kilómetros", vls: "Omtrent 100 kilometer", pcd: "Environ 100 kilomètes", de: "Etwa 100 Kilometer" },
      { nl: "Ongeveer 150 kilometer", fr: "Environ 150 kilomètres", en: "About 150 kilometers", es: "Aproximadamente 150 kilómetros", vls: "Omtrent 150 kilometer", pcd: "Environ 150 kilomètes", de: "Etwa 150 Kilometer" }
    ],
    correctAnswer: 1,
    explanationNl: "De route van Hallennes naar Izegem was ongeveer 50 kilometer, die in twee à drie dagen te voet kon worden afgelegd.",
    explanationFr: "Le trajet de Hallennes à Izegem faisait environ 50 kilomètres, qui pouvait être parcouru en deux à trois jours à pied.",
    explanationEn: "The route from Hallennes to Izegem was about 50 kilometers, which could be covered on foot in two to three days.",
    explanationEs: "La ruta de Hallennes a Izegem era de aproximadamente 50 kilómetros, que se podía recorrer a pie en dos o tres días.",
    explanationVls: "De route van Hallennes noar Izegem was omtrent 50 kilometer, die in twee à drie doagn te voet kon wordn ofgeleid.",
    explanationPcd: "L'route d'Hallennes à Izegem faisot environ 50 kilomètes, qui pouvot ête parcourue in deux à troés jours à pied.",
    explanationDe: "Die Route von Hallennes nach Izegem war etwa 50 Kilometer lang und konnte zu Fuß in zwei bis drei Tagen zurückgelegt werden."
  },
  {
    id: 29,
    questionNl: "Welke wet uit 1833 verplichte onderwijs uitsluitend in het Frans?",
    questionFr: "Quelle loi de 1833 a rendu l'enseignement obligatoire exclusivement en français?",
    questionEn: "Which law from 1833 made education mandatory exclusively in French?",
    questionEs: "¿Qué ley de 1833 hizo obligatoria la educación exclusivamente en francés?",
    questionVls: "Welke wet uut 1833 verplichtte onderwys uutsluitend in t Frans?",
    questionPcd: "Quelle loé d'1833 o rindu l'inseingnemint obligatoire exclusivemint in français?",
    questionDe: "Welches Gesetz von 1833 machte Bildung ausschließlich auf Französisch verpflichtend?",
    options: [
      { nl: "Wet Ferry", fr: "Loi Ferry", en: "Ferry Law", es: "Ley Ferry", vls: "Wet Ferry", pcd: "Loé Ferry", de: "Ferry-Gesetz" },
      { nl: "Wet Guizot", fr: "Loi Guizot", en: "Guizot Law", es: "Ley Guizot", vls: "Wet Guizot", pcd: "Loé Guizot", de: "Guizot-Gesetz" },
      { nl: "Wet Falloux", fr: "Loi Falloux", en: "Falloux Law", es: "Ley Falloux", vls: "Wet Falloux", pcd: "Loé Falloux", de: "Falloux-Gesetz" },
      { nl: "Wet Combes", fr: "Loi Combes", en: "Combes Law", es: "Ley Combes", vls: "Wet Combes", pcd: "Loé Combes", de: "Combes-Gesetz" }
    ],
    correctAnswer: 1,
    explanationNl: "De Wet Guizot van 1833 voerde verplicht lager onderwijs in, uitsluitend in het Frans. Kinderen werden gestraft voor het spreken van Vlaams.",
    explanationFr: "La Loi Guizot de 1833 a instauré l'enseignement primaire obligatoire, exclusivement en français. Les enfants étaient punis pour avoir parlé flamand.",
    explanationEn: "The Guizot Law of 1833 introduced mandatory primary education, exclusively in French. Children were punished for speaking Flemish.",
    explanationEs: "La Ley Guizot de 1833 introdujo la educación primaria obligatoria, exclusivamente en francés. Los niños eran castigados por hablar flamenco.",
    explanationVls: "De Wet Guizot van 1833 voerde verplicht loager onderwys in, uutsluitend in t Frans. Kinders wierdn gestraft vôo t sprekn van Vloams.",
    explanationPcd: "El Loé Guizot d'1833 o instauré l'inseingnemint primaire obligatoire, exclusivemint in français. Les éfants étoétent punis pour avoir parlé flamand.",
    explanationDe: "Das Guizot-Gesetz von 1833 führte die Pflicht zur Grundschulbildung ein, ausschließlich auf Französisch. Kinder wurden für das Sprechen von Flämisch bestraft."
  },
  {
    id: 30,
    questionNl: "Welk rapport uit 1794 bestempelde Vlaams als 'de taal van de contrarevolutie'?",
    questionFr: "Quel rapport de 1794 a qualifié le flamand de 'langue de la contre-révolution'?",
    questionEn: "Which report from 1794 labeled Flemish as 'the language of the counter-revolution'?",
    questionEs: "¿Qué informe de 1794 calificó al flamenco como 'el idioma de la contrarrevolución'?",
    questionVls: "Welk rapport uut 1794 bestempelde Vloams ols 'de toale van de kontrarevolutie'?",
    questionPcd: "Quoé rapport d'1794 o qualifié l'flamand d''langue d'el contre-révoluteon'?",
    questionDe: "Welcher Bericht von 1794 bezeichnete Flämisch als 'die Sprache der Konterrevolution'?",
    options: [
      { nl: "Rapport Grégoire", fr: "Rapport Grégoire", en: "Grégoire Report", es: "Informe Grégoire", vls: "Rapport Grégoire", pcd: "Rapport Grégoire", de: "Grégoire-Bericht" },
      { nl: "Rapport Barère", fr: "Rapport Barère", en: "Barère Report", es: "Informe Barère", vls: "Rapport Barère", pcd: "Rapport Barère", de: "Barère-Bericht" },
      { nl: "Rapport Robespierre", fr: "Rapport Robespierre", en: "Robespierre Report", es: "Informe Robespierre", vls: "Rapport Robespierre", pcd: "Rapport Robespierre", de: "Robespierre-Bericht" },
      { nl: "Rapport Danton", fr: "Rapport Danton", en: "Danton Report", es: "Informe Danton", vls: "Rapport Danton", pcd: "Rapport Danton", de: "Danton-Bericht" }
    ],
    correctAnswer: 1,
    explanationNl: "Het Rapport Barère van 1794 bestempelde Vlaamse en andere minderheidstalen als 'de talen van de contrarevolutie', wat de onderdrukking van het Vlaams rechtvaardigde.",
    explanationFr: "Le Rapport Barère de 1794 a qualifié le flamand et d'autres langues minoritaires de 'langues de la contre-révolution', justifiant la suppression du flamand.",
    explanationEn: "The Barère Report of 1794 labeled Flemish and other minority languages as 'the languages of the counter-revolution', justifying the suppression of Flemish.",
    explanationEs: "El Informe Barère de 1794 calificó al flamenco y otras lenguas minoritarias como 'los idiomas de la contrarrevolución', justificando la supresión del flamenco.",
    explanationVls: "T Rapport Barère van 1794 bestempelde Vloams en andere minderheidstaoln ols 'de taoln van de kontrarevolutie', wat de onderdrukking van t Vloams rechtveerdigde.",
    explanationPcd: "L'Rapport Barère d'1794 o qualifié l'flamand et d'autes langues minoritaires d''langues d'el contre-révoluteon', justifiant l'suppresseon du flamand.",
    explanationDe: "Der Barère-Bericht von 1794 bezeichnete Flämisch und andere Minderheitensprachen als 'die Sprachen der Konterrevolution' und rechtfertigte damit die Unterdrückung des Flämischen."
  },
  {
    id: 31,
    questionNl: "In welk jaar begon de Franse Revolutie?",
    questionFr: "En quelle année la Révolution française a-t-elle commencé?",
    questionEn: "In what year did the French Revolution begin?",
    questionEs: "¿En qué año comenzó la Revolución Francesa?",
    questionVls: "In welk joar begon de Fransche Revolutie?",
    questionPcd: "In quelle année el Révoluteon française o-t-elle comminché?",
    questionDe: "In welchem Jahr begann die Französische Revolution?",
    options: [
      { nl: "1776", fr: "1776", en: "1776", es: "1776", vls: "1776", pcd: "1776", de: "1776" },
      { nl: "1789", fr: "1789", en: "1789", es: "1789", vls: "1789", pcd: "1789", de: "1789" },
      { nl: "1792", fr: "1792", en: "1792", es: "1792", vls: "1792", pcd: "1792", de: "1792" },
      { nl: "1799", fr: "1799", en: "1799", es: "1799", vls: "1799", pcd: "1799", de: "1799" }
    ],
    correctAnswer: 1,
    explanationNl: "De Franse Revolutie begon in 1789 met de Bestorming van de Bastille op 14 juli. Deze revolutie had verregaande gevolgen voor Frans-Vlaanderen en de voorouders van de familie Deforce.",
    explanationFr: "La Révolution française a commencé en 1789 avec la prise de la Bastille le 14 juillet. Cette révolution a eu des conséquences profondes pour la Flandre française et les ancêtres de la famille Deforce.",
    explanationEn: "The French Revolution began in 1789 with the Storming of the Bastille on July 14. This revolution had far-reaching consequences for French Flanders and the ancestors of the Deforce family.",
    explanationEs: "La Revolución Francesa comenzó en 1789 con la Toma de la Bastilla el 14 de julio. Esta revolución tuvo consecuencias de gran alcance para Flandes francés y los ancestros de la familia Deforce.",
    explanationVls: "De Fransche Revolutie begon in 1789 mee de Bestorming van de Bastille op 14 juli. Dezen revolutie had wiydstrekkende gevolgen vôo Frans-Vloandern en de vôoouders van de familie Deforce.",
    explanationPcd: "El Révoluteon française o comminché in 1789 avuc el prise d'el Bastille l'14 juillet. Chette révoluteon o eu des conséquinces profondes pour el Flande française et les anchiêtres d'el famille Deforce.",
    explanationDe: "Die Französische Revolution begann 1789 mit dem Sturm auf die Bastille am 14. Juli. Diese Revolution hatte weitreichende Folgen für Französisch-Flandern und die Vorfahren der Familie Deforce."
  },
  {
    id: 32,
    questionNl: "Wie leidde de Terreur (Schrikbewind) tijdens de Franse Revolutie?",
    questionFr: "Qui a dirigé la Terreur pendant la Révolution française?",
    questionEn: "Who led the Reign of Terror during the French Revolution?",
    questionEs: "¿Quién lideró el Terror durante la Revolución Francesa?",
    questionVls: "Wie leidde de Terreur (Schrikbewind) tydns de Fransche Revolutie?",
    questionPcd: "Qui o dirigé el Terreur pendant el Révoluteon française?",
    questionDe: "Wer führte die Schreckensherrschaft während der Französischen Revolution an?",
    options: [
      { nl: "Napoleon Bonaparte", fr: "Napoléon Bonaparte", en: "Napoleon Bonaparte", es: "Napoleón Bonaparte", vls: "Napoleon Bonaparte", pcd: "Napoléon Bonaparte", de: "Napoleon Bonaparte" },
      { nl: "Maximilien Robespierre", fr: "Maximilien Robespierre", en: "Maximilien Robespierre", es: "Maximilien Robespierre", vls: "Maximilien Robespierre", pcd: "Maximilien Robespierre", de: "Maximilien Robespierre" },
      { nl: "Lodewijk XVI", fr: "Louis XVI", en: "Louis XVI", es: "Luis XVI", vls: "Lodewyk XVI", pcd: "Louis XVI", de: "Ludwig XVI." },
      { nl: "Jean-Paul Marat", fr: "Jean-Paul Marat", en: "Jean-Paul Marat", es: "Jean-Paul Marat", vls: "Jean-Paul Marat", pcd: "Jean-Paul Marat", de: "Jean-Paul Marat" }
    ],
    correctAnswer: 1,
    explanationNl: "Maximilien Robespierre leidde de Terreur (1793-1794), een periode waarin duizenden mensen werden geëxecuteerd. In Frans-Vlaanderen werden kloosters gesloten en kerken geplunderd, wat het dagelijks leven van de voorouders van de Deforce familie diep beïnvloedde.",
    explanationFr: "Maximilien Robespierre a dirigé la Terreur (1793-1794), une période durant laquelle des milliers de personnes ont été exécutées. En Flandre française, des monastères ont été fermés et des églises pillées, ce qui a profondément affecté la vie quotidienne des ancêtres de la famille Deforce.",
    explanationEn: "Maximilien Robespierre led the Reign of Terror (1793-1794), a period during which thousands were executed. In French Flanders, monasteries were closed and churches plundered, deeply affecting the daily lives of the Deforce family ancestors.",
    explanationEs: "Maximilien Robespierre lideró el Terror (1793-1794), un período durante el cual miles fueron ejecutados. En Flandes francés, los monasterios fueron cerrados y las iglesias saqueadas, afectando profundamente la vida diaria de los ancestros de la familia Deforce.",
    explanationVls: "Maximilien Robespierre leidde de Terreur (1793-1794), een periode woarin duuzenden menschn wierdn geëxecuteerd. In Frans-Vloandern wierdn klôosters geslotn en kerkn geplunderd, wat t doaglyks leevn van de vôoouders van de Deforce familie diep beïnvloedde.",
    explanationPcd: "Maximilien Robespierre o dirigé el Terreur (1793-1794), eune période durant laquielle des milliers d'gins ont été exécutés. In Flande française, des monastères ont été fermés et des églises pillées, ch'qui o profondémint affecté el vie quotidienne des anchiêtres d'el famille Deforce.",
    explanationDe: "Maximilien Robespierre führte die Schreckensherrschaft (1793-1794) an, eine Zeit, in der Tausende hingerichtet wurden. In Französisch-Flandern wurden Klöster geschlossen und Kirchen geplündert, was das tägliche Leben der Vorfahren der Familie Deforce tiefgreifend beeinflusste."
  },
  {
    id: 33,
    questionNl: "Wat was een belangrijk gevolg van de Franse Revolutie voor de Vlaamse taal in Frans-Vlaanderen?",
    questionFr: "Quelle fut une conséquence importante de la Révolution française pour la langue flamande en Flandre française?",
    questionEn: "What was an important consequence of the French Revolution for the Flemish language in French Flanders?",
    questionEs: "¿Cuál fue una consecuencia importante de la Revolución Francesa para el idioma flamenco en Flandes francés?",
    questionVls: "Wat was een belangryk gevolg van de Fransche Revolutie vôo de Vloamsche toale in Frans-Vloandern?",
    questionPcd: "Quoé étot eune importante conséquince d'el Révoluteon française pour el langue flamande in Flande française?",
    questionDe: "Was war eine wichtige Folge der Französischen Revolution für die flämische Sprache in Französisch-Flandern?",
    options: [
      { nl: "Het Vlaams werd de officiële taal", fr: "Le flamand est devenu langue officielle", en: "Flemish became the official language", es: "El flamenco se convirtió en idioma oficial", vls: "T Vloams wierd de officiële toale", pcd: "L'flamand est dvenu langue officielle", de: "Flämisch wurde Amtssprache" },
      { nl: "Het Vlaams werd verboden en onderdrukt", fr: "Le flamand fut interdit et supprimé", en: "Flemish was forbidden and suppressed", es: "El flamenco fue prohibido y suprimido", vls: "T Vloams wierd verbodn en onderdrukt", pcd: "L'flamand fut interdit et supprimé", de: "Flämisch wurde verboten und unterdrückt" },
      { nl: "Tweetalig onderwijs werd ingevoerd", fr: "L'enseignement bilingue fut introduit", en: "Bilingual education was introduced", es: "Se introdujo la educación bilingüe", vls: "Tweetoalig onderwys wierd ingevoerd", pcd: "L'inseingnemint bilingue fut introduit", de: "Zweisprachiger Unterricht wurde eingeführt" },
      { nl: "Het Vlaams kreeg beschermde status", fr: "Le flamand reçut un statut protégé", en: "Flemish received protected status", es: "El flamenco recibió estatus protegido", vls: "T Vloams kreeg beschermde status", pcd: "L'flamand reçut eun statut protégé", de: "Flämisch erhielt Schutzstatus" }
    ],
    correctAnswer: 1,
    explanationNl: "Na de Franse Revolutie werd het Vlaams systematisch onderdrukt. Het Rapport Barère (1794) bestempelde minderheidstalen als 'talen van de contrarevolutie'. Kinderen werden gestraft voor het spreken van Vlaams op school, wat leidde tot het verdwijnen van de taal in Frans-Vlaanderen.",
    explanationFr: "Après la Révolution française, le flamand fut systématiquement supprimé. Le Rapport Barère (1794) qualifia les langues minoritaires de 'langues de la contre-révolution'. Les enfants étaient punis pour avoir parlé flamand à l'école, ce qui mena à la disparition de la langue en Flandre française.",
    explanationEn: "After the French Revolution, Flemish was systematically suppressed. The Barère Report (1794) labeled minority languages as 'languages of the counter-revolution'. Children were punished for speaking Flemish at school, leading to the disappearance of the language in French Flanders.",
    explanationEs: "Después de la Revolución Francesa, el flamenco fue sistemáticamente suprimido. El Informe Barère (1794) calificó las lenguas minoritarias como 'lenguas de la contrarrevolución'. Los niños eran castigados por hablar flamenco en la escuela, lo que llevó a la desaparición del idioma en Flandes francés.",
    explanationVls: "Na de Fransche Revolutie wierd t Vloams systematisch onderdrukt. T Rapport Barère (1794) bestempelde minderheidstaoln ols 'taoln van de kontrarevolutie'. Kinders wierdn gestraft vôo t sprekn van Vloams op school, wat leidde tot t verdwynen van de toale in Frans-Vloandern.",
    explanationPcd: "Après el Révoluteon française, l'flamand fut systématiquemint supprimé. L'Rapport Barère (1794) qualifia les langues minoritaires d''langues d'el contre-révoluteon'. Les éfants étoétent punis pour avoir parlé flamand à l'école, ch'qui mena à el dispariteon d'el langue in Flande française.",
    explanationDe: "Nach der Französischen Revolution wurde Flämisch systematisch unterdrückt. Der Barère-Bericht (1794) bezeichnete Minderheitensprachen als 'Sprachen der Konterrevolution'. Kinder wurden für das Sprechen von Flämisch in der Schule bestraft, was zum Verschwinden der Sprache in Französisch-Flandern führte."
  },
  {
    id: 34,
    questionNl: "Welke zoon uit de gezinsfoto van 1943 was niet aanwezig op de familiereunie van 1962?",
    questionFr: "Quel fils de la photo de famille de 1943 n'était pas présent à la réunion de famille de 1962?",
    questionEn: "Which son from the 1943 family photo was not present at the 1962 family reunion?",
    questionEs: "¿Qué hijo de la foto familiar de 1943 no estuvo presente en la reunión familiar de 1962?",
    questionVls: "Welke zeune uut de gezinsfoto van 1943 was nie oanwezig op de familiereunie van 1962?",
    questionPcd: "Quoé fils d'el photo d'famille d'1943 n'étot point présint à el réunion d'famille d'1962?",
    questionDe: "Welcher Sohn aus dem Familienfoto von 1943 war bei der Familienfeier 1962 nicht anwesend?",
    options: [
      { nl: "Marcel Deforce", fr: "Marcel Deforce", en: "Marcel Deforce", es: "Marcel Deforce", vls: "Marcel Deforce", pcd: "Marcel Deforce", de: "Marcel Deforce" },
      { nl: "André Deforce", fr: "André Deforce", en: "André Deforce", es: "André Deforce", vls: "André Deforce", pcd: "André Deforce", de: "André Deforce" },
      { nl: "Georges Deforce", fr: "Georges Deforce", en: "Georges Deforce", es: "Georges Deforce", vls: "Georges Deforce", pcd: "Georges Deforce", de: "Georges Deforce" },
      { nl: "Albert Deforce", fr: "Albert Deforce", en: "Albert Deforce", es: "Albert Deforce", vls: "Albert Deforce", pcd: "Albert Deforce", de: "Albert Deforce" }
    ],
    correctAnswer: 1,
    explanationNl: "André Deforce, een zoon van Marcel en Magdalena Geldof, was niet aanwezig op de familiereunie van 1962. Hij staat wel op de gezinsfoto van 1943.",
    explanationFr: "André Deforce, un fils de Marcel et Magdalena Geldof, n'était pas présent à la réunion de famille de 1962. Il figure sur la photo de famille de 1943.",
    explanationEn: "André Deforce, a son of Marcel and Magdalena Geldof, was not present at the 1962 family reunion. He does appear in the 1943 family photo.",
    explanationEs: "André Deforce, un hijo de Marcel y Magdalena Geldof, no estuvo presente en la reunión familiar de 1962. Sí aparece en la foto familiar de 1943.",
    explanationVls: "André Deforce, een zeune van Marcel en Magdalena Geldof, was nie oanwezig op de familiereunie van 1962. Hy stoat wel op de gezinsfoto van 1943.",
    explanationPcd: "André Deforce, un fils d'Marcel et Magdalena Geldof, n'étot point présint à el réunion d'famille d'1962. I figure sus el photo d'famille d'1943.",
    explanationDe: "André Deforce, ein Sohn von Marcel und Magdalena Geldof, war bei der Familienfeier 1962 nicht anwesend. Er ist auf dem Familienfoto von 1943 zu sehen."
  },
  {
    id: 35,
    questionNl: "Door welke notaris werd het huwelijkscontract van Hubert Deleforge en Antoinette Follet opgesteld?",
    questionFr: "Par quel notaire le contrat de mariage de Hubert Deleforge et Antoinette Follet a-t-il été rédigé?",
    questionEn: "By which notary was the marriage contract of Hubert Deleforge and Antoinette Follet drawn up?",
    questionEs: "¿Por qué notario fue redactado el contrato de matrimonio de Hubert Deleforge y Antoinette Follet?",
    questionVls: "Deur welke notaris wierd t huwlykscontract van Hubert Deleforge en Antoinette Follet opgesteld?",
    questionPcd: "Par quoé notaire l'contrat d'mariache d'Hubert Deleforge et Antoinette Follet o-t-i été rédigé?",
    questionDe: "Von welchem Notar wurde der Ehevertrag von Hubert Deleforge und Antoinette Follet aufgesetzt?",
    options: [
      { nl: "Jacques Anselme Le Francq", fr: "Jacques Anselme Le Francq", en: "Jacques Anselme Le Francq", es: "Jacques Anselme Le Francq", vls: "Jacques Anselme Le Francq", pcd: "Jacques Anselme Le Francq", de: "Jacques Anselme Le Francq" },
      { nl: "Pierre De Smet", fr: "Pierre De Smet", en: "Pierre De Smet", es: "Pierre De Smet", vls: "Pierre De Smet", pcd: "Pierre De Smet", de: "Pierre De Smet" },
      { nl: "Jean-Baptiste Vandenberghe", fr: "Jean-Baptiste Vandenberghe", en: "Jean-Baptiste Vandenberghe", es: "Jean-Baptiste Vandenberghe", vls: "Jean-Baptiste Vandenberghe", pcd: "Jean-Baptiste Vandenberghe", de: "Jean-Baptiste Vandenberghe" },
      { nl: "François Lemaire", fr: "François Lemaire", en: "François Lemaire", es: "François Lemaire", vls: "François Lemaire", pcd: "François Lemaire", de: "François Lemaire" }
    ],
    correctAnswer: 0,
    explanationNl: "Het huwelijkscontract van 18 april 1685 werd opgemaakt te Lille (Rijsel) door notaris Jacques Anselme Le Francq. Dit kostbare document van vijf pagina's bevat de volledige huwelijksvoorwaarden en handtekeningen van de stamouders.",
    explanationFr: "Le contrat de mariage du 18 avril 1685 a été rédigé à Lille par le notaire Jacques Anselme Le Francq. Ce précieux document de cinq pages contient les conditions de mariage complètes et les signatures des ancêtres fondateurs.",
    explanationEn: "The marriage contract of April 18, 1685 was drawn up in Lille by notary Jacques Anselme Le Francq. This precious five-page document contains the complete marriage conditions and signatures of the founding ancestors.",
    explanationEs: "El contrato de matrimonio del 18 de abril de 1685 fue redactado en Lille por el notario Jacques Anselme Le Francq. Este precioso documento de cinco páginas contiene las condiciones matrimoniales completas y las firmas de los ancestros fundadores.",
    explanationVls: "T huwlykscontract van 18 april 1685 wierd opgemaakt te Rysel deur notaris Jacques Anselme Le Francq. Dit kostboar document van vyf paginas bevat de volledige huwlyksvoorwoarden en handtekeningen van de stamouders.",
    explanationPcd: "L'contrat d'mariache du 18 avri 1685 o été rédigé à Lille par l'notaire Jacques Anselme Le Francq. Chest précieux documint d'chinq pages contient les conditions d'mariache complètes et les signatures des anchiêtres fondateurs.",
    explanationDe: "Der Ehevertrag vom 18. April 1685 wurde in Lille vom Notar Jacques Anselme Le Francq aufgesetzt. Dieses kostbare fünfseitige Dokument enthält die vollständigen Ehebedingungen und Unterschriften der Stammeltern."
  },
  {
    id: 36,
    questionNl: "Hoeveel bedroeg de bruidsschat die Antoinette Follet meekreeg bij haar huwelijk in 1685?",
    questionFr: "Quel était le montant de la dot qu'Antoinette Follet a reçue lors de son mariage en 1685?",
    questionEn: "How much was the dowry that Antoinette Follet received at her marriage in 1685?",
    questionEs: "¿Cuánto era la dote que recibió Antoinette Follet en su matrimonio en 1685?",
    questionVls: "Hoeveel bedroeg de bruudsschat die Antoinette Follet meekreeg by hoar huwlyk in 1685?",
    questionPcd: "Combin étot el dot qu'Antoinette Follet o reçu lors d'sin mariache in 1685?",
    questionDe: "Wie hoch war die Mitgift, die Antoinette Follet bei ihrer Hochzeit 1685 erhielt?",
    options: [
      { nl: "100 livres parisis", fr: "100 livres parisis", en: "100 livres parisis", es: "100 libras parisis", vls: "100 livres parisis", pcd: "100 livres parisis", de: "100 Livres Parisis" },
      { nl: "300 livres parisis", fr: "300 livres parisis", en: "300 livres parisis", es: "300 libras parisis", vls: "300 livres parisis", pcd: "300 livres parisis", de: "300 Livres Parisis" },
      { nl: "500 livres parisis", fr: "500 livres parisis", en: "500 livres parisis", es: "500 libras parisis", vls: "500 livres parisis", pcd: "500 livres parisis", de: "500 Livres Parisis" },
      { nl: "1000 livres parisis", fr: "1000 livres parisis", en: "1000 livres parisis", es: "1000 libras parisis", vls: "1000 livres parisis", pcd: "1000 livres parisis", de: "1000 Livres Parisis" }
    ],
    correctAnswer: 1,
    explanationNl: "Antoinette Follet ontving een bruidsschat van 300 livres parisis van haar vader Jean Follet, meester-chirurgijn te Capinghem. Dit substantiële bedrag getuigt van de welgestelde status van de familie Follet.",
    explanationFr: "Antoinette Follet a reçu une dot de 300 livres parisis de son père Jean Follet, maître-chirurgien à Capinghem. Cette somme substantielle témoigne du statut aisé de la famille Follet.",
    explanationEn: "Antoinette Follet received a dowry of 300 livres parisis from her father Jean Follet, master surgeon in Capinghem. This substantial amount attests to the wealthy status of the Follet family.",
    explanationEs: "Antoinette Follet recibió una dote de 300 libras parisis de su padre Jean Follet, maestro cirujano en Capinghem. Esta cantidad sustancial atestigua el estatus acomodado de la familia Follet.",
    explanationVls: "Antoinette Follet ontving een bruudsschat van 300 livres parisis van hoar vader Jean Follet, meester-chirurgyn te Capinghem. Dit substantieel bedrag getuugt van de welgestelde status van de familie Follet.",
    explanationPcd: "Antoinette Follet o reçu eune dot d'300 livres parisis d'sin père Jean Follet, maîte-chirurgien à Capinghem. Chette somme substantielle témoigne du statut aisé d'el famille Follet.",
    explanationDe: "Antoinette Follet erhielt eine Mitgift von 300 Livres Parisis von ihrem Vater Jean Follet, Meisterchirurg in Capinghem. Dieser beträchtliche Betrag zeugt vom wohlhabenden Status der Familie Follet."
  },
  {
    id: 37,
    questionNl: "Welk beroep had Hubert Deleforge volgens het huwelijkscontract van 1685?",
    questionFr: "Quel métier exerçait Hubert Deleforge selon le contrat de mariage de 1685?",
    questionEn: "What profession did Hubert Deleforge have according to the 1685 marriage contract?",
    questionEs: "¿Qué profesión tenía Hubert Deleforge según el contrato de matrimonio de 1685?",
    questionVls: "Welk beroep had Hubert Deleforge volgens t huwlykscontract van 1685?",
    questionPcd: "Quoé métier exerçot Hubert Deleforge selon l'contrat d'mariache d'1685?",
    questionDe: "Welchen Beruf hatte Hubert Deleforge laut dem Ehevertrag von 1685?",
    options: [
      { nl: "Landarbeider (manouvrier)", fr: "Manouvrier", en: "Day laborer (manouvrier)", es: "Jornalero (manouvrier)", vls: "Landarbeider (manouvrier)", pcd: "Manouvrier", de: "Tagelöhner (Manouvrier)" },
      { nl: "Meester-timmerman", fr: "Maître-charpentier", en: "Master carpenter", es: "Maestro carpintero", vls: "Meester-timmerman", pcd: "Maîte-carpintier", de: "Meisterzimmermann" },
      { nl: "Smid", fr: "Forgeron", en: "Blacksmith", es: "Herrero", vls: "Smid", pcd: "Forgeron", de: "Schmied" },
      { nl: "Wever", fr: "Tisserand", en: "Weaver", es: "Tejedor", vls: "Weever", pcd: "Tisserand", de: "Weber" }
    ],
    correctAnswer: 0,
    explanationNl: "Hubert Deleforge werd in het huwelijkscontract vermeld als 'manouvrier' (landarbeider/dagloner), afkomstig uit Hallennes-lez-Haubourdin. Dit was een bescheiden beroep, maar hij zou later uitgroeien tot stamvader van een uitgebreide familie.",
    explanationFr: "Hubert Deleforge était mentionné dans le contrat de mariage comme 'manouvrier' (ouvrier agricole/journalier), originaire de Hallennes-lez-Haubourdin. C'était un métier modeste, mais il deviendrait plus tard l'ancêtre fondateur d'une grande famille.",
    explanationEn: "Hubert Deleforge was mentioned in the marriage contract as 'manouvrier' (agricultural worker/day laborer), from Hallennes-lez-Haubourdin. This was a modest profession, but he would later become the founding ancestor of an extensive family.",
    explanationEs: "Hubert Deleforge fue mencionado en el contrato de matrimonio como 'manouvrier' (trabajador agrícola/jornalero), originario de Hallennes-lez-Haubourdin. Era una profesión modesta, pero más tarde se convertiría en el ancestro fundador de una extensa familia.",
    explanationVls: "Hubert Deleforge wierd in t huwlykscontract vermeld ols 'manouvrier' (landarbeider/daglôoner), afkomstig uut Hallennes-lez-Haubourdin. Dit was een bescheiden beroep, moar hy zou loater uutgroeien tot stamvader van een uutgebreide familie.",
    explanationPcd: "Hubert Deleforge étot mintionné dins l'contrat d'mariache comme 'manouvrier' (ouvrier agricole/journalier), originaire d'Hallennes-lez-Haubourdin. Ch'étot un métier modeste, mais i deviendrot pus tard l'anchiêtre fondateur d'eune grande famille.",
    explanationDe: "Hubert Deleforge wurde im Ehevertrag als 'Manouvrier' (Landarbeiter/Tagelöhner) aus Hallennes-lez-Haubourdin genannt. Dies war ein bescheidener Beruf, aber er sollte später zum Stammvater einer großen Familie werden."
  },
  // Emile Geldof questions
  {
    id: 38,
    questionNl: "Wat was het beroep van Emile Geldof?",
    questionFr: "Quel était le métier d'Emile Geldof?",
    questionEn: "What was Emile Geldof's profession?",
    questionEs: "¿Cuál era la profesión de Emile Geldof?",
    questionVls: "Wat was t beroep van Emile Geldof?",
    questionPcd: "Quoé étot l'métier d'Emile Geldof?",
    questionDe: "Was war der Beruf von Emile Geldof?",
    options: [
      { nl: "Wever", fr: "Tisserand", en: "Weaver", es: "Tejedor", vls: "Weever", pcd: "Tisserand", de: "Weber" },
      { nl: "Wijntapper", fr: "Cabaretier de vin", en: "Wine tapper", es: "Tabernero de vino", vls: "Wyntapper", pcd: "Cabaretier d'vin", de: "Weinzapfer" },
      { nl: "Timmerman", fr: "Charpentier", en: "Carpenter", es: "Carpintero", vls: "Timmerman", pcd: "Carpintier", de: "Zimmermann" },
      { nl: "Bakker", fr: "Boulanger", en: "Baker", es: "Panadero", vls: "Bakker", pcd: "Boulangier", de: "Bäcker" }
    ],
    correctAnswer: 1,
    explanationNl: "Emile Geldof was wijntapper in de wijk Bosmolens te Izegem. Hij begon als wijntappersknecht en groeide uit tot zelfstandig wijntapper.",
    explanationFr: "Emile Geldof était cabaretier de vin dans le quartier Bosmolens à Izegem. Il a commencé comme garçon cabaretier et est devenu cabaretier indépendant.",
    explanationEn: "Emile Geldof was a wine tapper in the Bosmolens district of Izegem. He started as a wine tapper's apprentice and became an independent wine merchant.",
    explanationEs: "Emile Geldof era tabernero de vino en el barrio de Bosmolens en Izegem. Comenzó como aprendiz de tabernero y se convirtió en tabernero independiente.",
    explanationVls: "Emile Geldof was wyntapper in de wyk Bosmolens te Izegem. Hy begon ols wyntapperskêrel en groeide uut tot zelfstandig wyntapper.",
    explanationPcd: "Emile Geldof étot cabaretier d'vin dins l'quartier Bosmolens à Izegem. I o comminché comme garçon cabaretier et est dvenu cabaretier indépendant.",
    explanationDe: "Emile Geldof war Weinzapfer im Viertel Bosmolens in Izegem. Er begann als Weinzapfergehilfe und wurde selbstständiger Weinhändler."
  },
  {
    id: 39,
    questionNl: "Wanneer werd Emile Geldof geboren?",
    questionFr: "Quand Emile Geldof est-il né?",
    questionEn: "When was Emile Geldof born?",
    questionEs: "¿Cuándo nació Emile Geldof?",
    questionVls: "Wanneer wierd Emile Geldof geboarn?",
    questionPcd: "Quand Emile Geldof est-i né?",
    questionDe: "Wann wurde Emile Geldof geboren?",
    options: [
      { nl: "21 januari 1855", fr: "21 janvier 1855", en: "January 21, 1855", es: "21 de enero de 1855", vls: "21 januari 1855", pcd: "21 janvier 1855", de: "21. Januar 1855" },
      { nl: "21 januari 1865", fr: "21 janvier 1865", en: "January 21, 1865", es: "21 de enero de 1865", vls: "21 januari 1865", pcd: "21 janvier 1865", de: "21. Januar 1865" },
      { nl: "21 januari 1875", fr: "21 janvier 1875", en: "January 21, 1875", es: "21 de enero de 1875", vls: "21 januari 1875", pcd: "21 janvier 1875", de: "21. Januar 1875" },
      { nl: "21 januari 1885", fr: "21 janvier 1885", en: "January 21, 1885", es: "21 de enero de 1885", vls: "21 januari 1885", pcd: "21 janvier 1885", de: "21. Januar 1885" }
    ],
    correctAnswer: 1,
    explanationNl: "Emile Geldof werd geboren op 21 januari 1865 uit een werkmansgezin. Zijn vader Jan was wever en zijn moeder naaister.",
    explanationFr: "Emile Geldof est né le 21 janvier 1865 dans une famille ouvrière. Son père Jan était tisserand et sa mère couturière.",
    explanationEn: "Emile Geldof was born on January 21, 1865 into a working-class family. His father Jan was a weaver and his mother a seamstress.",
    explanationEs: "Emile Geldof nació el 21 de enero de 1865 en una familia obrera. Su padre Jan era tejedor y su madre costurera.",
    explanationVls: "Emile Geldof wierd geboarn op 21 januari 1865 uut een werkmansgezin. Zyn vader Jan was weever en zyn moeder naaister.",
    explanationPcd: "Emile Geldof est né l'21 janvier 1865 dins eune famille ouvrière. Sin père Jan étot tisserand et s'mère couturière.",
    explanationDe: "Emile Geldof wurde am 21. Januar 1865 in eine Arbeiterfamilie geboren. Sein Vater Jan war Weber und seine Mutter Näherin."
  },
  {
    id: 40,
    questionNl: "Hoeveel keer is Emile Geldof getrouwd?",
    questionFr: "Combien de fois Emile Geldof s'est-il marié?",
    questionEn: "How many times did Emile Geldof marry?",
    questionEs: "¿Cuántas veces se casó Emile Geldof?",
    questionVls: "Hoeveel kee is Emile Geldof getrouwd?",
    questionPcd: "Combin d'foes Emile Geldof s'est-i marié?",
    questionDe: "Wie oft hat Emile Geldof geheiratet?",
    options: [
      { nl: "1 keer", fr: "1 fois", en: "1 time", es: "1 vez", vls: "1 kee", pcd: "1 foe", de: "1 Mal" },
      { nl: "2 keer", fr: "2 fois", en: "2 times", es: "2 veces", vls: "2 kee", pcd: "2 foes", de: "2 Mal" },
      { nl: "3 keer", fr: "3 fois", en: "3 times", es: "3 veces", vls: "3 kee", pcd: "3 foes", de: "3 Mal" },
      { nl: "4 keer", fr: "4 fois", en: "4 times", es: "4 veces", vls: "4 kee", pcd: "4 foes", de: "4 Mal" }
    ],
    correctAnswer: 1,
    explanationNl: "Emile Geldof trouwde 2 keer: eerst met Marie-Louise d'Artois (1892, overleden in 1893) en daarna met Maria-Theresia Vanderheeren (1893).",
    explanationFr: "Emile Geldof s'est marié 2 fois : d'abord avec Marie-Louise d'Artois (1892, décédée en 1893) puis avec Maria-Theresia Vanderheeren (1893).",
    explanationEn: "Emile Geldof married 2 times: first to Marie-Louise d'Artois (1892, died in 1893) and then to Maria-Theresia Vanderheeren (1893).",
    explanationEs: "Emile Geldof se casó 2 veces: primero con Marie-Louise d'Artois (1892, fallecida en 1893) y luego con Maria-Theresia Vanderheeren (1893).",
    explanationVls: "Emile Geldof trouwde 2 kee: eerst mee Marie-Louise d'Artois (1892, overledn in 1893) en doarna mee Maria-Theresia Vanderheeren (1893).",
    explanationPcd: "Emile Geldof s'est marié 2 foes : d'abord avuc Marie-Louise d'Artois (1892, décédée in 1893) pis avuc Maria-Theresia Vanderheeren (1893).",
    explanationDe: "Emile Geldof heiratete 2 Mal: zuerst Marie-Louise d'Artois (1892, gestorben 1893) und dann Maria-Theresia Vanderheeren (1893)."
  },
  {
    id: 41,
    questionNl: "Wie was de moeder van onze grootmoeder Magdalena (Madeleine) Geldof?",
    questionFr: "Qui était la mère de notre grand-mère Magdalena (Madeleine) Geldof?",
    questionEn: "Who was the mother of our grandmother Magdalena (Madeleine) Geldof?",
    questionEs: "¿Quién era la madre de nuestra abuela Magdalena (Madeleine) Geldof?",
    questionVls: "Wie was de moeder van onze grôotmoeder Magdalena (Madeleine) Geldof?",
    questionPcd: "Qui étot l'mère ed' note grand-mère Magdalena (Madeleine) Geldof?",
    questionDe: "Wer war die Mutter unserer Großmutter Magdalena (Madeleine) Geldof?",
    options: [
      { nl: "Marie-Louise d'Artois", fr: "Marie-Louise d'Artois", en: "Marie-Louise d'Artois", es: "Marie-Louise d'Artois", vls: "Marie-Louise d'Artois", pcd: "Marie-Louise d'Artois", de: "Marie-Louise d'Artois" },
      { nl: "Maria-Theresia Vanderheeren", fr: "Maria-Theresia Vanderheeren", en: "Maria-Theresia Vanderheeren", es: "Maria-Theresia Vanderheeren", vls: "Maria-Theresia Vanderheeren", pcd: "Maria-Theresia Vanderheeren", de: "Maria-Theresia Vanderheeren" },
      { nl: "Francisca Vandewalle", fr: "Francisca Vandewalle", en: "Francisca Vandewalle", es: "Francisca Vandewalle", vls: "Francisca Vandewalle", pcd: "Francisca Vandewalle", de: "Francisca Vandewalle" },
      { nl: "Antoinette Follet", fr: "Antoinette Follet", en: "Antoinette Follet", es: "Antoinette Follet", vls: "Antoinette Follet", pcd: "Antoinette Follet", de: "Antoinette Follet" }
    ],
    correctAnswer: 1,
    explanationNl: "Maria-Theresia Vanderheeren (1870-1947) was de tweede vrouw van Emile Geldof en de moeder van Magdalena Geldof, onze grootmoeder 'Grote Meter'.",
    explanationFr: "Maria-Theresia Vanderheeren (1870-1947) était la seconde épouse d'Emile Geldof et la mère de Magdalena Geldof, notre grand-mère 'Grande Marraine'.",
    explanationEn: "Maria-Theresia Vanderheeren (1870-1947) was Emile Geldof's second wife and the mother of Magdalena Geldof, our grandmother 'Great Godmother'.",
    explanationEs: "Maria-Theresia Vanderheeren (1870-1947) era la segunda esposa de Emile Geldof y la madre de Magdalena Geldof, nuestra abuela 'Gran Madrina'.",
    explanationVls: "Maria-Theresia Vanderheeren (1870-1947) was de twêede vrouwe van Emile Geldof en de moeder van Magdalena Geldof, onze grôotmoeder 'Grôote Meter'.",
    explanationPcd: "Maria-Theresia Vanderheeren (1870-1947) étot l'deuxième femme d'Emile Geldof et l'mère ed' Magdalena Geldof, note grand-mère 'Grand'Mérin'.",
    explanationDe: "Maria-Theresia Vanderheeren (1870-1947) war die zweite Frau von Emile Geldof und die Mutter von Magdalena Geldof, unserer Großmutter 'Große Patentante'."
  },
  {
    id: 42,
    questionNl: "Welke zoon van Emile Geldof was oud-strijder WO.1 en Vuurkruiser?",
    questionFr: "Quel fils d'Emile Geldof était ancien combattant de la Première Guerre mondiale et Croix de Feu?",
    questionEn: "Which son of Emile Geldof was a WWI veteran and Fire Cross recipient?",
    questionEs: "¿Qué hijo de Emile Geldof era veterano de la Primera Guerra Mundial y Cruz de Fuego?",
    questionVls: "Welke zeune van Emile Geldof was oud-stryders WO.1 en Vuurkruuser?",
    questionPcd: "Quoé fils d'Emile Geldof étot ancien combattant d'el Preumière Guerre mondiale et Croé d'Feu?",
    questionDe: "Welcher Sohn von Emile Geldof war Veteran des Ersten Weltkriegs und Feuerkreuzträger?",
    options: [
      { nl: "Maurice Geldof", fr: "Maurice Geldof", en: "Maurice Geldof", es: "Maurice Geldof", vls: "Maurice Geldof", pcd: "Maurice Geldof", de: "Maurice Geldof" },
      { nl: "Joseph Geldof", fr: "Joseph Geldof", en: "Joseph Geldof", es: "Joseph Geldof", vls: "Joseph Geldof", pcd: "Joseph Geldof", de: "Joseph Geldof" },
      { nl: "Emile Geldof Jr.", fr: "Emile Geldof Jr.", en: "Emile Geldof Jr.", es: "Emile Geldof Jr.", vls: "Emile Geldof Jr.", pcd: "Emile Geldof Jr.", de: "Emile Geldof Jr." },
      { nl: "Henri Geldof", fr: "Henri Geldof", en: "Henri Geldof", es: "Henri Geldof", vls: "Henri Geldof", pcd: "Henri Geldof", de: "Henri Geldof" }
    ],
    correctAnswer: 1,
    explanationNl: "Joseph Geldof (1894-1966) was oud-strijder WO.1, Vuurkruiser en Ridder in de Orde van Leopold II. Hij was de oudste zoon van Emile en Maria-Theresia.",
    explanationFr: "Joseph Geldof (1894-1966) était ancien combattant de la Première Guerre mondiale, Croix de Feu et Chevalier de l'Ordre de Léopold II. Il était le fils aîné d'Emile et Maria-Theresia.",
    explanationEn: "Joseph Geldof (1894-1966) was a WWI veteran, Fire Cross recipient and Knight of the Order of Leopold II. He was the eldest son of Emile and Maria-Theresia.",
    explanationEs: "Joseph Geldof (1894-1966) era veterano de la Primera Guerra Mundial, Cruz de Fuego y Caballero de la Orden de Leopoldo II. Era el hijo mayor de Emile y Maria-Theresia.",
    explanationVls: "Joseph Geldof (1894-1966) was oud-stryders WO.1, Vuurkruuser en Ridder in de Orde van Leopold II. Hy was de oudste zeune van Emile en Maria-Theresia.",
    explanationPcd: "Joseph Geldof (1894-1966) étot ancien combattant d'el Preumière Guerre mondiale, Croé d'Feu et Chevalier d'l'Ordre ed' Léopold II. I étot l'fils aîné d'Emile et Maria-Theresia.",
    explanationDe: "Joseph Geldof (1894-1966) war Veteran des Ersten Weltkriegs, Feuerkreuzträger und Ritter des Leopold-II.-Ordens. Er war der älteste Sohn von Emile und Maria-Theresia."
  },
  // Marcel Deforce & Magdalena questions
  {
    id: 43,
    questionNl: "In welk jaar maakte Marcel Deforce zijn beroemde portretkader, zijn meesterwerk?",
    questionFr: "En quelle année Marcel Deforce a-t-il créé son célèbre cadre portrait, son chef-d'œuvre?",
    questionEn: "In what year did Marcel Deforce create his famous portrait frame, his masterpiece?",
    questionEs: "¿En qué año creó Marcel Deforce su famoso marco de retrato, su obra maestra?",
    questionVls: "In welk joar moakte Marcel Deforce zyn beroemd portretkader, zyn meesterwerk?",
    questionPcd: "In quelle année Marcel Deforce o-t-i créé sin célèbe cade portrait, sin chef-d'œuvre?",
    questionDe: "In welchem Jahr schuf Marcel Deforce seinen berühmten Porträtrahmen, sein Meisterwerk?",
    options: [
      { nl: "1910", fr: "1910", en: "1910", es: "1910", vls: "1910", pcd: "1910", de: "1910" },
      { nl: "1915", fr: "1915", en: "1915", es: "1915", vls: "1915", pcd: "1915", de: "1915" },
      { nl: "1918", fr: "1918", en: "1918", es: "1918", vls: "1918", pcd: "1918", de: "1918" },
      { nl: "1920", fr: "1920", en: "1920", es: "1920", vls: "1920", pcd: "1920", de: "1920" }
    ],
    correctAnswer: 1,
    explanationNl: "In 1915, op 21-jarige leeftijd, produceerde Marcel zijn eerste meesterwerk: een imposant handgesculpteerd houten portretkader in massieve eik.",
    explanationFr: "En 1915, à 21 ans, Marcel a produit son premier chef-d'œuvre : un imposant cadre portrait en bois sculpté à la main en chêne massif.",
    explanationEn: "In 1915, at the age of 21, Marcel produced his first masterpiece: an imposing hand-sculpted wooden portrait frame in solid oak.",
    explanationEs: "En 1915, a los 21 años, Marcel produjo su primera obra maestra: un imponente marco de retrato de madera tallado a mano en roble macizo.",
    explanationVls: "In 1915, op 21-joarige leeftyd, produceerde Marcel zyn eerste meesterwerk: een imposant handgesculpteerd houten portretkader in massieve êek.",
    explanationPcd: "In 1915, à 21 ans, Marcel o produit sin preumier chef-d'œuvre : un imposant cade portrait in bos sculpté à l'main in chêne massif.",
    explanationDe: "1915, im Alter von 21 Jahren, schuf Marcel sein erstes Meisterwerk: einen imposanten handgeschnitzten Porträtrahmen aus massiver Eiche."
  },
  {
    id: 44,
    questionNl: "Hoe heette de hond van grootvader Marcel?",
    questionFr: "Comment s'appelait le chien de grand-père Marcel?",
    questionEn: "What was the name of grandfather Marcel's dog?",
    questionEs: "¿Cómo se llamaba el perro del abuelo Marcel?",
    questionVls: "Hoe hiette de hond van grôotvader Marcel?",
    questionPcd: "Commint s'appelot l'quien d'grand-père Marcel?",
    questionDe: "Wie hieß der Hund von Großvater Marcel?",
    options: [
      { nl: "Bobby", fr: "Bobby", en: "Bobby", es: "Bobby", vls: "Bobby", pcd: "Bobby", de: "Bobby" },
      { nl: "Rex", fr: "Rex", en: "Rex", es: "Rex", vls: "Rex", pcd: "Rex", de: "Rex" },
      { nl: "Loeki", fr: "Loeki", en: "Loeki", es: "Loeki", vls: "Loeki", pcd: "Loeki", de: "Loeki" },
      { nl: "Max", fr: "Max", en: "Max", es: "Max", vls: "Max", pcd: "Max", de: "Max" }
    ],
    correctAnswer: 2,
    explanationNl: "Loeki was een 'nijdige keffer' die de schrik van de kleinkinderen was. De auteur werd ooit door Loeki gebeten en hield daar nog bijna 40 jaar angst voor honden aan over.",
    explanationFr: "Loeki était un 'petit chien hargneux' qui faisait peur aux petits-enfants. L'auteur a été mordu par Loeki et a gardé une peur des chiens pendant près de 40 ans.",
    explanationEn: "Loeki was a 'snappy little dog' who scared the grandchildren. The author was once bitten by Loeki and kept a fear of dogs for nearly 40 years.",
    explanationEs: "Loeki era un 'perro pequeño mordedor' que asustaba a los nietos. El autor fue mordido por Loeki y mantuvo un miedo a los perros durante casi 40 años.",
    explanationVls: "Loeki was e 'nydig kefferke' die de schrik van de kleinkindern was. De auteur wierd ooit deur Loeki gebeten en hield doar nog byna 40 joar angst vôo honden oan over.",
    explanationPcd: "Loeki étot eun 'tiot quien hargneux' qui faisot peur à chés tiots-éfants. L'auteur o été mordu par Loeki et o gardé eune peur des quiens pendant près d'40 ans.",
    explanationDe: "Loeki war ein 'bissiger kleiner Hund', der den Enkeln Angst machte. Der Autor wurde einmal von Loeki gebissen und behielt fast 40 Jahre lang Angst vor Hunden."
  },
  {
    id: 45,
    questionNl: "Wanneer trouwden Marcel Deforce en Magdalena Geldof?",
    questionFr: "Quand Marcel Deforce et Magdalena Geldof se sont-ils mariés?",
    questionEn: "When did Marcel Deforce and Magdalena Geldof get married?",
    questionEs: "¿Cuándo se casaron Marcel Deforce y Magdalena Geldof?",
    questionVls: "Wanneer trouwdn Marcel Deforce en Magdalena Geldof?",
    questionPcd: "Quand Marcel Deforce et Magdalena Geldof s'ont-i mariés?",
    questionDe: "Wann heirateten Marcel Deforce und Magdalena Geldof?",
    options: [
      { nl: "9 januari 1915", fr: "9 janvier 1915", en: "January 9, 1915", es: "9 de enero de 1915", vls: "9 januari 1915", pcd: "9 janvier 1915", de: "9. Januar 1915" },
      { nl: "9 januari 1918", fr: "9 janvier 1918", en: "January 9, 1918", es: "9 de enero de 1918", vls: "9 januari 1918", pcd: "9 janvier 1918", de: "9. Januar 1918" },
      { nl: "9 januari 1920", fr: "9 janvier 1920", en: "January 9, 1920", es: "9 de enero de 1920", vls: "9 januari 1920", pcd: "9 janvier 1920", de: "9. Januar 1920" },
      { nl: "9 januari 1923", fr: "9 janvier 1923", en: "January 9, 1923", es: "9 de enero de 1923", vls: "9 januari 1923", pcd: "9 janvier 1923", de: "9. Januar 1923" }
    ],
    correctAnswer: 1,
    explanationNl: "Marcel Deforce en Madeleine Geldof trouwden op 9 januari 1918. Hun eerste dochter Maria werd geboren op 23 oktober 1918.",
    explanationFr: "Marcel Deforce et Madeleine Geldof se sont mariés le 9 janvier 1918. Leur première fille Maria est née le 23 octobre 1918.",
    explanationEn: "Marcel Deforce and Madeleine Geldof got married on January 9, 1918. Their first daughter Maria was born on October 23, 1918.",
    explanationEs: "Marcel Deforce y Madeleine Geldof se casaron el 9 de enero de 1918. Su primera hija Maria nació el 23 de octubre de 1918.",
    explanationVls: "Marcel Deforce en Madeleine Geldof trouwdn op 9 januari 1918. Hunder eerste dochter Maria wierd geboarn op 23 oktober 1918.",
    explanationPcd: "Marcel Deforce et Madeleine Geldof s'ont mariés l'9 janvier 1918. Leu preumière fille Maria est née l'23 octobe 1918.",
    explanationDe: "Marcel Deforce und Madeleine Geldof heirateten am 9. Januar 1918. Ihre erste Tochter Maria wurde am 23. Oktober 1918 geboren."
  },
  {
    id: 46,
    questionNl: "Hoeveel kinderen kregen Marcel en Magdalena Geldof?",
    questionFr: "Combien d'enfants Marcel et Magdalena Geldof ont-ils eu?",
    questionEn: "How many children did Marcel and Magdalena Geldof have?",
    questionEs: "¿Cuántos hijos tuvieron Marcel y Magdalena Geldof?",
    questionVls: "Hoeveel kinders kreegn Marcel en Magdalena Geldof?",
    questionPcd: "Combin d'éfants Marcel et Magdalena Geldof ont-i eu?",
    questionDe: "Wie viele Kinder hatten Marcel und Magdalena Geldof?",
    options: [
      { nl: "8 kinderen", fr: "8 enfants", en: "8 children", es: "8 hijos", vls: "8 kinders", pcd: "8 éfants", de: "8 Kinder" },
      { nl: "10 kinderen", fr: "10 enfants", en: "10 children", es: "10 hijos", vls: "10 kinders", pcd: "10 éfants", de: "10 Kinder" },
      { nl: "12 kinderen", fr: "12 enfants", en: "12 children", es: "12 hijos", vls: "12 kinders", pcd: "12 éfants", de: "12 Kinder" },
      { nl: "14 kinderen", fr: "14 enfants", en: "14 children", es: "14 hijos", vls: "14 kinders", pcd: "14 éfants", de: "14 Kinder" }
    ],
    correctAnswer: 2,
    explanationNl: "Marcel en Magdalena kregen 12 kinderen, waarvan 10 de volwassen leeftijd bereikten. Uit deze 4 generaties kwamen 112 nakomelingen.",
    explanationFr: "Marcel et Magdalena ont eu 12 enfants, dont 10 ont atteint l'âge adulte. Ces 4 générations ont donné 112 descendants.",
    explanationEn: "Marcel and Magdalena had 12 children, of which 10 reached adulthood. From these 4 generations came 112 descendants.",
    explanationEs: "Marcel y Magdalena tuvieron 12 hijos, de los cuales 10 llegaron a la edad adulta. De estas 4 generaciones vinieron 112 descendientes.",
    explanationVls: "Marcel en Magdalena kreegn 12 kinders, woarvan 10 de volwassn leeftyd bereiktn. Uut deze 4 generaties kwoamn 112 nakomelingen.",
    explanationPcd: "Marcel et Magdalena ont eu 12 éfants, dont 10 ont atteint l'âge adulte. Chés 4 génératieons ont donné 112 descindinds.",
    explanationDe: "Marcel und Magdalena hatten 12 Kinder, von denen 10 das Erwachsenenalter erreichten. Aus diesen 4 Generationen kamen 112 Nachkommen."
  },
  {
    id: 47,
    questionNl: "Waar diende Marcel Deforce tijdens zijn legerdienst na WO1?",
    questionFr: "Où Marcel Deforce a-t-il servi pendant son service militaire après la Première Guerre mondiale?",
    questionEn: "Where did Marcel Deforce serve during his military service after WWI?",
    questionEs: "¿Dónde sirvió Marcel Deforce durante su servicio militar después de la Primera Guerra Mundial?",
    questionVls: "Woar diênde Marcel Deforce tydns zyn légerdiênst na WO1?",
    questionPcd: "Oùsqu'Marcel Deforce o-t-i servi pendant sin service militaire après el Preumière Guerre mondiale?",
    questionDe: "Wo diente Marcel Deforce während seines Militärdienstes nach dem Ersten Weltkrieg?",
    options: [
      { nl: "In België", fr: "En Belgique", en: "In Belgium", es: "En Bélgica", vls: "In België", pcd: "In Belgique", de: "In Belgien" },
      { nl: "In Frankrijk", fr: "En France", en: "In France", es: "En Francia", vls: "In Frankryk", pcd: "In France", de: "In Frankreich" },
      { nl: "In Duitsland", fr: "En Allemagne", en: "In Germany", es: "En Alemania", vls: "In Duutsland", pcd: "In Allemagne", de: "In Deutschland" },
      { nl: "In Nederland", fr: "Aux Pays-Bas", en: "In the Netherlands", es: "En los Países Bajos", vls: "In Nêerland", pcd: "In Pays-Bas", de: "In den Niederlanden" }
    ],
    correctAnswer: 2,
    explanationNl: "Marcel diende in Duitsland bij de Belgische bezettingsmacht, als 'paardenmeester' bij het 6e Regiment Artillerie. Zijn actieve dienst eindigde in juni 1920.",
    explanationFr: "Marcel a servi en Allemagne avec les forces d'occupation belges, comme 'maître de chevaux' au 6e Régiment d'Artillerie. Son service actif s'est terminé en juin 1920.",
    explanationEn: "Marcel served in Germany with the Belgian occupation forces, as 'horse master' with the 6th Regiment of Artillery. His active service ended in June 1920.",
    explanationEs: "Marcel sirvió en Alemania con las fuerzas de ocupación belgas, como 'maestro de caballos' en el 6º Regimiento de Artillería. Su servicio activo terminó en junio de 1920.",
    explanationVls: "Marcel diênde in Duutsland by de Belgische bezettingsmacht, ols 'peerdenmeester' by t 6e Regiment Artillerie. Zyn actieve diênst eindigde in juni 1920.",
    explanationPcd: "Marcel o servi in Allemagne avuc les forces d'occupateon belges, comme 'maîte d'ch'vaux' au 6e Régimint d'Artillerie. Sin service actif s'est terminé in juin 1920.",
    explanationDe: "Marcel diente in Deutschland bei den belgischen Besatzungstruppen als 'Pferdemeister' beim 6. Artillerieregiment. Sein aktiver Dienst endete im Juni 1920."
  },
  {
    id: 48,
    questionNl: "Hoe noemde de auteur zijn twee grootmoeders om ze te onderscheiden?",
    questionFr: "Comment l'auteur appelait-il ses deux grand-mères pour les distinguer?",
    questionEn: "How did the author call his two grandmothers to distinguish them?",
    questionEs: "¿Cómo llamaba el autor a sus dos abuelas para distinguirlas?",
    questionVls: "Hoe noemde de auteur zyn twêe grôotmoeders om ze te onderscheiden?",
    questionPcd: "Commint l'auteur appelot-i ses deux grand-mères pour les distinguer?",
    questionDe: "Wie nannte der Autor seine beiden Großmütter, um sie zu unterscheiden?",
    options: [
      { nl: "Oma 1 en Oma 2", fr: "Mémé 1 et Mémé 2", en: "Grandma 1 and Grandma 2", es: "Abuela 1 y Abuela 2", vls: "Oma 1 en Oma 2", pcd: "Mémé 1 et Mémé 2", de: "Oma 1 und Oma 2" },
      { nl: "Grote Meter en Kleine Meter", fr: "Grande Marraine et Petite Marraine", en: "Great Godmother and Little Godmother", es: "Gran Madrina y Pequeña Madrina", vls: "Grôote Meter en Kleine Meter", pcd: "Grand'Mérin et Tite Mérin", de: "Große Patentante und Kleine Patentante" },
      { nl: "Mémé en Pépé", fr: "Mémé et Pépé", en: "Granny and Grandpa", es: "Abuelita y Abuelito", vls: "Mémé en Pépé", pcd: "Mémé et Pépé", de: "Omi und Opi" },
      { nl: "Bomma en Vava", fr: "Bonne-maman et Grand-père", en: "Grandma and Grandpa", es: "Abuela y Abuelo", vls: "Bomma en Vava", pcd: "Bonne-maman et Grand-père", de: "Großmutter und Großvater" }
    ],
    correctAnswer: 1,
    explanationNl: "Magdalena werd 'Grote Meter' genoemd omdat ze statig en streng was, terwijl de andere grootmoeder 'Kleine Meter' werd genoemd vanwege haar zachtere karakter.",
    explanationFr: "Magdalena était appelée 'Grande Marraine' car elle était majestueuse et stricte, tandis que l'autre grand-mère était appelée 'Petite Marraine' en raison de son caractère plus doux.",
    explanationEn: "Magdalena was called 'Great Godmother' because she was stately and stern, while the other grandmother was called 'Little Godmother' due to her gentler character.",
    explanationEs: "Magdalena era llamada 'Gran Madrina' porque era majestuosa y estricta, mientras que la otra abuela era llamada 'Pequeña Madrina' debido a su carácter más gentil.",
    explanationVls: "Magdalena wierd 'Grôote Meter' genoemd omdak ze statig en streng was, terwyl de andere grôotmoeder 'Kleine Meter' wierd genoemd vanwege hoar zachter karakter.",
    explanationPcd: "Magdalena étot appelée 'Grand'Mérin' pasqu'ale étot majestueuse et stricte, tandis qu'l'aute grand-mère étot appelée 'Tite Mérin' à cause d'sin caractère pus doux.",
    explanationDe: "Magdalena wurde 'Große Patentante' genannt, weil sie stattlich und streng war, während die andere Großmutter 'Kleine Patentante' genannt wurde wegen ihres sanfteren Charakters."
  },
  {
    id: 49,
    questionNl: "Wat was het beroep van de ouders van Emile Geldof?",
    questionFr: "Quel était le métier des parents d'Emile Geldof?",
    questionEn: "What was the profession of Emile Geldof's parents?",
    questionEs: "¿Cuál era la profesión de los padres de Emile Geldof?",
    questionVls: "Wat was t beroep van de ouders van Emile Geldof?",
    questionPcd: "Quoé étot l'métier des parinds d'Emile Geldof?",
    questionDe: "Was war der Beruf von Emile Geldofs Eltern?",
    options: [
      { nl: "Smid en bakster", fr: "Forgeron et boulangère", en: "Blacksmith and baker", es: "Herrero y panadera", vls: "Smid en bakster", pcd: "Forgeron et boulangière", de: "Schmied und Bäckerin" },
      { nl: "Wever en naaister", fr: "Tisserand et couturière", en: "Weaver and seamstress", es: "Tejedor y costurera", vls: "Weever en naaister", pcd: "Tisserand et couturière", de: "Weber und Näherin" },
      { nl: "Landbouwer en spinster", fr: "Agriculteur et fileuse", en: "Farmer and spinner", es: "Agricultor e hiladora", vls: "Landbouwer en spinster", pcd: "Agriculteur et fileuse", de: "Landwirt und Spinnerin" },
      { nl: "Timmerman en wasvrouw", fr: "Charpentier et lavandière", en: "Carpenter and washerwoman", es: "Carpintero y lavandera", vls: "Timmerman en wasvrouwe", pcd: "Carpintier et lavandière", de: "Zimmermann und Waschfrau" }
    ],
    correctAnswer: 1,
    explanationNl: "De vader van Emile, Jan ('Joannes') Geldof, was wever en zijn moeder was naaister. Ze werkten als kleine zelfstandigen zonder sociale zekerheid.",
    explanationFr: "Le père d'Emile, Jan ('Joannes') Geldof, était tisserand et sa mère était couturière. Ils travaillaient comme petits indépendants sans sécurité sociale.",
    explanationEn: "Emile's father, Jan ('Joannes') Geldof, was a weaver and his mother was a seamstress. They worked as small independents without social security.",
    explanationEs: "El padre de Emile, Jan ('Joannes') Geldof, era tejedor y su madre era costurera. Trabajaban como pequeños independientes sin seguridad social.",
    explanationVls: "De vader van Emile, Jan ('Joannes') Geldof, was weever en zyn moeder was naaister. Ze werktn ols kleine zelfstandign zonder sociale zekerheid.",
    explanationPcd: "L'père d'Emile, Jan ('Joannes') Geldof, étot tisserand et s'mère étot couturière. I travailloétent comme tiots indépindints sans sécurité sociale.",
    explanationDe: "Emiles Vater, Jan ('Joannes') Geldof, war Weber und seine Mutter war Näherin. Sie arbeiteten als kleine Selbstständige ohne Sozialversicherung."
  },
  {
    id: 50,
    questionNl: "Naar welk adres verhuisden Marcel en Magdalena in 1923?",
    questionFr: "À quelle adresse Marcel et Magdalena ont-ils déménagé en 1923?",
    questionEn: "To which address did Marcel and Magdalena move in 1923?",
    questionEs: "¿A qué dirección se mudaron Marcel y Magdalena en 1923?",
    questionVls: "Noar welk adres verhuusdn Marcel en Magdalena in 1923?",
    questionPcd: "À quelle adresse Marcel et Magdalena ont-i déménagé in 1923?",
    questionDe: "An welche Adresse zogen Marcel und Magdalena 1923?",
    options: [
      { nl: "Bosmolens 15, Izegem", fr: "Bosmolens 15, Izegem", en: "Bosmolens 15, Izegem", es: "Bosmolens 15, Izegem", vls: "Bosmolens 15, Izegem", pcd: "Bosmolens 15, Izegem", de: "Bosmolens 15, Izegem" },
      { nl: "Vanden Bogaardelaan 25, Izegem", fr: "Vanden Bogaardelaan 25, Izegem", en: "Vanden Bogaardelaan 25, Izegem", es: "Vanden Bogaardelaan 25, Izegem", vls: "Vanden Bogaardelaan 25, Izegem", pcd: "Vanden Bogaardelaan 25, Izegem", de: "Vanden Bogaardelaan 25, Izegem" },
      { nl: "Marktplein 10, Izegem", fr: "Place du Marché 10, Izegem", en: "Market Square 10, Izegem", es: "Plaza del Mercado 10, Izegem", vls: "Marktplein 10, Izegem", pcd: "Place du Marché 10, Izegem", de: "Marktplatz 10, Izegem" },
      { nl: "Vijfwegen 8, Emelgem", fr: "Vijfwegen 8, Emelgem", en: "Vijfwegen 8, Emelgem", es: "Vijfwegen 8, Emelgem", vls: "Vyfwegen 8, Emelgem", pcd: "Vijfwegen 8, Emelgem", de: "Vijfwegen 8, Emelgem" }
    ],
    correctAnswer: 1,
    explanationNl: "In 1923 verhuisde het gezin naar Burgermeester Van Den Bogaerdelaan 25 in Izegem, met een voortuin en een atelier (zijn 'werkwinkel') achter het huis.",
    explanationFr: "En 1923, la famille a déménagé au Burgermeester Van Den Bogaerdelaan 25 à Izegem, avec un jardin devant et un atelier (sa 'werkwinkel') derrière la maison.",
    explanationEn: "In 1923, the family moved to Burgermeester Van Den Bogaerdelaan 25 in Izegem, with a front garden and a workshop (his 'werkwinkel') behind the house.",
    explanationEs: "En 1923, la familia se mudó a Burgermeester Van Den Bogaerdelaan 25 en Izegem, con un jardín delantero y un taller (su 'werkwinkel') detrás de la casa.",
    explanationVls: "In 1923 verhuusde t gezin noar Burgermeester Van Den Bogaerdelaan 25 in Izegem, mee e vôortuin en een atelier (zyn 'werkwinkel') achter t huus.",
    explanationPcd: "In 1923, el famille o déménagé au Burgermeester Van Den Bogaerdelaan 25 à Izegem, avuc un jardin devant et un atelier (sin 'werkwinkel') derrière el maison.",
    explanationDe: "1923 zog die Familie in die Burgermeester Van Den Bogaerdelaan 25 in Izegem, mit einem Vorgarten und einer Werkstatt (seiner 'werkwinkel') hinter dem Haus."
  }
];

const QUESTION_TIME = 20;

const Quiz = () => {
  const { language } = useLanguage();
  const { unlockAchievement, setQuizBestScore, addScore } = useGame();
  const { playSuccessSound, playErrorSound, playAchievementSound } = useAchievementSound();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(boolean | null)[]>(new Array(questions.length).fill(null));
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [bonusPoints, setBonusPoints] = useState(0);

  // Unlock quiz_starter achievement when quiz starts
  const startQuiz = () => {
    setQuizStarted(true);
    unlockAchievement('quiz_starter');
  };

  // Check for quiz_meester when quiz is completed
  useEffect(() => {
    if (quizCompleted) {
      const percentage = (score / questions.length) * 100;
      setQuizBestScore(score);
      addScore(score * 10 + bonusPoints);
      
      if (percentage === 100) {
        playAchievementSound();
        unlockAchievement('quiz_meester');
      } else if (percentage >= 70) {
        playSuccessSound();
      }
    }
  }, [quizCompleted, score, bonusPoints, playAchievementSound, playSuccessSound]);

  useEffect(() => {
    if (!quizStarted || showExplanation || quizCompleted) return;

    if (timeLeft <= 0) {
      handleTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizStarted, showExplanation, quizCompleted]);

  const handleTimeUp = useCallback(() => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = false;
    setAnswers(newAnswers);
    setShowExplanation(true);
  }, [answers, currentQuestion]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = isCorrect;
    setAnswers(newAnswers);
    
    if (isCorrect) {
      playSuccessSound();
      setScore(score + 1);
      if (timeLeft > 15) {
        setBonusPoints(bonusPoints + 3);
      } else if (timeLeft > 10) {
        setBonusPoints(bonusPoints + 2);
      } else if (timeLeft > 5) {
        setBonusPoints(bonusPoints + 1);
      }
    } else {
      playErrorSound();
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(QUESTION_TIME);
    } else {
      setQuizCompleted(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setAnswers(new Array(questions.length).fill(null));
    setQuizCompleted(false);
    setQuizStarted(false);
    setTimeLeft(QUESTION_TIME);
    setBonusPoints(0);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) {
      return {
        nl: "Uitstekend! Je bent een echte Deforce-expert! 🏆",
        fr: "Excellent! Vous êtes un véritable expert Deforce! 🏆",
        en: "Excellent! You are a true Deforce expert! 🏆",
        es: "¡Excelente! ¡Eres un verdadero experto Deforce! 🏆",
        vls: "Uutstekend! Je bent e echte Deforce-expert! 🏆",
        pcd: "Excellint! Vous êtes un vrai expert Deforce! 🏆",
        de: "Ausgezeichnet! Du bist ein echter Deforce-Experte! 🏆"
      };
    } else if (percentage >= 80) {
      return {
        nl: "Zeer goed! Je kent de familiegeschiedenis uitstekend!",
        fr: "Très bien! Vous connaissez très bien l'histoire familiale!",
        en: "Very good! You know the family history excellently!",
        es: "¡Muy bien! ¡Conoces excelentemente la historia familiar!",
        vls: "Zeer goed! Je kent de familiegeschiedenisse uutstekend!",
        pcd: "Très bin! Vous connéssez très bin l'histoére familiale!",
        de: "Sehr gut! Du kennst die Familiengeschichte ausgezeichnet!"
      };
    } else if (percentage >= 60) {
      return {
        nl: "Goed gedaan! Je hebt een goede basis!",
        fr: "Bien joué! Vous avez une bonne base!",
        en: "Well done! You have a good foundation!",
        es: "¡Bien hecho! ¡Tienes una buena base!",
        vls: "Goed gedoan! Je èt e goede basis!",
        pcd: "Bin joué! Vous avez eune bonne base!",
        de: "Gut gemacht! Du hast eine gute Grundlage!"
      };
    } else if (percentage >= 40) {
      return {
        nl: "Niet slecht! Lees de website nog eens door voor meer details.",
        fr: "Pas mal! Relisez le site pour plus de détails.",
        en: "Not bad! Read the website again for more details.",
        es: "¡No está mal! Lee el sitio web de nuevo para más detalles.",
        vls: "Nie slecht! Lees de website nog e kee deur vôo mee details.",
        pcd: "Pas mau! Relisez l'site pour pus d'détails.",
        de: "Nicht schlecht! Lies die Website noch einmal für mehr Details."
      };
    } else {
      return {
        nl: "Je kunt nog veel leren over de Deforce geschiedenis!",
        fr: "Vous pouvez encore apprendre beaucoup sur l'histoire des Deforce!",
        en: "You can still learn a lot about the Deforce history!",
        es: "¡Todavía puedes aprender mucho sobre la historia de los Deforce!",
        vls: "Je kunt nog vele leern over de Deforce geschiedenisse!",
        pcd: "Vous pouvez incô apprinde biaucop su l'histoére des Deforce!",
        de: "Du kannst noch viel über die Deforce-Geschichte lernen!"
      };
    }
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-yellow-500";
    if (percentage >= 40) return "text-orange-500";
    return "text-red-500";
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const getText = (texts: { nl: string; fr: string; en: string; es: string; vls?: string; pcd?: string; de?: string }) => {
    if (language === "nl") return texts.nl;
    if (language === "en") return texts.en;
    if (language === "es") return texts.es;
    if (language === "de" && texts.de) return texts.de;
    if (language === "vls" && texts.vls) return texts.vls;
    if (language === "pcd" && texts.pcd) return texts.pcd;
    return texts.fr;
  };

  const getQuestion = (q: Question) => {
    if (language === "nl") return q.questionNl;
    if (language === "en") return q.questionEn;
    if (language === "es") return q.questionEs;
    if (language === "de" && q.questionDe) return q.questionDe;
    if (language === "vls" && q.questionVls) return q.questionVls;
    if (language === "pcd" && q.questionPcd) return q.questionPcd;
    return q.questionFr;
  };

  const getOption = (opt: { nl: string; fr: string; en: string; es: string; vls?: string; pcd?: string; de?: string }) => {
    if (language === "nl") return opt.nl;
    if (language === "en") return opt.en;
    if (language === "es") return opt.es;
    if (language === "de" && opt.de) return opt.de;
    if (language === "vls" && opt.vls) return opt.vls;
    if (language === "pcd" && opt.pcd) return opt.pcd;
    return opt.fr;
  };

  const getExplanation = (q: Question) => {
    if (language === "nl") return q.explanationNl;
    if (language === "en") return q.explanationEn;
    if (language === "es") return q.explanationEs;
    if (language === "de" && q.explanationDe) return q.explanationDe;
    if (language === "vls" && q.explanationVls) return q.explanationVls;
    if (language === "pcd" && q.explanationPcd) return q.explanationPcd;
    return q.explanationFr;
  };

  return (
    <section id="quiz" className="py-20 px-4 bg-gradient-to-b from-background to-muted/30" aria-labelledby="quiz-heading">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Award className="h-8 w-8 text-primary" aria-hidden="true" />
            <h2 id="quiz-heading" className="text-3xl md:text-4xl font-bold text-primary">
              {getText({ nl: "Test je kennis", fr: "Testez vos connaissances", en: "Test your knowledge", es: "Pon a prueba tus conocimientos", vls: "Test je kenisse", pcd: "Testez vos connéssances", de: "Teste dein Wissen" })}
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {getText({ 
              nl: "Hoe goed ken je de geschiedenis van de familie Deforce? Beantwoord deze vragen en ontdek het!",
              fr: "Connaissez-vous bien l'histoire de la famille Deforce? Répondez à ces questions et découvrez-le!",
              en: "How well do you know the history of the Deforce family? Answer these questions and find out!",
              es: "¿Qué tan bien conoces la historia de la familia Deforce? ¡Responde estas preguntas y descúbrelo!",
              vls: "Hoe goed kenste de geschiedenisse van de familie Deforce? Beantwoord deze vroagn en ontdekt het!",
              pcd: "Connéssez-vous bin l'histoére d'el famille Deforce? Répondez à ches quèsteons et découvrez-le!",
              de: "Wie gut kennst du die Geschichte der Familie Deforce? Beantworte diese Fragen und finde es heraus!"
            })}
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!quizStarted ? (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/20" role="region" aria-label={getText({ nl: "Quiz introductie", fr: "Introduction du quiz", en: "Quiz introduction", es: "Introducción del cuestionario", vls: "Quiz introductie", pcd: "Introduction du quiz", de: "Quiz Einführung" })}>
                <Trophy className="h-16 w-16 mx-auto mb-6 text-primary" aria-hidden="true" />
                <h3 className="text-2xl font-bold mb-4">
                  {getText({ nl: "Klaar om te beginnen?", fr: "Prêt à commencer?", en: "Ready to start?", es: "¿Listo para comenzar?", vls: "Klaar om te beginnn?", pcd: "Prêt à commincher?", de: "Bereit zu starten?" })}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {getText({
                    nl: `Deze quiz bevat ${questions.length} vragen over de familiegeschiedenis.`,
                    fr: `Ce quiz contient ${questions.length} questions sur l'histoire familiale.`,
                    en: `This quiz contains ${questions.length} questions about the family history.`,
                    es: `Este cuestionario contiene ${questions.length} preguntas sobre la historia familiar.`,
                    vls: `Deze quiz bevat ${questions.length} vroagn over de familiegeschiedenisse.`,
                    pcd: `Chest quiz contient ${questions.length} quèsteons su l'histoére familiale.`,
                    de: `Dieses Quiz enthält ${questions.length} Fragen zur Familiengeschichte.`
                  })}
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {getText({
                      nl: `${QUESTION_TIME} seconden per vraag`,
                      fr: `${QUESTION_TIME} secondes par question`,
                      en: `${QUESTION_TIME} seconds per question`,
                      es: `${QUESTION_TIME} segundos por pregunta`,
                      vls: `${QUESTION_TIME} secondn per vroage`,
                      pcd: `${QUESTION_TIME} secontes par quèsteon`,
                      de: `${QUESTION_TIME} Sekunden pro Frage`
                    })}
                  </span>
                  <span className="mx-2" aria-hidden="true">•</span>
                  <Zap className="h-4 w-4 text-yellow-500" aria-hidden="true" />
                  <span>
                    {getText({
                      nl: "Bonuspunten voor snelle antwoorden!",
                      fr: "Points bonus pour les réponses rapides!",
                      en: "Bonus points for fast answers!",
                      es: "¡Puntos extra por respuestas rápidas!",
                      vls: "Bonuspuntn vôo snelle antwoordn!",
                      pcd: "Points bonus pour les réponses rapides!",
                      de: "Bonuspunkte für schnelle Antworten!"
                    })}
                  </span>
                </div>
                <Button
                  onClick={startQuiz}
                  size="lg"
                  className="gap-2"
                  aria-label={getText({ nl: "Start de quiz", fr: "Commencer le quiz", en: "Start the quiz", es: "Iniciar el cuestionario", vls: "Start de quiz", pcd: "Commincher l'quiz", de: "Quiz starten" })}
                >
                  {getText({ nl: "Start de quiz", fr: "Commencer le quiz", en: "Start the quiz", es: "Iniciar el cuestionario", vls: "Start de quiz", pcd: "Commincher l'quiz", de: "Quiz starten" })}
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </Button>
              </Card>
            </motion.div>
          ) : quizCompleted ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/20" role="region" aria-label={getText({ nl: "Quiz resultaten", fr: "Résultats du quiz", en: "Quiz results", es: "Resultados del cuestionario", vls: "Quiz resultaatn", pcd: "Résultats du quiz", de: "Quiz-Ergebnisse" })}>
                <div className="text-center mb-8">
                  <Trophy className={`h-20 w-20 mx-auto mb-4 ${getScoreColor()}`} aria-hidden="true" />
                  <h3 className="text-3xl font-bold mb-2">
                    {getText({ nl: "Quiz voltooid!", fr: "Quiz terminé!", en: "Quiz completed!", es: "¡Cuestionario completado!", vls: "Quiz gedoan!", pcd: "Quiz terminé!", de: "Quiz abgeschlossen!" })}
                  </h3>
                  <p className={`text-2xl font-bold ${getScoreColor()}`} role="status" aria-live="polite">
                    {score} / {questions.length}
                  </p>
                  {bonusPoints > 0 && (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <Zap className="h-5 w-5 text-yellow-500" aria-hidden="true" />
                      <span className="text-yellow-500 font-medium">
                        +{bonusPoints} {getText({ nl: "bonuspunten", fr: "points bonus", en: "bonus points", es: "puntos extra", vls: "bonuspuntn", pcd: "points bonus", de: "Bonuspunkte" })}
                      </span>
                    </div>
                  )}
                  <p className="text-muted-foreground mt-2">
                    {getText(getScoreMessage())}
                  </p>
                </div>

                <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-8">
                  {answers.map((answer, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        answer === true
                          ? "bg-green-500/20 text-green-500 border border-green-500/50"
                          : "bg-red-500/20 text-red-500 border border-red-500/50"
                      }`}
                    >
                      {index + 1}
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-center gap-2 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <Star
                        className={`h-8 w-8 ${
                          i < Math.ceil((score / questions.length) * 5)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                <div className="text-center">
                  <Button onClick={resetQuiz} variant="outline" className="gap-2">
                    <RotateCcw className="h-4 w-4" />
                    {getText({ nl: "Opnieuw proberen", fr: "Réessayer", en: "Try again", es: "Intentar de nuevo", vls: "Nog e kee", pcd: "Essayer co eune fos", de: "Erneut versuchen" })}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="p-6 md:p-8 bg-card/80 backdrop-blur-sm border-primary/20">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className={`h-5 w-5 ${timeLeft <= 5 ? "text-red-500 animate-pulse" : "text-primary"}`} />
                      <span className={`font-bold text-lg ${timeLeft <= 5 ? "text-red-500" : "text-foreground"}`}>
                        {timeLeft}s
                      </span>
                    </div>
                    {!showExplanation && timeLeft > 15 && (
                      <div className="flex items-center gap-1 text-sm text-yellow-500">
                        <Zap className="h-4 w-4" />
                        <span>+3</span>
                      </div>
                    )}
                    {!showExplanation && timeLeft <= 15 && timeLeft > 10 && (
                      <div className="flex items-center gap-1 text-sm text-yellow-500/70">
                        <Zap className="h-4 w-4" />
                        <span>+2</span>
                      </div>
                    )}
                    {!showExplanation && timeLeft <= 10 && timeLeft > 5 && (
                      <div className="flex items-center gap-1 text-sm text-yellow-500/50">
                        <Zap className="h-4 w-4" />
                        <span>+1</span>
                      </div>
                    )}
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${
                        timeLeft <= 5 ? "bg-red-500" : timeLeft <= 10 ? "bg-orange-500" : "bg-primary"
                      }`}
                      initial={{ width: "100%" }}
                      animate={{ width: `${(timeLeft / QUESTION_TIME) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>
                      {getText({ nl: "Vraag", fr: "Question", en: "Question", es: "Pregunta", vls: "Vroage", pcd: "Quèsteon", de: "Frage" })} {currentQuestion + 1} / {questions.length}
                    </span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <h3 className="text-xl md:text-2xl font-semibold mb-6">
                  {getQuestion(questions[currentQuestion])}
                </h3>

                <div className="space-y-3 mb-6" role="radiogroup" aria-label={getText({ nl: "Antwoordopties", fr: "Options de réponse", en: "Answer options", es: "Opciones de respuesta", vls: "Antwoordopties", pcd: "Options d'réponse", de: "Antwortoptionen" })}>
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      role="radio"
                      aria-checked={selectedAnswer === index}
                      aria-label={`${String.fromCharCode(65 + index)}: ${getOption(option)}${showExplanation && index === questions[currentQuestion].correctAnswer ? ` - ${getText({ nl: "Correct antwoord", fr: "Bonne réponse", en: "Correct answer", es: "Respuesta correcta", vls: "Correct antwoord", pcd: "Bonne réponse", de: "Richtige Antwort" })}` : ''}${showExplanation && selectedAnswer === index && index !== questions[currentQuestion].correctAnswer ? ` - ${getText({ nl: "Fout antwoord", fr: "Mauvaise réponse", en: "Wrong answer", es: "Respuesta incorrecta", vls: "Fout antwoord", pcd: "Mauvaise réponse", de: "Falsche Antwort" })}` : ''}`}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        showExplanation
                          ? index === questions[currentQuestion].correctAnswer
                            ? "border-green-500 bg-green-500/10"
                            : selectedAnswer === index
                            ? "border-red-500 bg-red-500/10"
                            : "border-border/50 opacity-50"
                          : selectedAnswer === index
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary/50 hover:bg-muted/50"
                      }`}
                      whileHover={!showExplanation ? { scale: 1.01 } : {}}
                      whileTap={!showExplanation ? { scale: 0.99 } : {}}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
                          showExplanation
                            ? index === questions[currentQuestion].correctAnswer
                              ? "border-green-500 text-green-500"
                              : selectedAnswer === index
                              ? "border-red-500 text-red-500"
                              : "border-border text-muted-foreground"
                            : selectedAnswer === index
                            ? "border-primary text-primary"
                            : "border-border text-muted-foreground"
                        }`} aria-hidden="true">
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="flex-1">
                          {getOption(option)}
                        </span>
                        {showExplanation && index === questions[currentQuestion].correctAnswer && (
                          <CheckCircle className="h-6 w-6 text-green-500" aria-hidden="true" />
                        )}
                        {showExplanation && selectedAnswer === index && index !== questions[currentQuestion].correctAnswer && (
                          <XCircle className="h-6 w-6 text-red-500" aria-hidden="true" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-6"
                    >
                      <div className={`p-4 rounded-lg ${
                        selectedAnswer === questions[currentQuestion].correctAnswer
                          ? "bg-green-500/10 border border-green-500/30"
                          : "bg-red-500/10 border border-red-500/30"
                      }`}>
                        <p className="text-sm">
                          {getExplanation(questions[currentQuestion])}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-end gap-3">
                  {!showExplanation ? (
                    <Button
                      onClick={handleConfirmAnswer}
                      disabled={selectedAnswer === null}
                      className="gap-2"
                    >
                      {getText({ nl: "Bevestigen", fr: "Confirmer", en: "Confirm", es: "Confirmar", vls: "Bevestign", pcd: "Confirmer", de: "Bestätigen" })}
                    </Button>
                  ) : (
                    <Button onClick={handleNextQuestion} className="gap-2">
                      {currentQuestion < questions.length - 1
                        ? getText({ nl: "Volgende vraag", fr: "Question suivante", en: "Next question", es: "Siguiente pregunta", vls: "Volgende vroage", pcd: "Quèsteon suivante", de: "Nächste Frage" })
                        : getText({ nl: "Bekijk resultaat", fr: "Voir le résultat", en: "View result", es: "Ver resultado", vls: "Bekiek resultaat", pcd: "Voér l'résultat", de: "Ergebnis ansehen" })}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </Card>

              <div className="flex justify-center gap-2 mt-6" role="group" aria-label={getText({ nl: `Voortgang: vraag ${currentQuestion + 1} van ${questions.length}`, fr: `Progression: question ${currentQuestion + 1} sur ${questions.length}`, en: `Progress: question ${currentQuestion + 1} of ${questions.length}`, es: `Progreso: pregunta ${currentQuestion + 1} de ${questions.length}`, vls: `Voortgang: vroage ${currentQuestion + 1} van ${questions.length}`, pcd: `Progression: quèsteon ${currentQuestion + 1} su ${questions.length}`, de: `Fortschritt: Frage ${currentQuestion + 1} von ${questions.length}` })}>
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentQuestion
                        ? "bg-primary scale-125"
                        : answers[index] === true
                        ? "bg-green-500"
                        : answers[index] === false
                        ? "bg-red-500"
                        : "bg-muted-foreground/30"
                    }`}
                    aria-label={`${getText({ nl: "Vraag", fr: "Question", en: "Question", es: "Pregunta", vls: "Vroage", pcd: "Quèsteon", de: "Frage" })} ${index + 1}: ${index === currentQuestion ? getText({ nl: "huidige vraag", fr: "question actuelle", en: "current question", es: "pregunta actual", vls: "huidige vroage", pcd: "quèsteon actuelle", de: "aktuelle Frage" }) : answers[index] === true ? getText({ nl: "correct beantwoord", fr: "répondu correctement", en: "answered correctly", es: "respondido correctamente", vls: "correct beantwoord", pcd: "répondu correctemint", de: "richtig beantwortet" }) : answers[index] === false ? getText({ nl: "fout beantwoord", fr: "répondu incorrectement", en: "answered incorrectly", es: "respondido incorrectamente", vls: "fout beantwoord", pcd: "répondu incorrectemint", de: "falsch beantwortet" }) : getText({ nl: "nog niet beantwoord", fr: "pas encore répondu", en: "not yet answered", es: "aún no respondido", vls: "nog nie beantwoord", pcd: "pas incô répondu", de: "noch nicht beantwortet" })}`}
                    role="img"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Quiz;
