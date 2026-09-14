import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import AiLabel from "@/components/ui/AiLabel";
import ShareButton from "@/components/ui/ShareButton";
import ReadMore from "@/components/ui/ReadMore";
import aardappelHongersnood from "@/assets/aardappel-hongersnood.jpg";
import bedelaarsHongersnood from "@/assets/bedelaars-hongersnood.jpg";
import linnencrisis from "@/assets/linnencrisis.jpg";
import choleraEpidemie from "@/assets/cholera-epidemie.jpg";
import armeVlaamseFamilie from "@/assets/arme-vlaamse-familie.jpg";
import charlesVideo from "@/assets/charles-louis-video.mp4";
import houtsnijders1908 from "@/assets/houtsnijders-1908.jpg";
import houtsnijdersGroep from "@/assets/houtsnijders-groep.jpg";
import doodsprentje from "@/assets/doodsprentje-charles.jpg";
import mineurGenie from "@/assets/mineur-genie-1880.jpg";

const kinderenNL = [
  { naam: "Achille Cyrille", jaren: "1885", status: "†5 maanden", overleefde: false },
  { naam: "Jean François Cyrille", jaren: "1886–1955", status: "Timmerman/meubelmaker", overleefde: true },
  { naam: "Alois Constant", jaren: "1887–1893", status: "†6 jaar", overleefde: false },
  { naam: "Maria Magdalena", jaren: "1889–1970", status: '"Tante Leine"', overleefde: true },
  { naam: "Odile Camille", jaren: "1891", status: "†enkele maanden", overleefde: false },
  { naam: "Elisa Palmyre", jaren: "1893", status: "†enkele maanden", overleefde: false },
  { naam: "Marcel Deforce", jaren: "1894–1963", status: "Grootvader auteur", overleefde: true },
  { naam: "Joseph Constant", jaren: "1896–1897", status: "†baby", overleefde: false },
];

const kinderenFR = [
  { naam: "Achille Cyrille", jaren: "1885", status: "†5 mois", overleefde: false },
  { naam: "Jean François Cyrille", jaren: "1886–1955", status: "Charpentier/ébéniste", overleefde: true },
  { naam: "Alois Constant", jaren: "1887–1893", status: "†6 ans", overleefde: false },
  { naam: "Maria Magdalena", jaren: "1889–1970", status: '"Tante Leine"', overleefde: true },
  { naam: "Odile Camille", jaren: "1891", status: "†quelques mois", overleefde: false },
  { naam: "Elisa Palmyre", jaren: "1893", status: "†quelques mois", overleefde: false },
  { naam: "Marcel Deforce", jaren: "1894–1963", status: "Grand-père de l'auteur", overleefde: true },
  { naam: "Joseph Constant", jaren: "1896–1897", status: "†bébé", overleefde: false },
];

const kinderenPCD = [
  { naam: "Achille Cyrille", jaren: "1885", status: "†5 moés", overleefde: false },
  { naam: "Jean François Cyrille", jaren: "1886–1955", status: "Charpintier/ébéniste", overleefde: true },
  { naam: "Alois Constant", jaren: "1887–1893", status: "†6 ans", overleefde: false },
  { naam: "Maria Magdalena", jaren: "1889–1970", status: '"Tante Leine"', overleefde: true },
  { naam: "Odile Camille", jaren: "1891", status: "†quéques moés", overleefde: false },
  { naam: "Elisa Palmyre", jaren: "1893", status: "†quéques moés", overleefde: false },
  { naam: "Marcel Deforce", jaren: "1894–1963", status: "Grand-pére d'l'auteur", overleefde: true },
  { naam: "Joseph Constant", jaren: "1896–1897", status: "†bébé", overleefde: false },
];

const kinderenVLS = [
  { naam: "Achille Cyrille", jaren: "1885", status: "†5 moanden", overleefde: false },
  { naam: "Jean François Cyrille", jaren: "1886–1955", status: "Timmerman/meubelmoaker", overleefde: true },
  { naam: "Alois Constant", jaren: "1887–1893", status: "†6 joar", overleefde: false },
  { naam: "Maria Magdalena", jaren: "1889–1970", status: '"Tante Leine"', overleefde: true },
  { naam: "Odile Camille", jaren: "1891", status: "†enkele moanden", overleefde: false },
  { naam: "Elisa Palmyre", jaren: "1893", status: "†enkele moanden", overleefde: false },
  { naam: "Marcel Deforce", jaren: "1894–1963", status: "Grôotvader auteur", overleefde: true },
  { naam: "Joseph Constant", jaren: "1896–1897", status: "†baby", overleefde: false },
];

const kinderenEN = [
  { naam: "Achille Cyrille", jaren: "1885", status: "†5 months", overleefde: false },
  { naam: "Jean François Cyrille", jaren: "1886–1955", status: "Carpenter/cabinetmaker", overleefde: true },
  { naam: "Alois Constant", jaren: "1887–1893", status: "†6 years", overleefde: false },
  { naam: "Maria Magdalena", jaren: "1889–1970", status: '"Aunt Leine"', overleefde: true },
  { naam: "Odile Camille", jaren: "1891", status: "†few months", overleefde: false },
  { naam: "Elisa Palmyre", jaren: "1893", status: "†few months", overleefde: false },
  { naam: "Marcel Deforce", jaren: "1894–1963", status: "Author's grandfather", overleefde: true },
  { naam: "Joseph Constant", jaren: "1896–1897", status: "†baby", overleefde: false },
];

const kinderenES = [
  { naam: "Achille Cyrille", jaren: "1885", status: "†5 meses", overleefde: false },
  { naam: "Jean François Cyrille", jaren: "1886–1955", status: "Carpintero/ebanista", overleefde: true },
  { naam: "Alois Constant", jaren: "1887–1893", status: "†6 años", overleefde: false },
  { naam: "Maria Magdalena", jaren: "1889–1970", status: '"Tía Leine"', overleefde: true },
  { naam: "Odile Camille", jaren: "1891", status: "†pocos meses", overleefde: false },
  { naam: "Elisa Palmyre", jaren: "1893", status: "†pocos meses", overleefde: false },
  { naam: "Marcel Deforce", jaren: "1894–1963", status: "Abuelo del autor", overleefde: true },
  { naam: "Joseph Constant", jaren: "1896–1897", status: "†bebé", overleefde: false },
];

const kinderenDE = [
  { naam: "Achille Cyrille", jaren: "1885", status: "†5 Monate", overleefde: false },
  { naam: "Jean François Cyrille", jaren: "1886–1955", status: "Zimmermann/Tischler", overleefde: true },
  { naam: "Alois Constant", jaren: "1887–1893", status: "†6 Jahre", overleefde: false },
  { naam: "Maria Magdalena", jaren: "1889–1970", status: '"Tante Leine"', overleefde: true },
  { naam: "Odile Camille", jaren: "1891", status: "†einige Monate", overleefde: false },
  { naam: "Elisa Palmyre", jaren: "1893", status: "†einige Monate", overleefde: false },
  { naam: "Marcel Deforce", jaren: "1894–1963", status: "Großvater des Autors", overleefde: true },
  { naam: "Joseph Constant", jaren: "1896–1897", status: "†Baby", overleefde: false },
];

