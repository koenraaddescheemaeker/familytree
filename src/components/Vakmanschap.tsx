import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import AiLabel from "@/components/ui/AiLabel";
import ShareButton from "@/components/ui/ShareButton";
import meubelatelierImg from "@/assets/meubelatelier-1880.jpg";
import woodworkingVideo from "@/assets/woodworking-craftsmanship.mp4";

const beroepsEvolutieNL = [
  {
    generatie: "Generatie 1",
    naam: "Hubert Delforge",
    jaren: "1662–1729",
    beroep: "Boquillon",
    beschrijving: "Man van het bos. Een boquillon is veel meer dan een houthakker — iemand die de taal van het bos kent: hoe stammen zich gedragen, hoe hout barst, waar een boom zwak is, wanneer hij het best te kappen is.",
  },
  {
    generatie: "Generatie 2",
    naam: "Jacques François Deleforge",
    jaren: "1694–1772",
    beroep: "Landbouwer & dagloner",
    beschrijving: "De eerste generatie die volledig wortel schoot in West-Vlaanderen. Trouwde in 1718 met Veronica Barbier en vestigde zich in Ardooie.",
  },
  {
    generatie: "Generatie 3",
    naam: "Georgius Delforce",
    jaren: "1731–1807",
    beroep: "Timmerman",
    beschrijving: "Zoon van Jacques François. In de akten duikt voor het eerst de beroepsvermelding 'charpentier' (timmerman) op.",
  },
  {
    generatie: "Generatie 4",
    naam: "Petrus Augustinus Delforge",
    jaren: "1773–1840",
    beroep: "Timmerman & schrijnwerker",
    beschrijving: "Zoon van Georgius. Naast constructietimmerwerk begint de familie zich toe te leggen op fijner schrijnwerk.",
  },
  {
    generatie: "Generatie 5",
    naam: "Jean-François Deforche",
    jaren: "1815–1871",
    beroep: "Timmerman & schrijnwerker",
    beschrijving: "De eerste voorouder waarvan we het beroep eenduidig met akten kunnen onderbouwen.",
  },
  {
    generatie: "Generatie 6",
    naam: "Carolus Ludovicus Deforce",
    jaren: "1857–1938",
    beroep: "Meubelmaker",
    beschrijving: "Het begin van de meubelmakerslijn. Met zijn zonen vormde hij de basis van het familiebedrijf.",
  },
  {
    generatie: "Generatie 7",
    naam: "Marcel August Deforce",
    jaren: "1894–1963",
    beroep: "Meubelmaker",
    beschrijving: "Voortzetting en uitbreiding van het familiebedrijf 'M. Deforce & Zonen'.",
  },
];

const beroepsEvolutieFR = [
  {
    generatie: "Génération 1",
    naam: "Hubert Delforge",
    jaren: "1662–1729",
    beroep: "Boquillon",
    beschrijving: "Homme des bois. Un boquillon est bien plus qu'un bûcheron — quelqu'un qui connaît le langage de la forêt : comment les troncs se comportent, comment le bois se fend, où un arbre est faible, quand il est préférable de l'abattre.",
  },
  {
    generatie: "Génération 2",
    naam: "Jacques François Deleforge",
    jaren: "1694–1772",
    beroep: "Agriculteur & journalier",
    beschrijving: "La première génération à s'enraciner complètement en Flandre Occidentale. Marié en 1718 avec Veronica Barbier et installé à Ardooie.",
  },
  {
    generatie: "Génération 3",
    naam: "Georgius Delforce",
    jaren: "1731–1807",
    beroep: "Charpentier",
    beschrijving: "Fils de Jacques François. Pour la première fois, la mention de profession 'charpentier' apparaît dans les actes.",
  },
  {
    generatie: "Génération 4",
    naam: "Petrus Augustinus Delforge",
    jaren: "1773–1840",
    beroep: "Charpentier & menuisier",
    beschrijving: "Fils de Georgius. En plus de la charpenterie de construction, la famille commence à se consacrer à la menuiserie plus fine.",
  },
  {
    generatie: "Génération 5",
    naam: "Jean-François Deforche",
    jaren: "1815–1871",
    beroep: "Charpentier & menuisier",
    beschrijving: "Le premier ancêtre dont nous pouvons clairement documenter la profession par des actes.",
  },
  {
    generatie: "Génération 6",
    naam: "Carolus Ludovicus Deforce",
    jaren: "1857–1938",
    beroep: "Ébéniste",
    beschrijving: "Le début de la lignée des ébénistes. Avec ses fils, il a formé la base de l'entreprise familiale.",
  },
  {
    generatie: "Génération 7",
    naam: "Marcel August Deforce",
    jaren: "1894–1963",
    beroep: "Ébéniste",
    beschrijving: "Continuation et expansion de l'entreprise familiale 'M. Deforce & Fils'.",
  },
];

