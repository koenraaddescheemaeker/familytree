import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Film, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AiLabel from "@/components/ui/AiLabel";

import videoForge from "@/assets/video-forge-1890s.mp4";
import videoFlemishVillage from "@/assets/video-flemish-village.mp4";
import videoLille from "@/assets/video-lille-1890s.mp4";
import videoBoquillonForest from "@/assets/video-boquillon-forest.mp4";
import videoCarpenterWorkshop from "@/assets/video-carpenter-workshop.mp4";
import videoFlemishCountryside from "@/assets/video-flemish-countryside.mp4";
import videoFrenchFlandersMarket from "@/assets/video-french-flanders-market.mp4";
import videoWoodworking from "@/assets/woodworking-craftsmanship.mp4";
import videoKindersterfte from "@/assets/video-kindersterfte.mp4";
import videoAardappelplaag from "@/assets/video-aardappelplaag.mp4";
import videoLinnencrisis from "@/assets/video-linnencrisis.mp4";
import videoHongersnood from "@/assets/video-hongersnood.mp4";
import videoCholera from "@/assets/video-cholera.mp4";
import videoCharlesLouis from "@/assets/charles-louis-video.mp4";

interface Video {
  id: number;
  src: string;
  titleNL: string;
  titleFR: string;
  titleEN: string;
  titleES: string;
  titlePCD: string;
  titleVLS: string;
  titleDE: string;
  descriptionNL: string;
  descriptionFR: string;
  descriptionEN: string;
  descriptionES: string;
  descriptionPCD: string;
  descriptionVLS: string;
  descriptionDE: string;
  category: "ambacht" | "locatie" | "dorpsleven" | "historisch" | "familie";
}

