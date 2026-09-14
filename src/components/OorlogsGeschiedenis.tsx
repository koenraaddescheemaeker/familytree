import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Swords, MapPin, Users, Skull, Shield, Clock, ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import AiLabel from "@/components/ui/AiLabel";
import ShareButton from "@/components/ui/ShareButton";

import slagWestrozebeke from "@/assets/slag-westrozebeke.jpg";
import oorlogLodewijkXIV from "@/assets/oorlog-lodewijk-xiv.jpg";
import oorlogFransDuits from "@/assets/oorlog-frans-duits.jpg";
import oorlogWO1 from "@/assets/oorlog-wo1-ijzer.jpg";

interface War {
  id: string;
  year: string;
  period: string;
  titleNL: string;
  titleFR: string;
  titlePCD: string;
  titleVLS: string;
  titleEN: string;
  titleES: string;
  titleDE: string;
  titleSV?: string;
  subtitleNL: string;
  subtitleFR: string;
  subtitlePCD: string;
  subtitleVLS: string;
  subtitleEN: string;
  subtitleES: string;
  subtitleDE: string;
  subtitleSV?: string;
  descriptionNL: string;
  descriptionFR: string;
  descriptionPCD: string;
  descriptionVLS: string;
  descriptionEN: string;
  descriptionES: string;
  descriptionDE: string;
  descriptionSV?: string;
  impactNL: string;
  impactFR: string;
  impactPCD: string;
  impactVLS: string;
  impactEN: string;
  impactES: string;
  impactDE: string;
  impactSV?: string;
  factsNL: string[];
  factsFR: string[];
  factsPCD: string[];
  factsVLS: string[];
  factsEN: string[];
  factsES: string[];
  factsDE: string[];
  factsSV?: string[];
  casualties?: string;
  casualtiesFR?: string;
  casualtiesPCD?: string;
  casualtiesVLS?: string;
  casualtiesEN?: string;
  casualtiesES?: string;
  casualtiesDE?: string;
  casualtiesSV?: string;
  duration?: string;
  durationFR?: string;
  durationPCD?: string;
  durationVLS?: string;
  durationEN?: string;
  durationES?: string;
  durationDE?: string;
  durationSV?: string;
  location?: string;
  locationFR?: string;
  locationPCD?: string;
  locationVLS?: string;
  locationEN?: string;
  locationES?: string;
  locationDE?: string;
  locationSV?: string;
  image?: string;
  color: string;
  biographyNL?: string;
  biographyFR?: string;
  biographyPCD?: string;
  biographyVLS?: string;
  biographyEN?: string;
  biographyES?: string;
  biographyDE?: string;
  biographySV?: string;
  biographyTitleNL?: string;
  biographyTitleFR?: string;
  biographyTitlePCD?: string;
  biographyTitleVLS?: string;
  biographyTitleEN?: string;
  biographyTitleES?: string;
  biographyTitleDE?: string;
  biographyTitleSV?: string;
}

