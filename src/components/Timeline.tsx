import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Coins, X, Swords, MapPin, Hammer, Users, PartyPopper } from "lucide-react";
import reunionImage from "@/assets/reunion-1962.jpg";
import reunion2024Image from "@/assets/reunion-2024-new.jpg";
import slagWestrozebeke from "@/assets/slag-westrozebeke.jpg";
import huwelijkscontract from "@/assets/huwelijkscontract-1685.jpg";
import timmermansatelier from "@/assets/timmermansatelier-18e.jpg";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  image?: string;
  imageDescNL?: string;
  imageDescFR?: string;
  imageDescPCD?: string;
  extraContentNL?: string;
  extraContentFR?: string;
  extraContentPCD?: string;
  extraContentVLS?: string;
  icon?: "coins" | "swords" | "map" | "hammer" | "users" | "party";
}

const timelineEventsNL: TimelineEvent[] = [
  {
    year: "1382",
    title: "De oudste sporen",
    description:
      "Voorouders Gilles van den Neste en Zeger Van Steenkiste vechten mee in de Slag bij Westrozebeke in het leger van Filips van Artevelde. De vroegste gedocumenteerde voorouders in onze stamboom.",
    image: slagWestrozebeke,
    imageDescNL: "De Slag bij Westrozebeke (1382) - Filips van Artevelde valt in de strijd",
    imageDescFR: "La Bataille de Westrozebeke (1382) - Philippe van Artevelde tombe au combat",
    extraContentNL: "De Slag bij Westrozebeke vond plaats op 27 november 1382, tijdens de Gentse Opstand (1379-1385). Het Vlaamse burgerleger van zo'n 40.000 man, onder leiding van Filips van Artevelde, stond tegenover het Franse koninklijke leger van Karel VI. De slag was onderdeel van een bredere machtsstrijd tussen de Vlaamse steden en de graaf van Vlaanderen, die gesteund werd door de Franse kroon. Meer dan 25.000 Vlamingen sneuvelden, waaronder Artevelde zelf. De nederlaag betekende het einde van de Vlaamse stedelijke autonomie voor generaties. Het feit dat onze voorouders Gilles en Zeger overleefden is opmerkelijk gezien de enorme verliezen - slechts een fractie van het Vlaamse leger ontkwam aan de slachting.",
    extraContentFR: "La Bataille de Westrozebeke eut lieu le 27 novembre 1382, pendant la Révolte de Gand (1379-1385). L'armée bourgeoise flamande d'environ 40 000 hommes, sous Philippe van Artevelde, affronta l'armée royale française de Charles VI. La bataille faisait partie d'une lutte de pouvoir plus large entre les villes flamandes et le comte de Flandre, soutenu par la couronne française. Plus de 25 000 Flamands périrent, dont Artevelde lui-même. La défaite signifia la fin de l'autonomie urbaine flamande pour des générations. Le fait que nos ancêtres Gilles et Zeger aient survécu est remarquable vu les pertes énormes - seule une fraction de l'armée flamande échappa au massacre.",
    extraContentVLS: "De Slag by Westrozebeke die gebeurde ip 27 november 1382, tydens den Gentschen Opstand (1379-1385). 't Vlaamsche borgerleger van e stuk of 40.000 man, under Filips van Artevelde, stond tegenover 't Fransche koninkslelik leger van Karel VI. De slag was e stuk van e grôoter machtsstryd tusschen de Vlaamsche steên en den graaf van Vloanderen, die gesteund wier deur de Fransche krôone. Mee dan 25.000 Vlamingen zyn gesneuveld, en Artevelde zelf ook. 't Is pertank wel remarquabel da uuze vôorouders Gilles en Zeger 't overleeft èn, want 't was moar e klyn bitje da der ontsnapt is an 't bloedbad.",
    icon: "swords",
  },
  {
    year: "ca. 1550",
    title: "Bauduin Deleforge",
    description:
      "De vroegste voorvader die we in de naamlijn Deforce kunnen aanwijzen. Hij overleed in 1613 te Halluin. Van Picardische oorsprong, in de streek ten zuiden van Rijsel.",
  },
  {
    year: "ca. 1590",
    title: "Hypolite Deleforge",
    description:
      "Zoon van Bauduin. Trouwde rond 1620 te Santes met een onbekende vrouw. Vader van Hubert Deleforge senior (~1630).",
  },
  {
    year: "ca. 1630",
    title: "Hubert Deleforge senior",
    description:
      "Zoon van Hypolite. Trouwde met Marie Grimbel uit Beaucamps-Ligny. Zij was dochter van Michel Grimbel en Madeleine Rogier uit Loos. Ouders van onze stamvader Hubert.",
  },
  {
    year: "1662",
    title: "Geboorte stamvader Hubert",
    description:
      "Hubert Deleforge wordt geboren te Hallennes-lez-Haubourdin als zoon van Hubert senior en Marie Grimbel. Hij zou later de stichter worden van onze West-Vlaamse tak.",
  },
  {
    year: "1685",
    title: "Huwelijkscontract te Lille",
    description:
      "Op 18 april 1685 trouwen Hubert Deleforge en Antoinette Follet voor notaris Jacques Anselme Le Francq te Lille. Antoinette was dochter van meester-chirurgijn Jean Follet uit Capinghem. Beide families brachten elk 400 pond parisis als bruidsschat in.",
    image: huwelijkscontract,
    imageDescNL: "Het Huwelijkscontract, Jan Josef Horemans II (1768) - Ondertekening van een huwelijkscontract in de 18e eeuw",
    imageDescFR: "Le Contrat de Mariage, Jan Josef Horemans II (1768) - Signature d'un contrat de mariage au XVIIIe siècle",
    extraContentNL: "De bruidsschat van 2×400 pond parisis (totaal 800 pond) was een aanzienlijk bedrag. De livre parisis was een middeleeuwse Franse munteenheid. In 1685 kon men hiervoor ongeveer 2-3 hectare landbouwgrond kopen, of een bescheiden woning. Dit toont aan dat beide families tot de gegoede burgerij behoorden.",
    extraContentFR: "La dot de 2×400 livres parisis (total 800 livres) représentait une somme considérable. La livre parisis était une unité monétaire française médiévale. En 1685, cela permettait d'acheter environ 2-3 hectares de terres agricoles ou une maison modeste. Cela montre que les deux familles appartenaient à la bourgeoisie aisée.",
    icon: "coins",
  },
  {
    year: "1699",
    title: "De grote migratie",
    description:
      "Hubert verkoopt zijn eigendom in Hallennes en trekt 50 km noordwaarts naar West-Vlaanderen. Eerste vermelding 'ex Hemelgem' (Emelgem). De oorlogen van Lodewijk XIV en economische onrust dreven de familie naar veiliger oorden.",
    extraContentNL: "De late 17e eeuw was een turbulente periode in de Zuidelijke Nederlanden. Lodewijk XIV van Frankrijk voerde meerdere verwoestende oorlogen: de Devolutieoorlog (1667-1668), de Hollandse Oorlog (1672-1678), de Negenjarige Oorlog (1688-1697) en de Spaanse Successieoorlog (1701-1714). Deze conflicten brachten plunderingen, brandschattingen en economische chaos. Dorpen in Noord-Frankrijk werden regelmatig geteisterd door passerende legers. Veel families, zoals de onze, trokken noordwaarts naar de Oostenrijkse Nederlanden voor stabiliteit. De reis van 50 km van Hallennes naar Emelgem duurde destijds meerdere dagen met paard en wagen.",
    extraContentFR: "La fin du XVIIe siècle fut une période turbulente dans les Pays-Bas méridionaux. Louis XIV de France mena plusieurs guerres dévastatrices : la Guerre de Dévolution (1667-1668), la Guerre de Hollande (1672-1678), la Guerre de Neuf Ans (1688-1697) et la Guerre de Succession d'Espagne (1701-1714). Ces conflits apportèrent pillages, destructions et chaos économique. Les villages du nord de la France étaient régulièrement ravagés par les armées de passage. De nombreuses familles, comme la nôtre, migrèrent vers le nord aux Pays-Bas autrichiens pour plus de stabilité. Le voyage de 50 km de Hallennes à Emelgem prenait plusieurs jours en charrette à cheval.",
    extraContentVLS: "De late 17e eeuw was e turbulente periode in de Zuidelike Nederlanden. Lodewyk XIV van Frankryk voerde meerdere verwoestende oorlogen: de Devolutieoorlog (1667-1668), de Hollandsche Oorlog (1672-1678), de Negenjoarigen Oorlog (1688-1697) en de Spaansche Successieoorlog (1701-1714). Die conflicten brochten plunderingen, brandschattingen en economische chaos. Vele families, gelyk de uuze, trokken noardwoarts noar de Oostenryksche Nederlanden vôor stabiliteit.",
    icon: "map",
  },
  {
    year: "1718",
    title: "Jacobus Franciscus trouwt",
    description:
      "Zoon Jacobus Franciscus Deleforge (1694-1772) trouwt op 30 april 1718 te Izegem met Veronica Barbier. Hij vestigt zich in Ardooie en krijgt 9 kinderen. Onze rechtstreekse voorvader.",
  },
  {
    year: "1729",
    title: "Overlijden stamouders",
    description:
      "Antoinette Follet overlijdt op 19 april 1729 te Izegem. Hubert overlijdt kort daarna, ook in 1729. De familie is nu volledig geworteld in West-Vlaanderen.",
  },
  {
    year: "1731-1807",
    title: "Georgius Delforce",
    description:
      "Zoon van Jacobus Franciscus. Eerste generatie die zich formeel als timmerman vestigt. Het begin van de familiale traditie in houtbewerking.",
    image: timmermansatelier,
    imageDescNL: "Een timmermanswerkplaats, Pieter Snyers (18e eeuw) - Het ambacht dat generaties Deforce zou kenmerken",
    imageDescFR: "Un atelier de menuisier, Pieter Snyers (XVIIIe siècle) - Le métier qui caractériserait des générations de Deforce",
    extraContentNL: "Georgius Delforce vestigde de familietraditie in houtbewerking die tot in de 20e eeuw zou voortduren. Het timmermansambacht was in de 18e eeuw een gerespecteerd beroep dat vaardigheden vereiste in zowel constructie als fijn houtwerk. Het atelier was vaak verbonden aan het woonhuis, waar de kennis van vader op zoon werd doorgegeven.",
    extraContentFR: "Georgius Delforce établit la tradition familiale du travail du bois qui perdurerait jusqu'au XXe siècle. Le métier de charpentier était au XVIIIe siècle une profession respectée nécessitant des compétences en construction et en ébénisterie fine. L'atelier était souvent attaché à la maison, où le savoir-faire se transmettait de père en fils.",
    icon: "hammer",
  },
  {
    year: "1815-1871",
    title: "Jean François Deforche",
    description:
      "De eerste voorouder waarvan we het beroep eenduidig met akten kunnen onderbouwen. Timmerman en schrijnwerker te Emelgem. Getrouwd met Francisca Vandewalle, 8 kinderen waaronder Charles Louis.",
  },
  {
    year: "1857-1938",
    title: "Charles-Louis Deforce",
    description:
      "Overgrootvader, geboren te Emelgem. Legerdienst 1877-1880 als 'mineur de 1e classe'. Driemaal gehuwd. Met eerste vrouw Marie Leonie Vandenbroucke 8 kinderen, waarvan slechts 3 overleefden.",
  },
  {
    year: "1894-1963",
    title: "Marcel August Deforce",
    description:
      "Zoon van Charles-Louis en Marie Leonie. Meubelmaker in het familiebedrijf 'M. Deforce & Zonen'. Trouwde met Magdalena Geldof. Grootvader van de auteur.",
  },
  {
    year: "1962",
    title: "Eerste familiereünie",
    description:
      "Grote familiereünie bij het ouderlijke huis in de Vandenbogaerdelaan 27 te Izegem. Historische foto van meerdere generaties Deforce.",
    image: reunionImage,
    imageDescNL: "Familiereünie 1962 - Meerdere generaties Deforce verenigd bij het ouderlijk huis",
    imageDescFR: "Réunion de famille 1962 - Plusieurs générations Deforce réunies à la maison parentale",
    extraContentNL: "Deze historische foto toont de uitgebreide Deforce-familie in 1962. Het ouderlijk huis aan de Vandenbogaerdelaan 27 te Izegem was jarenlang het verzamelpunt voor familiebijeenkomsten. Deze reünie markeerde een moment van eenheid voor een familie die inmiddels over heel België verspreid was geraakt.",
    extraContentFR: "Cette photo historique montre la famille Deforce élargie en 1962. La maison parentale au Vandenbogaerdelaan 27 à Izegem fut pendant des années le point de rassemblement pour les réunions familiales. Cette réunion marqua un moment d'unité pour une famille désormais dispersée dans toute la Belgique.",
    icon: "users",
  },
  {
    year: "2024",
    title: "Grote Familiereünie",
    description:
      "Op zondag 29 september 2024 komen 112 afstammelingen van Marcel Deforce en Magdalena Geldof samen in Het Prullenbos te Laarne. Een nieuw hoofdstuk in onze familiegeschiedenis.",
    image: reunion2024Image,
    imageDescNL: "Familiereünie 2024 - 112 afstammelingen van Marcel en Magdalena verenigd in Het Prullenbos",
    imageDescFR: "Réunion de famille 2024 - 112 descendants de Marcel et Magdalena réunis au Prullenbos",
    extraContentNL: "De reünie van 2024 was de grootste familiebijeenkomst ooit met 112 aanwezigen. Van de kleinste kinderen tot de oudste familieleden, vier generaties kwamen samen om de familieband te vieren. Het Prullenbos in Laarne bood de perfecte locatie voor deze gedenkwaardige dag.",
    extraContentFR: "La réunion de 2024 fut le plus grand rassemblement familial jamais organisé avec 112 participants. Des plus petits enfants aux membres les plus âgés, quatre générations se sont réunies pour célébrer les liens familiaux. Le Prullenbos à Laarne offrit le cadre parfait pour cette journée mémorable.",
    icon: "party",
  },
  {
    year: "2026",
    title: "Dit boek",
    description:
      "Marc Deforce brengt 25 jaar genealogisch onderzoek samen in een leesbaar verhaal, ter gelegenheid van zijn tachtigste verjaardag.",
  },
];

