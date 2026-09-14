import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn, Maximize2, Minimize2, ExternalLink, Map, BookOpen } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGame } from "@/contexts/GameContext";
import AiLabel from "@/components/ui/AiLabel";

import charlesLouis from "@/assets/charles-louis-portrait.jpg";
import doodsprentje from "@/assets/doodsprentje-charles.jpg";
import familyPortrait from "@/assets/family-portrait.jpg";
import houtsnijders1908 from "@/assets/houtsnijders-1908.jpg";
import houtsnijdersGroep from "@/assets/houtsnijders-groep.jpg";
import izegem1643 from "@/assets/izegem-1643.jpg";
import mapLilleRegion from "@/assets/map-lille-region.jpg";
import meubelatelier1880 from "@/assets/meubelatelier-1880.jpg";
import oudeKerk from "@/assets/oude-kerk.jpg";
import reunion1962 from "@/assets/reunion-1962.jpg";
import reunion2024 from "@/assets/reunion-2024-new.jpg";
import slagWestrozebeke from "@/assets/slag-westrozebeke.jpg";
import huwelijkscontract from "@/assets/huwelijkscontract-1685.jpg";

import timmermansatelier from "@/assets/timmermansatelier-18e.jpg";
import tassaertKindersterfte from "@/assets/tassaert-kindersterfte.jpg";
import armeVlaamseFamilie from "@/assets/arme-vlaamse-familie.jpg";
import armeStraatverkopers from "@/assets/arme-straatverkopers.jpg";
import choleraEpidemie from "@/assets/cholera-epidemie.jpg";
import aardappelHongersnood from "@/assets/aardappel-hongersnood.jpg";
import linnencrisis from "@/assets/linnencrisis.jpg";
import bedelaarsHongersnood from "@/assets/bedelaars-hongersnood.jpg";
import kaartEmelgem1880 from "@/assets/kaart-emelgem-1880.jpg";

// Nieuwe imports voor ontbrekende foto's
import boquillonForest from "@/assets/boquillon-forest.jpg";
import dagloner18eEeuw from "@/assets/dagloner-18e-eeuw.jpg";
import ferrarisIzegem1777 from "@/assets/ferraris-izegem-1777.jpg";
import meubelmakerij from "@/assets/meubelmakerij-belle-epoque.jpg";
import migratieReis from "@/assets/migratie-reis-1699.jpg";
import oorlogFransDuits from "@/assets/oorlog-frans-duits.jpg";
import oorlogLodewijk from "@/assets/oorlog-lodewijk-xiv.jpg";
import oorlogWO1 from "@/assets/oorlog-wo1-ijzer.jpg";
import pasfoto1 from "@/assets/pasfoto-1.jpg";
import schrijnwerkersatelier from "@/assets/schrijnwerkersatelier-19e.jpg";
import pachthoeve1680 from "@/assets/pachthoeve-1680.jpg";

// Nieuwe AI-gegenereerde illustraties uit Stamouders sectie
import boerenhuisInterieur from "@/assets/vlaams-boerenhuis-interieur-1685.jpg";
import vlaamseMarkt from "@/assets/vlaamse-markt-1685.jpg";
import vlaamseMaaltijd from "@/assets/vlaamse-maaltijd-1685.jpg";
import dorpspleinZondagsmis from "@/assets/dorpsplein-zondagsmis-1685.jpg";
import kerkMis from "@/assets/kerk-mis-1685.jpg";
import schoolVerfransing from "@/assets/school-verfransing-1850.jpg";
import standenmaatschappij from "@/assets/standenmaatschappij-1685.jpg";
import lodewijkXivLeger from "@/assets/lodewijk-xiv-leger-1685.jpg";
import mineurGenie from "@/assets/mineur-genie-1880.jpg";
import huwelijksceremonieNotaris from "@/assets/huwelijksceremonie-notaris-1685.jpg";
import bestormingBastille from "@/assets/bestorming-bastille-1789.jpg";

// Marcel Biografie foto's
import loekiHond from "@/assets/loeki-hond.jpg";
import marcelSoldaat from "@/assets/marcel-soldaat.jpg";
import juwelenkistje from "@/assets/juwelenkistje.jpg";

import mobilisatieZakboekjeBinnen from "@/assets/mobilisatie-zakboekje-binnen.jpg";
import mobilisatieZakboekje2 from "@/assets/mobilisatie-zakboekje-2.jpg";
import fotoDochtertje1919 from "@/assets/foto-dochtertje-1919.jpg";
import reclamestandVakmanschap from "@/assets/reclamestand-vakmanschap.jpg";
import portretkader1915 from "@/assets/marcel-portretkader-1915.jpg";

// Emile Geldof foto's
import emilePortrait from "@/assets/emile-geldof-portrait.png";
import gezinEmileGeldof from "@/assets/gezin-emile-geldof.jpg";
import familieGeldofNonnen from "@/assets/familie-geldof-nonnen.jpg";
import huwelijksakteGeldof from "@/assets/huwelijksakte-geldof-1893.png";

// Grootouders foto's
import portretMagdalena from "@/assets/portret-magdalena-geldof.jpg";
import portretMarcel from "@/assets/portret-marcel-deforce.jpg";
import interieurPeterMeter from "@/assets/interieur-peter-meter.png";
import peterMeterPortret from "@/assets/peter-meter-portret.png";
import peterMeterPortretColor from "@/assets/peter-meter-portret-color.jpg";
import blauweOpelColor from "@/assets/blauwe-opel-1950-color.jpg";
import stamboomMarcel from "@/assets/stamboom-marcel.jpg";

// Nieuwe foto's uit de Vandenbogaerdelaan periode
import mariaGeorges1923 from "@/assets/maria-georges-1923-color.jpg";
import joorisDeforce1925 from "@/assets/jooris-deforce-1925-color.jpg";
import oudHuisVdb1927 from "@/assets/oud-huis-vdb-1927-color.jpg";

// Marcel Biografie Vervolg foto's
import atelier1942 from "@/assets/atelier-1942.jpg";
import madeleineRodeKruis from "@/assets/madeleine-rode-kruis.jpg";
import gezinZilverenJubileum from "@/assets/gezin-zilveren-jubileum-1943.jpg";
import nieuwHuisVdb from "@/assets/nieuw-huis-vdb.jpg";
import bouwplanVerbouwing from "@/assets/bouwplan-verbouwing.jpg";
import nieuweVoorgevel1946 from "@/assets/nieuwe-voorgevel-1946.jpg";
import huwelijksfotoTrap from "@/assets/huwelijksfoto-trap.jpg";
import briefhoofdMarcel from "@/assets/briefhoofd-marcel-deforce.jpg";
import gezinsbondArtikel from "@/assets/gezinsbond-krantenartikel.jpg";
import catalogusCreations from "@/assets/catalogus-creations-mobilier.jpg";
import meublesModernesBoek from "@/assets/meubles-modernes-boek.jpg";
import meublesModernesParisiens from "@/assets/meubles-modernes-parisiens.jpg";
import attestOnmisbareZoon from "@/assets/attest-onmisbare-zoon.jpg";
import stamboomMagdalena from "@/assets/stamboom-magdalena-geldof.jpg";
import drieZusjes from "@/assets/drie-zusjes-1950-color.jpg";
import gezinsfoto1943 from "@/assets/gezinsfoto-1943.jpg";

// Ontbrekende foto's - portretten & familie
import berenice from "@/assets/berenice-deforce.jpg";
import bereniceBureau from "@/assets/berenice-bureau-1954-color.jpg";
import bereniceKever from "@/assets/berenice-met-kever-color.jpg";
import eugenieBoucke from "@/assets/eugenie-boucke.jpg";
import mauriceDeleforge from "@/assets/maurice-deleforge-portrait.png";
import laatsteFotoMadeleine from "@/assets/laatste-foto-madeleine.jpg";
import huldigingMoeders from "@/assets/huldiging-moeders-1960.jpg";
import huwelijksfotoOrigineel from "@/assets/huwelijksfoto-origineel-1945.jpg";
import huwelijksfotoAiBewerkt from "@/assets/huwelijksfoto-ai-bewerkt.png";
import marcelOpgebaard from "@/assets/marcel-opgebaard-1963.jpg";
import rouwkapelMarcel from "@/assets/rouwkapel-marcel-1963.jpg";
import begrafenisZonen from "@/assets/begrafenis-zonen-1963.jpg";

// Ontbrekende foto's - documenten
import doopakteAliceBoucke from "@/assets/doopakte-alice-boucke-1892.jpg";
import doopakteCyprianusRoose from "@/assets/doopakte-cyprianus-roose-1752.png";

import trouwboekje from "@/assets/trouwboekje-marcel-magdalena.jpg";
import telegramHuwelijk from "@/assets/telegram-huwelijk-1945.jpg";
import huwelijksgedichtP1 from "@/assets/huwelijksgedicht-1945-p1.jpg";
import verslagboekCover from "@/assets/verslagboek-pvba-cover.jpg";
import verslagboekJaarverslag from "@/assets/verslagboek-pvba-jaarverslag.jpg";
import stamboomMaurice from "@/assets/stamboom-maurice-deleforge.jpg";
import dnaMyheritageKit from "@/assets/dna-myheritage-kit.jpg";

// Ontbrekende foto's - locaties
import bevrijdingTank from "@/assets/bevrijding-tank-izegem-1944.jpg";
import werkhuizenstraatColor from "@/assets/werkhuizenstraat-gebouwen-color.jpg";
import stadhuisIzegem from "@/assets/stadhuis-izegem.jpg";

import chatellenieLille from "@/assets/chatellenie-lille-1680.jpg";
import marktLille from "@/assets/markt-lille-1680.jpg";

// Ontbrekende foto's - beroep/vakmanschap
import dfMeubellabel from "@/assets/df-meubellabel.jpg";
import meubelbeurs from "@/assets/meubelbeurs-kleinmeubelen-color.jpg";
import salonMeubleParis from "@/assets/salon-meuble-paris-color.jpg";
import portretkaderDetail1 from "@/assets/portretkader-detail-1.jpg";
import portretkaderGrootmoeder from "@/assets/portretkader-grootmoeder.jpg";
import portretkaderVerschaeve from "@/assets/portretkader-verschaeve.jpg";


// Ontbrekende foto's - brand
import brandKrant from "@/assets/brand-krant-standaard.jpg";
import brandSchade1 from "@/assets/brand-schade-1.jpg";
import brandSchade2 from "@/assets/brand-schade-2.jpg";
import brandSchade3 from "@/assets/brand-schade-3.jpg";

// Ontbrekende kaarten
import izegemKaart1850 from "@/assets/izegem-kaart-1850.jpg";
import izegemKaart1910 from "@/assets/izegem-kaart-1910.jpg";
import izegemKaart2024 from "@/assets/izegem-kaart-2024.jpg";
import kaartFransVlaanderen from "@/assets/kaart-frans-vlaanderen.jpg";
import kaartVlaanderen1700 from "@/assets/kaart-vlaanderen-1700.jpg";
import oudeKaartVlaanderen from "@/assets/oude-kaart-vlaanderen.jpg";
import migratieKaart from "@/assets/migratie-kaart-frans-vlaanderen.jpg";

// Ontbrekende DNA-afbeeldingen
import dnaEtniciteitsKaart from "@/assets/dna-etniciteit-kaart.jpg";
import dnaEtniciteitsLijst from "@/assets/dna-etniciteit-lijst.jpg";

import dnaMatches from "@/assets/dna-matches.png";
import dnaGeldofMatch from "@/assets/dna-geldof-match.png";
import dnaDeleforgeBoek from "@/assets/dna-deleforge-boek.jpg";

// Ontbrekende AI-voorbeelden

import aiFotoVoorbeeld2 from "@/assets/ai-foto-voorbeeld-2.jpg";

// Overige ontbrekende
import antoonVandrommeColor from "@/assets/antoon-vandromme-color.jpg";
import huwelijksgedichtP2 from "@/assets/huwelijksgedicht-1945-p2.jpg";
import ieeRapport from "@/assets/iee-rapport-pagina.jpg";
import stadhuisIzegemErfgoed from "@/assets/stadhuis-izegem-erfgoed.jpg";
import stadhuisIzegemGevel from "@/assets/stadhuis-izegem-gevel.jpg";
import kaartDeforceBelgie from "@/assets/kaart-deforce-belgie.png";
import kaartDeforceFrankrijk from "@/assets/kaart-deforce-frankrijk.png";
import kaartDeleforgeFrankrijk from "@/assets/kaart-deleforge-frankrijk.png";
import huwelijkscontractPagina1 from "@/assets/huwelijkscontract-1685-pagina-1.jpg";

interface Photo {
  id: number;
  src: string;
  titleNL: string;
  titleFR: string;
  titleEN?: string;
  titleES?: string;
  titleDE?: string;
  titleSV?: string;
  descriptionNL: string;
  descriptionFR: string;
  descriptionEN?: string;
  descriptionES?: string;
  descriptionDE?: string;
  descriptionSV?: string;
  year?: string;
  category: "portret" | "document" | "locatie" | "beroep" | "familie" | "historisch" | "ai-generated";
  isExternal?: boolean;
  isAiGenerated?: boolean;
}

