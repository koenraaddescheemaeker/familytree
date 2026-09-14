import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  MapPin, 
  Factory, 
  Footprints, 
  Hammer, 
  Users, 
  Swords, 
  Building2, 
  PartyPopper,
  ChevronDown,
  ChevronUp,
  Waves,
  ExternalLink
} from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import images
import izegemKaart1850 from "@/assets/izegem-kaart-1850.jpg";
import izegemKaart1910 from "@/assets/izegem-kaart-1910.jpg";
import ferrarisIzegem from "@/assets/ferraris-izegem-1777.jpg";
import oudeKerk from "@/assets/oude-kerk.jpg";
import meubelatelier from "@/assets/meubelatelier-1880.jpg";
import reunion1962 from "@/assets/reunion-1962.jpg";
import reunion2024 from "@/assets/reunion-2024-new.jpg";
import oorlogWo1 from "@/assets/oorlog-wo1-ijzer.jpg";

interface IzegemEvent {
  year: string;
  icon: "map" | "factory" | "shoes" | "hammer" | "users" | "war" | "building" | "party" | "river";
  image?: string;
  showLiveMap?: boolean;
}

interface IzegemEventTranslations {
  title: Record<string, string>;
  description: Record<string, string>;
  extraContent?: Record<string, string>;
  imageDesc?: Record<string, string>;
}

const iconMap = {
  map: MapPin,
  factory: Factory,
  shoes: Footprints,
  hammer: Hammer,
  users: Users,
  war: Swords,
  building: Building2,
  party: PartyPopper,
  river: Waves,
};