const wars: War[] = [
  {
    id: "westrozebeke",
    year: "1382",
    period: "27 november 1382",
    titleNL: "Slag bij Westrozebeke",
    titleFR: "Bataille de Westrozebeke",
    titlePCD: "Bataille éd Westrozebeke",
    titleVLS: "Slag by Westrozebeke",
    titleEN: "Battle of Westrozebeke",
    titleES: "Batalla de Westrozebeke",
    titleDE: "Schlacht bei Westrozebeke",
    titleSV: "Slaget vid Westrozebeke",
    subtitleNL: "De Gentse Opstand (1379-1385)",
    subtitleFR: "La Révolte de Gand (1379-1385)",
    subtitlePCD: "La Révolte éd Gand (1379-1385)",
    subtitleVLS: "Den Gentschen Opstand (1379-1385)",
    subtitleEN: "The Ghent Revolt (1379-1385)",
    subtitleES: "La Revuelta de Gante (1379-1385)",
    subtitleDE: "Der Genter Aufstand (1379-1385)",
    subtitleSV: "Gentupproret (1379-1385)",
    descriptionNL: "De Slag bij Westrozebeke was een beslissende veldslag tijdens de Gentse Opstand, waarin het Vlaamse burgerleger van ongeveer 40.000 man onder leiding van Filips van Artevelde het opnam tegen het Franse koninklijke leger van Karel VI. De slag was onderdeel van een bredere machtsstrijd tussen de Vlaamse steden, die meer autonomie eisten, en de graaf van Vlaanderen Lodewijk van Male, die gesteund werd door de Franse kroon.",
    descriptionFR: "La Bataille de Westrozebeke fut une bataille décisive pendant la Révolte de Gand, où l'armée bourgeoise flamande d'environ 40 000 hommes sous Philippe van Artevelde affronta l'armée royale française de Charles VI. La bataille faisait partie d'une lutte de pouvoir plus large entre les villes flamandes, qui exigeaient plus d'autonomie, et le comte de Flandre Louis de Male, soutenu par la couronne française.",
    descriptionPCD: "L' Bataille éd Westrozebeke fut eune bataille décisive pindant l' Révolte éd Gand, ousqu' l'armée bourgeoise flaminde d'environ 40 000 hommes sous Philippe van Artevelde affronta l'armée royale française éd Charles VI.",
    descriptionVLS: "De Slag by Westrozebeke was e beslissende veldslag tydens den Gentschen Opstand, woarin 't Vlaamsche borgerleger van zô'n 40.000 man onder Filips van Artevelde 't opnam tegen 't Fransche koninkslelik leger van Karel VI.",
    descriptionEN: "The Battle of Westrozebeke was a decisive battle during the Ghent Revolt, in which the Flemish citizen army of approximately 40,000 men under Philip van Artevelde faced the French royal army of Charles VI. The battle was part of a broader power struggle between Flemish cities demanding more autonomy and the Count of Flanders Louis of Male, supported by the French crown.",
    descriptionES: "La Batalla de Westrozebeke fue una batalla decisiva durante la Revuelta de Gante, en la que el ejército ciudadano flamenco de aproximadamente 40.000 hombres bajo Felipe van Artevelde se enfrentó al ejército real francés de Carlos VI. La batalla formaba parte de una lucha de poder más amplia entre las ciudades flamencas que exigían más autonomía y el Conde de Flandes Luis de Male, apoyado por la corona francesa.",
    descriptionDE: "Die Schlacht bei Westrozebeke war eine entscheidende Feldschlacht während des Genter Aufstands, bei der das flämische Bürgerheer von etwa 40.000 Mann unter Philipp van Artevelde gegen das französische königliche Heer von Karl VI. antrat. Die Schlacht war Teil eines breiteren Machtkampfes zwischen den flämischen Städten, die mehr Autonomie forderten, und dem Grafen von Flandern Ludwig von Male, der von der französischen Krone unterstützt wurde.",
    descriptionSV: "Slaget vid Westrozebeke var ett avgörande fältslag under Gentupproret, där den flamländska borgararmén på cirka 40 000 man under ledning av Filip van Artevelde ställdes mot den franske kungen Karl VI:s kungliga armé. Slaget var en del av en bredare maktkamp mellan de flamländska städerna, som krävde mer autonomi, och greven av Flandern Ludvig av Male, som stöddes av den franska kronan.",
    impactNL: "Onze voorouders Gilles van den Neste en Zeger Van Steenkiste vochten mee in het Vlaamse leger en overleefden de slag - een opmerkelijk feit gezien de enorme verliezen. Meer dan 25.000 Vlamingen sneuvelden, waaronder Filips van Artevelde zelf. De nederlaag betekende het einde van de Vlaamse stedelijke autonomie voor generaties.",
    impactFR: "Nos ancêtres Gilles van den Neste et Zeger Van Steenkiste combattirent dans l'armée flamande et survécurent à la bataille - un fait remarquable vu les pertes énormes. Plus de 25 000 Flamands périrent, dont Philippe van Artevelde lui-même. La défaite signifia la fin de l'autonomie urbaine flamande pour des générations.",
    impactPCD: "Nos anchêtes Gilles van den Neste pi Zeger Van Steenkiste combattirent dins l'armée flaminde pi survécurint à l' bataille. Pus d' 25 000 Flaminds périrent, dont Philippe van Artevelde lui-même.",
    impactVLS: "Uuze vôorouders Gilles van den Neste en Zeger Van Steenkiste vochten mee in 't Vlaamsche leger en overleefden de slag - e remarquabel feit gezien de enormen verliezen. Mee dan 25.000 Vlamingen sneuvelden.",
    impactEN: "Our ancestors Gilles van den Neste and Zeger Van Steenkiste fought in the Flemish army and survived the battle - a remarkable fact given the enormous losses. More than 25,000 Flemings perished, including Philip van Artevelde himself. The defeat meant the end of Flemish urban autonomy for generations.",
    impactES: "Nuestros antepasados Gilles van den Neste y Zeger Van Steenkiste lucharon en el ejército flamenco y sobrevivieron a la batalla, un hecho notable dadas las enormes pérdidas. Más de 25.000 flamencos perecieron, incluido el propio Felipe van Artevelde. La derrota significó el fin de la autonomía urbana flamenca durante generaciones.",
    impactDE: "Unsere Vorfahren Gilles van den Neste und Zeger Van Steenkiste kämpften im flämischen Heer und überlebten die Schlacht - eine bemerkenswerte Tatsache angesichts der enormen Verluste. Mehr als 25.000 Flamen fielen, darunter Philipp van Artevelde selbst. Die Niederlage bedeutete das Ende der flämischen städtischen Autonomie für Generationen.",
    impactSV: "Våra förfäder Gilles van den Neste och Zeger Van Steenkiste stred i den flamländska armén och överlevde slaget – ett anmärkningsvärt faktum med tanke på de enorma förlusterna. Mer än 25 000 flamländare stupade, inklusive Filip van Artevelde själv. Nederlaget innebar slutet för den flamländska stadsautonomin i generationer.",
    factsNL: [
      "Het Vlaamse leger telde ongeveer 40.000 man, voornamelijk burgers en ambachtslieden",
      "Het Franse leger onder Karel VI had superieure cavalerie en professionele soldaten",
      "De slag duurde slechts enkele uren maar was uiterst bloedig",
      "Filips van Artevelde sneuvelde en zijn lichaam werd tentoongesteld",
      "De overwinning verstevigde de Franse invloed in Vlaanderen voor decennia"
    ],
    factsFR: [
      "L'armée flamande comptait environ 40 000 hommes, principalement des bourgeois et artisans",
      "L'armée française sous Charles VI avait une cavalerie supérieure et des soldats professionnels",
      "La bataille ne dura que quelques heures mais fut extrêmement sanglante",
      "Philippe van Artevelde périt et son corps fut exposé",
      "La victoire renforça l'influence française en Flandre pendant des décennies"
    ],
    factsPCD: [
      "L'armée flaminde comptot environ 40 000 hommes",
      "L'armée française avot eune cavalerie supérieure",
      "L' bataille n' dura qu' quéques heures mais fut extrêmemint sanglante",
      "Philippe van Artevelde périt pi sin corps fut exposé"
    ],
    factsVLS: [
      "'t Vlaamsche leger telde zô'n 40.000 man, meest borgers en ambachtslieden",
      "'t Fransche leger onder Karel VI ad betere cavalerie en professionele soldoaten",
      "De slag duurde mo enkele uren mo was uterst bloedig",
      "Filips van Artevelde sneuvelde en zyn lyk wierd tentoongesteld"
    ],
    factsEN: [
      "The Flemish army numbered about 40,000 men, mainly citizens and craftsmen",
      "The French army under Charles VI had superior cavalry and professional soldiers",
      "The battle lasted only a few hours but was extremely bloody",
      "Philip van Artevelde perished and his body was displayed",
      "The victory strengthened French influence in Flanders for decades"
    ],
    factsES: [
      "El ejército flamenco contaba con unos 40.000 hombres, principalmente ciudadanos y artesanos",
      "El ejército francés bajo Carlos VI tenía caballería superior y soldados profesionales",
      "La batalla duró solo unas pocas horas pero fue extremadamente sangrienta",
      "Felipe van Artevelde pereció y su cuerpo fue exhibido",
      "La victoria fortaleció la influencia francesa en Flandes durante décadas"
    ],
    factsDE: [
      "Das flämische Heer zählte etwa 40.000 Mann, hauptsächlich Bürger und Handwerker",
      "Das französische Heer unter Karl VI. hatte überlegene Kavallerie und professionelle Soldaten",
      "Die Schlacht dauerte nur wenige Stunden, war aber äußerst blutig",
      "Philipp van Artevelde fiel und sein Leichnam wurde zur Schau gestellt",
      "Der Sieg festigte den französischen Einfluss in Flandern für Jahrzehnte"
    ],
    factsSV: [
      "Den flamländska armén bestod av cirka 40 000 man, huvudsakligen borgare och hantverkare",
      "Den franska armén under Karl VI hade överlägset kavalleri och professionella soldater",
      "Slaget varade bara några timmar men var extremt blodigt",
      "Filip van Artevelde stupade och hans kropp ställdes ut",
      "Segern stärkte det franska inflytandet i Flandern i årtionden"
    ],
    casualties: "25.000+ Vlaamse doden",
    casualtiesFR: "25 000+ morts flamands",
    casualtiesPCD: "25 000+ morts flaminds",
    casualtiesVLS: "25.000+ Vlaamsche doôden",
    casualtiesEN: "25,000+ Flemish dead",
    casualtiesES: "25.000+ muertos flamencos",
    casualtiesDE: "25.000+ flämische Tote",
    casualtiesSV: "25 000+ flamländska döda",
    duration: "Enkele uren",
    durationFR: "Quelques heures",
    durationPCD: "Quéques heures",
    durationVLS: "Enkele uren",
    durationEN: "A few hours",
    durationES: "Unas pocas horas",
    durationDE: "Wenige Stunden",
    durationSV: "Några timmar",
    location: "Westrozebeke, West-Vlaanderen",
    locationFR: "Westrozebeke, Flandre Occidentale",
    locationPCD: "Westrozebeke, Flandre Occidentale",
    locationVLS: "Westrozebeke, West-Vlaanderen",
    locationEN: "Westrozebeke, West Flanders",
    locationES: "Westrozebeke, Flandes Occidental",
    locationDE: "Westrozebeke, Westflandern",
    locationSV: "Westrozebeke, Västflandern",
    image: slagWestrozebeke,
    color: "from-red-600 to-red-800",
    // Filips van Artevelde biography
    biographyTitleNL: "Filips van Artevelde (ca. 1340 – 1382)",
    biographyTitleFR: "Philippe van Artevelde (v. 1340 – 1382)",
    biographyTitlePCD: "Philippe van Artevelde (v. 1340 – 1382)",
    biographyTitleVLS: "Filips van Artevelde (ca. 1340 – 1382)",
    biographyTitleEN: "Philip van Artevelde (c. 1340 – 1382)",
    biographyTitleDE: "Philipp van Artevelde (ca. 1340 – 1382)",
    biographyTitleES: "Felipe van Artevelde (c. 1340 – 1382)",
    biographyTitleSV: "Filip van Artevelde (ca. 1340 – 1382)",
    biographyNL: `Filips van Artevelde was een Vlaamse volksheld en leider van de Gentse Opstand (1379-1385). Hij was de zoon van Jacob van Artevelde, de 'Wijze Man van Gent', die eerder ook een opstand tegen de graaf had geleid. Door zijn vaders prominentie was Filips peetekind van de Engelse koningin Philippa van Henegouwen.

De rijke stadsgilden van Vlaanderen eisten meer macht van graaf Lodewijk II van Male. Het graafschap behoorde formeel tot Frankrijk, maar de Vlaamse steden hadden om economische redenen (de lucratieve wolhandel) juist uitstekende banden met Engeland. De opstand begon na de arrestatie van een Gentse burger op 5 september 1379, een directe schending van de stedelijke privileges.

Op 3 mei 1382 versloeg Van Artevelde het grafelijke leger in de Slag bij Beverhoutsveld. Graaf Lodewijk van Male vluchtte naar Rijsel en riep de hulp in van zijn schoonzoon Filips de Stoute, hertog van Bourgondië, die regent was voor de 14-jarige Franse koning Karel VI.

Bij Westrozebeke, op 27 november 1382, stonden de twee legers in dichte mist tegenover elkaar op de Goudberg. Van Artevelde koos voor een frontale aanval, maar de Franse cavalerie omsingelde de Vlaamse flanken. Het bloedbad duurde tot het vallen van de nacht – meer dan 20.000 Vlamingen sneuvelden.

Filips van Artevelde stierf tijdens de slag. Zijn lichaam werd gevonden in een greppel, verstikt onder de lichamen van zijn lijfwachten. Koning Karel VI liet hem aan een boom ophangen als waarschuwing. Na Westrozebeke stortte de opstand ineen, hoewel Gent nog drie jaar onder leiding van Pierre Dubois bleef vechten tot de Vrede van Doornik in 1385.`,
    biographyFR: `Philippe van Artevelde fut un patriote flamand et chef de la Révolte de Gand (1379-1385). Il était le fils de Jacob van Artevelde, le 'Sage de Gand', qui avait déjà mené une révolte contre le comte. Grâce à la notoriété de son père, Philippe était le filleul de la reine anglaise Philippa de Hainaut.

Les riches guildes urbaines de Flandre exigeaient plus de pouvoir du comte Louis II de Male. Le comté appartenait formellement à la France, mais les villes flamandes entretenaient d'excellentes relations avec l'Angleterre pour des raisons économiques (le lucratif commerce de la laine). La révolte commença après l'arrestation d'un citoyen de Gand le 5 septembre 1379, une violation directe des privilèges urbains.

Le 3 mai 1382, van Artevelde vainquit l'armée comtale à la Bataille de Beverhoutsveld. Le comte Louis de Male s'enfuit à Lille et fit appel à son gendre Philippe le Hardi, duc de Bourgogne, régent du roi français Charles VI âgé de 14 ans.

À Westrozebeke, le 27 novembre 1382, les deux armées se faisaient face dans un brouillard dense sur la Goudberg. Van Artevelde choisit une attaque frontale, mais la cavalerie française encercla les flancs flamands. Le massacre dura jusqu'à la tombée de la nuit – plus de 20 000 Flamands périrent.

Philippe van Artevelde mourut pendant la bataille. Son corps fut retrouvé dans un fossé, étouffé sous les corps de ses gardes du corps. Le roi Charles VI le fit pendre à un arbre en guise d'avertissement.`,
    biographyPCD: `Philippe van Artevelde fut un patriote flamind pi chef éd la Révolte éd Gand (1379-1385). I étot l' fils d' Jacob van Artevelde, l' 'Sage éd Gand'. Grâce à l' notoriété d' sin père, Philippe étot l' filleul éd la reine anglaise Philippa éd Hainaut.

Les riches guildes urbaines éd Flandre exigeotent pus d' pouvoir du comte Louis II d' Male. L' comté appartenot à la France, mais les villes flamindes avotent d' bonnes relations avec l'Angleterre pour l' commerce éd la laine.

L' 3 mai 1382, van Artevelde vainquit l'armée comtale à Beverhoutsveld. L' comte s'enfuit à Lille pi fit appel à sin gendre Philippe l' Hardi, duc éd Bourgogne.

À Westrozebeke, l' 27 novembre 1382, les deux armées s' faisotent face dins un brouillard dense. Van Artevelde choisit eune attaque frontale, mais la cavalerie française encercla les flancs flamands. Pus d' 20 000 Flamands périrent. Philippe van Artevelde mourut pi sin corps fut retrouvé dins un fossé.`,
    biographyVLS: `Filips van Artevelde was e Vlaamsche volksheld en leider van den Gentschen Opstand (1379-1385). Y was de zeune van Jacob van Artevelde, den 'Wyzen Man van Gent', die eerder ôok e opstand tegen den graaf ad geleid. Deur zyn vaders prominentie was Filips peetekynd van de Engelsche koninginne Philippa van Henegouwen.

De ryke stadsgilden van Vlaanderen eischten mee macht van graaf Lodewyk II van Male. 't Graafschap behoorde formeel tot Frankryk, mo de Vlaamsche steên adden om economische redens (den lucrativen wolhandel) just utstekende banden met Engeland. Den opstand begon na de arrestoatie van e Gentsche borger op 5 september 1379, e directe schendienge van de stedelyke privilegies.

Op 3 mei 1382 versloeg Van Artevelde 't grafelik leger in de Slag by Beverhoutsveld. Graaf Lodewyk van Male vluchtte noar Rysel en riep de hulpe in van zyn schoonzeune Filips de Stoute, hertog van Boergondië.

By Westrozebeke, op 27 november 1382, stoenden de twee legers in dichten mist tegenover malkoar op de Goudberg. Van Artevelde koos vôor e frontale aanval, mo de Fransche cavalerie omsingelde de Vlaamsche flanken. 't Bloedbad duurde tot 't vallen van de nacht – mee dan 20.000 Vlamingen sneuvelden.

Filips van Artevelde stierf tydens de slag. Zyn lyk wierd gevonden in e greppel, verstikt onder de lyken van zyn lyfwachten. Koning Karel VI liet em aan e boom ophangen.`,
    biographyEN: `Philip van Artevelde was a Flemish patriot and leader of the Ghent Revolt (1379-1385). He was the son of Jacob van Artevelde, the 'Wise Man of Ghent', who had previously led a revolt against the count. Due to his father's prominence, Philip was godson to the English Queen Philippa of Hainault.

The wealthy city guilds of Flanders demanded more power from Count Louis II of Male. The county formally belonged to France, but the Flemish cities maintained excellent relations with England for economic reasons (the lucrative wool trade). The revolt began after the arrest of a Ghent citizen on September 5, 1379, a direct violation of urban privileges.

On May 3, 1382, van Artevelde defeated the count's army at the Battle of Beverhoutsveld. Count Louis of Male fled to Lille and called upon his son-in-law Philip the Bold, Duke of Burgundy, who served as regent for the 14-year-old French King Charles VI.

At Westrozebeke, on November 27, 1382, the two armies faced each other in dense fog on the Goudberg hill. Van Artevelde chose a frontal attack, but the French cavalry encircled the Flemish flanks. The massacre lasted until nightfall – more than 20,000 Flemings perished.

Philip van Artevelde died during the battle. His body was found in a ditch, suffocated beneath the bodies of his bodyguards. King Charles VI had him hanged from a tree as a warning. After Westrozebeke, the revolt collapsed, though Ghent continued fighting under Pierre Dubois until the Peace of Tournai in 1385.`,
    biographyES: `Felipe van Artevelde fue un patriota flamenco y líder de la Revuelta de Gante (1379-1385). Era hijo de Jacob van Artevelde, el 'Sabio de Gante', quien anteriormente había liderado una revuelta contra el conde. Debido a la prominencia de su padre, Felipe fue ahijado de la reina inglesa Felipa de Henao.

Los ricos gremios urbanos de Flandes exigían más poder al conde Luis II de Male. El condado pertenecía formalmente a Francia, pero las ciudades flamencas mantenían excelentes relaciones con Inglaterra por razones económicas (el lucrativo comercio de lana). La revuelta comenzó tras el arresto de un ciudadano de Gante el 5 de septiembre de 1379, una violación directa de los privilegios urbanos.

El 3 de mayo de 1382, van Artevelde derrotó al ejército del conde en la Batalla de Beverhoutsveld. El conde Luis de Male huyó a Lille y pidió ayuda a su yerno Felipe el Atrevido, duque de Borgoña, quien servía como regente del rey francés Carlos VI de 14 años.

En Westrozebeke, el 27 de noviembre de 1382, los dos ejércitos se enfrentaron en densa niebla en la colina Goudberg. Van Artevelde eligió un ataque frontal, pero la caballería francesa rodeó los flancos flamencos. La masacre duró hasta el anochecer: más de 20.000 flamencos perecieron.

Felipe van Artevelde murió durante la batalla. Su cuerpo fue encontrado en una zanja, asfixiado bajo los cuerpos de sus guardaespaldas. El rey Carlos VI lo hizo colgar de un árbol como advertencia.`,
    biographyDE: `Philipp van Artevelde war ein flämischer Volksheld und Anführer des Genter Aufstands (1379-1385). Er war der Sohn von Jacob van Artevelde, dem 'Weisen Mann von Gent', der zuvor auch einen Aufstand gegen den Grafen angeführt hatte. Aufgrund der Bekanntheit seines Vaters war Philipp Patenkind der englischen Königin Philippa von Hennegau.

Die reichen Stadtgilden Flanderns forderten mehr Macht vom Grafen Ludwig II. von Male. Die Grafschaft gehörte formal zu Frankreich, aber die flämischen Städte unterhielten aus wirtschaftlichen Gründen (der lukrative Wollhandel) ausgezeichnete Beziehungen zu England. Der Aufstand begann nach der Verhaftung eines Genter Bürgers am 5. September 1379, einer direkten Verletzung der städtischen Privilegien.

Am 3. Mai 1382 besiegte Van Artevelde das gräfliche Heer in der Schlacht bei Beverhoutsveld. Graf Ludwig von Male floh nach Lille und bat seinen Schwiegersohn Philipp den Kühnen, Herzog von Burgund, der Regent für den 14-jährigen französischen König Karl VI. war, um Hilfe.

Bei Westrozebeke, am 27. November 1382, standen sich die beiden Heere im dichten Nebel auf dem Goudberg gegenüber. Van Artevelde entschied sich für einen Frontalangriff, aber die französische Kavallerie umzingelte die flämischen Flanken. Das Blutbad dauerte bis zum Einbruch der Nacht – mehr als 20.000 Flamen fielen.

Philipp van Artevelde starb während der Schlacht. Sein Leichnam wurde in einem Graben gefunden, erstickt unter den Leibern seiner Leibwächter. König Karl VI. ließ ihn zur Warnung an einem Baum aufhängen. Nach Westrozebeke brach der Aufstand zusammen, obwohl Gent unter Pierre Dubois noch drei Jahre bis zum Frieden von Tournai 1385 weiterkämpfte.`
  },
  {
    id: "lodewijk-xiv",
    year: "1667-1714",
    period: "1667-1714",
    titleNL: "Oorlogen van Lodewijk XIV",
    titleFR: "Guerres de Louis XIV",
    titlePCD: "Guerres éd Louis XIV",
    titleVLS: "Oorlogen van Lodewyk XIV",
    titleEN: "Wars of Louis XIV",
    titleES: "Guerras de Luis XIV",
    titleDE: "Kriege Ludwigs XIV.",
    titleSV: "Ludvig XIV:s krig",
    subtitleNL: "Een halve eeuw conflict in de Lage Landen",
    subtitleFR: "Un demi-siècle de conflit aux Pays-Bas",
    subtitlePCD: "Un demi-siècle éd conflit aux Pays-Bas",
    subtitleVLS: "E halve eeuw conflict in de Lage Landen",
    subtitleEN: "Half a century of conflict in the Low Countries",
    subtitleES: "Medio siglo de conflicto en los Países Bajos",
    subtitleDE: "Ein halbes Jahrhundert Konflikt in den Niederlanden",
    subtitleSV: "Ett halvt sekel av konflikter i Låga Länderna",
    descriptionNL: "Lodewijk XIV van Frankrijk, de 'Zonnekoning', voerde gedurende zijn lange regeerperiode (1643-1715) meerdere verwoestende oorlogen die de Zuidelijke Nederlanden teisterden: de Devolutieoorlog (1667-1668), de Hollandse Oorlog (1672-1678), de Negenjarige Oorlog (1688-1697) en de Spaanse Successieoorlog (1701-1714). Deze conflicten brachten plunderingen, brandschattingen en economische chaos naar de regio.",
    descriptionFR: "Louis XIV de France, le 'Roi Soleil', mena durant son long règne (1643-1715) plusieurs guerres dévastatrices qui ravagèrent les Pays-Bas méridionaux : la Guerre de Dévolution (1667-1668), la Guerre de Hollande (1672-1678), la Guerre de Neuf Ans (1688-1697) et la Guerre de Succession d'Espagne (1701-1714).",
    descriptionPCD: "Louis XIV éd France, l' 'Roi Soleil', mena durant sin long règne plusieurs guerres dévastatrices qui ravagèrent les Pays-Bas méridionaux.",
    descriptionVLS: "Lodewyk XIV van Frankryk, de 'Zonnekoning', voerde gedurende zyn lange regeerperiode meerdere verwoestende oorlogen die de Zuidelike Nederlanden teisterden: de Devolutieoorlog, de Hollandsche Oorlog, de Negenjoarigen Oorlog en de Spaansche Successieoorlog.",
    descriptionEN: "Louis XIV of France, the 'Sun King', conducted several devastating wars during his long reign (1643-1715) that ravaged the Southern Netherlands: the War of Devolution (1667-1668), the Dutch War (1672-1678), the Nine Years' War (1688-1697), and the War of the Spanish Succession (1701-1714). These conflicts brought pillaging, ransoms, and economic chaos to the region.",
    descriptionES: "Luis XIV de Francia, el 'Rey Sol', libró varias guerras devastadoras durante su largo reinado (1643-1715) que asolaron los Países Bajos del Sur: la Guerra de Devolución (1667-1668), la Guerra de Holanda (1672-1678), la Guerra de los Nueve Años (1688-1697) y la Guerra de Sucesión Española (1701-1714). Estos conflictos trajeron saqueos, rescates y caos económico a la región.",
    descriptionDE: "Ludwig XIV. von Frankreich, der 'Sonnenkönig', führte während seiner langen Regierungszeit (1643-1715) mehrere verheerende Kriege, die die Südlichen Niederlande verwüsteten: den Devolutionskrieg (1667-1668), den Holländischen Krieg (1672-1678), den Pfälzischen Erbfolgekrieg (1688-1697) und den Spanischen Erbfolgekrieg (1701-1714). Diese Konflikte brachten Plünderungen, Brandschatzungen und wirtschaftliches Chaos in die Region.",
    descriptionSV: "Ludvig XIV av Frankrike, 'Solkungen', förde under sin långa regeringstid (1643-1715) flera förödande krig som härjade Södra Nederländerna: Devolutionskriget (1667-1668), Holländska kriget (1672-1678), Nioårskriget (1688-1697) och Spanska tronföljdskriget (1701-1714). Dessa konflikter medförde plundringar, brandskattningar och ekonomiskt kaos i regionen.",
    impactNL: "Het is in deze turbulente periode dat onze stamvader Hubert Deleforge besloot om in 1699 zijn eigendom in Hallennes-lez-Haubourdin (bij Lille) te verkopen en 50 km noordwaarts te trekken naar Emelgem in West-Vlaanderen. De oorlogsdreiging, economische onzekerheid en het zoeken naar stabiliteit in de Oostenrijkse Nederlanden dreven de familie naar veiliger oorden.",
    impactFR: "C'est dans cette période turbulente que notre ancêtre fondateur Hubert Deleforge décida en 1699 de vendre sa propriété à Hallennes-lez-Haubourdin (près de Lille) et de migrer 50 km vers le nord à Emelgem en Flandre Occidentale. La menace de guerre, l'incertitude économique et la recherche de stabilité aux Pays-Bas autrichiens poussèrent la famille vers des lieux plus sûrs.",
    impactPCD: "Ch'est dins chete période turbulinte qu' note anchête fondateur Hubert Deleforge décida in 1699 d' vinde s' propriété à Hallennes-lez-Haubourdin pi d' migrer vers l' nord à Emelgem.",
    impactVLS: "'t Is in dezen turbulenten tied dat uuzen stamvader Hubert Deleforge besloot om in 1699 zyn eigendom in Hallennes-lez-Haubourdin (by Lille) te verkopen en 50 km noardwoarts te trekken noar Emelgem in West-Vlaanderen.",
    impactEN: "It was during this turbulent period that our founding ancestor Hubert Deleforge decided in 1699 to sell his property in Hallennes-lez-Haubourdin (near Lille) and move 50 km northward to Emelgem in West Flanders. The threat of war, economic uncertainty, and the search for stability in the Austrian Netherlands drove the family to safer places.",
    impactES: "Fue durante este período turbulento que nuestro antepasado fundador Hubert Deleforge decidió en 1699 vender su propiedad en Hallennes-lez-Haubourdin (cerca de Lille) y trasladarse 50 km al norte a Emelgem en Flandes Occidental. La amenaza de guerra, la incertidumbre económica y la búsqueda de estabilidad en los Países Bajos austríacos llevaron a la familia a lugares más seguros.",
    impactDE: "In dieser turbulenten Zeit beschloss unser Stammvater Hubert Deleforge 1699, sein Anwesen in Hallennes-lez-Haubourdin (bei Lille) zu verkaufen und 50 km nordwärts nach Emelgem in Westflandern zu ziehen. Die Kriegsbedrohung, wirtschaftliche Unsicherheit und die Suche nach Stabilität in den Österreichischen Niederlanden trieben die Familie an sichere Orte.",
    impactSV: "Det var under denna turbulenta period som vår stamfader Hubert Deleforge beslöt att 1699 sälja sin egendom i Hallennes-lez-Haubourdin (nära Lille) och flytta 50 km norrut till Emelgem i Västflandern. Krigshotet, den ekonomiska osäkerheten och sökandet efter stabilitet i de Österrikiska Nederländerna drev familjen till tryggare platser.",
    factsNL: [
      "De Devolutieoorlog (1667-1668): Lodewijk eiste de Spaanse Nederlanden op",
      "De Hollandse Oorlog (1672-1678): Nederland werd bijna volledig veroverd",
      "De Negenjarige Oorlog (1688-1697): Europese coalitie tegen Franse expansie",
      "De Spaanse Successieoorlog (1701-1714): strijd om de Spaanse troon",
      "Steden als Lille, Doornik en Ieper werden Frans gebied"
    ],
    factsFR: [
      "Guerre de Dévolution (1667-1668) : Louis revendiqua les Pays-Bas espagnols",
      "Guerre de Hollande (1672-1678) : les Pays-Bas furent presque entièrement conquis",
      "Guerre de Neuf Ans (1688-1697) : coalition européenne contre l'expansion française",
      "Guerre de Succession d'Espagne (1701-1714) : lutte pour le trône espagnol",
      "Des villes comme Lille, Tournai et Ypres devinrent territoire français"
    ],
    factsPCD: [
      "Guerre éd Dévolution (1667-1668) : Louis revendiqua les Pays-Bas espagnols",
      "Guerre éd Hollande (1672-1678) : les Pays-Bas furint presque intiéremint conquis",
      "Des villes comme Lile, Tournai pi Ypres d'vinrent territoire français"
    ],
    factsVLS: [
      "De Devolutieoorlog (1667-1668): Lodewyk eischte de Spaansche Nederlanden op",
      "De Hollandsche Oorlog (1672-1678): Nederland wierd byno volledig verooverd",
      "De Negenjoarigen Oorlog (1688-1697): Europeesche coälitie tegen Fransche expansie",
      "Steên gelyk Lille, Doornik en Ieper wierden Fransch gebied"
    ],
    factsEN: [
      "War of Devolution (1667-1668): Louis claimed the Spanish Netherlands",
      "Dutch War (1672-1678): The Netherlands was almost completely conquered",
      "Nine Years' War (1688-1697): European coalition against French expansion",
      "War of the Spanish Succession (1701-1714): struggle for the Spanish throne",
      "Cities like Lille, Tournai, and Ypres became French territory"
    ],
    factsES: [
      "Guerra de Devolución (1667-1668): Luis reclamó los Países Bajos españoles",
      "Guerra de Holanda (1672-1678): Los Países Bajos fueron casi completamente conquistados",
      "Guerra de los Nueve Años (1688-1697): coalición europea contra la expansión francesa",
      "Guerra de Sucesión Española (1701-1714): lucha por el trono español",
      "Ciudades como Lille, Tournai e Ypres se convirtieron en territorio francés"
    ],
    factsDE: [
      "Devolutionskrieg (1667-1668): Ludwig beanspruchte die Spanischen Niederlande",
      "Holländischer Krieg (1672-1678): Die Niederlande wurden fast vollständig erobert",
      "Pfälzischer Erbfolgekrieg (1688-1697): Europäische Koalition gegen französische Expansion",
      "Spanischer Erbfolgekrieg (1701-1714): Kampf um den spanischen Thron",
      "Städte wie Lille, Tournai und Ypern wurden französisches Gebiet"
    ],
    factsSV: [
      "Devolutionskriget (1667-1668): Ludvig krävde de Spanska Nederländerna",
      "Holländska kriget (1672-1678): Nederländerna erövrades nästan helt",
      "Nioårskriget (1688-1697): Europeisk koalition mot fransk expansion",
      "Spanska tronföljdskriget (1701-1714): kamp om den spanska tronen",
      "Städer som Lille, Tournai och Ypres blev franskt territorium"
    ],
    duration: "47 jaar (1667-1714)",
    durationFR: "47 ans (1667-1714)",
    durationPCD: "47 ans (1667-1714)",
    durationVLS: "47 joar (1667-1714)",
    durationEN: "47 years (1667-1714)",
    durationES: "47 años (1667-1714)",
    durationDE: "47 Jahre (1667-1714)",
    durationSV: "47 år (1667-1714)",
    location: "Zuidelijke Nederlanden, Noord-Frankrijk",
    locationFR: "Pays-Bas méridionaux, Nord de la France",
    locationPCD: "Pays-Bas méridionaux, Nord éd la France",
    locationVLS: "Zuidelike Nederlanden, Noord-Frankryk",
    locationEN: "Southern Netherlands, Northern France",
    locationES: "Países Bajos del Sur, Norte de Francia",
    locationDE: "Südliche Niederlande, Nordfrankreich",
    locationSV: "Södra Nederländerna, Norra Frankrike",
    image: oorlogLodewijkXIV,
    color: "from-amber-600 to-amber-800",
    // Lodewijk XIV biography and historical context
    biographyTitleNL: "Lodewijk XIV (1638-1715) - De Zonnekoning",
    biographyTitleFR: "Louis XIV (1638-1715) - Le Roi Soleil",
    biographyTitlePCD: "Louis XIV (1638-1715) - L' Roi Soleil",
    biographyTitleVLS: "Lodewyk XIV (1638-1715) - De Zonnekoning",
    biographyTitleEN: "Louis XIV (1638-1715) - The Sun King",
    biographyTitleES: "Luis XIV (1638-1715) - El Rey Sol",
    biographyTitleDE: "Ludwig XIV. (1638-1715) - Der Sonnenkönig",
    biographyNL: `Lodewijk XIV van Frankrijk (1638-1715) was de langstregerende monarch in de Europese geschiedenis. Hij werd koning op 4-jarige leeftijd na de dood van zijn vader Lodewijk XIII, maar de echte macht lag tot 1661 bij kardinaal Mazarin. Na diens dood nam Lodewijk persoonlijk de regering over met de beroemde woorden: "L'État, c'est moi" (De staat, dat ben ik).

**De Devolutieoorlog (1667-1668)**
Lodewijks eerste oorlog was gebaseerd op een obscure erfenisclaim. Hij beweerde dat de Spaanse Nederlanden aan zijn vrouw Maria Theresia toekwamen na de dood van haar vader Filips IV van Spanje. In enkele maanden veroverden Franse troepen een groot deel van Vlaanderen, waaronder steden als Lille, Doornik en Charleroi. De Triple Alliantie (Engeland, Nederland, Zweden) dwong hem tot de Vrede van Aken, maar Frankrijk behield belangrijke grensvestingen.

**De Hollandse Oorlog (1672-1678)**
Lodewijk wilde de Republiek der Zeven Verenigde Nederlanden vernietigen - zijn grootste rivaal in handel en politiek. In 1672, het "Rampjaar", trokken 120.000 Franse soldaten via de Zuidelijke Nederlanden naar Holland. De Nederlanders zetten grote delen van het land onder water door de sluizen te openen. Willem III van Oranje werd stadhouder en bracht een coalitie tegen Frankrijk bijeen. De oorlog eindigde met de Vrede van Nijmegen (1678), waarbij Frankrijk opnieuw gebieden in Vlaanderen annexeerde.

**Reuniepolitiek en de val van Rijsel**
Tussen de oorlogen door voerde Lodewijk een agressieve "reuniepolitiek": speciale rechtbanken verklaarden oude leengoederen als Frans bezit. In 1668 was Lille (Rijsel) al veroverd, wat een schok betekende voor de regio waar onze voorouders leefden. De stad werd het centrum van Frans bestuur in de veroverde gebieden.

**De Negenjarige Oorlog (1688-1697)**
Deze oorlog begon toen Lodewijk de Palts binnenviel en systematisch verwoestte - de beruchte "Guerre des réunions". Een grote Europese coalitie (de Liga van Augsburg) onder Willem III vocht tegen Frankrijk. Vlaanderen werd opnieuw een slagveld. De Vrede van Rijswijk (1697) bracht slechts tijdelijke rust.

**De Spaanse Successieoorlog (1701-1714)**
De laatste en langste oorlog brak uit over de erfopvolging van de kinderloze Spaanse koning Karel II. Lodewijk plaatste zijn kleinzoon Filips V op de Spaanse troon, wat heel Europa tegen Frankrijk keerde. De Slag bij Ramillies (1706) en Oudenaarde (1708) waren verwoestende nederlagen voor Frankrijk. De oorlog eindigde met de Vrede van Utrecht (1713), die de Spaanse Nederlanden aan Oostenrijk toekende.

**Impact op onze voorouders**
De streek rond Lille lag letterlijk in de vuurlinie. Dorpen werden geplunderd, oogsten vernietigd, en mannen werden gedwongen in legers te dienen. Belastingen stegen enorm om de oorlogsinspanningen te financieren. Het is in deze context van permanente oorlogsdreiging dat Hubert Deleforge in 1699 besloot om zijn eigendom te verkopen en naar het relatief rustigere West-Vlaanderen te trekken, dat onder Spaans (later Oostenrijks) bestuur stond. De migratie was geen avontuur, maar een vlucht naar veiligheid.`,
    biographyFR: `Louis XIV de France (1638-1715) fut le monarque ayant régné le plus longtemps dans l'histoire européenne. Il devint roi à 4 ans après la mort de son père Louis XIII, mais le vrai pouvoir resta aux mains du cardinal Mazarin jusqu'en 1661. Après sa mort, Louis prit personnellement le pouvoir avec les célèbres mots : "L'État, c'est moi".

**La Guerre de Dévolution (1667-1668)**
La première guerre de Louis était basée sur une obscure revendication successorale. Il prétendait que les Pays-Bas espagnols revenaient à son épouse Marie-Thérèse après la mort de son père Philippe IV d'Espagne. En quelques mois, les troupes françaises conquirent une grande partie de la Flandre, dont des villes comme Lille, Tournai et Charleroi. La Triple Alliance (Angleterre, Pays-Bas, Suède) le contraignit à la Paix d'Aix-la-Chapelle, mais la France conserva d'importantes forteresses frontalières.

**La Guerre de Hollande (1672-1678)**
Louis voulait détruire la République des Sept Provinces-Unies - son plus grand rival commercial et politique. En 1672, "l'Année de Désastre", 120 000 soldats français traversèrent les Pays-Bas méridionaux vers la Hollande. Les Néerlandais inondèrent de grandes parties du pays en ouvrant les écluses. Guillaume III d'Orange devint stathouder et rassembla une coalition contre la France. La guerre se termina par la Paix de Nimègue (1678), la France annexant à nouveau des territoires en Flandre.

**Politique des Réunions et la chute de Lille**
Entre les guerres, Louis mena une agressive "politique des réunions" : des chambres spéciales déclaraient d'anciens fiefs comme propriété française. En 1668, Lille avait déjà été conquise, un choc pour la région où vivaient nos ancêtres. La ville devint le centre de l'administration française dans les territoires conquis.

**La Guerre de Neuf Ans (1688-1697)**
Cette guerre commença quand Louis envahit et dévasta systématiquement le Palatinat. Une grande coalition européenne (la Ligue d'Augsbourg) sous Guillaume III combattit la France. La Flandre redevint un champ de bataille. La Paix de Ryswick (1697) n'apporta qu'un répit temporaire.

**La Guerre de Succession d'Espagne (1701-1714)**
La dernière et plus longue guerre éclata sur la succession du roi espagnol sans enfant Charles II. Louis plaça son petit-fils Philippe V sur le trône espagnol, retournant toute l'Europe contre la France. Les batailles de Ramillies (1706) et d'Audenarde (1708) furent des défaites dévastatrices. La guerre se termina par la Paix d'Utrecht (1713), qui attribua les Pays-Bas espagnols à l'Autriche.

**Impact sur nos ancêtres**
La région de Lille se trouvait littéralement dans la ligne de feu. Les villages furent pillés, les récoltes détruites, et les hommes forcés de servir dans les armées. Les impôts augmentèrent énormément. C'est dans ce contexte de menace de guerre permanente qu'Hubert Deleforge décida en 1699 de vendre sa propriété et de migrer vers la Flandre occidentale, plus calme et sous administration espagnole (puis autrichienne).`,
    biographyPCD: `Louis XIV éd France (1638-1715) fut l' monarque qu'a régné l' pus longtemps dins l'histoère européenne. I d'vint roi à 4 ans après la mort d' sin père Louis XIII, mais l' vrai pouvoir resta aux mains du cardinal Mazarin jusqu'in 1661.

**La Guerre éd Dévolution (1667-1668)**
La premiére guerre éd Louis étot basée sus eune obscure revendication successorale. I prétindot qu' les Pays-Bas espagnols r'venoéent à s' femme Marie-Thérèse. In quéques mois, les troupes françaises conquirint eune grande partie d' la Flandre, dont des villes comme Lile, Tournai pi Charleroi.

**La Guerre éd Hollande (1672-1678)**
Louis voulot détruire la République des Sept Provinces-Unies. In 1672, "l'Année éd Désastre", 120 000 soldats français traversèrint les Pays-Bas méridionaux vers la Hollande. Les Néerlandais inondèrint d' grandes parties du pays in ouvrant les écluses.

**La chute éd Lile**
In 1668, Lile avot déjà été conquise, in choc pour la région ousqu' vivoéent nos anchêtres. La ville d'vint l' cénte éd l'administration française.

**Impact sus nos anchêtres**
La région éd Lile s' trouvo littéralemint dins la ligne éd feu. Les villages furint pillés, les récoltes détruites. Ch'est dins ch' contexte qu' Hubert Deleforge décida in 1699 d' vinde s' propriété pi d' migrer vers la Flandre occidentale.`,
    biographyVLS: `Lodewyk XIV van Frankryk (1638-1715) was den langstregeerenden monarch in de Europeesche geschiedenis. Y wierd koning op 4-joarigen ouderdom na de dood van zyn vader Lodewyk XIII, mo de echte macht lag tot 1661 by kardinaal Mazarin.

**De Devolutieoorlog (1667-1668)**
Lodewyks eerste oorlog was gebaseerd op e obscure erfenisclaim. Y beweerde dat de Spaansche Nederlanden an zyn wyf Maria Theresia toekwamen. In enkele moanden verooverden Fransche troepen e groot deel van Vlaanderen, met steên gelyk Lille, Doornik en Charleroi.

**De Hollandsche Oorlog (1672-1678)**
Lodewyk wilde de Republiek der Zeven Vereenichde Nederlanden vernietigen. In 1672, 't "Rampjoar", trokken 120.000 Fransche soldoaten via de Zuideliken Nederlanden noar Holland. De Nederlanders zetten groote deelen van 't land onder woater.

**De val van Rysel**
In 1668 was Lille (Rysel) al verooverd, e schok vôor de regio woar uuze vôorouders leefden. De stad wierd 't céntrum van Fransch bestuur.

**De Negenjoarigen Oorlog (1688-1697)**
Dezen oorlog begon toen Lodewyk de Palts binnenviel en systematisch verwoestte. E groote Europeesche coälitie vocht tegen Frankryk. Vlaanderen wierd opnieuw e slagveld.

**De Spaansche Successieoorlog (1701-1714)**
De leste en langste oorlog brak uut over de erfopvolgienge van de kinderlozen Spaanschen koning Karel II. De Slag by Ramillies (1706) en Oudenaarde (1708) woaren verwoestende nederlagen vôor Frankryk.

**Impact op uuze vôorouders**
De streek rond Lille lag in de vuurlinie. Dôorpen wierden geplunderd, ôogsten vernietigd. 't Is in dezen context dat Hubert Deleforge in 1699 besloot om zyn eigendom te verkopen en noar 't rustiger West-Vlaanderen te trekken.`,
    biographyEN: `Louis XIV of France (1638-1715) was the longest-reigning monarch in European history. He became king at age 4 after the death of his father Louis XIII, but real power remained with Cardinal Mazarin until 1661. After Mazarin's death, Louis personally took control of government with the famous words: "L'État, c'est moi" (I am the State).

**The War of Devolution (1667-1668)**
Louis's first war was based on an obscure inheritance claim. He claimed that the Spanish Netherlands should pass to his wife Maria Theresa after the death of her father Philip IV of Spain. Within months, French troops conquered much of Flanders, including cities like Lille, Tournai, and Charleroi. The Triple Alliance (England, Netherlands, Sweden) forced him to the Peace of Aachen, but France retained important border fortresses.

**The Dutch War (1672-1678)**
Louis wanted to destroy the Dutch Republic - his greatest rival in trade and politics. In 1672, the "Disaster Year," 120,000 French soldiers marched through the Southern Netherlands to Holland. The Dutch flooded large parts of the country by opening the sluices. William III of Orange became stadtholder and assembled a coalition against France. The war ended with the Peace of Nijmegen (1678), with France again annexing territories in Flanders.

**Reunion Policy and the Fall of Lille**
Between wars, Louis pursued an aggressive "reunion policy": special courts declared old fiefdoms as French property. In 1668, Lille had already been conquered, a shock for the region where our ancestors lived. The city became the center of French administration in the conquered territories.

**The Nine Years' War (1688-1697)**
This war began when Louis invaded and systematically devastated the Palatinate. A large European coalition (the League of Augsburg) under William III fought against France. Flanders again became a battlefield. The Peace of Ryswick (1697) brought only temporary respite.

**The War of the Spanish Succession (1701-1714)**
The last and longest war broke out over the succession of the childless Spanish King Charles II. Louis placed his grandson Philip V on the Spanish throne, turning all of Europe against France. The Battles of Ramillies (1706) and Oudenarde (1708) were devastating defeats for France. The war ended with the Peace of Utrecht (1713), which assigned the Spanish Netherlands to Austria.

**Impact on Our Ancestors**
The region around Lille was literally in the line of fire. Villages were plundered, harvests destroyed, and men were forced to serve in armies. Taxes rose enormously to finance the war efforts. It was in this context of permanent war threat that Hubert Deleforge decided in 1699 to sell his property and move to the relatively calmer West Flanders, which was under Spanish (later Austrian) rule. The migration was not an adventure, but a flight to safety.`,
    biographyES: `Luis XIV de Francia (1638-1715) fue el monarca de reinado más largo en la historia europea. Se convirtió en rey a los 4 años tras la muerte de su padre Luis XIII, pero el poder real permaneció con el cardenal Mazarino hasta 1661. Después de su muerte, Luis tomó personalmente el control con las famosas palabras: "L'État, c'est moi" (El Estado soy yo).

**La Guerra de Devolución (1667-1668)**
La primera guerra de Luis se basó en una oscura reclamación de herencia. Afirmaba que los Países Bajos españoles debían pasar a su esposa María Teresa tras la muerte de su padre Felipe IV de España. En pocos meses, las tropas francesas conquistaron gran parte de Flandes, incluyendo ciudades como Lille, Tournai y Charleroi.

**La Guerra de Holanda (1672-1678)**
Luis quería destruir la República Holandesa, su mayor rival en comercio y política. En 1672, el "Año del Desastre", 120.000 soldados franceses marcharon a través de los Países Bajos del Sur hacia Holanda. Los holandeses inundaron grandes partes del país abriendo las esclusas. Guillermo III de Orange se convirtió en estatúder y reunió una coalición contra Francia.

**Política de Reuniones y la caída de Lille**
Entre guerras, Luis llevó a cabo una agresiva "política de reuniones": tribunales especiales declararon antiguos feudos como propiedad francesa. En 1668, Lille ya había sido conquistada, un shock para la región donde vivían nuestros antepasados.

**La Guerra de los Nueve Años (1688-1697)**
Esta guerra comenzó cuando Luis invadió y devastó sistemáticamente el Palatinado. Una gran coalición europea (la Liga de Augsburgo) bajo Guillermo III luchó contra Francia. Flandes volvió a ser un campo de batalla.

**La Guerra de Sucesión Española (1701-1714)**
La última y más larga guerra estalló por la sucesión del rey español sin hijos Carlos II. Luis colocó a su nieto Felipe V en el trono español, volviendo a toda Europa contra Francia. Las batallas de Ramillies (1706) y Oudenarde (1708) fueron derrotas devastadoras. La guerra terminó con la Paz de Utrecht (1713).

**Impacto en nuestros antepasados**
La región alrededor de Lille estaba literalmente en la línea de fuego. Los pueblos fueron saqueados, las cosechas destruidas. Fue en este contexto de amenaza de guerra permanente que Hubert Deleforge decidió en 1699 vender su propiedad y trasladarse a Flandes Occidental, más tranquila y bajo dominio español (luego austríaco). La migración no fue una aventura, sino una huida hacia la seguridad.`,
    biographyDE: `Ludwig XIV. von Frankreich (1638-1715) war der am längsten regierende Monarch der europäischen Geschichte. Er wurde im Alter von 4 Jahren nach dem Tod seines Vaters Ludwig XIII. König, aber die wahre Macht lag bis 1661 bei Kardinal Mazarin. Nach dessen Tod übernahm Ludwig persönlich die Regierung mit den berühmten Worten: "L'État, c'est moi" (Der Staat bin ich).

**Der Devolutionskrieg (1667-1668)**
Ludwigs erster Krieg basierte auf einem obskuren Erbanspruch. Er behauptete, die Spanischen Niederlande stünden seiner Frau Maria Theresia nach dem Tod ihres Vaters Philipp IV. von Spanien zu. Innerhalb weniger Monate eroberten französische Truppen einen Großteil Flanderns, darunter Städte wie Lille, Tournai und Charleroi. Die Tripelallianz (England, Niederlande, Schweden) zwang ihn zum Frieden von Aachen, aber Frankreich behielt wichtige Grenzfestungen.

**Der Holländische Krieg (1672-1678)**
Ludwig wollte die Niederländische Republik vernichten - seinen größten Rivalen in Handel und Politik. 1672, im "Katastrophenjahr", marschierten 120.000 französische Soldaten durch die Südlichen Niederlande nach Holland. Die Niederländer setzten große Teile des Landes unter Wasser, indem sie die Schleusen öffneten. Wilhelm III. von Oranien wurde Statthalter und versammelte eine Koalition gegen Frankreich. Der Krieg endete mit dem Frieden von Nimwegen (1678), wobei Frankreich erneut Gebiete in Flandern annektierte.

**Reunionspolitik und der Fall von Lille**
Zwischen den Kriegen verfolgte Ludwig eine aggressive "Reunionspolitik": Sondergerichte erklärten alte Lehen zu französischem Eigentum. 1668 war Lille bereits erobert worden, ein Schock für die Region, in der unsere Vorfahren lebten. Die Stadt wurde zum Zentrum der französischen Verwaltung in den eroberten Gebieten.

**Der Pfälzische Erbfolgekrieg (1688-1697)**
Dieser Krieg begann, als Ludwig in die Pfalz einfiel und sie systematisch verwüstete. Eine große europäische Koalition (die Liga von Augsburg) unter Wilhelm III. kämpfte gegen Frankreich. Flandern wurde erneut zum Schlachtfeld. Der Friede von Rijswijk (1697) brachte nur vorübergehende Ruhe.

**Der Spanische Erbfolgekrieg (1701-1714)**
Der letzte und längste Krieg brach über die Nachfolge des kinderlosen spanischen Königs Karl II. aus. Ludwig setzte seinen Enkel Philipp V. auf den spanischen Thron, was ganz Europa gegen Frankreich aufbrachte. Die Schlachten bei Ramillies (1706) und Oudenaarde (1708) waren verheerende Niederlagen für Frankreich. Der Krieg endete mit dem Frieden von Utrecht (1713), der die Spanischen Niederlande Österreich zusprach.

**Auswirkungen auf unsere Vorfahren**
Die Region um Lille lag buchstäblich in der Schusslinie. Dörfer wurden geplündert, Ernten zerstört, und Männer wurden zum Kriegsdienst gezwungen. Die Steuern stiegen enorm, um die Kriegsanstrengungen zu finanzieren. In diesem Kontext permanenter Kriegsbedrohung beschloss Hubert Deleforge 1699, sein Eigentum zu verkaufen und in das relativ ruhigere Westflandern zu ziehen, das unter spanischer (später österreichischer) Herrschaft stand. Die Migration war kein Abenteuer, sondern eine Flucht in Sicherheit.`
  },
  {
    id: "frans-duitse",
    year: "1870-1871",
    period: "19 juli 1870 - 10 mei 1871",
    titleNL: "Frans-Duitse Oorlog",
    titleFR: "Guerre franco-prussienne",
    titlePCD: "Guerre franco-prussienne",
    titleVLS: "Frans-Duitsche Oorlog",
    titleEN: "Franco-Prussian War",
    titleES: "Guerra Franco-Prusiana",
    titleDE: "Deutsch-Französischer Krieg",
    subtitleNL: "De geboorte van het Duitse Keizerrijk",
    subtitleFR: "La naissance de l'Empire allemand",
    subtitlePCD: "La naissance éd l'Empire allemand",
    subtitleVLS: "De geboorte van 't Duitsche Keizerryk",
    subtitleEN: "The birth of the German Empire",
    subtitleES: "El nacimiento del Imperio Alemán",
    subtitleDE: "Die Geburt des Deutschen Kaiserreichs",
    subtitleSV: "Det tyska kejsardömets födelse",
    descriptionNL: "De Frans-Pruisische oorlog (1870-1871), uitgelokt door de Pruisische kanselier Otto von Bismarck, leidde tot de vernietigende nederlaag van het Tweede Franse Keizerrijk onder Napoleon III. De beslissende Slag bij Sedan (2 september 1870) resulteerde in de gevangenname van de Franse keizer zelf. De oorlog eindigde met de proclamatie van het Duitse Keizerrijk in de Spiegelzaal van Versailles (18 januari 1871) en de annexatie van Elzas-Lotharingen door Duitsland.",
    descriptionFR: "La guerre franco-prussienne (1870-1871), provoquée par le chancelier prussien Otto von Bismarck, mena à la défaite écrasante du Second Empire français sous Napoléon III. La bataille décisive de Sedan (2 septembre 1870) résulta en la capture de l'empereur français lui-même. La guerre se termina par la proclamation de l'Empire allemand dans la Galerie des Glaces à Versailles (18 janvier 1871) et l'annexion de l'Alsace-Lorraine par l'Allemagne.",
    descriptionPCD: "La guerre franco-prussienne (1870-1871), provoquée par l' chancelier prussien Otto von Bismarck, mena à l' défaite écrasante du Second Empire français sous Napoléon III.",
    descriptionVLS: "De Frans-Pruisische oorlog (1870-1871), uutgelokt deur den Pruisischen kanselier Otto von Bismarck, leidde tot de vernietigende nederlage van 't Twiede Fransche Keizerryk onder Napoleon III.",
    descriptionEN: "The Franco-Prussian War (1870-1871), provoked by Prussian Chancellor Otto von Bismarck, led to the crushing defeat of the Second French Empire under Napoleon III. The decisive Battle of Sedan (September 2, 1870) resulted in the capture of the French Emperor himself. The war ended with the proclamation of the German Empire in the Hall of Mirrors at Versailles (January 18, 1871) and the annexation of Alsace-Lorraine by Germany.",
    descriptionES: "La Guerra Franco-Prusiana (1870-1871), provocada por el canciller prusiano Otto von Bismarck, llevó a la aplastante derrota del Segundo Imperio Francés bajo Napoleón III. La decisiva Batalla de Sedán (2 de septiembre de 1870) resultó en la captura del propio Emperador francés. La guerra terminó con la proclamación del Imperio Alemán en la Galería de los Espejos en Versalles (18 de enero de 1871) y la anexión de Alsacia-Lorena por Alemania.",
    descriptionDE: "Der Deutsch-Französische Krieg (1870-1871), provoziert vom preußischen Kanzler Otto von Bismarck, führte zur vernichtenden Niederlage des Zweiten Französischen Kaiserreichs unter Napoleon III. Die entscheidende Schlacht bei Sedan (2. September 1870) führte zur Gefangennahme des französischen Kaisers selbst. Der Krieg endete mit der Proklamation des Deutschen Kaiserreichs im Spiegelsaal von Versailles (18. Januar 1871) und der Annexion Elsass-Lothringens durch Deutschland.",
    descriptionSV: "Det fransk-preussiska kriget (1870–1871), framprovocerat av den preussiske kanslern Otto von Bismarck, ledde till det andra franska kejsardömets förödande nederlag under Napoleon III. Det avgörande slaget vid Sedan (2 september 1870) resulterade i den franske kejsarens egen tillfångatagning. Kriget avslutades med proklamationen av det tyska kejsardömet i Spegelsalen i Versailles (18 januari 1871) och Tysklands annektering av Elsass-Lothringen.",
    impactNL: "Charles-Louis Deforce was 14 jaar oud toen de oorlog uitbrak. Voor België, dat sinds 1830 een strikt neutrale status had, was de oorlog bijzonder bedreigend. Beide legers stonden vlak bij de Belgische grens en het land mobiliseerde 100.000 soldaten om de neutraliteit te bewaken. In West-Vlaanderen vreesde men een invasie. Deze ervaring heeft ongetwijfeld indruk gemaakt op de jonge Charles-Louis, die zeven jaar later zelf soldaat zou worden.",
    impactFR: "Charles-Louis Deforce avait 14 ans lorsque la guerre éclata. Pour la Belgique, qui avait un statut strictement neutre depuis 1830, la guerre était particulièrement menaçante. Les deux armées se trouvaient près de la frontière belge et le pays mobilisa 100 000 soldats pour protéger sa neutralité. Cette expérience a sans doute marqué le jeune Charles-Louis, qui deviendrait lui-même soldat sept ans plus tard.",
    impactPCD: "Charles-Louis Deforce avot 14 ans quand l' guerre éclata. Pour l' Belgique, qui avot un statut strictemint neutre d'puis 1830, l' guerre étot particuliéremint minaçante.",
    impactVLS: "Charles-Louis Deforce was 14 joar oud tonne da den oorlog uutbrak. Vôor België, da sinds 1830 e strikt neutrale status had, was den oorlog byzonder bedreigend. Beede legers stonden vlak by de Belgische grens.",
    impactEN: "Charles-Louis Deforce was 14 years old when the war broke out. For Belgium, which had maintained strict neutrality since 1830, the war was particularly threatening. Both armies stood near the Belgian border and the country mobilized 100,000 soldiers to protect its neutrality. In West Flanders, an invasion was feared. This experience undoubtedly made an impression on the young Charles-Louis, who would become a soldier himself seven years later.",
    impactES: "Charles-Louis Deforce tenía 14 años cuando estalló la guerra. Para Bélgica, que había mantenido una estricta neutralidad desde 1830, la guerra era particularmente amenazante. Ambos ejércitos estaban cerca de la frontera belga y el país movilizó 100.000 soldados para proteger su neutralidad. En Flandes Occidental se temía una invasión. Esta experiencia sin duda impresionó al joven Charles-Louis, quien se convertiría en soldado él mismo siete años después.",
    impactDE: "Charles-Louis Deforce war 14 Jahre alt, als der Krieg ausbrach. Für Belgien, das seit 1830 strikte Neutralität wahrte, war der Krieg besonders bedrohlich. Beide Armeen standen nahe der belgischen Grenze und das Land mobilisierte 100.000 Soldaten zum Schutz seiner Neutralität. In Westflandern fürchtete man eine Invasion. Diese Erfahrung hinterließ zweifellos Eindruck beim jungen Charles-Louis, der sieben Jahre später selbst Soldat werden sollte.",
    impactSV: "Charles-Louis Deforce var 14 år gammal när kriget bröt ut. För Belgien, som hade upprätthållit strikt neutralitet sedan 1830, var kriget särskilt hotfullt. Båda arméerna stod nära den belgiska gränsen och landet mobiliserade 100 000 soldater för att skydda sin neutralitet. I Västflandern fruktade man en invasion. Denna upplevelse gjorde utan tvekan intryck på den unge Charles-Louis, som själv skulle bli soldat sju år senare.",
    factsNL: [
      "De oorlog begon door een diplomatiek conflict over de Spaanse troonopvolging",
      "De Slag bij Sedan (2 september 1870) was beslissend: Napoleon III werd krijgsgevangen",
      "Parijs werd maandenlang belegerd (september 1870 - januari 1871)",
      "Het Duitse Keizerrijk werd uitgeroepen in Versailles op 18 januari 1871",
      "Frankrijk verloor Elzas-Lotharingen en moest 5 miljard frank schadevergoeding betalen"
    ],
    factsFR: [
      "La guerre commença par un conflit diplomatique sur la succession au trône d'Espagne",
      "La Bataille de Sedan (2 septembre 1870) fut décisive : Napoléon III fut fait prisonnier",
      "Paris fut assiégé pendant des mois (septembre 1870 - janvier 1871)",
      "L'Empire allemand fut proclamé à Versailles le 18 janvier 1871",
      "La France perdit l'Alsace-Lorraine et dut payer 5 milliards de francs d'indemnité"
    ],
    factsPCD: [
      "L' guerre commença par un conflit diplomatique sus l' succession au trône d'Espagne",
      "L' Bataille éd Sedan fut décisive : Napoléon III fut fait prisonnier",
      "L'Empire allemand fut proclamé à Versailles l' 18 janvier 1871"
    ],
    factsVLS: [
      "Den oorlog begon deur e diplomoatiek conflict over de Spaansche trôonopvolging",
      "De Slag by Sedan (2 september 1870) was beslissend: Napoleon III wierd krygsgevoangen",
      "'t Duitsche Keizerryk wierd uutgeroepen in Versailles op 18 januari 1871"
    ],
    factsEN: [
      "The war began due to a diplomatic conflict over the Spanish succession",
      "The Battle of Sedan (September 2, 1870) was decisive: Napoleon III was taken prisoner",
      "Paris was besieged for months (September 1870 - January 1871)",
      "The German Empire was proclaimed at Versailles on January 18, 1871",
      "France lost Alsace-Lorraine and had to pay 5 billion francs in reparations"
    ],
    factsES: [
      "La guerra comenzó debido a un conflicto diplomático sobre la sucesión española",
      "La Batalla de Sedán (2 de septiembre de 1870) fue decisiva: Napoleón III fue hecho prisionero",
      "París fue sitiado durante meses (septiembre 1870 - enero 1871)",
      "El Imperio Alemán fue proclamado en Versalles el 18 de enero de 1871",
      "Francia perdió Alsacia-Lorena y tuvo que pagar 5 mil millones de francos en reparaciones"
    ],
    factsDE: [
      "Der Krieg begann durch einen diplomatischen Konflikt über die spanische Thronfolge",
      "Die Schlacht bei Sedan (2. September 1870) war entscheidend: Napoleon III. wurde gefangen genommen",
      "Paris wurde monatelang belagert (September 1870 - Januar 1871)",
      "Das Deutsche Kaiserreich wurde am 18. Januar 1871 in Versailles proklamiert",
      "Frankreich verlor Elsass-Lothringen und musste 5 Milliarden Francs Reparationen zahlen"
    ],
    factsSV: [
      "Kriget började med en diplomatisk konflikt om den spanska tronföljden",
      "Slaget vid Sedan (2 september 1870) var avgörande: Napoleon III togs till fånga",
      "Paris belägrades i månader (september 1870 – januari 1871)",
      "Det tyska kejsardömet utropades i Versailles den 18 januari 1871",
      "Frankrike förlorade Elsass-Lothringen och tvingades betala 5 miljarder franc i skadestånd"
    ],
    casualties: "~200.000 Franse + ~45.000 Duitse doden",
    casualtiesFR: "~200 000 morts français + ~45 000 morts allemands",
    casualtiesPCD: "~200 000 morts français + ~45 000 morts allemands",
    casualtiesVLS: "~200.000 Fransche + ~45.000 Duitsche doôden",
    casualtiesEN: "~200,000 French + ~45,000 German dead",
    casualtiesES: "~200.000 franceses + ~45.000 alemanes muertos",
    casualtiesDE: "~200.000 französische + ~45.000 deutsche Tote",
    casualtiesSV: "~200 000 franska + ~45 000 tyska döda",
    duration: "10 maanden",
    durationFR: "10 mois",
    durationPCD: "10 mois",
    durationVLS: "10 moanden",
    durationEN: "10 months",
    durationES: "10 meses",
    durationDE: "10 Monate",
    durationSV: "10 månader",
    location: "Frankrijk, Frans-Duitse grensgebied",
    locationFR: "France, région frontalière franco-allemande",
    locationPCD: "France, région frontalière franco-alleminde",
    locationVLS: "Frankryk, Frans-Duitsche grensgebied",
    locationEN: "France, Franco-German border region",
    locationES: "Francia, región fronteriza franco-alemana",
    locationDE: "Frankreich, deutsch-französisches Grenzgebiet",
    locationSV: "Frankrike, fransk-tyska gränsområdet",
    image: oorlogFransDuits,
    color: "from-slate-600 to-slate-800"
  },
  {
    id: "wo1",
    year: "1914-1918",
    period: "28 juli 1914 - 11 november 1918",
    titleNL: "Eerste Wereldoorlog",
    titleFR: "Première Guerre mondiale",
    titlePCD: "Premiére Guerre mondiale",
    titleVLS: "Eersten Weireldoorlog",
    titleEN: "World War I",
    titleES: "Primera Guerra Mundial",
    titleDE: "Erster Weltkrieg",
    titleSV: "Första världskriget",
    subtitleNL: "De Grote Oorlog die de wereld veranderde",
    subtitleFR: "La Grande Guerre qui changea le monde",
    subtitlePCD: "La Grande Guerre qui changea l' monde",
    subtitleVLS: "De Grôoten Oorlog die de weireld veranderde",
    subtitleEN: "The Great War that changed the world",
    subtitleES: "La Gran Guerra que cambió el mundo",
    subtitleDE: "Der Große Krieg, der die Welt veränderte",
    descriptionNL: "De Eerste Wereldoorlog (1914-1918), ook wel 'De Grote Oorlog' genoemd, was het eerste industriële massaconflict in de geschiedenis. Na de Duitse inval in het neutrale België op 4 augustus 1914 werd het land grotendeels bezet. In West-Vlaanderen stabiliseerde het front langs de IJzer, van Nieuwpoort tot Ieper. Vier jaar lang lag de frontlinie op slechts 30 km van Izegem, waar de familie Deforce woonde.",
    descriptionFR: "La Première Guerre mondiale (1914-1918), également appelée 'La Grande Guerre', fut le premier conflit industriel de masse de l'histoire. Après l'invasion allemande de la Belgique neutre le 4 août 1914, le pays fut en grande partie occupé. En Flandre Occidentale, le front se stabilisa le long de l'Yser, de Nieuport à Ypres. Pendant quatre ans, la ligne de front se trouvait à seulement 30 km d'Izegem, où vivait la famille Deforce.",
    descriptionPCD: "La Premiére Guerre mondiale (1914-1918), ossi appelée 'La Grande Guerre', fut l' preumier conflit industriel éd masse éd l'histouère. Aprés l'invasion alleminde éd l' Belgique neutre l' 4 août 1914, l' pays fut in grande partie occupé.",
    descriptionVLS: "Den Eersten Weireldoorlog (1914-1918), ook wel 'De Grôoten Oorlog' genoemd, was 't eerste industrieele massaconflict in de geschiedenisse. Noa de Duitsche inval in 't neutrale België op 4 augustus 1914 wierd 't land grotendeels bezet.",
    descriptionEN: "World War I (1914-1918), also known as 'The Great War', was the first industrial mass conflict in history. After the German invasion of neutral Belgium on August 4, 1914, the country was largely occupied. In West Flanders, the front stabilized along the Yser, from Nieuwpoort to Ypres. For four years, the front line lay only 30 km from Izegem, where the Deforce family lived.",
    descriptionES: "La Primera Guerra Mundial (1914-1918), también conocida como 'La Gran Guerra', fue el primer conflicto industrial masivo de la historia. Tras la invasión alemana de la neutral Bélgica el 4 de agosto de 1914, el país fue ocupado en gran parte. En Flandes Occidental, el frente se estabilizó a lo largo del Yser, desde Nieuwpoort hasta Ypres. Durante cuatro años, la línea del frente estuvo a solo 30 km de Izegem, donde vivía la familia Deforce.",
    descriptionDE: "Der Erste Weltkrieg (1914-1918), auch als 'Der Große Krieg' bekannt, war der erste industrielle Massenkonflikt der Geschichte. Nach dem deutschen Einmarsch in das neutrale Belgien am 4. August 1914 wurde das Land größtenteils besetzt. In Westflandern stabilisierte sich die Front entlang der Yser, von Nieuwpoort bis Ypern. Vier Jahre lang lag die Frontlinie nur 30 km von Izegem entfernt, wo die Familie Deforce lebte.",
    descriptionSV: "Första världskriget (1914–1918), även kallat 'Det stora kriget', var den första industriella masskonflikten i historien. Efter den tyska invasionen av det neutrala Belgien den 4 augusti 1914 ockuperades landet till stor del. I Västflandern stabiliserades fronten längs Yser, från Nieuwpoort till Ypern. I fyra år låg frontlinjen bara 30 km från Izegem, där familjen Deforce bodde.",
    impactNL: "Leonie Plancke, de tweede vrouw van Charles-Louis, overleed in 1917 tijdens de bezetting. De bevolking leed onder voedselschaarste, dwangarbeid en de constante dreiging van het nabije front. Charles-Louis, toen 60 jaar, hertrouwde in 1918, het jaar van de Bevrijding. Zijn zoon Alberic Camiel overleed in 1920 op 21-jarige leeftijd - mogelijk als gevolg van de Spaanse griep die wereldwijd 50 miljoen slachtoffers maakte.",
    impactFR: "Leonie Plancke, la deuxième épouse de Charles-Louis, décéda en 1917 pendant l'occupation. La population souffrit de pénuries alimentaires, de travail forcé et de la menace constante du front proche. Charles-Louis, alors âgé de 60 ans, se remaria en 1918, l'année de la Libération. Son fils Alberic Camiel décéda en 1920 à l'âge de 21 ans - peut-être des suites de la grippe espagnole qui fit 50 millions de victimes dans le monde.",
    impactPCD: "Leonie Plancke, l' deuxiéme femme éd Charles-Louis, décéda in 1917 pindant l'occupatione. Charles-Louis s' remaria in 1918, l'année éd l' Libératione.",
    impactVLS: "Leonie Plancke, de twiede vrouwe van Charles-Louis, overlieed in 1917 tydens de bezetting. De bevolking leed onder voedselschaarste en dwangarbeid. Charles-Louis, tonne 60 joar, hertrouwde in 1918, 't joar van de Bevryding.",
    impactEN: "Leonie Plancke, Charles-Louis's second wife, died in 1917 during the occupation. The population suffered from food shortages, forced labor, and the constant threat of the nearby front. Charles-Louis, then 60 years old, remarried in 1918, the year of Liberation. His son Alberic Camiel died in 1920 at age 21 - possibly as a result of the Spanish flu that claimed 50 million victims worldwide.",
    impactES: "Leonie Plancke, la segunda esposa de Charles-Louis, murió en 1917 durante la ocupación. La población sufrió escasez de alimentos, trabajo forzado y la amenaza constante del frente cercano. Charles-Louis, entonces de 60 años, se volvió a casar en 1918, el año de la Liberación. Su hijo Alberic Camiel murió en 1920 a los 21 años, posiblemente como resultado de la gripe española que causó 50 millones de víctimas en todo el mundo.",
    impactDE: "Leonie Plancke, die zweite Frau von Charles-Louis, starb 1917 während der Besatzung. Die Bevölkerung litt unter Nahrungsknappheit, Zwangsarbeit und der ständigen Bedrohung durch die nahe Front. Charles-Louis, damals 60 Jahre alt, heiratete 1918 erneut, im Jahr der Befreiung. Sein Sohn Alberic Camiel starb 1920 im Alter von 21 Jahren - möglicherweise als Folge der Spanischen Grippe, die weltweit 50 Millionen Opfer forderte.",
    impactSV: "Leonie Plancke, Charles-Louis andra hustru, avled 1917 under ockupationen. Befolkningen led av livsmedelsbrist, tvångsarbete och det ständiga hotet från den närliggande fronten. Charles-Louis, då 60 år gammal, gifte om sig 1918, befrielsens år. Hans son Alberic Camiel dog 1920 vid 21 års ålder – möjligen till följd av spanska sjukan som krävde 50 miljoner offer världen över.",
    factsNL: [
      "België werd op 4 augustus 1914 binnengevallen ondanks zijn neutraliteit",
      "De IJzerslag (oktober 1914) stopte het Duitse offensief in West-Vlaanderen",
      "Meer dan 600.000 soldaten sneuvelden in de Ieperboog alleen",
      "In 1917 werd voor het eerst gifgas op grote schaal gebruikt bij Ieper",
      "De Bevrijding kwam op 11 november 1918 - 'Wapenstilstand'"
    ],
    factsFR: [
      "La Belgique fut envahie le 4 août 1914 malgré sa neutralité",
      "La Bataille de l'Yser (octobre 1914) arrêta l'offensive allemande en Flandre Occidentale",
      "Plus de 600 000 soldats périrent dans le seul Saillant d'Ypres",
      "En 1917, le gaz toxique fut utilisé à grande échelle pour la première fois près d'Ypres",
      "La Libération vint le 11 novembre 1918 - 'Armistice'"
    ],
    factsPCD: [
      "L' Belgique fut invahie l' 4 août 1914 malgré s' neutralité",
      "L' Bataille éd l'Yser arrêta l'offensive alleminde in Flandre Occidentale",
      "L' Libératione vint l' 11 novembre 1918 - 'Armistice'"
    ],
    factsVLS: [
      "België wierd op 4 augustus 1914 binnengevallen ondanks zyn neutraliteit",
      "De Yzerslag (oktober 1914) stopte 't Duitsche offensief in West-Vlaanderen",
      "Mee dan 600.000 soldoaten sneuvelden in de Ieperboge alleen",
      "De Bevryding kwam op 11 november 1918 - 'Wapenstilstand'"
    ],
    factsEN: [
      "Belgium was invaded on August 4, 1914 despite its neutrality",
      "The Battle of the Yser (October 1914) stopped the German offensive in West Flanders",
      "More than 600,000 soldiers perished in the Ypres Salient alone",
      "In 1917, poison gas was used on a large scale for the first time near Ypres",
      "Liberation came on November 11, 1918 - 'Armistice'"
    ],
    factsES: [
      "Bélgica fue invadida el 4 de agosto de 1914 a pesar de su neutralidad",
      "La Batalla del Yser (octubre de 1914) detuvo la ofensiva alemana en Flandes Occidental",
      "Más de 600.000 soldados perecieron solo en el Saliente de Ypres",
      "En 1917, el gas venenoso se usó a gran escala por primera vez cerca de Ypres",
      "La Liberación llegó el 11 de noviembre de 1918 - 'Armisticio'"
    ],
    factsDE: [
      "Belgien wurde am 4. August 1914 trotz seiner Neutralität überfallen",
      "Die Schlacht an der Yser (Oktober 1914) stoppte die deutsche Offensive in Westflandern",
      "Mehr als 600.000 Soldaten fielen allein im Ypern-Bogen",
      "1917 wurde bei Ypern erstmals Giftgas im großen Maßstab eingesetzt",
      "Die Befreiung kam am 11. November 1918 - 'Waffenstillstand'"
    ],
    factsSV: [
      "Belgien invaderades den 4 augusti 1914 trots sin neutralitet",
      "Slaget vid Yser (oktober 1914) stoppade den tyska offensiven i Västflandern",
      "Mer än 600 000 soldater stupade enbart i Ypern-bågen",
      "1917 användes giftgas i stor skala för första gången vid Ypern",
      "Befrielsen kom den 11 november 1918 – 'Vapenstillestånd'"
    ],
    casualties: "~17 miljoen doden wereldwijd",
    casualtiesFR: "~17 millions de morts dans le monde",
    casualtiesPCD: "~17 millions d' morts dins l' monde",
    casualtiesVLS: "~17 miljoen doôden wêreldwyd",
    casualtiesEN: "~17 million dead worldwide",
    casualtiesES: "~17 millones de muertos en todo el mundo",
    casualtiesDE: "~17 Millionen Tote weltweit",
    casualtiesSV: "~17 miljoner döda världen över",
    duration: "4 jaar, 3 maanden",
    durationFR: "4 ans, 3 mois",
    durationPCD: "4 ans, 3 mois",
    durationVLS: "4 joar, 3 moanden",
    durationEN: "4 years, 3 months",
    durationES: "4 años, 3 meses",
    durationDE: "4 Jahre, 3 Monate",
    durationSV: "4 år, 3 månader",
    location: "Wereldwijd, frontlinie in West-Vlaanderen",
    locationFR: "Mondial, ligne de front en Flandre Occidentale",
    locationPCD: "Mondial, ligne éd front in Flandre Occidentale",
    locationVLS: "Wêreldwyd, frontlinie in West-Vlaanderen",
    locationEN: "Worldwide, front line in West Flanders",
    locationES: "Mundial, línea del frente en Flandes Occidental",
    locationDE: "Weltweit, Frontlinie in Westflandern",
    locationSV: "Världen över, frontlinjen i Västflandern",
    image: oorlogWO1,
    color: "from-zinc-700 to-zinc-900"
  }
];

