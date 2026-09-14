import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Heart, Briefcase } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGame } from "@/contexts/GameContext";
import AiLabel from "@/components/ui/AiLabel";

import familyPortrait from "@/assets/family-portrait.jpg";
import charlesLouis from "@/assets/charles-louis-portrait.jpg";
import houtsnijders from "@/assets/houtsnijders-1908.jpg";
import reunion2024 from "@/assets/reunion-2024-new.jpg";
import oudeKerk from "@/assets/oude-kerk.jpg";
import meubelatelier from "@/assets/meubelatelier-1880.jpg";
import boquillonForest from "@/assets/boquillon-forest.jpg";
import migratieReis from "@/assets/migratie-reis-1699.jpg";
import meubelwerkplaats from "@/assets/meubelmakerij-belle-epoque.jpg";
import dagloner from "@/assets/dagloner-18e-eeuw.jpg";
import timmermansatelier from "@/assets/timmermansatelier-18e.jpg";
import schrijnwerkersatelier from "@/assets/schrijnwerkersatelier-19e.jpg";

interface Generation {
  id: number;
  period: string;
  titleNL: string;
  titleFR: string;
  titlePCD: string;
  titleVLS?: string;
  titleEN?: string;
  titleES?: string;
  titleDE?: string;
  name: string;
  spouse?: string;
  location: string;
  professionNL: string;
  professionFR: string;
  professionPCD: string;
  professionVLS?: string;
  professionEN?: string;
  professionES?: string;
  professionDE?: string;
  descriptionNL: string;
  descriptionFR: string;
  descriptionPCD: string;
  descriptionVLS?: string;
  descriptionEN?: string;
  descriptionES?: string;
  descriptionDE?: string;
  extraContextNL?: string;
  extraContextFR?: string;
  extraContextPCD?: string;
  extraContextVLS?: string;
  extraContextEN?: string;
  extraContextES?: string;
  extraContextDE?: string;
  image: string;
  highlightNL?: string;
  highlightFR?: string;
  highlightPCD?: string;
  highlightVLS?: string;
  highlightEN?: string;
  highlightES?: string;
  highlightDE?: string;
  isAiGenerated?: boolean;
}