const videos: Video[] = [
  {
    id: 1,
    src: videoForge,
    titleNL: "De Smederij (1890)",
    titleFR: "La Forge (1890)",
    titleEN: "The Forge (1890)",
    titleES: "La Forja (1890)",
    titlePCD: "L' Forge (1890)",
    titleVLS: "De Smidse (1890)",
    titleDE: "Die Schmiede (1890)",
    descriptionNL: "Een authentieke smederij uit de late 19e eeuw. De smid was een essentiële ambachtsman in elk dorp, verantwoordelijk voor gereedschap, hoefijzers en metaalwerk.",
    descriptionFR: "Une forge authentique de la fin du XIXe siècle. Le forgeron était un artisan essentiel dans chaque village, responsable des outils, fers à cheval et travaux métalliques.",
    descriptionEN: "An authentic forge from the late 19th century. The blacksmith was an essential craftsman in every village, responsible for tools, horseshoes and metalwork.",
    descriptionES: "Una fragua auténtica de finales del siglo XIX. El herrero era un artesano esencial en cada pueblo, responsable de herramientas, herraduras y trabajos en metal.",
    descriptionPCD: "Eune vraie forge éd la fin du XIXe siècle. L' forgeron étot un artisan essintiel dins chaque village, responsabe des outils, fers à ch'val pi travaux métalliques.",
    descriptionVLS: "E authentieke smidse uut de late 19e eeuw. De smid was e essentiële ambachtsman in elk dorp, verantwoordelik vôo gereedschap, hoefyzers en metaalwerk.",
    descriptionDE: "Eine authentische Schmiede aus dem späten 19. Jahrhundert. Der Schmied war ein wesentlicher Handwerker in jedem Dorf, verantwortlich für Werkzeuge, Hufeisen und Metallarbeiten.",
    category: "ambacht"
  },
  {
    id: 2,
    src: videoFlemishVillage,
    titleNL: "Vlaams Dorpsleven",
    titleFR: "Vie de Village Flamand",
    titleEN: "Flemish Village Life",
    titleES: "Vida de Pueblo Flamenco",
    titlePCD: "Vie d' Village Flamind",
    titleVLS: "Vloams Dorpsleven",
    titleDE: "Flämisches Dorfleben",
    descriptionNL: "Beelden van het typische Vlaamse dorpsleven rond de eeuwwisseling, waar onze voorouders hun dagelijks leven leidden.",
    descriptionFR: "Images de la vie typique d'un village flamand autour du tournant du siècle, où nos ancêtres menaient leur vie quotidienne.",
    descriptionEN: "Images of typical Flemish village life around the turn of the century, where our ancestors led their daily lives.",
    descriptionES: "Imágenes de la vida típica de un pueblo flamenco a principios de siglo, donde nuestros antepasados llevaban su vida cotidiana.",
    descriptionPCD: "Images d' la vie typique d'un village flamind autour du tournant du siècle, ousque nos anchêtes mineient leu vie d' tous les jours.",
    descriptionVLS: "Beelden van t typische Vloomse dorpsleven round de eeuwwissel, woar uuze vôorouders ulder dagelieks leevn leiden.",
    descriptionDE: "Bilder vom typischen flämischen Dorfleben um die Jahrhundertwende, wo unsere Vorfahren ihren Alltag lebten.",
    category: "dorpsleven"
  },
  {
    id: 3,
    src: videoLille,
    titleNL: "Rijsel in de 19e Eeuw",
    titleFR: "Lille au XIXe Siècle",
    titleEN: "Lille in the 19th Century",
    titleES: "Lille en el Siglo XIX",
    titlePCD: "Lile au XIXe Siècle",
    titleVLS: "Rysel in de 19e Eeuw",
    titleDE: "Lille im 19. Jahrhundert",
    descriptionNL: "Historische beelden van Rijsel (Lille), de stad waar vele voorouders woonden voordat ze naar West-Vlaanderen migreerden.",
    descriptionFR: "Images historiques de Lille, la ville où de nombreux ancêtres vivaient avant de migrer vers la Flandre occidentale.",
    descriptionEN: "Historical images of Lille, the city where many ancestors lived before migrating to West Flanders.",
    descriptionES: "Imágenes históricas de Lille, la ciudad donde vivían muchos antepasados antes de emigrar a Flandes Occidental.",
    descriptionPCD: "Images histouriques d' Lile, l' vile ousque gramint d'anchêtes vivoient avant d' migrer vers l' Flandre occidentale.",
    descriptionVLS: "Historische beelden van Rysel (Lille), de stad woar vele vôorouders woonden vôorda ze noar West-Vloanderen migreerden.",
    descriptionDE: "Historische Bilder von Lille, der Stadt, in der viele Vorfahren lebten, bevor sie nach Westflandern auswanderten.",
    category: "locatie"
  },
  {
    id: 4,
    src: videoBoquillonForest,
    titleNL: "Het Boquillon Bos",
    titleFR: "La Forêt de Boquillon",
    titleEN: "The Boquillon Forest",
    titleES: "El Bosque de Boquillon",
    titlePCD: "L' Forêt éd Boquillon",
    titleVLS: "T Boquillon Bos",
    titleDE: "Der Boquillon-Wald",
    descriptionNL: "Het historische Boquillon bos in de streek rond Hallennes, waar onze voorouders hout verzamelden voor hun ambacht.",
    descriptionFR: "La forêt historique de Boquillon dans la région de Hallennes, où nos ancêtres récoltaient le bois pour leur artisanat.",
    descriptionEN: "The historic Boquillon forest in the Hallennes region, where our ancestors gathered wood for their craft.",
    descriptionES: "El histórico bosque de Boquillon en la región de Hallennes, donde nuestros antepasados recolectaban madera para su oficio.",
    descriptionPCD: "L' forêt histourique éd Boquillon dins l' région d' Hallennes, ousque nos anchêtes ramassotent l' bos pour leu artisanat.",
    descriptionVLS: "T historische Boquillon bos in de streeke round Hallennes, woar uuze vôorouders hout verzoamelden vôo ulder ambacht.",
    descriptionDE: "Der historische Boquillon-Wald in der Region Hallennes, wo unsere Vorfahren Holz für ihr Handwerk sammelten.",
    category: "locatie"
  },
  {
    id: 5,
    src: videoCarpenterWorkshop,
    titleNL: "De Timmermanswerkplaats",
    titleFR: "L'Atelier du Menuisier",
    titleEN: "The Carpenter's Workshop",
    titleES: "El Taller del Carpintero",
    titlePCD: "L'Atelier du Carpintier",
    titleVLS: "De Timmermaswerkploatse",
    titleDE: "Die Tischlerwerkstatt",
    descriptionNL: "Een traditionele timmermanswerkplaats zoals die van onze voorouders Deforce, die generaties lang als timmerman en meubelmaker werkten.",
    descriptionFR: "Un atelier de menuisier traditionnel comme celui de nos ancêtres Deforce, qui ont travaillé comme charpentiers et ébénistes pendant des générations.",
    descriptionEN: "A traditional carpenter's workshop like that of our Deforce ancestors, who worked as carpenters and furniture makers for generations.",
    descriptionES: "Un taller de carpintero tradicional como el de nuestros antepasados Deforce, que trabajaron como carpinteros y ebanistas durante generaciones.",
    descriptionPCD: "Un atelier d' carpintier traditionnel comme chti d' nos anchêtes Deforce, qui ont travallé comme carpintiers pi ébénistes pendant des générations.",
    descriptionVLS: "E traditionele timmermaswerkploatse gelyk die van uuze vôorouders Deforce, die generoasjes lank ols timmerman en meubelmoaker werkten.",
    descriptionDE: "Eine traditionelle Tischlerwerkstatt wie die unserer Deforce-Vorfahren, die über Generationen als Zimmerleute und Möbelmacher arbeiteten.",
    category: "ambacht"
  },
  {
    id: 6,
    src: videoFlemishCountryside,
    titleNL: "Vlaams Platteland",
    titleFR: "Campagne Flamande",
    titleEN: "Flemish Countryside",
    titleES: "Campiña Flamenca",
    titlePCD: "Campagne Flaminde",
    titleVLS: "Vloams Plattelând",
    titleDE: "Flämische Landschaft",
    descriptionNL: "Het pittoreske Vlaamse platteland rond Izegem, waar de familie Deforce zich vestigde na de migratie uit Frans-Vlaanderen.",
    descriptionFR: "La pittoresque campagne flamande autour d'Izegem, où la famille Deforce s'est installée après la migration depuis la Flandre française.",
    descriptionEN: "The picturesque Flemish countryside around Izegem, where the Deforce family settled after migrating from French Flanders.",
    descriptionES: "El pintoresco campo flamenco alrededor de Izegem, donde la familia Deforce se estableció después de emigrar de Flandes Francés.",
    descriptionPCD: "L' pittoresque campagne flaminde autour d'Izegem, ousque l' famile Deforce s'est installée après l' migration d'pis l' Flandre française.",
    descriptionVLS: "T pittoreske Vloomse plattelând round Izegem, woar de familie Deforce zich vestigde no de migroasje uut Frans-Vloanderen.",
    descriptionDE: "Die malerische flämische Landschaft um Izegem, wo sich die Familie Deforce nach der Auswanderung aus Französisch-Flandern niederließ.",
    category: "locatie"
  },
  {
    id: 7,
    src: videoFrenchFlandersMarket,
    titleNL: "Markt in Frans-Vlaanderen",
    titleFR: "Marché en Flandre Française",
    titleEN: "Market in French Flanders",
    titleES: "Mercado en Flandes Francés",
    titlePCD: "Marché in Flandre Française",
    titleVLS: "Markt in Frans-Vloanderen",
    titleDE: "Markt in Französisch-Flandern",
    descriptionNL: "Een typische marktdag in Frans-Vlaanderen, waar onze voorouders hun waren verkochten en inkopen deden.",
    descriptionFR: "Un jour de marché typique en Flandre française, où nos ancêtres vendaient leurs marchandises et faisaient leurs achats.",
    descriptionEN: "A typical market day in French Flanders, where our ancestors sold their goods and made purchases.",
    descriptionES: "Un día de mercado típico en Flandes Francés, donde nuestros antepasados vendían sus mercancías y hacían sus compras.",
    descriptionPCD: "Un jour d' marché typique in Flandre française, ousque nos anchêtes vindotent leus marchandises pi faiotent leus achats.",
    descriptionVLS: "E typische marktdag in Frans-Vloanderen, woar uuze vôorouders ulder woaren verkochtn en inkopen deen.",
    descriptionDE: "Ein typischer Markttag in Französisch-Flandern, wo unsere Vorfahren ihre Waren verkauften und Einkäufe machten.",
    category: "dorpsleven"
  },
  {
    id: 8,
    src: videoWoodworking,
    titleNL: "Houtbewerkingskunst",
    titleFR: "L'Art du Travail du Bois",
    titleEN: "The Art of Woodworking",
    titleES: "El Arte de la Carpintería",
    titlePCD: "L'Art du Travail du Bos",
    titleVLS: "Houtbewerkingskunst",
    titleDE: "Die Kunst der Holzbearbeitung",
    descriptionNL: "De traditionele technieken van houtbewerking die van generatie op generatie werden doorgegeven in de familie Deforce.",
    descriptionFR: "Les techniques traditionnelles de travail du bois transmises de génération en génération dans la famille Deforce.",
    descriptionEN: "The traditional woodworking techniques passed down from generation to generation in the Deforce family.",
    descriptionES: "Las técnicas tradicionales de carpintería transmitidas de generación en generación en la familia Deforce.",
    descriptionPCD: "Les techniques traditionnelles éd travail du bos transmises d' génération in génération dins l' famile Deforce.",
    descriptionVLS: "De traditionele technieken van houtbewerking die van generoasje op generoasje wierden deurgegeevn in de familie Deforce.",
    descriptionDE: "Die traditionellen Holzbearbeitungstechniken, die in der Familie Deforce von Generation zu Generation weitergegeben wurden.",
    category: "ambacht"
  },
  {
    id: 9,
    src: videoKindersterfte,
    titleNL: "Kindersterfte in de 19e Eeuw",
    titleFR: "Mortalité Infantile au XIXe Siècle",
    titleEN: "Child Mortality in the 19th Century",
    titleES: "Mortalidad Infantil en el Siglo XIX",
    titlePCD: "Mortalité des Éfants au XIXe Siècle",
    titleVLS: "Kindersterfte in de 19e Eeuw",
    titleDE: "Kindersterblichkeit im 19. Jahrhundert",
    descriptionNL: "De tragiek van kindersterfte in arme Vlaamse gezinnen. In de 19e eeuw stierf bijna de helft van alle kinderen voor hun vijfde verjaardag door ziekte, ondervoeding en armoede. Ook de familie Deforce verloor meerdere kinderen op jonge leeftijd.",
    descriptionFR: "La tragédie de la mortalité infantile dans les familles flamandes pauvres. Au XIXe siècle, près de la moitié des enfants mouraient avant leur cinquième anniversaire à cause des maladies, de la malnutrition et de la pauvreté. La famille Deforce a également perdu plusieurs enfants en bas âge.",
    descriptionEN: "The tragedy of child mortality in poor Flemish families. In the 19th century, nearly half of all children died before their fifth birthday due to disease, malnutrition and poverty. The Deforce family also lost several children at a young age.",
    descriptionES: "La tragedia de la mortalidad infantil en las familias flamencas pobres. En el siglo XIX, casi la mitad de los niños morían antes de cumplir cinco años debido a enfermedades, desnutrición y pobreza. La familia Deforce también perdió varios hijos a temprana edad.",
    descriptionPCD: "L' tragédie d' la mortalité des éfants dins les familes flamindes paures. Au XIXe siècle, quasi l' moitié des éfants mourotent avant leu cinquième anniversaire à cause des maladies, d' la malnutrition pi d' la paurveté. L' famile Deforce a ossi perdu plusieurs éfants tout jénes.",
    descriptionVLS: "De tragiek van kindersterfte in arme Vloomse gezinnen. In de 19e eeuw stierf byna de helft van ol de kinders vôo ulder vyfste verjoardag deur ziekte, ondervoeding en armoede. Ook de familie Deforce verloor meerdere kinders op joengen leeftyd.",
    descriptionDE: "Die Tragödie der Kindersterblichkeit in armen flämischen Familien. Im 19. Jahrhundert starb fast die Hälfte aller Kinder vor ihrem fünften Geburtstag durch Krankheit, Unterernährung und Armut. Auch die Familie Deforce verlor mehrere Kinder in jungen Jahren.",
    category: "historisch"
  },
  {
    id: 10,
    src: videoAardappelplaag,
    titleNL: "De Aardappelplaag (1845-1850)",
    titleFR: "Le Mildiou de la Pomme de Terre (1845-1850)",
    titleEN: "The Potato Blight (1845-1850)",
    titleES: "La Plaga de la Patata (1845-1850)",
    titlePCD: "L' Mildiou d' la Pome éd Terre (1845-1850)",
    titleVLS: "De Eerpelploage (1845-1850)",
    titleDE: "Die Kartoffelfäule (1845-1850)",
    descriptionNL: "De verwoestende aardappelziekte die Vlaanderen trof van 1845 tot 1850. De Phytophthora-schimmel vernietigde de oogsten en veroorzaakte massale hongersnood onder de arme bevolking die afhankelijk was van aardappelen als hoofdvoedsel.",
    descriptionFR: "La maladie dévastatrice de la pomme de terre qui a frappé la Flandre de 1845 à 1850. Le champignon Phytophthora a détruit les récoltes et causé une famine massive parmi la population pauvre dépendante des pommes de terre.",
    descriptionEN: "The devastating potato disease that struck Flanders from 1845 to 1850. The Phytophthora fungus destroyed the crops and caused massive famine among the poor population dependent on potatoes as their staple food.",
    descriptionES: "La devastadora enfermedad de la patata que azotó Flandes de 1845 a 1850. El hongo Phytophthora destruyó las cosechas y causó una hambruna masiva entre la población pobre que dependía de las patatas como alimento básico.",
    descriptionPCD: "L' maladie dévastatrice d' la pome éd terre qui a frappé l' Flandre d' 1845 à 1850. L' champignon Phytophthora a détruit les récoltes pi causé eune famine massive parmi l' population paure dépindante des pomes éd terre.",
    descriptionVLS: "De verwoestende eerpelziekte die Vloanderen trof van 1845 tot 1850. De Phytophthora-schimmel vernietigde de oogsten en veroorzaakte massale hongersnood onder de arme bevolking die ofhankelik was van eerpels ols hoofdvoedsel.",
    descriptionDE: "Die verheerende Kartoffelkrankheit, die Flandern von 1845 bis 1850 traf. Der Phytophthora-Pilz zerstörte die Ernten und verursachte eine Massenhungersnot unter der armen Bevölkerung, die von Kartoffeln als Grundnahrungsmittel abhängig war.",
    category: "historisch"
  },
  {
    id: 11,
    src: videoLinnencrisis,
    titleNL: "De Linnencrisis",
    titleFR: "La Crise du Lin",
    titleEN: "The Linen Crisis",
    titleES: "La Crisis del Lino",
    titlePCD: "L' Crise du Lin",
    titleVLS: "De Linnencrisis",
    titleDE: "Die Leinenkrise",
    descriptionNL: "De ineenstorting van de Vlaamse huisnijverheid door de opkomst van machinaal geweven katoen uit Engeland. Duizenden wevers en spinsters verloren hun inkomen, precies toen ook de aardappeloogst mislukte.",
    descriptionFR: "L'effondrement de l'industrie textile domestique flamande face à l'essor du coton mécanisé anglais. Des milliers de tisserands ont perdu leurs revenus, au moment même où la récolte de pommes de terre échouait.",
    descriptionEN: "The collapse of the Flemish cottage industry due to the rise of machine-woven cotton from England. Thousands of weavers and spinners lost their income, precisely when the potato harvest also failed.",
    descriptionES: "El colapso de la industria textil doméstica flamenca debido al auge del algodón tejido a máquina de Inglaterra. Miles de tejedores y hilanderos perdieron sus ingresos, precisamente cuando también fallaba la cosecha de patatas.",
    descriptionPCD: "L'effondrémint d' l'industrie textile domestique flaminde face à l'essor du coton mécanisé anglais. Des miliers d' tissurands ont perdu leus r'v'nus, au momint même ousque l' récolte d' pomes éd terre échouot.",
    descriptionVLS: "De ineenstorting van de Vloomse uusnyfverheid deur de opkomst van machinaal geweven katoen uut Engelând. Duuzenden weevers en spinsters verloren ulder inkomen, precies toen ook de eerpeloogst mislukte.",
    descriptionDE: "Der Zusammenbruch der flämischen Heimindustrie durch den Aufstieg maschinell gewebter Baumwolle aus England. Tausende Weber und Spinner verloren ihr Einkommen, genau als auch die Kartoffelernte ausfiel.",
    category: "historisch"
  },
  {
    id: 12,
    src: videoHongersnood,
    titleNL: "De Grote Hongersnood",
    titleFR: "La Grande Famine",
    titleEN: "The Great Famine",
    titleES: "La Gran Hambruna",
    titlePCD: "L' Grande Famine",
    titleVLS: "De Grôote Hongersnood",
    titleDE: "Die Große Hungersnot",
    descriptionNL: "De hongerjaren van 1845-1850 waren de laatste grote hongersnood in België in vredestijd. Hele dorpen werden ontvolkt door sterfte en emigratie. In 1847 bereikte de crisis haar hoogtepunt.",
    descriptionFR: "Les années de famine de 1845-1850 furent la dernière grande famine en Belgique en temps de paix. Des villages entiers furent dépeuplés par la mortalité et l'émigration. En 1847, la crise atteignit son apogée.",
    descriptionEN: "The famine years of 1845-1850 were the last great famine in Belgium during peacetime. Entire villages were depopulated by death and emigration. In 1847, the crisis reached its peak.",
    descriptionES: "Los años de hambruna de 1845-1850 fueron la última gran hambruna en Bélgica en tiempos de paz. Pueblos enteros quedaron despoblados por la muerte y la emigración. En 1847, la crisis alcanzó su punto máximo.",
    descriptionPCD: "Les années d' famine d' 1845-1850 furent l' darnière grande famine in Belgique in temps d' paix. Des villages intiers furent dépeuplés par l' mortalité pi l'émigration. In 1847, l' crise attindit sin apogée.",
    descriptionVLS: "De hongerjoaren van 1845-1850 woaren de laatste grôote hongersnood in België in vreedstyd. Hele dorpn wierden ontvolkt deur sterfte en emigroasje. In 1847 bereikte de crisis ulder hoogtepunt.",
    descriptionDE: "Die Hungerjahre von 1845-1850 waren die letzte große Hungersnot in Belgien in Friedenszeiten. Ganze Dörfer wurden durch Tod und Emigration entvölkert. 1847 erreichte die Krise ihren Höhepunkt.",
    category: "historisch"
  },
  {
    id: 13,
    src: videoCholera,
    titleNL: "De Cholera-epidemie",
    titleFR: "L'Épidémie de Choléra",
    titleEN: "The Cholera Epidemic",
    titleES: "La Epidemia de Cólera",
    titlePCD: "L'Épidémie éd Choléra",
    titleVLS: "De Cholera-epidemie",
    titleDE: "Die Cholera-Epidemie",
    descriptionNL: "Cholera en tyfus decimeerden de Vlaamse bevolking in de 19e eeuw, vooral in de armste wijken. De epidemieën van 1832, 1848 en 1866 eisten duizenden levens. Artsen waren vaak machteloos.",
    descriptionFR: "Le choléra et le typhus ont décimé la population flamande au XIXe siècle, surtout dans les quartiers les plus pauvres. Les épidémies de 1832, 1848 et 1866 ont coûté des milliers de vies. Les médecins étaient souvent impuissants.",
    descriptionEN: "Cholera and typhus decimated the Flemish population in the 19th century, especially in the poorest neighborhoods. The epidemics of 1832, 1848 and 1866 claimed thousands of lives. Doctors were often powerless.",
    descriptionES: "El cólera y el tifus diezmaron la población flamenca en el siglo XIX, especialmente en los barrios más pobres. Las epidemias de 1832, 1848 y 1866 cobraron miles de vidas. Los médicos a menudo eran impotentes.",
    descriptionPCD: "L' choléra pi l' typhus ont décimé l' population flaminde au XIXe siècle, surtout dins les quartiers les pus paures. Les épidémies d' 1832, 1848 pi 1866 ont coûté des miliers d' vies. Les médecins éteient souvint impuissants.",
    descriptionVLS: "Cholera en tyfus decimeerden de Vloomse bevolking in de 19e eeuw, vôoral in de armste wykn. De epidemieën van 1832, 1848 en 1866 eistn duuzenden leevns. Dokters woaren dikwils machteloos.",
    descriptionDE: "Cholera und Typhus dezimierten die flämische Bevölkerung im 19. Jahrhundert, besonders in den ärmsten Vierteln. Die Epidemien von 1832, 1848 und 1866 forderten Tausende von Leben. Ärzte waren oft machtlos.",
    category: "historisch"
  },
  {
    id: 14,
    src: videoCharlesLouis,
    titleNL: "Charles-Louis Deforce (1857-1938)",
    titleFR: "Charles-Louis Deforce (1857-1938)",
    titleEN: "Charles-Louis Deforce (1857-1938)",
    titleES: "Charles-Louis Deforce (1857-1938)",
    titlePCD: "Charles-Louis Deforce (1857-1938)",
    titleVLS: "Charles-Louis Deforce (1857-1938)",
    titleDE: "Charles-Louis Deforce (1857-1938)",
    descriptionNL: "Geanimeerd portret van Charles-Louis Deforce, overgrootvader van de auteur. Geboren in Emelgem als zoon van timmerman Jean François Deforche, zette hij de familietraditie voort als schrijnwerker en meubelmaker. Hij trouwde driemaal en kreeg negen kinderen, waarvan er slechts drie de volwassenheid bereikten.",
    descriptionFR: "Portrait animé de Charles-Louis Deforce, arrière-grand-père de l'auteur. Né à Emelgem, fils du charpentier Jean François Deforche, il a perpétué la tradition familiale comme menuisier et ébéniste. Il s'est marié trois fois et a eu neuf enfants, dont seulement trois ont atteint l'âge adulte.",
    descriptionEN: "Animated portrait of Charles-Louis Deforce, great-grandfather of the author. Born in Emelgem as son of carpenter Jean François Deforche, he continued the family tradition as joiner and furniture maker. He married three times and had nine children, of which only three reached adulthood.",
    descriptionES: "Retrato animado de Charles-Louis Deforce, bisabuelo del autor. Nacido en Emelgem como hijo del carpintero Jean François Deforche, continuó la tradición familiar como ebanista y fabricante de muebles. Se casó tres veces y tuvo nueve hijos, de los cuales solo tres llegaron a la edad adulta.",
    descriptionPCD: "Portrait animé d' Charles-Louis Deforce, arrière-grand-père d' l'auteur. Né à Emelgem, fils du carpintier Jean François Deforche, i l'a perpétué l' tradition familiale comme minusier pi ébéniste. I s'est marié trois fos pi a eu neu éfants, dont seulmint trois ont attint l'âge adulte.",
    descriptionVLS: "Geanimeerd portret van Charles-Louis Deforce, overgrôotvader van de auteur. Geboarn in Emelgem ols zeune van timmerman Jean François Deforche, zette e de familietradisje vôort ols schrynwerker en meubelmoaker. E trouwde drymaal en kreeg neegn kinders, woarvan er mor drie de volwassenheid bereiktn.",
    descriptionDE: "Animiertes Porträt von Charles-Louis Deforce, Urgroßvater des Autors. Geboren in Emelgem als Sohn des Zimmermanns Jean François Deforche, setzte er die Familientradition als Schreiner und Möbelmacher fort. Er heiratete dreimal und hatte neun Kinder, von denen nur drei das Erwachsenenalter erreichten.",
    category: "familie"
  }
];

