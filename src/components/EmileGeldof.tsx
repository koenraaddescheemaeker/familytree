import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, ChevronUp, Wine, Users, Baby, Heart, Briefcase, FileText, X, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import ShareButton from "@/components/ui/ShareButton";
import emilePortrait from "@/assets/emile-geldof-portrait.png";
import gezinFoto from "@/assets/gezin-emile-geldof.jpg";
import familieNonnen from "@/assets/familie-geldof-nonnen.jpg";
import huwelijksakte from "@/assets/huwelijksakte-geldof-1893.png";
import slagWestrozebeke from "@/assets/slag-westrozebeke.jpg";

const kinderen = [
  { naam: "Joseph Geldof", jaren: "1894–1966", status: "Oud-strijder WO.1, Vuurkruiser, Ridder Leopold II" },
  { naam: "Magdalena Geldof", jaren: "1897–1971", status: "Onze grootmoeder (Madeleine)" },
  { naam: "Margareta Geldof", jaren: "1898–1967", status: "" },
  { naam: "Maurice Geldof", jaren: "1902–1979", status: "" },
];

const EmileGeldof = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showTranscription, setShowTranscription] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [activePerson, setActivePerson] = useState<string | null>(null);

  const familyMembers = [
    { id: 'maurice', name: 'Maurice Geldof', years: '1902–1979', top: '18%', left: '12%' },
    { id: 'joseph', name: 'Joseph Geldof', years: '1894–1966', top: '18%', left: '38%' },
    { id: 'margareta', name: 'Margareta Geldof', years: '1898–1967', top: '18%', left: '62%' },
    { id: 'marcel', name: 'Marcel Deforce', years: '1893–1983', top: '8%', left: '80%' },
    { id: 'emile', name: 'Emile Geldof', years: '1865–1951', top: '60%', left: '5%' },
    { id: 'theresia', name: 'Maria-Theresia Vanderheeren', years: '1870–1947', top: '60%', left: '30%' },
    { id: 'magdalena', name: 'Magdalena Geldof', years: '1897–1971', top: '38%', left: '90%' },
    { id: 'maria', name: 'Maria Deforce', years: '1918–2011', top: '60%', left: '80%' },
  ];

  const content = {
    nl: {
      title: "Emile Geldof",
      subtitle: "Overgrootvader • 1865–1951",
      intro: "Het weinige dat we weten over Emiel Geldof, de vader van mijn grootmoeder Madeleine Geldof – Grote Meter – heb ik vooral moeten afleiden uit amper twee foto's en de details die ik kon puren uit de klassieke documenten van de Burgerlijke Stand.",
      origin: "Emile werd op 21 januari 1865 geboren uit een werkmansgezin: vader Jan ('Joannes') was wever, en zijn moeder naaister. Ze zwoegden als kleine zelfstandige werkers zonder enige sociale zekerheid voor opdrachtgevers die doorgaans de tarieven eigenmachtig oplegden. Typische thuisarbeid met een weefgetouw in de huiskamer.",
      location: "Ze woonden in de wijk Klein-Harelbeke, een eind buiten het centrum van Izegem, halverwege naar de wijk Bosmolens. Ze maakten nog geen deel uit van het industriële proletariaat dat in die periode ontstond in de borstel- en de schoennijverheid.",
      illiteracy: "In de geboorteakte van Emile staat genoteerd dat zowel vader Jan als zijn broer Joseph Geldof, die getuige was, niet konden lezen noch schrijven en dus niet in staat waren hun handtekening te zetten.",
      firstMarriage: "In april 1892 trouwt hij op een leeftijd van 27 jaar, voor een eerste keer, met Marie-Louise d'Artois. In de huwelijksakte wordt zijn beroep als 'wijntapper' vermeld. Zij was 'wascheres' (wasvrouw). Ze krijgen op 15 mei 1893 samen een dochter, Maria Magdalena.",
      tragedy: "Zijn vrouw Marie-Louise overlijdt in het ziekenhuis wellicht tengevolge van complicaties na de bevalling, op 6 juni 1893. Emile blijft achter met een baby-dochtertje van enkele weken oud. Het kind zal maar twee jaar oud worden en overlijdt op 4 april 1895.",
      secondMarriage: "Reeds 1 maand later trouwt hij voor een tweede keer, met de 25-jarige Maria-Theresia Vanderheeren, weefster, dochter van Bruno Vanderheeren & Felicita Marysse.",
      childrenTitle: "Kinderen uit tweede huwelijk",
      familyPhoto: "Een unieke gezinsfoto",
      familyPhotoDesc: "Eén van de zeldzame 'oude' foto's toont het gezin van Emile Geldof & Maria-Theresia Vanderheeren. Schoonzoon Marcel Deforce staat erbij. Deze foto moet genomen zijn ergens eind 1918 of vroeg 1919: de bomen zijn kaal. Dochtertje Maria van Marcel en Magdalena, geboren op 23 oktober 1918, zit op haar moeders schoot.",
      profession: "Van wijntappersknecht tot wijntapper",
      professionDesc: "In de diverse akten wordt hij door elkaar als wijntapper, wijntappersgast, wijstekersknecht, en later steevast alleen 'wijntapper' genoemd. Dat wijst erop dat hij begon als leerjongen en ervaring opdeed in het tappen en verkopen van wijn.",
      wineTapper: "Een wijntapper was geen grote cafébaas, maar een zelfstandige kleine middenstander, die wijn tapte en verkocht per glas of per karaf, soms in een bescheiden gelagzaal, soms vanuit de eigen woning.",
      whatDidWineTapper: "Wat deed een wijntapper?",
      wineTapperDetails: "Een wijntapper verkocht wijn (meestal rode en witte tafelwijn), tapte wijn per glas, karaf of liter, deed dit ter plaatse (in een herberg of gelagzaal); soms ook voor afhaling. Het ging zelden om luxeproducten: het was doorgaans goedkope, vaak ingevoerde wijn uit Frankrijk, bedoeld voor het gewone volk.",
      socialRole: "Dat Emile Geldof juist in die moeilijke oorlogsjaren als wijntapper actief was, wijst op ondernemingszin en volharding. Kleine wijntappers vervulden niet alleen een economische, maar ook een sociale rol: hun zaak fungeerde als ontmoetingsplaats waar nieuws werd uitgewisseld.",
      showMore: "Toon meer",
      showLess: "Toon minder",
      sistersPhoto: "De zussen Leonie en Sylvie als kloosterzusters, met Emile rechts en zijn broer Henry links. Madeleine (Grote meter) staat in het midden.",
    },
    fr: {
      title: "Emile Geldof",
      subtitle: "Arrière-grand-père • 1865–1951",
      intro: "Le peu que nous savons d'Émile Geldof, le père de ma grand-mère Madeleine Geldof – Grande Mémé – je l'ai principalement déduit de deux photos et des détails que j'ai pu tirer des documents classiques de l'État civil.",
      origin: "Emile est né le 21 janvier 1865 dans une famille ouvrière : son père Jan ('Joannes') était tisserand, et sa mère couturière. Ils travaillaient comme petits indépendants sans aucune sécurité sociale.",
      location: "Ils habitaient dans le quartier Klein-Harelbeke, à l'écart du centre d'Izegem, à mi-chemin du quartier Bosmolens.",
      illiteracy: "L'acte de naissance d'Émile indique que son père Jan et son frère Joseph, témoin, ne savaient ni lire ni écrire.",
      firstMarriage: "En avril 1892, à 27 ans, il épouse pour la première fois Marie-Louise d'Artois. Son métier est mentionné comme 'cabaretier de vin'. Elle était 'laveuse'.",
      tragedy: "Son épouse Marie-Louise décède à l'hôpital, probablement suite à des complications post-partum, le 6 juin 1893. L'enfant n'aura que deux ans et décède le 4 avril 1895.",
      secondMarriage: "Un mois plus tard, il épouse Maria-Theresia Vanderheeren, 25 ans, tisseuse.",
      childrenTitle: "Enfants du second mariage",
      familyPhoto: "Une photo de famille unique",
      familyPhotoDesc: "Une des rares 'anciennes' photos montre la famille d'Émile Geldof & Maria-Theresia Vanderheeren. Le gendre Marcel Deforce est présent. Cette photo date probablement de fin 1918 ou début 1919.",
      profession: "De garçon cabaretier à cabaretier",
      professionDesc: "Dans les divers actes, il est appelé tantôt cabaretier, garçon cabaretier, puis simplement 'cabaretier'. Cela indique qu'il a commencé comme apprenti.",
      wineTapper: "Un cabaretier de vin n'était pas un grand cafetier, mais un petit commerçant indépendant qui servait et vendait du vin au verre ou à la carafe.",
      whatDidWineTapper: "Que faisait un cabaretier de vin?",
      wineTapperDetails: "Un cabaretier vendait du vin (généralement rouge et blanc de table), servait le vin au verre, en carafe ou au litre. C'était rarement des produits de luxe : du vin bon marché, souvent importé de France.",
      socialRole: "Qu'Émile Geldof ait été actif comme cabaretier pendant ces années de guerre difficiles témoigne de son esprit d'entreprise. Les petits cabaretiers jouaient un rôle social : leur établissement servait de lieu de rencontre.",
      showMore: "Voir plus",
      showLess: "Voir moins",
      sistersPhoto: "Les sœurs Leonie et Sylvie comme religieuses, avec Émile à droite et son frère Henry à gauche. Madeleine (Grande Mémé) est au centre.",
    },
    en: {
      title: "Emile Geldof",
      subtitle: "Great-grandfather • 1865–1951",
      intro: "The little we know about Emiel Geldof, the father of my grandmother Madeleine Geldof – Great Grandmother – I have mainly had to deduce from barely two photos and the details I could glean from the classic Civil Registry documents.",
      origin: "Emile was born on January 21, 1865 into a working-class family: father Jan ('Joannes') was a weaver, and his mother a seamstress. They toiled as small independent workers without any social security.",
      location: "They lived in the Klein-Harelbeke district, some distance from the center of Izegem, halfway to the Bosmolens district.",
      illiteracy: "Emile's birth certificate notes that both father Jan and his brother Joseph Geldof, who was a witness, could neither read nor write.",
      firstMarriage: "In April 1892, at the age of 27, he married for the first time, to Marie-Louise d'Artois. His profession is listed as 'wine tapper'. She was a 'washerwoman'.",
      tragedy: "His wife Marie-Louise died in hospital, probably due to complications after childbirth, on June 6, 1893. The child would only reach two years of age and died on April 4, 1895.",
      secondMarriage: "Just one month later, he married for the second time, to the 25-year-old Maria-Theresia Vanderheeren, a weaver.",
      childrenTitle: "Children from second marriage",
      familyPhoto: "A unique family photo",
      familyPhotoDesc: "One of the rare 'old' photos shows the family of Emile Geldof & Maria-Theresia Vanderheeren. Son-in-law Marcel Deforce is present. This photo must have been taken sometime in late 1918 or early 1919: the trees are bare.",
      profession: "From wine tapper's apprentice to wine tapper",
      professionDesc: "In the various records, he is called alternately wine tapper, wine tapper's assistant, and later simply 'wine tapper'. This indicates he started as an apprentice.",
      wineTapper: "A wine tapper was not a large pub owner, but a small independent trader who served and sold wine by the glass or carafe.",
      whatDidWineTapper: "What did a wine tapper do?",
      wineTapperDetails: "A wine tapper sold wine (usually red and white table wine), served wine by the glass, carafe or liter. These were rarely luxury products: usually cheap, often imported wine from France, intended for ordinary people.",
      socialRole: "That Emile Geldof was active as a wine tapper during those difficult war years shows entrepreneurship and perseverance. Small wine tappers fulfilled not only an economic but also a social role: their establishment served as a meeting place.",
      showMore: "Show more",
      showLess: "Show less",
      sistersPhoto: "Sisters Leonie and Sylvie as nuns, with Emile on the right and his brother Henry on the left. Madeleine (Great Grandmother) stands in the center.",
    },
    de: {
      title: "Emile Geldof",
      subtitle: "Urgroßvater • 1865–1951",
      intro: "Das Wenige, was wir über Emiel Geldof wissen, den Vater meiner Großmutter Madeleine Geldof – Große Oma – habe ich hauptsächlich aus kaum zwei Fotos und den Details ableiten müssen, die ich aus den klassischen Dokumenten des Standesamts gewinnen konnte.",
      origin: "Emile wurde am 21. Januar 1865 in eine Arbeiterfamilie geboren: Vater Jan ('Joannes') war Weber, und seine Mutter Näherin. Sie arbeiteten als kleine Selbstständige ohne jegliche soziale Absicherung.",
      location: "Sie wohnten im Viertel Klein-Harelbeke, etwas außerhalb des Zentrums von Izegem, auf halbem Weg zum Viertel Bosmolens.",
      illiteracy: "In Emiles Geburtsurkunde ist vermerkt, dass sowohl Vater Jan als auch sein Bruder Joseph Geldof, der Zeuge war, weder lesen noch schreiben konnten.",
      firstMarriage: "Im April 1892 heiratet er im Alter von 27 Jahren zum ersten Mal Marie-Louise d'Artois. Sein Beruf wird als 'Weinzapfer' angegeben. Sie war 'Wäscherin'.",
      tragedy: "Seine Frau Marie-Louise stirbt im Krankenhaus, vermutlich an Komplikationen nach der Geburt, am 6. Juni 1893. Das Kind wird nur zwei Jahre alt und stirbt am 4. April 1895.",
      secondMarriage: "Bereits einen Monat später heiratet er zum zweiten Mal, die 25-jährige Maria-Theresia Vanderheeren, eine Weberin.",
      childrenTitle: "Kinder aus zweiter Ehe",
      familyPhoto: "Ein einzigartiges Familienfoto",
      familyPhotoDesc: "Eines der seltenen 'alten' Fotos zeigt die Familie von Emile Geldof & Maria-Theresia Vanderheeren. Schwiegersohn Marcel Deforce ist dabei. Das Foto muss Ende 1918 oder Anfang 1919 entstanden sein: die Bäume sind kahl.",
      profession: "Vom Weinzapfergehilfen zum Weinzapfer",
      professionDesc: "In den verschiedenen Urkunden wird er abwechselnd als Weinzapfer, Weinzapfergehilfe und später einfach 'Weinzapfer' bezeichnet. Das deutet darauf hin, dass er als Lehrling begann.",
      wineTapper: "Ein Weinzapfer war kein großer Gastwirt, sondern ein kleiner selbstständiger Händler, der Wein glas- oder karafenweise ausschenkte und verkaufte.",
      whatDidWineTapper: "Was machte ein Weinzapfer?",
      wineTapperDetails: "Ein Weinzapfer verkaufte Wein (meist roten und weißen Tafelwein), schenkte Wein glas-, karaffen- oder literweise aus. Es waren selten Luxusprodukte: meist billiger, oft aus Frankreich importierter Wein für einfache Leute.",
      socialRole: "Dass Emile Geldof gerade in den schwierigen Kriegsjahren als Weinzapfer tätig war, zeugt von Unternehmergeist und Ausdauer. Kleine Weinzapfer erfüllten nicht nur eine wirtschaftliche, sondern auch eine soziale Rolle.",
      showMore: "Mehr anzeigen",
      showLess: "Weniger anzeigen",
      sistersPhoto: "Die Schwestern Leonie und Sylvie als Nonnen, mit Emile rechts und seinem Bruder Henry links. Madeleine (Große Oma) steht in der Mitte.",
    },
    es: {
      title: "Emile Geldof",
      subtitle: "Bisabuelo • 1865–1951",
      intro: "Lo poco que sabemos sobre Emiel Geldof, el padre de mi abuela Madeleine Geldof – Bisabuela – lo he tenido que deducir principalmente de apenas dos fotos y los detalles que pude extraer de los documentos clásicos del Registro Civil.",
      origin: "Emile nació el 21 de enero de 1865 en una familia obrera: el padre Jan ('Joannes') era tejedor, y su madre costurera. Trabajaban como pequeños autónomos sin ninguna seguridad social.",
      location: "Vivían en el barrio de Klein-Harelbeke, a cierta distancia del centro de Izegem, a medio camino del barrio de Bosmolens.",
      illiteracy: "El certificado de nacimiento de Emile indica que tanto el padre Jan como su hermano Joseph Geldof, que fue testigo, no sabían leer ni escribir.",
      firstMarriage: "En abril de 1892, a los 27 años, se casa por primera vez con Marie-Louise d'Artois. Su profesión aparece como 'tabernero de vino'. Ella era 'lavandera'.",
      tragedy: "Su esposa Marie-Louise muere en el hospital, probablemente por complicaciones después del parto, el 6 de junio de 1893. La niña solo llegará a los dos años y muere el 4 de abril de 1895.",
      secondMarriage: "Apenas un mes después, se casa por segunda vez con Maria-Theresia Vanderheeren, de 25 años, tejedora.",
      childrenTitle: "Hijos del segundo matrimonio",
      familyPhoto: "Una foto familiar única",
      familyPhotoDesc: "Una de las raras fotos 'antiguas' muestra a la familia de Emile Geldof y Maria-Theresia Vanderheeren. El yerno Marcel Deforce está presente. Esta foto debe haber sido tomada a finales de 1918 o principios de 1919.",
      profession: "De aprendiz de tabernero a tabernero",
      professionDesc: "En los diversos registros, se le llama alternativamente tabernero, ayudante de tabernero, y más tarde simplemente 'tabernero'. Esto indica que comenzó como aprendiz.",
      wineTapper: "Un tabernero de vino no era un gran dueño de bar, sino un pequeño comerciante independiente que servía y vendía vino por copa o jarra.",
      whatDidWineTapper: "¿Qué hacía un tabernero de vino?",
      wineTapperDetails: "Un tabernero vendía vino (generalmente tinto y blanco de mesa), servía vino por copa, jarra o litro. Rara vez eran productos de lujo: generalmente vino barato, a menudo importado de Francia.",
      socialRole: "Que Emile Geldof estuviera activo como tabernero durante esos difíciles años de guerra demuestra espíritu emprendedor y perseverancia. Los pequeños taberneros cumplían no solo un rol económico, sino también social.",
      showMore: "Ver más",
      showLess: "Ver menos",
      sistersPhoto: "Las hermanas Leonie y Sylvie como monjas, con Emile a la derecha y su hermano Henry a la izquierda. Madeleine (Bisabuela) está en el centro.",
    },
    vls: {
      title: "Emile Geldof",
      subtitle: "Overgrôotvader • 1865–1951",
      intro: "'t Weinige da me weten over Emiel Geldof, de vader van myn grôotmoeder Madeleine Geldof – Grôote Meter – heb ik vooral moeten afleiden uut amper twêe foto's en de details die 'k kon puren uut de klassieke documenten van de Burgerlyke Stand.",
      origin: "Emile wierd gebôoren op 21 januari 1865 uut een werkmansgezin: vader Jan ('Joannes') was wever, en zyn moeder naaister. Ze zwoegden as kleine zelfstandige werkers zonder sociale zekerheid.",
      location: "Ze woonden in de wyk Klein-Harelbeke, een eind buuten 't centrum van Izegem, halverwege noar de wyk Bosmolens.",
      illiteracy: "In de geboorteakte van Emile stoat genoteerd dat zowel vader Jan as zyn broer Joseph Geldof nie konden lezen noch schryven.",
      firstMarriage: "In april 1892 trouwt ie op een leeftyd van 27 joar, voe de eerste kêer, mee Marie-Louise d'Artois. Zyn beroep wordt als 'wyntapper' vermeld. Ze was 'wascheres'.",
      tragedy: "Zyn vrouwe Marie-Louise overlydt in 't ziekenhuis, wellicht tengevolge van complicaties na de bevalling, op 6 juni 1893. 't Kind zal mo twêe joar oud worden en sterft op 4 april 1895.",
      secondMarriage: "Reeds 1 maand later trouwt ie voe de twêede kêer, mee de 25-joarige Maria-Theresia Vanderheeren, weefster.",
      childrenTitle: "Kinders uut tweede huwelik",
      familyPhoto: "Eenige gezinsfoto",
      familyPhotoDesc: "Êen van de zeldzame 'oude' foto's toont 't gezin van Emile Geldof & Maria-Theresia Vanderheeren. Schôonzeune Marcel Deforce stoat erbei. De foto moet genomen zyn ergens eind 1918 of begin 1919.",
      profession: "Van wyntappersknecht tot wyntapper",
      professionDesc: "In de diverse akten wordt ie door mekoar as wyntapper, wyntappersgast, wyntekersknecht, en later steevast 'wyntapper' genoemd. Da wyst erop dat ie begost as leerjongen.",
      wineTapper: "'n Wyntapper was geen grôote cafébaas, mo 'n zelfstandige kleine middenstandel, die wyn tapte en verkocht per glas of per karaf.",
      whatDidWineTapper: "Wa deed 'n wyntapper?",
      wineTapperDetails: "'n Wyntapper verkocht wyn (meestal rôoie en witte tafelwyn), tapte wyn per glas, karaf of liter. 't Ging zelden om luxeproducten: 't was doorgaans goedkôope, dikwils ingevoerde wyn uut Frankryk.",
      socialRole: "Da Emile Geldof just in die moeilyke oorlogsjoaren as wyntapper actief was, wyst op ondernemingszin en volharding. Kleine wyntappers vervulden ook een sociale rol: hun zaak fungeerde as ontmoetingsploatse.",
      showMore: "Tôon mêer",
      showLess: "Tôon minder",
      sistersPhoto: "De zusters Leonie en Sylvie as kloosterzusters, mee Emile rechts en zyn broer Henry links. Madeleine (Grôote meter) stoat in 't midden.",
    },
    pcd: {
      title: "Emile Geldof",
      subtitle: "Arière-grand-pére • 1865–1951",
      intro: "Eul peu qu'on sait d'Émile Geldof, l'pére ed min grand-mére Madeleine Geldof – Grande Mémé – j'lai principalmint déduit d'à peine deux photos et d'chés détails que j'ai pu tirer d'chés documents classiques d'l'État civil.",
      origin: "Emile il est né l'21 janvier 1865 dins eune famile ouvrière : sin pére Jan ('Joannes') étot tisserand, et s'mére couturière. Is boulonnottent comme petits indépindants sans aucune sécurité sociale.",
      location: "Is habitottent dins l'quartier Klein-Harelbeke, un bout d'hors du cinte d'Izegem, à mi-chemin du quartier Bosmolens.",
      illiteracy: "L'acte ed naissance d'Émile indique que sin pére Jan et sin frére Joseph, témoin, n'savottent ni lire ni écrire.",
      firstMarriage: "In avril 1892, à 27 ans, i s'marie pour l'preumière foés avec Marie-Louise d'Artois. Sin métier est marqué comme 'cabaretier d'vin'. Ale étot 'laveuse'.",
      tragedy: "S'femme Marie-Louise ale muurt à l'hôpital, probablemint à cause d'complications après l'accouchemint, l'6 juin 1893. L'infant n'ara qu'deux ans et muurt l'4 avril 1895.",
      secondMarriage: "Un moés après, i s'marie avec Maria-Theresia Vanderheeren, 25 ans, tisseuse.",
      childrenTitle: "Infants du deuxième mariage",
      familyPhoto: "Eune photo ed famile unique",
      familyPhotoDesc: "Eune d'chés rares 'viés' photos montre l'famile d'Émile Geldof & Maria-Theresia Vanderheeren. L'biau-fils Marcel Deforce il est présint. Chte photo ale doit dater d'fin 1918 ou début 1919.",
      profession: "D'garçon cabaretier à cabaretier",
      professionDesc: "Dins chés divers actes, il est nommé tantôt cabaretier, garçon cabaretier, pis simplemint 'cabaretier'. Cha indique qu'il a coumincé comme apprenti.",
      wineTapper: "Un cabaretier d'vin n'étot point un grand cafetier, mais un petit commerçant indépindant qui siervo et vindot du vin au verre ou à l'carafe.",
      whatDidWineTapper: "Quoé qu'i faiso un cabaretier d'vin?",
      wineTapperDetails: "Un cabaretier vindot du vin (généralemint rouge et blanc d'table), siervo l'vin au verre, in carafe ou au litre. C'étot raremint d'chés produits d'luxe : du vin bon marché, souvint importé d'France.",
      socialRole: "Qu'Émile Geldof il étot actif comme cabaretier pindant chés années d'guère difficiles montre sin esprit d'intreprise. Chés petits cabaretiers is jouottent un rôle social : leu établissemint siervo d'liu d'rinconte.",
      showMore: "Vir pus",
      showLess: "Vir moins",
      sistersPhoto: "Chés sœurs Leonie et Sylvie comme relijeuses, avec Émile à droéte et sin frére Henry à gauche. Madeleine (Grande Mémé) ale est au mitan.",
    },
    sv: {
      title: "Emile Geldof",
      subtitle: "Gammelfar • 1865–1951",
      intro: "Det lilla vi vet om Emiel Geldof, far till min mormor Madeleine Geldof – Stora Mormor – har jag främst fått härleda från knappt två fotografier och de detaljer jag kunde utvinna ur de klassiska dokumenten från folkbokföringen.",
      origin: "Emile föddes den 21 januari 1865 i en arbetarfamilj: fadern Jan ('Joannes') var vävare, och hans mor sömmerska. De arbetade som små egenföretagare utan någon social trygghet.",
      location: "De bodde i stadsdelen Klein-Harelbeke, en bit utanför centrum av Izegem, halvvägs till stadsdelen Bosmolens.",
      illiteracy: "I Emiles födelsebevis noteras att både fadern Jan och hans bror Joseph Geldof, som var vittne, varken kunde läsa eller skriva.",
      firstMarriage: "I april 1892 gifter han sig för första gången, vid 27 års ålder, med Marie-Louise d'Artois. Hans yrke anges som 'vinkrögare'. Hon var 'tvätterska'.",
      tragedy: "Hans hustru Marie-Louise avlider på sjukhuset, troligen till följd av komplikationer efter förlossningen, den 6 juni 1893. Barnet blir bara två år gammalt och dör den 4 april 1895.",
      secondMarriage: "Redan en månad senare gifter han sig för andra gången, med den 25-åriga Maria-Theresia Vanderheeren, väverska.",
      childrenTitle: "Barn från andra äktenskapet",
      familyPhoto: "Ett unikt familjefoto",
      familyPhotoDesc: "Ett av de sällsynta 'gamla' fotografierna visar familjen Emile Geldof & Maria-Theresia Vanderheeren. Svärsonen Marcel Deforce är med. Fotot måste ha tagits någon gång i slutet av 1918 eller början av 1919: träden är kala.",
      profession: "Från vinkrögarlärling till vinkrögare",
      professionDesc: "I de olika dokumenten kallas han omväxlande vinkrögare, vinkrögarbiträde, och senare enbart 'vinkrögare'. Detta tyder på att han började som lärling.",
      wineTapper: "En vinkrögare var ingen stor krögare, utan en liten självständig näringsidkare som serverade och sålde vin per glas eller karaff.",
      whatDidWineTapper: "Vad gjorde en vinkrögare?",
      wineTapperDetails: "En vinkrögare sålde vin (vanligtvis rött och vitt bordsvin), serverade vin per glas, karaff eller liter. Det var sällan lyxprodukter: vanligtvis billigt, ofta importerat vin från Frankrike, avsett för vanligt folk.",
      socialRole: "Att Emile Geldof var aktiv som vinkrögare under de svåra krigsåren vittnar om företagaranda och uthållighet. Små vinkrögare fyllde inte bara en ekonomisk utan också en social roll: deras lokal fungerade som en mötesplats.",
      showMore: "Visa mer",
      showLess: "Visa mindre",
      sistersPhoto: "Systrarna Leonie och Sylvie som nunnor, med Emile till höger och hans bror Henry till vänster. Madeleine (Stora Mormor) står i mitten.",
    },
  };

  const t = content[language as keyof typeof content] || content.nl;

  return (
    <section
      id="emile-geldof"
      ref={ref}
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-muted/30 via-background to-muted/30"
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent mb-4">
            <Wine className="w-4 h-4" />
            <span className="text-sm font-medium">7</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-primary mb-3">
            {t.title}
          </h2>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
          <div className="mt-4">
            <ShareButton sectionId="emile-geldof" />
          </div>
        </motion.div>

        {/* Portrait and Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 mb-12"
        >
          <div className="relative">
            <img
              src={emilePortrait}
              alt="Emile Geldof portrait"
              className="w-full rounded-lg shadow-elevated"
            />
          </div>
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-foreground/90">{t.intro}</p>
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
              <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                {language === 'nl' ? 'Afkomst' : language === 'fr' ? 'Origine' : language === 'en' ? 'Origin' : language === 'de' ? 'Herkunft' : language === 'es' ? 'Origen' : 'Afkomst'}
              </h4>
              <p className="text-sm text-foreground/80">{t.origin}</p>
            </div>
            <p className="text-foreground/80">{t.location}</p>
            <p className="text-foreground/80 italic border-l-4 border-accent/30 pl-4">{t.illiteracy}</p>
          </div>
        </motion.div>

        {/* First Marriage and Tragedy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg bg-card border border-border">
              <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                {language === 'nl' ? 'Eerste huwelijk' : language === 'fr' ? 'Premier mariage' : language === 'en' ? 'First marriage' : language === 'de' ? 'Erste Ehe' : language === 'es' ? 'Primer matrimonio' : 'Eerste huwelijk'}
              </h4>
              <p className="text-foreground/80 mb-4">{t.firstMarriage}</p>
              <div className="p-4 rounded bg-destructive/10 border border-destructive/20">
                <p className="text-sm text-foreground/80">{t.tragedy}</p>
              </div>
            </div>
            <div className="p-6 rounded-lg bg-accent/5 border border-accent/20">
              <h4 className="font-semibold text-accent mb-3 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                {language === 'nl' ? 'Tweede huwelijk' : language === 'fr' ? 'Second mariage' : language === 'en' ? 'Second marriage' : language === 'de' ? 'Zweite Ehe' : language === 'es' ? 'Segundo matrimonio' : 'Tweede huwelijk'}
              </h4>
              <p className="text-foreground/80">{t.secondMarriage}</p>
              <div className="mt-4">
                <h5 className="font-medium text-sm text-accent mb-2">{t.childrenTitle}:</h5>
                <ul className="space-y-2">
                  {kinderen.map((kind, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <Baby className="w-3 h-3 mt-1 text-accent shrink-0" />
                      <span>
                        <strong>{kind.naam}</strong> ({kind.jaren})
                        {kind.status && <span className="text-muted-foreground"> – {kind.status}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Family Photo with Interactive Labels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <h3 className="font-serif text-2xl text-primary mb-4">{t.familyPhoto}</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group">
              <div 
                className="relative cursor-pointer overflow-hidden rounded-lg"
                onClick={() => setShowFullscreen(true)}
              >
                <img
                  src={gezinFoto}
                  alt="Gezin Emile Geldof & Maria-Theresia Vanderheeren"
                  className="w-full rounded-lg shadow-elevated transition-transform duration-300 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                </div>
                
                {/* Interactive person markers */}
                {familyMembers.map((member) => (
                  <button
                    key={member.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePerson(activePerson === member.id ? null : member.id);
                    }}
                    className={`absolute w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center text-xs font-bold ${
                      activePerson === member.id 
                        ? 'bg-primary border-primary text-primary-foreground scale-125 z-10' 
                        : 'bg-background/80 border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110'
                    }`}
                    style={{ top: member.top, left: member.left }}
                    aria-label={member.name}
                  >
                    {familyMembers.indexOf(member) + 1}
                  </button>
                ))}
              </div>
              
              {/* Active person tooltip */}
              {activePerson && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-2 left-2 right-2 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg"
                >
                  <p className="font-semibold text-primary">
                    {familyMembers.find(m => m.id === activePerson)?.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {familyMembers.find(m => m.id === activePerson)?.years}
                  </p>
                </motion.div>
              )}
              
              <p className="text-[10px] text-muted-foreground/60 mt-1 text-center italic">
                {language === 'nl' ? 'Ingekleurd met AI • Klik op de nummers om namen te zien' : 
                 language === 'fr' ? 'Colorisé avec IA • Cliquez sur les numéros pour voir les noms' :
                 language === 'de' ? 'Mit KI koloriert • Klicken Sie auf die Nummern für Namen' :
                 language === 'es' ? 'Coloreado con IA • Haga clic en los números para ver nombres' :
                 language === 'vls' ? 'Ingeklêurd mee AI • Klikt ip de nummers voe noamen te zien' :
                 language === 'pcd' ? 'Mìs in coleur aveuc IA • Cliquez su chés numéros pour vir chés noms' :
                 language === 'sv' ? 'Färglagd med AI • Klicka på siffrorna för att se namn' :
                 'Colorized with AI • Click numbers to see names'}
              </p>
            </div>
            <div>
              <p className="text-foreground/80 mb-4">{t.familyPhotoDesc}</p>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm font-medium text-muted-foreground mb-3">
                  {language === 'nl' ? 'Personen op de foto:' : 
                   language === 'fr' ? 'Personnes sur la photo:' :
                   language === 'de' ? 'Personen auf dem Foto:' :
                   language === 'es' ? 'Personas en la foto:' :
                   'People in the photo:'}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {familyMembers.map((member, index) => (
                    <button
                      key={member.id}
                      onClick={() => setActivePerson(activePerson === member.id ? null : member.id)}
                      className={`text-left p-2 rounded transition-colors flex items-center gap-2 ${
                        activePerson === member.id 
                          ? 'bg-primary/20 text-primary' 
                          : 'hover:bg-muted'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
                        activePerson === member.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted-foreground/20 text-muted-foreground'
                      }`}>
                        {index + 1}
                      </span>
                      <span className={member.id === 'marcel' || member.id === 'magdalena' ? 'font-medium text-accent' : ''}>
                        {member.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fullscreen Modal */}
        {showFullscreen && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setShowFullscreen(false)}
          >
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-50"
              aria-label="Close fullscreen"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="relative max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
              <img
                src={gezinFoto}
                alt="Gezin Emile Geldof & Maria-Theresia Vanderheeren"
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              
              {/* Interactive markers on fullscreen */}
              {familyMembers.map((member, index) => (
                <button
                  key={member.id}
                  onClick={() => setActivePerson(activePerson === member.id ? null : member.id)}
                  className={`absolute w-8 h-8 rounded-full border-2 transition-all duration-200 flex items-center justify-center text-sm font-bold ${
                    activePerson === member.id 
                      ? 'bg-primary border-primary text-primary-foreground scale-125 z-10' 
                      : 'bg-background/90 border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground hover:scale-110'
                  }`}
                  style={{ top: member.top, left: member.left }}
                  aria-label={member.name}
                >
                  {index + 1}
                </button>
              ))}
              
              {/* Active person tooltip in fullscreen */}
              {activePerson && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-lg max-w-md mx-auto"
                >
                  <p className="font-semibold text-primary text-lg">
                    {familyMembers.find(m => m.id === activePerson)?.name}
                  </p>
                  <p className="text-muted-foreground">
                    {familyMembers.find(m => m.id === activePerson)?.years}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Expandable Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button
            variant="outline"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 mb-6"
          >
            {isExpanded ? (
              <>
                {t.showLess} <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                {t.showMore} <ChevronDown className="w-4 h-4" />
              </>
            )}
          </Button>

          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-8"
            >
              {/* Profession Section */}
              <div className="p-6 rounded-lg bg-card border border-border">
                <h3 className="font-serif text-2xl text-primary mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  {t.profession}
                </h3>
                <p className="text-foreground/80 mb-4">{t.professionDesc}</p>
                <p className="text-foreground/80 mb-4">{t.wineTapper}</p>
                
                <div className="p-4 bg-accent/5 rounded-lg border border-accent/20 mt-4">
                  <h4 className="font-semibold text-accent mb-2">{t.whatDidWineTapper}</h4>
                  <p className="text-sm text-foreground/80">{t.wineTapperDetails}</p>
                </div>

                <p className="text-foreground/80 mt-4">{t.socialRole}</p>
              </div>

              {/* Second Family Photo */}
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img
                    src={familieNonnen}
                    alt="Familie Geldof met kloosterzusters"
                    className="w-full rounded-lg shadow-elevated"
                  />
                  <p className="text-[10px] text-muted-foreground/60 mt-1 text-center italic">
                    {language === 'nl' ? 'Ingekleurd met AI' : 
                     language === 'fr' ? 'Colorisé avec IA' :
                     language === 'de' ? 'Mit KI koloriert' :
                     language === 'es' ? 'Coloreado con IA' :
                     language === 'vls' ? 'Ingeklêurd mee AI' :
                     language === 'pcd' ? 'Mìs in coleur aveuc IA' :
                     language === 'sv' ? 'Färglagd med AI' :
                     'Colorized with AI'}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-foreground/80 italic">{t.sistersPhoto}</p>
                </div>
              </div>

              {/* Marriage Certificate */}
              <div className="text-center">
                <img
                  src={huwelijksakte}
                  alt="Huwelijksakte Emiel Geldof & Maria-Theresia Vanderheeren, 1893"
                  className="max-w-full mx-auto rounded-lg shadow-elevated"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  {language === 'nl' ? 'Huwelijksakte Emiel Geldof & Maria-Theresia Vanderheeren, BSI Izegem 1893 nr. 50' : 
                   language === 'fr' ? 'Acte de mariage Émile Geldof & Maria-Theresia Vanderheeren, BSI Izegem 1893 n° 50' :
                   'Marriage certificate Emiel Geldof & Maria-Theresia Vanderheeren, BSI Izegem 1893 nr. 50'}
                </p>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTranscription(!showTranscription)}
                  className="mt-4 flex items-center gap-2 mx-auto"
                >
                  <FileText className="w-4 h-4" />
                  {showTranscription 
                    ? (language === 'nl' ? 'Verberg transcriptie' : 
                       language === 'fr' ? 'Masquer la transcription' :
                       language === 'de' ? 'Transkription ausblenden' :
                       language === 'es' ? 'Ocultar transcripción' :
                       language === 'vls' ? 'Verberg transcriptie' :
                       language === 'pcd' ? 'Catjer ech\' transcripchon' :
                       language === 'sv' ? 'Dölj transkription' :
                       'Hide transcription')
                    : (language === 'nl' ? 'Toon leesbare versie' : 
                       language === 'fr' ? 'Afficher version lisible' :
                       language === 'de' ? 'Lesbare Version anzeigen' :
                       language === 'es' ? 'Mostrar versión legible' :
                       language === 'vls' ? 'Tôon leesbare versie' :
                       language === 'pcd' ? 'Montrer ech\' vèrsion lisibe' :
                       language === 'sv' ? 'Visa läsbar version' :
                       'Show readable version')}
                </Button>

                {showTranscription && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 text-left p-6 bg-card border border-border rounded-lg max-w-3xl mx-auto"
                  >
                    <h4 className="font-serif text-lg text-primary mb-4">
                      {language === 'nl' ? 'Transcriptie Huwelijksakte' : 
                       language === 'fr' ? 'Transcription de l\'acte de mariage' :
                       language === 'de' ? 'Transkription der Heiratsurkunde' :
                       language === 'es' ? 'Transcripción del acta de matrimonio' :
                       'Marriage Certificate Transcription'}
                    </h4>
                    <div className="text-sm text-foreground/80 space-y-3 leading-relaxed">
                      <p><strong>Burgerlijke Stand Izegem – Akte nr. 50, jaar 1893</strong></p>
                      <p>
                        Op den vier en twintigsten Mei achttien honderd drie en negentig, om drie uren namiddag, 
                        voor ons Theophile Verhaeghe, Schepen, Ambtenaar van den Burgerlijken Stand der stad Iseghem, 
                        arrondissement Rousselaere, provincie West-Vlaanderen, zijn verschenen:
                      </p>
                      <p>
                        <strong>Emile Geldof</strong>, oud acht en twintig jaren, wijntapper, geboren en wonende te Iseghem, 
                        meerderjarige zoon van Joannes Geldof, dagloner, en van Rosalia Devos, naaister, beiden wonende te Iseghem;
                      </p>
                      <p>
                        en <strong>Maria Theresia Vanderheeren</strong>, oud vijf en twintig jaren, weefster, geboren en wonende te Iseghem, 
                        meerderjarige dochter van Bruno Vanderheeren, wever, en van Felicita Marysse, huishoudster, beiden wonende te Iseghem.
                      </p>
                      <p>
                        Dewelke ons verzocht hebben over te gaan tot het voltrekken van het door hun voorgenomen huwelijk, 
                        en waarvan de afkondigingen gedaan zijn geweest voor het stadhuis dezer stad, op Zondagen den 
                        veertienden en een en twintigsten Mei laatstleden.
                      </p>
                      <p>
                        Geene tegenkanting tegen dit huwelijk ons kenbaar gemaakt zijnde, recht doende aan hun verzoek, 
                        na voorlezing gegeven te hebben van alle de stukken hierboven vermeld, alsmede van het zesde 
                        hoofdstuk van den burgerlijken wetboek, getiteld: "Van het huwelijk", hebben wij aan den bruidegom 
                        en aan de bruid gevraagd of zij elkander willen nemen tot man en vrouw; elk van hun afzonderlijk 
                        met ja geantwoord hebbende, verklaren wij, in naam der wet, dat <strong>Emile Geldof</strong> en 
                        <strong> Maria Theresia Vanderheeren</strong> door het huwelijk vereenigd zijn.
                      </p>
                      <p className="text-muted-foreground italic mt-4">
                        Getuigen: Joseph Geldof (broer bruidegom), Henri Vanderheeren (broer bruid), 
                        beide wonende te Iseghem.
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* De voorouders Geldof - aparte subsectie in het hoofdstuk */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 pt-12 border-t border-border"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-primary mb-6 text-center">
            {language === 'nl' ? 'De voorouders Geldof' : 
             language === 'fr' ? 'Les ancêtres Geldof' :
             language === 'de' ? 'Die Vorfahren Geldof' :
             language === 'es' ? 'Los antepasados Geldof' :
             language === 'vls' ? 'De vôorouders Geldof' :
             language === 'pcd' ? 'Chés anciêtes Geldof' :
             language === 'sv' ? 'Förfäderna Geldof' :
             'The Geldof ancestors'}
          </h3>
          
          <div className="prose prose-lg max-w-3xl mx-auto text-foreground/80 space-y-6">
            <p>
              {language === 'nl' ? 'Over de vroegere generaties Geldof is nog veel onderzoek te verrichten. Het klassieke stap voor stap opzoeken van vaders en moeders bracht ons 8 generaties ver, waarbij we van de meeste personen hun geboorte-, huwelijks- en overlijdensaktes terug konden vinden.' :
               language === 'fr' ? 'Il reste encore beaucoup de recherches à faire sur les générations antérieures des Geldof. La recherche classique étape par étape des pères et mères nous a conduits 8 générations en arrière.' :
               language === 'de' ? 'Über die früheren Generationen der Geldof gibt es noch viel zu erforschen. Die klassische Schritt-für-Schritt-Suche nach Vätern und Müttern führte uns 8 Generationen zurück.' :
               language === 'es' ? 'Aún queda mucha investigación por hacer sobre las generaciones anteriores de los Geldof. La búsqueda clásica paso a paso de padres y madres nos llevó 8 generaciones atrás.' :
               language === 'vls' ? 'Over de vroegere generaties Geldof is nog vee onderzoek te doen. \'t Klassieke stap voe stap opzoeken van vaders en moeders broecht ons 8 generaties verre.' :
               language === 'pcd' ? 'Sur chés générâtions d\'avant d\'chés Geldof il reste incoire biacop d\'recherches à faire. L\'recherche classique pâs à pâs nous a mené 8 générâtions d\'arrière.' :
               language === 'sv' ? 'Det finns fortfarande mycket forskning att göra om de tidigare generationerna av Geldof. Den klassiska steg-för-steg-sökningen av fäder och mödrar förde oss 8 generationer bakåt.' :
               'Much research remains to be done on the earlier generations of the Geldof family. The classic step-by-step search for fathers and mothers brought us 8 generations back.'}
            </p>

            {/* Genealogische tabel */}
            <div className="overflow-x-auto bg-card border border-border rounded-lg p-4 my-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-primary/20">
                    <th className="py-3 text-left font-semibold text-primary">
                      {language === 'nl' ? 'Naam' : language === 'fr' ? 'Nom' : language === 'de' ? 'Name' : 'Name'}
                    </th>
                    <th className="py-3 text-left font-semibold text-primary">
                      {language === 'nl' ? 'Levensjaren' : language === 'fr' ? 'Années de vie' : language === 'de' ? 'Lebensjahre' : 'Years'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-medium">Judocus Gheldof</td>
                    <td className="py-3 text-muted-foreground">ca 1590–1675</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-medium">Guilielmus Gheldof</td>
                    <td className="py-3 text-muted-foreground">1590</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-medium">Judocus Gheldof</td>
                    <td className="py-3 text-muted-foreground">1664–1741</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-medium">Carolus Geldof</td>
                    <td className="py-3 text-muted-foreground">1697–</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-medium">Cornelis Geldof</td>
                    <td className="py-3 text-muted-foreground">1724–1795</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-medium">Petrus Albertus Geldof</td>
                    <td className="py-3 text-muted-foreground">1765–1830</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-medium">Joannes Geldof</td>
                    <td className="py-3 text-muted-foreground">1823–1899</td>
                  </tr>
                  <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-medium">Emile Geldof</td>
                    <td className="py-3 text-muted-foreground">1865–1951</td>
                  </tr>
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 font-medium text-accent">Magdalena Geldof</td>
                    <td className="py-3 text-muted-foreground">1897–1971</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              {language === 'nl' ? 'Een tweede gevolgtrekking is dat al die generaties voor Emile in Rumbeke leefden en ze waren doorgaans kleine boertjes/landwerkers die daarnaast ook wel werkten als dienstknecht of bijverdienden als thuiswerkende wevers.' :
               language === 'fr' ? 'Une deuxième conclusion est que toutes ces générations avant Émile vivaient à Rumbeke et étaient généralement de petits fermiers/ouvriers agricoles qui travaillaient aussi comme domestiques ou gagnaient un revenu supplémentaire comme tisserands à domicile.' :
               language === 'de' ? 'Eine zweite Schlussfolgerung ist, dass alle Generationen vor Emile in Rumbeke lebten und meist kleine Bauern/Landarbeiter waren, die auch als Knechte arbeiteten oder als Heimweber dazuverdienten.' :
               language === 'es' ? 'Una segunda conclusión es que todas esas generaciones antes de Emile vivían en Rumbeke y generalmente eran pequeños granjeros/trabajadores agrícolas que también trabajaban como sirvientes o ganaban ingresos extra como tejedores domésticos.' :
               'A second conclusion is that all those generations before Emile lived in Rumbeke and were generally small farmers/farm workers who also worked as servants or earned extra income as home weavers.'}
            </p>

            <div className="p-6 bg-primary/5 rounded-xl border border-primary/10 my-8">
              <h4 className="font-serif text-xl text-primary mb-4">
                {language === 'nl' ? 'Link naar de Slag bij Westrozebeke (1382)' : 
                 language === 'fr' ? 'Lien avec la Bataille de Westrozebeke (1382)' :
                 language === 'de' ? 'Verbindung zur Schlacht bei Westrozebeke (1382)' :
                 language === 'es' ? 'Conexión con la Batalla de Westrozebeke (1382)' :
                 language === 'vls' ? 'Link noar de Slag bie Westrozebeke (1382)' :
                 language === 'pcd' ? 'Lien aveuc l\'Bataille d\'Westrozebeke (1382)' :
                 language === 'sv' ? 'Koppling till Slaget vid Westrozebeke (1382)' :
                 'Link to the Battle of Westrozebeke (1382)'}
              </h4>
              
              <figure className="mb-6">
                <img 
                  src={slagWestrozebeke} 
                  alt={language === 'nl' ? 'Slag bij Westrozebeke 1382 - Middeleeuwse miniatuur' :
                       language === 'fr' ? 'Bataille de Westrozebeke 1382 - Miniature médiévale' :
                       language === 'de' ? 'Schlacht bei Westrozebeke 1382 - Mittelalterliche Miniatur' :
                       language === 'es' ? 'Batalla de Westrozebeke 1382 - Miniatura medieval' :
                       'Battle of Westrozebeke 1382 - Medieval miniature'}
                  className="w-full rounded-lg shadow-lg"
                />
                <figcaption className="text-sm text-muted-foreground mt-2 text-center italic">
                  {language === 'nl' ? 'De Slag bij Westrozebeke (1382) - Middeleeuwse miniatuur' :
                   language === 'fr' ? 'La Bataille de Westrozebeke (1382) - Miniature médiévale' :
                   language === 'de' ? 'Die Schlacht bei Westrozebeke (1382) - Mittelalterliche Miniatur' :
                   language === 'es' ? 'La Batalla de Westrozebeke (1382) - Miniatura medieval' :
                   language === 'vls' ? 'De Slag bie Westrozebeke (1382) - Middelieuwse miniatuur' :
                   language === 'pcd' ? 'L\'Bataille d\'Westrozebeke (1382) - Miniature du moéyen âge' :
                   language === 'sv' ? 'Slaget vid Westrozebeke (1382) - Medeltida miniatyr' :
                   'The Battle of Westrozebeke (1382) - Medieval miniature'}
                </figcaption>
              </figure>
              
              <p>
                {language === 'nl' ? 'Via zijdelingse vertakkingen in de stamboom van de Geldof-voorouders reikt onze familiegeschiedenis zelfs tot het jaar 1382: in dat jaar werd de Slag bij Westrozebeke geleverd tussen milities van opstandige Vlaamse steden onder leiding van de Gentenaar Filips van Artevelde en een Frans ridderleger geleid door de minderjarige koning Karel VI.' :
                 language === 'fr' ? 'Par des ramifications collatérales dans l\'arbre généalogique des ancêtres Geldof, notre histoire familiale remonte jusqu\'à l\'année 1382 : cette année-là, la Bataille de Westrozebeke fut livrée entre les milices des villes flamandes rebelles sous la direction de Philippe van Artevelde de Gand et une armée de chevaliers français dirigée par le jeune roi Charles VI.' :
                 language === 'de' ? 'Über seitliche Verzweigungen im Stammbaum der Geldof-Vorfahren reicht unsere Familiengeschichte sogar bis ins Jahr 1382 zurück: In diesem Jahr wurde die Schlacht bei Westrozebeke zwischen den Milizen aufständischer flämischer Städte unter Führung des Genters Philipp van Artevelde und einem französischen Ritterheer unter dem minderjährigen König Karl VI. geschlagen.' :
                 language === 'es' ? 'A través de ramificaciones colaterales en el árbol genealógico de los antepasados Geldof, nuestra historia familiar se remonta incluso hasta el año 1382: ese año se libró la Batalla de Westrozebeke entre las milicias de ciudades flamencas rebeldes bajo el liderazgo de Felipe van Artevelde de Gante y un ejército de caballeros franceses liderado por el menor de edad rey Carlos VI.' :
                 'Through collateral branches in the Geldof ancestors\' family tree, our family history reaches even to the year 1382: that year the Battle of Westrozebeke was fought between militias of rebellious Flemish cities under the leadership of Ghent\'s Philip van Artevelde and a French knight army led by the minor King Charles VI.'}
              </p>
            </div>

            <p>
              {language === 'nl' ? 'In de nasleep van die veldslag werd onze voorouder Zeger Van Steenkiste door de Franse troepen vermoord en werden al zijn bezittingen in beslag genomen. Dat is gedocumenteerd door John Desreumaux in een publicatie: "Sociaal-economische achtergrond van de Kortrijkse rebellen uit het confiscatieregister van 1383".' :
               language === 'fr' ? 'Dans les suites de cette bataille, notre ancêtre Zeger Van Steenkiste fut tué par les troupes françaises et tous ses biens furent confisqués. Ceci est documenté par John Desreumaux dans une publication : "Contexte socio-économique des rebelles courtrisiens du registre de confiscation de 1383".' :
               language === 'de' ? 'In der Folge dieser Schlacht wurde unser Vorfahre Zeger Van Steenkiste von französischen Truppen ermordet und alle seine Besitztümer beschlagnahmt. Dies ist dokumentiert von John Desreumaux in einer Publikation: "Sozioökonomischer Hintergrund der Kortrijker Rebellen aus dem Konfiskationsregister von 1383".' :
               language === 'es' ? 'En las secuelas de esa batalla, nuestro antepasado Zeger Van Steenkiste fue asesinado por las tropas francesas y todos sus bienes fueron confiscados. Esto está documentado por John Desreumaux en una publicación: "Trasfondo socioeconómico de los rebeldes de Kortrijk del registro de confiscación de 1383".' :
               'In the aftermath of that battle, our ancestor Zeger Van Steenkiste was murdered by French troops and all his possessions were confiscated. This is documented by John Desreumaux in a publication: "Socio-economic background of the Kortrijk rebels from the confiscation register of 1383".'}
            </p>

            <p className="italic text-muted-foreground border-l-4 border-primary/30 pl-4">
              {language === 'nl' ? 'Een tweede voorvader, Gilles Van den Neste, wordt in enkele aanverwante stambomen ook vernoemd als zou hij gesneuveld zijn in die Slag bij Rozebeke. Christian Vanhuyse schrijft op Geneanet: "Heel wat inwoners van ZW Vlaanderen namen deel aan de slag bij Westrozebeke, werden opgesloten, gedood, en hun goederen aangeslagen. Zo werd Wouter van Overberch te Gent gevangen, 6 inwoners van Rollegem werden door Franse huurlingen gedood o.a. Zegher Vansteenkiste, Gillis Bonte, Jan Everaerd, Jan den Leenman. Gillis Vandenneste werd door de Bretoenen gedood tijdens de slag..."' :
               language === 'fr' ? 'Un deuxième ancêtre, Gilles Van den Neste, est également mentionné dans certains arbres généalogiques apparentés comme ayant péri lors de cette Bataille de Rozebeke. Christian Vanhuyse écrit sur Geneanet : "De nombreux habitants du SO de la Flandre ont participé à la bataille de Westrozebeke, ont été emprisonnés, tués, et leurs biens confisqués..."' :
               language === 'de' ? 'Ein zweiter Vorfahre, Gilles Van den Neste, wird in einigen verwandten Stammbäumen ebenfalls als in der Schlacht bei Rozebeke gefallen erwähnt. Christian Vanhuyse schreibt auf Geneanet: "Viele Einwohner von SW-Flandern nahmen an der Schlacht bei Westrozebeke teil, wurden eingesperrt, getötet, und ihre Güter beschlagnahmt..."' :
               language === 'es' ? 'Un segundo antepasado, Gilles Van den Neste, también se menciona en algunos árboles genealógicos relacionados como caído en esa Batalla de Rozebeke. Christian Vanhuyse escribe en Geneanet: "Muchos habitantes del SO de Flandes participaron en la batalla de Westrozebeke, fueron encarcelados, asesinados, y sus bienes confiscados..."' :
               'A second ancestor, Gilles Van den Neste, is also mentioned in some related family trees as having died in that Battle of Rozebeke. Christian Vanhuyse writes on Geneanet: "Many inhabitants of SW Flanders took part in the Battle of Westrozebeke, were imprisoned, killed, and their goods confiscated..."'}
            </p>

            {/* Van Steenkiste afstammingslijn */}
            <div className="mt-10">
              <h4 className="font-serif text-xl text-primary mb-4 text-center">
                {language === 'nl' ? 'Afstammingslijn Van Steenkiste (1382 → 1897)' : 
                 language === 'fr' ? 'Lignée Van Steenkiste (1382 → 1897)' :
                 language === 'de' ? 'Abstammungslinie Van Steenkiste (1382 → 1897)' :
                 language === 'es' ? 'Línea de descendencia Van Steenkiste (1382 → 1897)' :
                 language === 'vls' ? 'Afstammingslienje Van Steenkiste (1382 → 1897)' :
                 language === 'pcd' ? 'Lignée Van Steenkiste (1382 → 1897)' :
                 language === 'sv' ? 'Släktlinje Van Steenkiste (1382 → 1897)' :
                 'Van Steenkiste lineage (1382 → 1897)'}
              </h4>
              <div className="overflow-x-auto bg-card border border-border rounded-lg p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-destructive/20">
                      <th className="py-3 text-left font-semibold text-primary">
                        {language === 'nl' ? 'Naam' : language === 'fr' ? 'Nom' : language === 'de' ? 'Name' : 'Name'}
                      </th>
                      <th className="py-3 text-left font-semibold text-primary">
                        {language === 'nl' ? 'Levensjaren' : language === 'fr' ? 'Années de vie' : language === 'de' ? 'Lebensjahre' : 'Years'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border/50 hover:bg-destructive/5 transition-colors">
                      <td className="py-2 font-medium text-destructive">Zeger Van Steenkiste</td>
                      <td className="py-2 text-muted-foreground">†1382 <span className="text-xs text-destructive">(vermoord)</span></td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Willem Van Steenkiste</td>
                      <td className="py-2 text-muted-foreground">1380–ca 1436</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Hendrik Van Steenkiste</td>
                      <td className="py-2 text-muted-foreground">†ca 1465</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Wouter Van Steenkiste</td>
                      <td className="py-2 text-muted-foreground">1439–1470</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Joos Van Steenkiste</td>
                      <td className="py-2 text-muted-foreground">1465–1513</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Gheeraert Vansteenkiste</td>
                      <td className="py-2 text-muted-foreground">1503–1554</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Joos Vansteenkiste</td>
                      <td className="py-2 text-muted-foreground">ca 1525–ca 1578</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Anna Vansteenkiste</td>
                      <td className="py-2 text-muted-foreground">1561–</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Jan Vansteenkiste</td>
                      <td className="py-2 text-muted-foreground">†1598</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Elisabeth Clays</td>
                      <td className="py-2 text-muted-foreground">1585–1632</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Ampleunis Vansteenkiste</td>
                      <td className="py-2 text-muted-foreground">†1658</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Jan "de Jonghe" Holvoet</td>
                      <td className="py-2 text-muted-foreground">1609–</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Jan Vansteenkiste</td>
                      <td className="py-2 text-muted-foreground">1637–1705</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Tanneken Holvoet</td>
                      <td className="py-2 text-muted-foreground">1639–1702</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Carolus Vansteenkiste</td>
                      <td className="py-2 text-muted-foreground">1697–1776</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Joanna Basijn</td>
                      <td className="py-2 text-muted-foreground">1673–1754</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Silvester Vansteenkiste</td>
                      <td className="py-2 text-muted-foreground">ca 1729–1808</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Crecentia Amalberga Vansteenkiste</td>
                      <td className="py-2 text-muted-foreground">1772–1837</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Sophia Parmentier</td>
                      <td className="py-2 text-muted-foreground">1801–1862</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Theresia Catharina Werbrouck</td>
                      <td className="py-2 text-muted-foreground">1830–1893</td>
                    </tr>
                    <tr className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="py-2 font-medium">Maria Theresia Vanderheeren</td>
                      <td className="py-2 text-muted-foreground">1868–1926</td>
                    </tr>
                    <tr className="hover:bg-accent/10 transition-colors">
                      <td className="py-2 font-medium text-accent">Magdalena Geldof</td>
                      <td className="py-2 text-muted-foreground">1897–1971</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground text-center mt-3 italic">
                {language === 'nl' ? 'Via Maria Theresia Vanderheeren (echtgenote van Emile Geldof) loopt de Van Steenkiste-lijn door naar Magdalena Geldof.' :
                 language === 'fr' ? 'Via Maria Theresia Vanderheeren (épouse d\'Émile Geldof), la lignée Van Steenkiste se poursuit jusqu\'à Magdalena Geldof.' :
                 language === 'de' ? 'Über Maria Theresia Vanderheeren (Ehefrau von Emile Geldof) führt die Van Steenkiste-Linie zu Magdalena Geldof.' :
                 language === 'es' ? 'A través de Maria Theresia Vanderheeren (esposa de Emile Geldof), la línea Van Steenkiste continúa hasta Magdalena Geldof.' :
                 'Through Maria Theresia Vanderheeren (wife of Emile Geldof), the Van Steenkiste line continues to Magdalena Geldof.'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EmileGeldof;