const CharlesLouis = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const kinderen = language === 'fr' ? kinderenFR : language === 'pcd' ? kinderenPCD : language === 'vls' ? kinderenVLS : language === 'en' ? kinderenEN : language === 'es' ? kinderenES : language === 'de' ? kinderenDE : kinderenNL;

  const contentNL = {
    introP1: "In de stamboom is Charles-Louis als overgrootvader een typevoorbeeld van een overgangsfiguur tussen enerzijds de \"verre voorouders\" waarmee helemaal geen connectie meer bestaat en anderzijds de latere generaties van onze grootouders en ouders, die we persoonlijk gekend hebben.",
    introP2: "Geboren te Emelgem op 10 juni 1857 als achtste en jongste kind van Jean François Deforche & Francisca Vandewalle had hij drie oudere zussen en vier broers. Van die vier broers waren er intussen drie overleden op prille kinderleeftijd.",
    introP3: "In zijn geboorteakte werd hij geregistreerd als \"Carolus Ludovicus\" maar in de praktijk was dat natuurlijk Charles-Louis, in Izegem meestal gemeenzaam uitgesproken als \"Charlewie\".",
    introP4: "Zijn vader Jean François Deforche was timmerman-schrijnwerker, net als diens vader en grootvader voor hem. Het was een beroep dat in de familie zat, een traditie die van generatie op generatie werd doorgegeven.",
    soldierP1: "Toen Charles-Louis opgroeide was dit in een politiek gezien spannende tijd: in 1870-71 (hij was toen 14 jaar) was er de Frans-Duitse (of Frans-Pruisische) oorlog. Deze oorlog, uitgelokt door de Pruisische kanselier Bismarck, leidde tot de nederlaag van Napoleon III bij Sedan en de proclamatie van het Duitse Keizerrijk. Voor België, dat sinds 1830 een strikt neutrale status had, was de oorlog bijzonder bedreigend. Beide legers stonden vlak bij de Belgische grens en het land mobiliseerde 100.000 soldaten om de neutraliteit te bewaken. In West-Vlaanderen vreesde men een invasie.",
    soldierP2: "Toen hij op zijn twintigste soldaat moest worden, was dat meteen voor een periode van 3 jaar: van oktober 1877 tot september 1880 deed hij dienst bij het regiment van de genie, als \"mineur de 1e classe\". De soldij bedroeg aanvankelijk 30, later 33 centimen per dag.",
    soldierP3: "Een mineur was een soldaat die gespecialiseerd was in het graven van loopgraven, het aanleggen van mijngangen en het ondermijnen van vijandelijke stellingen.",
    soldierP4: "Na zijn legerdienst keerde hij terug naar Emelgem, waar hij het timmermansvak van zijn vader voortzette. Op 23 juni 1884 trouwde hij met Marie Leonie Vandenbroucke.",
    familyIntro: "Op 23 juni 1884 trouwde hij te Kachtem met Marie Leonie Vandenbroucke, dochter van Ivo Vandenbroucke en Coleta Supply. Ze gingen in Emelgem wonen in de wijk Vijfwegen en kregen samen acht kinderen:",
    familyEnd: "Van de acht kinderen bleven er slechts drie in leven. Moeder Marie Leonie overleed in september 1897. De drie kinderen waren toen resp. 11, 9 en 3 jaar oud.",
    remarriageP1: "Op 1 februari 1898 hertrouwde vader Charles-Louis in Ingelmunster met Leonie Plancke (1856–1917), weduwe zonder kinderen van Hippoliet Watteel. Met haar kreeg hij nog een zoon: Alberic Camiel (1899–1920). Leonie overleed in 1917, tijdens de Eerste Wereldoorlog. Dit wereldconflict (1914-1918) trof België zwaar: het land werd grotendeels bezet door het Duitse leger. In West-Vlaanderen lag de frontlinie langs de IJzer, op slechts 30 km van Izegem. Vier jaar lang leefde de bevolking onder bezetting, met voedselschaarste, dwangarbeid en de constante dreiging van het front.",
    remarriageP2: "Charles-Louis, toen 60 jaar, hertrouwde nog eens in 1918 met de 56-jarige Silvia Maria Van Coillie, weduwe van Henri Vandevyvere. Het was het jaar van de Bevrijding, na vier jaar Duitse bezetting. Ze leefden nog 20 jaar samen, tot aan het overlijden van Charles-Louis op 6 maart 1938, het jaar voor de Tweede Wereldoorlog zou uitbreken.",
    remarriageP3: "Zoon Alberic Camiel, geboren uit het tweede huwelijk, overleed in 1920 op 21-jarige leeftijd. De periode na de oorlog werd gekenmerkt door de Spaanse griep, die wereldwijd miljoenen slachtoffers maakte.",
    remarriageP4: "Van de negen kinderen die Charles-Louis had bereikten er slechts drie de volwassenheid: Jean François Cyrille, Maria Magdalena (\"Tante Leine\") en Marcel. Het was Marcel die de familielijn zou voortzetten.",
    professionP: "Hij werd timmerman van beroep, net zoals zijn vader, zijn ooms en zijn broers. De familie Deforce-timmermannen zagen zichzelf als kwaliteitsvolle ambachtslui eerder dan banale uitvoerende schrijnwerkers.",
    img1908Caption: "1908 – Vereenigde Houtsnijders Iseghem: Een vereniging van jonge houtsnijders, vrij formeel georganiseerd met twee priesters erbij.",
    img1910Caption: "ca. 1910 – Groep houtbewerkers: De mannen poseren in werktenue en op klompen — merkwaardig voor die tijd.",
    quote: "\"Hij was een man die in den eenvoud des wereld heeft gewandeld. Hij begeerde geen glorie dezer wereld, maar in stilte zijn plicht te vervullen tegenover God en de mensen.\"",
    quoteSource: "— Uit het doodsprentje van Charles-Louis Deforce",
    imgPortraitAlt: "Charles Louis Deforce",
    imgPortraitCaption: "Charles Louis Deforce (1857-1938)",
    imgDoodsprentjeAlt: "Doodsprentje van Charles-Louis Deforce",
    imgDoodsprentjeCaption: "Doodsprentje van Charles-Louis Deforce (†6 maart 1938)",
    
    // Historische context: Hongersnood 1845-1850
    famineTitle: "Het arme Vlaanderen: hongersnood en ellende (1845-1850)",
    famineIntro: "Charles-Louis werd geboren in 1857, amper zeven jaar na de verschrikkelijkste periode die Vlaanderen ooit had meegemaakt. Zijn vader Jean François groeide op in de nadagen van een catastrofe die het Vlaamse platteland tot op het bot had uitgehold. Om het Vlaanderen te begrijpen waarin Charles-Louis opgroeide, moeten we teruggaan naar de jaren 1840.",
    faminePotatoTitle: "De aardappelplaag (1845-1850)",
    faminePotatoP1: "In de zomer van 1845 bereikte de Phytophthora infestans — een schimmelziekte uit Amerika — de Vlaamse akkers. Binnen enkele weken waren hele oogsten vernietigd. De aardappel, die voor de arme Vlaamse bevolking het absolute hoofdvoedsel was geworden, rotte weg op het veld. Families die op niets anders konden rekenen, stonden van de ene dag op de andere zonder eten.",
    faminePotatoP2: "De ramp was des te groter omdat de Vlaamse boeren — anders dan in Ierland, waar dezelfde plaag toesloeg — al vóór 1845 in diepe armoede leefden. De combinatie van overbevolking, te kleine percelen en achterhaalde landbouwmethoden maakte het platteland extreem kwetsbaar. In sommige gemeenten stierf tot een kwart van de bevolking aan ondervoeding en de bijkomende ziekten.",
    famineLinenTitle: "De linnencrisis",
    famineLinenP1: "Tegelijkertijd werd Vlaanderen getroffen door de ineenstorting van de huisnijverheid. Eeuwenlang hadden Vlaamse gezinnen bijverdiend als spinners en wevers van linnen. De mechanisatie in Engeland en later in Gent maakte hun handwerk waardeloos. Tienduizenden thuiswevers — vooral in Oost- en West-Vlaanderen — verloren hun enige bron van inkomsten. De combinatie van de aardappelplaag en de linnencrisis was verwoestend: mensen hadden geen voedsel én geen werk.",
    famineCholeraTitle: "Cholera en epidemieën",
    famineCholeraP1: "Alsof de honger niet volstond, sloegen in 1847-1849 cholera- en tyfusepidemieën toe. In de overbevolkte, onhygiënische woningen van het Vlaamse platteland verspreidden de ziekten zich razendsnel. Artsen waren schaars en duur, medicijnen onbestaande voor de armen. In veel dorpen rond Izegem en Emelgem werden massagraven gegraven. De epidemie van 1848 alleen al kostte naar schatting 25.000 Belgen het leven, het merendeel in Vlaanderen.",
    famineImpactTitle: "De nasleep voor de familie",
    famineImpactP1: "Toen Charles-Louis in 1857 werd geboren, waren de littekens van de hongersnood nog overal zichtbaar. Hele dorpen waren ontvolkt, boerderijen verlaten, ambachten verdwenen. Zijn vader Jean François, geboren rond 1820, had de ellende als jonge man van dichtbij meegemaakt. Dat de familie het timmermansvak beoefende, was wellicht hun redding: geschoolde ambachtslieden overleefden de crisis beter dan ongeschoolde arbeiders en kleine boeren.",
    famineImpactP2: "De hongersnood verklaart ook waarom zoveel kinderen in die generatie op jonge leeftijd stierven. Ondervoeding verzwakte het immuunsysteem, en zelfs jaren na de ergste honger bleven de gevolgen voelbaar. Charles-Louis zelf zou vijf van zijn acht kinderen verliezen — een echo van de kwetsbaarheid die de hongerjaren hadden nagelaten.",
    famineStats: [
      { label: "Bevolkingsdaling Vlaanderen 1846-1850", value: "~50.000 doden" },
      { label: "Prijs aardappelen", value: "Verviervoudigd" },
      { label: "Thuiswevers werkloos", value: "~250.000" },
      { label: "Cholera-doden 1848", value: "~25.000 in België" },
    ],
  };

  const contentFR = {
    introP1: "Dans l'arbre généalogique, Charles-Louis en tant qu'arrière-grand-père est un exemple typique d'une figure de transition entre d'une part les \"ancêtres lointains\" avec lesquels il n'y a plus aucune connexion et d'autre part les générations plus récentes de nos grands-parents et parents, que nous avons personnellement connus.",
    introP2: "Né à Emelgem le 10 juin 1857 en tant que huitième et plus jeune enfant de Jean François Deforche & Francisca Vandewalle, il avait trois sœurs aînées et quatre frères. Sur ces quatre frères, trois étaient déjà décédés en bas âge.",
    introP3: "Dans son acte de naissance, il fut enregistré sous le nom de \"Carolus Ludovicus\" mais dans la pratique, c'était bien sûr Charles-Louis, prononcé familièrement à Izegem comme \"Charlewie\".",
    introP4: "Son père Jean François Deforche était charpentier-menuisier, tout comme son père et son grand-père avant lui. C'était un métier qui était dans la famille, une tradition transmise de génération en génération.",
    soldierP1: "Quand Charles-Louis grandit, c'était dans une période politiquement tendue : en 1870-71 (il avait alors 14 ans), il y eut la guerre franco-prussienne. Cette guerre, provoquée par le chancelier prussien Bismarck, mena à la défaite de Napoléon III à Sedan et à la proclamation de l'Empire allemand. Pour la Belgique, qui avait un statut strictement neutre depuis 1830, la guerre était particulièrement menaçante. Les deux armées se trouvaient près de la frontière belge et le pays mobilisa 100 000 soldats pour protéger sa neutralité.",
    soldierP2: "Quand il dut devenir soldat à vingt ans, ce fut pour une période de 3 ans : d'octobre 1877 à septembre 1880, il servit dans le régiment du génie, comme \"mineur de 1re classe\". La solde était initialement de 30, puis de 33 centimes par jour.",
    soldierP3: "Un mineur était un soldat spécialisé dans le creusement de tranchées, la construction de galeries de mines et le minage des positions ennemies.",
    soldierP4: "Après son service militaire, il retourna à Emelgem, où il continua le métier de charpentier de son père. Le 23 juin 1884, il épousa Marie Leonie Vandenbroucke.",
    familyIntro: "Le 23 juin 1884, il se maria à Kachtem avec Marie Leonie Vandenbroucke, fille d'Ivo Vandenbroucke et Coleta Supply. Ils s'installèrent à Emelgem dans le quartier Vijfwegen et eurent ensemble huit enfants :",
    familyEnd: "Sur les huit enfants, seuls trois survécurent. La mère Marie Leonie décéda en septembre 1897. Les trois enfants avaient alors respectivement 11, 9 et 3 ans.",
    remarriageP1: "Le 1er février 1898, le père Charles-Louis se remaria à Ingelmunster avec Leonie Plancke (1856–1917), veuve sans enfants de Hippoliet Watteel. Avec elle, il eut encore un fils : Alberic Camiel (1899–1920). Leonie décéda en 1917, pendant la Première Guerre mondiale. Ce conflit mondial (1914-1918) toucha durement la Belgique : le pays fut en grande partie occupé par l'armée allemande. En Flandre Occidentale, la ligne de front longeait l'Yser, à seulement 30 km d'Izegem.",
    remarriageP2: "Charles-Louis, alors âgé de 60 ans, se remaria encore en 1918 avec Silvia Maria Van Coillie, 56 ans, veuve de Henri Vandevyvere. C'était l'année de la Libération, après quatre ans d'occupation allemande. Ils vécurent encore 20 ans ensemble, jusqu'au décès de Charles-Louis le 6 mars 1938.",
    remarriageP3: "Le fils Alberic Camiel, né du deuxième mariage, décéda en 1920 à l'âge de 21 ans. La période d'après-guerre fut marquée par la grippe espagnole, qui fit des millions de victimes dans le monde.",
    remarriageP4: "Sur les neuf enfants que Charles-Louis eut, seuls trois atteignirent l'âge adulte : Jean François Cyrille, Maria Magdalena (\"Tante Leine\") et Marcel. C'est Marcel qui continuerait la lignée familiale.",
    professionP: "Il devint charpentier de métier, tout comme son père, ses oncles et ses frères. Les charpentiers de la famille Deforce se voyaient comme des artisans de qualité plutôt que de simples menuisiers exécutants.",
    img1908Caption: "1908 – Association des Sculpteurs sur Bois d'Izegem : Une association de jeunes sculpteurs sur bois, organisée de manière assez formelle avec deux prêtres.",
    img1910Caption: "ca. 1910 – Groupe de travailleurs du bois : Les hommes posent en tenue de travail et en sabots — remarquable pour l'époque.",
    quote: "\"Il était un homme qui a marché dans la simplicité du monde. Il ne désirait pas la gloire de ce monde, mais d'accomplir en silence son devoir envers Dieu et les hommes.\"",
    quoteSource: "— Du faire-part de décès de Charles-Louis Deforce",
    imgPortraitAlt: "Charles Louis Deforce",
    imgPortraitCaption: "Charles Louis Deforce (1857-1938)",
    imgDoodsprentjeAlt: "Faire-part de décès de Charles-Louis Deforce",
    imgDoodsprentjeCaption: "Faire-part de décès de Charles-Louis Deforce (†6 mars 1938)",
    
    famineTitle: "La Flandre misérable : famine et détresse (1845-1850)",
    famineIntro: "Charles-Louis naquit en 1857, à peine sept ans après la période la plus terrible que la Flandre ait connue. Son père Jean François grandit dans les séquelles d'une catastrophe qui avait vidé la campagne flamande jusqu'à l'os. Pour comprendre la Flandre dans laquelle Charles-Louis grandit, il faut remonter aux années 1840.",
    faminePotatoTitle: "Le mildiou de la pomme de terre (1845-1850)",
    faminePotatoP1: "À l'été 1845, le Phytophthora infestans — un champignon venu d'Amérique — atteignit les champs flamands. En quelques semaines, des récoltes entières furent détruites. La pomme de terre, devenue l'aliment de base absolu des pauvres Flamands, pourrissait dans les champs. Des familles qui ne pouvaient compter sur rien d'autre se retrouvèrent du jour au lendemain sans nourriture.",
    faminePotatoP2: "Le désastre fut d'autant plus grand que les paysans flamands — contrairement à l'Irlande, frappée par la même maladie — vivaient déjà dans une profonde misère avant 1845. La combinaison de surpopulation, de parcelles trop petites et de méthodes agricoles dépassées rendait la campagne extrêmement vulnérable. Dans certaines communes, jusqu'à un quart de la population mourut de sous-alimentation et des maladies associées.",
    famineLinenTitle: "La crise du lin",
    famineLinenP1: "Simultanément, la Flandre fut frappée par l'effondrement de l'industrie à domicile. Pendant des siècles, les familles flamandes avaient arrondi leurs fins de mois comme fileurs et tisserands de lin. La mécanisation en Angleterre puis à Gand rendit leur artisanat sans valeur. Des dizaines de milliers de tisserands à domicile perdirent leur seule source de revenus. La combinaison de la maladie de la pomme de terre et de la crise du lin fut dévastatrice.",
    famineCholeraTitle: "Choléra et épidémies",
    famineCholeraP1: "Comme si la faim ne suffisait pas, des épidémies de choléra et de typhus frappèrent en 1847-1849. Dans les habitations surpeuplées et insalubres de la campagne flamande, les maladies se propageaient à une vitesse fulgurante. L'épidémie de 1848 à elle seule coûta la vie à environ 25 000 Belges, principalement en Flandre.",
    famineImpactTitle: "Les séquelles pour la famille",
    famineImpactP1: "Quand Charles-Louis naquit en 1857, les cicatrices de la famine étaient encore partout visibles. Des villages entiers étaient dépeuplés, des fermes abandonnées. Son père Jean François, né vers 1820, avait vécu la misère de près en tant que jeune homme. Le fait que la famille exerçait le métier de charpentier fut peut-être leur salut.",
    famineImpactP2: "La famine explique aussi pourquoi tant d'enfants de cette génération moururent en bas âge. La sous-alimentation affaiblissait le système immunitaire, et même des années après la pire famine, les conséquences restaient perceptibles. Charles-Louis lui-même perdrait cinq de ses huit enfants.",
    famineStats: [
      { label: "Déclin démographique Flandre 1846-1850", value: "~50 000 morts" },
      { label: "Prix des pommes de terre", value: "Quadruplé" },
      { label: "Tisserands au chômage", value: "~250 000" },
      { label: "Morts du choléra 1848", value: "~25 000 en Belgique" },
    ],
  };

  const contentPCD = {
    introP1: "Dins l'abe généalogique, Charles-Louis in tant qu'arriére-grand-pére ch'est in exempe typique d'eune figure d'transition intre d'eune part les \"anchtres lointains\" aveuc lesquéls i n'y a pus aucune connexion et d'aute part les générationes pus récintes d'nos grands-parints et parints, qu'nous avons personnellemint connus.",
    introP2: "Né à Emelgem l'10 juin 1857 in tant qu'huitiéme et pus jonne éfant d'Jean François Deforche & Francisca Vandewalle, il avot troés sœurs aînées et quate frétes. Sus ches quate frétes, troés étoéent déjà décédés in bas âge.",
    introP3: "Dins sin acte d'naissance, il fut inregistré sous l'nom d'\"Carolus Ludovicus\" mais dins la pratique, ch'étot bin sûr Charles-Louis, prononcé familiéremint à Izegem comme \"Charlewie\".",
    introP4: "Sin pére Jean François Deforche étot charpintier-menuisier, tout comme sin pére et sin grand-pére avant lui. Ch'étot in métier qu'étot dins la famille, eune tradition transmise d'génératione in génératione.",
    soldierP1: "Quand Charles-Louis i grandit, ch'étot dins eune période politiquemint tindue : in 1870-71 (il avot alors 14 ans), i y eut la guerre franco-prussienne. Chete guerre, provoquée par l' chancelier prussien Bismarck, mena à l' défaite d' Napoléon III à Sedan pi à l' proclamatione d' l'Empire allemand. Pour l' Belgique, qui avot un statut strictemint neutre d'puis 1830, l' guerre étot particuliéremint minaçante.",
    soldierP2: "Quand il dut d'vnir soldat à vingt ans, ch'fut pour eune période d'3 ans : d'octobre 1877 à septembre 1880, il servit dins l'régimint du génie, comme \"mineur d'1re classe\".",
    soldierP3: "In mineur ch'étot in soldat spécialisé dins l'creusemint d'tranchées, la construction d'galeries d'mines et l'minage des positiones innimies.",
    soldierP4: "Aprés sin service militaire, il r'tourna à Emelgem, oùsqu'il continua l'métier d'charpintier d'sin pére. L'23 juin 1884, il épousa Marie Leonie Vandenbroucke.",
    familyIntro: "L'23 juin 1884, il s'maria à Kachtem aveuc Marie Leonie Vandenbroucke, fille d'Ivo Vandenbroucke et Coleta Supply. I s'installérent à Emelgem dins l'quartier Vijfwegen et eurint insimble huit éfants :",
    familyEnd: "Sus les huit éfants, seuls troés survécurint. La mére Marie Leonie décéda in septembre 1897. Les troés éfants avoéent alors respectivemint 11, 9 et 3 ans.",
    remarriageP1: "L'1er février 1898, l'pére Charles-Louis s'remaria à Ingelmunster aveuc Leonie Plancke (1856–1917), veuve sans éfants d'Hippoliet Watteel. Aveuc elle, il eut incore in fils : Alberic Camiel (1899–1920). Leonie décéda in 1917, pindant l' Premiére Guerre mondiale. Ch' conflit mondial (1914-1918) toucha duremint l' Belgique : l' pays fut in grande partie occupé par l'armée alleminde.",
    remarriageP2: "Charles-Louis, alors âgé d'60 ans, s'remaria incore in 1918 aveuc Silvia Maria Van Coillie, 56 ans, veuve d'Henri Vandevyvere. Ch'étot l'année d' la Libératione, aprés quate ans d'occupatione alleminde. I vécurint incore 20 ans insimble.",
    remarriageP3: "L'fils Alberic Camiel, né du deuxiéme mariage, décéda in 1920 à l'âge d'21 ans. L' période d'aprés-guerre fut marquée par l' grippe espagnole.",
    remarriageP4: "Sus les neuf éfants qu'Charles-Louis eut, seuls troés attindirent l'âge adulte : Jean François Cyrille, Maria Magdalena (\"Tante Leine\") et Marcel. Ch'est Marcel qu'i continuerot la lignée familiére.",
    professionP: "Il d'vint charpintier d'métier, tout comme sin pére, ses oncles et ses frétes. Les charpintiers d'la famille Deforce s'voyoéent comme des artisans d'qualité plutôt qu'd'simples menuisiers exécutants.",
    img1908Caption: "1908 – Association des Sculpteurs sus Bos d'Izegem : Eune association d'jonnes sculpteurs sus bos, organisée d'maniére assez formelle aveuc deux prêtes.",
    img1910Caption: "ca. 1910 – Groupe d'travailleurs du bos : Les hommes posent in t'nue d'travail et in sabots — remarquable pour l'époque.",
    quote: "\"Il étot in homme qu'i a marché dins la simplicité du monde. Il n'désirot point la gloire d'ch'monde, mais d'accomplir in silence sin d'voér invers Diu et les hommes.\"",
    quoteSource: "— Du faire-part d'décés d'Charles-Louis Deforce",
    imgPortraitAlt: "Charles Louis Deforce",
    imgPortraitCaption: "Charles Louis Deforce (1857-1938)",
    imgDoodsprentjeAlt: "Faire-part d'décés d'Charles-Louis Deforce",
    imgDoodsprentjeCaption: "Faire-part d'décés d'Charles-Louis Deforce (†6 mars 1938)",
    
    famineTitle: "La Flandre misérable : famine et détrèsse (1845-1850)",
    famineIntro: "Charles-Louis i naquît in 1857, à peine sept ans aprés la période la pus terrible qu'la Flandre eut connue. Sin pére Jean François i grandit dins les séquelles d'eune catastrophe qu'ale avot vidé la campagne flamande jusqu'à l'os.",
    faminePotatoTitle: "L'mildiou d'la patiote (1845-1850)",
    faminePotatoP1: "À l'été 1845, l'Phytophthora infestans — in champignon v'nu d'Amérique — i atteignît les champs flamands. In quéques s'maines, des récoltes intiéres i furint détruites. La patiote, d'v'nue l'alimint d'base absolu des pauvres Flamands, pourissot dins les champs.",
    faminePotatoP2: "L'désastre i fut d'autant pus grand qu'les paysans flamands vivoéent déjà dins eune profonde miséré avant 1845. La combinaison d'surpopulatione, d'parcelles trop tiotes et d'méthodes agricoles dépassées rindot la campagne extrêmemint vulnérable.",
    famineLinenTitle: "La crise du lin",
    famineLinenP1: "In même timps, la Flandre ale fut frappée par l'effondremint d'l'industrie à domicile. Pindant des siécles, les familles flamandes avoéent arrondi leus fins d'moés comme fileurs et tisseurs d'lin. La mécanistation in Angleterre pi à Gand rindît leur artisanat sans valeur.",
    famineCholeraTitle: "Choléra et épidémies",
    famineCholeraP1: "Comme si la faim n'suffisot point, des épidémies d'choléra et d'typhus i frappérint in 1847-1849. L'épidémie d'1848 à elle seule coûta la vie à environ 25 000 Belges.",
    famineImpactTitle: "Les séquelles pour la famille",
    famineImpactP1: "Quand Charles-Louis i naquît in 1857, les cicatrices d'la famine étoéent incore partout visibles. Sin pére Jean François, né vers 1820, avot vécu la miséré d'prés.",
    famineImpactP2: "La famine ale explique aussi pourquoé tant d'éfants d'chete génératione moururint in bas âge. Charles-Louis lui-même perderot cinq d'ses huit éfants.",
    famineStats: [
      { label: "Déclin démographique Flandre 1846-1850", value: "~50 000 morts" },
      { label: "Prix des patiotes", value: "Quadruplé" },
      { label: "Tisseurs au chômage", value: "~250 000" },
      { label: "Morts du choléra 1848", value: "~25 000 in Belgique" },
    ],
  };

  const contentVLS = {
    introP1: "In de stamboom is Charles-Louis als overgrôotvader e typerend vôorbeeld van e overgangsfiguur tussen enerzuds de \"verre vôorouders\" woarmee geen connectie mee bestaot en anderzuds de latere generoasjes van uuze grôotouders en ouders, die me persôonlik gekend ebn.",
    introP2: "Gebôorn te Emelgem op 10 juni 1857 als achtste en jongste kind van Jean François Deforche & Francisca Vandewalle ad 'n drie oudere zusters en vier broeders. Van die vier broeders woaren d'r intussen drie overleeden op prille kinderleeftyd.",
    introP3: "In zyn geboorteakte wierd 'n geregistreerd als \"Carolus Ludovicus\" mo in de praktyk was da nateurlik Charles-Louis, in Izegem meestal gemeenzoam uutgesproken als \"Charlewie\".",
    introP4: "Zyn vader Jean François Deforche was timmerman-schrynwerker, net gelyk zyn vader en grôotvader vôor hem. 't Was e beroep da in de familie zat, e tradisje die van generoasje op generoasje wierd deurgegevn.",
    soldierP1: "Tonne da Charles-Louis opgroeide was dit in e politiek gezien spannende tied: in 1870-71 (hy was tonne 14 joar) was d'r de Frans-Duitsche (of Frans-Pruisische) oorlog. Dezen oorlog, uutgelokt deur den Pruisischen kanselier Bismarck, leidde tot de nederlage van Napoleon III by Sedan en de proclamoasje van 't Duitsche Keizerryk. Vôor België, da sinds 1830 e strikt neutrale status had, was den oorlog byzonder bedreigend. Beede legers stonden vlak by de Belgische grens.",
    soldierP2: "Tonne da 'n op zyn twintigste soldoat moest wordn, was da meteen vôor e periode van 3 joar: van oktober 1877 tot september 1880 dé 'n dienst by 't regiment van de genie, als \"mineur de 1e classe\".",
    soldierP3: "E mineur was e soldoat die gespecialiseerd was in 't graven van loopgraven, 't aanleggen van myngangen en 't ondermynen van vyandige stellingen.",
    soldierP4: "Noa zyn legerdienst keerde 'n were noar Emelgem, woar da 'n 't timmermansvak van zyn vader vôortzette. Op 23 juni 1884 trouwde 'n mee Marie Leonie Vandenbroucke.",
    familyIntro: "Op 23 juni 1884 trouwde 'n te Kachtem mee Marie Leonie Vandenbroucke, dochter van Ivo Vandenbroucke en Coleta Supply. Ze gingen in Emelgem wôonen in de wyk Vyfwegen en kregen soamen acht kinders:",
    familyEnd: "Van de acht kinders bleven d'r mo drie in leven. Moeder Marie Leonie overlieed in september 1897. De drie kinders woaren tonne resp. 11, 9 en 3 joar oud.",
    remarriageP1: "Op 1 februari 1898 hertrouwde vader Charles-Louis in Ingelmunster mee Leonie Plancke (1856–1917), weduwe zonder kinders van Hippoliet Watteel. Mee hoar kreeg 'n nog e zeune: Alberic Camiel (1899–1920). Leonie overlieed in 1917, tydens den Eersten Weireldoorlog. Dit weireldconflict (1914-1918) trof België zwoar: 't land wierd grotendeels bezet deur 't Duitsche leger. In West-Vlaanderen lag de frontlinie langs den Yzer, op mo 30 km van Izegem.",
    remarriageP2: "Charles-Louis, tonne 60 joar, hertrouwde nog e kee in 1918 mee de 56-joarige Silvia Maria Van Coillie, weduwe van Henri Vandevyvere. 't Was 't joar van de Bevryding, noa vier joar Duitsche bezetting. Ze leefden nog 20 joar soamen.",
    remarriageP3: "Zeune Alberic Camiel, gebôorn uut 't twiede huweliek, overlieed in 1920 op 21-joarige leeftyd. De periode noa den oorlog wierd gekenmerkt deur de Spaansche griep, die weireldwyd miljoenen slachtoffers moakte.",
    remarriageP4: "Van de negen kinders die Charles-Louis ad bereikten d'r mo drie de volwassenheid: Jean François Cyrille, Maria Magdalena (\"Tante Leine\") en Marcel. 't Was Marcel die de familielien zou vôortzetten.",
    professionP: "Hy wierd timmerman van beroep, net gelyk zyn vader, zyn nonkels en zyn broeders. De familie Deforce-timmermannen zoagen zichzelf als kwaliteitsvolle ambachtslui eerder dan banale uutvoerende schrynwerkers.",
    img1908Caption: "1908 – Vereenigde Houtsnuders Iseghem: E vereniging van jonge houtsnuders, vry formeel georganiseerd mee twie priesters d'rby.",
    img1910Caption: "ca. 1910 – Groep houtwerkers: De mannen poseren in werkklieding en op klompen — merkwèrdig vôor die tied.",
    quote: "\"Hy was e man die in de envoud dezer wereld eit gewandeld. Hy begeerde geen glorie dezer wereld, mo in stilte zyn plicht te vervullen tegenover God en de minschen.\"",
    quoteSource: "— Uut 't doodsprentje van Charles-Louis Deforce",
    imgPortraitAlt: "Charles Louis Deforce",
    imgPortraitCaption: "Charles Louis Deforce (1857-1938)",
    imgDoodsprentjeAlt: "Doodsprentje van Charles-Louis Deforce",
    imgDoodsprentjeCaption: "Doodsprentje van Charles-Louis Deforce (†6 maart 1938)",
    
    famineTitle: "'t Arm Vloanderen: hongersnôod en ellende (1845-1850)",
    famineIntro: "Charles-Louis wierd gebôorn in 1857, amper zeven joar noa de verschrikkelykste periode die Vloanderen ooit ad meegemaakt. Zyn vader Jean François groeide op in de noadagen van e catastrofe die 't Vlaamsche platteland tot op 't been ad uutgehold.",
    faminePotatoTitle: "De eerpelploage (1845-1850)",
    faminePotatoP1: "In de zomer van 1845 bereikte de Phytophthora infestans — e schimmelziekte uut Amerika — de Vlaamsche akkers. Binnen enkele weeken woaren hiele oogsten verwoest. De eerpel, die vôor de arme Vlaamsche bevolkinge 't absolute hôofdvoedsel was gewurdn, rotte weg op 't veld.",
    faminePotatoP2: "De ramp was des te groter omda de Vlaamsche boeren al vôor 1845 in diepe armoede leefden. De combinoasje van overbevolkinge, te kleine perceeln en achterhoalde landbouwmethoden moakte 't platteland extreem kwetsboar.",
    famineLinenTitle: "De linnencrisis",
    famineLinenP1: "Tegelykertyd wierd Vloanderen getroffen deur de ineenstortinge van de uusnuverheid. Ieuwenlangs addn Vlaamsche gezinnen byverdiend as spinners en wevers van linnen. De mechanisoasje in Engeland en later in Gent moakte under handwerk wèrdlôos.",
    famineCholeraTitle: "Cholera en epidemieën",
    famineCholeraP1: "Alsof den honger nie volstond, sloegen in 1847-1849 cholera- en tyfusepidemieën toe. De epidemie van 1848 allien al kostte noar schatting 25.000 Belgen 't leven, 't mierendeel in Vloanderen.",
    famineImpactTitle: "De nasleep vôor de familie",
    famineImpactP1: "Tonne da Charles-Louis in 1857 wierd gebôorn, woaren de littekens van de hongersnôod nog overal zichtboar. Zyn vader Jean François, gebôorn rond 1820, ad de ellende as jonge man van dichtby meegemaakt.",
    famineImpactP2: "De hongersnôod verkloart ook woarom da zovele kinders in die generoasje op jonge leeftyd stierven. Charles-Louis zelf zou vyf van zyn acht kinders verliezen.",
    famineStats: [
      { label: "Bevolkingsdaling Vloanderen 1846-1850", value: "~50.000 dôodn" },
      { label: "Prys eerpels", value: "Verviervoudigd" },
      { label: "Uuswevers werklôos", value: "~250.000" },
      { label: "Cholera-dôodn 1848", value: "~25.000 in België" },
    ],
  };

  const contentEN = {
    introP1: "In the family tree, Charles-Louis as great-grandfather is a typical example of a transitional figure between on one hand the \"distant ancestors\" with whom there is no longer any connection, and on the other hand the later generations of our grandparents and parents, whom we knew personally.",
    introP2: "Born in Emelgem on June 10, 1857 as the eighth and youngest child of Jean François Deforche & Francisca Vandewalle, he had three older sisters and four brothers. Of those four brothers, three had already died at a young age.",
    introP3: "In his birth certificate he was registered as \"Carolus Ludovicus\" but in practice it was of course Charles-Louis, commonly pronounced in Izegem as \"Charlewie\".",
    introP4: "His father Jean François Deforche was a carpenter-joiner, just like his father and grandfather before him. It was a profession that ran in the family, a tradition passed down from generation to generation.",
    soldierP1: "When Charles-Louis grew up, it was during a politically tense time: in 1870-71 (he was then 14 years old), there was the Franco-Prussian War. This war, provoked by the Prussian Chancellor Bismarck, led to the defeat of Napoleon III at Sedan and the proclamation of the German Empire. For Belgium, which had a strictly neutral status since 1830, the war was particularly threatening. Both armies stood near the Belgian border and the country mobilized 100,000 soldiers to protect its neutrality. In West Flanders, there was fear of an invasion.",
    soldierP2: "When he had to become a soldier at twenty, it was for a period of 3 years: from October 1877 to September 1880 he served in the engineer regiment, as \"miner 1st class\". The pay was initially 30, later 33 centimes per day.",
    soldierP3: "A miner was a soldier specialized in digging trenches, constructing mine galleries and undermining enemy positions.",
    soldierP4: "After his military service, he returned to Emelgem, where he continued his father's carpentry trade. On June 23, 1884, he married Marie Leonie Vandenbroucke.",
    familyIntro: "On June 23, 1884 he married in Kachtem with Marie Leonie Vandenbroucke, daughter of Ivo Vandenbroucke and Coleta Supply. They went to live in Emelgem in the Vijfwegen neighborhood and had eight children together:",
    familyEnd: "Of the eight children, only three survived. Mother Marie Leonie died in September 1897. The three children were then respectively 11, 9 and 3 years old.",
    remarriageP1: "On February 1, 1898, father Charles-Louis remarried in Ingelmunster with Leonie Plancke (1856–1917), childless widow of Hippoliet Watteel. With her he had another son: Alberic Camiel (1899–1920). Leonie died in 1917, during World War I. This world conflict (1914-1918) hit Belgium hard: the country was largely occupied by the German army. In West Flanders, the front line ran along the Yser, only 30 km from Izegem. For four years the population lived under occupation, with food shortages, forced labor and the constant threat of the front.",
    remarriageP2: "Charles-Louis, then 60 years old, remarried again in 1918 with the 56-year-old Silvia Maria Van Coillie, widow of Henri Vandevyvere. It was the year of Liberation, after four years of German occupation. They lived together for another 20 years, until the death of Charles-Louis on March 6, 1938, the year before World War II would break out.",
    remarriageP3: "Son Alberic Camiel, born from the second marriage, died in 1920 at the age of 21. The post-war period was marked by the Spanish flu, which claimed millions of victims worldwide.",
    remarriageP4: "Of the nine children Charles-Louis had, only three reached adulthood: Jean François Cyrille, Maria Magdalena (\"Aunt Leine\") and Marcel. It was Marcel who would continue the family line.",
    professionP: "He became a carpenter by profession, just like his father, his uncles and his brothers. The Deforce carpenter family saw themselves as quality craftsmen rather than ordinary carpenters.",
    img1908Caption: "1908 – United Woodcarvers Izegem: An association of young woodcarvers, quite formally organized with two priests present.",
    img1910Caption: "ca. 1910 – Group of woodworkers: The men pose in work clothes and on clogs — remarkable for that time.",
    quote: "\"He was a man who walked in the simplicity of the world. He desired no glory of this world, but to fulfill his duty in silence towards God and men.\"",
    quoteSource: "— From the death notice of Charles-Louis Deforce",
    imgPortraitAlt: "Charles Louis Deforce",
    imgPortraitCaption: "Charles Louis Deforce (1857-1938)",
    imgDoodsprentjeAlt: "Death notice of Charles-Louis Deforce",
    imgDoodsprentjeCaption: "Death notice of Charles-Louis Deforce (†March 6, 1938)",
    
    famineTitle: "Poor Flanders: famine and misery (1845-1850)",
    famineIntro: "Charles-Louis was born in 1857, barely seven years after the most terrible period Flanders had ever experienced. His father Jean François grew up in the aftermath of a catastrophe that had stripped the Flemish countryside to the bone. To understand the Flanders in which Charles-Louis grew up, we must go back to the 1840s.",
    faminePotatoTitle: "The Potato Blight (1845-1850)",
    faminePotatoP1: "In the summer of 1845, the Phytophthora infestans — a fungal disease from America — reached the Flemish fields. Within weeks, entire harvests were destroyed. The potato, which had become the absolute staple food for the poor Flemish population, rotted away in the fields. Families who could count on nothing else were left without food from one day to the next.",
    faminePotatoP2: "The disaster was all the greater because Flemish farmers — unlike in Ireland, where the same blight struck — were already living in deep poverty before 1845. The combination of overpopulation, plots that were too small, and outdated farming methods made the countryside extremely vulnerable. In some municipalities, up to a quarter of the population died from malnutrition and associated diseases.",
    famineLinenTitle: "The Linen Crisis",
    famineLinenP1: "At the same time, Flanders was hit by the collapse of the cottage industry. For centuries, Flemish families had supplemented their income as spinners and weavers of linen. Mechanization in England and later in Ghent made their handicraft worthless. Tens of thousands of home weavers — especially in East and West Flanders — lost their only source of income. The combination of the potato blight and the linen crisis was devastating: people had no food and no work.",
    famineCholeraTitle: "Cholera and Epidemics",
    famineCholeraP1: "As if hunger were not enough, cholera and typhus epidemics struck in 1847-1849. In the overcrowded, unsanitary dwellings of the Flemish countryside, diseases spread at lightning speed. The 1848 epidemic alone cost an estimated 25,000 Belgians their lives, the majority in Flanders.",
    famineImpactTitle: "The Aftermath for the Family",
    famineImpactP1: "When Charles-Louis was born in 1857, the scars of the famine were still visible everywhere. Entire villages were depopulated, farms abandoned, crafts disappeared. His father Jean François, born around 1820, had experienced the misery up close as a young man. The fact that the family practiced the carpentry trade was perhaps their salvation.",
    famineImpactP2: "The famine also explains why so many children of that generation died at a young age. Malnutrition weakened the immune system, and even years after the worst hunger, the consequences remained palpable. Charles-Louis himself would lose five of his eight children — an echo of the vulnerability left by the famine years.",
    famineStats: [
      { label: "Population decline Flanders 1846-1850", value: "~50,000 deaths" },
      { label: "Potato prices", value: "Quadrupled" },
      { label: "Home weavers unemployed", value: "~250,000" },
      { label: "Cholera deaths 1848", value: "~25,000 in Belgium" },
    ],
  };

  const contentES = {
    introP1: "En el árbol genealógico, Charles-Louis como bisabuelo es un ejemplo típico de una figura de transición entre, por un lado, los \"ancestros lejanos\" con quienes ya no hay conexión, y por otro lado, las generaciones posteriores de nuestros abuelos y padres, a quienes conocimos personalmente.",
    introP2: "Nacido en Emelgem el 10 de junio de 1857 como el octavo y más joven hijo de Jean François Deforche y Francisca Vandewalle, tenía tres hermanas mayores y cuatro hermanos. De esos cuatro hermanos, tres ya habían fallecido a temprana edad.",
    introP3: "En su acta de nacimiento fue registrado como \"Carolus Ludovicus\" pero en la práctica era, por supuesto, Charles-Louis, comúnmente pronunciado en Izegem como \"Charlewie\".",
    introP4: "Su padre Jean François Deforche era carpintero-ebanista, al igual que su padre y abuelo antes que él. Era una profesión que venía de familia, una tradición transmitida de generación en generación.",
    soldierP1: "Cuando Charles-Louis creció, fue durante una época políticamente tensa: en 1870-71 (tenía entonces 14 años), hubo la Guerra Franco-Prusiana. Esta guerra, provocada por el Canciller prusiano Bismarck, llevó a la derrota de Napoleón III en Sedan y a la proclamación del Imperio Alemán. Para Bélgica, que tenía un estatus estrictamente neutral desde 1830, la guerra era particularmente amenazante. Ambos ejércitos estaban cerca de la frontera belga y el país movilizó 100.000 soldados para proteger su neutralidad.",
    soldierP2: "Cuando tuvo que hacerse soldado a los veinte años, fue por un período de 3 años: de octubre de 1877 a septiembre de 1880 sirvió en el regimiento de ingenieros, como \"minador de 1ª clase\". El salario era inicialmente de 30, luego 33 céntimos por día.",
    soldierP3: "Un minador era un soldado especializado en cavar trincheras, construir galerías de minas y socavar posiciones enemigas.",
    soldierP4: "Después de su servicio militar, regresó a Emelgem, donde continuó el oficio de carpintería de su padre. El 23 de junio de 1884, se casó con Marie Leonie Vandenbroucke.",
    familyIntro: "El 23 de junio de 1884 se casó en Kachtem con Marie Leonie Vandenbroucke, hija de Ivo Vandenbroucke y Coleta Supply. Fueron a vivir a Emelgem en el barrio Vijfwegen y tuvieron ocho hijos juntos:",
    familyEnd: "De los ocho hijos, solo tres sobrevivieron. La madre Marie Leonie murió en septiembre de 1897. Los tres hijos tenían entonces respectivamente 11, 9 y 3 años.",
    remarriageP1: "El 1 de febrero de 1898, el padre Charles-Louis se volvió a casar en Ingelmunster con Leonie Plancke (1856–1917), viuda sin hijos de Hippoliet Watteel. Con ella tuvo otro hijo: Alberic Camiel (1899–1920). Leonie murió en 1917, durante la Primera Guerra Mundial. Este conflicto mundial (1914-1918) golpeó duramente a Bélgica: el país fue ocupado en gran parte por el ejército alemán. En Flandes Occidental, la línea del frente corría a lo largo del Yser, a solo 30 km de Izegem.",
    remarriageP2: "Charles-Louis, entonces de 60 años, se volvió a casar en 1918 con Silvia Maria Van Coillie de 56 años, viuda de Henri Vandevyvere. Fue el año de la Liberación, después de cuatro años de ocupación alemana. Vivieron juntos otros 20 años, hasta la muerte de Charles-Louis el 6 de marzo de 1938.",
    remarriageP3: "El hijo Alberic Camiel, nacido del segundo matrimonio, murió en 1920 a la edad de 21 años. El período de posguerra estuvo marcado por la gripe española, que cobró millones de víctimas en todo el mundo.",
    remarriageP4: "De los nueve hijos que tuvo Charles-Louis, solo tres llegaron a la edad adulta: Jean François Cyrille, Maria Magdalena (\"Tía Leine\") y Marcel. Fue Marcel quien continuaría la línea familiar.",
    professionP: "Se convirtió en carpintero de profesión, al igual que su padre, sus tíos y sus hermanos. La familia de carpinteros Deforce se veía a sí misma como artesanos de calidad más que como simples carpinteros.",
    img1908Caption: "1908 – Talladores de Madera Unidos de Izegem: Una asociación de jóvenes talladores de madera, organizada bastante formalmente con dos sacerdotes presentes.",
    img1910Caption: "ca. 1910 – Grupo de trabajadores de la madera: Los hombres posan en ropa de trabajo y zuecos — notable para esa época.",
    quote: "\"Era un hombre que caminó en la sencillez del mundo. No deseaba la gloria de este mundo, sino cumplir su deber en silencio hacia Dios y los hombres.\"",
    quoteSource: "— Del recordatorio fúnebre de Charles-Louis Deforce",
    imgPortraitAlt: "Charles Louis Deforce",
    imgPortraitCaption: "Charles Louis Deforce (1857-1938)",
    imgDoodsprentjeAlt: "Recordatorio fúnebre de Charles-Louis Deforce",
    imgDoodsprentjeCaption: "Recordatorio fúnebre de Charles-Louis Deforce (†6 de marzo de 1938)",
    
    famineTitle: "La Flandes pobre: hambruna y miseria (1845-1850)",
    famineIntro: "Charles-Louis nació en 1857, apenas siete años después del período más terrible que Flandes había experimentado. Su padre Jean François creció en las secuelas de una catástrofe que había dejado el campo flamenco en los huesos. Para entender la Flandes en la que Charles-Louis creció, debemos remontarnos a los años 1840.",
    faminePotatoTitle: "La plaga de la patata (1845-1850)",
    faminePotatoP1: "En el verano de 1845, el Phytophthora infestans — un hongo procedente de América — llegó a los campos flamencos. En pocas semanas, cosechas enteras fueron destruidas. La patata, que se había convertido en el alimento básico absoluto de la población flamenca pobre, se pudría en los campos.",
    faminePotatoP2: "El desastre fue aún mayor porque los campesinos flamencos ya vivían en una profunda miseria antes de 1845. La combinación de superpoblación, parcelas demasiado pequeñas y métodos agrícolas obsoletos hacía el campo extremadamente vulnerable.",
    famineLinenTitle: "La crisis del lino",
    famineLinenP1: "Al mismo tiempo, Flandes fue golpeada por el colapso de la industria doméstica. Durante siglos, las familias flamencas habían complementado sus ingresos como hilanderos y tejedores de lino. La mecanización en Inglaterra y luego en Gante hizo su artesanía inútil. La combinación de la plaga de la patata y la crisis del lino fue devastadora.",
    famineCholeraTitle: "Cólera y epidemias",
    famineCholeraP1: "Como si el hambre no bastara, epidemias de cólera y tifus golpearon en 1847-1849. La epidemia de 1848 sola costó la vida a unos 25.000 belgas, la mayoría en Flandes.",
    famineImpactTitle: "Las secuelas para la familia",
    famineImpactP1: "Cuando Charles-Louis nació en 1857, las cicatrices de la hambruna aún eran visibles por todas partes. Su padre Jean François, nacido alrededor de 1820, había vivido la miseria de cerca.",
    famineImpactP2: "La hambruna también explica por qué tantos niños de esa generación murieron a temprana edad. Charles-Louis mismo perdería cinco de sus ocho hijos.",
    famineStats: [
      { label: "Declive demográfico Flandes 1846-1850", value: "~50.000 muertes" },
      { label: "Precio de las patatas", value: "Cuadruplicado" },
      { label: "Tejedores desempleados", value: "~250.000" },
      { label: "Muertes por cólera 1848", value: "~25.000 en Bélgica" },
    ],
  };

  const contentDE = {
    introP1: "Im Stammbaum ist Charles-Louis als Urgroßvater ein typisches Beispiel einer Übergangsfigur zwischen einerseits den 'fernen Vorfahren', zu denen keine Verbindung mehr besteht, und andererseits den späteren Generationen unserer Großeltern und Eltern, die wir persönlich gekannt haben.",
    introP2: "Geboren in Emelgem am 10. Juni 1857 als achtes und jüngstes Kind von Jean François Deforche und Francisca Vandewalle hatte er drei ältere Schwestern und vier Brüder. Von diesen vier Brüdern waren inzwischen drei im frühen Kindesalter verstorben.",
    introP3: "In seiner Geburtsurkunde wurde er als 'Carolus Ludovicus' registriert, aber in der Praxis war es natürlich Charles-Louis, in Izegem meist vertraut als 'Charlewie' ausgesprochen.",
    introP4: "Sein Vater Jean François Deforche war Zimmermann-Schreiner, genau wie dessen Vater und Großvater vor ihm. Es war ein Beruf, der in der Familie lag, eine Tradition, die von Generation zu Generation weitergegeben wurde.",
    soldierP1: "Als Charles-Louis aufwuchs, war dies eine politisch spannende Zeit: 1870-71 (er war damals 14 Jahre alt) gab es den Deutsch-Französischen (oder Deutsch-Preußischen) Krieg. Dieser Krieg, provoziert vom preußischen Kanzler Bismarck, führte zur Niederlage Napoleons III. bei Sedan und zur Proklamation des Deutschen Kaiserreichs. Für Belgien, das seit 1830 einen strikt neutralen Status hatte, war der Krieg besonders bedrohlich. Beide Armeen standen nahe der belgischen Grenze und das Land mobilisierte 100.000 Soldaten zum Schutz seiner Neutralität. In Westflandern fürchtete man eine Invasion.",
    soldierP2: "Als er mit zwanzig Jahren Soldat werden musste, war dies gleich für einen Zeitraum von 3 Jahren: Von Oktober 1877 bis September 1880 diente er beim Regiment der Pioniere als 'Mineur 1. Klasse'. Der Sold betrug anfänglich 30, später 33 Centimes pro Tag.",
    soldierP3: "Ein Mineur war ein Soldat, der auf das Graben von Schützengräben, das Anlegen von Minengängen und das Unterminieren feindlicher Stellungen spezialisiert war.",
    soldierP4: "Nach seinem Militärdienst kehrte er nach Emelgem zurück, wo er das Zimmermannshandwerk seines Vaters fortführte. Am 23. Juni 1884 heiratete er Marie Leonie Vandenbroucke.",
    familyIntro: "Am 23. Juni 1884 heiratete er in Kachtem Marie Leonie Vandenbroucke, Tochter von Ivo Vandenbroucke und Coleta Supply. Sie zogen nach Emelgem ins Viertel Vijfwegen und bekamen zusammen acht Kinder:",
    familyEnd: "Von den acht Kindern überlebten nur drei. Mutter Marie Leonie starb im September 1897. Die drei Kinder waren damals 11, 9 und 3 Jahre alt.",
    remarriageP1: "Am 1. Februar 1898 heiratete Vater Charles-Louis in Ingelmunster erneut, und zwar Leonie Plancke (1856–1917), kinderlose Witwe von Hippoliet Watteel. Mit ihr bekam er noch einen Sohn: Alberic Camiel (1899–1920). Leonie starb 1917 während des Ersten Weltkriegs. Dieser Weltkonflikt (1914-1918) traf Belgien schwer: Das Land wurde größtenteils von der deutschen Armee besetzt. In Westflandern verlief die Frontlinie entlang der Yser, nur 30 km von Izegem entfernt. Vier Jahre lang lebte die Bevölkerung unter Besatzung, mit Nahrungsmittelknappheit, Zwangsarbeit und der ständigen Bedrohung durch die Front.",
    remarriageP2: "Charles-Louis, damals 60 Jahre alt, heiratete 1918 erneut die 56-jährige Silvia Maria Van Coillie, Witwe von Henri Vandevyvere. Es war das Jahr der Befreiung, nach vier Jahren deutscher Besatzung. Sie lebten noch 20 Jahre zusammen, bis zum Tod von Charles-Louis am 6. März 1938, dem Jahr bevor der Zweite Weltkrieg ausbrechen sollte.",
    remarriageP3: "Sohn Alberic Camiel, geboren aus der zweiten Ehe, starb 1920 im Alter von 21 Jahren. Die Nachkriegszeit war von der Spanischen Grippe geprägt, die weltweit Millionen von Opfern forderte.",
    remarriageP4: "Von den neun Kindern, die Charles-Louis hatte, erreichten nur drei das Erwachsenenalter: Jean François Cyrille, Maria Magdalena ('Tante Leine') und Marcel. Es war Marcel, der die Familienlinie fortsetzen sollte.",
    professionP: "Er wurde Zimmermann von Beruf, genau wie sein Vater, seine Onkel und seine Brüder. Die Deforce-Zimmermannsfamilie sah sich als Qualitätshandwerker und nicht als gewöhnliche ausführende Schreiner.",
    img1908Caption: "1908 – Vereinigte Holzschnitzer Izegem: Ein Verein junger Holzschnitzer, recht formell organisiert mit zwei Priestern dabei.",
    img1910Caption: "ca. 1910 – Gruppe von Holzarbeitern: Die Männer posieren in Arbeitskleidung und auf Holzschuhen — bemerkenswert für diese Zeit.",
    quote: "'Er war ein Mann, der in der Einfachheit der Welt gewandelt ist. Er begehrte keinen Ruhm dieser Welt, sondern in Stille seine Pflicht gegenüber Gott und den Menschen zu erfüllen.'",
    quoteSource: "— Aus dem Sterbebildchen von Charles-Louis Deforce",
    imgPortraitAlt: "Charles Louis Deforce",
    imgPortraitCaption: "Charles Louis Deforce (1857-1938)",
    imgDoodsprentjeAlt: "Sterbebildchen von Charles-Louis Deforce",
    imgDoodsprentjeCaption: "Sterbebildchen von Charles-Louis Deforce (†6. März 1938)",
    
    famineTitle: "Das arme Flandern: Hungersnot und Elend (1845-1850)",
    famineIntro: "Charles-Louis wurde 1857 geboren, kaum sieben Jahre nach der schrecklichsten Periode, die Flandern je erlebt hatte. Sein Vater Jean François wuchs in den Nachwehen einer Katastrophe auf, die die flämische Landschaft bis auf die Knochen ausgehöhlt hatte.",
    faminePotatoTitle: "Die Kartoffelfäule (1845-1850)",
    faminePotatoP1: "Im Sommer 1845 erreichte die Phytophthora infestans — eine Pilzkrankheit aus Amerika — die flämischen Felder. Innerhalb weniger Wochen waren ganze Ernten vernichtet. Die Kartoffel, die zum absoluten Grundnahrungsmittel der armen flämischen Bevölkerung geworden war, verfaulte auf dem Feld.",
    faminePotatoP2: "Die Katastrophe war umso größer, weil die flämischen Bauern — anders als in Irland, wo dieselbe Seuche zuschlug — bereits vor 1845 in tiefer Armut lebten. Die Kombination aus Überbevölkerung, zu kleinen Parzellen und veralteten Anbaumethoden machte das Land extrem verwundbar.",
    famineLinenTitle: "Die Leinenkrise",
    famineLinenP1: "Gleichzeitig wurde Flandern vom Zusammenbruch der Heimindustrie getroffen. Jahrhundertelang hatten flämische Familien als Spinner und Weber von Leinen dazuverdient. Die Mechanisierung in England und später in Gent machte ihr Handwerk wertlos. Die Kombination von Kartoffelfäule und Leinenkrise war verheerend.",
    famineCholeraTitle: "Cholera und Epidemien",
    famineCholeraP1: "Als ob der Hunger nicht genügte, schlugen 1847-1849 Cholera- und Typhusepidemien zu. Die Epidemie von 1848 allein kostete schätzungsweise 25.000 Belgiern das Leben, die Mehrheit in Flandern.",
    famineImpactTitle: "Die Nachwirkungen für die Familie",
    famineImpactP1: "Als Charles-Louis 1857 geboren wurde, waren die Narben der Hungersnot noch überall sichtbar. Sein Vater Jean François, geboren um 1820, hatte das Elend als junger Mann aus nächster Nähe miterlebt.",
    famineImpactP2: "Die Hungersnot erklärt auch, warum so viele Kinder dieser Generation in jungem Alter starben. Charles-Louis selbst würde fünf seiner acht Kinder verlieren.",
    famineStats: [
      { label: "Bevölkerungsrückgang Flandern 1846-1850", value: "~50.000 Tote" },
      { label: "Kartoffelpreise", value: "Vervierfacht" },
      { label: "Heimweber arbeitslos", value: "~250.000" },
      { label: "Cholera-Tote 1848", value: "~25.000 in Belgien" },
    ],
  };

  const content = language === 'fr' ? contentFR : language === 'pcd' ? contentPCD : language === 'vls' ? contentVLS : language === 'en' ? contentEN : language === 'es' ? contentES : language === 'de' ? contentDE : contentNL;

  return (
    <section id="charles-louis" className="section-padding bg-card" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">
            {t('charles.title')}
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('charles.subtitle')}
          </p>
          <div className="vintage-divider mt-6" />
        </motion.div>

        {/* Intro met portret */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 grid md:grid-cols-3 gap-8 items-start"
        >
          <figure className="relative md:col-span-1 rounded-lg overflow-hidden shadow-card">
            <AiLabel className="top-3 left-3" />
            <video 
              src={charlesVideo} 
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto"
            />
            <figcaption className="bg-background p-3 text-sm text-muted-foreground text-center">
              {content.imgPortraitCaption}
            </figcaption>
          </figure>
          <div className="md:col-span-2 prose prose-lg max-w-none text-foreground/80 space-y-4">
            <p>{content.introP1}</p>
            <p>{content.introP2}</p>
            <p>{content.introP3}</p>
            <p>{content.introP4}</p>
          </div>
        </motion.div>

        {/* Lees meer/minder knop */}
        <div className="flex justify-center mb-8">
          <Button
            variant="outline"
            onClick={() => {
              if (isExpanded) {
                // Scroll naar sectie-top bij inklappen
                ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
              setIsExpanded(!isExpanded);
            }}
            className="group flex items-center gap-2"
          >
            {isExpanded ? (
              <>
                {language === 'nl' ? 'Lees minder' : 
                 language === 'fr' ? 'Lire moins' : 
                 language === 'en' ? 'Read less' : 
                 language === 'es' ? 'Leer menos' : 
                 language === 'de' ? 'Weniger lesen' :
                 language === 'pcd' ? 'Lire moins' : 
                 'Lees minder'}
                <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              </>
            ) : (
              <>
                {language === 'nl' ? 'Lees meer over het leven van Charles-Louis' : 
                 language === 'fr' ? 'En savoir plus sur la vie de Charles-Louis' : 
                 language === 'en' ? 'Read more about the life of Charles-Louis' : 
                 language === 'es' ? 'Leer más sobre la vida de Charles-Louis' : 
                 language === 'de' ? 'Mehr über das Leben von Charles-Louis lesen' :
                 language === 'pcd' ? 'In savoér pus sus la vie d\'Charles-Louis' : 
                 'Lees meer over het leven van Charles-Louis'}
                <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </>
            )}
          </Button>
        </div>

        {/* Uitklapbare content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {/* Historische context: Hongersnood 1845-1850 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="mb-12 p-6 bg-amber-50/50 dark:bg-amber-950/20 rounded-lg shadow-card border border-amber-200/50 dark:border-amber-800/30"
              >
                <h3 className="font-serif text-2xl font-bold text-amber-800 dark:text-amber-400 mb-4">
                  {content.famineTitle}
                </h3>
                <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
                  <p className="italic text-amber-900/70 dark:text-amber-300/70">{content.famineIntro}</p>
                </div>

                {/* Aardappelplaag */}
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-amber-700 dark:text-amber-400 mb-3">
                      {content.faminePotatoTitle}
                    </h4>
                    <div className="prose prose-lg max-w-none text-foreground/80 space-y-3">
                      <p>{content.faminePotatoP1}</p>
                      <p>{content.faminePotatoP2}</p>
                    </div>
                  </div>
                  <figure className="rounded-lg overflow-hidden shadow-lg">
                    <AiLabel className="top-3 left-3" />
                    <img 
                      src={aardappelHongersnood} 
                      alt={content.faminePotatoTitle}
                      className="w-full h-auto max-h-[400px] object-cover"
                    />
                  </figure>
                </div>

                {/* Linnencrisis */}
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <figure className="rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
                    <AiLabel className="top-3 left-3" />
                    <img 
                      src={linnencrisis} 
                      alt={content.famineLinenTitle}
                      className="w-full h-auto max-h-[400px] object-cover"
                    />
                  </figure>
                  <div className="order-1 md:order-2">
                    <h4 className="font-serif text-xl font-bold text-amber-700 dark:text-amber-400 mb-3">
                      {content.famineLinenTitle}
                    </h4>
                    <div className="prose prose-lg max-w-none text-foreground/80">
                      <p>{content.famineLinenP1}</p>
                    </div>
                  </div>
                </div>

                {/* Cholera */}
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-serif text-xl font-bold text-amber-700 dark:text-amber-400 mb-3">
                      {content.famineCholeraTitle}
                    </h4>
                    <div className="prose prose-lg max-w-none text-foreground/80">
                      <p>{content.famineCholeraP1}</p>
                    </div>
                  </div>
                  <figure className="rounded-lg overflow-hidden shadow-lg">
                    <AiLabel className="top-3 left-3" />
                    <img 
                      src={choleraEpidemie} 
                      alt={content.famineCholeraTitle}
                      className="w-full h-auto max-h-[400px] object-cover"
                    />
                  </figure>
                </div>

                {/* Statistieken */}
                <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {content.famineStats.map((stat, idx) => (
                    <div key={idx} className="bg-card border border-border rounded-lg p-4 text-center">
                      <div className="text-xl font-bold text-amber-700 dark:text-amber-400">{stat.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Impact op de familie */}
                <div className="mt-8 grid md:grid-cols-2 gap-6">
                  <figure className="rounded-lg overflow-hidden shadow-lg order-2 md:order-1">
                    <AiLabel className="top-3 left-3" />
                    <img 
                      src={armeVlaamseFamilie} 
                      alt={content.famineImpactTitle}
                      className="w-full h-auto max-h-[400px] object-cover"
                    />
                  </figure>
                  <div className="order-1 md:order-2">
                    <h4 className="font-serif text-xl font-bold text-amber-700 dark:text-amber-400 mb-3">
                      {content.famineImpactTitle}
                    </h4>
                    <div className="prose prose-lg max-w-none text-foreground/80 space-y-3">
                      <p>{content.famineImpactP1}</p>
                      <p>{content.famineImpactP2}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Soldaat */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 p-6 bg-background rounded-lg shadow-card border border-border"
        >
          <h3 className="font-serif text-2xl font-bold text-primary mb-4">
            {t('charles.soldier')}
          </h3>
          <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
            <p>{content.soldierP1}</p>
            <p>{content.soldierP2}</p>
            <p>{content.soldierP3}</p>
            
            {/* Afbeelding: Mineur van de genie */}
            <div className="my-8 not-prose">
              <figure className="relative overflow-hidden rounded-xl shadow-lg">
                <img 
                  src={mineurGenie} 
                  alt={language === 'nl' ? 'Mineur van het regiment van de genie graaft een mijngang, ca. 1880' : 
                       language === 'fr' ? "Mineur du régiment du génie creusant une galerie de mine, vers 1880" : 
                       language === 'en' ? 'Miner of the engineer regiment digging a mine tunnel, ca. 1880' :
                       language === 'es' ? 'Minero del regimiento de ingenieros cavando un túnel de mina, ca. 1880' :
                       language === 'de' ? 'Mineur des Pionierregiments beim Graben eines Minenstollens, ca. 1880' :
                       "Mineur van 't regiment van de genie groaft e myngange, ca. 1880"}
                  className="w-full h-auto max-h-[500px] object-cover"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                  <AiLabel className="mb-2" />
                  <p className="text-sm font-medium">
                    {language === 'nl' ? 'Een mineur graaft een mijngang — Charles Louis diende 3 jaar als "mineur de 1e classe"' : 
                     language === 'fr' ? 'Un mineur creuse une galerie — Charles Louis a servi 3 ans comme "mineur de 1re classe"' : 
                     language === 'en' ? 'A miner digs a tunnel — Charles Louis served 3 years as "mineur de 1e classe"' :
                     language === 'es' ? 'Un minero cava un túnel — Charles Louis sirvió 3 años como "mineur de 1e classe"' :
                     language === 'de' ? 'Ein Mineur gräbt einen Stollen — Charles Louis diente 3 Jahre als "Mineur 1. Klasse"' :
                     "E mineur groaft e myngange — Charles Louis diende 3 joar as \"mineur de 1e classe\""}
                  </p>
                </figcaption>
              </figure>
            </div>
            
            <p>{content.soldierP4}</p>
          </div>
        </motion.div>

        {/* Het gezin */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="font-serif text-2xl font-bold text-primary mb-6">
            {t('charles.family')}
          </h3>
          <div className="prose prose-lg max-w-none text-foreground/80 mb-6">
            <p>{content.familyIntro}</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kinderen.map((kind, index) => (
              <motion.div
                key={kind.naam}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
                className={`p-4 rounded-lg border ${
                  kind.overleefde 
                    ? "bg-accent/10 border-accent/30" 
                    : "bg-muted/30 border-border"
                }`}
              >
                <h4 className={`font-serif font-bold ${
                  kind.overleefde ? "text-primary" : "text-muted-foreground"
                }`}>
                  {kind.naam}
                </h4>
                <p className="text-sm text-muted-foreground">{kind.jaren}</p>
                <p className={`text-sm mt-1 ${
                  kind.overleefde ? "text-accent font-medium" : "text-muted-foreground italic"
                }`}>
                  {kind.status}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
            <p className="text-foreground/80 text-center">
              {content.familyEnd}
            </p>
          </div>
        </motion.div>

        {/* Hertrouwen */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mb-12 grid md:grid-cols-2 gap-8"
        >
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-primary">
              {t('charles.remarriage')}
            </h3>
            <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
              <p>{content.remarriageP1}</p>
              <p>{content.remarriageP2}</p>
              <p>{content.remarriageP3}</p>
              <p>{content.remarriageP4}</p>
            </div>
          </div>
          <figure className="rounded-lg overflow-hidden shadow-card photo-positive">
            <img 
              src={doodsprentje} 
              alt={content.imgDoodsprentjeAlt} 
              className="w-full h-auto"
            />
            <figcaption className="bg-background p-3 text-sm text-muted-foreground text-center">
              {content.imgDoodsprentjeCaption}
            </figcaption>
          </figure>
        </motion.div>

        {/* Beroep */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12"
        >
          <h3 className="font-serif text-2xl font-bold text-primary mb-6">
            {t('charles.profession')}
          </h3>
          <div className="prose prose-lg max-w-none text-foreground/80 mb-6">
            <p>{content.professionP}</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <figure className="rounded-lg overflow-hidden shadow-card photo-positive">
              <img 
                src={houtsnijders1908} 
                alt="Vereenigde Houtsnijders Iseghem 1908" 
                className="w-full h-auto"
              />
              <figcaption className="bg-background p-4 text-sm text-muted-foreground">
                {content.img1908Caption}
              </figcaption>
            </figure>
            <figure className="rounded-lg overflow-hidden shadow-card photo-positive">
              <img 
                src={houtsnijdersGroep} 
                alt="Groep houtbewerkers" 
                className="w-full h-auto"
              />
              <figcaption className="bg-background p-4 text-sm text-muted-foreground">
                {content.img1910Caption}
              </figcaption>
            </figure>
          </div>
        </motion.div>

              {/* Slot */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="p-8 bg-primary/5 rounded-lg border border-primary/20 text-center"
              >
                <blockquote className="font-serif text-xl italic text-foreground/80 max-w-3xl mx-auto">
                  {content.quote}
                </blockquote>
                <p className="text-muted-foreground mt-4">{content.quoteSource}</p>
                <div className="mt-6">
                  <ShareButton sectionId="charles-louis" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CharlesLouis;