const photos: Photo[] = [
  {
    id: 1,
    src: charlesLouis,
    titleNL: "Charles Louis Deforce",
    titleFR: "Charles Louis Deforce",
    titleEN: "Charles Louis Deforce",
    titleES: "Charles Louis Deforce",
    titleDE: "Charles Louis Deforce",
    titleSV: "Charles Louis Deforce",
    descriptionNL: "Portretfoto van overgrootvader Charles Louis Deforce (1857-1938). Hij was meubelmaker van beroep en trouwde driemaal. Met zijn eerste echtgenote Marie Leonie Vandenbroucke kreeg hij acht kinderen, waarvan er slechts drie de volwassenheid bereikten.",
    descriptionFR: "Portrait de l'arrière-grand-père Charles Louis Deforce (1857-1938). Il était ébéniste de métier et s'est marié trois fois. Avec sa première épouse Marie Leonie Vandenbroucke, il a eu huit enfants, dont seulement trois ont atteint l'âge adulte.",
    descriptionEN: "Portrait photo of great-grandfather Charles Louis Deforce (1857-1938). He was a cabinetmaker by profession and married three times. With his first wife Marie Leonie Vandenbroucke, he had eight children, of which only three reached adulthood.",
    descriptionES: "Foto retrato del bisabuelo Charles Louis Deforce (1857-1938). Era ebanista de profesión y se casó tres veces. Con su primera esposa Marie Leonie Vandenbroucke tuvo ocho hijos, de los cuales solo tres llegaron a la edad adulta.",
    descriptionDE: "Porträtfoto des Urgroßvaters Charles Louis Deforce (1857-1938). Er war Möbelschreiner von Beruf und heiratete dreimal. Mit seiner ersten Ehefrau Marie Leonie Vandenbroucke hatte er acht Kinder, von denen nur drei das Erwachsenenalter erreichten.",
    descriptionSV: "Porträttfoto av farfars far Charles Louis Deforce (1857-1938). Han var möbelsnickare till yrket och gifte sig tre gånger. Med sin första hustru Marie Leonie Vandenbroucke fick han åtta barn, varav endast tre nådde vuxen ålder.",
    year: "ca. 1900",
    category: "portret"
  },
  {
    id: 2,
    src: doodsprentje,
    titleNL: "Doodsprentje Charles Louis Deforce",
    titleFR: "Faire-part de décès de Charles Louis Deforce",
    titleEN: "Death Card of Charles Louis Deforce",
    titleES: "Estampa Mortuoria de Charles Louis Deforce",
    titleDE: "Sterbebildchen von Charles Louis Deforce",
    titleSV: "Dödskort av Charles Louis Deforce",
    descriptionNL: "Het bidprentje bij het overlijden van Charles Louis Deforce op 6 maart 1938. Met de tekst: \"Hij was een man die in den eenvoud des wereld heeft gewandeld. Hij begeerde geen glorie dezer wereld, maar in stilte zijn plicht te vervullen tegenover God en de mensen.\"",
    descriptionFR: "Le faire-part de décès de Charles Louis Deforce le 6 mars 1938. Avec le texte : \"Il était un homme qui a marché dans la simplicité du monde. Il ne désirait pas la gloire de ce monde, mais d'accomplir en silence son devoir envers Dieu et les hommes.\"",
    descriptionEN: "The prayer card at the death of Charles Louis Deforce on March 6, 1938. With the text: \"He was a man who walked in the simplicity of the world. He desired not the glory of this world, but to silently fulfill his duty to God and men.\"",
    descriptionES: "La estampa mortuoria en el fallecimiento de Charles Louis Deforce el 6 de marzo de 1938. Con el texto: \"Era un hombre que caminó en la sencillez del mundo. No deseaba la gloria de este mundo, sino cumplir en silencio su deber hacia Dios y los hombres.\"",
    descriptionDE: "Das Sterbebildchen beim Tod von Charles Louis Deforce am 6. März 1938. Mit dem Text: \"Er war ein Mann, der in Einfachheit durch die Welt ging. Er strebte nicht nach dem Ruhm dieser Welt, sondern danach, still seine Pflicht gegenüber Gott und den Menschen zu erfüllen.\"",
    descriptionSV: "Bönekortet vid Charles Louis Deforces död den 6 mars 1938. Med texten: \"Han var en man som vandrade i världens enkelhet. Han åtrådde inte denna världs ära, utan att i stillhet uppfylla sin plikt mot Gud och människorna.\"",
    year: "1938",
    category: "document"
  },
  {
    id: 3,
    src: familyPortrait,
    titleNL: "Familieportret",
    titleFR: "Portrait de famille",
    titleEN: "Family Portrait",
    titleES: "Retrato Familiar",
    titleDE: "Familienporträt",
    descriptionNL: "Een historisch familieportret van de familie Deforce. De formele opstelling en kleding zijn typerend voor de fotografie van die tijd.",
    descriptionFR: "Un portrait de famille historique de la famille Deforce. La disposition formelle et les vêtements sont typiques de la photographie de cette époque.",
    descriptionEN: "A historic family portrait of the Deforce family. The formal arrangement and clothing are typical of photography of that time.",
    descriptionES: "Un retrato familiar histórico de la familia Deforce. La disposición formal y la ropa son típicas de la fotografía de esa época.",
    descriptionDE: "Ein historisches Familienporträt der Familie Deforce. Die formelle Anordnung und Kleidung sind typisch für die Fotografie jener Zeit.",
    year: "Begin 20e eeuw",
    category: "familie"
  },
  {
    id: 4,
    src: houtsnijders1908,
    titleNL: "Vereenigde Houtsnijders Iseghem",
    titleFR: "Association des Sculpteurs sur Bois d'Izegem",
    titleEN: "United Woodcarvers of Izegem",
    titleES: "Asociación de Talladores de Madera de Izegem",
    titleDE: "Vereinigte Holzschnitzer von Izegem",
    descriptionNL: "Een vereniging van jonge houtsnijders, vrij formeel georganiseerd met twee priesters erbij. Ze poseren met hun gereedschappen en werkstukken op hun zondags gekleed. Mogelijk het patroonsfeest van St.-Jozef (19 maart).",
    descriptionFR: "Une association de jeunes sculpteurs sur bois, organisée de manière assez formelle avec deux prêtres. Ils posent avec leurs outils et leurs œuvres, habillés en habits du dimanche. Probablement la fête patronale de Saint-Joseph (19 mars).",
    descriptionEN: "An association of young woodcarvers, fairly formally organized with two priests present. They pose with their tools and work pieces dressed in their Sunday best. Possibly the patron saint feast of St. Joseph (March 19).",
    descriptionES: "Una asociación de jóvenes talladores de madera, organizada de manera bastante formal con dos sacerdotes presentes. Posan con sus herramientas y obras vestidos con sus mejores galas. Posiblemente la fiesta patronal de San José (19 de marzo).",
    descriptionDE: "Eine Vereinigung junger Holzschnitzer, recht formell organisiert mit zwei Priestern dabei. Sie posieren mit ihren Werkzeugen und Werkstücken in Sonntagskleidung. Möglicherweise das Patronatsfest des Hl. Josef (19. März).",
    year: "1908",
    category: "beroep"
  },
  {
    id: 5,
    src: houtsnijdersGroep,
    titleNL: "Groep houtbewerkers",
    titleFR: "Groupe de travailleurs du bois",
    titleEN: "Group of Woodworkers",
    titleES: "Grupo de Trabajadores de la Madera",
    titleDE: "Gruppe von Holzarbeitern",
    descriptionNL: "De mannen poseren in werktenue en op klompen — merkwaardig voor die tijd, waar het veeleer de gewoonte was om zich op zijn paasbest te kleden. De foto getuigt van hun beroepstrots als ambachtslui.",
    descriptionFR: "Les hommes posent en tenue de travail et en sabots — remarquable pour l'époque, où il était plutôt coutume de s'habiller de ses plus beaux vêtements. La photo témoigne de leur fierté professionnelle en tant qu'artisans.",
    descriptionEN: "The men pose in work clothes and wooden clogs — remarkable for that time, when it was customary to dress in one's Sunday best. The photo testifies to their professional pride as craftsmen.",
    descriptionES: "Los hombres posan con ropa de trabajo y zuecos de madera — notable para esa época, cuando era costumbre vestirse con las mejores galas. La foto testimonia su orgullo profesional como artesanos.",
    descriptionDE: "Die Männer posieren in Arbeitskleidung und Holzschuhen — bemerkenswert für jene Zeit, in der es üblich war, sich in Sonntagskleidung zu kleiden. Das Foto zeugt von ihrem Berufsstolz als Handwerker.",
    year: "ca. 1910",
    category: "beroep"
  },
  {
    id: 6,
    src: izegem1643,
    titleNL: "Historische kaart van Izegem",
    titleFR: "Carte historique d'Izegem",
    titleEN: "Historical Map of Izegem",
    titleES: "Mapa Histórico de Izegem",
    titleDE: "Historische Karte von Izegem",
    descriptionNL: "Kaart van Izegem uit de 'Flandria Illustrata' van Antonius Sanderus (1643). Deze gravure toont het dorp zoals het eruitzag in de zeventiende eeuw, met de kerk en omliggende gebouwen.",
    descriptionFR: "Carte d'Izegem tirée de la 'Flandria Illustrata' d'Antonius Sanderus (1643). Cette gravure montre le village tel qu'il apparaissait au XVIIe siècle, avec l'église et les bâtiments environnants.",
    descriptionEN: "Map of Izegem from 'Flandria Illustrata' by Antonius Sanderus (1643). This engraving shows the village as it appeared in the seventeenth century, with the church and surrounding buildings.",
    descriptionES: "Mapa de Izegem de 'Flandria Illustrata' de Antonius Sanderus (1643). Este grabado muestra el pueblo tal como aparecía en el siglo XVII, con la iglesia y los edificios circundantes.",
    descriptionDE: "Karte von Izegem aus der 'Flandria Illustrata' von Antonius Sanderus (1643). Dieser Stich zeigt das Dorf, wie es im 17. Jahrhundert aussah, mit der Kirche und den umliegenden Gebäuden.",
    year: "1643",
    category: "locatie"
  },
  {
    id: 7,
    src: mapLilleRegion,
    titleNL: "Kaart van de regio Rijsel",
    titleFR: "Carte de la région de Lille",
    titleEN: "Map of the Lille Region",
    titleES: "Mapa de la Región de Lille",
    titleDE: "Karte der Region Lille",
    descriptionNL: "Historische kaart van de streek rond Rijsel (Lille), met de dorpen waar onze voorouders woonden: Hallennes-lez-Haubourdin, Santes, Capinghem, Loos en andere plaatsen in de Weppes-streek.",
    descriptionFR: "Carte historique de la région autour de Lille, avec les villages où vivaient nos ancêtres : Hallennes-lez-Haubourdin, Santes, Capinghem, Loos et d'autres lieux de la région des Weppes.",
    descriptionEN: "Historical map of the area around Lille, with the villages where our ancestors lived: Hallennes-lez-Haubourdin, Santes, Capinghem, Loos and other places in the Weppes region.",
    descriptionES: "Mapa histórico de la zona alrededor de Lille, con los pueblos donde vivían nuestros antepasados: Hallennes-lez-Haubourdin, Santes, Capinghem, Loos y otros lugares de la región de Weppes.",
    descriptionDE: "Historische Karte der Gegend um Lille, mit den Dörfern, in denen unsere Vorfahren lebten: Hallennes-lez-Haubourdin, Santes, Capinghem, Loos und andere Orte in der Weppes-Region.",
    year: "17e-18e eeuw",
    category: "locatie"
  },
  {
    id: 8,
    src: meubelatelier1880,
    titleNL: "Een meubelmakerij",
    titleFR: "Un atelier d'ébénisterie",
    titleEN: "A Cabinetmaker's Workshop",
    titleES: "Un Taller de Ebanistería",
    titleDE: "Eine Möbelwerkstatt",
    descriptionNL: "Interieur van een meubelmakerij omstreeks 1880. De werkplaats toont de typische uitrusting van een ambachtelijk atelier waar meubels met de hand werden vervaardigd.",
    descriptionFR: "Intérieur d'un atelier d'ébénisterie vers 1880. L'atelier montre l'équipement typique d'un atelier artisanal où les meubles étaient fabriqués à la main.",
    descriptionEN: "Interior of a cabinetmaker's workshop around 1880. The workshop shows the typical equipment of a craft workshop where furniture was made by hand.",
    descriptionES: "Interior de un taller de ebanistería alrededor de 1880. El taller muestra el equipamiento típico de un taller artesanal donde los muebles se fabricaban a mano.",
    descriptionDE: "Innenansicht einer Möbelwerkstatt um 1880. Die Werkstatt zeigt die typische Ausstattung einer Handwerkerwerkstatt, in der Möbel von Hand gefertigt wurden.",
    year: "ca. 1880",
    category: "beroep"
  },
  {
    id: 9,
    src: oudeKerk,
    titleNL: "De Oude Sint-Tillokerk",
    titleFR: "L'ancienne église Saint-Tillo",
    titleEN: "The Old Saint Tillo Church",
    titleES: "La Antigua Iglesia de San Tillo",
    titleDE: "Die alte St.-Tillo-Kirche",
    descriptionNL: "De Oude Sint-Tillokerk van Izegem, heropgebouwd vanaf 1604 en in 1852 afgebroken om plaats te maken voor de huidige kerk. Lithografie van Deroeck. Hier werden vele voorouders gedoopt, gehuwd en begraven.",
    descriptionFR: "L'ancienne église Saint-Tillo d'Izegem, reconstruite à partir de 1604 et démolie en 1852 pour faire place à l'église actuelle. Lithographie de Deroeck. De nombreux ancêtres y ont été baptisés, mariés et enterrés.",
    descriptionEN: "The Old Saint Tillo Church of Izegem, rebuilt from 1604 and demolished in 1852 to make way for the current church. Lithograph by Deroeck. Many ancestors were baptized, married and buried here.",
    descriptionES: "La Antigua Iglesia de San Tillo de Izegem, reconstruida desde 1604 y demolida en 1852 para dar paso a la iglesia actual. Litografía de Deroeck. Muchos antepasados fueron bautizados, casados y enterrados aquí.",
    descriptionDE: "Die alte St.-Tillo-Kirche von Izegem, ab 1604 wiederaufgebaut und 1852 abgerissen, um Platz für die heutige Kirche zu machen. Lithografie von Deroeck. Hier wurden viele Vorfahren getauft, verheiratet und begraben.",
    year: "1604-1852",
    category: "locatie"
  },
  {
    id: 10,
    src: reunion1962,
    titleNL: "Familiereünie 1962",
    titleFR: "Réunion de famille 1962",
    titleEN: "Family Reunion 1962",
    titleES: "Reunión Familiar 1962",
    titleDE: "Familientreffen 1962",
    descriptionNL: "Grote familiereünie in Izegem, bij het ouderlijke huis in de Vandenbogaerdelaan 27. Meerdere generaties afstammelingen van Marcel Deforce en Magdalena Geldof komen samen voor deze memorabele groepsfoto.",
    descriptionFR: "Grande réunion de famille à Izegem, à la maison parentale au Vandenbogaerdelaan 27. Plusieurs générations de descendants de Marcel Deforce et Magdalena Geldof se réunissent pour cette photo de groupe mémorable.",
    descriptionEN: "Large family reunion in Izegem, at the parental home on Vandenbogaerdelaan 27. Multiple generations of descendants of Marcel Deforce and Magdalena Geldof gather for this memorable group photo.",
    descriptionES: "Gran reunión familiar en Izegem, en la casa paterna en Vandenbogaerdelaan 27. Múltiples generaciones de descendientes de Marcel Deforce y Magdalena Geldof se reúnen para esta memorable foto grupal.",
    descriptionDE: "Großes Familientreffen in Izegem, beim Elternhaus in der Vandenbogaerdelaan 27. Mehrere Generationen von Nachkommen von Marcel Deforce und Magdalena Geldof versammeln sich für dieses denkwürdige Gruppenfoto.",
    year: "1962",
    category: "familie"
  },
  {
    id: 11,
    src: reunion2024,
    titleNL: "Familiereünie 2024",
    titleFR: "Réunion de famille 2024",
    titleEN: "Family Reunion 2024",
    titleES: "Reunión Familiar 2024",
    titleDE: "Familientreffen 2024",
    descriptionNL: "Op zondag 29 september 2024 kwamen 112 afstammelingen van Marcel Deforce en Magdalena Geldof samen in Het Prullenbos te Laarne. Een dag van hereniging, herinneringen en het vieren van de familieband.",
    descriptionFR: "Le dimanche 29 septembre 2024, 112 descendants de Marcel Deforce et Magdalena Geldof se sont réunis au Prullenbos à Laarne. Une journée de retrouvailles, de souvenirs et de célébration du lien familial.",
    descriptionEN: "On Sunday September 29, 2024, 112 descendants of Marcel Deforce and Magdalena Geldof gathered at Het Prullenbos in Laarne. A day of reunion, memories and celebrating the family bond.",
    descriptionES: "El domingo 29 de septiembre de 2024, 112 descendientes de Marcel Deforce y Magdalena Geldof se reunieron en Het Prullenbos en Laarne. Un día de reencuentro, recuerdos y celebración del vínculo familiar.",
    descriptionDE: "Am Sonntag, dem 29. September 2024, versammelten sich 112 Nachkommen von Marcel Deforce und Magdalena Geldof im Het Prullenbos in Laarne. Ein Tag der Wiedervereinigung, Erinnerungen und des Feierns der Familienbande.",
    year: "2024",
    category: "familie"
  },
  // Historische documenten en echte afbeeldingen
  {
    id: 12,
    src: slagWestrozebeke,
    titleNL: "De Slag bij Westrozebeke",
    titleFR: "La Bataille de Westrozebeke",
    titleEN: "The Battle of Westrozebeke",
    titleES: "La Batalla de Westrozebeke",
    titleDE: "Die Schlacht bei Westrozebeke",
    descriptionNL: "De Slag bij Westrozebeke vond plaats op 27 november 1382. Het Vlaamse burgerleger onder leiding van Filips van Artevelde werd verslagen door het Franse koninklijke leger. Meer dan 25.000 Vlamingen sneuvelden. Onze voorouders Gilles van den Neste en Zeger Van Steenkiste overleefden deze veldslag.",
    descriptionFR: "La Bataille de Westrozebeke eut lieu le 27 novembre 1382. L'armée bourgeoise flamande sous Philippe van Artevelde fut vaincue par l'armée royale française. Plus de 25 000 Flamands périrent. Nos ancêtres Gilles van den Neste et Zeger Van Steenkiste ont survécu à cette bataille.",
    descriptionEN: "The Battle of Westrozebeke took place on November 27, 1382. The Flemish citizen army under Philip van Artevelde was defeated by the French royal army. More than 25,000 Flemings perished. Our ancestors Gilles van den Neste and Zeger Van Steenkiste survived this battle.",
    descriptionES: "La Batalla de Westrozebeke tuvo lugar el 27 de noviembre de 1382. El ejército ciudadano flamenco bajo Felipe van Artevelde fue derrotado por el ejército real francés. Más de 25.000 flamencos perecieron. Nuestros antepasados Gilles van den Neste y Zeger Van Steenkiste sobrevivieron a esta batalla.",
    descriptionDE: "Die Schlacht bei Westrozebeke fand am 27. November 1382 statt. Das flämische Bürgerheer unter Philipp van Artevelde wurde von der französischen königlichen Armee besiegt. Mehr als 25.000 Flamen fielen. Unsere Vorfahren Gilles van den Neste und Zeger Van Steenkiste überlebten diese Schlacht.",
    year: "1382",
    category: "historisch"
  },
  {
    id: 13,
    src: huwelijkscontract,
    titleNL: "Het Huwelijkscontract (1685)",
    titleFR: "Le Contrat de Mariage (1685)",
    titleEN: "The Marriage Contract (1685)",
    titleES: "El Contrato Matrimonial (1685)",
    titleDE: "Der Ehevertrag (1685)",
    descriptionNL: "Op 18 april 1685 trouwden Hubert Deleforge en Antoinette Follet voor notaris Jacques Anselme Le Francq te Lille. Beide families brachten elk 400 pond parisis als bruidsschat in - een aanzienlijk bedrag waarmee men destijds 2-3 hectare landbouwgrond kon kopen.",
    descriptionFR: "Le 18 avril 1685, Hubert Deleforge et Antoinette Follet se sont mariés devant le notaire Jacques Anselme Le Francq à Lille. Les deux familles ont apporté chacune 400 livres parisis comme dot - une somme considérable permettant d'acheter 2-3 hectares de terres agricoles.",
    descriptionEN: "On April 18, 1685, Hubert Deleforge and Antoinette Follet married before notary Jacques Anselme Le Francq in Lille. Both families contributed 400 pounds parisis each as dowry - a considerable sum that could buy 2-3 hectares of farmland at the time.",
    descriptionES: "El 18 de abril de 1685, Hubert Deleforge y Antoinette Follet se casaron ante el notario Jacques Anselme Le Francq en Lille. Ambas familias contribuyeron con 400 libras parisis cada una como dote - una suma considerable con la que se podían comprar 2-3 hectáreas de tierra agrícola en ese momento.",
    descriptionDE: "Am 18. April 1685 heirateten Hubert Deleforge und Antoinette Follet vor Notar Jacques Anselme Le Francq in Lille. Beide Familien brachten je 400 Pfund Parisis als Mitgift ein - eine beträchtliche Summe, mit der man damals 2-3 Hektar Ackerland kaufen konnte.",
    year: "1685",
    category: "historisch"
  },
  {
    id: 23,
    src: kaartEmelgem1880,
    titleNL: "Historische Kaart van Emelgem",
    titleFR: "Carte Historique d'Emelgem",
    titleEN: "Historical Map of Emelgem",
    titleES: "Mapa Histórico de Emelgem",
    titleDE: "Historische Karte von Emelgem",
    descriptionNL: "Reconstructie van een kadasterkaart van Emelgem rond 1880. Het dorp waar onze voorouders Jean François Deforce en Charles Louis Deforce woonden en werkten. Te zien zijn de Sint-Amanduskerk, de windmolens, de akkers en de typische Vlaamse landbouwpercelen. De familie Deforce was hier gevestigd als timmerlieden en schrijnwerkers.",
    descriptionFR: "Reconstitution d'une carte cadastrale d'Emelgem vers 1880. Le village où nos ancêtres Jean François Deforce et Charles Louis Deforce vivaient et travaillaient. On peut voir l'église Saint-Amand, les moulins à vent, les champs et les parcelles agricoles typiquement flamandes. La famille Deforce y était établie comme charpentiers et menuisiers.",
    descriptionEN: "Reconstruction of a cadastral map of Emelgem around 1880. The village where our ancestors Jean François Deforce and Charles Louis Deforce lived and worked. Visible are Saint Amand's Church, the windmills, the fields and the typical Flemish agricultural plots. The Deforce family was established here as carpenters and joiners.",
    descriptionES: "Reconstrucción de un mapa catastral de Emelgem alrededor de 1880. El pueblo donde nuestros antepasados Jean François Deforce y Charles Louis Deforce vivían y trabajaban. Se pueden ver la Iglesia de San Amando, los molinos de viento, los campos y las típicas parcelas agrícolas flamencas. La familia Deforce estaba establecida aquí como carpinteros y ebanistas.",
    descriptionDE: "Rekonstruktion einer Katasterkarte von Emelgem um 1880. Das Dorf, in dem unsere Vorfahren Jean François Deforce und Charles Louis Deforce lebten und arbeiteten. Zu sehen sind die St.-Amandus-Kirche, die Windmühlen, die Felder und die typisch flämischen landwirtschaftlichen Parzellen. Die Familie Deforce war hier als Zimmerleute und Schreiner ansässig.",
    year: "ca. 1880",
    category: "locatie"
  },
  // AI-gegenereerde historische visualisaties
  {
    id: 15,
    src: timmermansatelier,
    titleNL: "Het Timmermansatelier",
    titleFR: "L'Atelier de Menuisier",
    titleEN: "The Carpenter's Workshop",
    titleES: "El Taller del Carpintero",
    titleDE: "Die Zimmermannswerkstatt",
    descriptionNL: "Een timmermanswerkplaats (18e eeuw). Georgius Delforce (1731-1807) was de eerste generatie die zich formeel als timmerman vestigde. Dit markeerde het begin van de familiale traditie in houtbewerking die tot in de 20e eeuw zou voortduren.",
    descriptionFR: "Un atelier de menuisier (XVIIIe siècle). Georgius Delforce (1731-1807) fut la première génération à s'établir formellement comme charpentier. Cela marqua le début de la tradition familiale du travail du bois qui perdurerait jusqu'au XXe siècle.",
    descriptionEN: "A carpenter's workshop (18th century). Georgius Delforce (1731-1807) was the first generation to formally establish himself as a carpenter. This marked the beginning of the family tradition in woodworking that would continue into the 20th century.",
    descriptionES: "Un taller de carpintero (siglo XVIII). Georgius Delforce (1731-1807) fue la primera generación en establecerse formalmente como carpintero. Esto marcó el inicio de la tradición familiar en el trabajo de la madera que continuaría hasta el siglo XX.",
    descriptionDE: "Eine Zimmermannswerkstatt (18. Jahrhundert). Georgius Delforce (1731-1807) war die erste Generation, die sich formal als Zimmermann niederließ. Dies markierte den Beginn der Familientradition in der Holzbearbeitung, die bis ins 20. Jahrhundert andauern sollte.",
    year: "18e eeuw",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 16,
    src: tassaertKindersterfte,
    titleNL: "Kindersterfte en Armoede",
    titleFR: "Mortalité Infantile et Pauvreté",
    titleEN: "Child Mortality and Poverty",
    titleES: "Mortalidad Infantil y Pobreza",
    titleDE: "Kindersterblichkeit und Armut",
    descriptionNL: "Visualisatie geïnspireerd op 'Dode moeder met slapend kind in de winter' van Octave Tassaert (ca. 1850). Dit ontroerende werk toont de harde realiteit van armoede en kindersterfte in de 19e eeuw. Ook de familie Deforce kende dit leed: Charles Louis verloor vijf van zijn acht kinderen op jonge leeftijd.",
    descriptionFR: "Visualisation inspirée du tableau 'Mère indigente décédée tenant son enfant endormi en hiver' d'Octave Tassaert (vers 1850). Cette œuvre poignante montre la dure réalité de la pauvreté et de la mortalité infantile au XIXe siècle. La famille Deforce a également connu cette souffrance : Charles Louis a perdu cinq de ses huit enfants en bas âge.",
    descriptionEN: "Visualization inspired by 'Dead mother with sleeping child in winter' by Octave Tassaert (ca. 1850). This moving work shows the harsh reality of poverty and child mortality in the 19th century. The Deforce family also knew this suffering: Charles Louis lost five of his eight children at a young age.",
    descriptionES: "Visualización inspirada en 'Madre muerta con niño dormido en invierno' de Octave Tassaert (ca. 1850). Esta conmovedora obra muestra la dura realidad de la pobreza y la mortalidad infantil en el siglo XIX. La familia Deforce también conoció este sufrimiento: Charles Louis perdió cinco de sus ocho hijos a temprana edad.",
    descriptionDE: "Visualisierung inspiriert von 'Tote Mutter mit schlafendem Kind im Winter' von Octave Tassaert (ca. 1850). Dieses ergreifende Werk zeigt die harte Realität von Armut und Kindersterblichkeit im 19. Jahrhundert. Auch die Familie Deforce kannte dieses Leid: Charles Louis verlor fünf seiner acht Kinder in jungen Jahren.",
    year: "ca. 1850",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 17,
    src: armeVlaamseFamilie,
    titleNL: "De Zegen voor de Maaltijd",
    titleFR: "La Bénédiction avant le Repas",
    titleEN: "The Blessing Before the Meal",
    titleES: "La Bendición Antes de la Comida",
    titleDE: "Der Segen vor dem Mahl",
    descriptionNL: "Een arme Vlaamse familie bidt voor de sobere maaltijd in hun eenvoudige woning. Bij kaarslicht zitten moeder en kinderen rond de tafel met enkel brood en soep. Ondanks de armoede hield men vast aan geloof en tradities. Dit beeld was typerend voor veel gezinnen in 19e-eeuws Vlaanderen.",
    descriptionFR: "Une pauvre famille flamande prie avant leur maigre repas dans leur humble demeure. À la lueur d'une bougie, la mère et les enfants sont assis autour de la table avec seulement du pain et de la soupe. Malgré la pauvreté, on restait attaché à la foi et aux traditions. Cette image était typique de nombreuses familles dans la Flandre du XIXe siècle.",
    descriptionEN: "A poor Flemish family prays before their meager meal in their humble home. By candlelight, mother and children sit around the table with only bread and soup. Despite the poverty, they held on to faith and traditions. This image was typical of many families in 19th-century Flanders.",
    descriptionES: "Una pobre familia flamenca reza antes de su escasa comida en su humilde hogar. A la luz de las velas, madre e hijos se sientan alrededor de la mesa con solo pan y sopa. A pesar de la pobreza, mantuvieron la fe y las tradiciones. Esta imagen era típica de muchas familias en Flandes del siglo XIX.",
    descriptionDE: "Eine arme flämische Familie betet vor ihrer kargen Mahlzeit in ihrem bescheidenen Heim. Bei Kerzenlicht sitzen Mutter und Kinder um den Tisch mit nur Brot und Suppe. Trotz der Armut hielt man an Glauben und Traditionen fest. Dieses Bild war typisch für viele Familien im Flandern des 19. Jahrhunderts.",
    year: "19e eeuw",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 18,
    src: armeStraatverkopers,
    titleNL: "Rondtrekkende Straatverkopers",
    titleFR: "Marchands Ambulants",
    titleEN: "Traveling Street Vendors",
    titleES: "Vendedores Ambulantes",
    titleDE: "Wandernde Straßenverkäufer",
    descriptionNL: "Een vader met zijn kinderen op een koude winterdag, rondtrekkend over de Vlaamse wegen om hun waren te verkopen. De harde omstandigheden dwongen vele families tot rondtrekken. Kinderen werkten mee vanaf jonge leeftijd om te overleven.",
    descriptionFR: "Un père avec ses enfants par un froid jour d'hiver, parcourant les routes flamandes pour vendre leurs marchandises. Les conditions difficiles obligeaient de nombreuses familles à errer. Les enfants travaillaient dès leur plus jeune âge pour survivre.",
    descriptionEN: "A father with his children on a cold winter day, traveling the Flemish roads to sell their goods. The harsh conditions forced many families to travel. Children worked from a young age to survive.",
    descriptionES: "Un padre con sus hijos en un frío día de invierno, recorriendo los caminos flamencos para vender sus mercancías. Las duras condiciones obligaban a muchas familias a viajar. Los niños trabajaban desde temprana edad para sobrevivir.",
    descriptionDE: "Ein Vater mit seinen Kindern an einem kalten Wintertag, unterwegs auf den flämischen Straßen, um ihre Waren zu verkaufen. Die harten Bedingungen zwangen viele Familien zum Umherziehen. Kinder arbeiteten von klein auf mit, um zu überleben.",
    year: "19e eeuw",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 19,
    src: choleraEpidemie,
    titleNL: "De Cholera-epidemie",
    titleFR: "L'Épidémie de Choléra",
    titleEN: "The Cholera Epidemic",
    titleES: "La Epidemia de Cólera",
    titleDE: "Die Cholera-Epidemie",
    descriptionNL: "Een dokter bezoekt een arm gezin tijdens de cholera-epidemie die Vlaanderen teisterde in de 19e eeuw. Cholera en tyfus decimeerden de bevolking, vooral in de armste wijken. De epidemieën van 1832, 1848 en 1866 eisten duizenden levens in België.",
    descriptionFR: "Un médecin rend visite à une famille pauvre pendant l'épidémie de choléra qui a ravagé la Flandre au XIXe siècle. Le choléra et le typhus ont décimé la population, surtout dans les quartiers les plus pauvres. Les épidémies de 1832, 1848 et 1866 ont coûté des milliers de vies en Belgique.",
    descriptionEN: "A doctor visits a poor family during the cholera epidemic that ravaged Flanders in the 19th century. Cholera and typhus decimated the population, especially in the poorest neighborhoods. The epidemics of 1832, 1848 and 1866 claimed thousands of lives in Belgium.",
    descriptionES: "Un médico visita a una familia pobre durante la epidemia de cólera que asoló Flandes en el siglo XIX. El cólera y el tifus diezmaron la población, especialmente en los barrios más pobres. Las epidemias de 1832, 1848 y 1866 cobraron miles de vidas en Bélgica.",
    descriptionDE: "Ein Arzt besucht eine arme Familie während der Cholera-Epidemie, die Flandern im 19. Jahrhundert heimsuchte. Cholera und Typhus dezimierten die Bevölkerung, besonders in den ärmsten Vierteln. Die Epidemien von 1832, 1848 und 1866 forderten Tausende von Menschenleben in Belgien.",
    year: "19e eeuw",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 20,
    src: aardappelHongersnood,
    titleNL: "De Aardappelplaag (1845-1850)",
    titleFR: "Le Mildiou de la Pomme de Terre (1845-1850)",
    titleEN: "The Potato Blight (1845-1850)",
    titleES: "La Plaga de la Patata (1845-1850)",
    titleDE: "Die Kartoffelfäule (1845-1850)",
    descriptionNL: "Boeren staan machteloos bij hun mislukte aardappeloogst. De aardappelziekte (Phytophthora infestans) vernietigde de oogsten van 1845-1850. Voor de arme Vlaamse bevolking, die sterk afhankelijk was van aardappelen, betekende dit hongersnood en massale sterfte.",
    descriptionFR: "Des paysans impuissants devant leur récolte de pommes de terre ravagée. Le mildiou (Phytophthora infestans) a détruit les récoltes de 1845 à 1850. Pour la population flamande pauvre, fortement dépendante des pommes de terre, cela signifiait famine et mortalité massive.",
    descriptionEN: "Farmers stand helpless by their failed potato harvest. The potato blight (Phytophthora infestans) destroyed the harvests from 1845-1850. For the poor Flemish population, heavily dependent on potatoes, this meant famine and mass mortality.",
    descriptionES: "Los agricultores permanecen impotentes ante su cosecha de patatas fallida. La plaga de la patata (Phytophthora infestans) destruyó las cosechas de 1845 a 1850. Para la pobre población flamenca, muy dependiente de las patatas, esto significó hambruna y mortalidad masiva.",
    descriptionDE: "Bauern stehen hilflos vor ihrer gescheiterten Kartoffelernte. Die Kartoffelfäule (Phytophthora infestans) zerstörte die Ernten von 1845-1850. Für die arme flämische Bevölkerung, die stark von Kartoffeln abhängig war, bedeutete dies Hungersnot und Massensterben.",
    year: "1845-1850",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 21,
    src: linnencrisis,
    titleNL: "De Linnencrisis",
    titleFR: "La Crise du Lin",
    titleEN: "The Linen Crisis",
    titleES: "La Crisis del Lino",
    titleDE: "Die Leinenkrise",
    descriptionNL: "Een wanhopige weefster bij haar verlaten weefgetouw. De opkomst van machinaal geweven katoen uit Engeland vernietigde de Vlaamse huisnijverheid. Duizenden gezinnen die van het spinnen en weven leefden, verloren hun inkomen precies toen de aardappeloogst ook mislukte.",
    descriptionFR: "Une tisserande désespérée devant son métier à tisser abandonné. L'essor du coton tissé mécaniquement en Angleterre a détruit l'industrie textile domestique flamande. Des milliers de familles vivant du filage et du tissage ont perdu leurs revenus au moment même où la récolte de pommes de terre échouait.",
    descriptionEN: "A desperate weaver by her abandoned loom. The rise of machine-woven cotton from England destroyed the Flemish cottage industry. Thousands of families living from spinning and weaving lost their income precisely when the potato harvest also failed.",
    descriptionES: "Una tejedora desesperada junto a su telar abandonado. El auge del algodón tejido a máquina de Inglaterra destruyó la industria textil doméstica flamenca. Miles de familias que vivían del hilado y tejido perdieron sus ingresos precisamente cuando la cosecha de patatas también falló.",
    descriptionDE: "Eine verzweifelte Weberin an ihrem verlassenen Webstuhl. Der Aufstieg maschinell gewebter Baumwolle aus England zerstörte das flämische Heimgewerbe. Tausende Familien, die vom Spinnen und Weben lebten, verloren ihr Einkommen genau dann, als auch die Kartoffelernte scheiterte.",
    year: "1840s",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 22,
    src: bedelaarsHongersnood,
    titleNL: "Massa-armoede en Bedelarij",
    titleFR: "Pauvreté de Masse et Mendicité",
    titleEN: "Mass Poverty and Begging",
    titleES: "Pobreza Masiva y Mendicidad",
    titleDE: "Massenarmut und Bettelei",
    descriptionNL: "Honderden wanhopige mensen verzamelen zich op straat tijdens de hongerjaren. In 1847 bereikten de hongersnood en de bedelarij hun hoogtepunt. Hele dorpen werden ontvolkt door sterfte en emigratie. Dit was de laatste grote hongersnood in België in vredestijd.",
    descriptionFR: "Des centaines de personnes désespérées se rassemblent dans les rues pendant les années de famine. En 1847, la famine et la mendicité atteignirent leur apogée. Des villages entiers furent dépeuplés par la mortalité et l'émigration. Ce fut la dernière grande famine en Belgique en temps de paix.",
    descriptionEN: "Hundreds of desperate people gather in the streets during the famine years. In 1847, famine and begging reached their peak. Entire villages were depopulated by mortality and emigration. This was the last major famine in Belgium in peacetime.",
    descriptionES: "Cientos de personas desesperadas se reúnen en las calles durante los años de hambruna. En 1847, la hambruna y la mendicidad alcanzaron su punto máximo. Pueblos enteros fueron despoblados por la mortalidad y la emigración. Esta fue la última gran hambruna en Bélgica en tiempos de paz.",
    descriptionDE: "Hunderte verzweifelte Menschen versammeln sich während der Hungerjahre auf den Straßen. 1847 erreichten Hungersnot und Bettelei ihren Höhepunkt. Ganze Dörfer wurden durch Sterblichkeit und Auswanderung entvölkert. Dies war die letzte große Hungersnot in Belgien in Friedenszeiten.",
    year: "1847",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 24,
    src: boquillonForest,
    titleNL: "Het Bos van de Boquillons",
    titleFR: "La Forêt des Boquillons",
    titleEN: "The Forest of the Boquillons",
    titleES: "El Bosque de los Boquillons",
    titleDE: "Der Wald der Boquillons",
    descriptionNL: "Visualisatie van het boslandschap waar onze voorvader Hubert Deleforge als boquillon (houtarbeider) werkte rond 1685. De bossen rond Hallennes-lez-Haubourdin waren rijk aan eiken en beuken.",
    descriptionFR: "Visualisation du paysage forestier où notre ancêtre Hubert Deleforge travaillait comme boquillon (travailleur du bois) vers 1685. Les forêts autour de Hallennes-lez-Haubourdin étaient riches en chênes et en hêtres.",
    descriptionEN: "Visualization of the forest landscape where our ancestor Hubert Deleforge worked as a boquillon (woodworker) around 1685. The forests around Hallennes-lez-Haubourdin were rich in oaks and beeches.",
    descriptionES: "Visualización del paisaje forestal donde nuestro antepasado Hubert Deleforge trabajaba como boquillon (trabajador de la madera) alrededor de 1685. Los bosques alrededor de Hallennes-lez-Haubourdin eran ricos en robles y hayas.",
    descriptionDE: "Visualisierung der Waldlandschaft, in der unser Vorfahre Hubert Deleforge um 1685 als Boquillon (Holzarbeiter) arbeitete. Die Wälder um Hallennes-lez-Haubourdin waren reich an Eichen und Buchen.",
    year: "ca. 1685",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 25,
    src: dagloner18eEeuw,
    titleNL: "Dagloner in de 18e Eeuw",
    titleFR: "Journalier au XVIIIe Siècle",
    titleEN: "Day Laborer in the 18th Century",
    titleES: "Jornalero en el Siglo XVIII",
    titleDE: "Tagelöhner im 18. Jahrhundert",
    descriptionNL: "Een dagloner aan het werk op de velden. Jacobus Franciscus Deleforge (1718-1772) werkte als landbouwer en dagloner in Ardooie. Het zware seizoenswerk bood nauwelijks genoeg om een gezin te onderhouden.",
    descriptionFR: "Un journalier au travail dans les champs. Jacobus Franciscus Deleforge (1718-1772) travaillait comme agriculteur et journalier à Ardooie. Le dur travail saisonnier suffisait à peine pour subvenir aux besoins d'une famille.",
    descriptionEN: "A day laborer at work in the fields. Jacobus Franciscus Deleforge (1718-1772) worked as a farmer and day laborer in Ardooie. The hard seasonal work barely provided enough to support a family.",
    descriptionES: "Un jornalero trabajando en los campos. Jacobus Franciscus Deleforge (1718-1772) trabajaba como agricultor y jornalero en Ardooie. El duro trabajo estacional apenas proporcionaba suficiente para mantener a una familia.",
    descriptionDE: "Ein Tagelöhner bei der Arbeit auf den Feldern. Jacobus Franciscus Deleforge (1718-1772) arbeitete als Bauer und Tagelöhner in Ardooie. Die schwere Saisonarbeit bot kaum genug, um eine Familie zu ernähren.",
    year: "18e eeuw",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 26,
    src: ferrarisIzegem1777,
    titleNL: "Ferrariskaart Izegem (1777)",
    titleFR: "Carte de Ferraris Izegem (1777)",
    titleEN: "Ferraris Map Izegem (1777)",
    titleES: "Mapa de Ferraris Izegem (1777)",
    titleDE: "Ferraris-Karte Izegem (1777)",
    descriptionNL: "De Ferrariskaart van Izegem uit 1777, de eerste gedetailleerde topografische kaart van de Oostenrijkse Nederlanden. Deze historische kaart toont het landschap waar onze voorouders leefden en werkten.",
    descriptionFR: "La carte de Ferraris d'Izegem de 1777, la première carte topographique détaillée des Pays-Bas autrichiens. Cette carte historique montre le paysage où nos ancêtres vivaient et travaillaient.",
    descriptionEN: "The Ferraris map of Izegem from 1777, the first detailed topographic map of the Austrian Netherlands. This historical map shows the landscape where our ancestors lived and worked.",
    descriptionES: "El mapa de Ferraris de Izegem de 1777, el primer mapa topográfico detallado de los Países Bajos Austríacos. Este mapa histórico muestra el paisaje donde nuestros antepasados vivían y trabajaban.",
    descriptionDE: "Die Ferraris-Karte von Izegem aus dem Jahr 1777, die erste detaillierte topografische Karte der Österreichischen Niederlande. Diese historische Karte zeigt die Landschaft, in der unsere Vorfahren lebten und arbeiteten.",
    year: "1777",
    category: "locatie"
  },
  {
    id: 31,
    src: meubelmakerij,
    titleNL: "Meubelmakerij Belle Époque",
    titleFR: "Ébénisterie Belle Époque",
    titleEN: "Cabinetmaking Belle Époque",
    titleES: "Ebanistería Belle Époque",
    titleDE: "Möbelwerkstatt Belle Époque",
    descriptionNL: "Een meubelmakerij tijdens de Belle Époque (1871-1914). Charles Louis Deforce en later Marcel August Deforce werkten in deze bloeiperiode van het ambacht.",
    descriptionFR: "Un atelier d'ébénisterie pendant la Belle Époque (1871-1914). Charles Louis Deforce et plus tard Marcel August Deforce ont travaillé pendant cette période florissante de l'artisanat.",
    descriptionEN: "A cabinetmaker's workshop during the Belle Époque (1871-1914). Charles Louis Deforce and later Marcel August Deforce worked during this flourishing period of the craft.",
    descriptionES: "Un taller de ebanistería durante la Belle Époque (1871-1914). Charles Louis Deforce y más tarde Marcel August Deforce trabajaron durante este período floreciente del oficio.",
    descriptionDE: "Eine Möbelwerkstatt während der Belle Époque (1871-1914). Charles Louis Deforce und später Marcel August Deforce arbeiteten in dieser Blütezeit des Handwerks.",
    year: "ca. 1900",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 33,
    src: migratieReis,
    titleNL: "De Migratiereis (1699)",
    titleFR: "Le Voyage de Migration (1699)",
    titleEN: "The Migration Journey (1699)",
    titleES: "El Viaje de Migración (1699)",
    titleDE: "Die Migrationsreise (1699)",
    descriptionNL: "Visualisatie van de 50 km lange reis die Hubert Deleforge maakte van Hallennes-lez-Haubourdin naar Emelgem in 1699. De reis ging door het vlakke Vlaamse land.",
    descriptionFR: "Visualisation du voyage de 50 km qu'Hubert Deleforge a effectué de Hallennes-lez-Haubourdin à Emelgem en 1699. Le voyage traversait le plat pays flamand.",
    descriptionEN: "Visualization of the 50 km journey that Hubert Deleforge made from Hallennes-lez-Haubourdin to Emelgem in 1699. The journey went through the flat Flemish countryside.",
    descriptionES: "Visualización del viaje de 50 km que Hubert Deleforge hizo desde Hallennes-lez-Haubourdin hasta Emelgem en 1699. El viaje atravesó la llanura flamenca.",
    descriptionDE: "Visualisierung der 50 km langen Reise, die Hubert Deleforge von Hallennes-lez-Haubourdin nach Emelgem im Jahr 1699 unternahm. Die Reise führte durch das flache flämische Land.",
    year: "1699",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 34,
    src: oorlogFransDuits,
    titleNL: "Frans-Duitse Oorlog (1870-1871)",
    titleFR: "Guerre Franco-Prussienne (1870-1871)",
    titleEN: "Franco-Prussian War (1870-1871)",
    titleES: "Guerra Franco-Prusiana (1870-1871)",
    titleDE: "Deutsch-Französischer Krieg (1870-1871)",
    descriptionNL: "De Frans-Duitse Oorlog had grote gevolgen voor de regio. De overwinning van Pruisen leidde tot de oprichting van het Duitse Keizerrijk en beïnvloedde de economie in de grensregio.",
    descriptionFR: "La Guerre Franco-Prussienne a eu de grandes conséquences pour la région. La victoire de la Prusse a conduit à la fondation de l'Empire allemand et a influencé l'économie de la région frontalière.",
    descriptionEN: "The Franco-Prussian War had major consequences for the region. Prussia's victory led to the founding of the German Empire and influenced the economy in the border region.",
    descriptionES: "La Guerra Franco-Prusiana tuvo grandes consecuencias para la región. La victoria de Prusia llevó a la fundación del Imperio Alemán e influyó en la economía de la región fronteriza.",
    descriptionDE: "Der Deutsch-Französische Krieg hatte große Auswirkungen auf die Region. Der Sieg Preußens führte zur Gründung des Deutschen Kaiserreichs und beeinflusste die Wirtschaft in der Grenzregion.",
    year: "1870-1871",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 35,
    src: oorlogLodewijk,
    titleNL: "Oorlogen van Lodewijk XIV",
    titleFR: "Guerres de Louis XIV",
    titleEN: "Wars of Louis XIV",
    titleES: "Guerras de Luis XIV",
    titleDE: "Kriege Ludwigs XIV.",
    descriptionNL: "De oorlogen van Lodewijk XIV (1688-1697) verwoestten Frans-Vlaanderen en waren een belangrijke reden voor de migratie van Hubert Deleforge naar de Oostenrijkse Nederlanden.",
    descriptionFR: "Les guerres de Louis XIV (1688-1697) ont dévasté la Flandre française et furent une raison importante de la migration d'Hubert Deleforge vers les Pays-Bas autrichiens.",
    descriptionEN: "The wars of Louis XIV (1688-1697) devastated French Flanders and were an important reason for Hubert Deleforge's migration to the Austrian Netherlands.",
    descriptionES: "Las guerras de Luis XIV (1688-1697) devastaron Flandes francés y fueron una razón importante para la migración de Hubert Deleforge a los Países Bajos Austríacos.",
    descriptionDE: "Die Kriege Ludwigs XIV. (1688-1697) verwüsteten Französisch-Flandern und waren ein wichtiger Grund für die Migration von Hubert Deleforge in die Österreichischen Niederlande.",
    year: "1688-1697",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 36,
    src: oorlogWO1,
    titleNL: "Eerste Wereldoorlog - De IJzer",
    titleFR: "Première Guerre Mondiale - L'Yser",
    titleEN: "World War I - The Yser",
    titleES: "Primera Guerra Mundial - El Yser",
    titleDE: "Erster Weltkrieg - Die Yser",
    descriptionNL: "De Eerste Wereldoorlog (1914-1918) trof West-Vlaanderen zwaar. Het IJzerfront lag slechts 30 km van Izegem. Marcel August Deforce beleefde deze turbulente periode.",
    descriptionFR: "La Première Guerre Mondiale (1914-1918) a durement frappé la Flandre occidentale. Le front de l'Yser était à seulement 30 km d'Izegem. Marcel August Deforce a vécu cette période turbulente.",
    descriptionEN: "World War I (1914-1918) hit West Flanders hard. The Yser front was only 30 km from Izegem. Marcel August Deforce lived through this turbulent period.",
    descriptionES: "La Primera Guerra Mundial (1914-1918) golpeó duramente a Flandes Occidental. El frente del Yser estaba a solo 30 km de Izegem. Marcel August Deforce vivió este turbulento período.",
    descriptionDE: "Der Erste Weltkrieg (1914-1918) traf Westflandern hart. Die Yser-Front lag nur 30 km von Izegem entfernt. Marcel August Deforce erlebte diese turbulente Zeit.",
    year: "1914-1918",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 37,
    src: pasfoto1,
    titleNL: "Marc Deforce - Auteur",
    titleFR: "Marc Deforce - Auteur",
    titleEN: "Marc Deforce - Author",
    titleES: "Marc Deforce - Autor",
    titleDE: "Marc Deforce - Autor",
    descriptionNL: "Marc Deforce, auteur van het boek over de familiegeschiedenis. Zijn jarenlange genealogisch onderzoek heeft geleid tot dit uitgebreide overzicht van de familie Deforce.",
    descriptionFR: "Marc Deforce, auteur du livre sur l'histoire familiale. Ses années de recherche généalogique ont abouti à cet aperçu complet de la famille Deforce.",
    descriptionEN: "Marc Deforce, author of the book on family history. His years of genealogical research resulted in this comprehensive overview of the Deforce family.",
    descriptionES: "Marc Deforce, autor del libro sobre la historia familiar. Sus años de investigación genealógica dieron como resultado esta visión completa de la familia Deforce.",
    descriptionDE: "Marc Deforce, Autor des Buches über die Familiengeschichte. Seine jahrelange genealogische Forschung führte zu diesem umfassenden Überblick über die Familie Deforce.",
    year: "21e eeuw",
    category: "portret"
  },
  {
    id: 38,
    src: schrijnwerkersatelier,
    titleNL: "Schrijnwerkersatelier (19e eeuw)",
    titleFR: "Atelier de Menuisier (XIXe siècle)",
    titleEN: "Joiner's Workshop (19th century)",
    titleES: "Taller de Ebanista (Siglo XIX)",
    titleDE: "Schreinerwerkstatt (19. Jahrhundert)",
    descriptionNL: "Een schrijnwerkersatelier in de 19e eeuw. Petrus Augustinus Delforge en Jean François Deforce werkten als timmerman en schrijnwerker in Emelgem.",
    descriptionFR: "Un atelier de menuisier au XIXe siècle. Petrus Augustinus Delforge et Jean François Deforce travaillaient comme charpentiers et menuisiers à Emelgem.",
    descriptionEN: "A joiner's workshop in the 19th century. Petrus Augustinus Delforge and Jean François Deforce worked as carpenters and joiners in Emelgem.",
    descriptionES: "Un taller de ebanista en el siglo XIX. Petrus Augustinus Delforge y Jean François Deforce trabajaban como carpinteros y ebanistas en Emelgem.",
    descriptionDE: "Eine Schreinerwerkstatt im 19. Jahrhundert. Petrus Augustinus Delforge und Jean François Deforce arbeiteten als Zimmerleute und Schreiner in Emelgem.",
    year: "19e eeuw",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 39,
    src: pachthoeve1680,
    titleNL: "Pachthoeve (ca. 1680)",
    titleFR: "Ferme en Métayage (vers 1680)",
    titleEN: "Tenant Farm (ca. 1680)",
    titleES: "Granja Arrendada (ca. 1680)",
    titleDE: "Pachthof (ca. 1680)",
    descriptionNL: "Een typische Vlaamse pachthoeve van ongeveer 2,5 hectare rond 1680. Met een witgekalkte boerderij, rieten dak, houten omheining en omliggende akkers. Zo'n hoeve zou Hubert Deleforge en Antoinette Follet hebben kunnen pachten met hun bruidsschat van 800 pond parisis.",
    descriptionFR: "Une ferme flamande typique d'environ 2,5 hectares vers 1680. Avec une ferme blanchie à la chaux, un toit de chaume, une clôture en bois et des champs environnants. Une telle ferme aurait pu être louée par Hubert Deleforge et Antoinette Follet avec leur dot de 800 livres parisis.",
    descriptionEN: "A typical Flemish tenant farm of about 2.5 hectares around 1680. With a whitewashed farmhouse, thatched roof, wooden fence and surrounding fields. Such a farm could have been leased by Hubert Deleforge and Antoinette Follet with their dowry of 800 pounds parisis.",
    descriptionES: "Una típica granja flamenca arrendada de aproximadamente 2.5 hectáreas alrededor de 1680. Con una granja encalada, techo de paja, cerca de madera y campos circundantes. Tal granja podría haber sido arrendada por Hubert Deleforge y Antoinette Follet con su dote de 800 libras parisis.",
    descriptionDE: "Ein typischer flämischer Pachthof von etwa 2,5 Hektar um 1680. Mit einem weiß getünchten Bauernhaus, Strohdach, Holzzaun und umliegenden Feldern. Einen solchen Hof hätten Hubert Deleforge und Antoinette Follet mit ihrer Mitgift von 800 Pfund Parisis pachten können.",
    year: "ca. 1680",
    category: "ai-generated",
    isAiGenerated: true
  },
  // Nieuwe illustraties uit de Stamouders sectie
  {
    id: 40,
    src: boerenhuisInterieur,
    titleNL: "Vlaams Boerenhuis Interieur",
    titleFR: "Intérieur de Maison Paysanne Flamande",
    titleEN: "Flemish Farmhouse Interior",
    titleES: "Interior de Casa de Campo Flamenca",
    titleDE: "Flämisches Bauernhaus Interieur",
    descriptionNL: "Interieur van een typisch 17e-eeuws Vlaams boerenhuis. De meeste huizen waren van leem en hout, met strodaken. Zij bestonden uit één of twee vertrekken, waarin het hele gezin leefde, at en sliep. De keuken was het hart van het huis.",
    descriptionFR: "Intérieur d'une maison paysanne flamande typique du XVIIe siècle. La plupart des maisons étaient en torchis et en bois, avec des toits de chaume. Elles se composaient d'une ou deux pièces où toute la famille vivait, mangeait et dormait.",
    descriptionEN: "Interior of a typical 17th-century Flemish farmhouse. Most houses were made of clay and wood, with thatched roofs. They consisted of one or two rooms where the whole family lived, ate and slept. The kitchen was the heart of the home.",
    descriptionES: "Interior de una típica casa de campo flamenca del siglo XVII. La mayoría de las casas eran de barro y madera, con techos de paja. Constaban de una o dos habitaciones donde toda la familia vivía, comía y dormía.",
    descriptionDE: "Innenansicht eines typischen flämischen Bauernhauses aus dem 17. Jahrhundert. Die meisten Häuser waren aus Lehm und Holz mit Strohdächern. Sie bestanden aus ein oder zwei Räumen, in denen die ganze Familie lebte, aß und schlief. Die Küche war das Herz des Hauses.",
    year: "ca. 1685",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 41,
    src: vlaamseMarkt,
    titleNL: "Vlaamse Markt (17e eeuw)",
    titleFR: "Marché Flamand (XVIIe siècle)",
    titleEN: "Flemish Market (17th century)",
    titleES: "Mercado Flamenco (Siglo XVII)",
    titleDE: "Flämischer Markt (17. Jahrhundert)",
    descriptionNL: "De markt in de Châtellenie de Lille rond 1685. De economie van de streek steunde op landbouw, textielproductie en ambachten. Hier werden graan, vlas, hop en andere producten verhandeld.",
    descriptionFR: "Le marché dans la Châtellenie de Lille vers 1685. L'économie de la région reposait sur l'agriculture, la production textile et l'artisanat. On y échangeait du grain, du lin, du houblon et d'autres produits.",
    descriptionEN: "The market in the Châtellenie de Lille around 1685. The economy of the region was based on agriculture, textile production and crafts. Grain, flax, hops and other products were traded here.",
    descriptionES: "El mercado en la Castellanía de Lille alrededor de 1685. La economía de la región se basaba en la agricultura, la producción textil y la artesanía. Aquí se comerciaba grano, lino, lúpulo y otros productos.",
    descriptionDE: "Der Markt in der Kastellanei von Lille um 1685. Die Wirtschaft der Region stützte sich auf Landwirtschaft, Textilproduktion und Handwerk. Hier wurden Getreide, Flachs, Hopfen und andere Produkte gehandelt.",
    year: "ca. 1685",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 42,
    src: vlaamseMaaltijd,
    titleNL: "Typische Vlaamse Maaltijd",
    titleFR: "Repas Flamand Typique",
    titleEN: "Typical Flemish Meal",
    titleES: "Comida Flamenca Típica",
    titleDE: "Typische flämische Mahlzeit",
    descriptionNL: "Een typische maaltijd in de 17e eeuw. Het dieet bestond voornamelijk uit brood, bonen, erwten, kool en spek. Vlees was een luxe, voorbehouden aan feestdagen. Bier was de dagelijkse drank — veiliger dan water.",
    descriptionFR: "Un repas typique au XVIIe siècle. Le régime alimentaire se composait principalement de pain, haricots, pois, chou et lard. La viande était un luxe, réservé aux jours de fête. La bière était la boisson quotidienne — plus sûre que l'eau.",
    descriptionEN: "A typical meal in the 17th century. The diet consisted mainly of bread, beans, peas, cabbage and bacon. Meat was a luxury, reserved for holidays. Beer was the daily drink — safer than water.",
    descriptionES: "Una comida típica en el siglo XVII. La dieta consistía principalmente en pan, judías, guisantes, col y tocino. La carne era un lujo, reservado para los días festivos. La cerveza era la bebida diaria — más segura que el agua.",
    descriptionDE: "Eine typische Mahlzeit im 17. Jahrhundert. Die Ernährung bestand hauptsächlich aus Brot, Bohnen, Erbsen, Kohl und Speck. Fleisch war ein Luxus, der Feiertagen vorbehalten war. Bier war das tägliche Getränk — sicherer als Wasser.",
    year: "ca. 1685",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 43,
    src: dorpspleinZondagsmis,
    titleNL: "Dorpsplein na de Zondagsmis",
    titleFR: "Place du Village après la Messe du Dimanche",
    titleEN: "Village Square after Sunday Mass",
    titleES: "Plaza del Pueblo después de la Misa del Domingo",
    titleDE: "Dorfplatz nach der Sonntagsmesse",
    descriptionNL: "De zondag was de dag van de kerk en van de gemeenschap. Na de mis verzamelden de dorpelingen zich op het plein, waar nieuws werd uitgewisseld, zaken werden gedaan en huwelijken werden besproken.",
    descriptionFR: "Le dimanche était le jour de l'église et de la communauté. Après la messe, les villageois se rassemblaient sur la place où l'on échangeait des nouvelles, faisait des affaires et discutait des mariages.",
    descriptionEN: "Sunday was the day of church and community. After mass, the villagers gathered on the square, where news was exchanged, business was done and marriages were discussed.",
    descriptionES: "El domingo era el día de la iglesia y de la comunidad. Después de la misa, los aldeanos se reunían en la plaza, donde se intercambiaban noticias, se hacían negocios y se discutían matrimonios.",
    descriptionDE: "Der Sonntag war der Tag der Kirche und der Gemeinschaft. Nach der Messe versammelten sich die Dorfbewohner auf dem Platz, wo Neuigkeiten ausgetauscht, Geschäfte gemacht und Hochzeiten besprochen wurden.",
    year: "ca. 1685",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 44,
    src: kerkMis,
    titleNL: "Katholieke Kerkdienst",
    titleFR: "Messe Catholique",
    titleEN: "Catholic Church Service",
    titleES: "Misa Católica",
    titleDE: "Katholischer Gottesdienst",
    descriptionNL: "Kerkdienst in Vlaanderen, 17e eeuw. Na 1685 werd religieuze tolerantie afgeschaft met het Edict van Fontainebleau. De kerk werd een instrument van controle en de bisschop kreeg uitgebreide bevoegdheden.",
    descriptionFR: "Messe en Flandre, XVIIe siècle. Après 1685, la tolérance religieuse fut abolie par l'Édit de Fontainebleau. L'église devint un instrument de contrôle et l'évêque reçut des pouvoirs étendus.",
    descriptionEN: "Church service in Flanders, 17th century. After 1685, religious tolerance was abolished with the Edict of Fontainebleau. The church became an instrument of control and the bishop received extensive powers.",
    descriptionES: "Misa en Flandes, siglo XVII. Después de 1685, la tolerancia religiosa fue abolida con el Edicto de Fontainebleau. La iglesia se convirtió en instrumento de control y el obispo recibió amplios poderes.",
    descriptionDE: "Gottesdienst in Flandern, 17. Jahrhundert. Nach 1685 wurde die religiöse Toleranz mit dem Edikt von Fontainebleau abgeschafft. Die Kirche wurde zum Kontrollinstrument und der Bischof erhielt weitreichende Befugnisse.",
    year: "ca. 1685",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 45,
    src: schoolVerfransing,
    titleNL: "Taalonderdrukking in Scholen",
    titleFR: "Répression Linguistique dans les Écoles",
    titleEN: "Language Suppression in Schools",
    titleES: "Represión Lingüística en las Escuelas",
    titleDE: "Sprachunterdrückung in Schulen",
    descriptionNL: "'Parlez français': Vlaamse kinderen werden gestraft voor het spreken van hun moedertaal. Het signe-systeem was een vernederend instrument waarbij kinderen een houten bord om de nek kregen als ze Vlaams spraken.",
    descriptionFR: "'Parlez français' : les enfants flamands étaient punis pour avoir parlé leur langue maternelle. Le système du 'signe' était un instrument humiliant où les enfants recevaient une plaque en bois autour du cou s'ils parlaient flamand.",
    descriptionEN: "'Parlez français': Flemish children were punished for speaking their native language. The 'signe' system was a humiliating instrument where children received a wooden sign around their neck if they spoke Flemish.",
    descriptionES: "'Parlez français': los niños flamencos eran castigados por hablar su lengua materna. El sistema del 'signo' era un instrumento humillante donde los niños recibían un cartel de madera alrededor del cuello si hablaban flamenco.",
    descriptionDE: "'Parlez français': Flämische Kinder wurden bestraft, wenn sie ihre Muttersprache sprachen. Das 'Signe'-System war ein demütigendes Instrument, bei dem Kinder ein Holzschild um den Hals bekamen, wenn sie Flämisch sprachen.",
    year: "19e eeuw",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 46,
    src: standenmaatschappij,
    titleNL: "De Standenmaatschappij",
    titleFR: "La Société d'Ordres",
    titleEN: "The Class Society",
    titleES: "La Sociedad Estamental",
    titleDE: "Die Ständegesellschaft",
    descriptionNL: "De maatschappij rond Rijsel was streng hiërarchisch geordend. Aan de top stonden de adel en de hogere geestelijkheid, gevolgd door de rijke kooplieden. De familie Deleforge behoorde tot de zelfstandige ambachtslieden.",
    descriptionFR: "La société autour de Lille était strictement hiérarchisée. Au sommet se trouvaient la noblesse et le haut clergé, suivis des riches marchands. La famille Deleforge appartenait aux artisans indépendants.",
    descriptionEN: "Society around Lille was strictly hierarchically ordered. At the top were the nobility and higher clergy, followed by wealthy merchants. The Deleforge family belonged to the independent craftsmen.",
    descriptionES: "La sociedad alrededor de Lille estaba estrictamente ordenada jerárquicamente. En la cima estaban la nobleza y el alto clero, seguidos por los ricos comerciantes. La familia Deleforge pertenecía a los artesanos independientes.",
    descriptionDE: "Die Gesellschaft um Lille war streng hierarchisch geordnet. An der Spitze standen der Adel und der höhere Klerus, gefolgt von wohlhabenden Kaufleuten. Die Familie Deleforge gehörte zu den selbständigen Handwerkern.",
    year: "ca. 1685",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 47,
    src: lodewijkXivLeger,
    titleNL: "Lodewijk XIV en zijn Leger",
    titleFR: "Louis XIV et son Armée",
    titleEN: "Louis XIV and his Army",
    titleES: "Luis XIV y su Ejército",
    titleDE: "Ludwig XIV. und seine Armee",
    descriptionNL: "De legers van Lodewijk XIV veroverden Frans-Vlaanderen in 1668. De Vrede van Aken droeg het gebied over aan Frankrijk. Dit betekende een complete omwenteling: de taal van de rechtbanken veranderde, nieuwe belastingen werden ingevoerd en Franse ambtenaren vervingen de lokale bestuurders.",
    descriptionFR: "Les armées de Louis XIV ont conquis la Flandre française en 1668. Le Traité d'Aix-la-Chapelle a transféré le territoire à la France. Cela a signifié un bouleversement complet : la langue des tribunaux a changé, de nouveaux impôts ont été instaurés et des fonctionnaires français ont remplacé les administrateurs locaux.",
    descriptionEN: "The armies of Louis XIV conquered French Flanders in 1668. The Treaty of Aix-la-Chapelle transferred the territory to France. This meant a complete upheaval: the language of the courts changed, new taxes were introduced, and French officials replaced local administrators.",
    descriptionES: "Los ejércitos de Luis XIV conquistaron Flandes francés en 1668. El Tratado de Aquisgrán transfirió el territorio a Francia. Esto significó una revolución completa: el idioma de los tribunales cambió, se introdujeron nuevos impuestos y los funcionarios franceses reemplazaron a los administradores locales.",
    descriptionDE: "Die Armeen Ludwigs XIV. eroberten Französisch-Flandern im Jahr 1668. Der Frieden von Aachen übertrug das Gebiet an Frankreich. Dies bedeutete einen vollständigen Umbruch: Die Sprache der Gerichte änderte sich, neue Steuern wurden eingeführt und französische Beamte ersetzten die lokalen Verwalter.",
    year: "1668",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 48,
    src: mineurGenie,
    titleNL: "Mineur van de Genie (1877-1880)",
    titleFR: "Mineur du Génie (1877-1880)",
    titleEN: "Military Engineer Miner (1877-1880)",
    titleES: "Minero del Cuerpo de Ingenieros (1877-1880)",
    titleDE: "Pionier-Mineur (1877-1880)",
    descriptionNL: "Charles Louis Deforce diende van oktober 1877 tot september 1880 bij het regiment van de genie als 'mineur de 1e classe'. Een mineur was gespecialiseerd in het graven van loopgraven, het aanleggen van mijngangen en het ondermijnen van vijandelijke stellingen. De soldij bedroeg aanvankelijk 30, later 33 centimen per dag.",
    descriptionFR: "Charles Louis Deforce a servi d'octobre 1877 à septembre 1880 au régiment du génie comme 'mineur de 1re classe'. Un mineur était spécialisé dans le creusement de tranchées, la construction de galeries de mine et le minage des positions ennemies. La solde était initialement de 30, puis 33 centimes par jour.",
    descriptionEN: "Charles Louis Deforce served from October 1877 to September 1880 in the engineer regiment as 'mineur de 1e classe'. A miner specialized in digging trenches, constructing mine tunnels and undermining enemy positions. The pay was initially 30, later 33 centimes per day.",
    descriptionES: "Charles Louis Deforce sirvió de octubre de 1877 a septiembre de 1880 en el regimiento de ingenieros como 'mineur de 1e classe'. Un minero se especializaba en cavar trincheras, construir túneles de minas y minar posiciones enemigas. El sueldo era inicialmente de 30, luego 33 céntimos por día.",
    descriptionDE: "Charles Louis Deforce diente von Oktober 1877 bis September 1880 beim Pionierregiment als 'Mineur 1. Klasse'. Ein Mineur war spezialisiert auf das Graben von Schützengräben, den Bau von Minengängen und das Unterminieren feindlicher Stellungen. Der Sold betrug anfänglich 30, später 33 Centimes pro Tag.",
    year: "1877-1880",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 49,
    src: huwelijksceremonieNotaris,
    titleNL: "Huwelijksceremonie bij de Notaris",
    titleFR: "Cérémonie de Mariage chez le Notaire",
    titleEN: "Marriage Ceremony at the Notary",
    titleES: "Ceremonia de Matrimonio ante el Notario",
    titleDE: "Hochzeitszeremonie beim Notar",
    descriptionNL: "Op 18 april 1685 trouwden Hubert Deleforge en Antoinette Follet voor notaris Jacques Anselme Le Francq te Lille. Het huwelijkscontract volgde de coutume de Lille, een rechtsstelsel dat meer bescherming bood aan vrouwen. Beide families brachten elk 400 pond parisis als bruidsschat in.",
    descriptionFR: "Le 18 avril 1685, Hubert Deleforge et Antoinette Follet se sont mariés devant le notaire Jacques Anselme Le Francq à Lille. Le contrat de mariage suivait la coutume de Lille, un système juridique qui offrait plus de protection aux femmes. Les deux familles ont chacune apporté 400 livres parisis comme dot.",
    descriptionEN: "On April 18, 1685, Hubert Deleforge and Antoinette Follet married before notary Jacques Anselme Le Francq in Lille. The marriage contract followed the coutume de Lille, a legal system that offered more protection to women. Both families each brought 400 pounds parisis as dowry.",
    descriptionES: "El 18 de abril de 1685, Hubert Deleforge y Antoinette Follet se casaron ante el notario Jacques Anselme Le Francq en Lille. El contrato matrimonial seguía la costumbre de Lille, un sistema legal que ofrecía más protección a las mujeres. Ambas familias aportaron cada una 400 libras parisis como dote.",
    descriptionDE: "Am 18. April 1685 heirateten Hubert Deleforge und Antoinette Follet vor Notar Jacques Anselme Le Francq in Lille. Der Ehevertrag folgte der 'coutume de Lille', einem Rechtssystem, das Frauen mehr Schutz bot. Beide Familien brachten je 400 Pfund Parisis als Mitgift ein.",
    year: "1685",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 50,
    src: bestormingBastille,
    titleNL: "De Bestorming van de Bastille",
    titleFR: "La Prise de la Bastille",
    titleEN: "The Storming of the Bastille",
    titleES: "La Toma de la Bastilla",
    titleDE: "Der Sturm auf die Bastille",
    descriptionNL: "Op 14 juli 1789 bestormde het Parijse volk de Bastille, een gevangenis die symbool stond voor het absolutisme. Dit werd het beginpunt van de Franse Revolutie. De gevolgen waren ingrijpend voor Frans-Vlaanderen: kerkelijke goederen werden geconfisqueerd, de adel verloor zijn privileges, en de verfransing werd systematisch doorgevoerd.",
    descriptionFR: "Le 14 juillet 1789, le peuple parisien a pris d'assaut la Bastille, une prison symbole de l'absolutisme. Ce fut le point de départ de la Révolution française. Les conséquences furent profondes pour la Flandre française : les biens de l'Église furent confisqués, la noblesse perdit ses privilèges, et la francisation fut systématiquement mise en œuvre.",
    descriptionEN: "On July 14, 1789, the Parisian people stormed the Bastille, a prison that symbolized absolutism. This became the starting point of the French Revolution. The consequences were profound for French Flanders: church property was confiscated, the nobility lost its privileges, and Frenchification was systematically implemented.",
    descriptionES: "El 14 de julio de 1789, el pueblo parisino asaltó la Bastilla, una prisión que simbolizaba el absolutismo. Este se convirtió en el punto de partida de la Revolución Francesa. Las consecuencias fueron profundas para Flandes francés: los bienes de la Iglesia fueron confiscados, la nobleza perdió sus privilegios y la francesización se implementó sistemáticamente.",
    descriptionDE: "Am 14. Juli 1789 stürmte das Pariser Volk die Bastille, ein Gefängnis, das den Absolutismus symbolisierte. Dies wurde zum Ausgangspunkt der Französischen Revolution. Die Folgen waren tiefgreifend für Französisch-Flandern: Kirchengüter wurden konfisziert, der Adel verlor seine Privilegien und die Französisierung wurde systematisch durchgeführt.",
    year: "1789",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 51,
    src: loekiHond,
    titleNL: "Loeki de hond",
    titleFR: "Loeki le chien",
    titleEN: "Loeki the dog",
    titleES: "Loeki el perro",
    titleDE: "Loeki der Hund",
    titleSV: "Loeki hunden",
    descriptionNL: "De hond van Peter Marcel: een nijdige keffer genaamd Loeki. Hij was Peters lieveling maar joeg de kleinkinderen regelmatig schrik aan met zijn geblaf.",
    descriptionFR: "Le chien de Peter Marcel : un petit chien hargneux nommé Loeki. C'était le favori de Peter mais il faisait régulièrement peur aux petits-enfants avec ses aboiements.",
    descriptionEN: "Peter Marcel's dog: a snappy little dog named Loeki. He was Peter's favorite but regularly scared the grandchildren with his barking.",
    descriptionES: "El perro del abuelo Marcel: un perrito gruñón llamado Loeki. Era el favorito del abuelo pero asustaba regularmente a los nietos con sus ladridos.",
    descriptionDE: "Großvater Marcels Hund: ein bissiger kleiner Hund namens Loeki. Er war Peters Liebling, aber erschreckte die Enkelkinder regelmäßig mit seinem Bellen.",
    year: "ca. 1950",
    category: "familie",
    isAiGenerated: true
  },
  {
    id: 52,
    src: marcelSoldaat,
    titleNL: "Marcel Deforce als soldaat",
    titleFR: "Marcel Deforce en soldat",
    titleEN: "Marcel Deforce as soldier",
    titleES: "Marcel Deforce como soldado",
    titleDE: "Marcel Deforce als Soldat",
    titleSV: "Marcel Deforce som soldat",
    descriptionNL: "Marcel Deforce in militair uniform. Hij was soldaat van de lichting 1914 maar werd pas in 1919 opgeroepen. Hij diende bij de Belgische bezettingstroepen in Duitsland als 'maître d'chevaux' bij het 6e Regiment Artillerie.",
    descriptionFR: "Marcel Deforce en uniforme militaire. Il était soldat de la classe 1914 mais n'a été appelé qu'en 1919. Il a servi dans les forces d'occupation belges en Allemagne comme 'maître d'chevaux' au 6e Régiment d'Artillerie.",
    descriptionEN: "Marcel Deforce in military uniform. He was a soldier of the 1914 class but was only called up in 1919. He served in the Belgian occupation forces in Germany as 'master of horses' in the 6th Artillery Regiment.",
    descriptionES: "Marcel Deforce en uniforme militar. Era soldado de la clase de 1914 pero solo fue llamado en 1919. Sirvió en las fuerzas de ocupación belgas en Alemania como 'maestro de caballos' en el 6º Regimiento de Artillería.",
    descriptionDE: "Marcel Deforce in Militäruniform. Er war Soldat des Jahrgangs 1914, wurde aber erst 1919 einberufen. Er diente bei den belgischen Besatzungstruppen in Deutschland als 'Pferdeführer' beim 6. Artillerieregiment.",
    year: "1919",
    category: "portret"
  },
  {
    id: 53,
    src: portretkader1915,
    titleNL: "Portretkader - Meesterwerk 1915",
    titleFR: "Cadre portrait - Chef-d'œuvre 1915",
    titleEN: "Portrait Frame - Masterpiece 1915",
    titleES: "Marco de retrato - Obra maestra 1915",
    titleDE: "Porträtrahmen - Meisterwerk 1915",
    titleSV: "Porträttram - Mästerverk 1915",
    descriptionNL: "Op 21-jarige leeftijd produceerde Marcel zijn eerste meesterwerk: een imposant handgesculpteerd houten portretkader in massieve eik. Afmetingen: 1 m hoog, 70 cm breed, 12 kg. De iconografie toont een klassieke urn geflankeerd door putti.",
    descriptionFR: "À 21 ans, Marcel a produit son premier chef-d'œuvre : un imposant cadre portrait sculpté à la main en chêne massif. Dimensions : 1 m de haut, 70 cm de large, 12 kg. L'iconographie montre une urne classique flanquée de putti.",
    descriptionEN: "At age 21, Marcel produced his first masterpiece: an impressive hand-carved portrait frame in solid oak. Dimensions: 1 m high, 70 cm wide, 12 kg. The iconography shows a classical urn flanked by putti.",
    descriptionES: "A los 21 años, Marcel produjo su primera obra maestra: un impresionante marco de retrato tallado a mano en roble macizo. Dimensiones: 1 m de alto, 70 cm de ancho, 12 kg. La iconografía muestra una urna clásica flanqueada por putti.",
    descriptionDE: "Mit 21 Jahren schuf Marcel sein erstes Meisterwerk: einen beeindruckenden handgeschnitzten Porträtrahmen aus massiver Eiche. Maße: 1 m hoch, 70 cm breit, 12 kg. Die Ikonographie zeigt eine klassische Urne, flankiert von Putten.",
    year: "1915",
    category: "beroep"
  },
  {
    id: 54,
    src: juwelenkistje,
    titleNL: "Juwelenkistje voor Madeleine",
    titleFR: "Coffret à bijoux pour Madeleine",
    titleEN: "Jewelry box for Madeleine",
    titleES: "Joyero para Madeleine",
    titleDE: "Schmuckkästchen für Madeleine",
    titleSV: "Smyckeskrin för Madeleine",
    descriptionNL: "Om het hart van Madeleine Geldof te bekoren maakte Marcel dit kunstig versierde juwelenkistje als cadeau tijdens hun verkeringstijd.",
    descriptionFR: "Pour conquérir le cœur de Madeleine Geldof, Marcel a fabriqué ce coffret à bijoux artistiquement décoré comme cadeau pendant leurs fiançailles.",
    descriptionEN: "To win the heart of Madeleine Geldof, Marcel made this artfully decorated jewelry box as a gift during their courtship.",
    descriptionES: "Para conquistar el corazón de Madeleine Geldof, Marcel hizo este joyero artísticamente decorado como regalo durante su noviazgo.",
    descriptionDE: "Um das Herz von Madeleine Geldof zu gewinnen, fertigte Marcel dieses kunstvoll verzierte Schmuckkästchen als Geschenk während ihrer Verlobungszeit.",
    year: "ca. 1915",
    category: "beroep"
  },
  {
    id: 56,
    src: mobilisatieZakboekjeBinnen,
    titleNL: "Mobilisatiezakboekje - Binnenkant",
    titleFR: "Livret de Mobilisation - Intérieur",
    titleEN: "Mobilization Booklet - Inside",
    titleES: "Libreta de Movilización - Interior",
    titleDE: "Mobilisierungsheft - Innenseite",
    titleSV: "Mobiliseringshäfte - Insida",
    descriptionNL: "Binnenpagina van het mobilisatiezakboekje met persoonlijke gegevens van Marcel Deforce en details over zijn militaire dienst.",
    descriptionFR: "Page intérieure du livret de mobilisation avec les données personnelles de Marcel Deforce et les détails de son service militaire.",
    descriptionEN: "Inside page of the mobilization booklet with personal data of Marcel Deforce and details of his military service.",
    descriptionES: "Página interior de la libreta de movilización con datos personales de Marcel Deforce y detalles de su servicio militar.",
    descriptionDE: "Innenseite des Mobilisierungshefts mit persönlichen Daten von Marcel Deforce und Details seines Militärdienstes.",
    year: "1919",
    category: "document"
  },
  {
    id: 57,
    src: mobilisatieZakboekje2,
    titleNL: "Mobilisatiezakboekje - Pagina 2",
    titleFR: "Livret de Mobilisation - Page 2",
    titleEN: "Mobilization Booklet - Page 2",
    titleES: "Libreta de Movilización - Página 2",
    titleDE: "Mobilisierungsheft - Seite 2",
    titleSV: "Mobiliseringshäfte - Sida 2",
    descriptionNL: "Tweede pagina van het mobilisatiezakboekje met aanvullende informatie over Marcels legerdienst bij het 6e Regiment Artillerie.",
    descriptionFR: "Deuxième page du livret de mobilisation avec des informations supplémentaires sur le service militaire de Marcel au 6e Régiment d'Artillerie.",
    descriptionEN: "Second page of the mobilization booklet with additional information about Marcel's military service in the 6th Artillery Regiment.",
    descriptionES: "Segunda página de la libreta de movilización con información adicional sobre el servicio militar de Marcel en el 6º Regimiento de Artillería.",
    descriptionDE: "Zweite Seite des Mobilisierungshefts mit zusätzlichen Informationen über Marcels Militärdienst beim 6. Artillerieregiment.",
    year: "1919",
    category: "document"
  },
  {
    id: 58,
    src: fotoDochtertje1919,
    titleNL: "Foto dochtertje Maria (1919)",
    titleFR: "Photo de la petite Maria (1919)",
    titleEN: "Photo of little daughter Maria (1919)",
    titleES: "Foto de la pequeña María (1919)",
    titleDE: "Foto der kleinen Tochter Maria (1919)",
    titleSV: "Foto av lilla dottern Maria (1919)",
    descriptionNL: "Een ontroerende foto die Madeleine naar Marcel stuurde tijdens zijn legerdienst in 1919. Hun dochtertje Maria was toen nog klein.",
    descriptionFR: "Une photo émouvante que Madeleine a envoyée à Marcel pendant son service militaire en 1919. Leur petite fille Maria était encore toute petite.",
    descriptionEN: "A touching photo that Madeleine sent to Marcel during his military service in 1919. Their little daughter Maria was still small then.",
    descriptionES: "Una foto conmovedora que Madeleine envió a Marcel durante su servicio militar en 1919. Su pequeña hija María aún era pequeña entonces.",
    descriptionDE: "Ein rührendes Foto, das Madeleine Marcel während seines Militärdienstes 1919 schickte. Ihre kleine Tochter Maria war damals noch klein.",
    year: "1919",
    category: "familie"
  },
  {
    id: 62,
    src: reclamestandVakmanschap,
    titleNL: "Reclamestand met vakmanschap",
    titleFR: "Stand publicitaire avec artisanat",
    titleEN: "Advertising stand with craftsmanship",
    titleES: "Stand publicitario con artesanía",
    titleDE: "Werbestand mit Handwerkskunst",
    titleSV: "Reklammonter med hantverk",
    descriptionNL: "Een présentoir op een tentoonstelling met voorbeelden van vakmanschap. Al deze elementen werden later in 1945 geïntegreerd in de woonkamer van het nieuwe huis aan de Vandenbogaerdelaan 27.",
    descriptionFR: "Un présentoir lors d'une exposition avec des exemples d'artisanat. Tous ces éléments ont été intégrés plus tard en 1945 dans le salon de la nouvelle maison au Vandenbogaerdelaan 27.",
    descriptionEN: "A display stand at an exhibition with examples of craftsmanship. All these elements were later integrated in 1945 into the living room of the new house at Vandenbogaerdelaan 27.",
    descriptionES: "Un expositor en una exposición con ejemplos de artesanía. Todos estos elementos fueron integrados más tarde en 1945 en la sala de estar de la nueva casa en Vandenbogaerdelaan 27.",
    descriptionDE: "Ein Ausstellungsstand auf einer Messe mit Beispielen für Handwerkskunst. Alle diese Elemente wurden später 1945 in das Wohnzimmer des neuen Hauses am Vandenbogaerdelaan 27 integriert.",
    year: "ca. 1930-1940",
    category: "beroep"
  },
  {
    id: 63,
    src: emilePortrait,
    titleNL: "Emile Geldof",
    titleFR: "Émile Geldof",
    titleEN: "Emile Geldof",
    titleES: "Emile Geldof",
    titleDE: "Emile Geldof",
    titleSV: "Emile Geldof",
    descriptionNL: "Portret van overgrootvader Emile Geldof (1865–1951), vader van grootmoeder Magdalena 'Madeleine' Geldof. Hij was wijntapper van beroep en woonde in de wijk Bosmolens te Izegem.",
    descriptionFR: "Portrait de l'arrière-grand-père Émile Geldof (1865–1951), père de grand-mère Magdalena 'Madeleine' Geldof. Il était cabaretier de vin et habitait dans le quartier Bosmolens à Izegem.",
    descriptionEN: "Portrait of great-grandfather Emile Geldof (1865–1951), father of grandmother Magdalena 'Madeleine' Geldof. He was a wine tapper by profession and lived in the Bosmolens district of Izegem.",
    descriptionES: "Retrato del bisabuelo Emile Geldof (1865–1951), padre de la abuela Magdalena 'Madeleine' Geldof. Era tabernero de vinos de profesión y vivía en el barrio Bosmolens de Izegem.",
    descriptionDE: "Porträt des Urgroßvaters Emile Geldof (1865–1951), Vater von Großmutter Magdalena 'Madeleine' Geldof. Er war Weinhändler von Beruf und wohnte im Viertel Bosmolens in Izegem.",
    year: "ca. 1920",
    category: "portret"
  },
  {
    id: 64,
    src: gezinEmileGeldof,
    titleNL: "Gezin Emile Geldof",
    titleFR: "Famille Émile Geldof",
    titleEN: "Emile Geldof Family",
    titleES: "Familia Emile Geldof",
    titleDE: "Familie Emile Geldof",
    titleSV: "Familjen Emile Geldof",
    descriptionNL: "Een unieke gezinsfoto van Emile Geldof & Maria-Theresia Vanderheeren met hun kinderen en schoonzoon Marcel Deforce. Deze foto moet genomen zijn eind 1918 of begin 1919. Dochtertje Maria van Marcel en Magdalena zit op moeders schoot.",
    descriptionFR: "Une photo de famille unique d'Émile Geldof & Maria-Theresia Vanderheeren avec leurs enfants et leur gendre Marcel Deforce. Cette photo date probablement de fin 1918 ou début 1919. La petite Maria de Marcel et Magdalena est sur les genoux de sa mère.",
    descriptionEN: "A unique family photo of Emile Geldof & Maria-Theresia Vanderheeren with their children and son-in-law Marcel Deforce. This photo was taken late 1918 or early 1919. Little Maria of Marcel and Magdalena sits on her mother's lap.",
    descriptionES: "Una foto familiar única de Emile Geldof & Maria-Theresia Vanderheeren con sus hijos y yerno Marcel Deforce. Esta foto fue tomada a finales de 1918 o principios de 1919. La pequeña María de Marcel y Magdalena está en el regazo de su madre.",
    descriptionDE: "Ein einzigartiges Familienfoto von Emile Geldof & Maria-Theresia Vanderheeren mit ihren Kindern und Schwiegersohn Marcel Deforce. Dieses Foto wurde Ende 1918 oder Anfang 1919 aufgenommen. Die kleine Maria von Marcel und Magdalena sitzt auf dem Schoß ihrer Mutter.",
    year: "1918-1919",
    category: "familie",
    isAiGenerated: true
  },
  {
    id: 65,
    src: familieGeldofNonnen,
    titleNL: "Familie Geldof met kloosterzusters",
    titleFR: "Famille Geldof avec religieuses",
    titleEN: "Geldof family with nuns",
    titleES: "Familia Geldof con monjas",
    titleDE: "Familie Geldof mit Ordensschwestern",
    titleSV: "Familjen Geldof med nunnor",
    descriptionNL: "De zussen Leonie en Sylvie Geldof als kloosterzusters, met Emile rechts en zijn broer Henry links. Magdalena (Grote Meter) staat in het midden.",
    descriptionFR: "Les sœurs Leonie et Sylvie Geldof comme religieuses, avec Émile à droite et son frère Henry à gauche. Magdalena (Grande Mémé) est au centre.",
    descriptionEN: "Sisters Leonie and Sylvie Geldof as nuns, with Emile on the right and his brother Henry on the left. Magdalena (Great-grandmother) stands in the middle.",
    descriptionES: "Las hermanas Leonie y Sylvie Geldof como monjas, con Emile a la derecha y su hermano Henry a la izquierda. Magdalena (Bisabuela) está en el centro.",
    descriptionDE: "Die Schwestern Leonie und Sylvie Geldof als Ordensschwestern, mit Emile rechts und seinem Bruder Henry links. Magdalena (Urgroßmutter) steht in der Mitte.",
    year: "ca. 1930",
    category: "familie"
  },
  {
    id: 66,
    src: huwelijksakteGeldof,
    titleNL: "Huwelijksakte Geldof 1893",
    titleFR: "Acte de mariage Geldof 1893",
    titleEN: "Marriage Certificate Geldof 1893",
    titleES: "Acta de matrimonio Geldof 1893",
    titleDE: "Heiratsurkunde Geldof 1893",
    titleSV: "Vigselbevis Geldof 1893",
    descriptionNL: "De huwelijksakte van Emile Geldof met zijn eerste vrouw Marie-Louise d'Artois uit april 1892. In deze akte wordt zijn beroep als 'wijntapper' vermeld en zij als 'wascheres' (wasvrouw).",
    descriptionFR: "L'acte de mariage d'Émile Geldof avec sa première épouse Marie-Louise d'Artois d'avril 1892. Dans cet acte, son métier est mentionné comme 'cabaretier' et elle comme 'laveuse'.",
    descriptionEN: "The marriage certificate of Emile Geldof with his first wife Marie-Louise d'Artois from April 1892. In this certificate, his profession is mentioned as 'wine tapper' and she as 'laundress'.",
    descriptionES: "El acta de matrimonio de Emile Geldof con su primera esposa Marie-Louise d'Artois de abril de 1892. En este documento, su profesión se menciona como 'tabernero de vinos' y ella como 'lavandera'.",
    descriptionDE: "Die Heiratsurkunde von Emile Geldof mit seiner ersten Frau Marie-Louise d'Artois vom April 1892. In dieser Urkunde wird sein Beruf als 'Weinhändler' und sie als 'Wäscherin' angegeben.",
    year: "1893",
    category: "document"
  },
  {
    id: 67,
    src: portretMarcel,
    titleNL: "Portret Marcel Deforce",
    titleFR: "Portrait Marcel Deforce",
    titleEN: "Portrait Marcel Deforce",
    titleES: "Retrato Marcel Deforce",
    titleDE: "Porträt Marcel Deforce",
    titleSV: "Porträtt Marcel Deforce",
    descriptionNL: "Portret van grootvader Marcel August Deforce (1893–1983). Hij was meubelmaker en houtsnijder van beroep. Als oudste kleinkind noemde ik hem 'Peter' (dooppeter).",
    descriptionFR: "Portrait du grand-père Marcel August Deforce (1893–1983). Il était ébéniste et sculpteur sur bois de métier. En tant qu'aîné des petits-enfants, je l'appelais 'Parrain'.",
    descriptionEN: "Portrait of grandfather Marcel August Deforce (1893–1983). He was a cabinetmaker and woodcarver by profession. As the eldest grandchild, I called him 'Godfather' (Peter).",
    descriptionES: "Retrato del abuelo Marcel August Deforce (1893–1983). Era ebanista y tallador de madera de profesión. Como nieto mayor, lo llamaba 'Padrino'.",
    descriptionDE: "Porträt des Großvaters Marcel August Deforce (1893–1983). Er war Möbelschreiner und Holzschnitzer von Beruf. Als ältester Enkel nannte ich ihn 'Pate' (Peter).",
    year: "ca. 1950",
    category: "portret",
    isAiGenerated: true
  },
  {
    id: 68,
    src: portretMagdalena,
    titleNL: "Portret Magdalena Geldof",
    titleFR: "Portrait Magdalena Geldof",
    titleEN: "Portrait Magdalena Geldof",
    titleES: "Retrato Magdalena Geldof",
    titleDE: "Porträt Magdalena Geldof",
    titleSV: "Porträtt Magdalena Geldof",
    descriptionNL: "Portret van grootmoeder Magdalena 'Madeleine' Geldof (1897–1971). Zij werd door iedereen 'Grote Meter' genoemd - een statige oma die altijd met veel gezag sprak.",
    descriptionFR: "Portrait de grand-mère Magdalena 'Madeleine' Geldof (1897–1971). Elle était appelée 'Grande Marraine' par tous - une grand-mère imposante qui parlait toujours avec beaucoup d'autorité.",
    descriptionEN: "Portrait of grandmother Magdalena 'Madeleine' Geldof (1897–1971). She was called 'Great Godmother' by everyone - a stately grandmother who always spoke with great authority.",
    descriptionES: "Retrato de la abuela Magdalena 'Madeleine' Geldof (1897–1971). Todos la llamaban 'Gran Madrina' - una abuela imponente que siempre hablaba con mucha autoridad.",
    descriptionDE: "Porträt der Großmutter Magdalena 'Madeleine' Geldof (1897–1971). Sie wurde von allen 'Große Patin' genannt - eine stattliche Großmutter, die immer mit großer Autorität sprach.",
    year: "ca. 1950",
    category: "portret",
    isAiGenerated: true
  },
  {
    id: 69,
    src: interieurPeterMeter,
    titleNL: "Interieur Peter en Meter",
    titleFR: "Intérieur Parrain et Marraine",
    titleEN: "Interior Godfather and Godmother",
    titleES: "Interior Padrino y Madrina",
    titleDE: "Interieur Pate und Patin",
    titleSV: "Interiör Gudfar och Gudmor",
    descriptionNL: "Het indrukwekkende interieur van het huis aan de Vandenbogaerdelaan waar Peter en Meter woonden. De woonkamer bevatte veel van Marcels handgemaakte meubels en houtsnijwerk.",
    descriptionFR: "L'intérieur impressionnant de la maison au Vandenbogaerdelaan où Parrain et Marraine habitaient. Le salon contenait beaucoup de meubles et sculptures sur bois faits main par Marcel.",
    descriptionEN: "The impressive interior of the house on Vandenbogaerdelaan where Godfather and Godmother lived. The living room contained many of Marcel's handmade furniture and woodcarvings.",
    descriptionES: "El impresionante interior de la casa en Vandenbogaerdelaan donde vivían Padrino y Madrina. La sala de estar contenía muchos de los muebles y tallas de madera hechos a mano por Marcel.",
    descriptionDE: "Das beeindruckende Interieur des Hauses am Vandenbogaerdelaan, wo Pate und Patin wohnten. Das Wohnzimmer enthielt viele von Marcels handgefertigten Möbeln und Holzschnitzereien.",
    year: "ca. 1955",
    category: "locatie",
    isAiGenerated: true
  },
  {
    id: 100,
    src: peterMeterPortret,
    titleNL: "Marcel Deforce en Magdalena Geldof",
    titleFR: "Marcel Deforce et Magdalena Geldof",
    titleEN: "Marcel Deforce and Magdalena Geldof",
    titleES: "Marcel Deforce y Magdalena Geldof",
    titleDE: "Marcel Deforce und Magdalena Geldof",
    titleSV: "Marcel Deforce och Magdalena Geldof",
    descriptionNL: "Portretfoto van Marcel Deforce en Magdalena Geldof, ook gekend als Peter en Meter, op latere leeftijd.",
    descriptionFR: "Portrait de Marcel Deforce et Magdalena Geldof, également connus comme Parrain et Marraine, à un âge avancé.",
    descriptionEN: "Portrait photo of Marcel Deforce and Magdalena Geldof, also known as Godfather and Godmother, in their later years.",
    descriptionES: "Foto de retrato de Marcel Deforce y Magdalena Geldof, también conocidos como Padrino y Madrina, en sus últimos años.",
    descriptionDE: "Porträtfoto von Marcel Deforce und Magdalena Geldof, auch bekannt als Pate und Patin, in ihren späteren Jahren.",
    descriptionSV: "Porträttfoto av Marcel Deforce och Magdalena Geldof, även kända som Gudfar och Gudmor, på äldre dagar.",
    year: "ca. 1960",
    category: "portret"
  },
  {
    id: 164,
    src: peterMeterPortretColor,
    titleNL: "Marcel Deforce en Magdalena Geldof (ingekleurd)",
    titleFR: "Marcel Deforce et Magdalena Geldof (colorisé)",
    titleEN: "Marcel Deforce and Magdalena Geldof (colorized)",
    titleES: "Marcel Deforce y Magdalena Geldof (coloreado)",
    titleDE: "Marcel Deforce und Magdalena Geldof (koloriert)",
    titleSV: "Marcel Deforce och Magdalena Geldof (kolorerad)",
    descriptionNL: "Ingekleurde versie van het portret van Marcel Deforce en Magdalena Geldof, ook gekend als Peter en Meter.",
    descriptionFR: "Version colorisée du portrait de Marcel Deforce et Magdalena Geldof, également connus comme Parrain et Marraine.",
    descriptionEN: "Colorized version of the portrait of Marcel Deforce and Magdalena Geldof, also known as Godfather and Godmother.",
    descriptionES: "Versión coloreada del retrato de Marcel Deforce y Magdalena Geldof, también conocidos como Padrino y Madrina.",
    descriptionDE: "Kolorierte Version des Porträts von Marcel Deforce und Magdalena Geldof, auch bekannt als Pate und Patin.",
    descriptionSV: "Kolorerad version av porträttet av Marcel Deforce och Magdalena Geldof, även kända som Gudfar och Gudmor.",
    year: "ca. 1960",
    category: "portret",
    isAiGenerated: true
  },
  {
    id: 101,
    src: blauweOpelColor,
    titleNL: "De blauwe Opel (ingekleurd)",
    titleFR: "L'Opel bleue (colorisée)",
    titleEN: "The Blue Opel (colorized)",
    titleES: "El Opel azul (coloreado)",
    titleDE: "Der blaue Opel (koloriert)",
    titleSV: "Den blå Opel (kolorerad)",
    descriptionNL: "Ingekleurde versie van de foto met de blauwe Opel bestelwagen van het familiebedrijf Deforce, ca. 1950.",
    descriptionFR: "Version colorisée de la photo avec le fourgon Opel bleu de l'entreprise familiale Deforce, vers 1950.",
    descriptionEN: "Colorized version of the photo with the blue Opel van of the Deforce family business, ca. 1950.",
    descriptionES: "Versión coloreada de la foto con la furgoneta Opel azul de la empresa familiar Deforce, ca. 1950.",
    descriptionDE: "Kolorierte Version des Fotos mit dem blauen Opel-Lieferwagen des Familienunternehmens Deforce, ca. 1950.",
    descriptionSV: "Kolorerad version av fotot med den blå Opel-skåpbilen från familjeföretaget Deforce, ca. 1950.",
    year: "ca. 1950",
    category: "beroep",
    isAiGenerated: true
  },
  {
    id: 70,
    src: stamboomMarcel,
    titleNL: "Stamboom Marcel Deforce",
    titleFR: "Arbre généalogique Marcel Deforce",
    titleEN: "Family Tree Marcel Deforce",
    titleES: "Árbol genealógico Marcel Deforce",
    titleDE: "Stammbaum Marcel Deforce",
    titleSV: "Släktträd Marcel Deforce",
    descriptionNL: "De stamboom van Marcel Deforce, met de voorouders die teruggaan tot de 17e eeuw in Frans-Vlaanderen. De stamboom toont de verbinding met de stamouders Hubert Deleforge en Antoinette Follet.",
    descriptionFR: "L'arbre généalogique de Marcel Deforce, avec les ancêtres remontant au 17e siècle en Flandre française. L'arbre montre le lien avec les ancêtres Hubert Deleforge et Antoinette Follet.",
    descriptionEN: "The family tree of Marcel Deforce, with ancestors going back to the 17th century in French Flanders. The tree shows the connection to the progenitors Hubert Deleforge and Antoinette Follet.",
    descriptionES: "El árbol genealógico de Marcel Deforce, con antepasados que se remontan al siglo XVII en Flandes francés. El árbol muestra la conexión con los progenitores Hubert Deleforge y Antoinette Follet.",
    descriptionDE: "Der Stammbaum von Marcel Deforce, mit Vorfahren, die bis ins 17. Jahrhundert in Französisch-Flandern zurückreichen. Der Stammbaum zeigt die Verbindung zu den Stammeltern Hubert Deleforge und Antoinette Follet.",
    year: "2024",
    category: "document"
  },
  {
    id: 71,
    src: mariaGeorges1923,
    titleNL: "Maria en Georges Deforce",
    titleFR: "Maria et Georges Deforce",
    titleEN: "Maria and Georges Deforce",
    titleES: "Maria y Georges Deforce",
    titleDE: "Maria und Georges Deforce",
    titleSV: "Maria och Georges Deforce",
    descriptionNL: "Studioportret van Maria en Georges Deforce, de twee oudste kinderen van Marcel en Magdalena Deforce. Maria (°1918) en Georges (°1921) poseren in typische jaren '20 kinderkleding.",
    descriptionFR: "Portrait de studio de Maria et Georges Deforce, les deux aînés des enfants de Marcel et Magdalena Deforce. Maria (°1918) et Georges (°1921) posent dans des vêtements typiques des années 1920.",
    descriptionEN: "Studio portrait of Maria and Georges Deforce, the two eldest children of Marcel and Magdalena Deforce. Maria (°1918) and Georges (°1921) pose in typical 1920s children's clothing.",
    descriptionES: "Retrato de estudio de Maria y Georges Deforce, los dos hijos mayores de Marcel y Magdalena Deforce. Maria (°1918) y Georges (°1921) posan con ropa típica de niños de los años 1920.",
    descriptionDE: "Studioporträt von Maria und Georges Deforce, den zwei ältesten Kindern von Marcel und Magdalena Deforce. Maria (°1918) und Georges (°1921) posieren in typischer Kinderkleidung der 1920er Jahre.",
    descriptionSV: "Studioporträtt av Maria och Georges Deforce, de två äldsta barnen till Marcel och Magdalena Deforce. Maria (°1918) och Georges (°1921) poserar i typiska 1920-talskläder för barn.",
    year: "1923",
    category: "familie",
    isAiGenerated: true
  },
  {
    id: 72,
    src: joorisDeforce1925,
    titleNL: "Georges Deforce",
    titleFR: "Georges Deforce",
    titleEN: "Georges Deforce",
    titleES: "Georges Deforce",
    titleDE: "Georges Deforce",
    titleSV: "Georges Deforce",
    descriptionNL: "Georges (Jooris) Deforce in de tuin aan de Vandenbogaerdelaan. Hij staat bij een kleine werkbank, symbool van de familietraditie van houtbewerking. Op de achtergrond is het bakstenen huis zichtbaar.",
    descriptionFR: "Georges (Jooris) Deforce dans le jardin de la Vandenbogaerdelaan. Il se tient près d'un petit établi, symbole de la tradition familiale du travail du bois. À l'arrière-plan, la maison en briques est visible.",
    descriptionEN: "Georges (Jooris) Deforce in the garden at Vandenbogaerdelaan. He stands by a small workbench, symbol of the family tradition of woodworking. In the background, the brick house is visible.",
    descriptionES: "Georges (Jooris) Deforce en el jardín de la Vandenbogaerdelaan. Está junto a un pequeño banco de trabajo, símbolo de la tradición familiar de la carpintería. Al fondo, se ve la casa de ladrillo.",
    descriptionDE: "Georges (Jooris) Deforce im Garten an der Vandenbogaerdelaan. Er steht bei einer kleinen Werkbank, Symbol der Familientradition der Holzbearbeitung. Im Hintergrund ist das Backsteinhaus sichtbar.",
    descriptionSV: "Georges (Jooris) Deforce i trädgården på Vandenbogaerdelaan. Han står vid en liten arbetsbänk, symbol för familjetraditionen av träbearbetning. I bakgrunden syns tegelstenshuset.",
    year: "1925",
    category: "familie",
    isAiGenerated: true
  },
  {
    id: 73,
    src: oudHuisVdb1927,
    titleNL: "Kinderen Deforce aan de Vandenbogaerdelaan",
    titleFR: "Enfants Deforce à la Vandenbogaerdelaan",
    titleEN: "Deforce Children at Vandenbogaerdelaan",
    titleES: "Niños Deforce en Vandenbogaerdelaan",
    titleDE: "Deforce Kinder an der Vandenbogaerdelaan",
    titleSV: "Barnen Deforce vid Vandenbogaerdelaan",
    descriptionNL: "Maria, Georges, Monique en Bérénice Deforce voor het ouderlijk huis aan de Vandenbogaerdelaan 25 in Izegem. Het bedrijfsbord 'Schrijnwerkerij Marcel Deforce-Geldof - Meubels' is zichtbaar bij de voordeur. De tuin bloeit met witte cosmos en de gevel is begroeid met klimop.",
    descriptionFR: "Maria, Georges, Monique et Bérénice Deforce devant la maison familiale à la Vandenbogaerdelaan 25 à Izegem. L'enseigne de l'entreprise 'Menuiserie Marcel Deforce-Geldof - Meubles' est visible près de la porte d'entrée. Le jardin fleurit avec des cosmos blancs et la façade est couverte de lierre.",
    descriptionEN: "Maria, Georges, Monique and Bérénice Deforce in front of the parental home at Vandenbogaerdelaan 25 in Izegem. The business sign 'Joinery Marcel Deforce-Geldof - Furniture' is visible by the front door. The garden blooms with white cosmos and the facade is covered with ivy.",
    descriptionES: "Maria, Georges, Monique y Bérénice Deforce frente a la casa familiar en Vandenbogaerdelaan 25 en Izegem. El cartel del negocio 'Carpintería Marcel Deforce-Geldof - Muebles' es visible junto a la puerta de entrada. El jardín florece con cosmos blancos y la fachada está cubierta de hiedra.",
    descriptionDE: "Maria, Georges, Monique und Bérénice Deforce vor dem Elternhaus an der Vandenbogaerdelaan 25 in Izegem. Das Firmenschild 'Schreinerei Marcel Deforce-Geldof - Möbel' ist an der Haustür sichtbar. Der Garten blüht mit weißen Cosmea und die Fassade ist mit Efeu bewachsen.",
    descriptionSV: "Maria, Georges, Monique och Bérénice Deforce framför föräldrahemmet på Vandenbogaerdelaan 25 i Izegem. Företagsskylten 'Snickeri Marcel Deforce-Geldof - Möbler' syns vid ytterdörren. Trädgården blommar med vita cosmos och fasaden är täckt med murgröna.",
    year: "ca. 1927",
    category: "familie",
    isAiGenerated: true
  },
  // === Nieuw toegevoegde foto's uit MarcelBiografie(Vervolg) ===
  {
    id: 75,
    src: atelier1942,
    titleNL: "Atelier Marcel Deforce (1942)",
    titleFR: "Atelier Marcel Deforce (1942)",
    titleEN: "Workshop Marcel Deforce (1942)",
    titleES: "Taller Marcel Deforce (1942)",
    titleDE: "Werkstatt Marcel Deforce (1942)",
    descriptionNL: "Het atelier van Marcel Deforce aan de Vandenbogaerdelaan tijdens de Tweede Wereldoorlog. Ondanks de moeilijke tijden bleef Marcel actief als meubelmaker.",
    descriptionFR: "L'atelier de Marcel Deforce à la Vandenbogaerdelaan pendant la Seconde Guerre mondiale. Malgré les temps difficiles, Marcel est resté actif comme ébéniste.",
    descriptionEN: "The workshop of Marcel Deforce at Vandenbogaerdelaan during World War II. Despite the difficult times, Marcel remained active as a cabinetmaker.",
    descriptionES: "El taller de Marcel Deforce en Vandenbogaerdelaan durante la Segunda Guerra Mundial. A pesar de los tiempos difíciles, Marcel siguió activo como ebanista.",
    descriptionDE: "Die Werkstatt von Marcel Deforce an der Vandenbogaerdelaan während des Zweiten Weltkriegs. Trotz der schwierigen Zeiten blieb Marcel als Möbelschreiner aktiv.",
    year: "1942",
    category: "beroep"
  },
  {
    id: 76,
    src: madeleineRodeKruis,
    titleNL: "Madeleine bij het Rode Kruis",
    titleFR: "Madeleine à la Croix-Rouge",
    titleEN: "Madeleine at the Red Cross",
    titleES: "Madeleine en la Cruz Roja",
    titleDE: "Madeleine beim Roten Kreuz",
    descriptionNL: "Magdalena 'Madeleine' Geldof als vrijwilligster bij het Rode Kruis. Tijdens de oorlogsjaren zette zij zich in voor de hulpverlening.",
    descriptionFR: "Magdalena 'Madeleine' Geldof comme bénévole à la Croix-Rouge. Pendant les années de guerre, elle s'est engagée dans l'aide humanitaire.",
    descriptionEN: "Magdalena 'Madeleine' Geldof as a volunteer at the Red Cross. During the war years, she was active in relief work.",
    descriptionES: "Magdalena 'Madeleine' Geldof como voluntaria en la Cruz Roja. Durante los años de guerra, se dedicó a la labor humanitaria.",
    descriptionDE: "Magdalena 'Madeleine' Geldof als Freiwillige beim Roten Kreuz. Während der Kriegsjahre engagierte sie sich in der Hilfeleistung.",
    year: "ca. 1940-1945",
    category: "familie"
  },
  {
    id: 77,
    src: gezinZilverenJubileum,
    titleNL: "Zilveren jubileum (1943)",
    titleFR: "Jubilé d'argent (1943)",
    titleEN: "Silver Jubilee (1943)",
    titleES: "Bodas de plata (1943)",
    titleDE: "Silbernes Jubiläum (1943)",
    descriptionNL: "Het gezin Deforce-Geldof bij het zilveren huwelijksjubileum van Marcel en Magdalena in 1943. Een feestelijk moment midden in de oorlogsjaren.",
    descriptionFR: "La famille Deforce-Geldof lors du jubilé d'argent de Marcel et Magdalena en 1943. Un moment festif au milieu des années de guerre.",
    descriptionEN: "The Deforce-Geldof family at the silver wedding anniversary of Marcel and Magdalena in 1943. A festive moment in the midst of the war years.",
    descriptionES: "La familia Deforce-Geldof en las bodas de plata de Marcel y Magdalena en 1943. Un momento festivo en medio de los años de guerra.",
    descriptionDE: "Die Familie Deforce-Geldof beim silbernen Hochzeitsjubiläum von Marcel und Magdalena 1943. Ein festlicher Moment mitten in den Kriegsjahren.",
    year: "1943",
    category: "familie"
  },
  {
    id: 79,
    src: nieuwHuisVdb,
    titleNL: "Het nieuwe huis Vandenbogaerdelaan",
    titleFR: "La nouvelle maison Vandenbogaerdelaan",
    titleEN: "The new house Vandenbogaerdelaan",
    titleES: "La nueva casa Vandenbogaerdelaan",
    titleDE: "Das neue Haus Vandenbogaerdelaan",
    descriptionNL: "Het vernieuwde huis aan de Vandenbogaerdelaan na de verbouwing van 1945-1946. Marcel ontwierp en bouwde de nieuwe gevel zelf.",
    descriptionFR: "La maison rénovée au Vandenbogaerdelaan après la rénovation de 1945-1946. Marcel a conçu et construit la nouvelle façade lui-même.",
    descriptionEN: "The renovated house at Vandenbogaerdelaan after the 1945-1946 renovation. Marcel designed and built the new facade himself.",
    descriptionES: "La casa renovada en Vandenbogaerdelaan después de la renovación de 1945-1946. Marcel diseñó y construyó la nueva fachada él mismo.",
    descriptionDE: "Das renovierte Haus an der Vandenbogaerdelaan nach dem Umbau 1945-1946. Marcel entwarf und baute die neue Fassade selbst.",
    year: "1946",
    category: "locatie"
  },
  {
    id: 80,
    src: bouwplanVerbouwing,
    titleNL: "Bouwplan verbouwing",
    titleFR: "Plan de construction rénovation",
    titleEN: "Construction plan renovation",
    titleES: "Plano de construcción renovación",
    titleDE: "Bauplan Umbau",
    descriptionNL: "Het bouwplan voor de verbouwing van het huis aan de Vandenbogaerdelaan. Marcel tekende de plannen zelf voor de ingrijpende renovatie van 1945.",
    descriptionFR: "Le plan de construction pour la rénovation de la maison au Vandenbogaerdelaan. Marcel a dessiné lui-même les plans pour la rénovation majeure de 1945.",
    descriptionEN: "The construction plan for the renovation of the house at Vandenbogaerdelaan. Marcel drew the plans himself for the major renovation of 1945.",
    descriptionES: "El plano de construcción para la renovación de la casa en Vandenbogaerdelaan. Marcel dibujó los planos él mismo para la gran renovación de 1945.",
    descriptionDE: "Der Bauplan für den Umbau des Hauses an der Vandenbogaerdelaan. Marcel zeichnete die Pläne selbst für die umfassende Renovierung von 1945.",
    year: "1945",
    category: "document"
  },
  {
    id: 81,
    src: nieuweVoorgevel1946,
    titleNL: "Nieuwe voorgevel (1946)",
    titleFR: "Nouvelle façade (1946)",
    titleEN: "New front facade (1946)",
    titleES: "Nueva fachada (1946)",
    titleDE: "Neue Fassade (1946)",
    descriptionNL: "De nieuwe voorgevel van het huis aan de Vandenbogaerdelaan, voltooid in 1946. Het gezin poseert trots voor hun vernieuwde woning.",
    descriptionFR: "La nouvelle façade de la maison au Vandenbogaerdelaan, achevée en 1946. La famille pose fièrement devant leur maison rénovée.",
    descriptionEN: "The new front facade of the house at Vandenbogaerdelaan, completed in 1946. The family poses proudly in front of their renovated home.",
    descriptionES: "La nueva fachada de la casa en Vandenbogaerdelaan, completada en 1946. La familia posa orgullosa frente a su hogar renovado.",
    descriptionDE: "Die neue Fassade des Hauses an der Vandenbogaerdelaan, fertiggestellt 1946. Die Familie posiert stolz vor ihrem renovierten Haus.",
    year: "1946",
    category: "locatie"
  },
  {
    id: 82,
    src: huwelijksfotoTrap,
    titleNL: "Huwelijksfoto op de trap",
    titleFR: "Photo de mariage dans l'escalier",
    titleEN: "Wedding photo on the stairs",
    titleES: "Foto de boda en la escalera",
    titleDE: "Hochzeitsfoto auf der Treppe",
    descriptionNL: "Een huwelijksfoto genomen op de trap van het huis aan de Vandenbogaerdelaan. De trap en het houtwerk werden door Marcel zelf ontworpen en gemaakt.",
    descriptionFR: "Une photo de mariage prise dans l'escalier de la maison au Vandenbogaerdelaan. L'escalier et les boiseries ont été conçus et réalisés par Marcel lui-même.",
    descriptionEN: "A wedding photo taken on the staircase of the house at Vandenbogaerdelaan. The staircase and woodwork were designed and made by Marcel himself.",
    descriptionES: "Una foto de boda tomada en la escalera de la casa en Vandenbogaerdelaan. La escalera y la carpintería fueron diseñadas y realizadas por Marcel mismo.",
    descriptionDE: "Ein Hochzeitsfoto auf der Treppe des Hauses an der Vandenbogaerdelaan. Die Treppe und die Holzarbeiten wurden von Marcel selbst entworfen und gefertigt.",
    year: "ca. 1950",
    category: "familie"
  },
  {
    id: 84,
    src: gezinsbondArtikel,
    titleNL: "Gezinsbond krantenartikel",
    titleFR: "Article de journal Ligue des Familles",
    titleEN: "Family League newspaper article",
    titleES: "Artículo de prensa Liga de Familias",
    titleDE: "Familienbund Zeitungsartikel",
    descriptionNL: "Krantenartikel over de huldiging van Marcel en Magdalena Deforce-Geldof door de Gezinsbond voor hun grote gezin.",
    descriptionFR: "Article de journal sur l'hommage à Marcel et Magdalena Deforce-Geldof par la Ligue des Familles pour leur grande famille.",
    descriptionEN: "Newspaper article about the tribute to Marcel and Magdalena Deforce-Geldof by the Family League for their large family.",
    descriptionES: "Artículo de periódico sobre el homenaje a Marcel y Magdalena Deforce-Geldof por la Liga de Familias por su numerosa familia.",
    descriptionDE: "Zeitungsartikel über die Ehrung von Marcel und Magdalena Deforce-Geldof durch den Familienbund für ihre große Familie.",
    year: "1961",
    category: "document"
  },
  {
    id: 85,
    src: briefhoofdMarcel,
    titleNL: "Briefhoofd Marcel Deforce",
    titleFR: "En-tête Marcel Deforce",
    titleEN: "Letterhead Marcel Deforce",
    titleES: "Membrete Marcel Deforce",
    titleDE: "Briefkopf Marcel Deforce",
    descriptionNL: "Het briefhoofd van de schrijnwerkerij Marcel Deforce-Geldof. Het toont de professionele uitstraling van het bedrijf met vermelding van de specialisaties.",
    descriptionFR: "L'en-tête de la menuiserie Marcel Deforce-Geldof. Il montre l'image professionnelle de l'entreprise avec la mention des spécialisations.",
    descriptionEN: "The letterhead of the joinery Marcel Deforce-Geldof. It shows the professional image of the business with mention of specializations.",
    descriptionES: "El membrete de la carpintería Marcel Deforce-Geldof. Muestra la imagen profesional del negocio con mención de las especializaciones.",
    descriptionDE: "Der Briefkopf der Schreinerei Marcel Deforce-Geldof. Er zeigt das professionelle Image des Unternehmens mit Angabe der Spezialisierungen.",
    year: "ca. 1930-1950",
    category: "document"
  },
  {
    id: 86,
    src: catalogusCreations,
    titleNL: "Catalogus 'Créations de Mobilier'",
    titleFR: "Catalogue 'Créations de Mobilier'",
    titleEN: "Catalog 'Créations de Mobilier'",
    titleES: "Catálogo 'Créations de Mobilier'",
    titleDE: "Katalog 'Créations de Mobilier'",
    descriptionNL: "Een pagina uit de catalogus 'Créations de Mobilier' die Marcel gebruikte als inspiratiebron voor zijn meubelontwerpen. De Parijse invloeden zijn duidelijk herkenbaar.",
    descriptionFR: "Une page du catalogue 'Créations de Mobilier' que Marcel utilisait comme source d'inspiration pour ses créations de meubles. Les influences parisiennes sont clairement reconnaissables.",
    descriptionEN: "A page from the catalog 'Créations de Mobilier' that Marcel used as inspiration for his furniture designs. The Parisian influences are clearly recognizable.",
    descriptionES: "Una página del catálogo 'Créations de Mobilier' que Marcel usaba como fuente de inspiración para sus diseños de muebles. Las influencias parisinas son claramente reconocibles.",
    descriptionDE: "Eine Seite aus dem Katalog 'Créations de Mobilier', den Marcel als Inspirationsquelle für seine Möbelentwürfe nutzte. Die Pariser Einflüsse sind deutlich erkennbar.",
    year: "ca. 1920-1930",
    category: "beroep"
  },
  {
    id: 87,
    src: meublesModernesBoek,
    titleNL: "Meubles Modernes - Boek",
    titleFR: "Meubles Modernes - Livre",
    titleEN: "Meubles Modernes - Book",
    titleES: "Meubles Modernes - Libro",
    titleDE: "Meubles Modernes - Buch",
    descriptionNL: "Het boek 'Meubles Modernes' dat Marcel als referentiewerk gebruikte. Het bevatte moderne meubelontwerpen uit de Art Deco-periode.",
    descriptionFR: "Le livre 'Meubles Modernes' que Marcel utilisait comme ouvrage de référence. Il contenait des créations de meubles modernes de la période Art Déco.",
    descriptionEN: "The book 'Meubles Modernes' that Marcel used as a reference work. It contained modern furniture designs from the Art Deco period.",
    descriptionES: "El libro 'Meubles Modernes' que Marcel usaba como obra de referencia. Contenía diseños de muebles modernos del período Art Déco.",
    descriptionDE: "Das Buch 'Meubles Modernes', das Marcel als Nachschlagewerk nutzte. Es enthielt moderne Möbelentwürfe aus der Art-Déco-Zeit.",
    year: "ca. 1920-1930",
    category: "beroep"
  },
  {
    id: 88,
    src: meublesModernesParisiens,
    titleNL: "Meubles Modernes Parisiens",
    titleFR: "Meubles Modernes Parisiens",
    titleEN: "Parisian Modern Furniture",
    titleES: "Muebles Modernos Parisinos",
    titleDE: "Pariser Moderne Möbel",
    descriptionNL: "Pagina uit 'Meubles Modernes Parisiens' met ontwerpen die Marcel inspireerden. De verfijnde Parijse stijl beïnvloedde zijn vakmanschap sterk.",
    descriptionFR: "Page de 'Meubles Modernes Parisiens' avec des dessins qui ont inspiré Marcel. Le style parisien raffiné a fortement influencé son artisanat.",
    descriptionEN: "Page from 'Meubles Modernes Parisiens' with designs that inspired Marcel. The refined Parisian style strongly influenced his craftsmanship.",
    descriptionES: "Página de 'Meubles Modernes Parisiens' con diseños que inspiraron a Marcel. El refinado estilo parisino influyó fuertemente en su artesanía.",
    descriptionDE: "Seite aus 'Meubles Modernes Parisiens' mit Entwürfen, die Marcel inspirierten. Der verfeinerte Pariser Stil beeinflusste seine Handwerkskunst stark.",
    year: "ca. 1920-1930",
    category: "beroep"
  },
  {
    id: 89,
    src: attestOnmisbareZoon,
    titleNL: "Attest 'Onmisbare Zoon'",
    titleFR: "Attestation 'Fils Indispensable'",
    titleEN: "Certificate 'Indispensable Son'",
    titleES: "Certificado 'Hijo Indispensable'",
    titleDE: "Bescheinigung 'Unentbehrlicher Sohn'",
    descriptionNL: "Het attest van 'onmisbare zoon' voor Georges Deforce tijdens WOII. Dit document vrijwaarde hem van verplichte tewerkstelling in Duitsland, omdat hij onmisbaar was voor het familiebedrijf.",
    descriptionFR: "L'attestation de 'fils indispensable' pour Georges Deforce pendant la Seconde Guerre mondiale. Ce document le protégeait du travail obligatoire en Allemagne, car il était indispensable pour l'entreprise familiale.",
    descriptionEN: "The 'indispensable son' certificate for Georges Deforce during WWII. This document protected him from forced labor in Germany, as he was indispensable to the family business.",
    descriptionES: "El certificado de 'hijo indispensable' para Georges Deforce durante la Segunda Guerra Mundial. Este documento lo protegía del trabajo forzado en Alemania, ya que era indispensable para el negocio familiar.",
    descriptionDE: "Die Bescheinigung 'unentbehrlicher Sohn' für Georges Deforce im Zweiten Weltkrieg. Dieses Dokument bewahrte ihn vor der Zwangsarbeit in Deutschland, da er für den Familienbetrieb unentbehrlich war.",
    year: "1940-1945",
    category: "document"
  },
  {
    id: 90,
    src: stamboomMagdalena,
    titleNL: "Stamboom Magdalena Geldof",
    titleFR: "Arbre généalogique Magdalena Geldof",
    titleEN: "Family Tree Magdalena Geldof",
    titleES: "Árbol genealógico Magdalena Geldof",
    titleDE: "Stammbaum Magdalena Geldof",
    descriptionNL: "De stamboom van Magdalena 'Madeleine' Geldof, die de afstamming toont via de familie Geldof en Vanderheeren.",
    descriptionFR: "L'arbre généalogique de Magdalena 'Madeleine' Geldof, montrant la descendance via les familles Geldof et Vanderheeren.",
    descriptionEN: "The family tree of Magdalena 'Madeleine' Geldof, showing the descent through the Geldof and Vanderheeren families.",
    descriptionES: "El árbol genealógico de Magdalena 'Madeleine' Geldof, que muestra la descendencia a través de las familias Geldof y Vanderheeren.",
    descriptionDE: "Der Stammbaum von Magdalena 'Madeleine' Geldof, der die Abstammung über die Familien Geldof und Vanderheeren zeigt.",
    year: "2024",
    category: "document"
  },
  {
    id: 91,
    src: drieZusjes,
    titleNL: "Drie zusjes Deforce (ca. 1950)",
    titleFR: "Trois sœurs Deforce (vers 1950)",
    titleEN: "Three Deforce sisters (ca. 1950)",
    titleES: "Tres hermanas Deforce (ca. 1950)",
    titleDE: "Drei Schwestern Deforce (ca. 1950)",
    descriptionNL: "Drie zusjes uit het gezin Deforce poseren samen voor een charmante foto uit de jaren 1950.",
    descriptionFR: "Trois sœurs de la famille Deforce posent ensemble pour une charmante photo des années 1950.",
    descriptionEN: "Three sisters from the Deforce family pose together for a charming 1950s photo.",
    descriptionES: "Tres hermanas de la familia Deforce posan juntas para una encantadora foto de los años 1950.",
    descriptionDE: "Drei Schwestern aus der Familie Deforce posieren zusammen für ein charmantes Foto der 1950er Jahre.",
    year: "ca. 1950",
    category: "familie",
    isAiGenerated: true
  },
  // === Ontbrekende foto's toegevoegd ===
  {
    id: 93,
    src: bereniceBureau,
    titleNL: "Bérénice aan haar bureau (ingekleurd)",
    titleFR: "Bérénice à son bureau (colorisé)",
    titleEN: "Bérénice at her desk (colorized)",
    titleES: "Bérénice en su escritorio (coloreado)",
    titleDE: "Bérénice an ihrem Schreibtisch (koloriert)",
    titleSV: "Bérénice vid sitt skrivbord (kolorerad)",
    descriptionNL: "Bérénice Deforce aan haar bureau, ca. 1954. Ingekleurde versie van de originele zwart-wit foto.",
    descriptionFR: "Bérénice Deforce à son bureau, vers 1954. Version colorisée de la photo originale en noir et blanc.",
    descriptionEN: "Bérénice Deforce at her desk, ca. 1954. Colorized version of the original black and white photo.",
    descriptionES: "Bérénice Deforce en su escritorio, ca. 1954. Versión coloreada de la foto original en blanco y negro.",
    descriptionDE: "Bérénice Deforce an ihrem Schreibtisch, ca. 1954. Kolorierte Version des originalen Schwarz-Weiß-Fotos.",
    descriptionSV: "Bérénice Deforce vid sitt skrivbord, ca. 1954. Kolorerad version av det ursprungliga svartvita fotot.",
    year: "ca. 1954",
    category: "familie",
    isAiGenerated: true
  },
  {
    id: 94,
    src: bereniceKever,
    titleNL: "Bérénice met de Volkswagen Kever (ingekleurd)",
    titleFR: "Bérénice avec la Coccinelle Volkswagen (colorisé)",
    titleEN: "Bérénice with the Volkswagen Beetle (colorized)",
    titleES: "Bérénice con el Volkswagen Escarabajo (coloreado)",
    titleDE: "Bérénice mit dem VW Käfer (koloriert)",
    titleSV: "Bérénice med Volkswagen Bubbla (kolorerad)",
    descriptionNL: "Bérénice Deforce poseert bij een Volkswagen Kever. Ingekleurde versie.",
    descriptionFR: "Bérénice Deforce pose à côté d'une Coccinelle Volkswagen. Version colorisée.",
    descriptionEN: "Bérénice Deforce poses next to a Volkswagen Beetle. Colorized version.",
    descriptionES: "Bérénice Deforce posa junto a un Volkswagen Escarabajo. Versión coloreada.",
    descriptionDE: "Bérénice Deforce posiert neben einem VW Käfer. Kolorierte Version.",
    descriptionSV: "Bérénice Deforce poserar bredvid en Volkswagen Bubbla. Kolorerad version.",
    year: "ca. 1955",
    category: "familie",
    isAiGenerated: true
  },
  {
    id: 95,
    src: eugenieBoucke,
    titleNL: "Eugénie Boucké",
    titleFR: "Eugénie Boucké",
    titleEN: "Eugénie Boucké",
    titleES: "Eugénie Boucké",
    titleDE: "Eugénie Boucké",
    titleSV: "Eugénie Boucké",
    descriptionNL: "Portret van Eugénie Boucké, moeder van Alice Rosalia Boucké. Haar verhaal is verbonden met het 'schandaal in de familie' van 1892.",
    descriptionFR: "Portrait d'Eugénie Boucké, mère d'Alice Rosalia Boucké. Son histoire est liée au 'scandale de la famille' de 1892.",
    descriptionEN: "Portrait of Eugénie Boucké, mother of Alice Rosalia Boucké. Her story is connected to the 'family scandal' of 1892.",
    descriptionES: "Retrato de Eugénie Boucké, madre de Alice Rosalia Boucké. Su historia está conectada con el 'escándalo de la familia' de 1892.",
    descriptionDE: "Porträt von Eugénie Boucké, Mutter von Alice Rosalia Boucké. Ihre Geschichte ist mit dem 'Familienskandal' von 1892 verbunden.",
    descriptionSV: "Porträtt av Eugénie Boucké, mor till Alice Rosalia Boucké. Hennes historia är kopplad till 'familjeskandalen' 1892.",
    year: "ca. 1890",
    category: "portret"
  },
  {
    id: 96,
    src: mauriceDeleforge,
    titleNL: "Maurice Deleforge (1933–2018)",
    titleFR: "Maurice Deleforge (1933–2018)",
    titleEN: "Maurice Deleforge (1933–2018)",
    titleES: "Maurice Deleforge (1933–2018)",
    titleDE: "Maurice Deleforge (1933–2018)",
    titleSV: "Maurice Deleforge (1933–2018)",
    descriptionNL: "Portret van Maurice Deleforge, een verre neef uit de Franse tak van de familie. Zijn DNA-match bevestigde de verwantschap met de Belgische Deforce-tak.",
    descriptionFR: "Portrait de Maurice Deleforge, un cousin éloigné de la branche française de la famille. Sa correspondance ADN a confirmé la parenté avec la branche belge des Deforce.",
    descriptionEN: "Portrait of Maurice Deleforge, a distant cousin from the French branch of the family. His DNA match confirmed the kinship with the Belgian Deforce branch.",
    descriptionES: "Retrato de Maurice Deleforge, un primo lejano de la rama francesa de la familia. Su coincidencia de ADN confirmó el parentesco con la rama belga de los Deforce.",
    descriptionDE: "Porträt von Maurice Deleforge, einem entfernten Cousin aus dem französischen Familienzweig. Sein DNA-Abgleich bestätigte die Verwandtschaft mit dem belgischen Deforce-Zweig.",
    descriptionSV: "Porträtt av Maurice Deleforge, en avlägsen kusin från den franska grenen av familjen. Hans DNA-matchning bekräftade släktskapet med den belgiska Deforce-grenen.",
    year: "ca. 2010",
    category: "portret"
  },
  {
    id: 97,
    src: laatsteFotoMadeleine,
    titleNL: "Laatste foto van Madeleine",
    titleFR: "Dernière photo de Madeleine",
    titleEN: "Last photo of Madeleine",
    titleES: "Última foto de Madeleine",
    titleDE: "Letztes Foto von Madeleine",
    titleSV: "Sista fotot av Madeleine",
    descriptionNL: "De laatste bekende foto van Magdalena 'Madeleine' Geldof, kort voor haar overlijden in 1971.",
    descriptionFR: "La dernière photo connue de Magdalena 'Madeleine' Geldof, peu avant son décès en 1971.",
    descriptionEN: "The last known photo of Magdalena 'Madeleine' Geldof, shortly before her passing in 1971.",
    descriptionES: "La última foto conocida de Magdalena 'Madeleine' Geldof, poco antes de su fallecimiento en 1971.",
    descriptionDE: "Das letzte bekannte Foto von Magdalena 'Madeleine' Geldof, kurz vor ihrem Tod 1971.",
    descriptionSV: "Det sista kända fotot av Magdalena 'Madeleine' Geldof, kort före hennes bortgång 1971.",
    year: "ca. 1970",
    category: "portret"
  },
  {
    id: 98,
    src: huldigingMoeders,
    titleNL: "Huldiging van de moeders (1960)",
    titleFR: "Hommage aux mères (1960)",
    titleEN: "Tribute to the mothers (1960)",
    titleES: "Homenaje a las madres (1960)",
    titleDE: "Ehrung der Mütter (1960)",
    titleSV: "Hyllning till mödrarna (1960)",
    descriptionNL: "Huldiging van de moeders van grote gezinnen door de Gezinsbond in 1960. Magdalena Deforce-Geldof werd gehuldigd als moeder van tien kinderen.",
    descriptionFR: "Hommage aux mères de grandes familles par la Ligue des Familles en 1960. Magdalena Deforce-Geldof a été honorée comme mère de dix enfants.",
    descriptionEN: "Tribute to mothers of large families by the Family League in 1960. Magdalena Deforce-Geldof was honored as mother of ten children.",
    descriptionES: "Homenaje a las madres de familias numerosas por la Liga de Familias en 1960. Magdalena Deforce-Geldof fue honrada como madre de diez hijos.",
    descriptionDE: "Ehrung der Mütter großer Familien durch den Familienbund 1960. Magdalena Deforce-Geldof wurde als Mutter von zehn Kindern geehrt.",
    descriptionSV: "Hyllning till mödrar med stora familjer av Familjeförbundet 1960. Magdalena Deforce-Geldof hedrades som mor till tio barn.",
    year: "1960",
    category: "familie"
  },
  {
    id: 99,
    src: huwelijksfotoOrigineel,
    titleNL: "Huwelijksfoto 1945 (origineel)",
    titleFR: "Photo de mariage 1945 (original)",
    titleEN: "Wedding photo 1945 (original)",
    titleES: "Foto de boda 1945 (original)",
    titleDE: "Hochzeitsfoto 1945 (Original)",
    titleSV: "Bröllopsfoto 1945 (original)",
    descriptionNL: "De originele huwelijksfoto van Georges Deforce en zijn bruid, genomen op 7 juni 1945 aan het huis in de Vandenbogaerdelaan.",
    descriptionFR: "La photo de mariage originale de Georges Deforce et sa mariée, prise le 7 juin 1945 à la maison de la Vandenbogaerdelaan.",
    descriptionEN: "The original wedding photo of Georges Deforce and his bride, taken on June 7, 1945 at the house on Vandenbogaerdelaan.",
    descriptionES: "La foto de boda original de Georges Deforce y su novia, tomada el 7 de junio de 1945 en la casa de Vandenbogaerdelaan.",
    descriptionDE: "Das originale Hochzeitsfoto von Georges Deforce und seiner Braut, aufgenommen am 7. Juni 1945 am Haus an der Vandenbogaerdelaan.",
    descriptionSV: "Det ursprungliga bröllopsfotot av Georges Deforce och hans brud, taget den 7 juni 1945 vid huset på Vandenbogaerdelaan.",
    year: "1945",
    category: "familie"
  },
  {
    id: 102,
    src: huwelijksfotoAiBewerkt,
    titleNL: "Huwelijksfoto 1945 (AI-hersteld)",
    titleFR: "Photo de mariage 1945 (restaurée par IA)",
    titleEN: "Wedding photo 1945 (AI-restored)",
    titleES: "Foto de boda 1945 (restaurada por IA)",
    titleDE: "Hochzeitsfoto 1945 (KI-restauriert)",
    titleSV: "Bröllopsfoto 1945 (AI-restaurerad)",
    descriptionNL: "De huwelijksfoto van 1945, hersteld en ingekleurd met AI-technologie (GROK). De gezichten zijn zo getrouw mogelijk behouden.",
    descriptionFR: "La photo de mariage de 1945, restaurée et colorisée par technologie IA (GROK). Les visages ont été préservés aussi fidèlement que possible.",
    descriptionEN: "The 1945 wedding photo, restored and colorized with AI technology (GROK). The faces were preserved as faithfully as possible.",
    descriptionES: "La foto de boda de 1945, restaurada y coloreada con tecnología IA (GROK). Los rostros se preservaron lo más fielmente posible.",
    descriptionDE: "Das Hochzeitsfoto von 1945, restauriert und koloriert mit KI-Technologie (GROK). Die Gesichter wurden so originalgetreu wie möglich erhalten.",
    descriptionSV: "Bröllopsfotot från 1945, restaurerat och kolorerat med AI-teknik (GROK). Ansiktena bevarades så troget som möjligt.",
    year: "1945",
    category: "ai-generated",
    isAiGenerated: true
  },
  {
    id: 103,
    src: marcelOpgebaard,
    titleNL: "Marcel Deforce opgebaard (1963)",
    titleFR: "Marcel Deforce en chapelle ardente (1963)",
    titleEN: "Marcel Deforce lying in state (1963)",
    titleES: "Marcel Deforce en capilla ardiente (1963)",
    titleDE: "Marcel Deforce aufgebahrt (1963)",
    titleSV: "Marcel Deforce på lit de parade (1963)",
    descriptionNL: "Marcel Deforce opgebaard na zijn overlijden in 1963. Een ingetogen afscheid van de pater familias.",
    descriptionFR: "Marcel Deforce en chapelle ardente après son décès en 1963. Un adieu sobre au patriarche de la famille.",
    descriptionEN: "Marcel Deforce lying in state after his passing in 1963. A solemn farewell to the family patriarch.",
    descriptionES: "Marcel Deforce en capilla ardiente tras su fallecimiento en 1963. Una despedida solemne del patriarca de la familia.",
    descriptionDE: "Marcel Deforce aufgebahrt nach seinem Tod 1963. Ein stiller Abschied vom Familienoberhaupt.",
    descriptionSV: "Marcel Deforce på lit de parade efter hans bortgång 1963. Ett stilla farväl till familjens patriark.",
    year: "1963",
    category: "familie"
  },
  {
    id: 104,
    src: rouwkapelMarcel,
    titleNL: "Rouwkapel Marcel Deforce (1963)",
    titleFR: "Chapelle funéraire Marcel Deforce (1963)",
    titleEN: "Funeral chapel Marcel Deforce (1963)",
    titleES: "Capilla funeraria Marcel Deforce (1963)",
    titleDE: "Trauerkapelle Marcel Deforce (1963)",
    titleSV: "Begravningskapell Marcel Deforce (1963)",
    descriptionNL: "De rouwkapel bij de uitvaart van Marcel Deforce in 1963. Talrijke bloemen en kransen getuigen van het respect dat hij genoot.",
    descriptionFR: "La chapelle funéraire lors des obsèques de Marcel Deforce en 1963. De nombreuses fleurs et couronnes témoignent du respect dont il jouissait.",
    descriptionEN: "The funeral chapel at the funeral of Marcel Deforce in 1963. Numerous flowers and wreaths testify to the respect he enjoyed.",
    descriptionES: "La capilla funeraria en el funeral de Marcel Deforce en 1963. Numerosas flores y coronas atestiguan el respeto que gozaba.",
    descriptionDE: "Die Trauerkapelle bei der Beerdigung von Marcel Deforce 1963. Zahlreiche Blumen und Kränze zeugen von dem Respekt, den er genoss.",
    descriptionSV: "Begravningskapellet vid Marcel Deforces begravning 1963. Talrika blommor och kransar vittnar om den respekt han åtnjöt.",
    year: "1963",
    category: "familie"
  },
  {
    id: 105,
    src: begrafenisZonen,
    titleNL: "Begrafenis - de zonen dragen de kist (1963)",
    titleFR: "Funérailles - les fils portent le cercueil (1963)",
    titleEN: "Funeral - the sons carry the coffin (1963)",
    titleES: "Funeral - los hijos llevan el ataúd (1963)",
    titleDE: "Beerdigung - die Söhne tragen den Sarg (1963)",
    titleSV: "Begravning - sönerna bär kistan (1963)",
    descriptionNL: "De zonen van Marcel Deforce dragen de kist van hun vader naar zijn laatste rustplaats in 1963.",
    descriptionFR: "Les fils de Marcel Deforce portent le cercueil de leur père vers sa dernière demeure en 1963.",
    descriptionEN: "The sons of Marcel Deforce carry their father's coffin to his final resting place in 1963.",
    descriptionES: "Los hijos de Marcel Deforce llevan el ataúd de su padre a su última morada en 1963.",
    descriptionDE: "Die Söhne von Marcel Deforce tragen den Sarg ihres Vaters zu seiner letzten Ruhestätte 1963.",
    descriptionSV: "Marcel Deforces söner bär sin fars kista till hans sista viloplats 1963.",
    year: "1963",
    category: "familie"
  },
  // Documenten
  {
    id: 106,
    src: doopakteAliceBoucke,
    titleNL: "Geboorteakte Alice Rosalia Boucké (1892)",
    titleFR: "Acte de naissance Alice Rosalia Boucké (1892)",
    titleEN: "Birth certificate Alice Rosalia Boucké (1892)",
    titleES: "Acta de nacimiento Alice Rosalia Boucké (1892)",
    titleDE: "Geburtsurkunde Alice Rosalia Boucké (1892)",
    titleSV: "Födelsebevis Alice Rosalia Boucké (1892)",
    descriptionNL: "De geboorteakte van Alice Rosalia Boucké (1892), het onwettige kind van Eugénie Boucké. Dit document is een sleutelbron in het verhaal over het 'schandaal in de familie'.",
    descriptionFR: "L'acte de naissance d'Alice Rosalia Boucké (1892), l'enfant illégitime d'Eugénie Boucké. Ce document est une source clé dans l'histoire du 'scandale dans la famille'.",
    descriptionEN: "The birth certificate of Alice Rosalia Boucké (1892), the illegitimate child of Eugénie Boucké. This document is a key source in the story of the 'family scandal'.",
    descriptionES: "El acta de nacimiento de Alice Rosalia Boucké (1892), la hija ilegítima de Eugénie Boucké. Este documento es una fuente clave en la historia del 'escándalo familiar'.",
    descriptionDE: "Die Geburtsurkunde von Alice Rosalia Boucké (1892), dem unehelichen Kind von Eugénie Boucké. Dieses Dokument ist eine Schlüsselquelle in der Geschichte des 'Familienskandals'.",
    descriptionSV: "Födelsebeviset för Alice Rosalia Boucké (1892), det utomäktenskapliga barnet till Eugénie Boucké. Detta dokument är en nyckelkälla i berättelsen om 'familjeskandalen'.",
    year: "1892",
    category: "document"
  },
  {
    id: 107,
    src: doopakteCyprianusRoose,
    titleNL: "Doopakte Cyprianus Roose (1752)",
    titleFR: "Acte de baptême Cyprianus Roose (1752)",
    titleEN: "Baptismal certificate Cyprianus Roose (1752)",
    titleES: "Acta de bautismo Cyprianus Roose (1752)",
    titleDE: "Taufurkunde Cyprianus Roose (1752)",
    titleSV: "Dopbevis Cyprianus Roose (1752)",
    descriptionNL: "De doopakte van Cyprianus Roose uit 1752, een ander voorbeeld van een onwettige geboorte in de familie. De akte vermeldt 'illegitimus' (onwettig geboren).",
    descriptionFR: "L'acte de baptême de Cyprianus Roose de 1752, un autre exemple de naissance illégitime dans la famille. L'acte mentionne 'illegitimus' (né hors mariage).",
    descriptionEN: "The baptismal certificate of Cyprianus Roose from 1752, another example of an illegitimate birth in the family. The certificate mentions 'illegitimus' (born out of wedlock).",
    descriptionES: "El acta de bautismo de Cyprianus Roose de 1752, otro ejemplo de un nacimiento ilegítimo en la familia. El acta menciona 'illegitimus' (nacido fuera del matrimonio).",
    descriptionDE: "Die Taufurkunde von Cyprianus Roose aus 1752, ein weiteres Beispiel einer unehelichen Geburt in der Familie. Die Urkunde vermerkt 'illegitimus' (unehelich geboren).",
    descriptionSV: "Dopbeviset för Cyprianus Roose från 1752, ytterligare ett exempel på en utomäktenskaplig födelse i familjen. Beviset nämner 'illegitimus' (född utom äktenskapet).",
    year: "1752",
    category: "document"
  },
  {
    id: 109,
    src: trouwboekje,
    titleNL: "Trouwboekje Marcel en Magdalena",
    titleFR: "Livret de mariage Marcel et Magdalena",
    titleEN: "Marriage booklet Marcel and Magdalena",
    titleES: "Libreta de matrimonio Marcel y Magdalena",
    titleDE: "Familienstammbuch Marcel und Magdalena",
    titleSV: "Vigselbok Marcel och Magdalena",
    descriptionNL: "Het trouwboekje van Marcel Deforce en Magdalena Geldof, het officiële bewijs van hun huwelijk.",
    descriptionFR: "Le livret de mariage de Marcel Deforce et Magdalena Geldof, la preuve officielle de leur union.",
    descriptionEN: "The marriage booklet of Marcel Deforce and Magdalena Geldof, the official proof of their marriage.",
    descriptionES: "La libreta de matrimonio de Marcel Deforce y Magdalena Geldof, la prueba oficial de su matrimonio.",
    descriptionDE: "Das Familienstammbuch von Marcel Deforce und Magdalena Geldof, der offizielle Nachweis ihrer Eheschließung.",
    descriptionSV: "Vigselboken för Marcel Deforce och Magdalena Geldof, det officiella beviset på deras äktenskap.",
    year: "1918",
    category: "document"
  },
  {
    id: 110,
    src: telegramHuwelijk,
    titleNL: "Telegram bij het huwelijk (1945)",
    titleFR: "Télégramme de mariage (1945)",
    titleEN: "Wedding telegram (1945)",
    titleES: "Telegrama de boda (1945)",
    titleDE: "Hochzeitstelegramm (1945)",
    titleSV: "Bröllopstelegram (1945)",
    descriptionNL: "Een felicitatietelegram bij het huwelijk van Georges Deforce op 7 juni 1945.",
    descriptionFR: "Un télégramme de félicitations pour le mariage de Georges Deforce le 7 juin 1945.",
    descriptionEN: "A congratulatory telegram at the wedding of Georges Deforce on June 7, 1945.",
    descriptionES: "Un telegrama de felicitación en la boda de Georges Deforce el 7 de junio de 1945.",
    descriptionDE: "Ein Glückwunschtelegramm zur Hochzeit von Georges Deforce am 7. Juni 1945.",
    descriptionSV: "Ett gratulationstelegram vid Georges Deforces bröllop den 7 juni 1945.",
    year: "1945",
    category: "document"
  },
  {
    id: 111,
    src: huwelijksgedichtP1,
    titleNL: "Huwelijksgedicht 1945 (origineel handschrift)",
    titleFR: "Poème de mariage 1945 (manuscrit original)",
    titleEN: "Wedding poem 1945 (original manuscript)",
    titleES: "Poema de boda 1945 (manuscrito original)",
    titleDE: "Hochzeitsgedicht 1945 (Originalhandschrift)",
    titleSV: "Bröllopspoem 1945 (originalhandskrift)",
    descriptionNL: "Het originele handgeschreven huwelijksgedicht van Emiel Geldof, geschreven ter gelegenheid van het huwelijk van zijn kleindochter op 7 juni 1945.",
    descriptionFR: "Le poème de mariage original manuscrit d'Émile Geldof, écrit à l'occasion du mariage de sa petite-fille le 7 juin 1945.",
    descriptionEN: "The original handwritten wedding poem by Emile Geldof, written for the marriage of his granddaughter on June 7, 1945.",
    descriptionES: "El poema de boda original manuscrito de Emile Geldof, escrito con motivo del matrimonio de su nieta el 7 de junio de 1945.",
    descriptionDE: "Das originale handschriftliche Hochzeitsgedicht von Emile Geldof, geschrieben anlässlich der Hochzeit seiner Enkelin am 7. Juni 1945.",
    descriptionSV: "Det ursprungliga handskrivna bröllopspoemet av Emile Geldof, skrivet i samband med hans barnbarns bröllop den 7 juni 1945.",
    year: "1945",
    category: "document"
  },
  {
    id: 112,
    src: verslagboekCover,
    titleNL: "Verslagboek PVBA Deforce - Cover",
    titleFR: "Livre de rapports SPRL Deforce - Couverture",
    titleEN: "Report book PVBA Deforce - Cover",
    titleES: "Libro de informes PVBA Deforce - Portada",
    titleDE: "Berichtsbuch PVBA Deforce - Umschlag",
    titleSV: "Rapportbok PVBA Deforce - Omslag",
    descriptionNL: "De omslag van het verslagboek van PVBA Deforce, het familiebedrijf dat in 1958 werd opgericht als personenvennootschap met beperkte aansprakelijkheid.",
    descriptionFR: "La couverture du livre de rapports de la SPRL Deforce, l'entreprise familiale fondée en 1958 en tant que société de personnes à responsabilité limitée.",
    descriptionEN: "The cover of the report book of PVBA Deforce, the family business that was established in 1958 as a private limited company.",
    descriptionES: "La portada del libro de informes de PVBA Deforce, la empresa familiar que fue establecida en 1958 como sociedad de responsabilidad limitada.",
    descriptionDE: "Der Umschlag des Berichtsbuchs der PVBA Deforce, des Familienunternehmens, das 1958 als Gesellschaft mit beschränkter Haftung gegründet wurde.",
    descriptionSV: "Omslaget till rapportboken för PVBA Deforce, familjeföretaget som grundades 1958 som ett privat aktiebolag.",
    year: "1958",
    category: "document"
  },
  {
    id: 113,
    src: stamboomMaurice,
    titleNL: "Stamboom Maurice Deleforge",
    titleFR: "Arbre généalogique Maurice Deleforge",
    titleEN: "Family tree Maurice Deleforge",
    titleES: "Árbol genealógico Maurice Deleforge",
    titleDE: "Stammbaum Maurice Deleforge",
    titleSV: "Släktträd Maurice Deleforge",
    descriptionNL: "De stamboom van Maurice Deleforge, die de verwantschap toont met de Belgische tak van de familie Deforce via hun gemeenschappelijke stamouders.",
    descriptionFR: "L'arbre généalogique de Maurice Deleforge, montrant la parenté avec la branche belge de la famille Deforce via leurs ancêtres communs.",
    descriptionEN: "The family tree of Maurice Deleforge, showing the kinship with the Belgian branch of the Deforce family through their common ancestors.",
    descriptionES: "El árbol genealógico de Maurice Deleforge, que muestra el parentesco con la rama belga de la familia Deforce a través de sus ancestros comunes.",
    descriptionDE: "Der Stammbaum von Maurice Deleforge, der die Verwandtschaft mit dem belgischen Zweig der Familie Deforce über ihre gemeinsamen Vorfahren zeigt.",
    descriptionSV: "Släktträdet för Maurice Deleforge, som visar släktskapet med den belgiska grenen av familjen Deforce genom deras gemensamma förfäder.",
    year: "2024",
    category: "document"
  },
  {
    id: 114,
    src: dnaMyheritageKit,
    titleNL: "MyHeritage DNA-kit",
    titleFR: "Kit ADN MyHeritage",
    titleEN: "MyHeritage DNA kit",
    titleES: "Kit de ADN MyHeritage",
    titleDE: "MyHeritage DNA-Kit",
    titleSV: "MyHeritage DNA-kit",
    descriptionNL: "De MyHeritage DNA-testkit waarmee het genealogisch DNA-onderzoek werd uitgevoerd. Dit leidde tot de ontdekking van DNA-matches met de Franse Deleforge-tak.",
    descriptionFR: "Le kit de test ADN MyHeritage avec lequel la recherche ADN généalogique a été menée. Cela a conduit à la découverte de correspondances ADN avec la branche française des Deleforge.",
    descriptionEN: "The MyHeritage DNA test kit used for the genealogical DNA research. This led to the discovery of DNA matches with the French Deleforge branch.",
    descriptionES: "El kit de prueba de ADN MyHeritage utilizado para la investigación genealógica de ADN. Esto llevó al descubrimiento de coincidencias de ADN con la rama francesa de los Deleforge.",
    descriptionDE: "Das MyHeritage DNA-Testkit, mit dem die genealogische DNA-Forschung durchgeführt wurde. Dies führte zur Entdeckung von DNA-Übereinstimmungen mit dem französischen Deleforge-Zweig.",
    descriptionSV: "MyHeritage DNA-testkitet som användes för den genealogiska DNA-forskningen. Detta ledde till upptäckten av DNA-matchningar med den franska Deleforge-grenen.",
    year: "2023",
    category: "document"
  },
  // Locaties
  {
    id: 115,
    src: bevrijdingTank,
    titleNL: "Bevrijding van Izegem (1944)",
    titleFR: "Libération d'Izegem (1944)",
    titleEN: "Liberation of Izegem (1944)",
    titleES: "Liberación de Izegem (1944)",
    titleDE: "Befreiung von Izegem (1944)",
    titleSV: "Befrielsen av Izegem (1944)",
    descriptionNL: "Een geallieerde tank rijdt door Izegem tijdens de bevrijding in september 1944. Na vier jaar Duitse bezetting werd de stad bevrijd door Poolse en Britse troepen.",
    descriptionFR: "Un char allié traverse Izegem lors de la libération en septembre 1944. Après quatre ans d'occupation allemande, la ville a été libérée par les troupes polonaises et britanniques.",
    descriptionEN: "An Allied tank drives through Izegem during the liberation in September 1944. After four years of German occupation, the city was liberated by Polish and British troops.",
    descriptionES: "Un tanque aliado recorre Izegem durante la liberación en septiembre de 1944. Después de cuatro años de ocupación alemana, la ciudad fue liberada por tropas polacas y británicas.",
    descriptionDE: "Ein alliierter Panzer fährt durch Izegem während der Befreiung im September 1944. Nach vier Jahren deutscher Besatzung wurde die Stadt von polnischen und britischen Truppen befreit.",
    descriptionSV: "En allierad stridsvagn kör genom Izegem under befrielsen i september 1944. Efter fyra år av tysk ockupation befriades staden av polska och brittiska trupper.",
    year: "1944",
    category: "historisch"
  },
  {
    id: 116,
    src: werkhuizenstraatColor,
    titleNL: "Werkhuizenstraat gebouwen (ingekleurd)",
    titleFR: "Bâtiments de la Werkhuizenstraat (colorisé)",
    titleEN: "Werkhuizenstraat buildings (colorized)",
    titleES: "Edificios de la Werkhuizenstraat (coloreado)",
    titleDE: "Gebäude in der Werkhuizenstraat (koloriert)",
    titleSV: "Byggnader på Werkhuizenstraat (kolorerad)",
    descriptionNL: "De gebouwen aan de Werkhuizenstraat in Izegem waar het familiebedrijf gevestigd was. Ingekleurde versie.",
    descriptionFR: "Les bâtiments de la Werkhuizenstraat à Izegem où l'entreprise familiale était établie. Version colorisée.",
    descriptionEN: "The buildings on Werkhuizenstraat in Izegem where the family business was located. Colorized version.",
    descriptionES: "Los edificios en la Werkhuizenstraat en Izegem donde estaba ubicada la empresa familiar. Versión coloreada.",
    descriptionDE: "Die Gebäude in der Werkhuizenstraat in Izegem, wo der Familienbetrieb ansässig war. Kolorierte Version.",
    descriptionSV: "Byggnaderna på Werkhuizenstraat i Izegem där familjeföretaget var beläget. Kolorerad version.",
    year: "ca. 1950",
    category: "locatie",
    isAiGenerated: true
  },
  {
    id: 117,
    src: stadhuisIzegem,
    titleNL: "Stadhuis van Izegem",
    titleFR: "Hôtel de ville d'Izegem",
    titleEN: "Town Hall of Izegem",
    titleES: "Ayuntamiento de Izegem",
    titleDE: "Rathaus von Izegem",
    titleSV: "Stadshuset i Izegem",
    descriptionNL: "Het stadhuis van Izegem, waar de burgerlijke aktes van de familie Deforce werden opgesteld en bewaard.",
    descriptionFR: "L'hôtel de ville d'Izegem, où les actes d'état civil de la famille Deforce ont été rédigés et conservés.",
    descriptionEN: "The town hall of Izegem, where the civil records of the Deforce family were drawn up and preserved.",
    descriptionES: "El ayuntamiento de Izegem, donde se redactaron y conservaron los registros civiles de la familia Deforce.",
    descriptionDE: "Das Rathaus von Izegem, wo die Standesamtsurkunden der Familie Deforce erstellt und aufbewahrt wurden.",
    descriptionSV: "Stadshuset i Izegem, där familjen Deforces civilregister upprättades och bevarades.",
    year: "ca. 2020",
    category: "locatie"
  },
  {
    id: 119,
    src: chatellenieLille,
    titleNL: "De Kasselrij Lille (1680)",
    titleFR: "La Châtellenie de Lille (1680)",
    titleEN: "The Castellany of Lille (1680)",
    titleES: "La Castellanía de Lille (1680)",
    titleDE: "Die Kastellanei Lille (1680)",
    titleSV: "Kastellaniet Lille (1680)",
    descriptionNL: "Historische kaart van de Kasselrij Lille rond 1680, het gebied waar onze stamouders Hubert Deleforge en Antoinette Follet leefden.",
    descriptionFR: "Carte historique de la Châtellenie de Lille vers 1680, la région où nos ancêtres Hubert Deleforge et Antoinette Follet vivaient.",
    descriptionEN: "Historical map of the Castellany of Lille around 1680, the area where our progenitors Hubert Deleforge and Antoinette Follet lived.",
    descriptionES: "Mapa histórico de la Castellanía de Lille alrededor de 1680, la zona donde nuestros progenitores Hubert Deleforge y Antoinette Follet vivieron.",
    descriptionDE: "Historische Karte der Kastellanei Lille um 1680, das Gebiet, in dem unsere Stammeltern Hubert Deleforge und Antoinette Follet lebten.",
    descriptionSV: "Historisk karta över kastellaniet Lille omkring 1680, området där våra stamfäder Hubert Deleforge och Antoinette Follet levde.",
    year: "ca. 1680",
    category: "locatie"
  },
  {
    id: 120,
    src: marktLille,
    titleNL: "Markt van Lille (1680)",
    titleFR: "Marché de Lille (1680)",
    titleEN: "Market of Lille (1680)",
    titleES: "Mercado de Lille (1680)",
    titleDE: "Markt von Lille (1680)",
    titleSV: "Marknaden i Lille (1680)",
    descriptionNL: "De markt van Lille omstreeks 1680. Lille was het economische en administratieve centrum van de kasselrij waar onze voorouders leefden.",
    descriptionFR: "Le marché de Lille vers 1680. Lille était le centre économique et administratif de la châtellenie où vivaient nos ancêtres.",
    descriptionEN: "The market of Lille around 1680. Lille was the economic and administrative center of the castellany where our ancestors lived.",
    descriptionES: "El mercado de Lille alrededor de 1680. Lille era el centro económico y administrativo de la castellanía donde vivían nuestros antepasados.",
    descriptionDE: "Der Markt von Lille um 1680. Lille war das wirtschaftliche und administrative Zentrum der Kastellanei, in der unsere Vorfahren lebten.",
    descriptionSV: "Marknaden i Lille omkring 1680. Lille var det ekonomiska och administrativa centret i kastellaniet där våra förfäder levde.",
    year: "ca. 1680",
    category: "ai-generated",
    isAiGenerated: true
  },
  // Beroep / vakmanschap
  {
    id: 121,
    src: dfMeubellabel,
    titleNL: "DF Meubellabel",
    titleFR: "Label meuble DF",
    titleEN: "DF Furniture label",
    titleES: "Etiqueta de muebles DF",
    titleDE: "DF Möbeletikett",
    titleSV: "DF Möbeletikett",
    descriptionNL: "Het kwaliteitslabel 'DF' dat Marcel Deforce op zijn meubels aanbracht. Dit merkteken garandeerde de herkomst en kwaliteit van het ambachtelijke werk.",
    descriptionFR: "Le label de qualité 'DF' que Marcel Deforce apposait sur ses meubles. Cette marque garantissait l'origine et la qualité du travail artisanal.",
    descriptionEN: "The quality label 'DF' that Marcel Deforce applied to his furniture. This mark guaranteed the origin and quality of the artisanal work.",
    descriptionES: "La etiqueta de calidad 'DF' que Marcel Deforce aplicaba a sus muebles. Esta marca garantizaba el origen y la calidad del trabajo artesanal.",
    descriptionDE: "Das Qualitätslabel 'DF', das Marcel Deforce auf seinen Möbeln anbrachte. Dieses Zeichen garantierte die Herkunft und Qualität der handwerklichen Arbeit.",
    descriptionSV: "Kvalitetsetiketten 'DF' som Marcel Deforce satte på sina möbler. Detta märke garanterade ursprunget och kvaliteten på det hantverksmässiga arbetet.",
    year: "ca. 1930-1960",
    category: "beroep"
  },
  {
    id: 122,
    src: meubelbeurs,
    titleNL: "Meubelbeurs - Kleinmeubelen (ingekleurd)",
    titleFR: "Salon du meuble - Petits meubles (colorisé)",
    titleEN: "Furniture fair - Small furniture (colorized)",
    titleES: "Feria del mueble - Muebles pequeños (coloreado)",
    titleDE: "Möbelmesse - Kleinmöbel (koloriert)",
    titleSV: "Möbelmässa - Småmöbler (kolorerad)",
    descriptionNL: "Tentoonstellingsstand met kleinmeubelen van het bedrijf Deforce op een meubelbeurs. Ingekleurde versie van het origineel.",
    descriptionFR: "Stand d'exposition avec petits meubles de l'entreprise Deforce lors d'un salon du meuble. Version colorisée de l'original.",
    descriptionEN: "Exhibition stand with small furniture from the Deforce company at a furniture fair. Colorized version of the original.",
    descriptionES: "Stand de exposición con muebles pequeños de la empresa Deforce en una feria del mueble. Versión coloreada del original.",
    descriptionDE: "Messestand mit Kleinmöbeln des Unternehmens Deforce auf einer Möbelmesse. Kolorierte Version des Originals.",
    descriptionSV: "Utställningsmonter med småmöbler från företaget Deforce på en möbelmässa. Kolorerad version av originalet.",
    year: "ca. 1950",
    category: "beroep",
    isAiGenerated: true
  },
  {
    id: 123,
    src: salonMeubleParis,
    titleNL: "Salon du Meuble Paris (ingekleurd)",
    titleFR: "Salon du Meuble Paris (colorisé)",
    titleEN: "Paris Furniture Fair (colorized)",
    titleES: "Salón del Mueble París (coloreado)",
    titleDE: "Pariser Möbelmesse (koloriert)",
    titleSV: "Möbelmässan i Paris (kolorerad)",
    descriptionNL: "Marcel Deforce bezocht de Salon du Meuble in Parijs om inspiratie op te doen voor zijn meubelontwerpen. Ingekleurde versie.",
    descriptionFR: "Marcel Deforce visitait le Salon du Meuble à Paris pour s'inspirer pour ses créations de meubles. Version colorisée.",
    descriptionEN: "Marcel Deforce visited the Salon du Meuble in Paris for inspiration for his furniture designs. Colorized version.",
    descriptionES: "Marcel Deforce visitaba el Salón del Mueble en París para inspirarse para sus diseños de muebles. Versión coloreada.",
    descriptionDE: "Marcel Deforce besuchte den Salon du Meuble in Paris, um sich für seine Möbelentwürfe inspirieren zu lassen. Kolorierte Version.",
    descriptionSV: "Marcel Deforce besökte Salon du Meuble i Paris för att hämta inspiration till sina möbeldesigner. Kolorerad version.",
    year: "ca. 1930",
    category: "beroep",
    isAiGenerated: true
  },
  {
    id: 124,
    src: portretkaderDetail1,
    titleNL: "Portretkader - Detail houtsnijwerk",
    titleFR: "Cadre portrait - Détail sculpture sur bois",
    titleEN: "Portrait frame - Woodcarving detail",
    titleES: "Marco de retrato - Detalle de talla",
    titleDE: "Porträtrahmen - Detail Holzschnitzerei",
    titleSV: "Porträttram - Detalj träsnideri",
    descriptionNL: "Detail van het houtsnijwerk op het portretkader dat Marcel op 21-jarige leeftijd maakte. De fijne sculpturen tonen zijn uitzonderlijk vakmanschap.",
    descriptionFR: "Détail de la sculpture sur bois du cadre portrait que Marcel a réalisé à l'âge de 21 ans. Les fines sculptures montrent son savoir-faire exceptionnel.",
    descriptionEN: "Detail of the woodcarving on the portrait frame that Marcel made at age 21. The fine sculptures show his exceptional craftsmanship.",
    descriptionES: "Detalle de la talla en madera del marco de retrato que Marcel hizo a los 21 años. Las finas esculturas muestran su excepcional artesanía.",
    descriptionDE: "Detail der Holzschnitzerei am Porträtrahmen, den Marcel im Alter von 21 Jahren fertigte. Die feinen Skulpturen zeigen sein außergewöhnliches Handwerk.",
    descriptionSV: "Detalj av träsnideriet på porträttramen som Marcel tillverkade vid 21 års ålder. De fina skulpturerna visar hans exceptionella hantverksskicklighet.",
    year: "1915",
    category: "beroep"
  },
  {
    id: 125,
    src: portretkaderGrootmoeder,
    titleNL: "Portretkader met foto van grootmoeder",
    titleFR: "Cadre portrait avec photo de grand-mère",
    titleEN: "Portrait frame with grandmother's photo",
    titleES: "Marco de retrato con foto de la abuela",
    titleDE: "Porträtrahmen mit Foto der Großmutter",
    titleSV: "Porträttram med farmors foto",
    descriptionNL: "Het imposante portretkader van Marcel met een foto van grootmoeder. Dit meesterwerk in massieve eik toont de kunstzinnigheid en het vakmanschap van Marcel Deforce.",
    descriptionFR: "L'imposant cadre portrait de Marcel avec une photo de grand-mère. Ce chef-d'œuvre en chêne massif montre le sens artistique et le savoir-faire de Marcel Deforce.",
    descriptionEN: "Marcel's imposing portrait frame with a photo of grandmother. This masterpiece in solid oak shows the artistry and craftsmanship of Marcel Deforce.",
    descriptionES: "El imponente marco de retrato de Marcel con una foto de la abuela. Esta obra maestra en roble macizo muestra la destreza artística y la artesanía de Marcel Deforce.",
    descriptionDE: "Marcels imposanter Porträtrahmen mit einem Foto der Großmutter. Dieses Meisterwerk in massiver Eiche zeigt die Kunstfertigkeit und das Handwerk von Marcel Deforce.",
    descriptionSV: "Marcels imponerande porträttram med ett foto av farmor. Detta mästerverk i massiv ek visar Marcel Deforces konstnärlighet och hantverksskicklighet.",
    year: "ca. 1920",
    category: "beroep"
  },
  {
    id: 126,
    src: portretkaderVerschaeve,
    titleNL: "Portretkader Verschaeve",
    titleFR: "Cadre portrait Verschaeve",
    titleEN: "Portrait frame Verschaeve",
    titleES: "Marco de retrato Verschaeve",
    titleDE: "Porträtrahmen Verschaeve",
    titleSV: "Porträttram Verschaeve",
    descriptionNL: "Een portretkader gemaakt door Marcel Deforce met het portret van Cyriel Verschaeve. Dit werk toont Marcels vermogen om historische figuren in houtsnijwerk vast te leggen.",
    descriptionFR: "Un cadre portrait réalisé par Marcel Deforce avec le portrait de Cyriel Verschaeve. Cette œuvre montre la capacité de Marcel à capturer des personnages historiques dans la sculpture sur bois.",
    descriptionEN: "A portrait frame made by Marcel Deforce with the portrait of Cyriel Verschaeve. This work shows Marcel's ability to capture historical figures in woodcarving.",
    descriptionES: "Un marco de retrato hecho por Marcel Deforce con el retrato de Cyriel Verschaeve. Esta obra muestra la capacidad de Marcel para capturar figuras históricas en talla de madera.",
    descriptionDE: "Ein von Marcel Deforce gefertigter Porträtrahmen mit dem Porträt von Cyriel Verschaeve. Dieses Werk zeigt Marcels Fähigkeit, historische Persönlichkeiten in Holzschnitzerei festzuhalten.",
    descriptionSV: "En porträttram gjord av Marcel Deforce med porträttet av Cyriel Verschaeve. Detta verk visar Marcels förmåga att fånga historiska figurer i träsnideri.",
    year: "ca. 1930",
    category: "beroep"
  },
  // Brand
  {
    id: 128,
    src: brandKrant,
    titleNL: "Krantenbericht over de brand",
    titleFR: "Article de journal sur l'incendie",
    titleEN: "Newspaper article about the fire",
    titleES: "Artículo de periódico sobre el incendio",
    titleDE: "Zeitungsartikel über den Brand",
    titleSV: "Tidningsartikel om branden",
    descriptionNL: "Het krantenbericht in De Standaard over de verwoestende brand die het familiebedrijf Deforce trof. De brand vernietigde een groot deel van het atelier en de voorraad.",
    descriptionFR: "L'article de journal dans De Standaard sur l'incendie dévastateur qui a frappé l'entreprise familiale Deforce. L'incendie a détruit une grande partie de l'atelier et du stock.",
    descriptionEN: "The newspaper article in De Standaard about the devastating fire that struck the Deforce family business. The fire destroyed a large part of the workshop and stock.",
    descriptionES: "El artículo de periódico en De Standaard sobre el devastador incendio que golpeó la empresa familiar Deforce. El incendio destruyó gran parte del taller y el stock.",
    descriptionDE: "Der Zeitungsartikel in De Standaard über den verheerenden Brand, der das Familienunternehmen Deforce traf. Der Brand zerstörte einen großen Teil der Werkstatt und des Lagerbestands.",
    descriptionSV: "Tidningsartikeln i De Standaard om den förödande branden som drabbade familjeföretaget Deforce. Branden förstörde en stor del av verkstaden och lagret.",
    year: "ca. 1960",
    category: "document"
  },
  {
    id: 129,
    src: brandSchade1,
    titleNL: "Brandschade aan het atelier",
    titleFR: "Dégâts de l'incendie à l'atelier",
    titleEN: "Fire damage to the workshop",
    titleES: "Daños por el incendio en el taller",
    titleDE: "Brandschäden an der Werkstatt",
    titleSV: "Brandskador på verkstaden",
    descriptionNL: "De ravage na de brand in het atelier van het familiebedrijf Deforce. De verwoesting was enorm: machines, gereedschap, meubels in productie en voorraad gingen verloren.",
    descriptionFR: "Les ravages après l'incendie dans l'atelier de l'entreprise familiale Deforce. La destruction était énorme : machines, outils, meubles en production et stock ont été perdus.",
    descriptionEN: "The devastation after the fire in the Deforce family business workshop. The destruction was enormous: machines, tools, furniture in production and stock were lost.",
    descriptionES: "La devastación después del incendio en el taller de la empresa familiar Deforce. La destrucción fue enorme: máquinas, herramientas, muebles en producción y stock se perdieron.",
    descriptionDE: "Die Verwüstung nach dem Brand in der Werkstatt des Familienunternehmens Deforce. Die Zerstörung war enorm: Maschinen, Werkzeuge, Möbel in Produktion und Lagerbestand gingen verloren.",
    descriptionSV: "Förödelsen efter branden i verkstaden i familjeföretaget Deforce. Förstörelsen var enorm: maskiner, verktyg, möbler under produktion och lager gick förlorade.",
    year: "ca. 1960",
    category: "locatie"
  },
  {
    id: 130,
    src: gezinsfoto1943,
    titleNL: "Gezinsfoto (1943)",
    titleFR: "Photo de famille (1943)",
    titleEN: "Family photo (1943)",
    titleES: "Foto familiar (1943)",
    titleDE: "Familienfoto (1943)",
    titleSV: "Familjefoto (1943)",
    descriptionNL: "Een gezinsfoto van de familie Deforce-Geldof uit 1943, genomen tijdens de oorlogsjaren.",
    descriptionFR: "Une photo de famille de la famille Deforce-Geldof de 1943, prise pendant les années de guerre.",
    descriptionEN: "A family photo of the Deforce-Geldof family from 1943, taken during the war years.",
    descriptionES: "Una foto familiar de la familia Deforce-Geldof de 1943, tomada durante los años de guerra.",
    descriptionDE: "Ein Familienfoto der Familie Deforce-Geldof aus 1943, aufgenommen während der Kriegsjahre.",
    descriptionSV: "Ett familjefoto av familjen Deforce-Geldof från 1943, taget under krigsåren.",
    year: "1943",
    category: "familie"
  },
  {
    id: 131,
    src: verslagboekJaarverslag,
    titleNL: "Jaarverslag PVBA Deforce",
    titleFR: "Rapport annuel SPRL Deforce",
    titleEN: "Annual report PVBA Deforce",
    titleES: "Informe anual PVBA Deforce",
    titleDE: "Jahresbericht PVBA Deforce",
    titleSV: "Årsredovisning PVBA Deforce",
    descriptionNL: "Een pagina uit het jaarverslag van PVBA Deforce met financiële gegevens over het familiebedrijf.",
    descriptionFR: "Une page du rapport annuel de la SPRL Deforce avec les données financières de l'entreprise familiale.",
    descriptionEN: "A page from the annual report of PVBA Deforce with financial data about the family business.",
    descriptionES: "Una página del informe anual de PVBA Deforce con datos financieros sobre la empresa familiar.",
    descriptionDE: "Eine Seite aus dem Jahresbericht der PVBA Deforce mit Finanzdaten über den Familienbetrieb.",
    descriptionSV: "En sida från årsredovisningen för PVBA Deforce med ekonomiska uppgifter om familjeföretaget.",
    year: "ca. 1960",
    category: "document"
  },
  // === Kaarten ===
  {
    id: 133,
    src: izegemKaart1850,
    titleNL: "Kaart van Izegem (1850)",
    titleFR: "Carte d'Izegem (1850)",
    titleEN: "Map of Izegem (1850)",
    titleES: "Mapa de Izegem (1850)",
    titleDE: "Karte von Izegem (1850)",
    titleSV: "Karta över Izegem (1850)",
    descriptionNL: "Kaart van Izegem omstreeks 1850, toen de gemeente nog grotendeels agrarisch was. De familie Deforce woonde en werkte in deze omgeving als timmerlieden.",
    descriptionFR: "Carte d'Izegem vers 1850, quand la commune était encore largement agricole. La famille Deforce y vivait et travaillait comme charpentiers.",
    descriptionEN: "Map of Izegem around 1850, when the municipality was still largely agricultural. The Deforce family lived and worked here as carpenters.",
    descriptionES: "Mapa de Izegem alrededor de 1850, cuando el municipio era aún predominantemente agrícola. La familia Deforce vivía y trabajaba aquí como carpinteros.",
    descriptionDE: "Karte von Izegem um 1850, als die Gemeinde noch weitgehend landwirtschaftlich geprägt war. Die Familie Deforce lebte und arbeitete hier als Zimmerleute.",
    descriptionSV: "Karta över Izegem omkring 1850, då kommunen fortfarande var övervägande jordbrukande. Familjen Deforce levde och arbetade här som snickare.",
    year: "1850",
    category: "locatie"
  },
  {
    id: 134,
    src: izegemKaart1910,
    titleNL: "Kaart van Izegem (1910)",
    titleFR: "Carte d'Izegem (1910)",
    titleEN: "Map of Izegem (1910)",
    titleES: "Mapa de Izegem (1910)",
    titleDE: "Karte von Izegem (1910)",
    titleSV: "Karta över Izegem (1910)",
    descriptionNL: "Kaart van Izegem rond 1910, met de groeiende industrialisatie en de uitbreiding van het stadscentrum. Het familiebedrijf Deforce was toen al gevestigd aan de Vandenbogaerdelaan.",
    descriptionFR: "Carte d'Izegem vers 1910, avec l'industrialisation croissante et l'expansion du centre-ville. L'entreprise familiale Deforce était déjà établie au Vandenbogaerdelaan.",
    descriptionEN: "Map of Izegem around 1910, with growing industrialization and expansion of the town center. The Deforce family business was already established at Vandenbogaerdelaan.",
    descriptionES: "Mapa de Izegem alrededor de 1910, con la creciente industrialización y la expansión del centro urbano. La empresa familiar Deforce ya estaba establecida en Vandenbogaerdelaan.",
    descriptionDE: "Karte von Izegem um 1910, mit zunehmender Industrialisierung und Erweiterung des Stadtzentrums. Der Familienbetrieb Deforce war bereits an der Vandenbogaerdelaan ansässig.",
    descriptionSV: "Karta över Izegem omkring 1910, med växande industrialisering och utvidgning av stadskärnan. Familjeföretaget Deforce var redan etablerat vid Vandenbogaerdelaan.",
    year: "1910",
    category: "locatie"
  },
  {
    id: 135,
    src: izegemKaart2024,
    titleNL: "Kaart van Izegem (2024)",
    titleFR: "Carte d'Izegem (2024)",
    titleEN: "Map of Izegem (2024)",
    titleES: "Mapa de Izegem (2024)",
    titleDE: "Karte von Izegem (2024)",
    titleSV: "Karta över Izegem (2024)",
    descriptionNL: "Hedendaagse kaart van Izegem in 2024. De stad is sterk gegroeid ten opzichte van de historische kaarten. De Vandenbogaerdelaan is nog steeds herkenbaar.",
    descriptionFR: "Carte contemporaine d'Izegem en 2024. La ville s'est considérablement développée par rapport aux cartes historiques. La Vandenbogaerdelaan est encore reconnaissable.",
    descriptionEN: "Contemporary map of Izegem in 2024. The city has grown significantly compared to the historical maps. The Vandenbogaerdelaan is still recognizable.",
    descriptionES: "Mapa contemporáneo de Izegem en 2024. La ciudad ha crecido significativamente en comparación con los mapas históricos. La Vandenbogaerdelaan es aún reconocible.",
    descriptionDE: "Zeitgenössische Karte von Izegem 2024. Die Stadt ist im Vergleich zu den historischen Karten stark gewachsen. Die Vandenbogaerdelaan ist noch erkennbar.",
    descriptionSV: "Samtida karta över Izegem 2024. Staden har vuxit avsevärt jämfört med de historiska kartorna. Vandenbogaerdelaan är fortfarande igenkännlig.",
    year: "2024",
    category: "locatie"
  },
  {
    id: 136,
    src: kaartFransVlaanderen,
    titleNL: "Kaart van Frans-Vlaanderen",
    titleFR: "Carte de la Flandre française",
    titleEN: "Map of French Flanders",
    titleES: "Mapa de Flandes francés",
    titleDE: "Karte von Französisch-Flandern",
    titleSV: "Karta över Franska Flandern",
    descriptionNL: "Kaart van Frans-Vlaanderen, de streek waar onze stamouders Hubert Deleforge en Antoinette Follet leefden. Dit gebied werd in 1668 door Lodewijk XIV bij Frankrijk ingelijfd.",
    descriptionFR: "Carte de la Flandre française, la région où nos ancêtres Hubert Deleforge et Antoinette Follet vivaient. Cette région a été annexée par Louis XIV à la France en 1668.",
    descriptionEN: "Map of French Flanders, the region where our progenitors Hubert Deleforge and Antoinette Follet lived. This area was annexed by Louis XIV to France in 1668.",
    descriptionES: "Mapa de Flandes francés, la región donde vivieron nuestros progenitores Hubert Deleforge y Antoinette Follet. Esta zona fue anexada por Luis XIV a Francia en 1668.",
    descriptionDE: "Karte von Französisch-Flandern, der Region, in der unsere Stammeltern Hubert Deleforge und Antoinette Follet lebten. Dieses Gebiet wurde 1668 von Ludwig XIV. Frankreich einverleibt.",
    descriptionSV: "Karta över Franska Flandern, regionen där våra stamfäder Hubert Deleforge och Antoinette Follet levde. Området annekterades av Ludvig XIV till Frankrike 1668.",
    year: "17e-18e eeuw",
    category: "locatie"
  },
  {
    id: 137,
    src: kaartVlaanderen1700,
    titleNL: "Kaart van Vlaanderen (ca. 1700)",
    titleFR: "Carte de la Flandre (vers 1700)",
    titleEN: "Map of Flanders (ca. 1700)",
    titleES: "Mapa de Flandes (ca. 1700)",
    titleDE: "Karte von Flandern (ca. 1700)",
    titleSV: "Karta över Flandern (ca. 1700)",
    descriptionNL: "Historische kaart van Vlaanderen rond 1700, die het onderscheid toont tussen de Zuidelijke Nederlanden (Spaans/Oostenrijks) en het door Frankrijk geannexeerde Frans-Vlaanderen.",
    descriptionFR: "Carte historique de la Flandre vers 1700, montrant la distinction entre les Pays-Bas méridionaux (espagnols/autrichiens) et la Flandre française annexée par la France.",
    descriptionEN: "Historical map of Flanders around 1700, showing the distinction between the Southern Netherlands (Spanish/Austrian) and French-annexed French Flanders.",
    descriptionES: "Mapa histórico de Flandes alrededor de 1700, que muestra la distinción entre los Países Bajos del Sur (españoles/austriacos) y Flandes francés anexado por Francia.",
    descriptionDE: "Historische Karte von Flandern um 1700, die den Unterschied zwischen den Südlichen Niederlanden (spanisch/österreichisch) und dem von Frankreich annektierten Französisch-Flandern zeigt.",
    descriptionSV: "Historisk karta över Flandern omkring 1700, som visar skillnaden mellan Sydliga Nederländerna (spanska/österrikiska) och det av Frankrike annekterade Franska Flandern.",
    year: "ca. 1700",
    category: "locatie"
  },
  {
    id: 138,
    src: oudeKaartVlaanderen,
    titleNL: "Oude kaart van Vlaanderen",
    titleFR: "Ancienne carte de la Flandre",
    titleEN: "Old map of Flanders",
    titleES: "Antiguo mapa de Flandes",
    titleDE: "Alte Karte von Flandern",
    titleSV: "Gammal karta över Flandern",
    descriptionNL: "Een oude historische kaart van Vlaanderen die de oorspronkelijke grenzen van het Graafschap Vlaanderen toont.",
    descriptionFR: "Une ancienne carte historique de la Flandre montrant les frontières originales du Comté de Flandre.",
    descriptionEN: "An old historical map of Flanders showing the original borders of the County of Flanders.",
    descriptionES: "Un antiguo mapa histórico de Flandes que muestra las fronteras originales del Condado de Flandes.",
    descriptionDE: "Eine alte historische Karte von Flandern, die die ursprünglichen Grenzen der Grafschaft Flandern zeigt.",
    descriptionSV: "En gammal historisk karta över Flandern som visar de ursprungliga gränserna för grevskapet Flandern.",
    year: "16e-17e eeuw",
    category: "locatie"
  },
  {
    id: 139,
    src: migratieKaart,
    titleNL: "Migratiekaart Frans-Vlaanderen",
    titleFR: "Carte de migration Flandre française",
    titleEN: "Migration map French Flanders",
    titleES: "Mapa de migración Flandes francés",
    titleDE: "Migrationskarte Französisch-Flandern",
    titleSV: "Migrationskarta Franska Flandern",
    descriptionNL: "Kaart die de migratieroute toont van de familie Deleforge/Deforce vanuit Frans-Vlaanderen naar Belgisch Vlaanderen in de 18e-19e eeuw.",
    descriptionFR: "Carte montrant la route de migration de la famille Deleforge/Deforce de la Flandre française vers la Flandre belge aux 18e-19e siècles.",
    descriptionEN: "Map showing the migration route of the Deleforge/Deforce family from French Flanders to Belgian Flanders in the 18th-19th centuries.",
    descriptionES: "Mapa que muestra la ruta de migración de la familia Deleforge/Deforce desde Flandes francés hasta Flandes belga en los siglos XVIII-XIX.",
    descriptionDE: "Karte, die die Migrationsroute der Familie Deleforge/Deforce von Französisch-Flandern nach Belgisch-Flandern im 18.-19. Jahrhundert zeigt.",
    descriptionSV: "Karta som visar migrationsrutten för familjen Deleforge/Deforce från Franska Flandern till Belgiska Flandern under 1700-1800-talen.",
    year: "18e-19e eeuw",
    category: "locatie"
  },
  // === DNA-onderzoek ===
  {
    id: 140,
    src: dnaEtniciteitsKaart,
    titleNL: "DNA Etniciteitskaart",
    titleFR: "Carte d'ethnicité ADN",
    titleEN: "DNA Ethnicity Map",
    titleES: "Mapa de etnicidad ADN",
    titleDE: "DNA-Ethnizitätskarte",
    titleSV: "DNA-etnicitetskarta",
    descriptionNL: "De etniciteitskaart op basis van het DNA-onderzoek, die de geografische herkomst toont van onze genetische achtergrond.",
    descriptionFR: "La carte d'ethnicité basée sur l'analyse ADN, montrant l'origine géographique de notre patrimoine génétique.",
    descriptionEN: "The ethnicity map based on DNA research, showing the geographic origin of our genetic heritage.",
    descriptionES: "El mapa de etnicidad basado en la investigación de ADN, que muestra el origen geográfico de nuestra herencia genética.",
    descriptionDE: "Die Ethnizitätskarte basierend auf der DNA-Analyse, die die geografische Herkunft unseres genetischen Erbes zeigt.",
    descriptionSV: "Etnicitetskarta baserad på DNA-forskning, som visar det geografiska ursprunget för vårt genetiska arv.",
    year: "2023",
    category: "document"
  },
  {
    id: 141,
    src: dnaEtniciteitsLijst,
    titleNL: "DNA Etniciteitsresultaten",
    titleFR: "Résultats d'ethnicité ADN",
    titleEN: "DNA Ethnicity Results",
    titleES: "Resultados de etnicidad ADN",
    titleDE: "DNA-Ethnizitätsergebnisse",
    titleSV: "DNA-etnicitetsresultat",
    descriptionNL: "De gedetailleerde lijst met etniciteitsresultaten uit het DNA-onderzoek, met percentages per regio.",
    descriptionFR: "La liste détaillée des résultats d'ethnicité de l'analyse ADN, avec les pourcentages par région.",
    descriptionEN: "The detailed list of ethnicity results from the DNA research, with percentages per region.",
    descriptionES: "La lista detallada de resultados de etnicidad de la investigación de ADN, con porcentajes por región.",
    descriptionDE: "Die detaillierte Liste der Ethnizitätsergebnisse aus der DNA-Analyse, mit Prozentangaben pro Region.",
    descriptionSV: "Den detaljerade listan över etnicitetsresultat från DNA-forskningen, med procentandelar per region.",
    year: "2023",
    category: "document"
  },
  {
    id: 143,
    src: dnaMatches,
    titleNL: "DNA-matches overzicht",
    titleFR: "Aperçu des correspondances ADN",
    titleEN: "DNA matches overview",
    titleES: "Resumen de coincidencias de ADN",
    titleDE: "DNA-Übereinstimmungen Übersicht",
    titleSV: "DNA-matchningar översikt",
    descriptionNL: "Overzicht van DNA-matches gevonden via MyHeritage, die de verwantschap met andere families bevestigen.",
    descriptionFR: "Aperçu des correspondances ADN trouvées via MyHeritage, confirmant la parenté avec d'autres familles.",
    descriptionEN: "Overview of DNA matches found via MyHeritage, confirming kinship with other families.",
    descriptionES: "Resumen de coincidencias de ADN encontradas a través de MyHeritage, que confirman el parentesco con otras familias.",
    descriptionDE: "Übersicht der DNA-Übereinstimmungen, die über MyHeritage gefunden wurden und die Verwandtschaft mit anderen Familien bestätigen.",
    descriptionSV: "Översikt av DNA-matchningar hittade via MyHeritage, som bekräftar släktskap med andra familjer.",
    year: "2023",
    category: "document"
  },
  {
    id: 144,
    src: dnaGeldofMatch,
    titleNL: "DNA-match Geldof-lijn",
    titleFR: "Correspondance ADN lignée Geldof",
    titleEN: "DNA match Geldof line",
    titleES: "Coincidencia ADN línea Geldof",
    titleDE: "DNA-Übereinstimmung Geldof-Linie",
    titleSV: "DNA-matchning Geldof-linjen",
    descriptionNL: "De DNA-match die de verwantschap met de Geldof-lijn bevestigt. Deze match ondersteunt de genealogische documentatie.",
    descriptionFR: "La correspondance ADN confirmant la parenté avec la lignée Geldof. Cette correspondance soutient la documentation généalogique.",
    descriptionEN: "The DNA match confirming kinship with the Geldof line. This match supports the genealogical documentation.",
    descriptionES: "La coincidencia de ADN que confirma el parentesco con la línea Geldof. Esta coincidencia respalda la documentación genealógica.",
    descriptionDE: "Die DNA-Übereinstimmung, die die Verwandtschaft mit der Geldof-Linie bestätigt. Diese Übereinstimmung unterstützt die genealogische Dokumentation.",
    descriptionSV: "DNA-matchningen som bekräftar släktskapet med Geldof-linjen. Denna matchning stöder den genealogiska dokumentationen.",
    year: "2023",
    category: "document"
  },
  {
    id: 145,
    src: dnaDeleforgeBoek,
    titleNL: "Boek over de familie Deleforge",
    titleFR: "Livre sur la famille Deleforge",
    titleEN: "Book about the Deleforge family",
    titleES: "Libro sobre la familia Deleforge",
    titleDE: "Buch über die Familie Deleforge",
    titleSV: "Bok om familjen Deleforge",
    descriptionNL: "Een genealogisch boek over de familie Deleforge uit Frankrijk, dat de link documenteert tussen de Franse en Belgische takken van de familie.",
    descriptionFR: "Un livre généalogique sur la famille Deleforge de France, documentant le lien entre les branches française et belge de la famille.",
    descriptionEN: "A genealogical book about the Deleforge family from France, documenting the link between the French and Belgian branches of the family.",
    descriptionES: "Un libro genealógico sobre la familia Deleforge de Francia, que documenta el vínculo entre las ramas francesa y belga de la familia.",
    descriptionDE: "Ein genealogisches Buch über die Familie Deleforge aus Frankreich, das die Verbindung zwischen dem französischen und belgischen Familienzweig dokumentiert.",
    descriptionSV: "En genealogisk bok om familjen Deleforge från Frankrike, som dokumenterar kopplingen mellan de franska och belgiska grenarna av familjen.",
    year: "ca. 2010",
    category: "document"
  },
  // === AI-voorbeeldfoto's ===
  {
    id: 147,
    src: aiFotoVoorbeeld2,
    titleNL: "AI-beeldherstel voorbeeld 2",
    titleFR: "Exemple de restauration IA 2",
    titleEN: "AI image restoration example 2",
    titleES: "Ejemplo de restauración IA 2",
    titleDE: "KI-Bildrestaurierung Beispiel 2",
    titleSV: "AI-bildrestaurering exempel 2",
    descriptionNL: "Tweede voorbeeld van AI-beeldherstel. De prompt: 'maak die foto scherper, gekleurd, als met een moderne digitale camera genomen; behoud de gezichten zo getrouw mogelijk'.",
    descriptionFR: "Deuxième exemple de restauration d'image par IA. Le prompt : 'rendre la photo plus nette, en couleur, comme prise avec un appareil photo numérique moderne ; conserver les visages aussi fidèlement que possible'.",
    descriptionEN: "Second example of AI image restoration. The prompt: 'make the photo sharper, colored, as if taken with a modern digital camera; preserve the faces as faithfully as possible'.",
    descriptionES: "Segundo ejemplo de restauración de imagen por IA. El prompt: 'hacer la foto más nítida, en color, como tomada con una cámara digital moderna; preservar los rostros lo más fielmente posible'.",
    descriptionDE: "Zweites Beispiel für KI-Bildrestaurierung. Der Prompt: 'Foto schärfer machen, farbig, wie mit einer modernen Digitalkamera aufgenommen; Gesichter so originalgetreu wie möglich erhalten'.",
    descriptionSV: "Andra exemplet på AI-bildrestaurering. Prompten: 'gör fotot skarpare, i färg, som taget med en modern digitalkamera; bevara ansiktena så troget som möjligt'.",
    year: "2024",
    category: "ai-generated",
    isAiGenerated: true
  },
  // === Overige ontbrekende ===
  {
    id: 148,
    src: antoonVandrommeColor,
    titleNL: "Antoon Vandromme (ingekleurd)",
    titleFR: "Antoon Vandromme (colorisé)",
    titleEN: "Antoon Vandromme (colorized)",
    titleES: "Antoon Vandromme (coloreado)",
    titleDE: "Antoon Vandromme (koloriert)",
    titleSV: "Antoon Vandromme (kolorerad)",
    descriptionNL: "Portret van Antoon Vandromme, verbonden met het verhaal over het portretkader van Cyriel Verschaeve. Ingekleurde versie.",
    descriptionFR: "Portrait d'Antoon Vandromme, lié à l'histoire du cadre portrait de Cyriel Verschaeve. Version colorisée.",
    descriptionEN: "Portrait of Antoon Vandromme, connected to the story of the portrait frame of Cyriel Verschaeve. Colorized version.",
    descriptionES: "Retrato de Antoon Vandromme, vinculado a la historia del marco de retrato de Cyriel Verschaeve. Versión coloreada.",
    descriptionDE: "Porträt von Antoon Vandromme, verbunden mit der Geschichte des Porträtrahmens von Cyriel Verschaeve. Kolorierte Version.",
    descriptionSV: "Porträtt av Antoon Vandromme, kopplad till berättelsen om porträttramen av Cyriel Verschaeve. Kolorerad version.",
    year: "ca. 1930",
    category: "portret",
    isAiGenerated: true
  },
  {
    id: 149,
    src: huwelijksgedichtP2,
    titleNL: "Huwelijksgedicht 1945 - pagina 2",
    titleFR: "Poème de mariage 1945 - page 2",
    titleEN: "Wedding poem 1945 - page 2",
    titleES: "Poema de boda 1945 - página 2",
    titleDE: "Hochzeitsgedicht 1945 - Seite 2",
    titleSV: "Bröllopspoem 1945 - sida 2",
    descriptionNL: "De tweede pagina van het originele handgeschreven huwelijksgedicht door Emiel Geldof (1945). Het gedicht telt 13 strofen in het Nederlands.",
    descriptionFR: "La deuxième page du poème de mariage original manuscrit par Émile Geldof (1945). Le poème compte 13 strophes en néerlandais.",
    descriptionEN: "The second page of the original handwritten wedding poem by Emile Geldof (1945). The poem consists of 13 stanzas in Dutch.",
    descriptionES: "La segunda página del poema de boda original manuscrito por Emile Geldof (1945). El poema consta de 13 estrofas en neerlandés.",
    descriptionDE: "Die zweite Seite des originalen handschriftlichen Hochzeitsgedichts von Emile Geldof (1945). Das Gedicht umfasst 13 Strophen auf Niederländisch.",
    descriptionSV: "Den andra sidan av det ursprungliga handskrivna bröllopspoemet av Emile Geldof (1945). Poemet består av 13 strofer på nederländska.",
    year: "1945",
    category: "document"
  },
  {
    id: 150,
    src: ieeRapport,
    titleNL: "IEE-rapport pagina",
    titleFR: "Page du rapport IEE",
    titleEN: "IEE report page",
    titleES: "Página del informe IEE",
    titleDE: "IEE-Berichtsseite",
    titleSV: "IEE-rapportsida",
    descriptionNL: "Een pagina uit het IEE-rapport met gegevens over het familiebedrijf.",
    descriptionFR: "Une page du rapport IEE avec des données sur l'entreprise familiale.",
    descriptionEN: "A page from the IEE report with data about the family business.",
    descriptionES: "Una página del informe IEE con datos sobre la empresa familiar.",
    descriptionDE: "Eine Seite aus dem IEE-Bericht mit Daten über den Familienbetrieb.",
    descriptionSV: "En sida från IEE-rapporten med uppgifter om familjeföretaget.",
    year: "ca. 1960",
    category: "document"
  },
  {
    id: 154,
    src: brandSchade2,
    titleNL: "Brandschade - detail 2",
    titleFR: "Dégâts d'incendie - détail 2",
    titleEN: "Fire damage - detail 2",
    titleES: "Daños por incendio - detalle 2",
    titleDE: "Brandschäden - Detail 2",
    titleSV: "Brandskador - detalj 2",
    descriptionNL: "Verdere beelden van de brandschade aan het atelier en de opslagruimtes van het familiebedrijf.",
    descriptionFR: "Images supplémentaires des dégâts d'incendie à l'atelier et aux entrepôts de l'entreprise familiale.",
    descriptionEN: "Further images of the fire damage to the workshop and storage areas of the family business.",
    descriptionES: "Más imágenes de los daños por incendio en el taller y áreas de almacenamiento de la empresa familiar.",
    descriptionDE: "Weitere Bilder der Brandschäden an der Werkstatt und den Lagerhallen des Familienunternehmens.",
    descriptionSV: "Ytterligare bilder av brandskadorna på verkstaden och lagerlokalerna i familjeföretaget.",
    year: "ca. 1960",
    category: "locatie"
  },
  {
    id: 155,
    src: brandSchade3,
    titleNL: "Brandschade - detail 3",
    titleFR: "Dégâts d'incendie - détail 3",
    titleEN: "Fire damage - detail 3",
    titleES: "Daños por incendio - detalle 3",
    titleDE: "Brandschäden - Detail 3",
    titleSV: "Brandskador - detalj 3",
    descriptionNL: "De verwoesting na de brand was enorm. Het zou jaren duren voordat het bedrijf volledig hersteld was.",
    descriptionFR: "La destruction après l'incendie était énorme. Il faudrait des années avant que l'entreprise ne soit entièrement rétablie.",
    descriptionEN: "The devastation after the fire was enormous. It would take years before the business was fully recovered.",
    descriptionES: "La devastación después del incendio fue enorme. Tomaría años antes de que el negocio se recuperara completamente.",
    descriptionDE: "Die Verwüstung nach dem Brand war enorm. Es sollte Jahre dauern, bis das Unternehmen vollständig wiederhergestellt war.",
    descriptionSV: "Förödelsen efter branden var enorm. Det skulle ta år innan företaget var helt återställt.",
    year: "ca. 1960",
    category: "locatie"
  },
  {
    id: 158,
    src: stadhuisIzegemErfgoed,
    titleNL: "Stadhuis Izegem - Erfgoedkant",
    titleFR: "Hôtel de ville Izegem - Côté patrimoine",
    titleEN: "Town Hall Izegem - Heritage side",
    titleES: "Ayuntamiento Izegem - Lado patrimonial",
    titleDE: "Rathaus Izegem - Denkmalseite",
    titleSV: "Stadshuset Izegem - Arvssidan",
    descriptionNL: "Het stadhuis van Izegem vanuit de erfgoedhoek, waar het stadsarchief bewaard wordt met de aktes van de familie Deforce.",
    descriptionFR: "L'hôtel de ville d'Izegem du côté du patrimoine, où les archives municipales conservent les actes de la famille Deforce.",
    descriptionEN: "The town hall of Izegem from the heritage side, where the city archives preserve the records of the Deforce family.",
    descriptionES: "El ayuntamiento de Izegem desde el lado patrimonial, donde los archivos municipales conservan los registros de la familia Deforce.",
    descriptionDE: "Das Rathaus von Izegem von der Denkmalseite, wo das Stadtarchiv die Urkunden der Familie Deforce aufbewahrt.",
    descriptionSV: "Stadshuset i Izegem från arvssidan, där stadsarkivet bevarar familjen Deforces handlingar.",
    year: "ca. 2020",
    category: "locatie"
  },
  {
    id: 159,
    src: stadhuisIzegemGevel,
    titleNL: "Stadhuis Izegem - Gevel",
    titleFR: "Hôtel de ville Izegem - Façade",
    titleEN: "Town Hall Izegem - Facade",
    titleES: "Ayuntamiento Izegem - Fachada",
    titleDE: "Rathaus Izegem - Fassade",
    titleSV: "Stadshuset Izegem - Fasad",
    descriptionNL: "De gevel van het stadhuis van Izegem. Dit gebouw is een belangrijk erfgoedpand en herbergt het stadsarchief.",
    descriptionFR: "La façade de l'hôtel de ville d'Izegem. Ce bâtiment est un important bien patrimonial et abrite les archives municipales.",
    descriptionEN: "The facade of Izegem's town hall. This building is an important heritage property and houses the city archives.",
    descriptionES: "La fachada del ayuntamiento de Izegem. Este edificio es un importante bien patrimonial y alberga los archivos municipales.",
    descriptionDE: "Die Fassade des Rathauses von Izegem. Dieses Gebäude ist ein wichtiges Denkmal und beherbergt das Stadtarchiv.",
    descriptionSV: "Fasaden på stadshuset i Izegem. Denna byggnad är en viktig kulturarvsegendom och hyser stadsarkivet.",
    year: "ca. 2020",
    category: "locatie"
  },
  {
    id: 160,
    src: kaartDeforceBelgie,
    titleNL: "Verspreiding naam Deforce in België",
    titleFR: "Répartition du nom Deforce en Belgique",
    titleEN: "Distribution of the name Deforce in Belgium",
    titleES: "Distribución del apellido Deforce en Bélgica",
    titleDE: "Verbreitung des Namens Deforce in Belgien",
    titleSV: "Fördelning av namnet Deforce i Belgien",
    descriptionNL: "Kaart die de geografische verspreiding toont van de familienaam Deforce in België. De concentratie ligt in West-Vlaanderen, met name rond Izegem.",
    descriptionFR: "Carte montrant la répartition géographique du nom de famille Deforce en Belgique. La concentration se situe en Flandre-Occidentale, notamment autour d'Izegem.",
    descriptionEN: "Map showing the geographical distribution of the surname Deforce in Belgium. The concentration is in West Flanders, particularly around Izegem.",
    descriptionES: "Mapa que muestra la distribución geográfica del apellido Deforce en Bélgica. La concentración está en Flandes Occidental, particularmente alrededor de Izegem.",
    descriptionDE: "Karte, die die geografische Verbreitung des Familiennamens Deforce in Belgien zeigt. Die Konzentration liegt in Westflandern, insbesondere um Izegem.",
    descriptionSV: "Karta som visar den geografiska fördelningen av efternamnet Deforce i Belgien. Koncentrationen ligger i Västflandern, särskilt kring Izegem.",
    year: "2024",
    category: "document"
  },
  {
    id: 161,
    src: kaartDeforceFrankrijk,
    titleNL: "Verspreiding naam Deforce in Frankrijk",
    titleFR: "Répartition du nom Deforce en France",
    titleEN: "Distribution of the name Deforce in France",
    titleES: "Distribución del apellido Deforce en Francia",
    titleDE: "Verbreitung des Namens Deforce in Frankreich",
    titleSV: "Fördelning av namnet Deforce i Frankrike",
    descriptionNL: "Kaart die de geografische verspreiding toont van de familienaam Deforce in Frankrijk. De concentratie ligt in het noorden, in het voormalige Frans-Vlaanderen.",
    descriptionFR: "Carte montrant la répartition géographique du nom de famille Deforce en France. La concentration se situe dans le nord, dans l'ancienne Flandre française.",
    descriptionEN: "Map showing the geographical distribution of the surname Deforce in France. The concentration is in the north, in former French Flanders.",
    descriptionES: "Mapa que muestra la distribución geográfica del apellido Deforce en Francia. La concentración está en el norte, en la antigua Flandes francesa.",
    descriptionDE: "Karte, die die geografische Verbreitung des Familiennamens Deforce in Frankreich zeigt. Die Konzentration liegt im Norden, im ehemaligen Französisch-Flandern.",
    descriptionSV: "Karta som visar den geografiska fördelningen av efternamnet Deforce i Frankrike. Koncentrationen ligger i norr, i det forna Franska Flandern.",
    year: "2024",
    category: "document"
  },
  {
    id: 162,
    src: kaartDeleforgeFrankrijk,
    titleNL: "Verspreiding naam Deleforge in Frankrijk",
    titleFR: "Répartition du nom Deleforge en France",
    titleEN: "Distribution of the name Deleforge in France",
    titleES: "Distribución del apellido Deleforge en Francia",
    titleDE: "Verbreitung des Namens Deleforge in Frankreich",
    titleSV: "Fördelning av namnet Deleforge i Frankrike",
    descriptionNL: "Kaart die de verspreiding toont van de oorspronkelijke familienaam Deleforge in Frankrijk. Deze naam evolueerde later naar Deforce in België.",
    descriptionFR: "Carte montrant la répartition du nom de famille original Deleforge en France. Ce nom a évolué plus tard en Deforce en Belgique.",
    descriptionEN: "Map showing the distribution of the original surname Deleforge in France. This name later evolved into Deforce in Belgium.",
    descriptionES: "Mapa que muestra la distribución del apellido original Deleforge en Francia. Este apellido evolucionó más tarde a Deforce en Bélgica.",
    descriptionDE: "Karte, die die Verbreitung des ursprünglichen Familiennamens Deleforge in Frankreich zeigt. Dieser Name entwickelte sich später in Belgien zu Deforce.",
    descriptionSV: "Karta som visar fördelningen av det ursprungliga efternamnet Deleforge i Frankrike. Detta namn utvecklades senare till Deforce i Belgien.",
    year: "2024",
    category: "document"
  },
  {
    id: 163,
    src: huwelijkscontractPagina1,
    titleNL: "Huwelijkscontract 1685 - Pagina 1",
    titleFR: "Contrat de mariage 1685 - Page 1",
    titleEN: "Marriage contract 1685 - Page 1",
    titleES: "Contrato matrimonial 1685 - Página 1",
    titleDE: "Ehevertrag 1685 - Seite 1",
    titleSV: "Äktenskapskontrakt 1685 - Sida 1",
    descriptionNL: "Eerste pagina van het originele huwelijkscontract van Hubert Deleforge en Antoinette Follet uit 1685, opgesteld door notaris Jacques Anselme Le Francq te Lille.",
    descriptionFR: "Première page du contrat de mariage original d'Hubert Deleforge et Antoinette Follet de 1685, rédigé par le notaire Jacques Anselme Le Francq à Lille.",
    descriptionEN: "First page of the original marriage contract of Hubert Deleforge and Antoinette Follet from 1685, drawn up by notary Jacques Anselme Le Francq in Lille.",
    descriptionES: "Primera página del contrato matrimonial original de Hubert Deleforge y Antoinette Follet de 1685, redactado por el notario Jacques Anselme Le Francq en Lille.",
    descriptionDE: "Erste Seite des originalen Ehevertrags von Hubert Deleforge und Antoinette Follet aus 1685, erstellt von Notar Jacques Anselme Le Francq in Lille.",
    descriptionSV: "Första sidan av det ursprungliga äktenskapskontraktet för Hubert Deleforge och Antoinette Follet från 1685, upprättat av notarie Jacques Anselme Le Francq i Lille.",
    year: "1685",
    category: "document"
  },
];