const timelineEventsFR: TimelineEvent[] = [
  {
    year: "1382",
    title: "Les traces les plus anciennes",
    description:
      "Les ancêtres Gilles van den Neste et Zeger Van Steenkiste combattent à la Bataille de Westrozebeke dans l'armée de Philippe van Artevelde. Les premiers ancêtres documentés dans notre arbre généalogique.",
    image: slagWestrozebeke,
    imageDescNL: "De Slag bij Westrozebeke (1382) - Filips van Artevelde valt in de strijd",
    imageDescFR: "La Bataille de Westrozebeke (1382) - Philippe van Artevelde tombe au combat",
    extraContentNL: "De Slag bij Westrozebeke vond plaats op 27 november 1382. Het Vlaamse burgerleger onder leiding van Filips van Artevelde werd verslagen door het Franse koninklijke leger. Meer dan 25.000 Vlamingen sneuvelden, waaronder Artevelde zelf. Het feit dat onze voorouders Gilles en Zeger overleefden is opmerkelijk gezien de enorme verliezen.",
    extraContentFR: "La Bataille de Westrozebeke eut lieu le 27 novembre 1382. L'armée bourgeoise flamande sous Philippe van Artevelde fut vaincue par l'armée royale française. Plus de 25 000 Flamands périrent, dont Artevelde lui-même. Le fait que nos ancêtres Gilles et Zeger aient survécu est remarquable vu les pertes énormes.",
    icon: "swords",
  },
  {
    year: "ca. 1550",
    title: "Bauduin Deleforge",
    description:
      "Le plus ancien ancêtre que nous pouvons identifier dans la lignée Deforce. Il décéda en 1613 à Halluin. D'origine picarde, dans la région au sud de Lille.",
  },
  {
    year: "ca. 1590",
    title: "Hypolite Deleforge",
    description:
      "Fils de Bauduin. Marié vers 1620 à Santes avec une femme inconnue. Père de Hubert Deleforge senior (~1630).",
  },
  {
    year: "ca. 1630",
    title: "Hubert Deleforge senior",
    description:
      "Fils d'Hypolite. Marié avec Marie Grimbel de Beaucamps-Ligny. Elle était fille de Michel Grimbel et Madeleine Rogier de Loos. Parents de notre ancêtre fondateur Hubert.",
  },
  {
    year: "1662",
    title: "Naissance de l'ancêtre fondateur Hubert",
    description:
      "Hubert Deleforge naît à Hallennes-lez-Haubourdin, fils de Hubert senior et Marie Grimbel. Il deviendra plus tard le fondateur de notre branche ouest-flamande.",
  },
  {
    year: "1685",
    title: "Contrat de mariage à Lille",
    description:
      "Le 18 avril 1685, Hubert Deleforge et Antoinette Follet se marient devant le notaire Jacques Anselme Le Francq à Lille. Antoinette était fille du maître-chirurgien Jean Follet de Capinghem. Les deux familles apportèrent chacune 400 livres parisis comme dot.",
    image: huwelijkscontract,
    imageDescNL: "Het Huwelijkscontract, Jan Josef Horemans II (1768) - Ondertekening van een huwelijkscontract in de 18e eeuw",
    imageDescFR: "Le Contrat de Mariage, Jan Josef Horemans II (1768) - Signature d'un contrat de mariage au XVIIIe siècle",
    extraContentNL: "De bruidsschat van 2×400 pond parisis (totaal 800 pond) was een aanzienlijk bedrag. De livre parisis was een middeleeuwse Franse munteenheid. In 1685 kon men hiervoor ongeveer 2-3 hectare landbouwgrond kopen, of een bescheiden woning. Dit toont aan dat beide families tot de gegoede burgerij behoorden.",
    extraContentFR: "La dot de 2×400 livres parisis (total 800 livres) représentait une somme considérable. La livre parisis était une unité monétaire française médiévale. En 1685, cela permettait d'acheter environ 2-3 hectares de terres agricoles ou une maison modeste. Cela montre que les deux familles appartenaient à la bourgeoisie aisée.",
    icon: "coins",
  },
  {
    year: "1699",
    title: "La grande migration",
    description:
      "Hubert vend sa propriété à Hallennes et se dirige 50 km vers le nord en Flandre Occidentale. Première mention 'ex Hemelgem' (Emelgem). Les guerres de Louis XIV et l'instabilité économique poussèrent la famille vers des lieux plus sûrs.",
    extraContentNL: "De late 17e eeuw was een turbulente periode in de Zuidelijke Nederlanden. De oorlogen van Lodewijk XIV (1667-1713) brachten verwoesting en economische onzekerheid. Veel families trokken noordwaarts naar de Oostenrijkse Nederlanden voor stabiliteit. De reis van 50 km van Hallennes naar Emelgem duurde destijds meerdere dagen met paard en wagen.",
    extraContentFR: "La fin du XVIIe siècle fut une période turbulente dans les Pays-Bas méridionaux. Les guerres de Louis XIV (1667-1713) apportèrent dévastation et incertitude économique. De nombreuses familles migrèrent vers le nord aux Pays-Bas autrichiens pour plus de stabilité. Le voyage de 50 km de Hallennes à Emelgem prenait plusieurs jours en charrette à cheval.",
    icon: "map",
  },
  {
    year: "1718",
    title: "Mariage de Jacobus Franciscus",
    description:
      "Le fils Jacobus Franciscus Deleforge (1694-1772) épouse le 30 avril 1718 à Izegem Veronica Barbier. Il s'installe à Ardooie et a 9 enfants. Notre ancêtre direct.",
  },
  {
    year: "1729",
    title: "Décès des ancêtres fondateurs",
    description:
      "Antoinette Follet décède le 19 avril 1729 à Izegem. Hubert décède peu après, également en 1729. La famille est maintenant complètement enracinée en Flandre Occidentale.",
  },
  {
    year: "1731-1807",
    title: "Georgius Delforce",
    description:
      "Fils de Jacobus Franciscus. Première génération à s'établir formellement comme charpentier. Le début de la tradition familiale dans le travail du bois.",
    image: timmermansatelier,
    imageDescNL: "Een timmermanswerkplaats, Pieter Snyers (18e eeuw) - Het ambacht dat generaties Deforce zou kenmerken",
    imageDescFR: "Un atelier de menuisier, Pieter Snyers (XVIIIe siècle) - Le métier qui caractériserait des générations de Deforce",
    extraContentNL: "Georgius Delforce vestigde de familietraditie in houtbewerking die tot in de 20e eeuw zou voortduren. Het timmermansambacht was in de 18e eeuw een gerespecteerd beroep dat vaardigheden vereiste in zowel constructie als fijn houtwerk. Het atelier was vaak verbonden aan het woonhuis, waar de kennis van vader op zoon werd doorgegeven.",
    extraContentFR: "Georgius Delforce établit la tradition familiale du travail du bois qui perdurerait jusqu'au XXe siècle. Le métier de charpentier était au XVIIIe siècle une profession respectée nécessitant des compétences en construction et en ébénisterie fine. L'atelier était souvent attaché à la maison, où le savoir-faire se transmettait de père en fils.",
    icon: "hammer",
  },
  {
    year: "1815-1871",
    title: "Jean François Deforche",
    description:
      "Le premier ancêtre dont nous pouvons clairement documenter la profession par des actes. Charpentier et menuisier à Emelgem. Marié avec Francisca Vandewalle, 8 enfants dont Charles Louis.",
  },
  {
    year: "1857-1938",
    title: "Charles-Louis Deforce",
    description:
      "Arrière-grand-père, né à Emelgem. Service militaire 1877-1880 comme 'mineur de 1re classe'. Marié trois fois. Avec sa première femme Marie Leonie Vandenbroucke, 8 enfants dont seulement 3 survécurent.",
  },
  {
    year: "1894-1963",
    title: "Marcel August Deforce",
    description:
      "Fils de Charles-Louis et Marie Leonie. Ébéniste dans l'entreprise familiale 'M. Deforce & Fils'. Marié avec Magdalena Geldof. Grand-père de l'auteur.",
  },
  {
    year: "1962",
    title: "Première réunion de famille",
    description:
      "Grande réunion de famille à la maison parentale au Vandenbogaerdelaan 27 à Izegem. Photo historique de plusieurs générations Deforce.",
    image: reunionImage,
    imageDescNL: "Familiereünie 1962 - Meerdere generaties Deforce verenigd bij het ouderlijk huis",
    imageDescFR: "Réunion de famille 1962 - Plusieurs générations Deforce réunies à la maison parentale",
    extraContentNL: "Deze historische foto toont de uitgebreide Deforce-familie in 1962. Het ouderlijk huis aan de Vandenbogaerdelaan 27 te Izegem was jarenlang het verzamelpunt voor familiebijeenkomsten. Deze reünie markeerde een moment van eenheid voor een familie die inmiddels over heel België verspreid was geraakt.",
    extraContentFR: "Cette photo historique montre la famille Deforce élargie en 1962. La maison parentale au Vandenbogaerdelaan 27 à Izegem fut pendant des années le point de rassemblement pour les réunions familiales. Cette réunion marqua un moment d'unité pour une famille désormais dispersée dans toute la Belgique.",
    icon: "users",
  },
  {
    year: "2024",
    title: "Grande Réunion de Famille",
    description:
      "Le dimanche 29 septembre 2024, 112 descendants de Marcel Deforce et Magdalena Geldof se réunissent au Prullenbos à Laarne. Un nouveau chapitre dans notre histoire familiale.",
    image: reunion2024Image,
    imageDescNL: "Familiereünie 2024 - 112 afstammelingen van Marcel en Magdalena verenigd in Het Prullenbos",
    imageDescFR: "Réunion de famille 2024 - 112 descendants de Marcel et Magdalena réunis au Prullenbos",
    extraContentNL: "De reünie van 2024 was de grootste familiebijeenkomst ooit met 112 aanwezigen. Van de kleinste kinderen tot de oudste familieleden, vier generaties kwamen samen om de familieband te vieren. Het Prullenbos in Laarne bood de perfecte locatie voor deze gedenkwaardige dag.",
    extraContentFR: "La réunion de 2024 fut le plus grand rassemblement familial jamais organisé avec 112 participants. Des plus petits enfants aux membres les plus âgés, quatre générations se sont réunies pour célébrer les liens familiaux. Le Prullenbos à Laarne offrit le cadre parfait pour cette journée mémorable.",
    icon: "party",
  },
  {
    year: "2026",
    title: "Ce livre",
    description:
      "Marc Deforce rassemble 25 ans de recherche généalogique en un récit lisible, à l'occasion de son quatre-vingtième anniversaire.",
  },
];