const beroepsEvolutiePCD = [
  {
    generatie: "Génératione 1",
    naam: "Hubert Delforge",
    jaren: "1662–1729",
    beroep: "Boquillon",
    beschrijving: "Homme des bos. In boquillon ch'est bien pus qu'in bûcheron — quéqu'un qu'i connot l'langage du bos : comment les troncs i s'comportent, comment l'bos i s'find, oùsqu'in abe est foébe, quand qu'il est préférable d'l'abatte.",
  },
  {
    generatie: "Génératione 2",
    naam: "Jacques François Deleforge",
    jaren: "1694–1772",
    beroep: "Agriculteur & journalier",
    beschrijving: "La premiére génératione à s'inraciner complétémint in Flandre Occidentale. Marié in 1718 aveuc Veronica Barbier et installé à Ardooie.",
  },
  {
    generatie: "Génératione 3",
    naam: "Georgius Delforce",
    jaren: "1731–1807",
    beroep: "Charpintier",
    beschrijving: "Fils d'Jacques François. Pour la premiére foés, la mintion d'profession 'charpintier' apparot dins les actes.",
  },
  {
    generatie: "Génératione 4",
    naam: "Petrus Augustinus Delforge",
    jaren: "1773–1840",
    beroep: "Charpintier & menuisier",
    beschrijving: "Fils d'Georgius. In pus d'la charpinterie d'construction, la famille i c'mince à s'consacrer à la menuiserie pus fine.",
  },
  {
    generatie: "Génératione 5",
    naam: "Jean-François Deforche",
    jaren: "1815–1871",
    beroep: "Charpintier & menuisier",
    beschrijving: "L'premier anchtre dont nous pouvons clairemint documinter la profession par des actes.",
  },
  {
    generatie: "Génératione 6",
    naam: "Carolus Ludovicus Deforce",
    jaren: "1857–1938",
    beroep: "Ébéniste",
    beschrijving: "L'début d'la lignée des ébénistes. Aveuc ses fils, il a formé la base d'l'intreprise familiére.",
  },
  {
    generatie: "Génératione 7",
    naam: "Marcel August Deforce",
    jaren: "1894–1963",
    beroep: "Ébéniste",
    beschrijving: "Continuation et expansion d'l'intreprise familiére 'M. Deforce & Fils'.",
  },
];

const beroepsEvolutieVLS = [
  {
    generatie: "Generatie 1",
    naam: "Hubert Delforge",
    jaren: "1662–1729",
    beroep: "Boquillon",
    beschrijving: "Vent van 't bos. Nen boquillon is vele mî dan nen houtkapper — iemand die de toale van 't bos kent: oe stommen ulder gedroagen, oe 't hout barst, woar nen boom zwak is, wanneer da je 't best kunt kappen.",
  },
  {
    generatie: "Generatie 2",
    naam: "Jacques François Deleforge",
    jaren: "1694–1772",
    beroep: "Landbouwer & dagloner",
    beschrijving: "De eerste generatie die heel en al wortel schoot in West-Vloanderen. Trouwde in 1718 mê Veronica Barbier en zette z'n eigen in Ardooie.",
  },
  {
    generatie: "Generatie 3",
    naam: "Georgius Delforce",
    jaren: "1731–1807",
    beroep: "Timmerman",
    beschrijving: "Zeune van Jacques François. In de aktes duukt vo 't eerst de beroepsvermeldienge 'charpentier' (timmerman) op.",
  },
  {
    generatie: "Generatie 4",
    naam: "Petrus Augustinus Delforge",
    jaren: "1773–1840",
    beroep: "Timmerman & schrijnwerker",
    beschrijving: "Zeune van Georgius. Beneffens constructietimmerwerk begust de familie ulder toe te leggen op fijner schrijnwerk.",
  },
  {
    generatie: "Generatie 5",
    naam: "Jean-François Deforche",
    jaren: "1815–1871",
    beroep: "Timmerman & schrijnwerker",
    beschrijving: "De eerste voorouder woarvan da me 't beroep eenduidig met aktes kunnen onderbouwen.",
  },
  {
    generatie: "Generatie 6",
    naam: "Carolus Ludovicus Deforce",
    jaren: "1857–1938",
    beroep: "Meubelmoaker",
    beschrijving: "'t Begin van de meubelmoakerslienje. Mê zen zeunes vormde g'n de basis van 't familiebedrijf.",
  },
  {
    generatie: "Generatie 7",
    naam: "Marcel August Deforce",
    jaren: "1894–1963",
    beroep: "Meubelmoaker",
    beschrijving: "Voortzetting en uitbreijienge van 't familiebedrijf 'M. Deforce & Zeunes'.",
  },
];