const generations: Generation[] = [
  {
    id: 1,
    period: "1685",
    titleNL: "Stamouders",
    titleFR: "Ancêtres fondateurs",
    titlePCD: "Anchtres fondateurs",
    titleVLS: "Stamouders",
    titleEN: "Founding Ancestors",
    titleES: "Antepasados Fundadores",
    titleDE: "Stammväter",
    name: "Hubert Deleforge",
    spouse: "Antoinette Follet",
    location: "Hallennes-lez-Haubourdin",
    professionNL: "Boquillon (houtarbeider)",
    professionFR: "Boquillon (travailleur du bois)",
    professionPCD: "Boquillon (travailleur du bos)",
    professionVLS: "Boquillon (houtarbeider)",
    professionEN: "Boquillon (woodworker)",
    professionES: "Boquillon (trabajador de la madera)",
    professionDE: "Boquillon (Holzarbeiter)",
    descriptionNL: "Huwelijksakte op 18 april 1685 te Lille. Antoinette was dochter van meester-chirurgijn Jean Follet.",
    descriptionFR: "Acte de mariage le 18 avril 1685 à Lille. Antoinette était fille du maître-chirurgien Jean Follet.",
    descriptionPCD: "Acte d'mariage l'18 avril 1685 à Lille. Antoinette étot fille du maître-chirurgien Jean Follet.",
    descriptionVLS: "Huweliksakte op 18 april 1685 te Rysel. Antoinette was dochter van meester-chirurgyn Jean Follet.",
    descriptionEN: "Marriage certificate on April 18, 1685 in Lille. Antoinette was daughter of master surgeon Jean Follet.",
    descriptionES: "Acta de matrimonio el 18 de abril de 1685 en Lille. Antoinette era hija del maestro cirujano Jean Follet.",
    descriptionDE: "Heiratsurkunde vom 18. April 1685 in Lille. Antoinette war Tochter des Meisterchirurgen Jean Follet.",
    extraContextNL: "Een 'boquillon' was een typisch Picardisch beroep: een houtarbeider die werkte in de bossen rond Lille. Boquillons kapten bomen, zaagden stammen en maakten brandhout en houtskool. Het werk was seizoensgebonden en fysiek zwaar. Ze werkten vaak in groepen en trokken van bos naar bos. Het hout werd gebruikt voor verwarming, bakkerijen, brouwerijen en smederijen. De regio rond Hallennes-lez-Haubourdin was destijds rijk aan eiken- en beukenbossen. Hubert trouwde 'omhoog': Antoinette Follet kwam uit een respectabele familie - haar vader was meester-chirurgijn, een geleerd beroep. Dit huwelijk verhoogde mogelijk de sociale status van de familie Deleforge.",
    extraContextFR: "Un 'boquillon' était un métier typiquement picard : un travailleur du bois qui œuvrait dans les forêts autour de Lille. Les boquillons abattaient des arbres, sciaient des troncs et fabriquaient du bois de chauffage et du charbon de bois. Le travail était saisonnier et physiquement éprouvant. Ils travaillaient souvent en groupes et se déplaçaient de forêt en forêt. Le bois était utilisé pour le chauffage, les boulangeries, les brasseries et les forges. La région autour de Hallennes-lez-Haubourdin était alors riche en forêts de chênes et de hêtres. Hubert a épousé 'vers le haut' : Antoinette Follet venait d'une famille respectable - son père était maître-chirurgien.",
    extraContextPCD: "In 'boquillon' étot in métier typiquemint picard : in travailleur du bos qui œuvrot dins les forêts autour ed Lille. Les boquillons abattotent des arbres, sciotent des troncs pi faisotent du bos d'chauffage pi du carbon d'bos. L'travail étot saisonnier pi dur. Hubert a épousé 'vers l'haut' : Antoinette Follet v'not d'ène famille respectable.",
    extraContextVLS: "E 'boquillon' was e typisch Picardisch beroep: e houtarbeider die werkte in de bosschen rond Rysel. Boquillons kapten bôomen, zoagden stammen en moakten brandhout en houtskôol. 't Werk was seizoensgebonden en fysiek zwoar. Ze werkten dikwyls in groepen en trokken van bos noar bos. Hubert trouwde 'omhôog': Antoinette Follet kwam uut e respectabele familie - heur vader was meester-chirurgyn, e geleerd beroep.",
    extraContextEN: "A 'boquillon' was a typical Picard profession: a woodworker who worked in the forests around Lille. Boquillons felled trees, sawed trunks and made firewood and charcoal. The work was seasonal and physically demanding. They often worked in groups and moved from forest to forest. The wood was used for heating, bakeries, breweries and forges. The region around Hallennes-lez-Haubourdin was then rich in oak and beech forests. Hubert married 'upward': Antoinette Follet came from a respectable family - her father was a master surgeon, a learned profession. This marriage possibly raised the social status of the Deleforge family.",
    extraContextES: "Un 'boquillon' era una profesión típica picarda: un trabajador de la madera que trabajaba en los bosques alrededor de Lille. Los boquillons talaban árboles, aserraban troncos y hacían leña y carbón. El trabajo era estacional y físicamente exigente. A menudo trabajaban en grupos y se movían de bosque en bosque. La madera se usaba para calefacción, panaderías, cervecerías y fraguas. La región alrededor de Hallennes-lez-Haubourdin era entonces rica en bosques de robles y hayas. Hubert se casó 'hacia arriba': Antoinette Follet venía de una familia respetable - su padre era maestro cirujano, una profesión culta.",
    extraContextDE: "Ein 'Boquillon' war ein typisch pikardischer Beruf: ein Holzarbeiter, der in den Wäldern um Lille arbeitete. Boquillons fällten Bäume, sägten Stämme und stellten Brennholz und Holzkohle her. Die Arbeit war saisonabhängig und körperlich anstrengend. Sie arbeiteten oft in Gruppen und zogen von Wald zu Wald. Das Holz wurde zum Heizen, für Bäckereien, Brauereien und Schmieden verwendet. Die Region um Hallennes-lez-Haubourdin war damals reich an Eichen- und Buchenwäldern. Hubert heiratete 'nach oben': Antoinette Follet stammte aus einer angesehenen Familie - ihr Vater war Meisterchirurg, ein gelehrter Beruf. Diese Ehe erhöhte möglicherweise den sozialen Status der Familie Deleforge.",
    image: boquillonForest,
    highlightNL: "Eerste generatie",
    highlightFR: "Première génération",
    highlightPCD: "Premiére génératione",
    highlightVLS: "Eerste generoasje",
    highlightEN: "First generation",
    highlightES: "Primera generación",
    highlightDE: "Erste Generation",
    isAiGenerated: true
  },
  {
    id: 2,
    period: "1699",
    titleNL: "De Migratie",
    titleFR: "La Migration",
    titlePCD: "La Migratione",
    titleVLS: "De Migroasje",
    titleEN: "The Migration",
    titleES: "La Migración",
    titleDE: "Die Migration",
    name: "Familie Deleforge",
    location: "Emelgem / Izegem",
    professionNL: "Houtarbeiders",
    professionFR: "Travailleurs du bois",
    professionPCD: "Travailleurs du bos",
    professionVLS: "Houtarbeiders",
    professionEN: "Woodworkers",
    professionES: "Trabajadores de la madera",
    professionDE: "Holzarbeiter",
    descriptionNL: "Hubert verkoopt zijn eigendom in Hallennes en trekt 50 km noordwaarts naar West-Vlaanderen.",
    descriptionFR: "Hubert vend sa propriété à Hallennes et se dirige 50 km vers le nord en Flandre Occidentale.",
    descriptionPCD: "Hubert vind s'propriété à Hallennes et s'dirige 50 km vers l'nord in Flandre Occidentale.",
    descriptionVLS: "Hubert verkoopt zyn eigendom in Hallennes en trekt 50 km nôordwoarts noar West-Vloanderen.",
    descriptionEN: "Hubert sells his property in Hallennes and travels 50 km north to West Flanders.",
    descriptionES: "Hubert vende su propiedad en Hallennes y viaja 50 km al norte hacia Flandes Occidental.",
    descriptionDE: "Hubert verkauft sein Eigentum in Hallennes und zieht 50 km nach Norden nach Westflandern.",
    extraContextNL: "Waarom vertrok Hubert in 1699? De regio rond Lille had zwaar geleden onder de oorlogen van Lodewijk XIV. De Negenjarige Oorlog (1688-1697) verwoestte Frans-Vlaanderen: legers trokken door, oogsten werden vernield, belastingen stegen. De Vrede van Rijswijk (1697) bracht tijdelijke rust, maar de economie lag in puin. De reis van 50 km was destijds een hele onderneming. Hubert reisde waarschijnlijk te voet of met een ossenkar, langs modderige wegen door het vlakke Vlaamse land. De grens met de Oostenrijkse Nederlanden (België) passeren betekende een nieuwe start. In Emelgem en Izegem vond hij werk: de streek had houtbewerkers nodig voor landbouwgereedschap, karren en huizenbouw. De Vlaamse bossen boden nieuwe mogelijkheden voor een boquillon.",
    extraContextFR: "Pourquoi Hubert est-il parti en 1699 ? La région autour de Lille avait beaucoup souffert des guerres de Louis XIV. La Guerre de Neuf Ans (1688-1697) a dévasté la Flandre française : les armées passaient, les récoltes étaient détruites, les impôts augmentaient. La Paix de Ryswick (1697) apporta un repos temporaire, mais l'économie était en ruine. Le voyage de 50 km était une entreprise considérable. Hubert voyagea probablement à pied ou en charrette, le long de chemins boueux à travers le plat pays flamand. Franchir la frontière vers les Pays-Bas autrichiens (Belgique) signifiait un nouveau départ. À Emelgem et Izegem, il trouva du travail : la région avait besoin de travailleurs du bois.",
    extraContextPCD: "Porquoi Hubert est-il parti in 1699 ? La région autour ed Lille avot gramint souffert des guerres ed Louis XIV. La Guerre ed Neuf Ans (1688-1697) a dévasté la Flandre française : les armées passotent, les récoltes étotent détruites. La Paix ed Ryswick (1697) aminat in repos temporaire, mais l'économie étot in ruine. L'voyage ed 50 km étot ène grande intreprise.",
    extraContextVLS: "Woarom vertrok Hubert in 1699? De regio rond Rysel had zwoar geleden onder de oorlogen van Lodewyk XIV. De Negenjoarige Oorlog (1688-1697) verwoestte Frans-Vloanderen: legers trokken deur, oogsten werden vernield, beloastingen stegen. De Vrede van Ryswyk (1697) brocht tydelike rust, mo de economie lag in puin. De reis van 50 km was destyd e hele onderneming. Hubert reisde woarschynlik te voet of mee e ossenkoar, langs modderige wegen deur 't platte Vloamsche land. In Emelgem en Izegem vond hy werk: de streek had houtbewerkers nôodig.",
    extraContextEN: "Why did Hubert leave in 1699? The region around Lille had suffered greatly from the wars of Louis XIV. The Nine Years' War (1688-1697) devastated French Flanders: armies passed through, harvests were destroyed, taxes rose. The Peace of Ryswick (1697) brought temporary rest, but the economy was in ruins. The 50 km journey was a major undertaking at the time. Hubert probably traveled on foot or by ox cart, along muddy roads through the flat Flemish land. Crossing the border to the Austrian Netherlands (Belgium) meant a new start. In Emelgem and Izegem he found work: the region needed woodworkers for farm tools, carts and house construction. The Flemish forests offered new opportunities for a boquillon.",
    extraContextES: "¿Por qué partió Hubert en 1699? La región alrededor de Lille había sufrido mucho por las guerras de Luis XIV. La Guerra de los Nueve Años (1688-1697) devastó Flandes francés: los ejércitos pasaban, las cosechas se destruían, los impuestos subían. La Paz de Ryswick (1697) trajo descanso temporal, pero la economía estaba en ruinas. El viaje de 50 km era una empresa considerable en ese momento. Hubert probablemente viajó a pie o en carro de bueyes, por caminos embarrados a través de la llanura flamenca. Cruzar la frontera hacia los Países Bajos Austríacos (Bélgica) significaba un nuevo comienzo. En Emelgem e Izegem encontró trabajo: la región necesitaba trabajadores de la madera.",
    extraContextDE: "Warum verließ Hubert 1699 die Heimat? Die Region um Lille hatte schwer unter den Kriegen Ludwigs XIV. gelitten. Der Neunjährige Krieg (1688-1697) verwüstete Französisch-Flandern: Armeen zogen durch, Ernten wurden zerstört, Steuern stiegen. Der Frieden von Rijswijk (1697) brachte vorübergehende Ruhe, aber die Wirtschaft lag in Trümmern. Die 50-km-Reise war damals ein großes Unterfangen. Hubert reiste wahrscheinlich zu Fuß oder mit einem Ochsenkarren entlang schlammiger Wege durch das flache flämische Land. Die Grenze zu den Österreichischen Niederlanden (Belgien) zu überqueren bedeutete einen Neuanfang. In Emelgem und Izegem fand er Arbeit: Die Region brauchte Holzarbeiter für Landwirtschaftsgeräte, Karren und Hausbau.",
    image: migratieReis,
    highlightNL: "Keerpunt",
    highlightFR: "Tournant",
    highlightPCD: "Tournant",
    highlightVLS: "Keerpunt",
    highlightEN: "Turning point",
    highlightES: "Punto de inflexión",
    highlightDE: "Wendepunkt",
    isAiGenerated: true
  },
  {
    id: 3,
    period: "1718-1772",
    titleNL: "2e Generatie",
    titleFR: "2e Génération",
    titlePCD: "2e Génératione",
    titleVLS: "2e Generoasje",
    titleEN: "2nd Generation",
    titleES: "2ª Generación",
    titleDE: "2. Generation",
    name: "Jacobus Franciscus Deleforge",
    spouse: "Veronica Barbier",
    location: "Izegem → Ardooie",
    professionNL: "Landbouwer & dagloner",
    professionFR: "Agriculteur & journalier",
    professionPCD: "Agriculteur & journalier",
    professionVLS: "Landbouwer & daglooner",
    professionEN: "Farmer & day laborer",
    professionES: "Agricultor y jornalero",
    professionDE: "Landwirt & Tagelöhner",
    descriptionNL: "Onze rechtstreekse voorvader. Trouwde op 30 april 1718 te Izegem. 9 kinderen.",
    descriptionFR: "Notre ancêtre direct. Marié le 30 avril 1718 à Izegem. 9 enfants.",
    descriptionPCD: "Note anchtre direct. Marié l'30 avril 1718 à Izegem. 9 éfants.",
    descriptionVLS: "Uuze rechtstreeksche vôorvader. Trouwde op 30 april 1718 te Izegem. 9 kinders.",
    descriptionEN: "Our direct ancestor. Married on April 30, 1718 in Izegem. 9 children.",
    descriptionES: "Nuestro antepasado directo. Se casó el 30 de abril de 1718 en Izegem. 9 hijos.",
    descriptionDE: "Unser direkter Vorfahre. Heiratete am 30. April 1718 in Izegem. 9 Kinder.",
    extraContextNL: "Het leven van een landbouwer-dagloner in de 18e eeuw was zwaar en onzeker. Een dagloner bezat geen eigen land maar werkte op de velden van grootgrondbezitters in ruil voor een karig dagloon. Het werk was seizoensgebonden: tijdens de oogst was er volop werk, maar in de winter vaak werkloosheid en honger. Een gemiddelde werkdag duurde van zonsopgang tot zonsondergang (12-16 uur). Het dagloon bedroeg slechts enkele stuivers, nauwelijks genoeg om een gezin te voeden. Velen verbouwden op een klein lapje grond groenten voor eigen gebruik. De kindersterfte was hoog: van de 9 kinderen van Jacobus Franciscus bereikten waarschijnlijk slechts enkele de volwassenheid.",
    extraContextFR: "La vie d'un agriculteur-journalier au XVIIIe siècle était dure et incertaine. Un journalier ne possédait pas de terre propre mais travaillait dans les champs des grands propriétaires en échange d'un maigre salaire journalier. Le travail était saisonnier : pendant la moisson il y avait beaucoup de travail, mais en hiver souvent le chômage et la faim. Une journée de travail moyenne durait du lever au coucher du soleil (12-16 heures). Le salaire journalier n'était que de quelques sous, à peine suffisant pour nourrir une famille. Beaucoup cultivaient des légumes pour leur propre usage sur un petit lopin de terre. La mortalité infantile était élevée : sur les 9 enfants de Jacobus Franciscus, seuls quelques-uns atteignirent probablement l'âge adulte.",
    extraContextPCD: "La vie d'un agriculteur-journalier au XVIIIe siècle étot dure pi incertaine. In journalier n' possédot point d' terre propre mais travaillot dins les champs des grands propriétaires. L' travail étot saisonnier : pindant l' moisson i y avot gramint d' travail, mais in hiver souvint l' chômage pi l' faim.",
    extraContextVLS: "'t Leven van e landbouwer-daglooner in de 18e eeuw was zwoar en onzeker. E daglooner bezat geen eigen land mo werkte op de velden van grôotgrondbezitters in ruil vôor e koarig daglôon. 't Werk was seizoensgebonden: tydens den oogst was d'r volop werk, mo in de winter dikwyls werkloosheid en honger. E gemiddelde werkdag duurde van zonsopgang tot zonsondergang (12-16 uren). 't Daglôon bedroeg mo enkele stuivers, nauwelyks genoeg om e gezin te voeden. De kindersterfte was hôog: van de 9 kinders van Jacobus Franciscus bereikten woarschynlik mo enkele de volwassenheid.",
    extraContextEN: "The life of a farmer-day laborer in the 18th century was hard and uncertain. A day laborer did not own land but worked in the fields of large landowners in exchange for a meager daily wage. The work was seasonal: during harvest there was plenty of work, but in winter often unemployment and hunger. An average workday lasted from sunrise to sunset (12-16 hours). The daily wage was only a few pennies, barely enough to feed a family. Many grew vegetables for their own use on a small plot of land. Child mortality was high: of Jacobus Franciscus's 9 children, probably only a few reached adulthood.",
    extraContextES: "La vida de un agricultor-jornalero en el siglo XVIII era dura e incierta. Un jornalero no poseía tierra propia sino que trabajaba en los campos de los grandes terratenientes a cambio de un magro salario diario. El trabajo era estacional: durante la cosecha había mucho trabajo, pero en invierno a menudo desempleo y hambre. Una jornada laboral promedio duraba desde el amanecer hasta el atardecer (12-16 horas). El salario diario era solo de unos pocos centavos, apenas suficiente para alimentar a una familia. La mortalidad infantil era alta: de los 9 hijos de Jacobus Franciscus, probablemente solo unos pocos llegaron a la edad adulta.",
    extraContextDE: "Das Leben eines Bauern-Tagelöhners im 18. Jahrhundert war hart und unsicher. Ein Tagelöhner besaß kein eigenes Land, sondern arbeitete auf den Feldern von Großgrundbesitzern gegen einen kargen Tageslohn. Die Arbeit war saisonabhängig: Während der Ernte gab es viel Arbeit, aber im Winter oft Arbeitslosigkeit und Hunger. Ein durchschnittlicher Arbeitstag dauerte von Sonnenaufgang bis Sonnenuntergang (12-16 Stunden). Der Tageslohn betrug nur wenige Groschen, kaum genug, um eine Familie zu ernähren. Viele bauten auf einem kleinen Stück Land Gemüse für den Eigenbedarf an. Die Kindersterblichkeit war hoch: Von den 9 Kindern des Jacobus Franciscus erreichten wahrscheinlich nur wenige das Erwachsenenalter.",
    image: dagloner,
    highlightNL: "Dagloner",
    highlightFR: "Journalier",
    highlightPCD: "Journalier",
    highlightVLS: "Daglooner",
    highlightEN: "Day laborer",
    highlightES: "Jornalero",
    highlightDE: "Tagelöhner",
    isAiGenerated: true
  },
  {
    id: 4,
    period: "1731-1807",
    titleNL: "3e Generatie",
    titleFR: "3e Génération",
    titlePCD: "3e Génératione",
    titleVLS: "3e Generoasje",
    titleEN: "3rd Generation",
    titleES: "3ª Generación",
    titleDE: "3. Generation",
    name: "Georgius Delforce",
    spouse: "Maria Catharina Bonte",
    location: "Ardooie / Emelgem",
    professionNL: "Timmerman",
    professionFR: "Charpentier",
    professionPCD: "Charpintier",
    professionVLS: "Timmerman",
    professionEN: "Carpenter",
    professionES: "Carpintero",
    professionDE: "Zimmermann",
    descriptionNL: "Eerste generatie in de houtbewerking als formeel beroep.",
    descriptionFR: "Première génération dans le travail du bois comme profession formelle.",
    descriptionPCD: "Premiére génératione dins l'travail du bos comme profession formelle.",
    descriptionVLS: "Eerste generoasje in de houtbewerking as formeel beroep.",
    descriptionEN: "First generation in woodworking as a formal profession.",
    descriptionES: "Primera generación en la carpintería como profesión formal.",
    descriptionDE: "Erste Generation in der Holzbearbeitung als formeller Beruf.",
    extraContextNL: "Een timmerman in de 18e eeuw was een gerespecteerd vakman. De opleiding begon rond 12-14 jaar als leerjongen en duurde 5-7 jaar. Timmerlieden bouwden huizen, schuren, molens en kerken. Ze werkten met handgereedschap: bijlen, zagen, beitels en schaafbanken. Het hout kwam uit lokale bossen en moest eerst jaren drogen. Een timmerman werkte vaak 12 uur per dag, 6 dagen per week. De winter was rustiger omdat buiten werken moeilijk was. Het beroep ging vaak over van vader op zoon. Een meester-timmerman kon een goed inkomen verdienen en behoorde tot de gerespecteerde ambachtslieden van het dorp.",
    extraContextFR: "Un charpentier au XVIIIe siècle était un artisan respecté. La formation commençait vers 12-14 ans comme apprenti et durait 5-7 ans. Les charpentiers construisaient des maisons, des granges, des moulins et des églises. Ils travaillaient avec des outils manuels : haches, scies, ciseaux et établis. Le bois provenait des forêts locales et devait d'abord sécher pendant des années. Un charpentier travaillait souvent 12 heures par jour, 6 jours par semaine. L'hiver était plus calme car le travail extérieur était difficile. Le métier se transmettait souvent de père en fils. Un maître-charpentier pouvait gagner un bon revenu et faisait partie des artisans respectés du village.",
    extraContextPCD: "In charpintier au XVIIIe siècle étot in artisan respecté. La formation communchot vers 12-14 ans comme apprenti pi durot 5-7 ans. Les charpintiers bâtissotent des maisones, des granges, des molins pi des églises. Ils travaillotent aveuc des outils manuels : haches, scies, ciseaux pi établis.",
    extraContextVLS: "E timmerman in de 18e eeuw was e gerespecteerd vakman. De opleiding begon rond 12-14 joar as leerjongen en duurde 5-7 joar. Timmerlieden bouwden huizen, schuren, molens en kerken. Ze werkten mee handgerief: bylen, zoagen, beitels en schaafbanken. 't Hout kwam uut lokale bosschen en moest eerst joaren droogen. E timmerman werkte dikwyls 12 uren per dag, 6 dagen per week. De winter was rustiger omda buuten werken moelik was. 't Beroep ging dikwyls over van vader op zeune.",
    extraContextEN: "A carpenter in the 18th century was a respected craftsman. Training began around age 12-14 as an apprentice and lasted 5-7 years. Carpenters built houses, barns, mills and churches. They worked with hand tools: axes, saws, chisels and workbenches. The wood came from local forests and had to dry for years first. A carpenter often worked 12 hours a day, 6 days a week. Winter was quieter because outdoor work was difficult. The profession often passed from father to son. A master carpenter could earn a good income and was among the respected craftsmen of the village.",
    extraContextES: "Un carpintero en el siglo XVIII era un artesano respetado. La formación comenzaba alrededor de los 12-14 años como aprendiz y duraba 5-7 años. Los carpinteros construían casas, graneros, molinos e iglesias. Trabajaban con herramientas manuales: hachas, sierras, cinceles y bancos de trabajo. La madera provenía de los bosques locales y tenía que secarse durante años primero. Un carpintero a menudo trabajaba 12 horas al día, 6 días a la semana. El invierno era más tranquilo porque el trabajo al aire libre era difícil. La profesión a menudo pasaba de padre a hijo.",
    extraContextDE: "Ein Zimmermann im 18. Jahrhundert war ein angesehener Handwerker. Die Ausbildung begann im Alter von 12-14 Jahren als Lehrling und dauerte 5-7 Jahre. Zimmerleute bauten Häuser, Scheunen, Mühlen und Kirchen. Sie arbeiteten mit Handwerkzeugen: Äxte, Sägen, Meißel und Werkbänke. Das Holz kam aus lokalen Wäldern und musste erst jahrelang trocknen. Ein Zimmermann arbeitete oft 12 Stunden am Tag, 6 Tage die Woche. Der Winter war ruhiger, weil Außenarbeit schwierig war. Der Beruf wurde oft vom Vater an den Sohn weitergegeben. Ein Meisterzimmermann konnte ein gutes Einkommen verdienen und gehörte zu den angesehenen Handwerkern des Dorfes.",
    image: timmermansatelier,
    highlightNL: "Vakman",
    highlightFR: "Artisan",
    highlightPCD: "Artisan",
    highlightVLS: "Vakman",
    highlightEN: "Craftsman",
    highlightES: "Artesano",
    highlightDE: "Handwerker",
    isAiGenerated: true
  },
  {
    id: 5,
    period: "1773-1840",
    titleNL: "4e Generatie",
    titleFR: "4e Génération",
    titlePCD: "4e Génératione",
    titleVLS: "4e Generoasje",
    titleEN: "4th Generation",
    titleES: "4ª Generación",
    titleDE: "4. Generation",
    name: "Petrus Augustinus Delforge",
    spouse: "Maria Theresia Maertens",
    location: "Emelgem",
    professionNL: "Timmerman & schrijnwerker",
    professionFR: "Charpentier & menuisier",
    professionPCD: "Charpintier & menuisier",
    professionVLS: "Timmerman & schrynwerker",
    professionEN: "Carpenter & joiner",
    professionES: "Carpintero y ebanista",
    professionDE: "Zimmermann & Tischler",
    descriptionNL: "De ambachtelijke traditie verdiept zich.",
    descriptionFR: "La tradition artisanale s'approfondit.",
    descriptionPCD: "La tradition artisanale s'approfondit.",
    descriptionVLS: "De ambachtelike traditie verdiept zich.",
    descriptionEN: "The craft tradition deepens.",
    descriptionES: "La tradición artesanal se profundiza.",
    descriptionDE: "Die handwerkliche Tradition vertieft sich.",
    extraContextNL: "Een schrijnwerker was gespecialiseerd in fijn houtwerk: deuren, ramen, kasten en meubels. Het verschil met een timmerman lag in de precisie: schrijnwerkers maakten verfijnd binnenwerk terwijl timmerlieden zich richtten op constructiewerk. De gereedschappen waren verfijnder: kleine schaafjes, fijne beitels en precisiemeetinstrumenten. Schrijnwerkers werkten vaak in een werkplaats in plaats van op bouwplaatsen. Ze gebruikten kostbaarder houtsoorten zoals eik en notenhout. Een meester-schrijnwerker kon prachtige meubels maken voor welgestelde families. Dit beroep vereiste jaren oefening om de fijne houtverbindingen te beheersen.",
    extraContextFR: "Un menuisier était spécialisé dans le travail fin du bois : portes, fenêtres, armoires et meubles. La différence avec un charpentier résidait dans la précision : les menuisiers réalisaient des travaux intérieurs raffinés tandis que les charpentiers se concentraient sur la construction. Les outils étaient plus raffinés : petits rabots, ciseaux fins et instruments de mesure de précision. Les menuisiers travaillaient souvent dans un atelier plutôt que sur des chantiers. Ils utilisaient des bois plus précieux comme le chêne et le noyer. Un maître-menuisier pouvait créer de magnifiques meubles pour les familles aisées.",
    extraContextPCD: "In menuisier étot spécialisé dins l'travail fin du bos : portes, fenêtres, armoires pi meubles. La différince aveuc in charpintier étot dins la précision : les menuisiers faisotent des travaux intérieurs raffinés. Les outils étotent pus raffinés : petits rabots, ciseaux fins pi instruments d'mesure.",
    extraContextVLS: "E schrynwerker was gespecialiseerd in fyn houtwerk: deuren, vensters, kasten en meubels. 't Verschil mee e timmerman lag in de precisie: schrynwerkers moakten verfynd binnenwerk terwyl timmerlieden zich richtten op constructiewerk. De gereedschappen woaren verfynder: kleine schaafjes, fyne beitels en precisiemeetinstrumenten. Schrynwerkers werkten dikwyls in e werkploatse in ploatse van op bouwploatsen. Ze gebruukten kostbaarder houtsoorten zooas eik en noteloare.",
    extraContextEN: "A joiner specialized in fine woodwork: doors, windows, cabinets and furniture. The difference from a carpenter lay in the precision: joiners made refined interior work while carpenters focused on construction work. The tools were more refined: small planes, fine chisels and precision measuring instruments. Joiners often worked in a workshop rather than on construction sites. They used more precious wood types such as oak and walnut. A master joiner could create beautiful furniture for wealthy families. This profession required years of practice to master the fine wood joints.",
    extraContextES: "Un ebanista se especializaba en trabajos finos de madera: puertas, ventanas, armarios y muebles. La diferencia con un carpintero residía en la precisión: los ebanistas realizaban trabajos interiores refinados mientras que los carpinteros se centraban en la construcción. Las herramientas eran más refinadas: cepillos pequeños, cinceles finos e instrumentos de medición de precisión. Los ebanistas a menudo trabajaban en un taller en lugar de en obras de construcción. Usaban maderas más preciosas como el roble y el nogal.",
    extraContextDE: "Ein Tischler war auf feine Holzarbeiten spezialisiert: Türen, Fenster, Schränke und Möbel. Der Unterschied zum Zimmermann lag in der Präzision: Tischler fertigten raffinierte Innenarbeiten, während Zimmerleute sich auf Bauarbeiten konzentrierten. Die Werkzeuge waren feiner: kleine Hobel, feine Meißel und Präzisionsmessinstrumente. Tischler arbeiteten oft in einer Werkstatt statt auf Baustellen. Sie verwendeten wertvollere Holzarten wie Eiche und Nussbaum. Ein Meistertischler konnte wunderschöne Möbel für wohlhabende Familien herstellen. Dieser Beruf erforderte jahrelange Übung, um die feinen Holzverbindungen zu beherrschen.",
    image: schrijnwerkersatelier,
    highlightNL: "Vakmanschap",
    highlightFR: "Artisanat",
    highlightPCD: "Artisanat",
    highlightVLS: "Vakmanschap",
    highlightEN: "Craftsmanship",
    highlightES: "Artesanía",
    highlightDE: "Handwerkskunst",
    isAiGenerated: true
  },
  {
    id: 6,
    period: "1815-1871",
    titleNL: "5e Generatie",
    titleFR: "5e Génération",
    titlePCD: "5e Génératione",
    titleVLS: "5e Generoasje",
    titleEN: "5th Generation",
    titleES: "5ª Generación",
    titleDE: "5. Generation",
    name: "Jean François Deforche",
    spouse: "Francisca Vandewalle",
    location: "Emelgem",
    professionNL: "Timmerman & schrijnwerker",
    professionFR: "Charpentier & menuisier",
    professionPCD: "Charpintier & menuisier",
    professionVLS: "Timmerman & schrynwerker",
    professionEN: "Carpenter & joiner",
    professionES: "Carpintero y ebanista",
    professionDE: "Zimmermann & Tischler",
    descriptionNL: "De eerste voorouder waarvan we het beroep eenduidig met akten kunnen onderbouwen.",
    descriptionFR: "Le premier ancêtre dont nous pouvons clairement documenter la profession par des actes.",
    descriptionPCD: "L'premier anchtre dont nous pouvons clairemint documinter la profession par des actes.",
    descriptionVLS: "De eerste vôorvader woarvan we 't beroep eenduidig mee akten kunnen onderbouwen.",
    descriptionEN: "The first ancestor whose profession we can clearly document with records.",
    descriptionES: "El primer antepasado cuya profesión podemos documentar claramente con actas.",
    descriptionDE: "Der erste Vorfahre, dessen Beruf wir eindeutig mit Urkunden belegen können.",
    extraContextNL: "Midden 19e eeuw veranderde het ambacht ingrijpend. De industriële revolutie bracht nieuwe machines en massaproductie. Toch bleven veel ambachtslieden traditioneel werken. Jean François leefde in een periode van grote sociale onrust: de Belgische onafhankelijkheid (1830), de aardappelplaag (1845-1848) en de textielcrisis troffen Vlaanderen zwaar. Veel arbeiders verarmden, maar geschoolde ambachtslieden zoals timmerlieden en schrijnwerkers konden vaak overleven door hun expertise. De spoorwegen brachten nieuwe mogelijkheden: goedkoper hout uit verre streken en toegang tot grotere markten.",
    extraContextFR: "Au milieu du XIXe siècle, l'artisanat a profondément changé. La révolution industrielle a apporté de nouvelles machines et la production de masse. Pourtant, de nombreux artisans ont continué à travailler de manière traditionnelle. Jean François a vécu une période de grands troubles sociaux : l'indépendance belge (1830), la maladie de la pomme de terre (1845-1848) et la crise textile ont durement frappé la Flandre. De nombreux ouvriers se sont appauvris, mais les artisans qualifiés comme les charpentiers et menuisiers ont souvent pu survivre grâce à leur expertise.",
    extraContextPCD: "Au mitan du XIXe siècle, l'artisanat a bié changé. La révolution industrielle a aminé d'nouvelles machines. Pourtant, gramint d'artisans ont continué à travailler d'manière traditionnelle. Jean François a vécu ène période ed grands troubles : l'indépindince belge (1830), la maladie d'l'patiote pi la crise textile.",
    extraContextVLS: "Midden 19e eeuw veranderde 't ambacht ingrypend. De industriële revolutie brocht nieuwe machines en massaproductie. Toch bleven vele ambachtslieden traditioneel werken. Jean François leefde in e periode van grôote sociale onrust: de Belgische onafhankelykheid (1830), de patatteplaag (1845-1848) en de textielcrisis troffen Vloanderen zwoar. Vele arbeiders verarremden, mo geschôolde ambachtslieden zooas timmerlieden en schrynwerkers konden dikwyls overleven deur hun expertise.",
    extraContextEN: "In the mid-19th century, the craft changed dramatically. The Industrial Revolution brought new machines and mass production. Yet many craftsmen continued to work traditionally. Jean François lived in a period of great social unrest: Belgian independence (1830), the potato famine (1845-1848) and the textile crisis hit Flanders hard. Many workers became impoverished, but skilled craftsmen like carpenters and joiners could often survive through their expertise. The railways brought new opportunities: cheaper wood from distant regions and access to larger markets.",
    extraContextES: "A mediados del siglo XIX, el oficio cambió drásticamente. La Revolución Industrial trajo nuevas máquinas y producción en masa. Sin embargo, muchos artesanos continuaron trabajando tradicionalmente. Jean François vivió en un período de gran agitación social: la independencia belga (1830), la hambruna de la patata (1845-1848) y la crisis textil golpearon duramente a Flandes. Muchos trabajadores se empobrecieron, pero los artesanos calificados como carpinteros y ebanistas a menudo pudieron sobrevivir gracias a su experiencia.",
    extraContextDE: "Mitte des 19. Jahrhunderts veränderte sich das Handwerk grundlegend. Die industrielle Revolution brachte neue Maschinen und Massenproduktion. Dennoch arbeiteten viele Handwerker weiterhin traditionell. Jean François lebte in einer Zeit großer sozialer Unruhen: Die belgische Unabhängigkeit (1830), die Kartoffelfäule (1845-1848) und die Textilkrise trafen Flandern schwer. Viele Arbeiter verarmten, aber qualifizierte Handwerker wie Zimmerleute und Tischler konnten oft durch ihre Expertise überleben. Die Eisenbahnen brachten neue Möglichkeiten: günstigeres Holz aus fernen Regionen und Zugang zu größeren Märkten.",
    image: houtsnijders,
    highlightNL: "Gedocumenteerd",
    highlightFR: "Documenté",
    highlightPCD: "Documintée",
    highlightVLS: "Gedocumenteerd",
    highlightEN: "Documented",
    highlightES: "Documentado",
    highlightDE: "Dokumentiert"
  },
  {
    id: 7,
    period: "1857-1938",
    titleNL: "Overgrootvader",
    titleFR: "Arrière-grand-père",
    titlePCD: "Arriére-grand-pére",
    titleVLS: "Overgrôotvader",
    titleEN: "Great-grandfather",
    titleES: "Bisabuelo",
    titleDE: "Urgroßvater",
    name: "Charles Louis Deforce",
    spouse: "Marie Leonie Vandenbroucke",
    location: "Emelgem / Izegem",
    professionNL: "Meubelmaker",
    professionFR: "Ébéniste",
    professionPCD: "Ébéniste",
    professionVLS: "Meubelmoaker",
    professionEN: "Cabinetmaker",
    professionES: "Ebanista",
    professionDE: "Möbeltischler",
    descriptionNL: "Legerdienst 1877-1880 als mineur. Drie huwelijken. Overleed 6 maart 1938.",
    descriptionFR: "Service militaire 1877-1880 comme mineur. Trois mariages. Décédé le 6 mars 1938.",
    descriptionPCD: "Service militaire 1877-1880 comme mineur. Troés mariages. Décédé l'6 mars 1938.",
    descriptionVLS: "Legerdienst 1877-1880 as mineur. Drie huwelyken. Overleed 6 moart 1938.",
    descriptionEN: "Military service 1877-1880 as miner. Three marriages. Died March 6, 1938.",
    descriptionES: "Servicio militar 1877-1880 como minero. Tres matrimonios. Falleció el 6 de marzo de 1938.",
    descriptionDE: "Militärdienst 1877-1880 als Mineur. Drei Ehen. Verstorben am 6. März 1938.",
    extraContextNL: "Een meubelmaker (ébéniste) was het hoogtepunt van het houtbewerkingsambacht. Anders dan timmerlieden of schrijnwerkers maakten meubelmakers luxe meubels: buffetten, bureaus, slaapkamerameublement en eetkamers. Charles Louis werkte in een periode van grote bloei: de Belle Époque (1871-1914) bracht welvaart en vraag naar mooie meubels. Meubelmakers combineerden vele technieken: houtsnijwerk, fineren, intarsia en lakwerk. Een meester-meubelmaker kon een eigen atelier leiden met leerlingen en gezellen. Het familiebedrijf 'M. Deforce & Zonen' zou later een begrip worden in Izegem voor kwaliteitsmeubelen.",
    extraContextFR: "Un ébéniste représentait le sommet de l'artisanat du bois. Contrairement aux charpentiers ou menuisiers, les ébénistes créaient des meubles de luxe : buffets, bureaux, mobilier de chambre et salles à manger. Charles Louis a travaillé pendant une période de grande prospérité : la Belle Époque (1871-1914) apportait richesse et demande de beaux meubles. Les ébénistes combinaient de nombreuses techniques : sculpture sur bois, placage, marqueterie et laquage. Un maître-ébéniste pouvait diriger son propre atelier avec des apprentis et des compagnons.",
    extraContextPCD: "In ébéniste représintot l'sommet d'l'artisanat du bos. Contréremint aux charpintiers ou menuisiers, les ébénistes créotent des meubles ed luxe : buffets, bureaux, mobilier d'chambre pi salles à manger. Charles Louis a travaillé pindant ène période ed grande prospérité : la Belle Époque (1871-1914).",
    extraContextVLS: "E meubelmoaker (ébéniste) was 't hôogtepunt van 't houtbewerkingsambacht. Anders dan timmerlieden of schrynwerkers moakten meubelmoakers luxe meubels: buffetten, bureaus, slaapkoamerameublement en eetkoamers. Charles Louis werkte in e periode van grôote bloei: de Belle Époque (1871-1914) brocht welvoart en vroage noar schône meubels. Meubelmoakers combineerden vele technieken: houtsnydwerk, fineren, intarsia en lakwerk. E meester-meubelmoaker kon e eigen atelier leiden mee leerlingen en gezellen.",
    extraContextEN: "A cabinetmaker (ébéniste) represented the pinnacle of the woodworking craft. Unlike carpenters or joiners, cabinetmakers created luxury furniture: buffets, desks, bedroom furniture and dining rooms. Charles Louis worked during a period of great prosperity: the Belle Époque (1871-1914) brought wealth and demand for beautiful furniture. Cabinetmakers combined many techniques: wood carving, veneering, inlay and lacquerwork. A master cabinetmaker could lead his own workshop with apprentices and journeymen. The family business 'M. Deforce & Sons' would later become a household name in Izegem for quality furniture.",
    extraContextES: "Un ebanista representaba la cumbre del oficio de la madera. A diferencia de los carpinteros, los ebanistas creaban muebles de lujo: aparadores, escritorios, mobiliario de dormitorio y comedores. Charles Louis trabajó durante un período de gran prosperidad: la Belle Époque (1871-1914) trajo riqueza y demanda de muebles hermosos. Los ebanistas combinaban muchas técnicas: tallado en madera, enchapado, marquetería y lacado. Un maestro ebanista podía dirigir su propio taller con aprendices y oficiales.",
    extraContextDE: "Ein Möbeltischler (Ébéniste) stellte den Höhepunkt des Holzbearbeitungshandwerks dar. Anders als Zimmerleute oder Tischler schufen Möbeltischler Luxusmöbel: Buffets, Schreibtische, Schlafzimmermöbel und Esszimmer. Charles Louis arbeitete in einer Zeit großer Blüte: Die Belle Époque (1871-1914) brachte Wohlstand und Nachfrage nach schönen Möbeln. Möbeltischler kombinierten viele Techniken: Holzschnitzerei, Furnieren, Intarsien und Lackarbeiten. Ein Meister-Möbeltischler konnte eine eigene Werkstatt mit Lehrlingen und Gesellen leiten. Das Familienunternehmen 'M. Deforce & Söhne' sollte später in Izegem zu einem Begriff für Qualitätsmöbel werden.",
    image: meubelwerkplaats,
    highlightNL: "Hoogtepunt",
    highlightFR: "Point culminant",
    highlightPCD: "Point culminant",
    highlightVLS: "Hôogtepunt",
    highlightEN: "Peak",
    highlightES: "Punto culminante",
    highlightDE: "Höhepunkt",
    isAiGenerated: true
  },
  {
    id: 8,
    period: "1894-1963",
    titleNL: "Grootvader",
    titleFR: "Grand-père",
    titlePCD: "Grand-pére",
    titleVLS: "Grôotvader",
    titleEN: "Grandfather",
    titleES: "Abuelo",
    titleDE: "Großvater",
    name: "Marcel August Deforce",
    spouse: "Magdalena Geldof",
    location: "Izegem",
    professionNL: "Meubelmaker",
    professionFR: "Ébéniste",
    professionPCD: "Ébéniste",
    professionVLS: "Meubelmoaker",
    professionEN: "Cabinetmaker",
    professionES: "Ebanista",
    professionDE: "Möbeltischler",
    descriptionNL: "Voortzetting van het ambacht in het familiebedrijf 'M. Deforce & Zonen'.",
    descriptionFR: "Continuation de l'artisanat dans l'entreprise familiale 'M. Deforce & Fils'.",
    descriptionPCD: "Continuation d'l'artisanat dins l'intreprise familiére 'M. Deforce & Fils'.",
    descriptionVLS: "Vôortzetting van 't ambacht in 't familiebedryf 'M. Deforce & Zeunes'.",
    descriptionEN: "Continuation of the craft in the family business 'M. Deforce & Sons'.",
    descriptionES: "Continuación del oficio en la empresa familiar 'M. Deforce & Hijos'.",
    descriptionDE: "Fortführung des Handwerks im Familienbetrieb 'M. Deforce & Söhne'.",
    extraContextNL: "Marcel August beleefde turbulente tijden: twee wereldoorlogen veranderden alles. Tijdens WO1 (1914-1918) lag Izegem in bezet België, vlakbij het front. Veel ateliers werden stilgelegd of gevorderd. Na de oorlog volgde wederopbouw en nieuwe vraag naar meubels. De jaren '20 brachten Art Deco-stijlen. De crisis van de jaren '30 trof ook meubelmakers hard. WO2 betekende opnieuw bezetting en schaarste. Na 1945 kwam de modernisering: elektrische machines vervingen handwerk, maar 'M. Deforce & Zonen' bleef kwaliteitswerk leveren. Het familiebedrijf combineerde traditioneel vakmanschap met nieuwe technieken.",
    extraContextFR: "Marcel August a vécu des temps turbulents : deux guerres mondiales ont tout changé. Pendant la Première Guerre mondiale (1914-1918), Izegem se trouvait en Belgique occupée, près du front. De nombreux ateliers furent fermés ou réquisitionnés. Après la guerre suivit la reconstruction et une nouvelle demande de meubles. Les années 1920 apportèrent les styles Art Déco. La crise des années 1930 frappa durement les ébénistes aussi. La Seconde Guerre mondiale signifia à nouveau occupation et pénurie. Après 1945 vint la modernisation : les machines électriques remplacèrent le travail manuel.",
    extraContextPCD: "Marcel August a vécu des temps turbulints : deux guerres mondiales ont tout changé. Pindant la Grande Guerre (1914-1918), Izegem s'trovot in Belgique occupée, près du front. Gramint d'ateliers furint fermés ou réquisitionnés. Après la guerre suivit la reconstruction.",
    extraContextVLS: "Marcel August beleefde turbulente tyden: twee wereldoorlogen veranderden alles. Tydens WO1 (1914-1918) lag Izegem in bezet België, vlakby 't front. Vele ateliers werden stilgeleid of gevorderd. Noa de oorlog volgde wederopbouw en nieuwe vroage noar meubels. De joaren '20 brochten Art Deco-stylen. De crisis van de joaren '30 trof ook meubelmoakers zwoar. WO2 betekende opnieuw bezetting en schaarste. Noa 1945 kwam de modernisering: elektrische machines vervingen handwerk, mo 'M. Deforce & Zeunes' bleef kwaliteitswerk leveren.",
    extraContextEN: "Marcel August lived through turbulent times: two world wars changed everything. During WW1 (1914-1918), Izegem was in occupied Belgium, near the front. Many workshops were closed or requisitioned. After the war came reconstruction and new demand for furniture. The 1920s brought Art Deco styles. The crisis of the 1930s hit cabinetmakers hard too. WW2 meant occupation and scarcity again. After 1945 came modernization: electric machines replaced handwork, but 'M. Deforce & Sons' continued to deliver quality work. The family business combined traditional craftsmanship with new techniques.",
    extraContextES: "Marcel August vivió tiempos turbulentos: dos guerras mundiales lo cambiaron todo. Durante la Primera Guerra Mundial (1914-1918), Izegem estaba en Bélgica ocupada, cerca del frente. Muchos talleres fueron cerrados o requisados. Después de la guerra siguió la reconstrucción y nueva demanda de muebles. Los años 20 trajeron estilos Art Deco. La crisis de los años 30 también golpeó duramente a los ebanistas. La Segunda Guerra Mundial significó nuevamente ocupación y escasez. Después de 1945 vino la modernización: las máquinas eléctricas reemplazaron el trabajo manual.",
    extraContextDE: "Marcel August erlebte turbulente Zeiten: Zwei Weltkriege veränderten alles. Während des Ersten Weltkriegs (1914-1918) lag Izegem im besetzten Belgien, nahe der Front. Viele Werkstätten wurden geschlossen oder beschlagnahmt. Nach dem Krieg folgte der Wiederaufbau und neue Nachfrage nach Möbeln. Die 1920er Jahre brachten Art-Deco-Stile. Die Krise der 1930er Jahre traf auch die Möbeltischler hart. Der Zweite Weltkrieg bedeutete erneut Besatzung und Knappheit. Nach 1945 kam die Modernisierung: Elektrische Maschinen ersetzten die Handarbeit, aber 'M. Deforce & Söhne' lieferte weiterhin Qualitätsarbeit.",
    image: houtsnijders,
    highlightNL: "Familiebedrijf",
    highlightFR: "Entreprise familiale",
    highlightPCD: "Intreprise familiére",
    highlightVLS: "Familiebedryf",
    highlightEN: "Family business",
    highlightES: "Empresa familiar",
    highlightDE: "Familienbetrieb"
  },
  {
    id: 9,
    period: "2024",
    titleNL: "Vandaag",
    titleFR: "Aujourd'hui",
    titlePCD: "Aujord'hui",
    titleVLS: "Vandoage",
    titleEN: "Today",
    titleES: "Hoy",
    titleDE: "Heute",
    name: "112 Afstammelingen / Descendants",
    location: "België & Wereld / Belgique & Monde",
    professionNL: "Diverse beroepen",
    professionFR: "Métiers divers",
    professionPCD: "Métiers divers",
    professionVLS: "Diverse beroepen",
    professionEN: "Various professions",
    professionES: "Profesiones diversas",
    professionDE: "Verschiedene Berufe",
    descriptionNL: "Familiereünie op 29 september 2024 in Het Prullenbos te Laarne met 112 afstammelingen.",
    descriptionFR: "Réunion de famille le 29 septembre 2024 au Prullenbos à Laarne avec 112 descendants.",
    descriptionPCD: "Réunion familiére l'29 septembre 2024 au Prullenbos à Laarne aveuc 112 deschindants.",
    descriptionVLS: "Familiereünie op 29 september 2024 in Het Prullenbos te Laarne mee 112 afstammelingen.",
    descriptionEN: "Family reunion on September 29, 2024 at Het Prullenbos in Laarne with 112 descendants.",
    descriptionES: "Reunión familiar el 29 de septiembre de 2024 en Het Prullenbos en Laarne con 112 descendientes.",
    descriptionDE: "Familientreffen am 29. September 2024 im Het Prullenbos in Laarne mit 112 Nachkommen.",
    image: reunion2024,
    highlightNL: "Reünie",
    highlightFR: "Réunion",
    highlightPCD: "Réunion",
    highlightVLS: "Reünie",
    highlightEN: "Reunion",
    highlightES: "Reunión",
    highlightDE: "Wiedersehen"
  },
];

