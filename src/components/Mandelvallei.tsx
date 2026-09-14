import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Waves, Factory, Cog, Shirt, MapPin, History, Droplets } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const Mandelvallei = () => {
  const { language } = useLanguage();

  const content = {
    nl: {
      title: "De Mandelvallei",
      subtitle: "Levensader van Midden-West-Vlaanderen",
      intro: "De Mandelvallei, met de rivier de Mandel als centrale as, vormde eeuwenlang het kloppend hart van de West-Vlaamse economie. Van neolithische nederzettingen tot industriële bloei — deze vallei vertelt het verhaal van onze voorouders.",
      sections: {
        river: {
          title: "De Rivier de Mandel",
          content: "De Mandel ontspringt in Passendale en stroomt 39,5 kilometer naar de Leie bij Wakken. Al sinds 4.400 voor Christus — zoals blijkt uit neolithische vondsten — bepaalde deze rivier het leven in de vallei. In 1888-1889 werden op de rechteroever belangrijke prehistorische sites ontdekt met honderden bewerkte silexstenen. De rivier vormde de grens tussen Izegem (zuidoever) en Emelgem/Kachtem (noordoever). In 1979 werd de Mandel in Izegem ingekokerd, maar haar historische betekenis blijft onverminderd groot.",
          highlight: "De naam 'Ten Mandere' van de heemkundige kring verwijst direct naar deze rivier."
        },
        linen: {
          title: "De Linnennijverheid",
          content: "Izegem groeide uit tot het dominerende handelscentrum van de Mandelvallei. In 1525 kreeg de stad een octrooi voor een wekelijkse lijnwaadmarkt. Rond 1545-1546 was Izegem het voornaamste bevoorradingscentrum voor de Gentse linnentransitohandel naar Antwerpen. De beroemde 'Yseghemsche blaeukens' — blauw geverfd linnen — werden verscheept naar Spanje en Engeland. De Izegemse el gold als de geijkte West-Vlaamse maat voor lijnwaad.",
          highlight: "Vier blekerijen aan de Pastoriebeek verwerkten het linnen met het zuivere water uit de Mandel."
        },
        mills: {
          title: "Watermolens & Blekerijen",
          content: "Het netwerk van waterlopen — de Mandel, Pastoriebeek, Lokbeek en Kasteelbeek — maakte Izegem ideaal voor watergebonden nijverheid. De blekerijen langs de Pastoriebeek waren essentieel voor het bleken en verven van linnen. De rivier zorgde voor de aandrijving van molens en het wassen van textiel. In de 14de-15de eeuw werden onder graaf Gwijde van Dampierre de Mandel verbreed en de bruggen verhoogd om de handel te bevorderen.",
          highlight: "Het 'roten' van vlas — het weken in water om de vezels los te maken — gebeurde in de beken van de Mandelvallei."
        },
        industry: {
          title: "Industriële Mandelas",
          content: "De aanleg van het kanaal Roeselare-Leie (1862-1872) transformeerde de Mandelvallei tot een industriële as. De textielnijverheid mechaniseerde: in 1839 begon P. Parmentier als eerste met mechanisch gesponnen garen, in 1864 startte hij de eerste volledig mechanische weverij in Emelgem. Naast textiel bloeiden de schoen- en borstelnijverheid. In 1899 vestigde olieslagerij Vandemoortele zich aan het kanaal — nu nog steeds een belangrijke producent.",
          highlight: "Eind 19de eeuw werkten circa 2000 arbeiders in de Izegemse schoensector — een kwart van de totale Belgische productie."
        },
        decline: {
          title: "Neergang & Verandering",
          content: "De Mandel begon in de 16de eeuw te verzanden, wat samen met de fiscale hervormingen van de hertog van Alva en de Tachtigjarige Oorlog (1568-1648) leidde tot de neergang van de linnenhandel. Veel wevers emigreerden naar Brugge en Kortrijk. Een project uit 1571-1572 om een kanaal te graven werd tegengehouden door naburige steden. Pas drie eeuwen later, met het kanaal Roeselare-Leie, kreeg de regio weer een waterweg.",
          highlight: "De linnenhal werd in 1589 door plunderende benden verwoest en nooit meer hersteld."
        }
      },
      timeline: {
        title: "Mijlpalen in de Mandelvallei",
        events: [
          { year: "4400 v.Chr.", event: "Neolithische bewoning in de Mandelvallei" },
          { year: "ca. 650", event: "Christianisatie door Sint-Tillo" },
          { year: "1066", event: "Oudste vermelding van Izegem ('Isinchehem')" },
          { year: "14de eeuw", event: "Verbreding Mandel, oprichting lijnwaadmarkt" },
          { year: "1525", event: "Octrooi wekelijkse linnenmarkt" },
          { year: "1545", event: "Izegem bevoorraadt Gentse linnenhandel" },
          { year: "1571", event: "Kanaalproject verhinderd door naburige steden" },
          { year: "1862-1872", event: "Aanleg kanaal Roeselare-Leie" },
          { year: "1979", event: "Mandel ingekokerd in Izegem" }
        ]
      },
      craftLink: "De vakmanschapstraditie van de familie Deforce wortelt in deze rijke industriële geschiedenis van de Mandelvallei."
    },
    en: {
      title: "The Mandel Valley",
      subtitle: "Lifeline of Central West Flanders",
      intro: "The Mandel Valley, with the Mandel river as its central axis, formed the beating heart of the West Flemish economy for centuries. From Neolithic settlements to industrial prosperity — this valley tells the story of our ancestors.",
      sections: {
        river: {
          title: "The Mandel River",
          content: "The Mandel originates in Passendale and flows 39.5 kilometers to the Leie at Wakken. Since 4,400 BC — as evidenced by Neolithic finds — this river shaped life in the valley. In 1888-1889, important prehistoric sites were discovered on the right bank with hundreds of worked flint stones. The river formed the border between Izegem (south bank) and Emelgem/Kachtem (north bank). In 1979, the Mandel was enclosed in pipes in Izegem, but its historical significance remains undiminished.",
          highlight: "The name 'Ten Mandere' of the local history society refers directly to this river."
        },
        linen: {
          title: "The Linen Industry",
          content: "Izegem grew into the dominant trading center of the Mandel Valley. In 1525, the city received a charter for a weekly linen market. Around 1545-1546, Izegem was the main supply center for Ghent's linen transit trade to Antwerp. The famous 'Yseghemsche blaeukens' — blue-dyed linen — were shipped to Spain and England. The Izegem ell was the standard West Flemish measure for linen.",
          highlight: "Four bleacheries along the Pastoriebeek processed linen with pure water from the Mandel."
        },
        mills: {
          title: "Water Mills & Bleacheries",
          content: "The network of waterways — the Mandel, Pastoriebeek, Lokbeek, and Kasteelbeek — made Izegem ideal for water-based industry. The bleacheries along the Pastoriebeek were essential for bleaching and dyeing linen. The river powered mills and washed textiles. In the 14th-15th centuries, under Count Guy of Dampierre, the Mandel was widened and bridges raised to promote trade.",
          highlight: "The 'retting' of flax — soaking in water to loosen fibers — took place in the streams of the Mandel Valley."
        },
        industry: {
          title: "Industrial Mandel Axis",
          content: "The construction of the Roeselare-Leie canal (1862-1872) transformed the Mandel Valley into an industrial axis. The textile industry mechanized: in 1839, P. Parmentier was the first to use mechanically spun yarn; in 1864, he started the first fully mechanical weaving mill in Emelgem. Besides textiles, the shoe and brush industries flourished. In 1899, Vandemoortele oil mill established itself at the canal — still an important producer today.",
          highlight: "By the late 19th century, about 2,000 workers were employed in Izegem's shoe sector — a quarter of Belgium's total production."
        },
        decline: {
          title: "Decline & Change",
          content: "The Mandel began silting up in the 16th century, which together with the Duke of Alba's fiscal reforms and the Eighty Years' War (1568-1648) led to the decline of linen trade. Many weavers emigrated to Bruges and Kortrijk. A 1571-1572 project to dig a canal was blocked by neighboring cities. Only three centuries later, with the Roeselare-Leie canal, did the region regain a waterway.",
          highlight: "The linen hall was destroyed by marauding bands in 1589 and never restored."
        }
      },
      timeline: {
        title: "Milestones in the Mandel Valley",
        events: [
          { year: "4400 BC", event: "Neolithic habitation in the Mandel Valley" },
          { year: "ca. 650", event: "Christianization by Saint Tillo" },
          { year: "1066", event: "Oldest mention of Izegem ('Isinchehem')" },
          { year: "14th c.", event: "Mandel widening, linen market established" },
          { year: "1525", event: "Weekly linen market charter" },
          { year: "1545", event: "Izegem supplies Ghent's linen trade" },
          { year: "1571", event: "Canal project blocked by neighboring cities" },
          { year: "1862-1872", event: "Construction of Roeselare-Leie canal" },
          { year: "1979", event: "Mandel enclosed in pipes in Izegem" }
        ]
      },
      craftLink: "The craftsmanship tradition of the Deforce family is rooted in this rich industrial history of the Mandel Valley."
    },
    fr: {
      title: "La Vallée de la Mandel",
      subtitle: "Artère vitale de la Flandre occidentale centrale",
      intro: "La vallée de la Mandel, avec la rivière Mandel comme axe central, a formé pendant des siècles le cœur battant de l'économie flamande occidentale. Des établissements néolithiques à la prospérité industrielle — cette vallée raconte l'histoire de nos ancêtres.",
      sections: {
        river: {
          title: "La Rivière Mandel",
          content: "La Mandel prend sa source à Passchendaele et parcourt 39,5 kilomètres jusqu'à la Lys à Wakken. Depuis 4400 av. J.-C. — comme en témoignent les découvertes néolithiques — cette rivière a façonné la vie dans la vallée. En 1888-1889, d'importants sites préhistoriques ont été découverts sur la rive droite avec des centaines de pierres de silex taillées. La rivière formait la frontière entre Izegem (rive sud) et Emelgem/Kachtem (rive nord). En 1979, la Mandel a été canalisée à Izegem, mais son importance historique reste intacte.",
          highlight: "Le nom 'Ten Mandere' du cercle historique local fait directement référence à cette rivière."
        },
        linen: {
          title: "L'Industrie du Lin",
          content: "Izegem est devenu le centre commercial dominant de la vallée de la Mandel. En 1525, la ville a reçu une charte pour un marché de lin hebdomadaire. Vers 1545-1546, Izegem était le principal centre d'approvisionnement pour le commerce de transit du lin de Gand vers Anvers. Les célèbres 'Yseghemsche blaeukens' — lin teint en bleu — étaient expédiés en Espagne et en Angleterre.",
          highlight: "Quatre blanchisseries le long de la Pastoriebeek traitaient le lin avec l'eau pure de la Mandel."
        },
        mills: {
          title: "Moulins à Eau & Blanchisseries",
          content: "Le réseau de cours d'eau — la Mandel, Pastoriebeek, Lokbeek et Kasteelbeek — a rendu Izegem idéal pour l'industrie liée à l'eau. Les blanchisseries le long de la Pastoriebeek étaient essentielles pour le blanchiment et la teinture du lin. La rivière alimentait les moulins et lavait les textiles.",
          highlight: "Le 'rouissage' du lin — le trempage dans l'eau pour libérer les fibres — avait lieu dans les ruisseaux de la vallée de la Mandel."
        },
        industry: {
          title: "L'Axe Industriel de la Mandel",
          content: "La construction du canal Roulers-Lys (1862-1872) a transformé la vallée de la Mandel en un axe industriel. L'industrie textile s'est mécanisée : en 1839, P. Parmentier fut le premier à utiliser du fil filé mécaniquement ; en 1864, il a lancé le premier tissage entièrement mécanique à Emelgem.",
          highlight: "À la fin du XIXe siècle, environ 2000 ouvriers travaillaient dans le secteur de la chaussure à Izegem — un quart de la production belge totale."
        },
        decline: {
          title: "Déclin & Changement",
          content: "La Mandel a commencé à s'ensabler au XVIe siècle, ce qui, avec les réformes fiscales du duc d'Albe et la guerre de Quatre-Vingts Ans (1568-1648), a conduit au déclin du commerce du lin. De nombreux tisserands ont émigré vers Bruges et Courtrai.",
          highlight: "La halle au lin a été détruite par des bandes de pillards en 1589 et n'a jamais été restaurée."
        }
      },
      timeline: {
        title: "Jalons dans la Vallée de la Mandel",
        events: [
          { year: "4400 av. J.-C.", event: "Habitat néolithique dans la vallée de la Mandel" },
          { year: "vers 650", event: "Christianisation par Saint Tillo" },
          { year: "1066", event: "Plus ancienne mention d'Izegem ('Isinchehem')" },
          { year: "XIVe s.", event: "Élargissement de la Mandel, marché du lin établi" },
          { year: "1525", event: "Charte du marché du lin hebdomadaire" },
          { year: "1545", event: "Izegem approvisionne le commerce du lin de Gand" },
          { year: "1571", event: "Projet de canal bloqué par les villes voisines" },
          { year: "1862-1872", event: "Construction du canal Roulers-Lys" },
          { year: "1979", event: "Mandel canalisée à Izegem" }
        ]
      },
      craftLink: "La tradition artisanale de la famille Deforce est enracinée dans cette riche histoire industrielle de la vallée de la Mandel."
    },
    de: {
      title: "Das Mandeltal",
      subtitle: "Lebensader von Mittel-Westflandern",
      intro: "Das Mandeltal, mit dem Fluss Mandel als zentraler Achse, bildete jahrhundertelang das pulsierende Herz der westflämischen Wirtschaft. Von neolithischen Siedlungen bis zur industriellen Blüte — dieses Tal erzählt die Geschichte unserer Vorfahren.",
      sections: {
        river: {
          title: "Der Fluss Mandel",
          content: "Die Mandel entspringt in Passendale und fließt 39,5 Kilometer zur Leie bei Wakken. Seit 4400 v. Chr. — wie neolithische Funde belegen — hat dieser Fluss das Leben im Tal geprägt. 1888-1889 wurden am rechten Ufer wichtige prähistorische Stätten mit Hunderten von bearbeiteten Feuersteinen entdeckt. Der Fluss bildete die Grenze zwischen Izegem (Südufer) und Emelgem/Kachtem (Nordufer). 1979 wurde die Mandel in Izegem verrohrt, aber ihre historische Bedeutung bleibt ungemindert.",
          highlight: "Der Name 'Ten Mandere' des Heimatvereins bezieht sich direkt auf diesen Fluss."
        },
        linen: {
          title: "Die Leinenindustrie",
          content: "Izegem wuchs zum dominierenden Handelszentrum des Mandeltals heran. 1525 erhielt die Stadt eine Charta für einen wöchentlichen Leinenmarkt. Um 1545-1546 war Izegem das Hauptversorgungszentrum für den Genter Leinentransithandel nach Antwerpen. Die berühmten 'Yseghemsche blaeukens' — blau gefärbtes Leinen — wurden nach Spanien und England verschifft.",
          highlight: "Vier Bleichereien entlang der Pastoriebeek verarbeiteten Leinen mit dem reinen Wasser der Mandel."
        },
        mills: {
          title: "Wassermühlen & Bleichereien",
          content: "Das Netz von Wasserläufen — die Mandel, Pastoriebeek, Lokbeek und Kasteelbeek — machte Izegem ideal für wassergebundene Industrie. Die Bleichereien entlang der Pastoriebeek waren wesentlich für das Bleichen und Färben von Leinen. Der Fluss trieb Mühlen an und wusch Textilien.",
          highlight: "Das 'Rösten' von Flachs — das Einweichen in Wasser zum Lösen der Fasern — fand in den Bächen des Mandeltals statt."
        },
        industry: {
          title: "Industrielle Mandelachse",
          content: "Der Bau des Kanals Roeselare-Leie (1862-1872) verwandelte das Mandeltal in eine industrielle Achse. Die Textilindustrie mechanisierte sich: 1839 war P. Parmentier der erste, der maschinell gesponnenes Garn verwendete; 1864 startete er die erste vollständig mechanische Weberei in Emelgem.",
          highlight: "Ende des 19. Jahrhunderts arbeiteten etwa 2000 Arbeiter in Izegems Schuhsektor — ein Viertel der gesamten belgischen Produktion."
        },
        decline: {
          title: "Niedergang & Wandel",
          content: "Die Mandel begann im 16. Jahrhundert zu versanden, was zusammen mit den fiskalischen Reformen des Herzogs von Alba und dem Achtzigjährigen Krieg (1568-1648) zum Niedergang des Leinenhandels führte. Viele Weber emigrierten nach Brügge und Kortrijk.",
          highlight: "Die Leinenhalle wurde 1589 von plündernden Banden zerstört und nie wieder aufgebaut."
        }
      },
      timeline: {
        title: "Meilensteine im Mandeltal",
        events: [
          { year: "4400 v. Chr.", event: "Neolithische Besiedlung im Mandeltal" },
          { year: "um 650", event: "Christianisierung durch den Heiligen Tillo" },
          { year: "1066", event: "Älteste Erwähnung von Izegem ('Isinchehem')" },
          { year: "14. Jh.", event: "Verbreiterung der Mandel, Leinenmarkt etabliert" },
          { year: "1525", event: "Charta für wöchentlichen Leinenmarkt" },
          { year: "1545", event: "Izegem beliefert Genter Leinenhandel" },
          { year: "1571", event: "Kanalprojekt von Nachbarstädten blockiert" },
          { year: "1862-1872", event: "Bau des Kanals Roeselare-Leie" },
          { year: "1979", event: "Mandel in Izegem verrohrt" }
        ]
      },
      craftLink: "Die Handwerkstradition der Familie Deforce wurzelt in dieser reichen Industriegeschichte des Mandeltals."
    },
    es: {
      title: "El Valle del Mandel",
      subtitle: "Arteria vital de Flandes Occidental Central",
      intro: "El Valle del Mandel, con el río Mandel como eje central, formó durante siglos el corazón palpitante de la economía flamenca occidental. Desde asentamientos neolíticos hasta la prosperidad industrial — este valle cuenta la historia de nuestros antepasados.",
      sections: {
        river: {
          title: "El Río Mandel",
          content: "El Mandel nace en Passendale y fluye 39,5 kilómetros hasta el Leie en Wakken. Desde el 4400 a.C. — como evidencian los hallazgos neolíticos — este río ha moldeado la vida en el valle. En 1888-1889, se descubrieron importantes sitios prehistóricos en la orilla derecha con cientos de piedras de sílex trabajadas. El río formaba la frontera entre Izegem (orilla sur) y Emelgem/Kachtem (orilla norte). En 1979, el Mandel fue canalizado en Izegem, pero su importancia histórica sigue intacta.",
          highlight: "El nombre 'Ten Mandere' del círculo histórico local se refiere directamente a este río."
        },
        linen: {
          title: "La Industria del Lino",
          content: "Izegem se convirtió en el centro comercial dominante del Valle del Mandel. En 1525, la ciudad recibió una carta para un mercado semanal de lino. Alrededor de 1545-1546, Izegem era el principal centro de suministro para el comercio de tránsito de lino de Gante hacia Amberes. Los famosos 'Yseghemsche blaeukens' — lino teñido de azul — se enviaban a España e Inglaterra.",
          highlight: "Cuatro blanquerías a lo largo del Pastoriebeek procesaban el lino con el agua pura del Mandel."
        },
        mills: {
          title: "Molinos de Agua y Blanquerías",
          content: "La red de cursos de agua — el Mandel, Pastoriebeek, Lokbeek y Kasteelbeek — hizo de Izegem un lugar ideal para la industria basada en el agua. Las blanquerías a lo largo del Pastoriebeek eran esenciales para el blanqueo y teñido del lino. El río alimentaba los molinos y lavaba los textiles.",
          highlight: "El 'enriado' del lino — remojarlo en agua para liberar las fibras — tenía lugar en los arroyos del Valle del Mandel."
        },
        industry: {
          title: "El Eje Industrial del Mandel",
          content: "La construcción del canal Roeselare-Leie (1862-1872) transformó el Valle del Mandel en un eje industrial. La industria textil se mecanizó: en 1839, P. Parmentier fue el primero en usar hilo hilado mecánicamente; en 1864, inició la primera tejeduría completamente mecánica en Emelgem.",
          highlight: "A finales del siglo XIX, unos 2000 trabajadores estaban empleados en el sector del calzado de Izegem — un cuarto de la producción total belga."
        },
        decline: {
          title: "Declive y Cambio",
          content: "El Mandel comenzó a enlodar en el siglo XVI, lo que junto con las reformas fiscales del Duque de Alba y la Guerra de los Ochenta Años (1568-1648) llevó al declive del comercio del lino. Muchos tejedores emigraron a Brujas y Kortrijk.",
          highlight: "La lonja del lino fue destruida por bandas saqueadoras en 1589 y nunca fue restaurada."
        }
      },
      timeline: {
        title: "Hitos en el Valle del Mandel",
        events: [
          { year: "4400 a.C.", event: "Habitación neolítica en el Valle del Mandel" },
          { year: "ca. 650", event: "Cristianización por San Tillo" },
          { year: "1066", event: "Mención más antigua de Izegem ('Isinchehem')" },
          { year: "s. XIV", event: "Ensanchamiento del Mandel, mercado de lino establecido" },
          { year: "1525", event: "Carta del mercado semanal de lino" },
          { year: "1545", event: "Izegem abastece el comercio de lino de Gante" },
          { year: "1571", event: "Proyecto de canal bloqueado por ciudades vecinas" },
          { year: "1862-1872", event: "Construcción del canal Roeselare-Leie" },
          { year: "1979", event: "Mandel canalizado en Izegem" }
        ]
      },
      craftLink: "La tradición artesanal de la familia Deforce está arraigada en esta rica historia industrial del Valle del Mandel."
    },
    vls: {
      title: "De Mandelvallei",
      subtitle: "Levensader van Midden-West-Vloandern",
      intro: "De Mandelvallei, mee de rivier de Mandel als centroale as, was eeuwenlangt het kloppend herte van de West-Vlamsche economie. Van neolithische nederzettingen toe industriële bloei — dezen vallei vertelt t verhaal van uuze voorouders.",
      sections: {
        river: {
          title: "De Rivier de Mandel",
          content: "De Mandel ontspringt in Passendale en stroomt 39,5 kilometer noar de Leie bie Wakken. Al van 4.400 voe Christus — zoas blikt uut neolithische vondsten — bepaolde dezen rivier t leven in de vallei. In 1888-1889 wieren op de rechteroever belangrike prehistorische sites ontdekt mee honderden bewerkte silexsteenen. De rivier vormde de grenze tussen Izegem (zuudoever) en Emelgem/Kachtem (noordoever). In 1979 wier de Mandel in Izegem ingekokerd, mo hoar historische betekenisse bluuft onverminderd groat.",
          highlight: "De noam 'Ten Mandere' van de heemkundige kringe verwijst rechtstreeks noar dezen rivier."
        },
        linen: {
          title: "De Linnenijverheid",
          content: "Izegem groeide uut toe het dominerende handelscentrum van de Mandelvallei. In 1525 kreeg de stad e octrooi voe e wekelikse lijnwaadmarkt. Rond 1545-1546 was Izegem het voornaamste bevoorradingscentrum voe de Gentsche linnentransitohandel noar Antwerpen. De beroemde 'Yseghemsche blaeukens' — blauw geverfd linnen — wieren verskeept noar Spanje en Engeland.",
          highlight: "Viere blekerijen an de Pastoriebeek verwerkten het linnen mee het zuver water uut de Mandel."
        },
        mills: {
          title: "Watermolens & Blekerijen",
          content: "Het netwerk van waterloopen — de Mandel, Pastoriebeek, Lokbeek en Kasteelbeek — moakte Izegem ideaal voe watergebonden nijverheid. De blekerijen langs de Pastoriebeek woaren essentieel voe het bleken en verven van linnen. De rivier zorgde voe de aandrijvinge van molens en het wassen van textiel.",
          highlight: "Het 'roten' van vlas — het weken in water om de vezels los te moaken — gebeurde in de beken van de Mandelvallei."
        },
        industry: {
          title: "Industriële Mandelas",
          content: "De aanleg van het kanoal Roeselare-Leie (1862-1872) transformeerde de Mandelvallei toe een industriële as. De textielnijverheid mechaniseerde: in 1839 begost P. Parmentier als ierste mee mechanisch gesponnen garen, in 1864 startte hij de ierste volledig mechanische weverij in Emelgem.",
          highlight: "Einde 19de eeuw werkten circa 2000 arbeiders in de Izegemsche schoensector — e kwart van de totale Belgische productie."
        },
        decline: {
          title: "Neergang & Veranderinge",
          content: "De Mandel begost in de 16de eeuw te verzanden, wat soamen mee de fiscale hervormingen van den hertog van Alva en de Tachtigjarigen Oorlog (1568-1648) leidde toe de neergang van de linnenhandel. Vele wevers emigreerden noar Brugge en Kortrijk.",
          highlight: "De linnenhal wier in 1589 deur plunderende benden verwoest en nooit mee hersteld."
        }
      },
      timeline: {
        title: "Mijlpoalen in de Mandelvallei",
        events: [
          { year: "4400 v.Chr.", event: "Neolithische bewoninge in de Mandelvallei" },
          { year: "ca. 650", event: "Christianisatie deur Sint-Tillo" },
          { year: "1066", event: "Oudste vermeldinge van Izegem ('Isinchehem')" },
          { year: "14de eeuw", event: "Verbredinge Mandel, oprichtinge lijnwaadmarkt" },
          { year: "1525", event: "Octrooi wekelikse linnenmarkt" },
          { year: "1545", event: "Izegem bevoorraadt Gentsche linnenhandel" },
          { year: "1571", event: "Kanoalproject verhinderd deur naburige steden" },
          { year: "1862-1872", event: "Aanleg kanoal Roeselare-Leie" },
          { year: "1979", event: "Mandel ingekokerd in Izegem" }
        ]
      },
      craftLink: "De vakmanschapstraditie van de familie Deforce wortelt in dezen rike industriële geschiedenisse van de Mandelvallei."
    },
    pcd: {
      title: "La Vallée d'la Mandel",
      subtitle: "Artére vitale du centre del Flandre occidentale",
      intro: "La vallée d'la Mandel, aveuc la riviére Mandel comme axe cintral, a formé pendant des siécles el cœur battant d'l'économie flamande occidentale. Des établissemints néolithiques à la prospérité industrielle — chte vallée raconte l'histoère ed nos anciêtres.",
      sections: {
        river: {
          title: "La Riviére Mandel",
          content: "La Mandel prind s'source à Passchendaele et parcourt 39,5 kilométres jusqu'à la Lys à Wakken. Deupuis 4400 avant J.-C. — comme in témoignent les découvertes néolithiques — chte riviére a façonné la vie dins la vallée. In 1888-1889, d'importants sites préhistoriques ont té découverts sus la rive droète aveuc des cintaines ed piérres ed silex taillées.",
          highlight: "L'nom 'Ten Mandere' du cercle historiqu local fait directemint référince à chte riviére."
        },
        linen: {
          title: "L'Industrie du Lin",
          content: "Izegem est devenu l'cintro commercial dominant d'la vallée d'la Mandel. In 1525, la ville a reçu eune charte pour in marché d'lin hebdomadaire. Vers 1545-1546, Izegem étot l'principal cintro d'approvisionnemint pour l'commerce ed transit du lin d'Gand vers Anvers.",
          highlight: "Quate blanchisseries l'long d'la Pastoriebeek traitotent l'lin aveuc l'iau pure d'la Mandel."
        },
        mills: {
          title: "Moulins à Iau & Blanchisseries",
          content: "L'réseau d'cours d'iau — la Mandel, Pastoriebeek, Lokbeek et Kasteelbeek — a rindu Izegem idéal pour l'industrie liée à l'iau. Les blanchisseries l'long d'la Pastoriebeek étotent essentielles pour l'blanchimint et la teinture du lin.",
          highlight: "L'rouissage du lin — l'trempage dins l'iau pour libérer les fibres — avot lieu dins les ruissiaux d'la vallée d'la Mandel."
        },
        industry: {
          title: "L'Axe Industriel d'la Mandel",
          content: "La construction du canal Roulers-Lys (1862-1872) a transformé la vallée d'la Mandel in in axe industriel. L'industrie textile s'est mécanisée : in 1839, P. Parmentier fut l'premier à utiliser du fil filé mécaniqu'mint.",
          highlight: "À la fin du XIXe siécle, environ 2000 ouvriers travaillotent dins l'secteur d'la chaussure à Izegem — in quart d'la production belge totale."
        },
        decline: {
          title: "Déclin & Changemint",
          content: "La Mandel a commincé à s'insabler au XVIe siécle, che qui, aveuc les réformes fiscales du duc d'Albe et la guerre ed Quatre-Vingts Ans (1568-1648), a conduit au déclin du commerce du lin.",
          highlight: "La halle au lin a té détruite par des bandes ed pillards in 1589 et n'a jamais té restaurée."
        }
      },
      timeline: {
        title: "Jalons dins la Vallée d'la Mandel",
        events: [
          { year: "4400 av. J.-C.", event: "Habitat néolithique dins la vallée d'la Mandel" },
          { year: "vers 650", event: "Christianisation par Saint Tillo" },
          { year: "1066", event: "Pus ancienne mintion d'Izegem ('Isinchehem')" },
          { year: "XIVe s.", event: "Élargissemint d'la Mandel, marché du lin établi" },
          { year: "1525", event: "Charte du marché du lin hebdomadaire" },
          { year: "1545", event: "Izegem approvisionne l'commerce du lin d'Gand" },
          { year: "1571", event: "Projet ed canal bloqué par les villes voisines" },
          { year: "1862-1872", event: "Construction du canal Roulers-Lys" },
          { year: "1979", event: "Mandel canalisée à Izegem" }
        ]
      },
      craftLink: "La tradition artisanale d'la famille Deforce est inracinée dins chte riche histoère industrielle d'la vallée d'la Mandel."
    }
  };

  const t = content[language as keyof typeof content] || content.nl;

  const sectionIcons = {
    river: <Waves className="h-5 w-5 text-primary" />,
    linen: <Shirt className="h-5 w-5 text-primary" />,
    mills: <Droplets className="h-5 w-5 text-primary" />,
    industry: <Factory className="h-5 w-5 text-primary" />,
    decline: <History className="h-5 w-5 text-primary" />
  };

  return (
    <section id="mandelvallei" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Waves className="h-8 w-8 text-primary" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              {t.title}
            </h2>
          </div>
          <p className="text-xl text-primary font-medium mb-4">{t.subtitle}</p>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t.intro}
          </p>
        </div>

        {/* Main Content - Accordion */}
        <div className="max-w-4xl mx-auto mb-12">
          <Accordion type="single" collapsible className="space-y-4">
            {Object.entries(t.sections).map(([key, section]) => (
              <AccordionItem 
                key={key} 
                value={key}
                className="bg-card border border-border rounded-lg px-6 data-[state=open]:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3">
                    {sectionIcons[key as keyof typeof sectionIcons]}
                    <span className="font-heading text-lg font-semibold text-foreground text-left">
                      {section.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {section.content}
                    </p>
                    <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-r-lg">
                      <p className="text-sm text-foreground italic">
                        💡 {section.highlight}
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Timeline */}
        <Card className="max-w-4xl mx-auto mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Cog className="h-5 w-5 text-primary" />
              {t.timeline.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[100px] md:left-[120px] top-0 bottom-0 w-0.5 bg-border" />
              
              <div className="space-y-4">
                {t.timeline.events.map((event, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-[80px] md:w-[100px] text-right flex-shrink-0">
                      <span className="text-sm font-mono font-bold text-primary">
                        {event.year}
                      </span>
                    </div>
                    <div className="relative">
                      <div className="absolute left-[16px] md:left-[16px] top-2 w-3 h-3 rounded-full bg-primary border-2 border-background" />
                    </div>
                    <div className="pl-8 pb-2">
                      <p className="text-muted-foreground text-sm">
                        {event.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Link to Craftsmanship */}
        <div className="max-w-3xl mx-auto text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="py-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <MapPin className="h-5 w-5 text-primary" />
                <Cog className="h-5 w-5 text-primary" />
              </div>
              <p className="text-foreground font-medium">
                {t.craftLink}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Mandelvallei;