const beroepsEvolutieEN = [
  { generatie: "Generation 1", naam: "Hubert Delforge", jaren: "1662–1729", beroep: "Boquillon", beschrijving: "Man of the forest. A boquillon is much more than a woodcutter — someone who knows the language of the forest: how trunks behave, how wood splits, where a tree is weak, when it is best to fell it." },
  { generatie: "Generation 2", naam: "Jacques François Deleforge", jaren: "1694–1772", beroep: "Farmer & day laborer", beschrijving: "The first generation to fully take root in West Flanders. Married in 1718 to Veronica Barbier and settled in Ardooie." },
  { generatie: "Generation 3", naam: "Georgius Delforce", jaren: "1731–1807", beroep: "Carpenter", beschrijving: "Son of Jacques François. In the records, the profession 'charpentier' (carpenter) appears for the first time." },
  { generatie: "Generation 4", naam: "Petrus Augustinus Delforge", jaren: "1773–1840", beroep: "Carpenter & joiner", beschrijving: "Son of Georgius. Besides construction carpentry, the family begins to focus on finer joinery work." },
  { generatie: "Generation 5", naam: "Jean-François Deforche", jaren: "1815–1871", beroep: "Carpenter & joiner", beschrijving: "The first ancestor whose profession we can unambiguously document with records." },
  { generatie: "Generation 6", naam: "Carolus Ludovicus Deforce", jaren: "1857–1938", beroep: "Furniture maker", beschrijving: "The beginning of the furniture-making line. With his sons, he formed the basis of the family business." },
  { generatie: "Generation 7", naam: "Marcel August Deforce", jaren: "1894–1963", beroep: "Furniture maker", beschrijving: "Continuation and expansion of the family business 'M. Deforce & Sons'." },
];

const beroepsEvolutieES = [
  { generatie: "Generación 1", naam: "Hubert Delforge", jaren: "1662–1729", beroep: "Boquillon", beschrijving: "Hombre del bosque. Un boquillon es mucho más que un leñador — alguien que conoce el lenguaje del bosque: cómo se comportan los troncos, cómo se raja la madera, dónde un árbol es débil, cuándo es mejor talarlo." },
  { generatie: "Generación 2", naam: "Jacques François Deleforge", jaren: "1694–1772", beroep: "Agricultor y jornalero", beschrijving: "La primera generación en arraigarse completamente en Flandes Occidental. Se casó en 1718 con Veronica Barbier y se estableció en Ardooie." },
  { generatie: "Generación 3", naam: "Georgius Delforce", jaren: "1731–1807", beroep: "Carpintero", beschrijving: "Hijo de Jacques François. En los registros, aparece por primera vez la mención de profesión 'charpentier' (carpintero)." },
  { generatie: "Generación 4", naam: "Petrus Augustinus Delforge", jaren: "1773–1840", beroep: "Carpintero y ebanista", beschrijving: "Hijo de Georgius. Además de la carpintería de construcción, la familia comienza a dedicarse a la ebanistería más fina." },
  { generatie: "Generación 5", naam: "Jean-François Deforche", jaren: "1815–1871", beroep: "Carpintero y ebanista", beschrijving: "El primer ancestro cuya profesión podemos documentar inequívocamente con actas." },
  { generatie: "Generación 6", naam: "Carolus Ludovicus Deforce", jaren: "1857–1938", beroep: "Fabricante de muebles", beschrijving: "El comienzo de la línea de fabricantes de muebles. Con sus hijos, formó la base de la empresa familiar." },
  { generatie: "Generación 7", naam: "Marcel August Deforce", jaren: "1894–1963", beroep: "Fabricante de muebles", beschrijving: "Continuación y expansión de la empresa familiar 'M. Deforce & Hijos'." },
];