const izegemEvents: (IzegemEvent & IzegemEventTranslations)[] = [
  {
    year: "1699",
    icon: "map",
    image: ferrarisIzegem,
    title: {
      nl: "Aankomst van de Familie Deforce",
      fr: "Arrivée de la Famille Deforce",
      en: "Arrival of the Deforce Family",
      es: "Llegada de la Familia Deforce",
      de: "Ankunft der Familie Deforce",
      pcd: "Arrivée d'la Famille Deforce",
      vls: "Ankomste van de Familie Deforce",
    },
    description: {
      nl: "Hubert Deleforge en Antoinette Follet vestigen zich in Izegem/Emelgem, na hun vertrek uit het door oorlog geteisterde Frans-Vlaanderen. Dit markeert het begin van 325 jaar familiegeschiedenis in deze West-Vlaamse stad.",
      fr: "Hubert Deleforge et Antoinette Follet s'installent à Izegem/Emelgem, après leur départ de la Flandre française ravagée par la guerre. Cela marque le début de 325 ans d'histoire familiale dans cette ville de Flandre occidentale.",
      en: "Hubert Deleforge and Antoinette Follet settle in Izegem/Emelgem, after leaving war-torn French Flanders. This marks the beginning of 325 years of family history in this West Flemish city.",
      es: "Hubert Deleforge y Antoinette Follet se establecen en Izegem/Emelgem, tras abandonar la Flandes francesa devastada por la guerra. Esto marca el comienzo de 325 años de historia familiar en esta ciudad de Flandes Occidental.",
      de: "Hubert Deleforge und Antoinette Follet lassen sich in Izegem/Emelgem nieder, nachdem sie das kriegsgeplagte Französisch-Flandern verlassen haben. Dies markiert den Beginn von 325 Jahren Familiengeschichte in dieser westflämischen Stadt.",
      pcd: "Hubert Deleforge pi Antoinette Follet i s'installte à Izegem/Emelgem, aprés leu départ d'el Flandre française ravagée par la guerre. Ch'est l' début d' 325 ans d'histoère familiale dins ste ville.",
      vls: "Hubert Deleforge en Antoinette Follet vestigden hun in Izegem/Emelgem, noa 't verlaten van 't deur oorlog geteisterd Frans-Vloanderen. Dit markeert 't begin van 325 joar familiegeschiedenisse in die West-Vlaamsche stad.",
    },
    extraContent: {
      nl: "De familie vluchtte voor de oorlogen van Lodewijk XIV en de economische onrust in Frans-Vlaanderen. De reis van 50 km van Hallennes naar Emelgem duurde meerdere dagen. Izegem bood stabiliteit onder Oostenrijks bestuur.",
      fr: "La famille fuyait les guerres de Louis XIV et l'instabilité économique en Flandre française. Le voyage de 50 km de Hallennes à Emelgem prenait plusieurs jours. Izegem offrait la stabilité sous administration autrichienne.",
      en: "The family fled the wars of Louis XIV and economic unrest in French Flanders. The 50 km journey from Hallennes to Emelgem took several days. Izegem offered stability under Austrian rule.",
      es: "La familia huyó de las guerras de Luis XIV y la inestabilidad económica en la Flandes francesa. El viaje de 50 km desde Hallennes hasta Emelgem tomó varios días. Izegem ofrecía estabilidad bajo el dominio austriaco.",
      de: "Die Familie floh vor den Kriegen Ludwigs XIV. und der wirtschaftlichen Unruhen in Französisch-Flandern. Die 50 km lange Reise von Hallennes nach Emelgem dauerte mehrere Tage. Izegem bot Stabilität unter österreichischer Herrschaft.",
      pcd: "La famille i fuyot les guerres éd Louis XIV et l'instabilité économique in Flandre française. L' voyage éd 50 km i prindot plusieus jours.",
      vls: "De familie vluchtte vôor de oorlogen van Lodewyk XIV en de economische onrust in Frans-Vloanderen. De reis van 50 km van Hallennes noa Emelgem duurde meerdere dogen.",
    },
    imageDesc: {
      nl: "Ferrariskaart van Izegem (1777) - De regio waar de familie zich vestigde",
      fr: "Carte de Ferraris d'Izegem (1777) - La région où la famille s'est installée",
      en: "Ferraris map of Izegem (1777) - The region where the family settled",
      es: "Mapa de Ferraris de Izegem (1777) - La región donde se estableció la familia",
      de: "Ferraris-Karte von Izegem (1777) - Die Region, in der sich die Familie niederließ",
      pcd: "Carte éd Ferraris d'Izegem (1777) - L' région où l' famille s'a installée",
      vls: "Ferrariskoarte van Izegem (1777) - De regio woar de familie zuch vestigde",
    },
  },
  {
    year: "1718",
    icon: "users",
    title: {
      nl: "Eerste Izegemse Huwelijk",
      fr: "Premier Mariage à Izegem",
      en: "First Izegem Marriage",
      es: "Primer Matrimonio en Izegem",
      de: "Erste Hochzeit in Izegem",
      pcd: "Preumier Mariage à Izegem",
      vls: "Eerste Izegemschen Huwelyk",
    },
    description: {
      nl: "Jacobus Franciscus Deleforge trouwt met Veronica Barbier in Izegem. Dit huwelijk bezegelt de definitieve vestiging van de familie in de regio en legt de basis voor alle toekomstige generaties.",
      fr: "Jacobus Franciscus Deleforge épouse Veronica Barbier à Izegem. Ce mariage scelle l'installation définitive de la famille dans la région et pose les bases de toutes les générations futures.",
      en: "Jacobus Franciscus Deleforge marries Veronica Barbier in Izegem. This marriage seals the family's definitive settlement in the region and lays the foundation for all future generations.",
      es: "Jacobus Franciscus Deleforge se casa con Veronica Barbier en Izegem. Este matrimonio sella el asentamiento definitivo de la familia en la región y sienta las bases para todas las generaciones futuras.",
      de: "Jacobus Franciscus Deleforge heiratet Veronica Barbier in Izegem. Diese Ehe besiegelt die endgültige Ansiedlung der Familie in der Region und legt den Grundstein für alle zukünftigen Generationen.",
      pcd: "Jacobus Franciscus Deleforge i marie Veronica Barbier à Izegem. Ch'mariage i scelle l'installation définitive d'la famille dins l' région.",
      vls: "Jacobus Franciscus Deleforge trouwt mee Veronica Barbier in Izegem. Dit huwelyk bezegelt de definitieve vestiging van de familie in de regio.",
    },
  },
  {
    year: "1750-1800",
    icon: "river",
    title: {
      nl: "De Mandel: Levensader van Izegem",
      fr: "La Mandel: Artère Vitale d'Izegem",
      en: "The Mandel: Lifeline of Izegem",
      es: "El Mandel: Arteria Vital de Izegem",
      de: "Die Mandel: Lebensader von Izegem",
      pcd: "La Mandel: Artère Vitale d'Izegem",
      vls: "De Mandel: Levensader van Izegem",
    },
    description: {
      nl: "De rivier de Mandel speelt een cruciale rol in de ontwikkeling van Izegem. Het water drijft molens aan voor lijnwaadproductie en later voor de schoen- en meubelindustrie. De vallei wordt het hart van de lokale nijverheid.",
      fr: "La rivière Mandel joue un rôle crucial dans le développement d'Izegem. L'eau alimente les moulins pour la production de lin et plus tard pour l'industrie de la chaussure et du meuble. La vallée devient le cœur de l'industrie locale.",
      en: "The Mandel river plays a crucial role in Izegem's development. The water powers mills for linen production and later for the shoe and furniture industry. The valley becomes the heart of local industry.",
      es: "El río Mandel juega un papel crucial en el desarrollo de Izegem. El agua impulsa molinos para la producción de lino y más tarde para la industria del calzado y muebles. El valle se convierte en el corazón de la industria local.",
      de: "Der Fluss Mandel spielt eine entscheidende Rolle bei der Entwicklung von Izegem. Das Wasser treibt Mühlen für die Leinenproduktion und später für die Schuh- und Möbelindustrie an. Das Tal wird zum Herzen der lokalen Industrie.",
      pcd: "La riviére Mandel i joue in rôle crucial dins l' développemint d'Izegem. L'ieu i alimente les molins pour la productione éd lin et pus tard pour l'industrie.",
      vls: "De rivier de Mandel speelt e cruciale rolle in de ontwikkeling van Izegem. 't Water dryft de molens an vôor lywaadproductie en later vôor de schoen- en meubelnyhyd.",
    },
  },
  {
    year: "1800-1850",
    icon: "shoes",
    image: izegemKaart1850,
    title: {
      nl: "Opkomst van de Schoennijverheid",
      fr: "Essor de l'Industrie de la Chaussure",
      en: "Rise of the Shoe Industry",
      es: "Auge de la Industria del Calzado",
      de: "Aufstieg der Schuhindustrie",
      pcd: "Essor d'l'Industrie d'la Chaussure",
      vls: "Opkomste van de Schoennyhyd",
    },
    description: {
      nl: "Izegem ontwikkelt zich tot het centrum van de Belgische schoenindustrie. Honderden kleine ateliers en later grotere fabrieken produceren schoeisel voor heel België en daarbuiten. De stad krijgt de bijnaam 'Schoenstad'.",
      fr: "Izegem se développe comme centre de l'industrie belge de la chaussure. Des centaines de petits ateliers et plus tard de grandes usines produisent des chaussures pour toute la Belgique et au-delà. La ville reçoit le surnom de 'Ville de la Chaussure'.",
      en: "Izegem develops into the center of the Belgian shoe industry. Hundreds of small workshops and later larger factories produce footwear for all of Belgium and beyond. The city earns the nickname 'Shoe City'.",
      es: "Izegem se desarrolla como centro de la industria belga del calzado. Cientos de pequeños talleres y luego fábricas más grandes producen calzado para toda Bélgica y más allá. La ciudad recibe el apodo de 'Ciudad del Calzado'.",
      de: "Izegem entwickelt sich zum Zentrum der belgischen Schuhindustrie. Hunderte kleine Werkstätten und später größere Fabriken produzieren Schuhe für ganz Belgien und darüber hinaus. Die Stadt erhält den Spitznamen 'Schuhstadt'.",
      pcd: "Izegem i s' développe comme centre d'l'industrie belge d'la chaussure. Des cintaines d' p'tits ateliers i produisent des chaussures pour toute la Belgique.",
      vls: "Izegem ontwikkelt zuch tot 't centrum van de Belgische schoennyhyd. Honderd klyine ateliers en later grôotere fabrieken produceren schoeisels vôor heel België.",
    },
    extraContent: {
      nl: "In de hoogtijdagen werkten duizenden Izegemnaren in de schoensector. De traditie van vakmanschap die de familie Deforce in houtbewerking cultiveerde, weerspiegelde de bredere ambachtelijke cultuur van de stad.",
      fr: "À l'apogée, des milliers d'Izegemois travaillaient dans le secteur de la chaussure. La tradition d'artisanat que la famille Deforce cultivait dans le travail du bois reflétait la culture artisanale plus large de la ville.",
      en: "At its peak, thousands of Izegem residents worked in the shoe sector. The tradition of craftsmanship that the Deforce family cultivated in woodworking reflected the broader artisanal culture of the city.",
      es: "En su apogeo, miles de residentes de Izegem trabajaban en el sector del calzado. La tradición artesanal que la familia Deforce cultivaba en la carpintería reflejaba la cultura artesanal más amplia de la ciudad.",
      de: "Auf dem Höhepunkt arbeiteten Tausende Einwohner von Izegem im Schuhsektor. Die Handwerkstradition, die die Familie Deforce in der Holzbearbeitung pflegte, spiegelte die breitere handwerkliche Kultur der Stadt wider.",
      pcd: "Au pus haut, des milliers d'Izegémois i travaillotent dins l' secteur d'la chaussure.",
      vls: "In de hôogtydogen werkten duuzenden Izegemnoars in de schoensector. De traditie van vakmanschap weerspiegelde de bredere ambachteluke cultuur.",
    },
    imageDesc: {
      nl: "Kaart van Izegem rond 1850 - Het groeiende industriële centrum",
      fr: "Carte d'Izegem vers 1850 - Le centre industriel en croissance",
      en: "Map of Izegem around 1850 - The growing industrial center",
      es: "Mapa de Izegem alrededor de 1850 - El centro industrial en crecimiento",
      de: "Karte von Izegem um 1850 - Das wachsende Industriezentrum",
      pcd: "Carte d'Izegem vers 1850 - L' centre industriel in croissance",
      vls: "Koarte van Izegem rond 1850 - 't Grôeiende industrieele centrum",
    },
  },
  {
    year: "1857",
    icon: "hammer",
    image: meubelatelier,
    title: {
      nl: "Geboorte Charles-Louis Deforce",
      fr: "Naissance de Charles-Louis Deforce",
      en: "Birth of Charles-Louis Deforce",
      es: "Nacimiento de Charles-Louis Deforce",
      de: "Geburt von Charles-Louis Deforce",
      pcd: "Naissance éd Charles-Louis Deforce",
      vls: "Geboorte Charles-Louis Deforce",
    },
    description: {
      nl: "Charles-Louis Deforce wordt geboren in Emelgem. Hij zou uitgroeien tot meester-timmerman en de centrale figuur in de familiegeschiedenis worden. Zijn ambacht symboliseert de industriële cultuur van Izegem.",
      fr: "Charles-Louis Deforce naît à Emelgem. Il deviendra maître-charpentier et figure centrale de l'histoire familiale. Son métier symbolise la culture industrielle d'Izegem.",
      en: "Charles-Louis Deforce is born in Emelgem. He would grow to become a master carpenter and the central figure in family history. His craft symbolizes the industrial culture of Izegem.",
      es: "Charles-Louis Deforce nace en Emelgem. Llegaría a convertirse en maestro carpintero y la figura central de la historia familiar. Su oficio simboliza la cultura industrial de Izegem.",
      de: "Charles-Louis Deforce wird in Emelgem geboren. Er sollte zum Meisterschreiner und zur zentralen Figur der Familiengeschichte werden. Sein Handwerk symbolisiert die industrielle Kultur von Izegem.",
      pcd: "Charles-Louis Deforce i nait à Emelgem. I d'vinrot maîte-charpintier et figure centrale d'l'histoère familiale.",
      vls: "Charles-Louis Deforce wordt geboren in Emelgem. Hy zou uitgroeien tot meester-timmerman en de centrale figuur in de familiegeschiedenisse worden.",
    },
    imageDesc: {
      nl: "Meubelatelier rond 1880 - Het vakmanschap dat generaties Deforce kenmerkte",
      fr: "Atelier de meubles vers 1880 - L'artisanat qui caractérisait les générations Deforce",
      en: "Furniture workshop around 1880 - The craftsmanship that characterized Deforce generations",
      es: "Taller de muebles alrededor de 1880 - La artesanía que caracterizó a las generaciones Deforce",
      de: "Möbelwerkstatt um 1880 - Das Handwerk, das die Deforce-Generationen auszeichnete",
      pcd: "Atelier éd meubles vers 1880 - L'artisanat qui caractérisot les générations Deforce",
      vls: "Meubelatelier rond 1880 - 't Vakmanschap da generaties Deforce kenmerkte",
    },
  },
  {
    year: "1880-1900",
    icon: "factory",
    image: izegemKaart1910,
    title: {
      nl: "Izegem: Industrieel Hoogtepunt",
      fr: "Izegem: Apogée Industrielle",
      en: "Izegem: Industrial Peak",
      es: "Izegem: Apogeo Industrial",
      de: "Izegem: Industrieller Höhepunkt",
      pcd: "Izegem: Apogée Industrielle",
      vls: "Izegem: Industrieel Hôogtepunt",
    },
    description: {
      nl: "Izegem bereikt zijn industriële hoogtepunt met tientallen schoen- en meubelfabrieken. De firma 'M. Deforce & Zonen' wordt opgericht. De stad telt meer dan 10.000 inwoners en heeft een eigen station.",
      fr: "Izegem atteint son apogée industrielle avec des dizaines de fabriques de chaussures et de meubles. L'entreprise 'M. Deforce & Zonen' est fondée. La ville compte plus de 10 000 habitants et possède sa propre gare.",
      en: "Izegem reaches its industrial peak with dozens of shoe and furniture factories. The company 'M. Deforce & Zonen' is founded. The city has over 10,000 inhabitants and its own train station.",
      es: "Izegem alcanza su apogeo industrial con decenas de fábricas de calzado y muebles. Se funda la empresa 'M. Deforce & Zonen'. La ciudad tiene más de 10.000 habitantes y su propia estación de tren.",
      de: "Izegem erreicht seinen industriellen Höhepunkt mit Dutzenden von Schuh- und Möbelfabriken. Die Firma 'M. Deforce & Zonen' wird gegründet. Die Stadt hat über 10.000 Einwohner und einen eigenen Bahnhof.",
      pcd: "Izegem i atteint sin apogée industrielle avé des dizaines éd fabriques. L'entreprise 'M. Deforce & Zonen' i est fondée.",
      vls: "Izegem bereikt zyn industrieel hôogtepunt mee tientallen schoen- en meubelfabrieken. De firma 'M. Deforce & Zonen' wordt opericht.",
    },
    extraContent: {
      nl: "De meubelindustrie van Izegem stond bekend om kwaliteitswerk in traditionele stijl. De houtsnijders waren georganiseerd in gilden en verenigingen. Deze traditie leeft voort in het Nationaal Borstelmuseum.",
      fr: "L'industrie du meuble d'Izegem était connue pour son travail de qualité dans le style traditionnel. Les sculpteurs sur bois étaient organisés en guildes et associations. Cette tradition perdure au Musée national de la Brosse.",
      en: "Izegem's furniture industry was known for quality work in traditional style. The wood carvers were organized in guilds and associations. This tradition lives on in the National Brush Museum.",
      es: "La industria del mueble de Izegem era conocida por su trabajo de calidad en estilo tradicional. Los talladores de madera estaban organizados en gremios y asociaciones. Esta tradición perdura en el Museo Nacional del Cepillo.",
      de: "Die Möbelindustrie von Izegem war für Qualitätsarbeit im traditionellen Stil bekannt. Die Holzschnitzer waren in Gilden und Vereinen organisiert. Diese Tradition lebt im Nationalen Bürstenmuseum weiter.",
      pcd: "L'industrie du meuble d'Izegem étot connue pour sin travail éd qualité. Les sculpteurs sur bos étotent organisés in guildes.",
      vls: "De meubelindustrie van Izegem stond bekend vôor kwaliteitswerk in traditioneelen styl. De houtsnyers waren georganiseerd in gilden.",
    },
    imageDesc: {
      nl: "Kaart van Izegem rond 1910 - De industriële stad op zijn hoogtepunt",
      fr: "Carte d'Izegem vers 1910 - La ville industrielle à son apogée",
      en: "Map of Izegem around 1910 - The industrial city at its peak",
      es: "Mapa de Izegem alrededor de 1910 - La ciudad industrial en su apogeo",
      de: "Karte von Izegem um 1910 - Die Industriestadt auf ihrem Höhepunkt",
      pcd: "Carte d'Izegem vers 1910 - La ville industrielle à sin apogée",
      vls: "Koarte van Izegem rond 1910 - De industrieele stad ip zyn hôogtepunt",
    },
  },
  {
    year: "1914-1918",
    icon: "war",
    image: oorlogWo1,
    title: {
      nl: "De Grote Oorlog Treft Izegem",
      fr: "La Grande Guerre Frappe Izegem",
      en: "The Great War Hits Izegem",
      es: "La Gran Guerra Golpea Izegem",
      de: "Der Große Krieg Trifft Izegem",
      pcd: "La Grande Guerre Frappe Izegem",
      vls: "Den Grôoten Oorlog Treft Izegem",
    },
    description: {
      nl: "De Eerste Wereldoorlog brengt vier jaar bezetting. Het front ligt slechts 30 km verderop bij de IJzer. De bevolking lijdt onder voedselschaarste en dwangarbeid. Leonie Plancke, vrouw van Charles-Louis, sterft in 1917.",
      fr: "La Première Guerre mondiale apporte quatre ans d'occupation. Le front n'est qu'à 30 km, près de l'Yser. La population souffre de pénuries alimentaires et de travail forcé. Leonie Plancke, épouse de Charles-Louis, décède en 1917.",
      en: "World War I brings four years of occupation. The front is only 30 km away at the Yser. The population suffers from food shortages and forced labor. Leonie Plancke, wife of Charles-Louis, dies in 1917.",
      es: "La Primera Guerra Mundial trae cuatro años de ocupación. El frente está a solo 30 km en el Yser. La población sufre escasez de alimentos y trabajo forzado. Leonie Plancke, esposa de Charles-Louis, muere en 1917.",
      de: "Der Erste Weltkrieg bringt vier Jahre Besatzung. Die Front ist nur 30 km entfernt an der Yser. Die Bevölkerung leidet unter Nahrungsmittelknappheit und Zwangsarbeit. Leonie Plancke, Ehefrau von Charles-Louis, stirbt 1917.",
      pcd: "La Premiére Guerre mondiale i apporte quate ans d'occupation. L' front i est à seulmint 30 km, prés d'l'Yser. Leonie Plancke i décéde in 1917.",
      vls: "Den Eersten Weireldoorlog bringt vier joar bezetting. 't Front ligt moar 30 km wijer by den Yzer. De bevolking lydt onder voedselschaarste. Leonie Plancke, vrouwe van Charles-Louis, sterft in 1917.",
    },
    extraContent: {
      nl: "Na de oorlog hertrouwt Charles-Louis in 1918, het jaar van de Bevrijding. Zijn zoon Alberic Camiel sterft in 1920 op 21-jarige leeftijd, mogelijk door de Spaanse griep. De industriële wederopbouw van Izegem begint langzaam.",
      fr: "Après la guerre, Charles-Louis se remarie en 1918, l'année de la Libération. Son fils Alberic Camiel décède en 1920 à 21 ans, peut-être de la grippe espagnole. La reconstruction industrielle d'Izegem commence lentement.",
      en: "After the war, Charles-Louis remarries in 1918, the year of Liberation. His son Alberic Camiel dies in 1920 at age 21, possibly from the Spanish flu. Izegem's industrial reconstruction begins slowly.",
      es: "Después de la guerra, Charles-Louis se vuelve a casar en 1918, el año de la Liberación. Su hijo Alberic Camiel muere en 1920 a los 21 años, posiblemente por la gripe española. La reconstrucción industrial de Izegem comienza lentamente.",
      de: "Nach dem Krieg heiratet Charles-Louis 1918 erneut, im Jahr der Befreiung. Sein Sohn Alberic Camiel stirbt 1920 mit 21 Jahren, möglicherweise an der Spanischen Grippe. Der industrielle Wiederaufbau von Izegem beginnt langsam.",
      pcd: "Aprés la guerre, Charles-Louis i s' remarie in 1918, l'année d'la Libération. Sin fils Alberic Camiel i décéde in 1920 à 21 ans.",
      vls: "Noa den oorlog hertrouwt Charles-Louis in 1918, 't joar van de Bevryding. Zyn zeune Alberic Camiel sterft in 1920 ip 21-joarigen leeftyd.",
    },
    imageDesc: {
      nl: "Het Belgische leger aan de IJzer (1914-1918) - Het front lag slechts 30 km van Izegem",
      fr: "L'armée belge à l'Yser (1914-1918) - Le front n'était qu'à 30 km d'Izegem",
      en: "The Belgian army at the Yser (1914-1918) - The front was only 30 km from Izegem",
      es: "El ejército belga en el Yser (1914-1918) - El frente estaba a solo 30 km de Izegem",
      de: "Die belgische Armee an der Yser (1914-1918) - Die Front war nur 30 km von Izegem entfernt",
      pcd: "L'armée belge à l'Yser (1914-1918) - L' front i étot à 30 km d'Izegem",
      vls: "Het Belgisch leger an den Yzer (1914-1918) - 't Front lag moar 30 km van Izegem",
    },
  },
  {
    year: "1938",
    icon: "building",
    image: oudeKerk,
    title: {
      nl: "Overlijden Charles-Louis Deforce",
      fr: "Décès de Charles-Louis Deforce",
      en: "Death of Charles-Louis Deforce",
      es: "Fallecimiento de Charles-Louis Deforce",
      de: "Tod von Charles-Louis Deforce",
      pcd: "Décés éd Charles-Louis Deforce",
      vls: "Overlyden Charles-Louis Deforce",
    },
    description: {
      nl: "Charles-Louis Deforce overlijdt in Izegem op 81-jarige leeftijd. Hij was drie keer getrouwd en laat een groot gezin na. Zijn zoon Marcel zet het familiebedrijf voort. Een tijdperk eindigt, maar de traditie leeft voort.",
      fr: "Charles-Louis Deforce décède à Izegem à l'âge de 81 ans. Il a été marié trois fois et laisse une grande famille. Son fils Marcel poursuit l'entreprise familiale. Une époque se termine, mais la tradition perdure.",
      en: "Charles-Louis Deforce dies in Izegem at age 81. He was married three times and leaves behind a large family. His son Marcel continues the family business. An era ends, but the tradition lives on.",
      es: "Charles-Louis Deforce muere en Izegem a los 81 años. Estuvo casado tres veces y deja una gran familia. Su hijo Marcel continúa el negocio familiar. Una era termina, pero la tradición perdura.",
      de: "Charles-Louis Deforce stirbt in Izegem im Alter von 81 Jahren. Er war dreimal verheiratet und hinterlässt eine große Familie. Sein Sohn Marcel führt das Familienunternehmen fort. Eine Ära endet, aber die Tradition lebt weiter.",
      pcd: "Charles-Louis Deforce i décéde à Izegem à 81 ans. I étot marié troés foés et i laisse ène grande famille. Sin fils Marcel i continue l'entreprise familiale.",
      vls: "Charles-Louis Deforce overlydt in Izegem ip 81-joarigen leeftyd. Hy was drie keren getrouwd en loat e grôot gezin achter. Zyn zeune Marcel zet 't familiebedryf vôort.",
    },
    imageDesc: {
      nl: "De oude kerk van Izegem - Waar generaties Deforce werden gedoopt, getrouwd en begraven",
      fr: "L'ancienne église d'Izegem - Où des générations de Deforce furent baptisées, mariées et enterrées",
      en: "The old church of Izegem - Where generations of Deforce were baptized, married and buried",
      es: "La antigua iglesia de Izegem - Donde generaciones de Deforce fueron bautizados, casados y enterrados",
      de: "Die alte Kirche von Izegem - Wo Generationen von Deforce getauft, verheiratet und begraben wurden",
      pcd: "L'ancienne église d'Izegem - Où des générationces éd Deforce fûtent baptisées, mariées et enterrées",
      vls: "De oude kerke van Izegem - Woar generaties Deforce werden gedoopt, getrouwd en begraven",
    },
  },
  {
    year: "1962",
    icon: "party",
    image: reunion1962,
    title: {
      nl: "Familiereünie aan de Vandenbogaerdelaan",
      fr: "Réunion Familiale au Vandenbogaerdelaan",
      en: "Family Reunion at Vandenbogaerdelaan",
      es: "Reunión Familiar en Vandenbogaerdelaan",
      de: "Familientreffen am Vandenbogaerdelaan",
      pcd: "Réunion Familiale au Vandenbogaerdelaan",
      vls: "Familiereünie an de Vandenbogaerdeloan",
    },
    description: {
      nl: "Een historische familiereünie bij het ouderlijk huis aan de Vandenbogaerdelaan 27 in Izegem. Meerdere generaties Deforce komen samen. Dit adres blijft decennialang het hart van de familie.",
      fr: "Une réunion familiale historique à la maison parentale au Vandenbogaerdelaan 27 à Izegem. Plusieurs générations Deforce se rassemblent. Cette adresse reste le cœur de la famille pendant des décennies.",
      en: "A historic family reunion at the parental home at Vandenbogaerdelaan 27 in Izegem. Multiple generations of Deforce gather. This address remains the heart of the family for decades.",
      es: "Una reunión familiar histórica en la casa paterna en Vandenbogaerdelaan 27 en Izegem. Múltiples generaciones de Deforce se reúnen. Esta dirección sigue siendo el corazón de la familia durante décadas.",
      de: "Ein historisches Familientreffen im Elternhaus am Vandenbogaerdelaan 27 in Izegem. Mehrere Generationen Deforce kommen zusammen. Diese Adresse bleibt jahrzehntelang das Herz der Familie.",
      pcd: "Ène réunion familiale historique à l' maison parentale au Vandenbogaerdelaan 27 à Izegem. Plusieus générationces Deforce i s' rassemblent.",
      vls: "E historische familiereünie by 't ouderlyke huis an de Vandenbogaerdeloan 27 in Izegem. Meerdere generaties Deforce komen tesamen.",
    },
    imageDesc: {
      nl: "Familiereünie 1962 - Meerdere generaties Deforce verenigd bij het ouderlijk huis",
      fr: "Réunion de famille 1962 - Plusieurs générations Deforce réunies à la maison parentale",
      en: "Family reunion 1962 - Multiple generations Deforce united at the parental home",
      es: "Reunión familiar 1962 - Múltiples generaciones Deforce unidas en la casa paterna",
      de: "Familientreffen 1962 - Mehrere Generationen Deforce vereint im Elternhaus",
      pcd: "Réunion d' famille 1962 - Plusieus générationces Deforce réunies à l' maison parentale",
      vls: "Familiereünie 1962 - Meerdere generaties Deforce vereend by 't ouderlyke huis",
    },
  },
  {
    year: "2024",
    icon: "party",
    image: reunion2024,
    title: {
      nl: "325 Jaar Later: De Grote Reünie",
      fr: "325 Ans Plus Tard: La Grande Réunion",
      en: "325 Years Later: The Great Reunion",
      es: "325 Años Después: La Gran Reunión",
      de: "325 Jahre Später: Das Große Treffen",
      pcd: "325 Ans Pus Tard: La Grande Réunion",
      vls: "325 Joar Later: De Grôote Reünie",
    },
    description: {
      nl: "Op 29 september 2024 komen 112 afstammelingen van Marcel Deforce en Magdalena Geldof samen in Het Prullenbos te Laarne. Hoewel niet in Izegem zelf, herdenken zij hun Izegemse wortels. Een nieuw hoofdstuk in de familiegeschiedenis.",
      fr: "Le 29 septembre 2024, 112 descendants de Marcel Deforce et Magdalena Geldof se réunissent au Prullenbos à Laarne. Bien que pas à Izegem même, ils commémorent leurs racines izegemmoises. Un nouveau chapitre dans l'histoire familiale.",
      en: "On September 29, 2024, 112 descendants of Marcel Deforce and Magdalena Geldof gather at Het Prullenbos in Laarne. Although not in Izegem itself, they commemorate their Izegem roots. A new chapter in family history.",
      es: "El 29 de septiembre de 2024, 112 descendientes de Marcel Deforce y Magdalena Geldof se reúnen en Het Prullenbos en Laarne. Aunque no en Izegem mismo, conmemoran sus raíces de Izegem. Un nuevo capítulo en la historia familiar.",
      de: "Am 29. September 2024 versammeln sich 112 Nachkommen von Marcel Deforce und Magdalena Geldof im Prullenbos in Laarne. Obwohl nicht in Izegem selbst, gedenken sie ihrer Wurzeln in Izegem. Ein neues Kapitel in der Familiengeschichte.",
      pcd: "L' 29 septembre 2024, 112 descendants éd Marcel Deforce et Magdalena Geldof i s' rassemblent au Prullenbos à Laarne. Bin qu' pas à Izegem méme, i commémorent leus racines.",
      vls: "Ip 29 september 2024 komen 112 afstammelingen van Marcel Deforce en Magdalena Geldof tesamen in 't Prullenbos te Laarne. Ofschôon nie in Izegem zelf, gedenken zy hun Izegemsche wortels.",
    },
    imageDesc: {
      nl: "Familiereünie 2024 - 112 afstammelingen van Marcel en Magdalena verenigd",
      fr: "Réunion de famille 2024 - 112 descendants de Marcel et Magdalena réunis",
      en: "Family reunion 2024 - 112 descendants of Marcel and Magdalena united",
      es: "Reunión familiar 2024 - 112 descendientes de Marcel y Magdalena unidos",
      de: "Familientreffen 2024 - 112 Nachkommen von Marcel und Magdalena vereint",
      pcd: "Réunion d' famille 2024 - 112 descendants éd Marcel et Magdalena réunis",
      vls: "Familiereünie 2024 - 112 afstammelingen van Marcel en Magdalena vereend",
    },
  },
  {
    year: "Vandaag",
    icon: "map",
    showLiveMap: true,
    title: {
      nl: "Izegem Vandaag",
      fr: "Izegem Aujourd'hui",
      en: "Izegem Today",
      es: "Izegem Hoy",
      de: "Izegem Heute",
      pcd: "Izegem Aujord'hui",
      vls: "Izegem Vandage",
    },
    description: {
      nl: "Izegem is vandaag een moderne stad van ongeveer 28.000 inwoners. Hoewel de schoenindustrie grotendeels verdwenen is, herinneren het Nationaal Schoeiselmuseum en het Borstelmuseum aan het industriële verleden. De Deforce-familie is nu verspreid over heel België.",
      fr: "Izegem est aujourd'hui une ville moderne d'environ 28 000 habitants. Bien que l'industrie de la chaussure ait largement disparu, le Musée national de la Chaussure et le Musée de la Brosse rappellent le passé industriel. La famille Deforce est maintenant dispersée dans toute la Belgique.",
      en: "Izegem is today a modern city of about 28,000 inhabitants. Although the shoe industry has largely disappeared, the National Footwear Museum and Brush Museum remind us of the industrial past. The Deforce family is now spread across Belgium.",
      es: "Izegem es hoy una ciudad moderna de unos 28.000 habitantes. Aunque la industria del calzado ha desaparecido en gran medida, el Museo Nacional del Calzado y el Museo del Cepillo recuerdan el pasado industrial. La familia Deforce ahora está dispersa por toda Bélgica.",
      de: "Izegem ist heute eine moderne Stadt mit etwa 28.000 Einwohnern. Obwohl die Schuhindustrie weitgehend verschwunden ist, erinnern das Nationale Schuhmuseum und das Bürstenmuseum an die industrielle Vergangenheit. Die Familie Deforce ist nun über ganz Belgien verstreut.",
      pcd: "Izegem i est aujord'hui ène ville moderne d'à peu prés 28 000 habitants. Bin qu' l'industrie d'la chaussure a in grande partie disparu, l' Musée national d'la Chaussure i rappelle l' passé industriel.",
      vls: "Izegem is vandage e moderne stad van ongeveer 28.000 inwôoners. Ofschôon de schoennyhyd grotendeels verdwenen is, herinneren 't Nationoal Schoemuseum en 't Borstelmuseum an 't industrieele verleden.",
    },
    imageDesc: {
      nl: "Interactieve kaart van Izegem - Bekijk de stad op OpenStreetMap",
      fr: "Carte interactive d'Izegem - Voir la ville sur OpenStreetMap",
      en: "Interactive map of Izegem - View the city on OpenStreetMap",
      es: "Mapa interactivo de Izegem - Ver la ciudad en OpenStreetMap",
      de: "Interaktive Karte von Izegem - Stadt auf OpenStreetMap ansehen",
      pcd: "Carte interactive d'Izegem - Vir la ville su OpenStreetMap",
      vls: "Interactieve koarte van Izegem - Bekyk de stad ip OpenStreetMap",
    },
  },
];

