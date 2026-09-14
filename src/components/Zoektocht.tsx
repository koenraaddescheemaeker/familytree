import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
const familyBranchesNL = [
  {
    name: "Jacobus Franciscus Delforge",
    years: "1694 – 1772",
    description:
      "Stamvader van onze vaderlijke lijn. Trouwde op 30 april 1718 te Izegem met Veronica Barbier. Overleed in Ardooie. Geboortegegevens onbekend.",
  },
  {
    name: "Albert Delforge",
    years: "? – 1752",
    description:
      "Getrouwd te Ingelmunster op 18 april 1719 met Judoca Reynaert. Geboorteplaats nergens te bekennen.",
  },
  {
    name: "Hubert Delforge",
    years: "1662 – 1729",
    description:
      "Geboortegegevens lang onvindbaar. Gehuwd met Isabella De Man te Izegem op 12 augustus 1721. De sleutel tot het grote raadsel.",
  },
];

const familyBranchesFR = [
  {
    name: "Jacobus Franciscus Delforge",
    years: "1694 – 1772",
    description:
      "Ancêtre fondateur de notre lignée paternelle. Marié le 30 avril 1718 à Izegem avec Veronica Barbier. Décédé à Ardooie. Données de naissance inconnues.",
  },
  {
    name: "Albert Delforge",
    years: "? – 1752",
    description:
      "Marié à Ingelmunster le 18 avril 1719 avec Judoca Reynaert. Lieu de naissance introuvable.",
  },
  {
    name: "Hubert Delforge",
    years: "1662 – 1729",
    description:
      "Données de naissance longtemps introuvables. Marié avec Isabella De Man à Izegem le 12 août 1721. La clé de la grande énigme.",
  },
];

const familyBranchesPCD = [
  {
    name: "Jacobus Franciscus Delforge",
    years: "1694 – 1772",
    description:
      "Grand-père éd note ligne paternelle. Marié l' 30 avri 1718 à Izegem aveuc Veronica Barbier. Mort à Ardooie. Naissance inconnue.",
  },
  {
    name: "Albert Delforge",
    years: "? – 1752",
    description:
      "Marié à Ingelmunster l' 18 avri 1719 aveuc Judoca Reynaert. Plache éd naissance introuvabe.",
  },
  {
    name: "Hubert Delforge",
    years: "1662 – 1729",
    description:
      "Naissance longtemps introuvabe. Marié aveuc Isabella De Man à Izegem l' 12 août 1721. L' clé du grand mystère.",
  },
];

const familyBranchesVLS = [
  {
    name: "Jacobus Franciscus Delforge",
    years: "1694 – 1772",
    description:
      "Stamvader van uuze vaderlike lien. Trouwde op 30 april 1718 te Izegem me Veronica Barbier. Overleed in Ardooie. Geboartegegevns onbekend.",
  },
  {
    name: "Albert Delforge",
    years: "? – 1752",
    description:
      "Getrouwd te Ingelmunster op 18 april 1719 me Judoca Reynaert. Geboarteploatse nerges te bekennen.",
  },
  {
    name: "Hubert Delforge",
    years: "1662 – 1729",
    description:
      "Geboartegegevns lank onvindboar. Gehuwd me Isabella De Man te Izegem op 12 augustus 1721. De sleutel tot t grôote raodsel.",
  },
];

const familyBranchesEN = [
  {
    name: "Jacobus Franciscus Delforge",
    years: "1694 – 1772",
    description:
      "Patriarch of our paternal line. Married on April 30, 1718 in Izegem to Veronica Barbier. Died in Ardooie. Birth data unknown.",
  },
  {
    name: "Albert Delforge",
    years: "? – 1752",
    description:
      "Married in Ingelmunster on April 18, 1719 to Judoca Reynaert. Birthplace nowhere to be found.",
  },
  {
    name: "Hubert Delforge",
    years: "1662 – 1729",
    description:
      "Birth data long untraceable. Married Isabella De Man in Izegem on August 12, 1721. The key to the great puzzle.",
  },
];

const familyBranchesDE = [
  {
    name: "Jacobus Franciscus Delforge",
    years: "1694 – 1772",
    description:
      "Stammvater unserer väterlichen Linie. Heiratete am 30. April 1718 in Izegem Veronica Barbier. Gestorben in Ardooie. Geburtsdaten unbekannt.",
  },
  {
    name: "Albert Delforge",
    years: "? – 1752",
    description:
      "Verheiratet in Ingelmunster am 18. April 1719 mit Judoca Reynaert. Geburtsort nirgends zu finden.",
  },
  {
    name: "Hubert Delforge",
    years: "1662 – 1729",
    description:
      "Geburtsdaten lange unauffindbar. Verheiratet mit Isabella De Man in Izegem am 12. August 1721. Der Schlüssel zum großen Rätsel.",
  },
];