const beroepsEvolutieDE = [
  { generatie: "Generation 1", naam: "Hubert Delforge", jaren: "1662–1729", beroep: "Boquillon", beschrijving: "Mann des Waldes. Ein Boquillon ist viel mehr als ein Holzfäller — jemand, der die Sprache des Waldes kennt: wie sich Stämme verhalten, wie Holz spaltet, wo ein Baum schwach ist, wann er am besten gefällt werden sollte." },
  { generatie: "Generation 2", naam: "Jacques François Deleforge", jaren: "1694–1772", beroep: "Bauer & Tagelöhner", beschrijving: "Die erste Generation, die vollständig in Westflandern Wurzeln schlug. Heiratete 1718 Veronica Barbier und ließ sich in Ardooie nieder." },
  { generatie: "Generation 3", naam: "Georgius Delforce", jaren: "1731–1807", beroep: "Zimmermann", beschrijving: "Sohn von Jacques François. In den Akten taucht zum ersten Mal die Berufsbezeichnung 'charpentier' (Zimmermann) auf." },
  { generatie: "Generation 4", naam: "Petrus Augustinus Delforge", jaren: "1773–1840", beroep: "Zimmermann & Schreiner", beschrijving: "Sohn von Georgius. Neben der Bauzimmerei beginnt die Familie sich auf feinere Schreinerarbeiten zu spezialisieren." },
  { generatie: "Generation 5", naam: "Jean-François Deforche", jaren: "1815–1871", beroep: "Zimmermann & Schreiner", beschrijving: "Der erste Vorfahre, dessen Beruf wir eindeutig mit Dokumenten belegen können." },
  { generatie: "Generation 6", naam: "Carolus Ludovicus Deforce", jaren: "1857–1938", beroep: "Möbelmacher", beschrijving: "Der Beginn der Möbelmacher-Linie. Mit seinen Söhnen bildete er die Grundlage des Familienunternehmens." },
  { generatie: "Generation 7", naam: "Marcel August Deforce", jaren: "1894–1963", beroep: "Möbelmacher", beschrijving: "Fortsetzung und Ausbau des Familienunternehmens 'M. Deforce & Söhne'." },
];