// Translations for static text
const staticTranslations = {
  title: {
    nl: "Izegem: 325 Jaar Familiegeschiedenis",
    fr: "Izegem: 325 Ans d'Histoire Familiale",
    en: "Izegem: 325 Years of Family History",
    es: "Izegem: 325 Años de Historia Familiar",
    de: "Izegem: 325 Jahre Familiengeschichte",
    pcd: "Izegem: 325 Ans d'Histoère Familiale",
    vls: "Izegem: 325 Joar Familiegeschiedenisse",
  },
  subtitle: {
    nl: "Van de aankomst in 1699 tot de grote reünie van 2024 — een interactieve reis door de geschiedenis van onze thuisstad",
    fr: "De l'arrivée en 1699 à la grande réunion de 2024 — un voyage interactif à travers l'histoire de notre ville natale",
    en: "From arrival in 1699 to the great reunion of 2024 — an interactive journey through our hometown's history",
    es: "Desde la llegada en 1699 hasta la gran reunión de 2024 — un viaje interactivo a través de la historia de nuestra ciudad natal",
    de: "Von der Ankunft 1699 bis zum großen Treffen 2024 — eine interaktive Reise durch die Geschichte unserer Heimatstadt",
    pcd: "Éd l'arrivée in 1699 jusqu'à la grande réunion d' 2024 — in voyage interactif à travers l'histoère",
    vls: "Van de ankomste in 1699 tot de grôote reünie van 2024 — e interactieve reis deur de geschiedenisse van uuze thuusstad",
  },
  readMore: {
    nl: "Lees meer",
    fr: "Lire plus",
    en: "Read more",
    es: "Leer más",
    de: "Mehr lesen",
    pcd: "Lire pus",
    vls: "Lies mee",
  },
  readLess: {
    nl: "Lees minder",
    fr: "Lire moins",
    en: "Read less",
    es: "Leer menos",
    de: "Weniger lesen",
    pcd: "Lire moins",
    vls: "Lies minder",
  },
};