const familyBranchesES = [
  {
    name: "Jacobus Franciscus Delforge",
    years: "1694 – 1772",
    description:
      "Patriarca de nuestra línea paterna. Se casó el 30 de abril de 1718 en Izegem con Veronica Barbier. Murió en Ardooie. Datos de nacimiento desconocidos.",
  },
  {
    name: "Albert Delforge",
    years: "? – 1752",
    description:
      "Casado en Ingelmunster el 18 de abril de 1719 con Judoca Reynaert. Lugar de nacimiento imposible de encontrar.",
  },
  {
    name: "Hubert Delforge",
    years: "1662 – 1729",
    description:
      "Datos de nacimiento largo tiempo imposibles de rastrear. Casado con Isabella De Man en Izegem el 12 de agosto de 1721. La clave del gran misterio.",
  },
];

const lineage = [
  { name: "Jacobus Franciscus Deleforge", years: "1694 – 1772" },
  { name: "Georgius Delforce", years: "1731 – 1807" },
  { name: "Petrus Augustinus Delforge", years: "1773 – 1840" },
  { name: "Jean François Deforche", years: "1815 – 1871" },
  { name: "Charles Louis Deforce", years: "1857 – 1938" },
  { name: "Marcel August Deforce", years: "1894 – 1963" },
];