const FotoGalerij = () => {
  const ref = useRef(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [activeCategory, setActiveCategory] = useState("alle");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pendingFullscreen, setPendingFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [imageScale, setImageScale] = useState(1);
  const [initialPinchDistance, setInitialPinchDistance] = useState<number | null>(null);
  const [isPinching, setIsPinching] = useState(false);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [viewedPhotos, setViewedPhotos] = useState<Set<number>>(new Set());
  const { language, t } = useLanguage();
  const { unlockAchievement } = useGame();

  // Track viewed photos and unlock achievement
  useEffect(() => {
    if (selectedPhoto && !viewedPhotos.has(selectedPhoto.id)) {
      const newViewedPhotos = new Set(viewedPhotos);
      newViewedPhotos.add(selectedPhoto.id);
      setViewedPhotos(newViewedPhotos);
      
      // Unlock foto_detective when 10 or more photos are viewed
      if (newViewedPhotos.size >= 10) {
        unlockAchievement('foto_detective');
      }
    }
  }, [selectedPhoto]);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Calculate distance between two touch points
  const getDistance = (touches: React.TouchList): number => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Pinch gesture start
      setIsPinching(true);
      setInitialPinchDistance(getDistance(e.touches));
    } else if (e.touches.length === 1 && !isPinching) {
      if (imageScale > 1) {
        // Pan gesture start when zoomed
        setIsPanning(true);
        setPanStart({
          x: e.touches[0].clientX - panPosition.x,
          y: e.touches[0].clientY - panPosition.y
        });
      } else {
        // Single touch for swipe
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
      }
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance) {
      // Pinch gesture move
      const currentDistance = getDistance(e.touches);
      const scale = currentDistance / initialPinchDistance;
      const newScale = Math.min(Math.max(imageScale * scale, 0.5), 4);
      setImageScale(newScale);
      setInitialPinchDistance(currentDistance);
    } else if (e.touches.length === 1 && isPanning && imageScale > 1) {
      // Pan gesture move
      e.preventDefault();
      setPanPosition({
        x: e.touches[0].clientX - panStart.x,
        y: e.touches[0].clientY - panStart.y
      });
    } else if (e.touches.length === 1 && !isPinching && !isPanning) {
      // Single touch for swipe
      setTouchEnd(e.targetTouches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    if (isPinching) {
      setIsPinching(false);
      setInitialPinchDistance(null);
      return;
    }
    
    if (isPanning) {
      setIsPanning(false);
      return;
    }
    
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrev();
    }
  };

  // Reset zoom and pan when photo changes
  useEffect(() => {
    setImageScale(1);
    setPanPosition({ x: 0, y: 0 });
  }, [selectedPhoto?.id]);

  // Double tap to reset zoom and pan
  const handleImageDoubleTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (imageScale === 1) {
      setImageScale(2);
    } else {
      setImageScale(1);
      setPanPosition({ x: 0, y: 0 });
    }
  };

  const toggleFullscreen = useCallback(async () => {
    if (!lightboxRef.current) return;
    
    try {
      if (!document.fullscreenElement) {
        await lightboxRef.current.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch (err) {
      console.error('Fullscreen error:', err);
    }
  }, []);

  // Handle pending fullscreen after lightbox opens
  useEffect(() => {
    if (pendingFullscreen && selectedPhoto && lightboxRef.current) {
      const timer = setTimeout(() => {
        toggleFullscreen();
        setPendingFullscreen(false);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [pendingFullscreen, selectedPhoto, toggleFullscreen]);

  // Listen for fullscreen changes (e.g., when user presses Escape)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };

  const handlePhotoDoubleClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setPendingFullscreen(true);
  };

  // Listen for fullscreen changes (e.g., when user presses Escape)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const categories = [
    { id: "alle", labelNL: "Alle foto's", labelFR: "Toutes les photos", labelEN: "All photos", labelES: "Todas las fotos", labelDE: "Alle Fotos", labelPCD: "Toutes les fotos", labelVLS: "Ol de foto's", labelSV: "Alla foton" },
    { id: "ai-generated", labelNL: "AI-gegenereerd", labelFR: "Généré par IA", labelEN: "AI-generated", labelES: "Generado por IA", labelDE: "KI-generiert", labelPCD: "Généré par IA", labelVLS: "AI-gegenereerd", labelSV: "AI-genererat" },
    { id: "historisch", labelNL: "Historisch", labelFR: "Historique", labelEN: "Historical", labelES: "Histórico", labelDE: "Historisch", labelPCD: "Histourique", labelVLS: "Historisch", labelSV: "Historiskt" },
    { id: "portret", labelNL: "Portretten", labelFR: "Portraits", labelEN: "Portraits", labelES: "Retratos", labelDE: "Porträts", labelPCD: "Portraits", labelVLS: "Portretten", labelSV: "Porträtt" },
    { id: "document", labelNL: "Documenten", labelFR: "Documents", labelEN: "Documents", labelES: "Documentos", labelDE: "Dokumente", labelPCD: "Documints", labelVLS: "Dokementen", labelSV: "Dokument" },
    { id: "locatie", labelNL: "Locaties", labelFR: "Lieux", labelEN: "Locations", labelES: "Ubicaciones", labelDE: "Orte", labelPCD: "Lieus", labelVLS: "Locosjes", labelSV: "Platser" },
    { id: "beroep", labelNL: "Vakmanschap", labelFR: "Artisanat", labelEN: "Craftsmanship", labelES: "Artesanía", labelDE: "Handwerk", labelPCD: "Artisanat", labelVLS: "Ambacht", labelSV: "Hantverk" },
    { id: "familie", labelNL: "Familie", labelFR: "Famille", labelEN: "Family", labelES: "Familia", labelDE: "Familie", labelPCD: "Famile", labelVLS: "Familie", labelSV: "Familj" },
  ];

  const filteredPhotos = activeCategory === "alle" 
    ? photos 
    : photos.filter(p => p.category === activeCategory);

  const currentIndex = selectedPhoto 
    ? filteredPhotos.findIndex(p => p.id === selectedPhoto.id) 
    : -1;

  const goToNext = () => {
    if (currentIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[currentIndex + 1]);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedPhoto(filteredPhotos[currentIndex - 1]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "ArrowLeft") goToPrev();
    if (e.key === "Escape") setSelectedPhoto(null);
  };

  const getTitle = (photo: Photo) => language === 'fr' ? photo.titleFR : language === 'en' ? (photo.titleEN || photo.titleNL) : language === 'es' ? (photo.titleES || photo.titleNL) : language === 'de' ? (photo.titleDE || photo.titleNL) : language === 'sv' ? (photo.titleSV || photo.titleEN || photo.titleNL) : language === 'pcd' ? (photo.titleFR || photo.titleNL) : language === 'vls' ? photo.titleNL : photo.titleNL;
  const getDescription = (photo: Photo) => language === 'fr' ? photo.descriptionFR : language === 'en' ? (photo.descriptionEN || photo.descriptionNL) : language === 'es' ? (photo.descriptionES || photo.descriptionNL) : language === 'de' ? (photo.descriptionDE || photo.descriptionNL) : language === 'sv' ? (photo.descriptionSV || photo.descriptionEN || photo.descriptionNL) : language === 'pcd' ? (photo.descriptionFR || photo.descriptionNL) : language === 'vls' ? photo.descriptionNL : photo.descriptionNL;
  const getCategoryLabel = (cat: typeof categories[0]) => language === 'fr' ? cat.labelFR : language === 'en' ? cat.labelEN : language === 'es' ? cat.labelES : language === 'de' ? cat.labelDE : language === 'sv' ? cat.labelSV : language === 'pcd' ? cat.labelPCD : language === 'vls' ? cat.labelVLS : cat.labelNL;

  return (
    <section id="galerij" className="section-padding bg-background" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-medium uppercase tracking-widest text-sm">
            {t('galerij.heritage')}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4 mt-4">
            {t('galerij.title')}
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            {t('galerij.subtitle')}
          </p>
          <div className="vintage-divider mt-6" />
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </motion.div>

        {/* Historical Maps Links - always visible */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-8 p-4 bg-card rounded-xl border border-border"
        >
          <h3 className="font-serif text-lg font-bold text-foreground mb-3 text-center">
            {language === 'nl' 
              ? "Bekijk echte historische kaarten" 
              : language === 'en'
              ? "View real historical maps"
              : language === 'es'
              ? "Ver mapas históricos reales"
              : language === 'de'
              ? "Echte historische Karten ansehen"
              : language === 'sv'
              ? "Se riktiga historiska kartor"
              : language === 'vls'
              ? "Bekiek echte historische koarten"
              : language === 'pcd'
              ? "Consultez les vraies cartes historiques"
              : "Consultez les vraies cartes historiques"}
          </h3>
          <div className="grid sm:grid-cols-3 gap-3">
            <a
              href="https://www.geopunt.be/kaart?b=grb_basiskaart&l=ferraris&o=50.917,3.215,15"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <Map className="h-5 w-5 text-primary" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                  Geopunt.be
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  {language === 'nl' ? "Ferrariskaart" : language === 'en' ? "Ferraris Map" : language === 'es' ? "Mapa de Ferraris" : language === 'de' ? "Ferraris-Karte" : language === 'sv' ? "Ferrariskarta" : language === 'vls' ? "Ferrariskoarte" : "Carte de Ferraris"}
                </p>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            </a>

            <a
              href="https://www.cartesius.be/CartesiusPortal/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <BookOpen className="h-5 w-5 text-primary" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                  Cartesius.be
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  {language === 'nl' ? "Popp kadaster" : language === 'en' ? "Popp Cadastre" : language === 'es' ? "Catastro Popp" : language === 'de' ? "Popp Kataster" : language === 'sv' ? "Popp fastighetsregister" : language === 'vls' ? "Popp kadaster" : "Cadastre Popp"}
                </p>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            </a>

            <a
              href="https://www.kbr.be/nl/projecten/kaart-van-ferraris/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 p-3 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <BookOpen className="h-5 w-5 text-primary" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors truncate">
                  KBR.be
                </h4>
                <p className="text-xs text-muted-foreground truncate">
                  {language === 'nl' ? "Koninklijke Bibliotheek" : language === 'en' ? "Royal Library" : language === 'es' ? "Biblioteca Real" : language === 'de' ? "Königliche Bibliothek" : language === 'sv' ? "Kungliga biblioteket" : language === 'vls' ? "Keuninkelike Bibliotheek" : "Bibliothèque Royale"}
                </p>
              </div>
              <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
            </a>
          </div>
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative aspect-square rounded-lg overflow-hidden cursor-pointer shadow-vintage border border-border"
                onClick={() => handlePhotoClick(photo)}
                onDoubleClick={() => handlePhotoDoubleClick(photo)}
              >
                <img
                  src={photo.src}
                  alt={getTitle(photo)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Photo ID number */}
                <span className="absolute top-1 right-1 bg-background/80 text-foreground text-[10px] font-mono px-1.5 py-0.5 rounded z-10">
                  #{photo.id}
                </span>
                {/* AI Generated Badge */}
                {photo.isAiGenerated && (
                  <AiLabel className="top-2 left-2" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-serif text-sm font-semibold text-foreground line-clamp-1">
                      {getTitle(photo)}
                    </h3>
                    {photo.year && (
                      <p className="text-xs text-accent">{photo.year}</p>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <ZoomIn className="w-5 h-5 text-foreground" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Photo count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-6"
        >
          {filteredPhotos.length} {t('galerij.photos')}
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => { if (!isFullscreen) setSelectedPhoto(null); }}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Top buttons */}
            <div className="absolute top-4 right-4 flex gap-2 z-10">
              {/* Fullscreen button */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleFullscreen(); }}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label={isFullscreen 
                  ? (language === 'nl' ? "Verlaat volledig scherm" : language === 'en' ? "Exit fullscreen" : language === 'de' ? "Vollbildmodus beenden" : language === 'es' ? "Salir de pantalla completa" : language === 'vls' ? "Verloat volledig scherm" : "Quitter le plein écran")
                  : (language === 'nl' ? "Volledig scherm" : language === 'en' ? "Fullscreen" : language === 'de' ? "Vollbildmodus" : language === 'es' ? "Pantalla completa" : language === 'vls' ? "Volledig scherm" : "Plein écran")}
              >
                {isFullscreen ? (
                  <Minimize2 className="w-6 h-6 text-foreground" />
                ) : (
                  <Maximize2 className="w-6 h-6 text-foreground" />
                )}
              </button>
              {/* Close button */}
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedPhoto(null); }}
                className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                aria-label={t('galerij.close')}
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Navigation buttons */}
            {currentIndex > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors z-10"
                aria-label={t('galerij.prev')}
              >
                <ChevronLeft className="w-6 h-6 text-foreground" />
              </button>
            )}
            {currentIndex < filteredPhotos.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors z-10"
                aria-label={t('galerij.next')}
              >
                <ChevronRight className="w-6 h-6 text-foreground" />
              </button>
            )}

            {/* Photo content */}
            <motion.div
              key={selectedPhoto.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="max-w-6xl w-full max-h-[90vh] flex flex-col gap-4 overflow-auto"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Main content area */}
              <div className="flex flex-col md:flex-row gap-6 flex-1">
                {/* Image */}
                <div className="flex-1 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={selectedPhoto.src}
                    alt={getTitle(selectedPhoto)}
                    className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-elevated transition-transform duration-150 cursor-grab active:cursor-grabbing"
                    style={{ 
                      transform: `scale(${imageScale}) translate(${panPosition.x / imageScale}px, ${panPosition.y / imageScale}px)`,
                      touchAction: imageScale > 1 ? 'none' : 'auto'
                    }}
                    onDoubleClick={handleImageDoubleTap}
                    draggable={false}
                  />
                  
                  {/* Zoom indicator with reset button */}
                  <AnimatePresence>
                    {imageScale !== 1 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2"
                      >
                        <span className="bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
                          {imageScale.toFixed(1)}×
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setImageScale(1);
                            setPanPosition({ x: 0, y: 0 });
                          }}
                          className="bg-black/70 hover:bg-black/90 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm transition-colors flex items-center gap-1.5"
                        >
                          <X size={14} />
                          Reset
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Info panel */}
                <div className="md:w-80 flex-shrink-0 bg-card p-6 rounded-lg border border-border">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-accent/20 text-accent rounded-full mb-3 capitalize">
                    {selectedPhoto.category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-2">
                    {getTitle(selectedPhoto)}
                  </h3>
                  {selectedPhoto.year && (
                    <p className="text-accent font-medium mb-4">
                      {selectedPhoto.year}
                    </p>
                  )}
                  <p className="text-foreground/80 leading-relaxed">
                    {getDescription(selectedPhoto)}
                  </p>

                  {/* Navigation indicator */}
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
                    <span>
                      {currentIndex + 1} / {filteredPhotos.length}
                    </span>
                    <span className="text-xs">
                      {t('galerij.navigate')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="w-full bg-card/50 backdrop-blur-sm rounded-lg p-3 border border-border">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                  {filteredPhotos.map((photo, index) => (
                    <button
                      key={photo.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPhoto(photo);
                      }}
                      className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-200 ${
                        photo.id === selectedPhoto.id 
                          ? 'border-accent ring-2 ring-accent/50 scale-105' 
                          : 'border-border/50 hover:border-accent/50 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={photo.src}
                        alt={getTitle(photo)}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FotoGalerij;