// Live Map Component for Izegem
const IzegemLiveMap = ({ imageDesc }: { imageDesc?: string }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const { language } = useLanguage();
  
  const layerLabels: Record<string, { street: string; satellite: string }> = {
    nl: { street: "Stratenkaart", satellite: "Satelliet" },
    fr: { street: "Plan des rues", satellite: "Satellite" },
    en: { street: "Street Map", satellite: "Satellite" },
    es: { street: "Mapa de calles", satellite: "Satélite" },
    de: { street: "Straßenkarte", satellite: "Satellit" },
    pcd: { street: "Carte des rues", satellite: "Satellite" },
    vls: { street: "Stroatenkoarte", satellite: "Satelliet" },
  };
  
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;
    
    // Izegem coordinates
    const izegemLat = 50.9144;
    const izegemLng = 3.2150;
    
    // OpenStreetMap layer (street view)
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    });
    
    // Esri World Imagery layer (satellite view)
    const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: '&copy; <a href="https://www.esri.com/">Esri</a> &mdash; Sources: Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN',
      maxZoom: 19,
    });
    
    // Create map with OSM as default
    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      dragging: true,
      zoomControl: true,
      layers: [osmLayer], // Start with street map
    }).setView([izegemLat, izegemLng], 14);
    
    mapInstanceRef.current = map;
    
    // Add layer control
    const labels = layerLabels[language] || layerLabels.nl;
    const baseMaps: Record<string, L.TileLayer> = {
      [labels.street]: osmLayer,
      [labels.satellite]: satelliteLayer,
    };
    
    L.control.layers(baseMaps, undefined, {
      position: 'topright',
      collapsed: false,
    }).addTo(map);
    
    
    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [language]);
  
  return (
    <div className="mt-4 overflow-hidden rounded-lg">
      <div 
        ref={mapRef} 
        className="w-full h-48 md:h-56 z-0"
        style={{ background: 'hsl(var(--muted))' }}
      />
      <div className="flex items-center justify-between mt-2">
        {imageDesc && (
          <p className="text-xs text-muted-foreground italic flex-1">
            {imageDesc}
          </p>
        )}
        <a
          href="https://www.openstreetmap.org/?mlat=50.9144&mlon=3.2150#map=14/50.9144/3.2150"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors ml-2"
        >
          <ExternalLink className="w-3 h-3" />
          OpenStreetMap
        </a>
      </div>
    </div>
  );
};