const VideoGalerij = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [activeCategory, setActiveCategory] = useState("alle");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { language, t } = useLanguage();

  const categories = [
    { id: "alle", labelNL: "Alle video's", labelFR: "Toutes les vidéos", labelEN: "All videos", labelES: "Todos los videos", labelPCD: "Toutes les vidéos", labelVLS: "Ol de video's", labelDE: "Alle Videos", labelSV: "Alla videor" },
    { id: "familie", labelNL: "Familie", labelFR: "Famille", labelEN: "Family", labelES: "Familia", labelPCD: "Famile", labelVLS: "Familie", labelDE: "Familie", labelSV: "Familj" },
    { id: "ambacht", labelNL: "Ambacht", labelFR: "Artisanat", labelEN: "Craftsmanship", labelES: "Artesanía", labelPCD: "Artisanat", labelVLS: "Ambacht", labelDE: "Handwerk", labelSV: "Hantverk" },
    { id: "locatie", labelNL: "Locaties", labelFR: "Lieux", labelEN: "Locations", labelES: "Lugares", labelPCD: "Lieus", labelVLS: "Locosjes", labelDE: "Standorte", labelSV: "Platser" },
    { id: "dorpsleven", labelNL: "Dorpsleven", labelFR: "Vie de Village", labelEN: "Village Life", labelES: "Vida Rural", labelPCD: "Vie d' Village", labelVLS: "Dorpsleven", labelDE: "Dorfleben", labelSV: "Bybsliv" },
    { id: "historisch", labelNL: "Historisch", labelFR: "Historique", labelEN: "Historical", labelES: "Histórico", labelPCD: "Histourique", labelVLS: "Historisch", labelDE: "Historisch", labelSV: "Historiskt" },
  ];

  const filteredVideos = activeCategory === "alle"
    ? videos
    : videos.filter(v => v.category === activeCategory);

  const handleVideoClick = (video: Video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const closeLightbox = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section
      id="videogalerij"
      ref={ref}
      className="py-20 md:py-32 bg-gradient-to-b from-muted/30 to-background"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-8 h-8 text-primary" />
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              {language === "nl" ? "Historische Video's" : language === "en" ? "Historical Videos" : language === "es" ? "Videos Históricos" : language === "vls" ? "Historische Video's" : language === "pcd" ? "Vidéos Histouriques" : language === "de" ? "Historische Videos" : "Vidéos Historiques"}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif text-foreground mb-4">
            {language === "nl" ? "Videogalerij" : language === "en" ? "Video Gallery" : language === "es" ? "Galería de Videos" : language === "vls" ? "Videogalery" : language === "pcd" ? "Galerie Vidéo" : language === "de" ? "Videogalerie" : "Galerie Vidéo"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {language === "nl"
              ? "Beleef de geschiedenis door middel van video. Ontdek het ambacht, de locaties en het dagelijks leven van onze voorouders."
              : language === "en"
              ? "Experience history through video. Discover the craftsmanship, locations and daily life of our ancestors."
              : language === "es"
              ? "Vive la historia a través del video. Descubre la artesanía, los lugares y la vida cotidiana de nuestros antepasados."
              : language === "vls"
              ? "Beleeft de geschiedenisse deur middel van video. Ontdekt t ambacht, de locosjes en t dagelieks leevn van uuze vôorouders."
              : language === "pcd"
              ? "Vivez l'histouère à travers l' vidéo. Découvrez l'artisanat, les lieus pi l' vie d' tous les jours d' nos anchêtes."
              : language === "de"
              ? "Erleben Sie Geschichte durch Video. Entdecken Sie das Handwerk, die Orte und das tägliche Leben unserer Vorfahren."
              : "Vivez l'histoire à travers la vidéo. Découvrez l'artisanat, les lieux et la vie quotidienne de nos ancêtres."}
          </p>
          <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg max-w-3xl mx-auto">
            <p className="text-muted-foreground text-sm italic">
              {language === "nl"
                ? "Deze historische video's zijn uiteraard artificieel gegenereerd maar helpen u om gemakkelijker in de sfeer van toen te komen..."
                : language === "en"
                ? "These historical videos are of course artificially generated but help you to more easily immerse yourself in the atmosphere of that era..."
                : language === "es"
                ? "Estos videos históricos son, por supuesto, generados artificialmente pero le ayudan a sumergirse más fácilmente en la atmósfera de esa época..."
                : language === "vls"
                ? "Deze historische video's zyn naturlyk artificieel gegenereerd mor elpen je om gemakkeliker in de sfeer van toen te komen..."
                : language === "pcd"
                ? "Ces vidéos histouriques sont bien sûr générées artificiellemint mé i vous aidtent à vous immerger pus facilemint dins l'atmosphère d' l'époque..."
                : language === "de"
                ? "Diese historischen Videos sind natürlich künstlich generiert, helfen Ihnen aber, sich leichter in die Atmosphäre jener Zeit zu versetzen..."
                : "Ces vidéos historiques sont bien sûr générées artificiellement mais vous aident à vous immerger plus facilement dans l'atmosphère de l'époque..."}
            </p>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              {language === "nl" ? cat.labelNL : language === "en" ? cat.labelEN : language === "es" ? cat.labelES : language === "vls" ? cat.labelVLS : language === "pcd" ? cat.labelPCD : language === "de" ? cat.labelDE : cat.labelFR}
            </button>
          ))}
        </motion.div>

        {/* Video Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredVideos.map((video, index) => (
              <motion.div
                key={video.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                onClick={() => handleVideoClick(video)}
                className="group relative cursor-pointer overflow-hidden rounded-xl bg-card shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <video
                    src={video.src + "#t=0.5"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    muted
                    playsInline
                    preload="auto"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-background/80 backdrop-blur-sm rounded-md text-xs font-medium text-foreground">
                    {language === "nl" 
                      ? categories.find(c => c.id === video.category)?.labelNL 
                      : language === "en"
                      ? categories.find(c => c.id === video.category)?.labelEN
                      : language === "es"
                      ? categories.find(c => c.id === video.category)?.labelES
                      : language === "vls"
                      ? categories.find(c => c.id === video.category)?.labelVLS
                      : language === "pcd"
                      ? categories.find(c => c.id === video.category)?.labelPCD
                      : language === "de"
                      ? categories.find(c => c.id === video.category)?.labelDE
                      : categories.find(c => c.id === video.category)?.labelFR}
                  </div>

                  {/* AI Generated Badge */}
                  <AiLabel className="top-3 right-3" />
                </div>

                {/* Video Info */}
                <div className="p-4">
                  <h3 className="font-serif text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                    {language === "nl" ? video.titleNL : language === "en" ? video.titleEN : language === "es" ? video.titleES : language === "vls" ? video.titleVLS : language === "pcd" ? video.titlePCD : language === "de" ? video.titleDE : video.titleFR}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {language === "nl" ? video.descriptionNL : language === "en" ? video.descriptionEN : language === "es" ? video.descriptionES : language === "vls" ? video.descriptionVLS : language === "pcd" ? video.descriptionPCD : language === "de" ? video.descriptionDE : video.descriptionFR}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Video Lightbox */}
        <AnimatePresence>
          {selectedVideo && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
              onClick={closeLightbox}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeLightbox}
                  className="absolute -top-12 right-0 p-2 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-8 h-8" />
                </button>

                {/* Video Player */}
                <div className="relative rounded-xl overflow-hidden bg-black">
                  <video
                    ref={videoRef}
                    src={selectedVideo.src}
                    className="w-full aspect-video"
                    autoPlay
                    playsInline
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />

                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={togglePlay}
                          className="p-2 text-white/90 hover:text-white transition-colors"
                        >
                          {isPlaying ? (
                            <Pause className="w-6 h-6" />
                          ) : (
                            <Play className="w-6 h-6" fill="currentColor" />
                          )}
                        </button>
                        <button
                          onClick={toggleMute}
                          className="p-2 text-white/90 hover:text-white transition-colors"
                        >
                          {isMuted ? (
                            <VolumeX className="w-6 h-6" />
                          ) : (
                            <Volume2 className="w-6 h-6" />
                          )}
                        </button>
                      </div>

                      <button
                        onClick={toggleFullscreen}
                        className="p-2 text-white/90 hover:text-white transition-colors"
                      >
                        <Maximize2 className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Video Info */}
                <div className="mt-4 text-center">
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-2">
                    {language === "nl" ? selectedVideo.titleNL : language === "en" ? selectedVideo.titleEN : language === "es" ? selectedVideo.titleES : language === "vls" ? selectedVideo.titleVLS : language === "pcd" ? selectedVideo.titlePCD : language === "de" ? selectedVideo.titleDE : selectedVideo.titleFR}
                  </h3>
                  <p className="text-white/70 max-w-2xl mx-auto">
                    {language === "nl" ? selectedVideo.descriptionNL : language === "en" ? selectedVideo.descriptionEN : language === "es" ? selectedVideo.descriptionES : language === "vls" ? selectedVideo.descriptionVLS : language === "pcd" ? selectedVideo.descriptionPCD : language === "de" ? selectedVideo.descriptionDE : selectedVideo.descriptionFR}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default VideoGalerij;