const GeneratieTijdlijn = () => {
  const ref = useRef(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewedGenerations, setViewedGenerations] = useState<Set<number>>(new Set([0]));
  const { language, t } = useLanguage();
  const { unlockAchievement } = useGame();

  // Track viewed generations and unlock achievement
  useEffect(() => {
    if (!viewedGenerations.has(activeIndex)) {
      const newViewedGenerations = new Set(viewedGenerations);
      newViewedGenerations.add(activeIndex);
      setViewedGenerations(newViewedGenerations);
      
      // Unlock tijdreiziger when all generations are viewed
      if (newViewedGenerations.size >= generations.length) {
        unlockAchievement('tijdreiziger');
      }
    }
  }, [activeIndex]);

  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 320;
    const newIndex = direction === 'left' 
      ? Math.max(0, activeIndex - 1)
      : Math.min(generations.length - 1, activeIndex + 1);
    
    setActiveIndex(newIndex);
    scrollRef.current.scrollTo({
      left: newIndex * cardWidth,
      behavior: 'smooth'
    });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = 320;
    setActiveIndex(index);
    scrollRef.current.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth'
    });
  };

  const getTitle = (gen: Generation) => language === 'fr' ? gen.titleFR : language === 'pcd' ? gen.titlePCD : language === 'vls' ? (gen.titleVLS || gen.titleNL) : language === 'en' ? (gen.titleEN || gen.titleNL) : language === 'es' ? (gen.titleES || gen.titleNL) : language === 'de' ? (gen.titleDE || gen.titleNL) : gen.titleNL;
  const getProfession = (gen: Generation) => language === 'fr' ? gen.professionFR : language === 'pcd' ? gen.professionPCD : language === 'vls' ? (gen.professionVLS || gen.professionNL) : language === 'en' ? (gen.professionEN || gen.professionNL) : language === 'es' ? (gen.professionES || gen.professionNL) : language === 'de' ? (gen.professionDE || gen.professionNL) : gen.professionNL;
  const getDescription = (gen: Generation) => language === 'fr' ? gen.descriptionFR : language === 'pcd' ? gen.descriptionPCD : language === 'vls' ? (gen.descriptionVLS || gen.descriptionNL) : language === 'en' ? (gen.descriptionEN || gen.descriptionNL) : language === 'es' ? (gen.descriptionES || gen.descriptionNL) : language === 'de' ? (gen.descriptionDE || gen.descriptionNL) : gen.descriptionNL;
  const getHighlight = (gen: Generation) => language === 'fr' ? gen.highlightFR : language === 'pcd' ? gen.highlightPCD : language === 'vls' ? (gen.highlightVLS || gen.highlightNL) : language === 'en' ? (gen.highlightEN || gen.highlightNL) : language === 'es' ? (gen.highlightES || gen.highlightNL) : language === 'de' ? (gen.highlightDE || gen.highlightNL) : gen.highlightNL;
  const getExtraContext = (gen: Generation) => language === 'fr' ? gen.extraContextFR : language === 'pcd' ? gen.extraContextPCD : language === 'vls' ? (gen.extraContextVLS || gen.extraContextNL) : language === 'en' ? (gen.extraContextEN || gen.extraContextNL) : language === 'es' ? (gen.extraContextES || gen.extraContextNL) : language === 'de' ? (gen.extraContextDE || gen.extraContextNL) : gen.extraContextNL;

  return (
    <section id="generaties" className="section-padding bg-secondary/30 overflow-hidden" ref={ref}>
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-medium uppercase tracking-widest text-sm">
            {t('generaties.years')}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4 mt-4">
            {t('generaties.title')}
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            {t('generaties.subtitle')}
          </p>
          <div className="vintage-divider mt-6" />
        </motion.div>

        {/* Timeline Navigation Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {generations.map((gen, index) => (
            <button
              key={gen.id}
              onClick={() => scrollToIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeIndex === index 
                  ? 'bg-accent scale-125' 
                  : 'bg-border hover:bg-muted-foreground'
              }`}
              aria-label={`${language === 'fr' ? 'Aller à' : language === 'pcd' ? 'Aller à' : language === 'de' ? 'Gehe zu' : language === 'en' ? 'Go to' : language === 'es' ? 'Ir a' : language === 'vls' ? 'Goa noar' : 'Ga naar'} ${getTitle(gen)}`}
            />
          ))}
        </div>

        {/* Timeline Line */}
        <div className="relative mb-8">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-accent via-primary to-accent rounded-full" />
          <div className="flex justify-between px-4">
            {generations.map((gen, index) => (
              <motion.button
                key={gen.id}
                onClick={() => scrollToIndex(index)}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`relative z-10 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-accent border-accent scale-150'
                    : 'bg-background border-primary hover:scale-125'
                }`}
              >
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap hidden md:block">
                  {gen.period}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Scroll Buttons */}
        <div className="flex justify-between items-center mb-4 px-4">
          <button
            onClick={() => scrollTo('left')}
            disabled={activeIndex === 0}
            className="p-3 rounded-full bg-background border border-border shadow-sm hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label={t('generaties.prev')}
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          
          <span className="text-sm text-muted-foreground">
            {activeIndex + 1} / {generations.length}
          </span>
          
          <button
            onClick={() => scrollTo('right')}
            disabled={activeIndex === generations.length - 1}
            className="p-3 rounded-full bg-background border border-border shadow-sm hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label={t('generaties.next')}
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Cards Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {generations.map((gen, index) => (
            <motion.div
              key={gen.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`flex-shrink-0 w-[300px] snap-center transition-all duration-300 ${
                activeIndex === index ? 'scale-100' : 'scale-95 opacity-70'
              }`}
            >
              <div className="bg-background rounded-xl overflow-hidden shadow-vintage border border-border h-full">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={gen.image}
                    alt={getTitle(gen)}
                    className="w-full h-full object-cover"
                  />
                  {gen.isAiGenerated && <AiLabel className="top-3 right-3" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  
                  {/* Period Badge */}
                  <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    {gen.period}
                  </div>
                  
                  {/* Highlight Badge */}
                  {getHighlight(gen) && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
                      {getHighlight(gen)}
                    </div>
                  )}
                  
                  {/* Title Overlay */}
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-serif text-xl font-bold text-foreground">
                      {getTitle(gen)}
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h4 className="font-serif text-lg font-semibold text-primary mb-2">
                    {gen.name}
                  </h4>
                  
                  {gen.spouse && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>{gen.spouse}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>{gen.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Briefcase className="w-4 h-4 text-accent" />
                    <span>{getProfession(gen)}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {getDescription(gen)}
                  </p>
                  
                  {/* Extra Context for specific generations */}
                  {getExtraContext(gen) && (
                    <details className="mt-3 group">
                      <summary className="text-xs text-accent cursor-pointer hover:text-accent/80 transition-colors flex items-center gap-1">
                        <span>{language === 'fr' || language === 'pcd' ? 'En savoir plus...' : language === 'de' ? 'Mehr erfahren...' : language === 'en' ? 'Learn more...' : language === 'es' ? 'Más información...' : language === 'vls' ? 'Mee weten...' : 'Meer weten...'}</span>
                      </summary>
                      <div className="mt-2 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground leading-relaxed">
                        {getExtraContext(gen)}
                      </div>
                    </details>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <p className="text-center text-xs text-muted-foreground mt-4 md:hidden">
          {t('generaties.swipe')}
        </p>
      </div>
    </section>
  );
};

export default GeneratieTijdlijn;