const timelineEventsPCD: TimelineEvent[] = [
  {
    year: "1382",
    title: "Chés traces les pus anchiennes",
    description:
      "Chés anchêtes Gilles van den Neste pi Zeger Van Steenkiste i s' batottent à l' Bataille éd Westrozebeke dins l'armée éd Philippe van Artevelde. Ch'sont chés preumiers anchêtes documintés dins note arbe généalogique.",
    image: slagWestrozebeke,
    imageDescNL: "De Slag bij Westrozebeke (1382) - Filips van Artevelde valt in de strijd",
    imageDescFR: "La Bataille de Westrozebeke (1382) - Philippe van Artevelde tombe au combat",
    imageDescPCD: "L' Bataille éd Westrozebeke (1382) - Philippe van Artevelde i tombe au combat",
    extraContentNL: "De Slag bij Westrozebeke vond plaats op 27 november 1382. Het Vlaamse burgerleger onder leiding van Filips van Artevelde werd verslagen door het Franse koninklijke leger. Meer dan 25.000 Vlamingen sneuvelden, waaronder Artevelde zelf. Het feit dat onze voorouders Gilles en Zeger overleefden is opmerkelijk gezien de enorme verliezen.",
    extraContentFR: "La Bataille de Westrozebeke eut lieu le 27 novembre 1382. L'armée bourgeoise flamande sous Philippe van Artevelde fut vaincue par l'armée royale française. Plus de 25 000 Flamands périrent, dont Artevelde lui-même. Le fait que nos ancêtres Gilles et Zeger aient survécu est remarquable vu les pertes énormes.",
    extraContentPCD: "L' Bataille éd Westrozebeke ale a eu lieu l' 27 novembre 1382, pindin l' Révolte éd Gand (1379-1385). L'armée bourgeoise flaminde d' quasimint 40 000 honmes, sous Philippe van Artevelde, ale s' battot conte l'armée royale française éd Charles VI. Pus d' 25 000 Flaminds i ont péri, pi Artevelde aveuc. Ch'est gramint remarquabe qu' nos anchêtes Gilles pi Zeger i aient survécu vu chés pertes énormes - rin qu'eune tiote fraction d' l'armée flaminde ale a réussi à s'in sauver.",
    icon: "swords",
  },
  {
    year: "ca. 1550",
    title: "Bauduin Deleforge",
    description:
      "L' pus anchien anchête qu' on peut identifier dins l' lignée Deforce. I l'est mort in 1613 à Halluin. D'origine picarde, dins l' région au sud d' Lile.",
  },
  {
    year: "ca. 1590",
    title: "Hypolite Deleforge",
    description:
      "Fils d' Bauduin. Marié vers 1620 à Santes aveuc eune femme inconnue. Père d' Hubert Deleforge senior (~1630).",
  },
  {
    year: "ca. 1630",
    title: "Hubert Deleforge senior",
    description:
      "Fils d'Hypolite. Marié aveuc Marie Grimbel d' Beaucamps-Ligny. Elle étot fille d' Michel Grimbel pi Madeleine Rogier d' Loos. Parints d' note anchête fondateur Hubert.",
  },
  {
    year: "1662",
    title: "Naissance d' l'anchête fondateur Hubert",
    description:
      "Hubert Deleforge naît à Hallennes-lez-Haubourdin, fils d' Hubert senior pi Marie Grimbel. I d'viendra pus tard l' fondateur d' note branche ouest-flaminde.",
  },
  {
    year: "1685",
    title: "Contrat d' mariage à Lile",
    description:
      "L' 18 avri 1685, Hubert Deleforge pi Antoinette Follet s' mariétent devant l' notaire Jacques Anselme Le Francq à Lile. Antoinette étot fille du maître-chirurgien Jean Follet d' Capinghem. Les deux familes apportèrent chacune 400 livres parisis comme dot.",
    image: huwelijkscontract,
    imageDescNL: "Het Huwelijkscontract, Jan Josef Horemans II (1768) - Ondertekening van een huwelijkscontract in de 18e eeuw",
    imageDescFR: "Le Contrat de Mariage, Jan Josef Horemans II (1768) - Signature d'un contrat de mariage au XVIIIe siècle",
    imageDescPCD: "L' Contrat d' Mariage, Jan Josef Horemans II (1768) - Signature d'un contrat d' mariage au XVIIIe siècle",
    extraContentNL: "De bruidsschat van 2×400 pond parisis (totaal 800 pond) was een aanzienlijk bedrag. De livre parisis was een middeleeuwse Franse munteenheid. In 1685 kon men hiervoor ongeveer 2-3 hectare landbouwgrond kopen, of een bescheiden woning. Dit toont aan dat beide families tot de gegoede burgerij behoorden.",
    extraContentFR: "La dot de 2×400 livres parisis (total 800 livres) représentait une somme considérable. La livre parisis était une unité monétaire française médiévale. En 1685, cela permettait d'acheter environ 2-3 hectares de terres agricoles ou une maison modeste. Cela montre que les deux familles appartenaient à la bourgeoisie aisée.",
    extraContentPCD: "L' dot d' 2×400 livres parisis (total 800 livres) représentot eune somme considérabe. L' livre parisis étot eune unité monétaire française médiévale. In 1685, ch'étot assez pour achter environ 2-3 hectares d' terres agricoles ou eune maison modeste. Cho montre qu' les deux familes appartenotent à l' bourgeoisie aisée.",
    icon: "coins",
  },
  {
    year: "1699",
    title: "L' grande migration",
    description:
      "Hubert vind s' propriété à Hallennes pi s' dirige 50 km vers l' nord in Flandre Occidentale. Preumière mintion 'ex Hemelgem' (Emelgem). Les guerres d' Louis XIV pi l'instabilité économique poussèrent l' famile vers des lieus pus sûrs.",
    extraContentNL: "De late 17e eeuw was een turbulente periode in de Zuidelijke Nederlanden. De oorlogen van Lodewijk XIV (1667-1713) brachten verwoesting en economische onzekerheid. Veel families trokken noordwaarts naar de Oostenrijkse Nederlanden voor stabiliteit. De reis van 50 km van Hallennes naar Emelgem duurde destijds meerdere dagen met paard en wagen.",
    extraContentFR: "La fin du XVIIe siècle fut une période turbulente dans les Pays-Bas méridionaux. Les guerres de Louis XIV (1667-1713) apportèrent dévastation et incertitude économique. De nombreuses familles migrèrent vers le nord aux Pays-Bas autrichiens pour plus de stabilité. Le voyage de 50 km de Hallennes à Emelgem prenait plusieurs jours en charrette à cheval.",
    extraContentPCD: "L' fin du XVIIe siècle fut eune période turbulinte dins les Pays-Bas méridionaux. Les guerres d' Louis XIV (1667-1713) apportèrent dévastation pi incertitude économique. Gramint d' familes migrèrent vers l' nord aux Pays-Bas autrichiens pour pus d' stabilité. L' voyage d' 50 km d' Hallennes à Emelgem prinot plusieurs jours in charrette à ch'val.",
    icon: "map",
  },
  {
    year: "1718",
    title: "Mariage d' Jacobus Franciscus",
    description:
      "L' fils Jacobus Franciscus Deleforge (1694-1772) épouse l' 30 avri 1718 à Izegem Veronica Barbier. I s'installe à Ardooie pi a 9 éfants. Note anchête direct.",
  },
  {
    year: "1729",
    title: "Décès des anchêtes fondateurs",
    description:
      "Antoinette Follet décède l' 19 avri 1729 à Izegem. Hubert décède peu après, ossi in 1729. L' famile est maintenant complètemint inracinée in Flandre Occidentale.",
  },
  {
    year: "1731-1807",
    title: "Georgius Delforce",
    description:
      "Fils d' Jacobus Franciscus. Preumière génération à s'établir formellement comme carpintier. L' début d' la tradition familiale dins l' travail du bos.",
    image: timmermansatelier,
    imageDescNL: "Een timmermanswerkplaats, Pieter Snyers (18e eeuw) - Het ambacht dat generaties Deforce zou kenmerken",
    imageDescFR: "Un atelier de menuisier, Pieter Snyers (XVIIIe siècle) - Le métier qui caractériserait des générations de Deforce",
    imageDescPCD: "Un atelier d' carpintier, Pieter Snyers (XVIIIe siècle) - L' métier qui caractériserot des générations d' Deforce",
    extraContentNL: "Georgius Delforce vestigde de familietraditie in houtbewerking die tot in de 20e eeuw zou voortduren. Het timmermansambacht was in de 18e eeuw een gerespecteerd beroep dat vaardigheden vereiste in zowel constructie als fijn houtwerk. Het atelier was vaak verbonden aan het woonhuis, waar de kennis van vader op zoon werd doorgegeven.",
    extraContentFR: "Georgius Delforce établit la tradition familiale du travail du bois qui perdurerait jusqu'au XXe siècle. Le métier de charpentier était au XVIIIe siècle une profession respectée nécessitant des compétences en construction et en ébénisterie fine. L'atelier était souvent attaché à la maison, où le savoir-faire se transmettait de père en fils.",
    extraContentPCD: "Georgius Delforce a établi l' tradition familiale du travail du bos qui perdurerot jusqu'au XXe siècle. L' métier d' carpintier étot au XVIIIe siècle eune profession respectée nécessitant des compétinces in construction pi in ébénisterie fine. L'atelier étot souvint attaché à l' maison, ousque l' savoir-faire s' transmettot d' père in fils.",
    icon: "hammer",
  },
  {
    year: "1815-1871",
    title: "Jean François Deforche",
    description:
      "L' preumier anchête dont on peut clairmint documinter l' profession par des actes. Carpintier pi minusier à Emelgem. Marié aveuc Francisca Vandewalle, 8 éfants dont Charles Louis.",
  },
  {
    year: "1857-1938",
    title: "Charles-Louis Deforce",
    description:
      "Arrière-grand-père, né à Emelgem. Service militaire 1877-1880 comme 'mineur de 1re classe'. Marié trois fos. Aveuc s' preumière femme Marie Leonie Vandenbroucke, 8 éfants dont seulmint 3 survécurent.",
  },
  {
    year: "1894-1963",
    title: "Marcel August Deforce",
    description:
      "Fils d' Charles-Louis pi Marie Leonie. Ébéniste dins l'intreprise familiale 'M. Deforce & Fils'. Marié aveuc Magdalena Geldof. Grand-père d' l'auteur.",
  },
  {
    year: "1962",
    title: "Preumière réunion d' famile",
    description:
      "Grande réunion d' famile à l' maison parintale au Vandenbogaerdelaan 27 à Izegem. Photo histourique d' plusieurs générations Deforce.",
    image: reunionImage,
    imageDescNL: "Familiereünie 1962 - Meerdere generaties Deforce verenigd bij het ouderlijk huis",
    imageDescFR: "Réunion de famille 1962 - Plusieurs générations Deforce réunies à la maison parentale",
    imageDescPCD: "Réunion d' famile 1962 - Plusieurs générations Deforce réunies à l' maison parintale",
    extraContentNL: "Deze historische foto toont de uitgebreide Deforce-familie in 1962. Het ouderlijk huis aan de Vandenbogaerdelaan 27 te Izegem was jarenlang het verzamelpunt voor familiebijeenkomsten. Deze reünie markeerde een moment van eenheid voor een familie die inmiddels over heel België verspreid was geraakt.",
    extraContentFR: "Cette photo historique montre la famille Deforce élargie en 1962. La maison parentale au Vandenbogaerdelaan 27 à Izegem fut pendant des années le point de rassemblement pour les réunions familiales. Cette réunion marqua un moment d'unité pour une famille désormais dispersée dans toute la Belgique.",
    extraContentPCD: "Chete photo histourique montre l' famile Deforce élargie in 1962. L' maison parintale au Vandenbogaerdelaan 27 à Izegem fut pendant des années l' point d' rassemblémint pour les réunions familiales. Chete réunion marqua un momint d'unité pour eune famile désormais dispersée dins toute l' Belgique.",
    icon: "users",
  },
  {
    year: "2024",
    title: "Grande Réunion d' Famile",
    description:
      "L' diminche 29 septembre 2024, 112 d'chindants d' Marcel Deforce pi Magdalena Geldof s' réunissent au Prullenbos à Laarne. Un nouviau chapitre dins note histouère familiale.",
    image: reunion2024Image,
    imageDescNL: "Familiereünie 2024 - 112 afstammelingen van Marcel en Magdalena verenigd in Het Prullenbos",
    imageDescFR: "Réunion de famille 2024 - 112 descendants de Marcel et Magdalena réunis au Prullenbos",
    imageDescPCD: "Réunion d' famile 2024 - 112 d'chindants d' Marcel pi Magdalena réunis au Prullenbos",
    extraContentNL: "De reünie van 2024 was de grootste familiebijeenkomst ooit met 112 aanwezigen. Van de kleinste kinderen tot de oudste familieleden, vier generaties kwamen samen om de familieband te vieren. Het Prullenbos in Laarne bood de perfecte locatie voor deze gedenkwaardige dag.",
    extraContentFR: "La réunion de 2024 fut le plus grand rassemblement familial jamais organisé avec 112 participants. Des plus petits enfants aux membres les plus âgés, quatre générations se sont réunies pour célébrer les liens familiaux. Le Prullenbos à Laarne offrit le cadre parfait pour cette journée mémorable.",
    extraContentPCD: "L' réunion d' 2024 fut l' pus grand rassemblémint familial jamais organisé aveuc 112 participants. Des pus p'tits éfants aux minbes les pus âgés, quatre générations s' sont réunies pour célébrer les liens familiaux. L' Prullenbos à Laarne offrit l' cadre parfait pour chete journée mémorabe.",
    icon: "party",
  },
  {
    year: "2026",
    title: "Ch' live",
    description:
      "Marc Deforce rassembe 25 ans d' richerche généalogique in un récit lisibe, à l'occasion d' sin quatre-vingtième anniversaire.",
  },
];