const Zoektocht = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const familyBranches = language === 'en' ? familyBranchesEN : language === 'de' ? familyBranchesDE : language === 'es' ? familyBranchesES : language === 'vls' ? familyBranchesVLS : language === 'pcd' ? familyBranchesPCD : language === 'fr' ? familyBranchesFR : familyBranchesNL;
  
  const readMoreLabels = {
    nl: { more: "Lees meer", less: "Lees minder" },
    fr: { more: "Lire plus", less: "Lire moins" },
    en: { more: "Read more", less: "Read less" },
    de: { more: "Mehr lesen", less: "Weniger lesen" },
    es: { more: "Leer más", less: "Leer menos" },
    pcd: { more: "Lire pus", less: "Lire moins" },
    vls: { more: "Lees mêer", less: "Lees minder" },
  };
  
  const labels = readMoreLabels[language as keyof typeof readMoreLabels] || readMoreLabels.nl;

  const contentNL = {
    p1: "De eerste onderzoeken in Izegem, Emelgem en omliggende dorpen brachten al snel vele Deforce-namen aan het licht. In de registers van de Burgerlijke Stand werden de directe voorouders van grootvader Marcel gevonden. Maar al snel doken er problemen op:",
    p1Italic: "wie hoorde bij wie? En wie stamde van wie af?",
    p2: 'De familienaam kwam in maar liefst negentien varianten voor — Delforge, Delforce, Deforche, Deforce, en nog veertien andere. Net als Nonkel Lucien eerder, liep het onderzoek vast op drie familietakken, elk met een stamvader en -moeder, kinderen, kleinkinderen — maar zonder enige evidente link tussen de drie groepen.',
    p3: 'De zoektocht begon bij de Burgerlijke Stand, opgericht na de Franse Revolutie in 1792. De akten van geboorte, huwelijk en overlijden — nauwkeurig bijgehouden door ambtenaren — vormden het startpunt. Maar al snel werd duidelijk dat we verder terug moesten: naar de parochieregisters van voor 1792, waar pastoors in soms moeilijk leesbaar handschrift de dopen, huwelijken en begrafenissen noteerden.',
    p4: 'De parochieregisters van Izegem, Emelgem, Ingelmunster en Ardooie werden systematisch doorgenomen. In elk dorp doken dezelfde problemen op: namen die anders werden gespeld, akten die ontbraken, handschriften die onleesbaar waren. Soms was een akte beschadigd door vocht of brand; soms ontbrak een heel register.',
    p5: 'Naast de parochieregisters werden ook de staten van goed geraadpleegd — de inventarissen die werden opgemaakt bij een overlijden, waarin alle bezittingen van de overledene werden opgesomd. Deze documenten gaven vaak waardevolle informatie over familierelaties, beroepen en bezittingen.',
    p6: 'De doorbraak kwam toen we de grens overstaken. In de Archives Départementales du Nord te Lille vonden we akten die het verhaal compleet maakten: huwelijkscontracten, erfenisverdelingen, en vooral — verkoopakten waarin onze voorouders eigendom overdroegen voordat ze naar het noorden vertrokken.',
    p7: 'De sleutel tot het raadsel lag in een notariële akte uit 1699. Daarin verkocht Hubert Deleforge, samen met zijn vrouw Antoinette Follet, een stuk grond in Hallennes-lez-Haubourdin. In de akte werd vermeld dat Hubert de zoon was van een andere Hubert Deleforge en Marie Grimbel. En — cruciaal — dat hij afkomstig was uit "Hemelgem", de oude spelling van Emelgem.',
    eureka1: 'De doorbraak kwam via enkele Geneanet-contacten. Samen werden de doopakten van de kinderen in de drie takken geanalyseerd en vastgesteld dat de ouders beurtelings peter en meter waren van elkaars kinderen — een duidelijk teken van nauwe verwantschap.',
    eureka2: 'In de Index op het Izegems parochieregister stond bij het overlijden van "Antonia Foullez" op 19 april 1729 de vermelding:',
    eureka2Quote: '"Vr(ouw van) Delforce Hubertus"',
    eureka2End: '. Meer was er niet. Maar het was genoeg om te weten dat Hubert Delforge getrouwd was geweest met iemand die "Foullez" of "Follet" heette.',
    eureka3: 'En toen verscheen er, ergens diep in een Franse lijst, één naam met één cruciale notitie:',
    eureka3Quote: '"ex Hemelgem"',
    eureka3End: ' naast Hubert Deleforge. Deze notitie leidde naar de Archives Départementales du Nord. Daar stond het: een verkoopakte uit 1699 waarin Hubert Deleforge, zoon van een andere Hubert, uit Emelgem vermeld werd.',
    eureka4: 'De puzzel viel in elkaar. De drie familietakken — die van Jacobus Franciscus, die van Albert, en die van de jongere Hubert — bleken alle drie terug te gaan op dezelfde stamouders: Hubert Deleforge en Antoinette Follet, die in 1685 in Lille waren getrouwd en rond 1699 naar Izegem waren gemigreerd.',
    eureka5: 'De verkoopakte van 1699 was het bewijs. Daarin verkocht het echtpaar Deleforge-Follet hun eigendom in Hallennes voordat ze naar het noorden trokken. De akte vermeldde expliciet de namen van Huberts ouders en zijn geboorteplaats. Na jaren zoeken was de connectie eindelijk gemaakt.',
  };

  const contentFR = {
    p1: "Les premières recherches à Izegem, Emelgem et les villages environnants ont rapidement révélé de nombreux noms Deforce. Dans les registres de l'État Civil, les ancêtres directs du grand-père Marcel ont été trouvés. Mais très vite, des problèmes sont apparus :",
    p1Italic: "qui appartenait à qui ? Et qui descendait de qui ?",
    p2: "Le nom de famille apparaissait dans pas moins de dix-neuf variantes — Delforge, Delforce, Deforche, Deforce, et quatorze autres. Comme l'Oncle Lucien avant nous, la recherche s'est heurtée à trois branches familiales, chacune avec un ancêtre et une mère, des enfants, des petits-enfants — mais sans aucun lien évident entre les trois groupes.",
    p3: "La recherche a commencé à l'État Civil, créé après la Révolution française en 1792. Les actes de naissance, de mariage et de décès — soigneusement tenus par les fonctionnaires — constituaient le point de départ. Mais il est vite devenu clair que nous devions remonter plus loin : vers les registres paroissiaux d'avant 1792, où les curés notaient les baptêmes, mariages et enterrements dans une écriture parfois difficile à lire.",
    p4: "Les registres paroissiaux d'Izegem, Emelgem, Ingelmunster et Ardooie ont été systématiquement examinés. Dans chaque village, les mêmes problèmes surgissaient : des noms orthographiés différemment, des actes manquants, des écritures illisibles. Parfois un acte était endommagé par l'humidité ou le feu ; parfois un registre entier manquait.",
    p5: "En plus des registres paroissiaux, les états de biens ont également été consultés — les inventaires dressés lors d'un décès, énumérant tous les biens du défunt. Ces documents fournissaient souvent des informations précieuses sur les relations familiales, les professions et les possessions.",
    p6: "La percée est venue quand nous avons franchi la frontière. Aux Archives Départementales du Nord à Lille, nous avons trouvé des actes qui complétaient l'histoire : contrats de mariage, partages de succession, et surtout — des actes de vente où nos ancêtres transféraient leurs propriétés avant de partir vers le nord.",
    p7: "La clé de l'énigme se trouvait dans un acte notarié de 1699. Hubert Deleforge, avec sa femme Antoinette Follet, y vendait un terrain à Hallennes-lez-Haubourdin. L'acte mentionnait que Hubert était le fils d'un autre Hubert Deleforge et de Marie Grimbel. Et — crucial — qu'il était originaire de \"Hemelgem\", l'ancienne orthographe d'Emelgem.",
    eureka1: "La percée est venue via quelques contacts Geneanet. Ensemble, les actes de baptême des enfants dans les trois branches ont été analysés et il a été établi que les parents étaient alternativement parrain et marraine des enfants des autres — un signe clair de parenté étroite.",
    eureka2: "Dans l'Index du registre paroissial d'Izegem, lors du décès d'\"Antonia Foullez\" le 19 avril 1729, la mention :",
    eureka2Quote: '"Vr(ouw van) Delforce Hubertus"',
    eureka2End: ". C'était tout. Mais c'était suffisant pour savoir que Hubert Delforge avait été marié à quelqu'un qui s'appelait \"Foullez\" ou \"Follet\".",
    eureka3: "Et puis, quelque part au fond d'une liste française, un nom est apparu avec une note cruciale :",
    eureka3Quote: '"ex Hemelgem"',
    eureka3End: " à côté de Hubert Deleforge. Cette note a mené aux Archives Départementales du Nord. Là, c'était écrit : un acte de vente de 1699 mentionnant Hubert Deleforge, fils d'un autre Hubert, d'Emelgem.",
    eureka4: "Le puzzle s'est assemblé. Les trois branches familiales — celle de Jacobus Franciscus, celle d'Albert, et celle du jeune Hubert — remontaient toutes aux mêmes ancêtres fondateurs : Hubert Deleforge et Antoinette Follet, qui s'étaient mariés à Lille en 1685 et avaient migré vers Izegem vers 1699.",
    eureka5: "L'acte de vente de 1699 était la preuve. Le couple Deleforge-Follet y vendait leur propriété à Hallennes avant de partir vers le nord. L'acte mentionnait explicitement les noms des parents de Hubert et son lieu de naissance. Après des années de recherche, la connexion était enfin établie.",
  };

  const contentPCD = {
    p1: "Les preumières richerches à Izegem, Emelgem pi les villages autour ont vite monté gramint d' noms Deforce. Dins les registres d' l'État Civil, les anchêtes directs du grand-père Marcel ont té trouvés. Mé tertous vite, des problèmes sont v'nus :",
    p1Italic: "qui qu'appartenot à qui ? Pi qui qu' d'chindot d' qui ?",
    p2: "L' nom d' famile apparissot dins pus d' dix-neu variantes — Delforge, Delforce, Deforche, Deforce, pi quatorze eutes. Comme l' Nonke Lucien avant nous, l' richerche s'est plantée su trois branches familiales, chacune aveuc un anchête pi eune mère, des éfants, des p'tits-éfants — mé sans aucun lien évident intre les trois groupes.",
    p3: "L' richerche a commincé à l'État Civil, créé après l' Révolution française in 1792. Les actes éd naissance, éd mariage pi éd décès — soigneusemint t'nus par les fonctionnaires — formeient l' point d' départ. Mé i l'est vite d'v'nu clair qu' on devot remonter pus loin : vers les registres paroissiaux d'avant 1792, ousque les curés noteient les baptêmes, mariages pi intérremints dins eune écriture parfos dure à lire.",
    p4: "Les registres paroissiaux d'Izegem, Emelgem, Ingelmunster pi Ardooie ont té systématiquemint r'gardés. Dins chaque village, les mêmes problèmes arriveient : des noms écris autremint, des actes qui manqueient, des écritures illisibles. Des fos un acte étot abîmé par l'humidité ou l' feu ; des fos un registre intier manquot.",
    p5: "In pus des registres paroissiaux, les états d' biens ont ossi té consultés — les inventaires drissés quand quéqu'un mourot, listant tous les biens du défunt. Ces documints donneient souvint des informations précieuses su les rilations familiales, les métiers pi les possessions.",
    p6: "L' percée est v'nue quand on a passé l' frontière. Aux Archives Départementales du Nord à Lile, on a trouvé des actes qui compléteient l'histouère : contrats d' mariage, partages d' succession, pi surtout — des actes d' vinte ousque nos anchêtes transféraient leus propriétés avant d' partir vers l' nord.",
    p7: "L' clé d' l'énigme s' trouvot dins un acte notarié d' 1699. Hubert Deleforge, aveuc s' femme Antoinette Follet, y vindot un terrain à Hallennes-lez-Haubourdin. L'acte mentionnot qu' Hubert étot l' fils d'un eute Hubert Deleforge pi d' Marie Grimbel. Pi — crucial — qu'i v'not d' \"Hemelgem\", l'anchienne orthographe d'Emelgem.",
    eureka1: "L' percée est v'nue via quéques contacts Geneanet. Insane, les actes d' baptême des éfants dins les trois branches ont té analysés pi i l'a té établi qu' les parints éteient alternativemint parrain pi marraine des éfants des eutes — un signe clair d' parenté étroite.",
    eureka2: "Dins l'Index du registre paroissial d'Izegem, lors du décès d'\"Antonia Foullez\" l' 19 avri 1729, l' mintion :",
    eureka2Quote: '"Vr(ouw van) Delforce Hubertus"',
    eureka2End: ". Ch'étot tout. Mé ch'étot assez pour savoér qu' Hubert Delforge avot té marié à quéqu'un qui s'appelot \"Foullez\" ou \"Follet\".",
    eureka3: "Pi pis, quéque part au fond d'eune liste française, un nom est apparu aveuc eune note cruciale :",
    eureka3Quote: '"ex Hemelgem"',
    eureka3End: " à côté d' Hubert Deleforge. Chete note a mené aux Archives Départementales du Nord. Là, ch'étot écrit : un acte d' vinte d' 1699 mintionnant Hubert Deleforge, fils d'un eute Hubert, d'Emelgem.",
    eureka4: "L' puzzle s'est assamblé. Les trois branches familiales — chele éd Jacobus Franciscus, chele d'Albert, pi chele du jeune Hubert — remonteient toutes aux mêmes anchêtes fondateurs : Hubert Deleforge pi Antoinette Follet, qui s'éteient mariés à Lile in 1685 pi aveient migré vers Izegem vers 1699.",
    eureka5: "L'acte d' vinte d' 1699 étot l' preuve. L' couple Deleforge-Follet y vindot leu propriété à Hallennes avant d' partir vers l' nord. L'acte mintionnot explicitemint les noms des parints d' Hubert pi s' plache éd naissance. Après des années d' richerche, l' connexion étot enfin établie.",
  };

  const contentVLS = {
    p1: "De eerste onderzoeken in Izegem, Emelgem en omliggende dorpn brogtegen ol gauw vele Deforce-noamen an t licht. In de registers van de Burgerlike Stand wierden de directe vôorouders van grôotvader Marcel gevonden. Mor ol gauw doken der problemen op:",
    p1Italic: "wie hoorde by wie? En wie stamde van wie of?",
    p2: "De familienoame kwam in mor liefst negentien varianten vôore — Delforge, Delforce, Deforche, Deforce, en nog veertien ândre. Just gelyk Nonkel Lucien eerder, liep t onderzoek vast op drie familietakn, elk me e stamvader en -moeder, kinders, kleinkinders — mor zonder enige evidente link tussen de drie groepn.",
    p3: "De zoektocht begost by de Burgerlike Stand, opgerecht no de Franse Revolusje in 1792. De aktn van geboarte, huweliek en overlyen — nauwkeurig bygehouden deur ambtenoars — vormden t startpunt. Mor ol gauw wierd dudelik da we verder terug mosten: noar de paroachieregisters van vôo 1792, woar pastoors in soms moelik leesboar hândschrift de dopn, huweliekn en begroafenissen noteerden.",
    p4: "De paroachieregisters van Izegem, Emelgem, Ingelmunster en Ardooie wierden systematisch deurgekeken. In elk dorp doken dezelfste problemen op: noamen die ânders wierden gespeld, aktn die ontbroakn, hândschriftn die onleesboar woaren. Soms was e akte beschoadigd deur vocht of brand; soms ontbrak e heel register.",
    p5: "Noast de paroachieregisters wierden ook de stoatn van goed geroaadpleegd — de inventarissen die wierden opgemaakt by e overlyen, woarin ol de bezittingen van de overledene wierden opgesomd. Deze dokumentn goavn dikwils weerdevôlle informoasje over familieraloasjes, beroepen en bezittingen.",
    p6: "De deurbroke kwam toen we de grens overstakn. In de Archives Départementales du Nord te Rysel vondn we aktn die t verhoal compleet moaktn: huweliekskontraktn, erfenisverdeelingen, en vôoral — verkoopaktn woarin uuze vôorouders eigendom overdroegen vôorda ze noar t noorden trokn.",
    p7: "De sleutel tot t raodsel lag in e notariële akte uut 1699. Doarin verkocht Hubert Deleforge, soamen me zyn vrouwe Antoinette Follet, e stuk grônd in Hallennes-lez-Haubourdin. In de akte wierd vermeld da Hubert de zeune was van e ândre Hubert Deleforge en Marie Grimbel. En — cruciaal — da e ofkomstig was uut 'Hemelgem', de oude spelling van Emelgem.",
    eureka1: "De deurbroke kwam via enkele Geneanet-kontaktn. Soamen wierden de doopaktn van de kinders in de drie takn geanaliseerd en vastgesteld da de ouders beurtelings peter en meter woaren van mekanders kinders — e dudelik teken van nauwe verwântschap.",
    eureka2: "In de Index op t Izegemse paroachieregister stond by t overlyen van 'Antonia Foullez' op 19 april 1729 de vermeldinge:",
    eureka2Quote: '"Vr(ouw van) Delforce Hubertus"',
    eureka2End: ". Meer was der nie. Mor t was genoeg om te weetn da Hubert Delforge getrouwd was geweest me iemand die 'Foullez' of 'Follet' hiette.",
    eureka3: "En toen verscheen der, erges diep in e Franse liest, ene noame me ene cruciale notoasje:",
    eureka3Quote: '"ex Hemelgem"',
    eureka3End: " noast Hubert Deleforge. Deze notoasje leidde noar de Archives Départementales du Nord. Doar stond het: e verkoopakte uut 1699 woarin Hubert Deleforge, zeune van e ândre Hubert, uut Emelgem vermeld wierd.",
    eureka4: "De puzzel viel in mekoar. De drie familietakn — die van Jacobus Franciscus, die van Albert, en die van de joengere Hubert — bleekn ol drie terug te goan op dezelfste stamouders: Hubert Deleforge en Antoinette Follet, die in 1685 in Rysel woaren getrouwd en round 1699 noar Izegem woaren gemigreerd.",
    eureka5: "De verkoopakte van 1699 was t bewys. Doarin verkocht t echtpoar Deleforge-Follet ulder eigendom in Hallennes vôorda ze noar t noorden trokn. De akte vermeldde expliciet de noamen van Huberts ouders en zyn geboarteploatse. No joaren zoekn was de konneksje eindelik gemaakt.",
  };

  const contentEN = {
    p1: "The first investigations in Izegem, Emelgem and surrounding villages quickly revealed many Deforce names. In the Civil Registry records, the direct ancestors of grandfather Marcel were found. But soon problems emerged:",
    p1Italic: "who belonged to whom? And who descended from whom?",
    p2: "The family name appeared in no fewer than nineteen variants — Delforge, Delforce, Deforche, Deforce, and fourteen others. Like Uncle Lucien before us, the research got stuck on three family branches, each with a patriarch and matriarch, children, grandchildren — but without any obvious link between the three groups.",
    p3: "The search began with the Civil Registry, established after the French Revolution in 1792. The birth, marriage, and death certificates — carefully maintained by officials — formed the starting point. But it soon became clear that we had to go further back: to the parish registers from before 1792, where priests recorded baptisms, marriages, and burials in sometimes difficult-to-read handwriting.",
    p4: "The parish registers of Izegem, Emelgem, Ingelmunster, and Ardooie were systematically reviewed. In each village, the same problems arose: names spelled differently, missing records, illegible handwriting. Sometimes a record was damaged by moisture or fire; sometimes an entire register was missing.",
    p5: "In addition to the parish registers, the estate inventories were also consulted — the inventories drawn up at death, listing all the possessions of the deceased. These documents often provided valuable information about family relationships, occupations, and possessions.",
    p6: "The breakthrough came when we crossed the border. In the Archives Départementales du Nord in Lille, we found records that completed the story: marriage contracts, inheritance divisions, and above all — sales deeds in which our ancestors transferred property before moving north.",
    p7: "The key to the puzzle lay in a notarial deed from 1699. In it, Hubert Deleforge, together with his wife Antoinette Follet, sold a piece of land in Hallennes-lez-Haubourdin. The deed mentioned that Hubert was the son of another Hubert Deleforge and Marie Grimbel. And — crucially — that he came from 'Hemelgem', the old spelling of Emelgem.",
    eureka1: "The breakthrough came through some Geneanet contacts. Together, the baptismal records of the children in the three branches were analyzed and it was established that the parents were alternately godfather and godmother of each other's children — a clear sign of close kinship.",
    eureka2: "In the Index of the Izegem parish register, at the death of 'Antonia Foullez' on April 19, 1729, the notation:",
    eureka2Quote: '"Vr(ouw van) Delforce Hubertus"',
    eureka2End: ". That was all. But it was enough to know that Hubert Delforge had been married to someone named 'Foullez' or 'Follet'.",
    eureka3: "And then, somewhere deep in a French list, one name appeared with one crucial notation:",
    eureka3Quote: '"ex Hemelgem"',
    eureka3End: " next to Hubert Deleforge. This notation led to the Archives Départementales du Nord. There it was: a sales deed from 1699 mentioning Hubert Deleforge, son of another Hubert, from Emelgem.",
    eureka4: "The puzzle fell into place. The three family branches — that of Jacobus Franciscus, that of Albert, and that of the younger Hubert — all turned out to go back to the same founding ancestors: Hubert Deleforge and Antoinette Follet, who had married in Lille in 1685 and migrated to Izegem around 1699.",
    eureka5: "The sales deed of 1699 was the proof. In it, the Deleforge-Follet couple sold their property in Hallennes before moving north. The deed explicitly mentioned the names of Hubert's parents and his birthplace. After years of searching, the connection was finally made.",
  };

  const contentDE = {
    p1: "Die ersten Untersuchungen in Izegem, Emelgem und den umliegenden Dörfern brachten schnell viele Deforce-Namen ans Licht. In den Standesamtsregistern wurden die direkten Vorfahren von Großvater Marcel gefunden. Aber bald traten Probleme auf:",
    p1Italic: "wer gehörte zu wem? Und wer stammte von wem ab?",
    p2: "Der Familienname erschien in nicht weniger als neunzehn Varianten — Delforge, Delforce, Deforche, Deforce, und vierzehn weitere. Wie Onkel Lucien vor uns, stieß die Forschung auf drei Familienzweige, jeder mit einem Stammvater und einer Stammmutter, Kindern, Enkeln — aber ohne offensichtliche Verbindung zwischen den drei Gruppen.",
    p3: "Die Suche begann beim Standesamt, das nach der Französischen Revolution 1792 eingerichtet wurde. Die Geburts-, Heirats- und Sterbeurkunden — sorgfältig von Beamten geführt — bildeten den Ausgangspunkt. Aber bald wurde klar, dass wir weiter zurückgehen mussten: zu den Pfarrregistern vor 1792, wo Priester Taufen, Hochzeiten und Begräbnisse in manchmal schwer lesbarer Handschrift notierten.",
    p4: "Die Pfarrregister von Izegem, Emelgem, Ingelmunster und Ardooie wurden systematisch durchgesehen. In jedem Dorf traten dieselben Probleme auf: Namen, die anders geschrieben wurden, fehlende Urkunden, unleserliche Handschriften. Manchmal war eine Urkunde durch Feuchtigkeit oder Feuer beschädigt; manchmal fehlte ein ganzes Register.",
    p5: "Neben den Pfarrregistern wurden auch die Nachlassinventare konsultiert — die Inventare, die beim Tod erstellt wurden und alle Besitztümer des Verstorbenen auflisteten. Diese Dokumente lieferten oft wertvolle Informationen über Familienbeziehungen, Berufe und Besitztümer.",
    p6: "Der Durchbruch kam, als wir die Grenze überschritten. In den Archives Départementales du Nord in Lille fanden wir Urkunden, die die Geschichte vervollständigten: Eheverträge, Erbschaftsteilungen, und vor allem — Verkaufsurkunden, in denen unsere Vorfahren Eigentum übertrugen, bevor sie nach Norden zogen.",
    p7: "Der Schlüssel zum Rätsel lag in einer notariellen Urkunde aus 1699. Darin verkaufte Hubert Deleforge, zusammen mit seiner Frau Antoinette Follet, ein Stück Land in Hallennes-lez-Haubourdin. Die Urkunde erwähnte, dass Hubert der Sohn eines anderen Hubert Deleforge und Marie Grimbel war. Und — entscheidend — dass er aus 'Hemelgem' stammte, der alten Schreibweise von Emelgem.",
    eureka1: "Der Durchbruch kam über einige Geneanet-Kontakte. Gemeinsam wurden die Taufurkunden der Kinder in den drei Zweigen analysiert und festgestellt, dass die Eltern abwechselnd Pate und Patin der Kinder der anderen waren — ein deutliches Zeichen enger Verwandtschaft.",
    eureka2: "Im Index des Izegemer Pfarrregisters stand beim Tod von 'Antonia Foullez' am 19. April 1729 der Vermerk:",
    eureka2Quote: '"Vr(ouw van) Delforce Hubertus"',
    eureka2End: ". Das war alles. Aber es war genug, um zu wissen, dass Hubert Delforge mit jemandem namens 'Foullez' oder 'Follet' verheiratet gewesen war.",
    eureka3: "Und dann erschien, irgendwo tief in einer französischen Liste, ein Name mit einem entscheidenden Vermerk:",
    eureka3Quote: '"ex Hemelgem"',
    eureka3End: " neben Hubert Deleforge. Dieser Vermerk führte zu den Archives Départementales du Nord. Dort stand es: eine Verkaufsurkunde aus 1699, in der Hubert Deleforge, Sohn eines anderen Hubert, aus Emelgem erwähnt wurde.",
    eureka4: "Das Puzzle fügte sich zusammen. Die drei Familienzweige — der von Jacobus Franciscus, der von Albert, und der des jüngeren Hubert — gingen alle auf dieselben Stammeltern zurück: Hubert Deleforge und Antoinette Follet, die 1685 in Lille geheiratet hatten und um 1699 nach Izegem migriert waren.",
    eureka5: "Die Verkaufsurkunde von 1699 war der Beweis. Darin verkaufte das Ehepaar Deleforge-Follet ihren Besitz in Hallennes, bevor sie nach Norden zogen. Die Urkunde erwähnte ausdrücklich die Namen von Huberts Eltern und seinen Geburtsort. Nach Jahren der Suche war die Verbindung endlich hergestellt.",
  };

  const contentES = {
    p1: "Las primeras investigaciones en Izegem, Emelgem y los pueblos circundantes revelaron rápidamente muchos nombres Deforce. En los registros del Registro Civil, se encontraron los ancestros directos del abuelo Marcel. Pero pronto surgieron problemas:",
    p1Italic: "¿quién pertenecía a quién? ¿Y quién descendía de quién?",
    p2: "El apellido aparecía en nada menos que diecinueve variantes — Delforge, Delforce, Deforche, Deforce, y catorce más. Como el tío Lucien antes que nosotros, la investigación se atascó en tres ramas familiares, cada una con un patriarca y una matriarca, hijos, nietos — pero sin ningún vínculo obvio entre los tres grupos.",
    p3: "La búsqueda comenzó en el Registro Civil, establecido después de la Revolución Francesa en 1792. Las actas de nacimiento, matrimonio y defunción — cuidadosamente mantenidas por funcionarios — formaron el punto de partida. Pero pronto quedó claro que teníamos que retroceder más: a los registros parroquiales anteriores a 1792, donde los sacerdotes anotaban bautismos, matrimonios y entierros en una escritura a veces difícil de leer.",
    p4: "Los registros parroquiales de Izegem, Emelgem, Ingelmunster y Ardooie fueron revisados sistemáticamente. En cada pueblo surgían los mismos problemas: nombres deletreados de manera diferente, actas faltantes, escrituras ilegibles. A veces un acta estaba dañada por humedad o fuego; a veces faltaba un registro completo.",
    p5: "Además de los registros parroquiales, también se consultaron los inventarios de bienes — los inventarios elaborados tras una muerte, enumerando todas las posesiones del difunto. Estos documentos a menudo proporcionaban información valiosa sobre relaciones familiares, profesiones y posesiones.",
    p6: "El avance llegó cuando cruzamos la frontera. En los Archives Départementales du Nord en Lille, encontramos actas que completaban la historia: contratos matrimoniales, divisiones de herencia, y sobre todo — actas de venta donde nuestros ancestros transferían propiedades antes de partir hacia el norte.",
    p7: "La clave del enigma estaba en un acta notarial de 1699. En ella, Hubert Deleforge, junto con su esposa Antoinette Follet, vendía un terreno en Hallennes-lez-Haubourdin. El acta mencionaba que Hubert era hijo de otro Hubert Deleforge y Marie Grimbel. Y — crucialmente — que provenía de 'Hemelgem', la antigua ortografía de Emelgem.",
    eureka1: "El avance llegó a través de algunos contactos de Geneanet. Juntos, se analizaron las actas de bautismo de los niños en las tres ramas y se estableció que los padres eran alternativamente padrino y madrina de los hijos de los otros — una clara señal de parentesco cercano.",
    eureka2: "En el Índice del registro parroquial de Izegem, en la muerte de 'Antonia Foullez' el 19 de abril de 1729, la anotación:",
    eureka2Quote: '"Vr(ouw van) Delforce Hubertus"',
    eureka2End: ". Eso era todo. Pero fue suficiente para saber que Hubert Delforge había estado casado con alguien llamada 'Foullez' o 'Follet'.",
    eureka3: "Y entonces, en algún lugar profundo de una lista francesa, apareció un nombre con una anotación crucial:",
    eureka3Quote: '"ex Hemelgem"',
    eureka3End: " junto a Hubert Deleforge. Esta anotación llevó a los Archives Départementales du Nord. Allí estaba: un acta de venta de 1699 mencionando a Hubert Deleforge, hijo de otro Hubert, de Emelgem.",
    eureka4: "El rompecabezas encajó. Las tres ramas familiares — la de Jacobus Franciscus, la de Albert, y la del joven Hubert — todas resultaron remontarse a los mismos ancestros fundadores: Hubert Deleforge y Antoinette Follet, que se habían casado en Lille en 1685 y habían migrado a Izegem alrededor de 1699.",
    eureka5: "El acta de venta de 1699 fue la prueba. En ella, la pareja Deleforge-Follet vendía su propiedad en Hallennes antes de partir hacia el norte. El acta mencionaba explícitamente los nombres de los padres de Hubert y su lugar de nacimiento. Después de años de búsqueda, finalmente se hizo la conexión.",
  };

  const content = language === 'en' ? contentEN : language === 'de' ? contentDE : language === 'es' ? contentES : language === 'vls' ? contentVLS : language === 'pcd' ? contentPCD : language === 'fr' ? contentFR : contentNL;

  return (
    <section id="zoektocht" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">
            {t('zoektocht.title')}
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            {t('zoektocht.subtitle')}
          </p>
          <div className="vintage-divider mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="prose prose-lg max-w-none text-foreground/85 font-sans leading-relaxed mb-8 space-y-4"
        >
          <p>
            {content.p1}{" "}
            <em>{content.p1Italic}</em>
          </p>
          <p>
            {content.p2}
          </p>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-4 overflow-hidden"
              >
                <p>
                  {content.p3}
                </p>
                <p>
                  {content.p4}
                </p>
                <p>
                  {content.p5}
                </p>
                <p>
                  {content.p6}
                </p>
                <p>
                  {content.p7}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        <div className="flex justify-center mb-12">
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            {isExpanded ? labels.less : labels.more}
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {/* Three family branches */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {familyBranches.map((branch, index) => (
            <motion.div
              key={branch.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="bg-card p-6 rounded-lg shadow-card border border-border"
            >
              <h3 className="font-serif text-xl font-bold text-primary mb-1">
                {branch.name}
              </h3>
              <p className="font-serif text-accent italic text-sm mb-3">
                {branch.years}
              </p>
              <p className="font-sans text-sm text-foreground/75">
                {branch.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Eureka moment */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-card p-8 rounded-lg shadow-card border border-border mb-12"
        >
          <h3 className="font-serif text-2xl font-bold text-accent mb-4 text-center">
            {t('zoektocht.eureka')}
          </h3>
          <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
            <p>{content.eureka1}</p>
            <p>
              {content.eureka2}{" "}
              <span className="font-serif italic text-primary">
                {content.eureka2Quote}
              </span>
              {content.eureka2End}
            </p>
            <p>
              {content.eureka3}{" "}
              <span className="font-serif italic text-primary font-semibold">
                {content.eureka3Quote}
              </span>
              {content.eureka3End}
            </p>
            <p>{content.eureka4}</p>
            <p>{content.eureka5}</p>
          </div>
        </motion.div>

        {/* Lineage */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h3 className="font-serif text-2xl font-bold text-primary mb-6">
            {t('zoektocht.lineage')}
          </h3>
          <div className="flex flex-col items-center space-y-2">
            {lineage.map((person, index) => (
              <div key={person.name} className="flex flex-col items-center">
                <div className="bg-background px-6 py-3 rounded-lg shadow-vintage border border-border">
                  <p className="font-serif font-semibold text-primary">
                    {person.name}
                  </p>
                  <p className="font-sans text-sm text-muted-foreground">
                    {person.years}
                  </p>
                </div>
                {index < lineage.length - 1 && (
                  <div className="w-0.5 h-6 bg-accent/50" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Zoektocht;