const OorlogsGeschiedenis = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language, t } = useLanguage();
  const [expandedWar, setExpandedWar] = useState<string | null>(null);

  const getTitle = (war: War) => {
    switch (language) {
      case 'fr': return war.titleFR;
      case 'pcd': return war.titlePCD;
      case 'vls': return war.titleVLS;
      case 'en': return war.titleEN;
      case 'es': return war.titleES;
      case 'de': return war.titleDE;
      case 'sv': return war.titleSV || war.titleEN;
      default: return war.titleNL;
    }
  };

  const getSubtitle = (war: War) => {
    switch (language) {
      case 'fr': return war.subtitleFR;
      case 'pcd': return war.subtitlePCD;
      case 'vls': return war.subtitleVLS;
      case 'en': return war.subtitleEN;
      case 'es': return war.subtitleES;
      case 'de': return war.subtitleDE;
      case 'sv': return war.subtitleSV || war.subtitleEN;
      default: return war.subtitleNL;
    }
  };

  const getDescription = (war: War) => {
    switch (language) {
      case 'fr': return war.descriptionFR;
      case 'pcd': return war.descriptionPCD;
      case 'vls': return war.descriptionVLS;
      case 'en': return war.descriptionEN;
      case 'es': return war.descriptionES;
      case 'de': return war.descriptionDE;
      case 'sv': return war.descriptionSV || war.descriptionEN;
      default: return war.descriptionNL;
    }
  };

  const getImpact = (war: War) => {
    switch (language) {
      case 'fr': return war.impactFR;
      case 'pcd': return war.impactPCD;
      case 'vls': return war.impactVLS;
      case 'en': return war.impactEN;
      case 'es': return war.impactES;
      case 'de': return war.impactDE;
      case 'sv': return war.impactSV || war.impactEN;
      default: return war.impactNL;
    }
  };

  const getFacts = (war: War) => {
    switch (language) {
      case 'fr': return war.factsFR;
      case 'pcd': return war.factsPCD;
      case 'vls': return war.factsVLS;
      case 'en': return war.factsEN;
      case 'es': return war.factsES;
      case 'de': return war.factsDE;
      case 'sv': return war.factsSV || war.factsEN;
      default: return war.factsNL;
    }
  };

  const getCasualties = (war: War) => {
    switch (language) {
      case 'fr': return war.casualtiesFR || war.casualties;
      case 'pcd': return war.casualtiesPCD || war.casualties;
      case 'vls': return war.casualtiesVLS || war.casualties;
      case 'en': return war.casualtiesEN || war.casualties;
      case 'es': return war.casualtiesES || war.casualties;
      case 'de': return war.casualtiesDE || war.casualties;
      case 'sv': return war.casualtiesSV || war.casualtiesEN || war.casualties;
      default: return war.casualties;
    }
  };

  const getDuration = (war: War) => {
    switch (language) {
      case 'fr': return war.durationFR || war.duration;
      case 'pcd': return war.durationPCD || war.duration;
      case 'vls': return war.durationVLS || war.duration;
      case 'en': return war.durationEN || war.duration;
      case 'es': return war.durationES || war.duration;
      case 'de': return war.durationDE || war.duration;
      case 'sv': return war.durationSV || war.durationEN || war.duration;
      default: return war.duration;
    }
  };

  const getLocation = (war: War) => {
    switch (language) {
      case 'fr': return war.locationFR || war.location;
      case 'pcd': return war.locationPCD || war.location;
      case 'vls': return war.locationVLS || war.location;
      case 'en': return war.locationEN || war.location;
      case 'es': return war.locationES || war.location;
      case 'de': return war.locationDE || war.location;
      case 'sv': return war.locationSV || war.locationEN || war.location;
      default: return war.location;
    }
  };

  const getBiography = (war: War) => {
    if (!war.biographyNL) return null;
    switch (language) {
      case 'fr': return war.biographyFR;
      case 'pcd': return war.biographyPCD;
      case 'vls': return war.biographyVLS;
      case 'en': return war.biographyEN;
      case 'es': return war.biographyES;
      case 'de': return war.biographyDE;
      case 'sv': return war.biographySV || war.biographyEN;
      default: return war.biographyNL;
    }
  };

  const getBiographyTitle = (war: War) => {
    if (!war.biographyTitleNL) return null;
    switch (language) {
      case 'fr': return war.biographyTitleFR;
      case 'pcd': return war.biographyTitlePCD;
      case 'vls': return war.biographyTitleVLS;
      case 'en': return war.biographyTitleEN;
      case 'es': return war.biographyTitleES;
      case 'de': return war.biographyTitleDE;
      case 'sv': return war.biographyTitleSV || war.biographyTitleEN;
      default: return war.biographyTitleNL;
    }
  };

  const sectionTitle = {
    nl: "Oorlogen in de Familiegeschiedenis",
    fr: "Guerres dans l'Histoire Familiale",
    pcd: "Guerres dins l'Histouère Familiale",
    vls: "Oorlogn in de Familiegeschiedenisse",
    en: "Wars in Family History",
    es: "Guerras en la Historia Familiar",
    de: "Kriege in der Familiengeschichte",
    sv: "Krig i Familjehistorien"
  };

  const sectionSubtitle = {
    nl: "De conflicten die onze voorouders hebben meegemaakt",
    fr: "Les conflits que nos ancêtres ont vécus",
    pcd: "Chés conflits qu' nos anchêtes i ont vécus",
    vls: "De conflicten die uuze vôorouders èn meegemakt",
    en: "The conflicts our ancestors experienced",
    es: "Los conflictos que vivieron nuestros antepasados",
    de: "Die Konflikte, die unsere Vorfahren erlebten",
    sv: "Konflikterna som våra förfäder upplevde"
  };

  const impactLabel = {
    nl: "Impact op de familie Deforce",
    fr: "Impact sur la famille Deforce",
    pcd: "Impact sus l' famile Deforce",
    vls: "Impact ip de familie Deforce",
    en: "Impact on the Deforce family",
    es: "Impacto en la familia Deforce",
    de: "Auswirkung auf die Familie Deforce",
    sv: "Påverkan på familjen Deforce"
  };

  const factsLabel = {
    nl: "Historische feiten",
    fr: "Faits historiques",
    pcd: "Faits histouriques",
    vls: "Historische feitn",
    en: "Historical facts",
    es: "Hechos históricos",
    de: "Historische Fakten",
    sv: "Historiska fakta"
  };

  const biographyLabel = {
    nl: "Historische figuur",
    fr: "Figure historique",
    pcd: "Figure histourique",
    vls: "Historische figuur",
    en: "Historical figure",
    es: "Figura histórica",
    de: "Historische Persönlichkeit",
    sv: "Historisk person"
  };

  const readMoreLabel = {
    nl: "Lees meer",
    fr: "Lire plus",
    pcd: "Lire pus",
    vls: "Liest mee",
    en: "Read more",
    es: "Leer más",
    de: "Mehr lesen",
    sv: "Läs mer"
  };

  const readLessLabel = {
    nl: "Lees minder",
    fr: "Lire moins",
    pcd: "Lire moins",
    vls: "Liest minder",
    en: "Read less",
    es: "Leer menos",
    de: "Weniger lesen",
    sv: "Läs mindre"
  };

  const lang = language as 'nl' | 'fr' | 'pcd' | 'vls' | 'en' | 'es' | 'de' | 'sv';
  return (
    <section id="oorlogen" className="section-padding bg-gradient-to-b from-background to-secondary/30" ref={ref}>
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-medium uppercase tracking-widest text-sm flex items-center justify-center gap-2">
            <Swords className="w-4 h-4" />
            {language === 'fr' ? '1382 - 1918' : language === 'pcd' ? '1382 - 1918' : '1382 - 1918'}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4 mt-4">
            {sectionTitle[lang]}
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            {sectionSubtitle[lang]}
          </p>
          <div className="vintage-divider mt-6" />
        </motion.div>

        {/* Interactive Timeline */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-primary to-accent rounded-full transform md:-translate-x-1/2" />

          {/* War Cards */}
          <div className="space-y-12">
            {wars.map((war, index) => {
              const isExpanded = expandedWar === war.id;
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={war.id}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex flex-col md:flex-row items-start gap-8 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Node */}
                  <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className={`w-8 h-8 rounded-full bg-gradient-to-br ${war.color} flex items-center justify-center shadow-lg border-4 border-background`}
                    >
                      <Swords className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>

                  {/* Year Label */}
                  <div className={`hidden md:block w-1/2 ${isEven ? 'text-right pr-12' : 'text-left pl-12'}`}>
                    <span className={`font-serif text-2xl font-bold bg-gradient-to-r ${war.color} bg-clip-text text-transparent`}>
                      {war.year}
                    </span>
                  </div>

                  {/* Card */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    <motion.div
                      layout
                      className="bg-background rounded-xl shadow-vintage border border-border overflow-hidden"
                    >
                      {/* Card Header */}
                      <div className={`bg-gradient-to-r ${war.color} p-4 text-white`}>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="md:hidden text-sm opacity-80">{war.year}</span>
                            <h3 className="font-serif text-xl font-bold">{getTitle(war)}</h3>
                            <p className="text-sm opacity-90">{getSubtitle(war)}</p>
                          </div>
                          <Swords className="w-8 h-8 opacity-50" />
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5">
                        {/* Image if available */}
                        {war.image && (
                          <div className="relative mb-4 rounded-lg overflow-hidden">
                            <AiLabel className="top-2 left-2" />
                            <img
                              src={war.image}
                              alt={getTitle(war)}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        )}

                        {/* Quick Stats */}
                        <div className="flex flex-wrap gap-3 mb-4 text-sm">
                          {getDuration(war) && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              <span>{getDuration(war)}</span>
                            </div>
                          )}
                          {getLocation(war) && (
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span>{getLocation(war)}</span>
                            </div>
                          )}
                          {getCasualties(war) && (
                            <div className="flex items-center gap-1 text-destructive">
                              <Skull className="w-4 h-4" />
                              <span>{getCasualties(war)}</span>
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          {getDescription(war)}
                        </p>

                        {/* Expand Button */}
                        <button
                          onClick={() => setExpandedWar(isExpanded ? null : war.id)}
                          className="flex items-center gap-2 text-accent hover:text-accent/80 font-medium transition-colors"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              {readLessLabel[lang]}
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              {readMoreLabel[lang]}
                            </>
                          )}
                        </button>

                        {/* Expanded Content */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="pt-4 space-y-4">
                                {/* Impact on Family */}
                                <div className="bg-accent/10 rounded-lg p-4 border-l-4 border-accent">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Users className="w-5 h-5 text-accent" />
                                    <h4 className="font-semibold text-foreground">{impactLabel[lang]}</h4>
                                  </div>
                                  <p className="text-muted-foreground text-sm leading-relaxed">
                                    {getImpact(war)}
                                  </p>
                                </div>

                                {/* Historical Facts */}
                                <div>
                                  <div className="flex items-center gap-2 mb-2">
                                    <Shield className="w-5 h-5 text-primary" />
                                    <h4 className="font-semibold text-foreground">{factsLabel[lang]}</h4>
                                  </div>
                                  <ul className="space-y-2">
                                    {getFacts(war).map((fact, i) => (
                                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <span className="text-accent mt-1">•</span>
                                        <span>{fact}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Biography Section */}
                                {getBiography(war) && (
                                  <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary mt-4">
                                    <div className="flex items-center gap-2 mb-3">
                                      <Users className="w-5 h-5 text-primary" />
                                      <div>
                                        <span className="text-xs uppercase tracking-wider text-muted-foreground">{biographyLabel[lang]}</span>
                                        <h4 className="font-serif font-bold text-foreground">{getBiographyTitle(war)}</h4>
                                      </div>
                                    </div>
                                    <div className="text-muted-foreground text-sm leading-relaxed space-y-3">
                                      {getBiography(war)?.split('\n\n').map((paragraph, i) => (
                                        <p key={i}>{paragraph}</p>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="flex justify-center mt-8">
            <ShareButton sectionId="oorlog" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OorlogsGeschiedenis;