const Vakmanschap = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language, t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const beroepsEvolutie = language === 'en' ? beroepsEvolutieEN : language === 'es' ? beroepsEvolutieES : language === 'de' ? beroepsEvolutieDE : language === 'vls' ? beroepsEvolutieVLS : language === 'fr' ? beroepsEvolutieFR : language === 'pcd' ? beroepsEvolutiePCD : beroepsEvolutieNL;

  const contentNL = {
    introP1: "Wie vandaag door de Izegemse straten wandelt en de plaatselijke geschiedenis opsnuift, botst al snel op namen en beroepen die verband houden met hout. Meubelmaken, timmeren, klompen snijden — het zit verweven in de identiteit van de stad.",
    introP2: "Lang vóór Izegem zichzelf een belangrijke meubelstad noemde, was er een andere wereld waarin datzelfde hout het leven bepaalde: de bossen, houtkanten en akkers van de Weppes, ten zuiden van Rijsel. Daar begint het verhaal.",
    introP3: "Tussen de bomen van de Weppes en de ateliers van Izegem ligt bijna drie eeuwen familiale evolutie: een gestage beweging van bosarbeider naar houthakker, van landbouwer naar timmerman, van ambachtsman naar meubelmaker.",
    introP4: "In de omgeving van Lille kwamen boquillons vaak uit families die tegelijk smeden of wagenmakers waren — een combinatie van metaal- en houtbewerking. De naam \"Deleforge\" zelf verwijst naar de smidse (\"forge\").",
    heritageP1: "Het verhaal van deze familie is er één van evolutie zonder breuk. Over 250 jaar heen verschuift het beroep langzaam maar zeker:",
    heritageP2: "Het hout dat de betovergrootvader kapte in de bossen van de Weppes, wordt door zijn nazaten verwerkt tot meubels. De familie Delforge/Deforche/Deforce draagt, generatie na generatie, een lijn van vakmanschap met zich mee.",
    izegemP1: "In de tweede helft van de negentiende eeuw ontwikkelde Izegem zich tot een belangrijk centrum voor houtbewerking en meubelnijverheid.",
    izegemP2: "De familie Deforce speelde daarin een actieve rol. Het bedrijf \"M. Deforce & Zonen\" werd opgericht door Marcel Deforce en zijn zonen, en stond bekend om kwaliteitsmeubels in traditionele stijl.",
    izegemP3: "De houtsnijders van Izegem waren georganiseerd in gilden en verenigingen. Op foto's uit 1908 en 1910 zien we hen poseren met hun gereedschappen en werkstukken.",
    imgAlt: "Een meubelmakerij omstreeks 1880",
    imgCaption: "Een meubelmakerij omstreeks 1880",
    professions: ["Boquillon", "Landbouwer", "Timmerman", "Schrijnwerker", "Meubelmaker"],
    videoCaption: "Traditioneel houtbewerkingsvakmanschap — een erfgoed van generatie op generatie"
  };

  const contentFR = {
    introP1: "Quiconque se promène aujourd'hui dans les rues d'Izegem et respire l'histoire locale tombe rapidement sur des noms et des métiers liés au bois. L'ébénisterie, la menuiserie, la fabrication de sabots — c'est tissé dans l'identité de la ville.",
    introP2: "Bien avant qu'Izegem ne se soit appelée une ville du meuble importante, il existait un autre monde où ce même bois déterminait la vie : les forêts, les haies et les champs des Weppes, au sud de Lille. C'est là que commence l'histoire.",
    introP3: "Entre les arbres des Weppes et les ateliers d'Izegem se trouvent près de trois siècles d'évolution familiale : un mouvement constant de travailleur forestier à bûcheron, d'agriculteur à charpentier, d'artisan à ébéniste.",
    introP4: "Dans la région de Lille, les boquillons venaient souvent de familles qui étaient également forgerons ou charrons — une combinaison de travail du métal et du bois. Le nom \"Deleforge\" lui-même fait référence à la forge.",
    heritageP1: "L'histoire de cette famille est une histoire d'évolution sans rupture. Sur 250 ans, le métier change lentement mais sûrement :",
    heritageP2: "Le bois que l'arrière-arrière-grand-père coupait dans les forêts des Weppes est transformé en meubles par ses descendants. La famille Delforge/Deforche/Deforce porte, génération après génération, une lignée d'artisanat.",
    izegemP1: "Dans la seconde moitié du XIXe siècle, Izegem s'est développé en un centre important pour le travail du bois et l'industrie du meuble.",
    izegemP2: "La famille Deforce y a joué un rôle actif. L'entreprise \"M. Deforce & Fils\" a été fondée par Marcel Deforce et ses fils, et était connue pour ses meubles de qualité de style traditionnel.",
    izegemP3: "Les sculpteurs sur bois d'Izegem étaient organisés en guildes et associations. Sur les photos de 1908 et 1910, nous les voyons poser avec leurs outils et leurs œuvres.",
    imgAlt: "Un atelier d'ébénisterie vers 1880",
    imgCaption: "Un atelier d'ébénisterie vers 1880",
    professions: ["Boquillon", "Agriculteur", "Charpentier", "Menuisier", "Ébéniste"],
    videoCaption: "L'artisanat traditionnel du bois — un héritage de génération en génération"
  };

  const contentPCD = {
    introP1: "Quiconque s'proméne aujord'hui dins les rues d'Izegem et respire l'histoère locale tombe vite sus des noms et des métiers liés au bos. L'ébénisterie, la menuiserie, la fabrication d'sabots — ch'est tissé dins l'idintité d'la ville.",
    introP2: "Bin avant qu'Izegem n's'sot appelée eune ville du meuble importante, i existot in aute monde oùsqu'ch'méme bos déterminot la vie : les foréts, les haies et les champs des Weppes, au sud d'Lille. Ch'est là qu'i c'mince l'histoère.",
    introP3: "Intre les abes des Weppes et les ateliers d'Izegem i s'trouvent prés d'troés siécles d'évolution familiére : in mouvemint constant d'travailleur forestier à bûcheron, d'agriculteur à charpintier, d'artisan à ébéniste.",
    introP4: "Dins la région d'Lille, les boquillons i v'noéent souvint d'familles qu'étoéent égalemint forgerons ou charrons — eune combinaison d'travail du métal et du bos. L'nom \"Deleforge\" lui-méme fait référince à la forge.",
    heritageP1: "L'histoère d'chte famille ch'est eune histoère d'évolution sans rupture. Sus 250 ans, l'métier change lintémint mais sûremint :",
    heritageP2: "L'bos qu'l'arriére-arriére-grand-pére coupot dins les foréts des Weppes est transformé in meubles par ses deschindants. La famille Delforge/Deforche/Deforce porte, génératione aprés génératione, eune lignée d'artisanat.",
    izegemP1: "Dins la seconde moétié du XIXe siécle, Izegem s'est développé in in cinte important pour l'travail du bos et l'industrie du meuble.",
    izegemP2: "La famille Deforce y a joué in rôle actif. L'intreprise \"M. Deforce & Fils\" a été fondée par Marcel Deforce et ses fils, et étot connue pour ses meubles d'qualité d'style traditionnél.",
    izegemP3: "Les sculpteurs sus bos d'Izegem étoéent organisés in guildes et associationes. Sus les fotos d'1908 et 1910, nous les voyons poser aveuc leus outils et leus œuvres.",
    imgAlt: "In atelier d'ébénisterie vers 1880",
    imgCaption: "In atelier d'ébénisterie vers 1880",
    professions: ["Boquillon", "Agriculteur", "Charpintier", "Menuisier", "Ébéniste"],
    videoCaption: "L'artisanat traditionnél du bos — in héritage d'génératione in génératione"
  };

  const contentEN = {
    introP1: "Anyone walking through the streets of Izegem today and breathing in local history soon encounters names and professions related to wood. Furniture making, carpentry, clog carving — it's woven into the city's identity.",
    introP2: "Long before Izegem called itself an important furniture city, there was another world where that same wood determined life: the forests, hedgerows and fields of the Weppes, south of Lille. That's where the story begins.",
    introP3: "Between the trees of the Weppes and the workshops of Izegem lies nearly three centuries of family evolution: a steady movement from forest worker to woodcutter, from farmer to carpenter, from craftsman to furniture maker.",
    introP4: "In the Lille area, boquillons often came from families who were also blacksmiths or wheelwrights — a combination of metalwork and woodwork. The name 'Deleforge' itself refers to the forge.",
    heritageP1: "The story of this family is one of evolution without rupture. Over 250 years, the profession slowly but surely shifts:",
    heritageP2: "The wood that the great-great-grandfather cut in the forests of the Weppes is transformed into furniture by his descendants. The Delforge/Deforche/Deforce family carries, generation after generation, a line of craftsmanship.",
    izegemP1: "In the second half of the nineteenth century, Izegem developed into an important center for woodworking and furniture industry.",
    izegemP2: "The Deforce family played an active role in this. The company 'M. Deforce & Sons' was founded by Marcel Deforce and his sons, and was known for quality furniture in traditional style.",
    izegemP3: "The wood carvers of Izegem were organized in guilds and associations. In photos from 1908 and 1910, we see them posing with their tools and workpieces.",
    imgAlt: "A furniture workshop around 1880",
    imgCaption: "A furniture workshop around 1880",
    professions: ["Boquillon", "Farmer", "Carpenter", "Joiner", "Furniture maker"],
    videoCaption: "Traditional woodworking craftsmanship — a heritage passed down through generations"
  };

  const contentES = {
    introP1: "Quien camina hoy por las calles de Izegem y respira la historia local pronto encuentra nombres y profesiones relacionados con la madera. La fabricación de muebles, la carpintería, el tallado de zuecos — está tejido en la identidad de la ciudad.",
    introP2: "Mucho antes de que Izegem se llamara a sí misma una ciudad importante de muebles, había otro mundo donde esa misma madera determinaba la vida: los bosques, setos y campos de los Weppes, al sur de Lille. Ahí es donde comienza la historia.",
    introP3: "Entre los árboles de los Weppes y los talleres de Izegem hay casi tres siglos de evolución familiar: un movimiento constante de trabajador forestal a leñador, de agricultor a carpintero, de artesano a fabricante de muebles.",
    introP4: "En la región de Lille, los boquillons a menudo provenían de familias que también eran herreros o carreteros — una combinación de trabajo del metal y la madera. El nombre 'Deleforge' en sí se refiere a la fragua.",
    heritageP1: "La historia de esta familia es una de evolución sin ruptura. A lo largo de 250 años, la profesión cambia lenta pero seguramente:",
    heritageP2: "La madera que el tatarabuelo cortaba en los bosques de los Weppes se transforma en muebles por sus descendientes. La familia Delforge/Deforche/Deforce lleva, generación tras generación, una línea de artesanía.",
    izegemP1: "En la segunda mitad del siglo XIX, Izegem se desarrolló como un centro importante para el trabajo de la madera y la industria del mueble.",
    izegemP2: "La familia Deforce jugó un papel activo en esto. La empresa 'M. Deforce & Hijos' fue fundada por Marcel Deforce y sus hijos, y era conocida por muebles de calidad en estilo tradicional.",
    izegemP3: "Los talladores de madera de Izegem estaban organizados en gremios y asociaciones. En fotos de 1908 y 1910, los vemos posando con sus herramientas y piezas de trabajo.",
    imgAlt: "Un taller de muebles alrededor de 1880",
    imgCaption: "Un taller de muebles alrededor de 1880",
    professions: ["Boquillon", "Agricultor", "Carpintero", "Ebanista", "Fabricante de muebles"],
    videoCaption: "Artesanía tradicional de la madera — un patrimonio transmitido de generación en generación"
  };

  const contentVLS = {
    introP1: "Wie vandoage deur de Izegemse stroaten wandelt en de ploatselijke geschiedenis opsnuuft, botst al gauw op noamen en beroepen die verband houden mê hout. Meubelmoaken, timmeren, klompen snijden — 't zit verweven in de identiteit van de stad.",
    introP2: "Lange vo Izegem z'n eigen nen belangrijken meubelstad noemde, was er een andere wereld woarin da datzelfsten hout 't leven bepaalde: de bossen, houtkanten en akkers van de Weppes, ten zuuden van Rijsel. Doar begust 't verhaal.",
    introP3: "Tussen de bomen van de Weppes en de ateliers van Izegem ligt bijkans drie eeuwen familiale evolutie: een gestoadige bewegienge van bosarbeider noar houtkapper, van landbouwer noar timmerman, van ambachtsman noar meubelmoaker.",
    introP4: "In de omgevienge van Lille kwamen boquillons dikwijls uut families die tegelijk smeên of woagenmoakers woaren — een combinoatie van metaal- en houtbewerking. De noame \"Deleforge\" z'n eigen verwijst noar de smisse (\"forge\").",
    heritageP1: "'t Verhaal van deze familie is er ien van evolutie zonder breuke. Over 250 joar heen verschuuft 't beroep stillekes moa zeker:",
    heritageP2: "'t Hout da de betovergrootvader kapte in de bossen van de Weppes, wor deur z'n nozoaten verwerkt toe meubels. De familie Delforge/Deforche/Deforce droagt, generatie noa generatie, een lienje van vakmanschap mê ulder mee.",
    izegemP1: "In de tweeden helft van de negentiende eeuw ontwikkelde Izegem ulder toe nen belangrijken cinter vo houtbewerking en meubelnijverheid.",
    izegemP2: "De familie Deforce speelde doarin nen actieven rol. 't Bedrijf \"M. Deforce & Zeunes\" wier opgericht deur Marcel Deforce en z'n zeunes, en stond gekend vo kwaliteitsmeubels in traditionele stijl.",
    izegemP3: "De houtsnijders van Izegem woaren georganiseerd in gildes en verenigiengen. Op foto's uut 1908 en 1910 zien me ze poseren mê ulder gereedschappen en werkstukken.",
    imgAlt: "Nen meubelmoakerije omstreeks 1880",
    imgCaption: "Nen meubelmoakerije omstreeks 1880",
    professions: ["Boquillon", "Landbouwer", "Timmerman", "Schrijnwerker", "Meubelmoaker"],
    videoCaption: "Traditioneel houtbewerkingsvakmanschap — een erfgoed van generatie op generatie"
  };

  const contentDE = {
    introP1: "Wer heute durch die Straßen von Izegem spaziert und die lokale Geschichte einatmet, stößt schnell auf Namen und Berufe, die mit Holz zusammenhängen. Möbelbau, Zimmerei, Holzschuhschnitzen — es ist in die Identität der Stadt verwoben.",
    introP2: "Lange bevor Izegem sich eine wichtige Möbelstadt nannte, gab es eine andere Welt, in der dasselbe Holz das Leben bestimmte: die Wälder, Hecken und Felder der Weppes, südlich von Lille. Dort beginnt die Geschichte.",
    introP3: "Zwischen den Bäumen der Weppes und den Werkstätten von Izegem liegen fast drei Jahrhunderte familiärer Entwicklung: eine stetige Bewegung vom Waldarbeiter zum Holzfäller, vom Bauern zum Zimmermann, vom Handwerker zum Möbelmacher.",
    introP4: "In der Gegend um Lille kamen Boquillons oft aus Familien, die auch Schmiede oder Wagenbauer waren — eine Kombination aus Metall- und Holzbearbeitung. Der Name \"Deleforge\" selbst verweist auf die Schmiede (\"forge\").",
    heritageP1: "Die Geschichte dieser Familie ist eine der Entwicklung ohne Bruch. Über 250 Jahre hinweg verschiebt sich der Beruf langsam aber sicher:",
    heritageP2: "Das Holz, das der Ururgroßvater in den Wäldern der Weppes schlug, wird von seinen Nachkommen zu Möbeln verarbeitet. Die Familie Delforge/Deforche/Deforce trägt, Generation für Generation, eine Linie des Handwerks mit sich.",
    izegemP1: "In der zweiten Hälfte des neunzehnten Jahrhunderts entwickelte sich Izegem zu einem wichtigen Zentrum für Holzbearbeitung und Möbelindustrie.",
    izegemP2: "Die Familie Deforce spielte dabei eine aktive Rolle. Das Unternehmen \"M. Deforce & Söhne\" wurde von Marcel Deforce und seinen Söhnen gegründet und war für Qualitätsmöbel im traditionellen Stil bekannt.",
    izegemP3: "Die Holzschnitzer von Izegem waren in Gilden und Vereinigungen organisiert. Auf Fotos von 1908 und 1910 sehen wir sie mit ihren Werkzeugen und Werkstücken posieren.",
    imgAlt: "Eine Möbelwerkstatt um 1880",
    imgCaption: "Eine Möbelwerkstatt um 1880",
    professions: ["Boquillon", "Bauer", "Zimmermann", "Schreiner", "Möbelmacher"],
    videoCaption: "Traditionelles Holzbearbeitungshandwerk — ein Erbe von Generation zu Generation"
  };

  const content = language === 'en' ? contentEN : language === 'es' ? contentES : language === 'de' ? contentDE : language === 'vls' ? contentVLS : language === 'fr' ? contentFR : language === 'pcd' ? contentPCD : contentNL;

  return (
    <section id="vakmanschap" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">
            {t('vakmanschap.title')}
          </h2>
          <p className="font-sans text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('vakmanschap.subtitle')}
          </p>
          <div className="vintage-divider mt-6" />
        </motion.div>

        {/* Video sectie */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mb-12"
        >
          <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border">
            <AiLabel className="top-3 left-3" />
            <video
              src={woodworkingVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
              <p className="text-foreground/90 text-lg font-serif italic">
                {content.videoCaption}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Inleiding */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12 grid md:grid-cols-2 gap-8 items-center"
        >
          <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
            <p>{content.introP1}</p>
            <p>{content.introP2}</p>
            <p>{content.introP3}</p>
            <p>{content.introP4}</p>
          </div>
          <figure className="relative rounded-lg overflow-hidden shadow-card photo-positive">
            <AiLabel className="top-3 left-3" />
            <img 
              src={meubelatelierImg} 
              alt={content.imgAlt} 
              className="w-full h-auto"
            />
            <figcaption className="bg-card p-3 text-sm text-muted-foreground text-center">
              {content.imgCaption}
            </figcaption>
          </figure>
        </motion.div>

        {/* Lees meer/minder knop */}
        <div className="flex justify-center mb-8">
          <Button
            variant="outline"
            onClick={() => {
              if (isExpanded) {
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
                 language === 'vls' ? 'Liest minder' :
                 'Lees minder'}
                <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              </>
            ) : (
              <>
                {language === 'nl' ? 'Lees meer over de beroepsevolutie' : 
                 language === 'fr' ? 'En savoir plus sur l\'évolution professionnelle' : 
                 language === 'en' ? 'Read more about the professional evolution' : 
                 language === 'es' ? 'Leer más sobre la evolución profesional' : 
                 language === 'de' ? 'Mehr über die Berufsentwicklung lesen' :
                 language === 'pcd' ? 'In savoér pus sus l\'évolution professionelle' : 
                 language === 'vls' ? 'Liest mee over de beroepsevolutie' :
                 'Lees meer over de beroepsevolutie'}
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
              {/* Beroepsevolutie timeline */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-12"
              >
                <h3 className="font-serif text-2xl font-bold text-primary mb-8 text-center">
                  {t('vakmanschap.evolution')}
                </h3>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform md:-translate-x-1/2" />
                  
                  <div className="space-y-8">
                    {beroepsEvolutie.map((item, index) => (
                      <motion.div
                        key={item.naam}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                        className={`relative flex flex-col md:flex-row ${
                          index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                        } items-start md:items-center gap-4`}
                      >
                        {/* Dot */}
                        <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-accent rounded-full border-4 border-background transform -translate-x-1/2 z-10" />
                        
                        {/* Content */}
                        <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                          <div className="bg-card p-6 rounded-lg shadow-card border border-border">
                            <span className="text-xs font-medium text-accent uppercase tracking-wide">
                              {item.generatie}
                            </span>
                            <h4 className="font-serif text-xl font-bold text-primary mt-1">
                              {item.naam}
                            </h4>
                            <p className="text-sm text-muted-foreground italic">{item.jaren}</p>
                            <p className="text-lg font-serif font-semibold text-accent mt-2">
                              {item.beroep}
                            </p>
                            <p className="text-foreground/80 mt-2 text-sm leading-relaxed">
                              {item.beschrijving}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Rode draad: hout */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="p-8 bg-primary/5 rounded-lg border border-primary/20 mb-12"
              >
                <h3 className="font-serif text-2xl font-bold text-primary mb-4 text-center">
                  {t('vakmanschap.heritage')}
                </h3>
                <div className="max-w-3xl mx-auto text-center">
                  <p className="text-foreground/80 leading-relaxed mb-4">
                    {content.heritageP1}
                  </p>
                  <div className="flex flex-wrap justify-center items-center gap-2 text-lg font-serif">
                    {content.professions.map((prof, i) => (
                      <span key={prof}>
                        <span className="bg-accent/20 px-3 py-1 rounded">{prof}</span>
                        {i < content.professions.length - 1 && <span className="text-accent mx-2">→</span>}
                      </span>
                    ))}
                  </div>
                  <p className="text-foreground/80 leading-relaxed mt-6">
                    {content.heritageP2}
                  </p>
                </div>
              </motion.div>

              {/* Izegem als meubelstad */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="bg-background rounded-lg shadow-card border border-border p-8"
              >
                <h3 className="font-serif text-2xl font-bold text-primary mb-4">
                  {t('vakmanschap.izegem')}
                </h3>
                <div className="prose prose-lg max-w-none text-foreground/80 space-y-4">
                  <p>{content.izegemP1}</p>
                  <p>{content.izegemP2}</p>
                  <p>{content.izegemP3}</p>
                </div>
                <div className="flex justify-center mt-6">
                  <ShareButton sectionId="vakmanschap" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Vakmanschap;