const IzegemEventCard = ({ 
  event, 
  index, 
  language 
}: { 
  event: IzegemEvent & IzegemEventTranslations; 
  index: number; 
  language: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const Icon = iconMap[event.icon];
  const isLeft = index % 2 === 0;
  const lang = language as keyof typeof staticTranslations.title;
  
  const title = event.title[lang] || event.title.nl;
  const description = event.description[lang] || event.description.nl;
  const extraContent = event.extraContent?.[lang] || event.extraContent?.nl;
  const imageDesc = event.imageDesc?.[lang] || event.imageDesc?.nl;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`flex items-start gap-4 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
    >
      {/* Content Card */}
      <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-card border border-border rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow"
        >
          {/* Year Badge */}
          <div className={`flex items-center gap-2 mb-3 ${isLeft ? "md:justify-end" : "md:justify-start"}`}>
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
              {event.year}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            {description}
          </p>
          
          {/* Live Map for "Vandaag" */}
          {event.showLiveMap && (
            <IzegemLiveMap imageDesc={imageDesc} />
          )}
          
          {/* Static Image */}
          {event.image && !event.showLiveMap && (
            <motion.div 
              className="mt-4 overflow-hidden rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
            >
              <img
                src={event.image}
                alt={imageDesc || title}
                className="w-full h-40 md:h-48 object-cover hover:scale-105 transition-transform duration-500"
                onLoad={() => setImageLoaded(true)}
                loading="lazy"
              />
              {imageDesc && (
                <p className="text-xs text-muted-foreground mt-2 italic">
                  {imageDesc}
                </p>
              )}
            </motion.div>
          )}
          
          {/* Extra Content Toggle */}
          {extraContent && (
            <div className="mt-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors ${isLeft ? "md:ml-auto" : ""}`}
              >
                {isExpanded ? (
                  <>
                    {staticTranslations.readLess[lang] || staticTranslations.readLess.nl}
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    {staticTranslations.readMore[lang] || staticTranslations.readMore.nl}
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>
              
              <motion.div
                initial={false}
                animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                  {extraContent}
                </p>
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Timeline Node */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: 0.4, type: "spring" }}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary flex items-center justify-center shadow-lg z-10"
        >
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
        </motion.div>
        <div className="w-0.5 h-full bg-border absolute" />
      </div>
      
      {/* Spacer for alternating layout */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
};

const IzegemTijdlijn = () => {
  const { language } = useLanguage();
  const lang = language as keyof typeof staticTranslations.title;
  
  return (
    <section 
      id="izegem-tijdlijn" 
      className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30"
      aria-labelledby="izegem-timeline-title"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Izegem, West-Vlaanderen
          </span>
          <h2 
            id="izegem-timeline-title"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            {staticTranslations.title[lang] || staticTranslations.title.nl}
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {staticTranslations.subtitle[lang] || staticTranslations.subtitle.nl}
          </p>
        </motion.div>
        
        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:-translate-x-1/2" />
          
          {/* Events */}
          <div className="space-y-8 md:space-y-12">
            {izegemEvents.map((event, index) => (
              <IzegemEventCard
                key={event.year}
                event={event}
                index={index}
                language={language}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IzegemTijdlijn;