const TimelineItem = ({
  event,
  index,
  language,
}: {
  event: TimelineEvent;
  index: number;
  language: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const isEven = index % 2 === 0;
  const [showImage, setShowImage] = useState(!!event.image);

  const hasImage = !!event.image;
  const imageDesc = language === 'vls' ? (event.imageDescNL) : language === 'pcd' ? (event.imageDescPCD || event.imageDescFR) : language === 'fr' ? event.imageDescFR : event.imageDescNL;
  const extraContent = language === 'vls' ? (event.extraContentVLS || event.extraContentNL) : language === 'pcd' ? (event.extraContentPCD || event.extraContentFR) : language === 'fr' ? event.extraContentFR : event.extraContentNL;

  const getIcon = () => {
    switch (event.icon) {
      case "swords": return Swords;
      case "map": return MapPin;
      case "hammer": return Hammer;
      case "users": return Users;
      case "party": return PartyPopper;
      case "coins":
      default: return Coins;
    }
  };

  const getButtonLabel = () => {
    if (language === 'en') {
      switch (event.icon) {
        case "swords": return "View the battle";
        case "map": return "View the migration";
        case "hammer": return "View the workshop";
        case "users": return "View the reunion";
        case "party": return "View reunion 2024";
        default: return "View visualization";
      }
    } else if (language === 'es') {
      switch (event.icon) {
        case "swords": return "Ver la batalla";
        case "map": return "Ver la migración";
        case "hammer": return "Ver el taller";
        case "users": return "Ver la reunión";
        case "party": return "Ver reunión 2024";
        default: return "Ver visualización";
      }
    } else if (language === 'vls') {
      switch (event.icon) {
        case "swords": return "Bekiek de veldslag";
        case "map": return "Bekiek de migroasje";
        case "hammer": return "Bekiek t atelier";
        case "users": return "Bekiek de reünie";
        case "party": return "Bekiek reünie 2024";
        default: return "Bekiek visualisoasje";
      }
    } else if (language === 'pcd') {
      switch (event.icon) {
        case "swords": return "Voér l' bataille";
        case "map": return "Voér l' migration";
        case "hammer": return "Voér l'atelier";
        case "users": return "Voér l' réunion";
        case "party": return "Voér l' réunion 2024";
        default: return "Voér l' visualisation";
      }
    } else if (language === 'fr') {
      switch (event.icon) {
        case "swords": return "Voir la bataille";
        case "map": return "Voir la migration";
        case "hammer": return "Voir l'atelier";
        case "users": return "Voir la réunion";
        case "party": return "Voir la réunion 2024";
        default: return "Voir la visualisation";
      }
    } else if (language === 'de') {
      switch (event.icon) {
        case "swords": return "Schlacht ansehen";
        case "map": return "Migration ansehen";
        case "hammer": return "Werkstatt ansehen";
        case "users": return "Treffen ansehen";
        case "party": return "Treffen 2024 ansehen";
        default: return "Visualisierung ansehen";
      }
    } else {
      switch (event.icon) {
        case "swords": return "Bekijk de veldslag";
        case "map": return "Bekijk de migratie";
        case "hammer": return "Bekijk het atelier";
        case "users": return "Bekijk de reünie";
        case "party": return "Bekijk reünie 2024";
        default: return "Bekijk visualisatie";
      }
    }
  };

  const getDetailTitle = () => {
    if (language === 'en') {
      switch (event.icon) {
        case "swords": return "The Battle of 1382";
        case "map": return "The Great Migration";
        case "hammer": return "The Carpenter's Workshop";
        case "users": return "Family Reunion 1962";
        case "party": return "Family Reunion 2024";
        default: return "The Dowry of 1685";
      }
    } else if (language === 'es') {
      switch (event.icon) {
        case "swords": return "La Batalla de 1382";
        case "map": return "La Gran Migración";
        case "hammer": return "El Taller del Carpintero";
        case "users": return "Reunión Familiar 1962";
        case "party": return "Reunión Familiar 2024";
        default: return "La Dote de 1685";
      }
    } else if (language === 'vls') {
      switch (event.icon) {
        case "swords": return "De Veldslag van 1382";
        case "map": return "De Grôote Migroasje";
        case "hammer": return "T Timmermaswerkploatse";
        case "users": return "Familiereünie 1962";
        case "party": return "Familiereünie 2024";
        default: return "De Bruudsschat van 1685";
      }
    } else if (language === 'pcd') {
      switch (event.icon) {
        case "swords": return "L' Bataille éd 1382";
        case "map": return "L' Grande Migration";
        case "hammer": return "L'Atelier du Carpintier";
        case "users": return "Réunion d' Famile 1962";
        case "party": return "Réunion d' Famile 2024";
        default: return "L' Dot d' 1685";
      }
    } else if (language === 'fr') {
      switch (event.icon) {
        case "swords": return "La Bataille de 1382";
        case "map": return "La Grande Migration";
        case "hammer": return "L'Atelier de Menuisier";
        case "users": return "Réunion de Famille 1962";
        case "party": return "Réunion de Famille 2024";
        default: return "La Dot de 1685";
      }
    } else if (language === 'de') {
      switch (event.icon) {
        case "swords": return "Die Schlacht von 1382";
        case "map": return "Die Große Migration";
        case "hammer": return "Die Zimmermannswerkstatt";
        case "users": return "Familientreffen 1962";
        case "party": return "Familientreffen 2024";
        default: return "Die Mitgift von 1685";
      }
    } else {
      switch (event.icon) {
        case "swords": return "De Veldslag van 1382";
        case "map": return "De Grote Migratie";
        case "hammer": return "Het Timmermansatelier";
        case "users": return "Familiereünie 1962";
        case "party": return "Familiereünie 2024";
        default: return "De Bruidsschat van 1685";
      }
    }
  };

  const IconComponent = getIcon();

  return (
    <>
      <div
        ref={ref}
        className={`flex items-center gap-4 md:gap-8 ${
          isEven ? "md:flex-row" : "md:flex-row-reverse"
        }`}
      >
        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}
        >
          <div className="bg-card p-6 rounded-lg shadow-card border border-border">
            <span className="font-serif text-2xl md:text-3xl font-bold text-accent">
              {event.year}
            </span>
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-primary mt-2 mb-3">
              {event.title}
            </h3>
            <p className="font-sans text-foreground/75 leading-relaxed">
              {event.description}
            </p>
            
            {/* Extra content for special events */}
            {hasImage && (
              <div className="mt-4 pt-4 border-t border-border">
                <button
                  onClick={() => setShowImage(!showImage)}
                  className={`flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors ${isEven ? 'md:ml-auto' : ''}`}
                >
                  <IconComponent className="w-4 h-4" />
                  {getButtonLabel()}
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Center dot */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4 }}
          className="relative z-10 flex-shrink-0"
        >
          <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-4 border-background shadow-lg ${hasImage ? 'bg-primary' : 'bg-accent'}`} />
        </motion.div>

        {/* Spacer for alignment */}
        <div className="flex-1 hidden md:block" />
      </div>

      {/* Expandable image section */}
      {hasImage && showImage && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="my-6 md:mx-12"
        >
          <motion.div 
            className="bg-card rounded-xl overflow-hidden border border-border shadow-elevated"
            initial={{ scale: 0.95 }}
            animate={isInView ? { scale: 1 } : { scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <motion.div 
                className="relative overflow-hidden"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <motion.img
                  src={event.image}
                  alt={imageDesc || event.title}
                  className="w-full h-full object-cover min-h-[250px]"
                  initial={{ scale: 1.1 }}
                  animate={isInView ? { scale: 1 } : { scale: 1.1 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  loading="lazy"
                  decoding="async"
                  width={623}
                  height={468}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <p className="text-white text-sm font-medium leading-snug">
                    {imageDesc}
                  </p>
                </motion.div>
              </motion.div>
              
              {/* Content */}
              <motion.div 
                className="p-6 flex flex-col justify-center"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <motion.div 
                  className="flex items-center gap-3 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                >
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-primary">
                    {getDetailTitle()}
                  </h4>
                </motion.div>
                
                <motion.p 
                  className="text-foreground/80 leading-relaxed text-sm mb-4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  {extraContent}
                </motion.p>
                
                {/* Visual representation - only show dowry bars for coins icon */}
                {event.icon === "coins" && (
                  <motion.div 
                    className="bg-primary/5 rounded-lg p-4 border border-primary/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary">
                        {language === 'de' ? 'Familie Deleforge' : language === 'en' ? 'Deleforge Family' : language === 'es' ? 'Familia Deleforge' : language === 'vls' ? 'Familie Deleforge' : language === 'pcd' ? 'Famile Deleforge' : language === 'fr' ? 'Famille Deleforge' : 'Familie Deleforge'}
                      </span>
                      <span className="font-serif font-bold text-accent">400 £</span>
                    </div>
                    <div className="w-full bg-accent/20 rounded-full h-2 mb-3">
                      <motion.div 
                        className="bg-accent h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "50%" } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
                      />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-primary">
                        {language === 'de' ? 'Familie Follet' : language === 'en' ? 'Follet Family' : language === 'es' ? 'Familia Follet' : language === 'vls' ? 'Familie Follet' : language === 'pcd' ? 'Famile Follet' : language === 'fr' ? 'Famille Follet' : 'Familie Follet'}
                      </span>
                      <span className="font-serif font-bold text-accent">400 £</span>
                    </div>
                    <div className="w-full bg-accent/20 rounded-full h-2 mb-3">
                      <motion.div 
                        className="bg-accent h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "50%" } : { width: 0 }}
                        transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                      />
                    </div>
                    <div className="pt-2 border-t border-primary/10 flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">
                        {language === 'de' ? 'Gesamt' : language === 'en' ? 'Total' : language === 'es' ? 'Total' : language === 'vls' ? 'Totaal' : language === 'pcd' ? 'Total' : language === 'fr' ? 'Total' : 'Totaal'}
                      </span>
                      <span className="font-serif text-lg font-bold text-primary">800 £ parisis</span>
                    </div>
                  </motion.div>
                )}

                {/* Battle stats for 1382 */}
                {event.icon === "swords" && (
                  <motion.div 
                    className="bg-primary/5 rounded-lg p-4 border border-primary/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <motion.div 
                        className="text-center"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.4, delay: 1.1, type: "spring" }}
                      >
                        <div className="text-2xl font-serif font-bold text-accent">25.000+</div>
                        <div className="text-xs text-muted-foreground">{language === 'de' ? 'Flämische Opfer' : language === 'en' ? 'Flemish victims' : language === 'es' ? 'Víctimas flamencas' : language === 'vls' ? 'Vlaamsche slachtoffers' : language === 'pcd' ? 'Victimes flamindes' : language === 'fr' ? 'Victimes flamandes' : 'Vlaamse slachtoffers'}</div>
                      </motion.div>
                      <motion.div 
                        className="text-center"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.4, delay: 1.2, type: "spring" }}
                      >
                        <div className="text-2xl font-serif font-bold text-accent">1382</div>
                        <div className="text-xs text-muted-foreground">27 {language === 'de' ? 'November' : language === 'en' ? 'November' : language === 'es' ? 'noviembre' : language === 'vls' ? 'november' : language === 'pcd' ? 'novembre' : language === 'fr' ? 'novembre' : 'november'}</div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Migration stats */}
                {event.icon === "map" && (
                  <motion.div 
                    className="bg-primary/5 rounded-lg p-4 border border-primary/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <motion.div 
                        className="text-center"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.4, delay: 1.1, type: "spring" }}
                      >
                        <div className="text-2xl font-serif font-bold text-accent">50</div>
                        <div className="text-xs text-muted-foreground">km</div>
                      </motion.div>
                      <motion.div 
                        className="text-center"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.4, delay: 1.2, type: "spring" }}
                      >
                        <div className="text-2xl font-serif font-bold text-accent">1699</div>
                        <div className="text-xs text-muted-foreground">{language === 'de' ? 'Jahr' : language === 'en' ? 'Year' : language === 'es' ? 'Año' : language === 'vls' ? 'Joar' : language === 'pcd' ? 'Année' : language === 'fr' ? 'Année' : 'Jaar'}</div>
                      </motion.div>
                      <motion.div 
                        className="text-center"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.4, delay: 1.3, type: "spring" }}
                      >
                        <div className="text-2xl font-serif font-bold text-accent">N</div>
                        <div className="text-xs text-muted-foreground">{language === 'de' ? 'Richtung' : language === 'en' ? 'Direction' : language === 'es' ? 'Dirección' : language === 'vls' ? 'Richting' : language === 'pcd' ? 'Direction' : language === 'fr' ? 'Direction' : 'Richting'}</div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Reunion 2024 stats */}
                {event.icon === "party" && (
                  <motion.div 
                    className="bg-primary/5 rounded-lg p-4 border border-primary/10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <motion.div 
                        className="text-center"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.4, delay: 1.1, type: "spring" }}
                      >
                        <div className="text-2xl font-serif font-bold text-accent">112</div>
                        <div className="text-xs text-muted-foreground">{language === 'de' ? 'Teilnehmer' : language === 'en' ? 'Participants' : language === 'es' ? 'Participantes' : language === 'vls' ? 'Deelnemers' : language === 'pcd' ? 'Participants' : language === 'fr' ? 'Participants' : 'Deelnemers'}</div>
                      </motion.div>
                      <motion.div 
                        className="text-center"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.4, delay: 1.2, type: "spring" }}
                      >
                        <div className="text-2xl font-serif font-bold text-accent">4</div>
                        <div className="text-xs text-muted-foreground">{language === 'de' ? 'Generationen' : language === 'en' ? 'Generations' : language === 'es' ? 'Generaciones' : language === 'vls' ? 'Generoasjes' : language === 'pcd' ? 'Générations' : language === 'fr' ? 'Générations' : 'Generaties'}</div>
                      </motion.div>
                      <motion.div 
                        className="text-center"
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{ duration: 0.4, delay: 1.3, type: "spring" }}
                      >
                        <div className="text-2xl font-serif font-bold text-accent">2024</div>
                        <div className="text-xs text-muted-foreground">29 sept</div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                
                <motion.button
                  onClick={() => setShowImage(false)}
                  className="mt-4 text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 self-end"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.3, delay: 1.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <X className="w-4 h-4" />
                  {language === 'de' ? 'Schließen' : language === 'en' ? 'Close' : language === 'es' ? 'Cerrar' : language === 'vls' ? 'Sluutn' : language === 'pcd' ? 'Frumer' : language === 'fr' ? 'Fermer' : 'Sluiten'}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

const timelineEventsVLS: TimelineEvent[] = [
  {
    year: "1382",
    title: "De oudste spôorn",
    description:
      "Vôorouders Gilles van den Neste en Zeger Van Steenkiste die vochtn mee in de Slag by Westrozebeke in 't léger van Filips van Artevelde. 't Zyn de vroegste gedocumenteerde vôorouders in uuze stamboom.",
    image: slagWestrozebeke,
    imageDescNL: "De Slag bij Westrozebeke (1382) - Filips van Artevelde valt in de strijd",
    imageDescFR: "La Bataille de Westrozebeke (1382) - Philippe van Artevelde tombe au combat",
    imageDescPCD: "L' Bataille éd Westrozebeke (1382) - Philippe van Artevelde i tombe au combat",
    extraContentVLS: "De Slag by Westrozebeke die gebeurde ip 27 november 1382, tydens den Gentschen Opstand (1379-1385). 't Vlaamsche borgerleger van e stuk of 40.000 man, under Filips van Artevelde, stond tegenover 't Fransche koninkslelik leger van Karel VI. De slag was e stuk van e grôoter machtsstryd tusschen de Vlaamsche steên en den graaf van Vloanderen, die gesteund wier deur de Fransche krôone. Mee dan 25.000 Vlamingen zyn gesneuveld, en Artevelde zelf ook. 't Is pertank wel remarquabel da uuze vôorouders Gilles en Zeger 't overleeft èn, want 't was moar e klyn bitje da der ontsnapt is an 't bloedbad.",
    icon: "swords",
  },
  {
    year: "ca. 1550",
    title: "Bauduin Deleforge",
    description:
      "Den vroegsten vôorvader die me in de noamlien Deforce kunn oanwyzn. Em is gestôrvn in 1613 te Halluin. Van Pikoardischen oorsprong, in de streeke ten zuudn van Rysel.",
  },
  {
    year: "ca. 1590",
    title: "Hypolite Deleforge",
    description:
      "Zeune van Bauduin. Em trouwde rond 1620 te Santes mee e onbekende vrouwe. Vader van Hubert Deleforge senior (~1630).",
  },
  {
    year: "ca. 1630",
    title: "Hubert Deleforge senior",
    description:
      "Zeune van Hypolite. Em trouwde mee Marie Grimbel uut Beaucamps-Ligny. Ze was dochter van Michel Grimbel en Madeleine Rogier uut Loos. 't Zyn d'ouders van uuze stamvader Hubert.",
  },
  {
    year: "1662",
    title: "Geboarte stamvader Hubert",
    description:
      "Hubert Deleforge wier geboarn te Hallennes-lez-Haubourdin ols zeune van Hubert senior en Marie Grimbel. Em zou later de stichter worn van uuze West-Vloomse tak.",
  },
  {
    year: "1685",
    title: "Huwelieksoakte te Rysel",
    description:
      "Ip 18 april 1685 trouwn Hubert Deleforge en Antoinette Follet veur notaris Jacques Anselme Le Francq te Rysel. Antoinette was dochter van meester-chirurgyn Jean Follet uut Capinghem. Beie families brochtn elk 400 pond parisis ols bruudsschat in.",
    image: huwelijkscontract,
    imageDescNL: "Het Huwelijkscontract, Jan Josef Horemans II (1768) - Ondertekening van een huwelijkscontract in de 18e eeuw",
    imageDescFR: "Le Contrat de Mariage, Jan Josef Horemans II (1768) - Signature d'un contrat de mariage au XVIIIe siècle",
    imageDescPCD: "L' Contrat d' Mariage, Jan Josef Horemans II (1768) - Signature d'un contrat d' mariage au XVIIIe siècle",
    extraContentVLS: "De bruudsschat van 2×400 pond parisis (in totaal 800 pond) was e schôon somme geld. De livre parisis was e middeleeuwsche Fransche munteenheid. In 1685 kostege mee da geld e stuk of 2-3 hectare landbouwgrond kôopn, of e bescheidn uus. Da toont an da beie families pertank by de gegoede borgerye behoartn.",
    icon: "coins",
  },
  {
    year: "1699",
    title: "De grôote migroasje",
    description:
      "Hubert verkoopt zyn eigendom in Hallennes en trekt 50 km noordwoarts noar West-Vloanderen. Eerste vermelding 'ex Hemelgem' (Emelgem). D'oorlogn van Lodewyk XIV en d'economische onrust dreevn de familie noar veiliger ôordn.",
    extraContentVLS: "De late 17e ieuw was e turbulente periode in de Zuidelike Nederlanden. Lodewyk XIV van Frankryk voerde meerdere verwoestende oorlogn: de Devolutieoorlog (1667-1668), de Hollandsche Oorlog (1672-1678), de Negenjoarigen Oorlog (1688-1697) en de Spaansche Successieoorlog (1701-1714). Die conflicten brochtn plunderingen, brandschattingen en economische chaos. Vele families, gelyk de uuze, trokken noardwoarts noar de Oostenryksche Nederlanden veur mee stabiliteit. De reys van 50 km van Hallennes noar Emelgem duurde destyds meerdere doagn mee peird en wagen.",
    icon: "map",
  },
  {
    year: "1718",
    title: "Jacobus Franciscus trouwt",
    description:
      "Zeune Jacobus Franciscus Deleforge (1694-1772) trouwt ip 30 april 1718 te Izegem mee Veronica Barbier. Em vestigt em in Ardooie en krygt 9 kinders. Uuze rechtstreeksche vôorvader.",
  },
  {
    year: "1729",
    title: "Overlyen stamouders",
    description:
      "Antoinette Follet overlyt ip 19 april 1729 te Izegem. Hubert overlyt kort derno, ook in 1729. De familie is nui volledig geworteld in West-Vloanderen.",
  },
  {
    year: "1731-1807",
    title: "Georgius Delforce",
    description:
      "Zeune van Jacobus Franciscus. D'eerste generoasje die hem formeel ols timmerman vestigt. 't Begin van de familiale tradisje in houtbewerking.",
    image: timmermansatelier,
    imageDescNL: "Een timmermanswerkplaats, Pieter Snyers (18e eeuw) - Het ambacht dat generaties Deforce zou kenmerken",
    imageDescFR: "Un atelier de menuisier, Pieter Snyers (XVIIIe siècle) - Le métier qui caractériserait des générations de Deforce",
    imageDescPCD: "Un atelier d' carpintier, Pieter Snyers (XVIIIe siècle) - L' métier qui caractériserot des générations d' Deforce",
    extraContentVLS: "Georgius Delforce vestigde de familietradisje in houtbewerking die tot in de 20e ieuw zou vôortduren. 't Timmermansambacht was in de 18e ieuw e gerespecteerd beroep da voairdigheden vereischte in zowel constructie ols fyn houtwerk. 't Atelier was dikwyls verbondn an 't wônuus, woar da de kennis van vader ip zeune wier deurgegevn.",
    icon: "hammer",
  },
  {
    year: "1815-1871",
    title: "Jean François Deforche",
    description:
      "D'eerste vôorouder woarvan da me 't beroep eenduidig mee oaktn kunn onderbouwn. Timmerman en schrynwerker te Emelgem. Getrouwd mee Francisca Vandewalle, 8 kinders woarunder Charles Louis.",
  },
  {
    year: "1857-1938",
    title: "Charles-Louis Deforce",
    description:
      "Overgrôotvader, geboarn te Emelgem. Légerdiênst 1877-1880 ols 'mineur de 1e classe'. Drymaal gehuwd. Mee z'n eerste vrouwe Marie Leonie Vandenbroucke 8 kinders, woarvan da der mor 3 't overleefd èn.",
  },
  {
    year: "1894-1963",
    title: "Marcel August Deforce",
    description:
      "Zeune van Charles-Louis en Marie Leonie. Meubelmoaker in 't familiebedryf 'M. Deforce & Zeuns'. Em trouwde mee Magdalena Geldof. Grôotvader van den auteur.",
  },
  {
    year: "1962",
    title: "Eerste familiereünie",
    description:
      "Grôote familiereünie by 't ouderlik uus in de Vandenbogaerdelaan 27 te Izegem. E historische foto van meerdere generoasjes Deforce.",
    image: reunionImage,
    imageDescNL: "Familiereünie 1962 - Meerdere generaties Deforce verenigd bij het ouderlijk huis",
    imageDescFR: "Réunion de famille 1962 - Plusieurs générations Deforce réunies à la maison parentale",
    imageDescPCD: "Réunion d' famile 1962 - Plusieurs générations Deforce réunies à l' maison parintale",
    extraContentVLS: "Dezen historische foto toont de uutgebreide Deforce-familie in 1962. 't Ouderlik uus an de Vandenbogaerdelaan 27 te Izegem was joarenlank 't verzoamelpunt veur familiebyeenkomsten. Dezen reünie markeerde e momint van eenheid veur e familie die intusschentyd over heel België verspreid was geroakt.",
    icon: "users",
  },
  {
    year: "2024",
    title: "Grôote Familiereünie",
    description:
      "Ip zundag 29 september 2024 kommn 112 ofstammelingen van Marcel Deforce en Magdalena Geldof soamn in Het Prullenbos te Laarne. E nieuw hoofdstuk in uuze familiegeschiedenisse.",
    image: reunion2024Image,
    imageDescNL: "Familiereünie 2024 - 112 afstammelingen van Marcel en Magdalena verenigd in Het Prullenbos",
    imageDescFR: "Réunion de famille 2024 - 112 descendants de Marcel et Magdalena réunis au Prullenbos",
    imageDescPCD: "Réunion d' famile 2024 - 112 d'chindants d' Marcel pi Magdalena réunis au Prullenbos",
    extraContentVLS: "De reünie van 2024 was de grôotste familiebyeenkomste ooit mee 112 oanwezigen. Van de klynste kinders tot de oudste familieleden, vier generoasjes kwoamen soamn om de familieband te vieren. Het Prullenbos in Laarne bood de perfecte locasje veur dezen gedenkwoairdigen dag.",
    icon: "party",
  },
  {
    year: "2026",
    title: "Dit boek",
    description:
      "Marc Deforce brengt 25 joar genealogisch onderzoek soamn in e leesbaar verhaal, ter gelegenheid van z'n tachtigsten verjoardag.",
  },
];

const timelineEventsEN: TimelineEvent[] = [
  {
    year: "1382",
    title: "The oldest traces",
    description: "Ancestors Gilles van den Neste and Zeger Van Steenkiste fight in the Battle of Westrozebeke in Philip van Artevelde's army. The earliest documented ancestors in our family tree.",
    image: slagWestrozebeke,
    imageDescNL: "The Battle of Westrozebeke (1382) - Philip van Artevelde falls in battle",
    imageDescFR: "The Battle of Westrozebeke (1382) - Philip van Artevelde falls in battle",
    extraContentNL: "The Battle of Westrozebeke took place on November 27, 1382, during the Ghent Revolt (1379-1385). The Flemish citizen army of about 40,000 men, led by Philip van Artevelde, faced the French royal army of Charles VI. The battle was part of a broader power struggle between the Flemish cities and the Count of Flanders, who was supported by the French crown. More than 25,000 Flemings perished, including Artevelde himself. The fact that our ancestors Gilles and Zeger survived is remarkable given the enormous losses - only a fraction of the Flemish army escaped the slaughter.",
    extraContentFR: "The Battle of Westrozebeke took place on November 27, 1382, during the Ghent Revolt (1379-1385). The Flemish citizen army of about 40,000 men, led by Philip van Artevelde, faced the French royal army of Charles VI. More than 25,000 Flemings perished, including Artevelde himself. The fact that our ancestors Gilles and Zeger survived is remarkable given the enormous losses.",
    icon: "swords",
  },
  { year: "ca. 1550", title: "Bauduin Deleforge", description: "The earliest ancestor we can identify in the Deforce line. He died in 1613 in Halluin. Of Picard origin, in the region south of Lille." },
  { year: "ca. 1590", title: "Hypolite Deleforge", description: "Son of Bauduin. Married around 1620 in Santes to an unknown woman. Father of Hubert Deleforge senior (~1630)." },
  { year: "ca. 1630", title: "Hubert Deleforge senior", description: "Son of Hypolite. Married Marie Grimbel from Beaucamps-Ligny. She was daughter of Michel Grimbel and Madeleine Rogier from Loos. Parents of our founding ancestor Hubert." },
  { year: "1662", title: "Birth of founding ancestor Hubert", description: "Hubert Deleforge is born in Hallennes-lez-Haubourdin as son of Hubert senior and Marie Grimbel. He would later become the founder of our West Flemish branch." },
  {
    year: "1685",
    title: "Marriage contract in Lille",
    description: "On April 18, 1685, Hubert Deleforge and Antoinette Follet marry before notary Jacques Anselme Le Francq in Lille. Antoinette was daughter of master surgeon Jean Follet from Capinghem. Both families brought 400 pounds parisis each as dowry.",
    image: huwelijkscontract,
    imageDescNL: "The Marriage Contract, Jan Josef Horemans II (1768) - Signing of a marriage contract in the 18th century",
    imageDescFR: "The Marriage Contract, Jan Josef Horemans II (1768) - Signing of a marriage contract in the 18th century",
    extraContentNL: "The dowry of 2×400 pounds parisis (total 800 pounds) was a considerable sum. The livre parisis was a medieval French monetary unit. In 1685, this could buy approximately 2-3 hectares of agricultural land, or a modest house. This shows that both families belonged to the prosperous bourgeoisie.",
    extraContentFR: "The dowry of 2×400 pounds parisis (total 800 pounds) was a considerable sum. The livre parisis was a medieval French monetary unit. In 1685, this could buy approximately 2-3 hectares of agricultural land, or a modest house. This shows that both families belonged to the prosperous bourgeoisie.",
    icon: "coins",
  },
  {
    year: "1699",
    title: "The great migration",
    description: "Hubert sells his property in Hallennes and travels 50 km north to West Flanders. First mention 'ex Hemelgem' (Emelgem). The wars of Louis XIV and economic unrest drove the family to safer places.",
    extraContentNL: "The late 17th century was a turbulent period in the Southern Netherlands. The wars of Louis XIV (1667-1713) brought devastation and economic uncertainty. Many families moved northward to the Austrian Netherlands for stability. The journey of 50 km from Hallennes to Emelgem took several days by horse and cart.",
    extraContentFR: "The late 17th century was a turbulent period in the Southern Netherlands. The wars of Louis XIV (1667-1713) brought devastation and economic uncertainty. Many families moved northward to the Austrian Netherlands for stability. The journey of 50 km from Hallennes to Emelgem took several days by horse and cart.",
    icon: "map",
  },
  { year: "1718", title: "Jacobus Franciscus marries", description: "Son Jacobus Franciscus Deleforge (1694-1772) marries Veronica Barbier on April 30, 1718 in Izegem. He settles in Ardooie and has 9 children. Our direct ancestor." },
  { year: "1729", title: "Death of founding ancestors", description: "Antoinette Follet dies on April 19, 1729 in Izegem. Hubert dies shortly after, also in 1729. The family is now fully rooted in West Flanders." },
  {
    year: "1731-1807",
    title: "Georgius Delforce",
    description: "Son of Jacobus Franciscus. First generation to formally establish as carpenter. The beginning of the family tradition in woodworking.",
    image: timmermansatelier,
    imageDescNL: "A carpenter's workshop, Pieter Snyers (18th century) - The craft that would characterize generations of Deforce",
    imageDescFR: "A carpenter's workshop, Pieter Snyers (18th century) - The craft that would characterize generations of Deforce",
    extraContentNL: "Georgius Delforce established the family tradition in woodworking that would continue into the 20th century. The carpentry trade in the 18th century was a respected profession requiring skills in both construction and fine woodwork. The workshop was often attached to the home, where knowledge was passed from father to son.",
    extraContentFR: "Georgius Delforce established the family tradition in woodworking that would continue into the 20th century. The carpentry trade in the 18th century was a respected profession requiring skills in both construction and fine woodwork. The workshop was often attached to the home, where knowledge was passed from father to son.",
    icon: "hammer",
  },
  { year: "1815-1871", title: "Jean François Deforche", description: "The first ancestor whose profession we can unambiguously document with records. Carpenter and joiner in Emelgem. Married to Francisca Vandewalle, 8 children including Charles Louis." },
  { year: "1857-1938", title: "Charles-Louis Deforce", description: "Great-grandfather, born in Emelgem. Military service 1877-1880 as 'mineur de 1e classe'. Married three times. With first wife Marie Leonie Vandenbroucke 8 children, of which only 3 survived." },
  { year: "1894-1963", title: "Marcel August Deforce", description: "Son of Charles-Louis and Marie Leonie. Furniture maker in the family business 'M. Deforce & Sons'. Married Magdalena Geldof. Grandfather of the author." },
  {
    year: "1962",
    title: "First family reunion",
    description: "Large family reunion at the parental home at Vandenbogaerdelaan 27 in Izegem. Historic photo of multiple generations of Deforce.",
    image: reunionImage,
    imageDescNL: "Family Reunion 1962 - Multiple generations of Deforce united at the parental home",
    imageDescFR: "Family Reunion 1962 - Multiple generations of Deforce united at the parental home",
    extraContentNL: "This historic photo shows the extended Deforce family in 1962. The parental home at Vandenbogaerdelaan 27 in Izegem was for years the gathering point for family meetings. This reunion marked a moment of unity for a family that had by then spread across all of Belgium.",
    extraContentFR: "This historic photo shows the extended Deforce family in 1962. The parental home at Vandenbogaerdelaan 27 in Izegem was for years the gathering point for family meetings. This reunion marked a moment of unity for a family that had by then spread across all of Belgium.",
    icon: "users",
  },
  {
    year: "2024",
    title: "Grand Family Reunion",
    description: "On Sunday September 29, 2024, 112 descendants of Marcel Deforce and Magdalena Geldof gather at Het Prullenbos in Laarne. A new chapter in our family history.",
    image: reunion2024Image,
    imageDescNL: "Family Reunion 2024 - 112 descendants of Marcel and Magdalena united at Het Prullenbos",
    imageDescFR: "Family Reunion 2024 - 112 descendants of Marcel and Magdalena united at Het Prullenbos",
    extraContentNL: "The 2024 reunion was the largest family gathering ever with 112 attendees. From the smallest children to the oldest family members, four generations came together to celebrate family ties. Het Prullenbos in Laarne provided the perfect setting for this memorable day.",
    extraContentFR: "The 2024 reunion was the largest family gathering ever with 112 attendees. From the smallest children to the oldest family members, four generations came together to celebrate family ties. Het Prullenbos in Laarne provided the perfect setting for this memorable day.",
    icon: "party",
  },
  { year: "2026", title: "This book", description: "Marc Deforce brings 25 years of genealogical research together in a readable story, on the occasion of his eightieth birthday." },
];

const timelineEventsES: TimelineEvent[] = [
  {
    year: "1382",
    title: "Los rastros más antiguos",
    description: "Los ancestros Gilles van den Neste y Zeger Van Steenkiste luchan en la Batalla de Westrozebeke en el ejército de Felipe van Artevelde. Los primeros ancestros documentados en nuestro árbol genealógico.",
    image: slagWestrozebeke,
    imageDescNL: "La Batalla de Westrozebeke (1382) - Felipe van Artevelde cae en combate",
    imageDescFR: "La Batalla de Westrozebeke (1382) - Felipe van Artevelde cae en combate",
    extraContentNL: "La Batalla de Westrozebeke tuvo lugar el 27 de noviembre de 1382, durante la Revuelta de Gante (1379-1385). El ejército ciudadano flamenco de unos 40.000 hombres, liderado por Felipe van Artevelde, se enfrentó al ejército real francés de Carlos VI. La batalla fue parte de una lucha de poder más amplia entre las ciudades flamencas y el Conde de Flandes, que era apoyado por la corona francesa. Más de 25.000 flamencos perecieron, incluyendo al propio Artevelde. El hecho de que nuestros ancestros Gilles y Zeger sobrevivieran es notable dadas las enormes pérdidas.",
    extraContentFR: "La Batalla de Westrozebeke tuvo lugar el 27 de noviembre de 1382, durante la Revuelta de Gante (1379-1385). El ejército ciudadano flamenco de unos 40.000 hombres, liderado por Felipe van Artevelde, se enfrentó al ejército real francés de Carlos VI. Más de 25.000 flamencos perecieron, incluyendo al propio Artevelde. El hecho de que nuestros ancestros Gilles y Zeger sobrevivieran es notable dadas las enormes pérdidas.",
    icon: "swords",
  },
  { year: "ca. 1550", title: "Bauduin Deleforge", description: "El ancestro más antiguo que podemos identificar en la línea Deforce. Murió en 1613 en Halluin. De origen picardo, en la región al sur de Lille." },
  { year: "ca. 1590", title: "Hypolite Deleforge", description: "Hijo de Bauduin. Se casó alrededor de 1620 en Santes con una mujer desconocida. Padre de Hubert Deleforge senior (~1630)." },
  { year: "ca. 1630", title: "Hubert Deleforge senior", description: "Hijo de Hypolite. Se casó con Marie Grimbel de Beaucamps-Ligny. Era hija de Michel Grimbel y Madeleine Rogier de Loos. Padres de nuestro ancestro fundador Hubert." },
  { year: "1662", title: "Nacimiento del ancestro fundador Hubert", description: "Hubert Deleforge nace en Hallennes-lez-Haubourdin como hijo de Hubert senior y Marie Grimbel. Más tarde se convertiría en el fundador de nuestra rama de Flandes Occidental." },
  {
    year: "1685",
    title: "Contrato matrimonial en Lille",
    description: "El 18 de abril de 1685, Hubert Deleforge y Antoinette Follet se casan ante el notario Jacques Anselme Le Francq en Lille. Antoinette era hija del maestro cirujano Jean Follet de Capinghem. Ambas familias aportaron 400 libras parisis cada una como dote.",
    image: huwelijkscontract,
    imageDescNL: "El Contrato Matrimonial, Jan Josef Horemans II (1768) - Firma de un contrato matrimonial en el siglo XVIII",
    imageDescFR: "El Contrato Matrimonial, Jan Josef Horemans II (1768) - Firma de un contrato matrimonial en el siglo XVIII",
    extraContentNL: "La dote de 2×400 libras parisis (total 800 libras) era una suma considerable. La libra parisis era una unidad monetaria francesa medieval. En 1685, esto podía comprar aproximadamente 2-3 hectáreas de tierra agrícola, o una casa modesta. Esto muestra que ambas familias pertenecían a la burguesía próspera.",
    extraContentFR: "La dote de 2×400 libras parisis (total 800 libras) era una suma considerable. La libra parisis era una unidad monetaria francesa medieval. En 1685, esto podía comprar aproximadamente 2-3 hectáreas de tierra agrícola, o una casa modesta. Esto muestra que ambas familias pertenecían a la burguesía próspera.",
    icon: "coins",
  },
  {
    year: "1699",
    title: "La gran migración",
    description: "Hubert vende su propiedad en Hallennes y viaja 50 km al norte hacia Flandes Occidental. Primera mención 'ex Hemelgem' (Emelgem). Las guerras de Luis XIV y la inestabilidad económica llevaron a la familia a lugares más seguros.",
    extraContentNL: "El final del siglo XVII fue un período turbulento en los Países Bajos del Sur. Las guerras de Luis XIV (1667-1713) trajeron devastación e incertidumbre económica. Muchas familias se trasladaron hacia el norte a los Países Bajos austríacos por estabilidad. El viaje de 50 km de Hallennes a Emelgem tomaba varios días en carreta tirada por caballos.",
    extraContentFR: "El final del siglo XVII fue un período turbulento en los Países Bajos del Sur. Las guerras de Luis XIV (1667-1713) trajeron devastación e incertidumbre económica. Muchas familias se trasladaron hacia el norte a los Países Bajos austríacos por estabilidad. El viaje de 50 km de Hallennes a Emelgem tomaba varios días en carreta tirada por caballos.",
    icon: "map",
  },
  { year: "1718", title: "Jacobus Franciscus se casa", description: "El hijo Jacobus Franciscus Deleforge (1694-1772) se casa con Veronica Barbier el 30 de abril de 1718 en Izegem. Se establece en Ardooie y tiene 9 hijos. Nuestro ancestro directo." },
  { year: "1729", title: "Muerte de los ancestros fundadores", description: "Antoinette Follet muere el 19 de abril de 1729 en Izegem. Hubert muere poco después, también en 1729. La familia está ahora completamente arraigada en Flandes Occidental." },
  {
    year: "1731-1807",
    title: "Georgius Delforce",
    description: "Hijo de Jacobus Franciscus. Primera generación en establecerse formalmente como carpintero. El comienzo de la tradición familiar en el trabajo de la madera.",
    image: timmermansatelier,
    imageDescNL: "Un taller de carpintería, Pieter Snyers (siglo XVIII) - El oficio que caracterizaría a generaciones de Deforce",
    imageDescFR: "Un taller de carpintería, Pieter Snyers (siglo XVIII) - El oficio que caracterizaría a generaciones de Deforce",
    extraContentNL: "Georgius Delforce estableció la tradición familiar en el trabajo de la madera que continuaría hasta el siglo XX. El oficio de carpintero en el siglo XVIII era una profesión respetada que requería habilidades tanto en construcción como en ebanistería fina. El taller a menudo estaba adjunto a la casa, donde el conocimiento se transmitía de padre a hijo.",
    extraContentFR: "Georgius Delforce estableció la tradición familiar en el trabajo de la madera que continuaría hasta el siglo XX. El oficio de carpintero en el siglo XVIII era una profesión respetada que requería habilidades tanto en construcción como en ebanistería fina. El taller a menudo estaba adjunto a la casa, donde el conocimiento se transmitía de padre a hijo.",
    icon: "hammer",
  },
  { year: "1815-1871", title: "Jean François Deforche", description: "El primer ancestro cuya profesión podemos documentar inequívocamente con actas. Carpintero y ebanista en Emelgem. Casado con Francisca Vandewalle, 8 hijos incluyendo Charles Louis." },
  { year: "1857-1938", title: "Charles-Louis Deforce", description: "Bisabuelo, nacido en Emelgem. Servicio militar 1877-1880 como 'mineur de 1e classe'. Casado tres veces. Con su primera esposa Marie Leonie Vandenbroucke 8 hijos, de los cuales solo 3 sobrevivieron." },
  { year: "1894-1963", title: "Marcel August Deforce", description: "Hijo de Charles-Louis y Marie Leonie. Fabricante de muebles en la empresa familiar 'M. Deforce & Hijos'. Casado con Magdalena Geldof. Abuelo del autor." },
  {
    year: "1962",
    title: "Primera reunión familiar",
    description: "Gran reunión familiar en la casa paterna en Vandenbogaerdelaan 27 en Izegem. Foto histórica de múltiples generaciones de Deforce.",
    image: reunionImage,
    imageDescNL: "Reunión Familiar 1962 - Múltiples generaciones de Deforce reunidas en la casa paterna",
    imageDescFR: "Reunión Familiar 1962 - Múltiples generaciones de Deforce reunidas en la casa paterna",
    extraContentNL: "Esta foto histórica muestra a la extensa familia Deforce en 1962. La casa paterna en Vandenbogaerdelaan 27 en Izegem fue durante años el punto de encuentro para las reuniones familiares. Esta reunión marcó un momento de unidad para una familia que para entonces se había dispersado por toda Bélgica.",
    extraContentFR: "Esta foto histórica muestra a la extensa familia Deforce en 1962. La casa paterna en Vandenbogaerdelaan 27 en Izegem fue durante años el punto de encuentro para las reuniones familiares. Esta reunión marcó un momento de unidad para una familia que para entonces se había dispersado por toda Bélgica.",
    icon: "users",
  },
  {
    year: "2024",
    title: "Gran Reunión Familiar",
    description: "El domingo 29 de septiembre de 2024, 112 descendientes de Marcel Deforce y Magdalena Geldof se reúnen en Het Prullenbos en Laarne. Un nuevo capítulo en nuestra historia familiar.",
    image: reunion2024Image,
    imageDescNL: "Reunión Familiar 2024 - 112 descendientes de Marcel y Magdalena reunidos en Het Prullenbos",
    imageDescFR: "Reunión Familiar 2024 - 112 descendientes de Marcel y Magdalena reunidos en Het Prullenbos",
    extraContentNL: "La reunión de 2024 fue el encuentro familiar más grande jamás celebrado con 112 asistentes. Desde los niños más pequeños hasta los miembros más mayores de la familia, cuatro generaciones se reunieron para celebrar los lazos familiares. Het Prullenbos en Laarne proporcionó el escenario perfecto para este memorable día.",
    extraContentFR: "La reunión de 2024 fue el encuentro familiar más grande jamás celebrado con 112 asistentes. Desde los niños más pequeños hasta los miembros más mayores de la familia, cuatro generaciones se reunieron para celebrar los lazos familiares. Het Prullenbos en Laarne proporcionó el escenario perfecto para este memorable día.",
    icon: "party",
  },
  { year: "2026", title: "Este libro", description: "Marc Deforce reúne 25 años de investigación genealógica en una historia legible, con motivo de su octogésimo cumpleaños." },
];

const timelineEventsDE: TimelineEvent[] = [
  {
    year: "1382",
    title: "Die ältesten Spuren",
    description: "Vorfahren Gilles van den Neste und Zeger Van Steenkiste kämpfen in der Schlacht von Westrozebeke in der Armee von Philipp van Artevelde. Die frühesten dokumentierten Vorfahren in unserem Stammbaum.",
    image: slagWestrozebeke,
    imageDescNL: "Die Schlacht von Westrozebeke (1382) - Philipp van Artevelde fällt in der Schlacht",
    imageDescFR: "Die Schlacht von Westrozebeke (1382) - Philipp van Artevelde fällt in der Schlacht",
    extraContentNL: "Die Schlacht von Westrozebeke fand am 27. November 1382 während des Genter Aufstands (1379-1385) statt. Das flämische Bürgerheer von etwa 40.000 Mann unter Philipp van Artevelde stand dem französischen königlichen Heer von Karl VI. gegenüber. Die Schlacht war Teil eines breiteren Machtkampfes zwischen den flämischen Städten und dem Grafen von Flandern, der von der französischen Krone unterstützt wurde. Mehr als 25.000 Flamen fielen, darunter Artevelde selbst. Die Tatsache, dass unsere Vorfahren Gilles und Zeger überlebten, ist angesichts der enormen Verluste bemerkenswert.",
    extraContentFR: "Die Schlacht von Westrozebeke fand am 27. November 1382 während des Genter Aufstands (1379-1385) statt. Das flämische Bürgerheer unter Philipp van Artevelde wurde vom französischen königlichen Heer besiegt. Mehr als 25.000 Flamen fielen, darunter Artevelde selbst. Die Tatsache, dass unsere Vorfahren Gilles und Zeger überlebten, ist angesichts der enormen Verluste bemerkenswert.",
    icon: "swords",
  },
  { year: "ca. 1550", title: "Bauduin Deleforge", description: "Der früheste Vorfahre, den wir in der Linie Deforce identifizieren können. Er starb 1613 in Halluin. Pikardischer Herkunft, in der Region südlich von Lille." },
  { year: "ca. 1590", title: "Hypolite Deleforge", description: "Sohn von Bauduin. Heiratete um 1620 in Santes eine unbekannte Frau. Vater von Hubert Deleforge senior (~1630)." },
  { year: "ca. 1630", title: "Hubert Deleforge senior", description: "Sohn von Hypolite. Heiratete Marie Grimbel aus Beaucamps-Ligny. Sie war die Tochter von Michel Grimbel und Madeleine Rogier aus Loos. Eltern unseres Stammvaters Hubert." },
  { year: "1662", title: "Geburt des Stammvaters Hubert", description: "Hubert Deleforge wird in Hallennes-lez-Haubourdin als Sohn von Hubert senior und Marie Grimbel geboren. Er sollte später der Gründer unseres westflämischen Zweigs werden." },
  {
    year: "1685",
    title: "Ehevertrag in Lille",
    description: "Am 18. April 1685 heiraten Hubert Deleforge und Antoinette Follet vor Notar Jacques Anselme Le Francq in Lille. Antoinette war die Tochter des Meisterchirurgen Jean Follet aus Capinghem. Beide Familien brachten je 400 Pfund Parisis als Mitgift ein.",
    image: huwelijkscontract,
    imageDescNL: "Der Ehevertrag, Jan Josef Horemans II (1768) - Unterzeichnung eines Ehevertrags im 18. Jahrhundert",
    imageDescFR: "Der Ehevertrag, Jan Josef Horemans II (1768) - Unterzeichnung eines Ehevertrags im 18. Jahrhundert",
    extraContentNL: "Die Mitgift von 2×400 Pfund Parisis (insgesamt 800 Pfund) war eine beträchtliche Summe. Das Pfund Parisis war eine mittelalterliche französische Währungseinheit. Im Jahr 1685 konnte man dafür etwa 2-3 Hektar Ackerland oder ein bescheidenes Haus kaufen. Dies zeigt, dass beide Familien zum wohlhabenden Bürgertum gehörten.",
    extraContentFR: "Die Mitgift von 2×400 Pfund Parisis (insgesamt 800 Pfund) war eine beträchtliche Summe. Das Pfund Parisis war eine mittelalterliche französische Währungseinheit. Im Jahr 1685 konnte man dafür etwa 2-3 Hektar Ackerland oder ein bescheidenes Haus kaufen. Dies zeigt, dass beide Familien zum wohlhabenden Bürgertum gehörten.",
    icon: "coins",
  },
  {
    year: "1699",
    title: "Die große Migration",
    description: "Hubert verkauft sein Eigentum in Hallennes und zieht 50 km nach Norden nach Westflandern. Erste Erwähnung 'ex Hemelgem' (Emelgem). Die Kriege Ludwigs XIV. und wirtschaftliche Unruhen trieben die Familie an sicherere Orte.",
    extraContentNL: "Das späte 17. Jahrhundert war eine turbulente Zeit in den Südlichen Niederlanden. Die Kriege Ludwigs XIV. (1667-1713) brachten Verwüstung und wirtschaftliche Unsicherheit. Viele Familien zogen nach Norden in die Österreichischen Niederlande für mehr Stabilität. Die Reise von 50 km von Hallennes nach Emelgem dauerte mehrere Tage mit Pferd und Wagen.",
    extraContentFR: "Das späte 17. Jahrhundert war eine turbulente Zeit in den Südlichen Niederlanden. Die Kriege Ludwigs XIV. (1667-1713) brachten Verwüstung und wirtschaftliche Unsicherheit. Viele Familien zogen nach Norden in die Österreichischen Niederlande für mehr Stabilität. Die Reise von 50 km von Hallennes nach Emelgem dauerte mehrere Tage mit Pferd und Wagen.",
    icon: "map",
  },
  { year: "1718", title: "Jacobus Franciscus heiratet", description: "Sohn Jacobus Franciscus Deleforge (1694-1772) heiratet am 30. April 1718 in Izegem Veronica Barbier. Er lässt sich in Ardooie nieder und hat 9 Kinder. Unser direkter Vorfahre." },
  { year: "1729", title: "Tod der Stammväter", description: "Antoinette Follet stirbt am 19. April 1729 in Izegem. Hubert stirbt kurz danach, ebenfalls 1729. Die Familie ist nun vollständig in Westflandern verwurzelt." },
  {
    year: "1731-1807",
    title: "Georgius Delforce",
    description: "Sohn von Jacobus Franciscus. Erste Generation, die sich formell als Zimmermann etabliert. Der Beginn der Familientradition in der Holzbearbeitung.",
    image: timmermansatelier,
    imageDescNL: "Eine Zimmermannswerkstatt, Pieter Snyers (18. Jahrhundert) - Das Handwerk, das Generationen von Deforce prägen sollte",
    imageDescFR: "Eine Zimmermannswerkstatt, Pieter Snyers (18. Jahrhundert) - Das Handwerk, das Generationen von Deforce prägen sollte",
    extraContentNL: "Georgius Delforce begründete die Familientradition in der Holzbearbeitung, die bis ins 20. Jahrhundert fortbestehen sollte. Das Zimmermannshandwerk war im 18. Jahrhundert ein angesehener Beruf, der Fähigkeiten sowohl im Bauwesen als auch in der Feinschreinerei erforderte. Die Werkstatt war oft mit dem Wohnhaus verbunden, wo das Wissen von Vater zu Sohn weitergegeben wurde.",
    extraContentFR: "Georgius Delforce begründete die Familientradition in der Holzbearbeitung, die bis ins 20. Jahrhundert fortbestehen sollte. Das Zimmermannshandwerk war im 18. Jahrhundert ein angesehener Beruf, der Fähigkeiten sowohl im Bauwesen als auch in der Feinschreinerei erforderte. Die Werkstatt war oft mit dem Wohnhaus verbunden, wo das Wissen von Vater zu Sohn weitergegeben wurde.",
    icon: "hammer",
  },
  { year: "1815-1871", title: "Jean François Deforche", description: "Der erste Vorfahre, dessen Beruf wir eindeutig mit Dokumenten belegen können. Zimmermann und Tischler in Emelgem. Verheiratet mit Francisca Vandewalle, 8 Kinder, darunter Charles Louis." },
  { year: "1857-1938", title: "Charles-Louis Deforce", description: "Urgroßvater, geboren in Emelgem. Militärdienst 1877-1880 als 'mineur de 1e classe'. Dreimal verheiratet. Mit erster Frau Marie Leonie Vandenbroucke 8 Kinder, von denen nur 3 überlebten." },
  { year: "1894-1963", title: "Marcel August Deforce", description: "Sohn von Charles-Louis und Marie Leonie. Möbeltischler im Familienbetrieb 'M. Deforce & Söhne'. Heiratete Magdalena Geldof. Großvater des Autors." },
  {
    year: "1962",
    title: "Erstes Familientreffen",
    description: "Großes Familientreffen im Elternhaus in der Vandenbogaerdelaan 27 in Izegem. Historisches Foto mehrerer Generationen Deforce.",
    image: reunionImage,
    imageDescNL: "Familientreffen 1962 - Mehrere Generationen Deforce vereint im Elternhaus",
    imageDescFR: "Familientreffen 1962 - Mehrere Generationen Deforce vereint im Elternhaus",
    extraContentNL: "Dieses historische Foto zeigt die erweiterte Familie Deforce im Jahr 1962. Das Elternhaus in der Vandenbogaerdelaan 27 in Izegem war jahrelang der Treffpunkt für Familientreffen. Dieses Treffen markierte einen Moment der Einheit für eine Familie, die sich inzwischen über ganz Belgien verteilt hatte.",
    extraContentFR: "Dieses historische Foto zeigt die erweiterte Familie Deforce im Jahr 1962. Das Elternhaus in der Vandenbogaerdelaan 27 in Izegem war jahrelang der Treffpunkt für Familientreffen. Dieses Treffen markierte einen Moment der Einheit für eine Familie, die sich inzwischen über ganz Belgien verteilt hatte.",
    icon: "users",
  },
  {
    year: "2024",
    title: "Großes Familientreffen",
    description: "Am Sonntag, dem 29. September 2024, kommen 112 Nachkommen von Marcel Deforce und Magdalena Geldof im Prullenbos in Laarne zusammen. Ein neues Kapitel in unserer Familiengeschichte.",
    image: reunion2024Image,
    imageDescNL: "Familientreffen 2024 - 112 Nachkommen von Marcel und Magdalena vereint im Prullenbos",
    imageDescFR: "Familientreffen 2024 - 112 Nachkommen von Marcel und Magdalena vereint im Prullenbos",
    extraContentNL: "Das Treffen 2024 war das größte Familientreffen aller Zeiten mit 112 Teilnehmern. Von den kleinsten Kindern bis zu den ältesten Familienmitgliedern kamen vier Generationen zusammen, um die familiären Bande zu feiern. Het Prullenbos in Laarne bot den perfekten Rahmen für diesen denkwürdigen Tag.",
    extraContentFR: "Das Treffen 2024 war das größte Familientreffen aller Zeiten mit 112 Teilnehmern. Von den kleinsten Kindern bis zu den ältesten Familienmitgliedern kamen vier Generationen zusammen, um die familiären Bande zu feiern. Het Prullenbos in Laarne bot den perfekten Rahmen für diesen denkwürdigen Tag.",
    icon: "party",
  },
  { year: "2026", title: "Dieses Buch", description: "Marc Deforce fasst 25 Jahre genealogische Forschung in einer lesbaren Geschichte zusammen, anlässlich seines achtzigsten Geburtstags." },
];

const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { language, t } = useLanguage();
  
  const timelineEvents = language === 'de' ? timelineEventsDE : language === 'en' ? timelineEventsEN : language === 'es' ? timelineEventsES : language === 'vls' ? timelineEventsVLS : language === 'pcd' ? timelineEventsPCD : language === 'fr' ? timelineEventsFR : timelineEventsNL;

  return (
    <section id="tijdlijn" className="section-padding" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4">
            {t('timeline.title')}
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            {t('timeline.subtitle')}
          </p>
          <div className="vintage-divider mt-6" />
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-sepia to-accent transform md:-translate-x-1/2" />

          {/* Events */}
          <div className="space-y-8 md:space-y-12 pl-8 md:pl-0">
            {timelineEvents.map((event, index) => (
              <TimelineItem key={event.year} event={event} index={index} language={language} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
