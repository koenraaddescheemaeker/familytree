import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLanguage } from "@/contexts/LanguageContext";
import { Map, Layers, Info, X, Swords, Route, Shield, Play, Pause } from "lucide-react";

interface MapLayer {
  id: string;
  nameNL: string;
  nameFR: string;
  namePCD: string;
  nameVLS: string;
  nameEN: string;
  nameES: string;
  nameDE: string;
  descriptionNL: string;
  descriptionFR: string;
  descriptionPCD: string;
  descriptionVLS: string;
  descriptionEN: string;
  descriptionES: string;
  descriptionDE: string;
  color: string;
  visible: boolean;
  icon: React.ReactNode;
}

interface WarLocation {
  id: string;
  name: string;
  lat: number;
  lng: number;
  year: string;
  descriptionNL: string;
  descriptionFR: string;
  descriptionEN: string;
  descriptionES: string;
  descriptionDE: string;
  type: 'battle' | 'city' | 'fortress' | 'migration';
}

const warLocations: WarLocation[] = [
  // Slag bij Westrozebeke
  {
    id: 'westrozebeke',
    name: 'Westrozebeke',
    lat: 50.9167,
    lng: 2.9833,
    year: '1382',
    descriptionNL: 'Slag bij Westrozebeke (27 nov 1382). Meer dan 25.000 Vlaamse doden. Filips van Artevelde sneuvelde hier. Voorouders Gilles en Zeger overleefden.',
    descriptionFR: 'Bataille de Westrozebeke (27 nov 1382). Plus de 25 000 morts flamands. Philippe van Artevelde y périt. Nos ancêtres Gilles et Zeger survécurent.',
    descriptionEN: 'Battle of Westrozebeke (Nov 27, 1382). Over 25,000 Flemish dead. Philip van Artevelde died here. Ancestors Gilles and Zeger survived.',
    descriptionES: 'Batalla de Westrozebeke (27 nov 1382). Más de 25.000 flamencos muertos. Felipe van Artevelde murió aquí. Los antepasados Gilles y Zeger sobrevivieron.',
    descriptionDE: 'Schlacht bei Westrozebeke (27. Nov. 1382). Über 25.000 flämische Tote. Philipp van Artevelde fiel hier. Vorfahren Gilles und Zeger überlebten.',
    type: 'battle',
  },
  // Gentse Opstand
  {
    id: 'gent',
    name: 'Gent',
    lat: 51.0543,
    lng: 3.7174,
    year: '1379-1385',
    descriptionNL: 'Centrum van de Gentse Opstand (1379-1385). Hier begon Filips van Artevelde zijn verzet tegen de graaf van Vlaanderen.',
    descriptionFR: 'Centre de la Révolte de Gand (1379-1385). Philippe van Artevelde y commença sa résistance contre le comte de Flandre.',
    descriptionEN: 'Center of the Ghent Revolt (1379-1385). Philip van Artevelde began his resistance against the Count of Flanders here.',
    descriptionES: 'Centro de la Revuelta de Gante (1379-1385). Felipe van Artevelde comenzó aquí su resistencia contra el Conde de Flandes.',
    descriptionDE: 'Zentrum des Genter Aufstands (1379-1385). Hier begann Philipp van Artevelde seinen Widerstand gegen den Grafen von Flandern.',
    type: 'city',
  },
  // Beverhoutsveld
  {
    id: 'beverhoutsveld',
    name: 'Beverhoutsveld (Brugge)',
    lat: 51.2094,
    lng: 3.2247,
    year: '1382',
    descriptionNL: 'Slag bij Beverhoutsveld (3 mei 1382). Vlaamse overwinning onder leiding van Filips van Artevelde op het grafelijke leger.',
    descriptionFR: 'Bataille de Beverhoutsveld (3 mai 1382). Victoire flamande sous Philippe van Artevelde contre l\'armée comtale.',
    descriptionEN: 'Battle of Beverhoutsveld (May 3, 1382). Flemish victory under Philip van Artevelde against the count\'s army.',
    descriptionES: 'Batalla de Beverhoutsveld (3 mayo 1382). Victoria flamenca bajo Felipe van Artevelde contra el ejército del conde.',
    descriptionDE: 'Schlacht bei Beverhoutsveld (3. Mai 1382). Flämischer Sieg unter Philipp van Artevelde gegen das gräfliche Heer.',
    type: 'battle',
  },
  // Lodewijk XIV veroveringen
  {
    id: 'lille-siege',
    name: 'Rijsel (Lille)',
    lat: 50.6292,
    lng: 3.0573,
    year: '1667',
    descriptionNL: 'Beleg en verovering door Lodewijk XIV in 1667. Vanaf dan Frans grondgebied. Centrum van de Châtellenie waar onze voorouders leefden.',
    descriptionFR: 'Siège et conquête par Louis XIV en 1667. Territoire français depuis. Centre de la Châtellenie où vivaient nos ancêtres.',
    descriptionEN: 'Siege and conquest by Louis XIV in 1667. French territory since then. Center of the Châtellenie where our ancestors lived.',
    descriptionES: 'Asedio y conquista por Luis XIV en 1667. Territorio francés desde entonces. Centro de la Châtellenie donde vivían nuestros antepasados.',
    descriptionDE: 'Belagerung und Eroberung durch Ludwig XIV. im Jahr 1667. Seitdem französisches Gebiet. Zentrum der Châtellenie, wo unsere Vorfahren lebten.',
    type: 'fortress',
  },
  {
    id: 'tournai-siege',
    name: 'Doornik (Tournai)',
    lat: 50.6050,
    lng: 3.3883,
    year: '1667',
    descriptionNL: 'Veroverd door Lodewijk XIV tijdens de Devolutieoorlog (1667). Strategische vesting.',
    descriptionFR: 'Conquis par Louis XIV pendant la Guerre de Dévolution (1667). Forteresse stratégique.',
    descriptionEN: 'Conquered by Louis XIV during the War of Devolution (1667). Strategic fortress.',
    descriptionES: 'Conquistada por Luis XIV durante la Guerra de Devolución (1667). Fortaleza estratégica.',
    descriptionDE: 'Erobert von Ludwig XIV. während des Devolutionskrieges (1667). Strategische Festung.',
    type: 'fortress',
  },
  {
    id: 'dunkerque-siege',
    name: 'Duinkerke (Dunkerque)',
    lat: 51.0343,
    lng: 2.3768,
    year: '1662',
    descriptionNL: 'Door Engeland verkocht aan Frankrijk in 1662. Belangrijk marineversterking voor Lodewijk XIV.',
    descriptionFR: 'Vendu par l\'Angleterre à la France en 1662. Important port militaire pour Louis XIV.',
    descriptionEN: 'Sold by England to France in 1662. Important naval fortress for Louis XIV.',
    descriptionES: 'Vendido por Inglaterra a Francia en 1662. Importante fortaleza naval para Luis XIV.',
    descriptionDE: 'Von England an Frankreich verkauft im Jahr 1662. Wichtige Marinefestung für Ludwig XIV.',
    type: 'fortress',
  },
  {
    id: 'ieper-siege',
    name: 'Ieper (Ypres)',
    lat: 50.8514,
    lng: 2.8825,
    year: '1678',
    descriptionNL: 'Veroverd door Lodewijk XIV in 1678 tijdens de Hollandse Oorlog. Later beroemd om WO1 veldslagen.',
    descriptionFR: 'Conquis par Louis XIV en 1678 pendant la Guerre de Hollande. Plus tard célèbre pour les batailles de la WWI.',
    descriptionEN: 'Conquered by Louis XIV in 1678 during the Dutch War. Later famous for WWI battles.',
    descriptionES: 'Conquistada por Luis XIV en 1678 durante la Guerra de Holanda. Más tarde famosa por las batallas de la WWI.',
    descriptionDE: 'Erobert von Ludwig XIV. im Jahr 1678 während des Holländischen Krieges. Später berühmt für Schlachten des Ersten Weltkriegs.',
    type: 'fortress',
  },
  // Migratiepunten
  {
    id: 'hallennes',
    name: 'Hallennes-lez-Haubourdin',
    lat: 50.5847,
    lng: 2.9397,
    year: '1699',
    descriptionNL: 'Vertrekpunt van Hubert Deleforge in 1699. Hier verkocht hij zijn eigendom om te vluchten voor oorlog.',
    descriptionFR: 'Point de départ de Hubert Deleforge en 1699. Il y vendit sa propriété pour fuir la guerre.',
    descriptionEN: 'Departure point of Hubert Deleforge in 1699. He sold his property here to flee from war.',
    descriptionES: 'Punto de partida de Hubert Deleforge en 1699. Vendió su propiedad aquí para huir de la guerra.',
    descriptionDE: 'Ausgangspunkt von Hubert Deleforge im Jahr 1699. Hier verkaufte er sein Eigentum, um vor dem Krieg zu fliehen.',
    type: 'migration',
  },
  {
    id: 'izegem-arrival',
    name: 'Izegem / Emelgem',
    lat: 50.9094,
    lng: 3.2142,
    year: '1699',
    descriptionNL: 'Aankomst van Hubert Deleforge in 1699. Begin van de Vlaamse familietak. Hier vestigde de familie zich permanent.',
    descriptionFR: 'Arrivée de Hubert Deleforge en 1699. Début de la branche familiale flamande. La famille s\'y installa définitivement.',
    descriptionEN: 'Arrival of Hubert Deleforge in 1699. Beginning of the Flemish family branch. The family settled here permanently.',
    descriptionES: 'Llegada de Hubert Deleforge en 1699. Comienzo de la rama familiar flamenca. La familia se estableció aquí permanentemente.',
    descriptionDE: 'Ankunft von Hubert Deleforge im Jahr 1699. Beginn des flämischen Familienzweigs. Hier ließ sich die Familie dauerhaft nieder.',
    type: 'migration',
  },
  // WO1 locaties
  {
    id: 'nieuwpoort',
    name: 'Nieuwpoort',
    lat: 51.1333,
    lng: 2.7500,
    year: '1914-1918',
    descriptionNL: 'Noordelijk uiteinde van het IJzerfront. Hier werden de sluizen geopend om het land onder water te zetten.',
    descriptionFR: 'Extrémité nord du Front de l\'Yser. Les écluses furent ouvertes ici pour inonder le pays.',
    descriptionEN: 'Northern end of the Yser Front. The sluices were opened here to flood the land.',
    descriptionES: 'Extremo norte del Frente del Yser. Las esclusas se abrieron aquí para inundar la tierra.',
    descriptionDE: 'Nördliches Ende der Yser-Front. Hier wurden die Schleusen geöffnet, um das Land unter Wasser zu setzen.',
    type: 'battle',
  },
  {
    id: 'diksmuide',
    name: 'Diksmuide',
    lat: 51.0333,
    lng: 2.8667,
    year: '1914-1918',
    descriptionNL: 'Centrum van het IJzerfront. De IJzertoren herdenkt de Vlaamse soldaten die hier vochten.',
    descriptionFR: 'Centre du Front de l\'Yser. La Tour de l\'Yser commémore les soldats flamands qui combattirent ici.',
    descriptionEN: 'Center of the Yser Front. The Yser Tower commemorates the Flemish soldiers who fought here.',
    descriptionES: 'Centro del Frente del Yser. La Torre del Yser conmemora a los soldados flamencos que lucharon aquí.',
    descriptionDE: 'Zentrum der Yser-Front. Der Yserturm gedenkt der flämischen Soldaten, die hier kämpften.',
    type: 'battle',
  },
  // Ramillies en Oudenaarde
  {
    id: 'ramillies',
    name: 'Ramillies',
    lat: 50.6347,
    lng: 4.8944,
    year: '1706',
    descriptionNL: 'Slag bij Ramillies (23 mei 1706). Verpletterende nederlaag voor Frankrijk tijdens de Spaanse Successieoorlog.',
    descriptionFR: 'Bataille de Ramillies (23 mai 1706). Défaite écrasante pour la France pendant la Guerre de Succession d\'Espagne.',
    descriptionEN: 'Battle of Ramillies (May 23, 1706). Crushing defeat for France during the War of the Spanish Succession.',
    descriptionES: 'Batalla de Ramillies (23 mayo 1706). Derrota aplastante para Francia durante la Guerra de Sucesión Española.',
    descriptionDE: 'Schlacht bei Ramillies (23. Mai 1706). Vernichtende Niederlage für Frankreich während des Spanischen Erbfolgekrieges.',
    type: 'battle',
  },
  {
    id: 'oudenaarde',
    name: 'Oudenaarde',
    lat: 50.8500,
    lng: 3.6000,
    year: '1708',
    descriptionNL: 'Slag bij Oudenaarde (11 juli 1708). Belangrijke geallieerde overwinning op Franse troepen.',
    descriptionFR: 'Bataille d\'Audenarde (11 juillet 1708). Importante victoire alliée sur les troupes françaises.',
    descriptionEN: 'Battle of Oudenarde (July 11, 1708). Important Allied victory over French troops.',
    descriptionES: 'Batalla de Oudenaarde (11 julio 1708). Importante victoria aliada sobre las tropas francesas.',
    descriptionDE: 'Schlacht bei Oudenaarde (11. Juli 1708). Wichtiger alliierter Sieg über französische Truppen.',
    type: 'battle',
  },
];

const OorlogsKaart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { language } = useLanguage();
  const [activeInfo, setActiveInfo] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<WarLocation | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [layers, setLayers] = useState<MapLayer[]>([
    {
      id: "westrozebeke",
      nameNL: "Slag bij Westrozebeke (1382)",
      nameFR: "Bataille de Westrozebeke (1382)",
      namePCD: "Bataille éd Westrozebeke (1382)",
      nameVLS: "Slag by Westrozebeke (1382)",
      nameEN: "Battle of Westrozebeke (1382)",
      nameES: "Batalla de Westrozebeke (1382)",
      nameDE: "Schlacht bei Westrozebeke (1382)",
      descriptionNL: "De beslissende slag tijdens de Gentse Opstand. Meer dan 25.000 Vlaamse burgers en ambachtslieden sneuvelden. Onze voorouders Gilles van den Neste en Zeger Van Steenkiste overleefden de slachting.",
      descriptionFR: "La bataille décisive pendant la Révolte de Gand. Plus de 25 000 citoyens et artisans flamands périrent. Nos ancêtres Gilles van den Neste et Zeger Van Steenkiste survécurent au massacre.",
      descriptionPCD: "L' bataille décisive pindant la Révolte éd Gand. Pus d' 25 000 citoyens pi artisans flamands périrent.",
      descriptionVLS: "De beslissende slag tydens den Gentschen Opstand. Mee dan 25.000 Vlaamsche borgers en ambachtslieden sneuvelden.",
      descriptionEN: "The decisive battle during the Ghent Revolt. More than 25,000 Flemish citizens and craftsmen perished. Our ancestors Gilles van den Neste and Zeger Van Steenkiste survived the massacre.",
      descriptionES: "La batalla decisiva durante la Revuelta de Gante. Más de 25.000 ciudadanos y artesanos flamencos perecieron. Nuestros antepasados Gilles van den Neste y Zeger Van Steenkiste sobrevivieron a la masacre.",
      descriptionDE: "Die entscheidende Schlacht während des Genter Aufstands. Mehr als 25.000 flämische Bürger und Handwerker fielen. Unsere Vorfahren Gilles van den Neste und Zeger Van Steenkiste überlebten das Massaker.",
      color: "#dc2626",
      visible: true,
      icon: <Swords className="w-4 h-4" />,
    },
    {
      id: "lodewijk",
      nameNL: "Oorlogen van Lodewijk XIV (1667-1714)",
      nameFR: "Guerres de Louis XIV (1667-1714)",
      namePCD: "Guerres éd Louis XIV (1667-1714)",
      nameVLS: "Oorlogen van Lodewyk XIV (1667-1714)",
      nameEN: "Wars of Louis XIV (1667-1714)",
      nameES: "Guerras de Luis XIV (1667-1714)",
      nameDE: "Kriege Ludwigs XIV. (1667-1714)",
      descriptionNL: "47 jaar van verwoestende oorlogen die de Zuidelijke Nederlanden teisterden. Steden als Rijsel, Doornik en Ieper werden Frans. Deze chaos dreef Hubert Deleforge in 1699 naar West-Vlaanderen.",
      descriptionFR: "47 ans de guerres dévastatrices qui ravagèrent les Pays-Bas méridionaux. Des villes comme Lille, Tournai et Ypres devinrent françaises. Ce chaos poussa Hubert Deleforge vers la Flandre Occidentale en 1699.",
      descriptionPCD: "47 ans d' guerres dévastatrices. Des villes comme Lile, Tournai pi Ypres d'vinrent françaises.",
      descriptionVLS: "47 joar van verwoestende oorlogen die de Zuideliken Nederlanden teisterden. Steên gelyk Rysel, Doornik en Ieper wierden Fransch.",
      descriptionEN: "47 years of devastating wars that ravaged the Southern Netherlands. Cities like Lille, Tournai and Ypres became French. This chaos drove Hubert Deleforge to West Flanders in 1699.",
      descriptionES: "47 años de guerras devastadoras que asolaron los Países Bajos del Sur. Ciudades como Lille, Tournai e Ypres se convirtieron en francesas. Este caos llevó a Hubert Deleforge a Flandes Occidental en 1699.",
      descriptionDE: "47 Jahre verheerender Kriege, die die Südlichen Niederlande heimsuchten. Städte wie Lille, Tournai und Ypern wurden französisch. Dieses Chaos trieb Hubert Deleforge 1699 nach Westflandern.",
      color: "#f59e0b",
      visible: true,
      icon: <Shield className="w-4 h-4" />,
    },
    {
      id: "ijzer",
      nameNL: "IJzerfront (1914-1918)",
      nameFR: "Front de l'Yser (1914-1918)",
      namePCD: "Front d' l'Yser (1914-1918)",
      nameVLS: "Yzerfront (1914-1918)",
      nameEN: "Yser Front (1914-1918)",
      nameES: "Frente del Yser (1914-1918)",
      nameDE: "Yser-Front (1914-1918)",
      descriptionNL: "De frontlinie langs de IJzer waar Belgische troepen vier jaar standhielden. Van Nieuwpoort aan de kust tot Ieper, op slechts 30 km van Izegem waar de familie Deforce woonde.",
      descriptionFR: "La ligne de front le long de l'Yser où les troupes belges ont tenu pendant quatre ans. De Nieuport sur la côte jusqu'à Ypres, à seulement 30 km d'Izegem où vivait la famille Deforce.",
      descriptionPCD: "L' ligne d' front l' long d' l'Yser ousqu' les troupes belges ont t'nu pindant quate ans.",
      descriptionVLS: "De frontlinie langs den Yzer woar Belgische troepen vier joar standhielden. Van Nieuwpoort an de kust tot Ieper, op mo 30 km van Izegem.",
      descriptionEN: "The front line along the Yser where Belgian troops held out for four years. From Nieuwpoort on the coast to Ypres, just 30 km from Izegem where the Deforce family lived.",
      descriptionES: "La línea del frente a lo largo del Yser donde las tropas belgas resistieron durante cuatro años. Desde Nieuwpoort en la costa hasta Ypres, a solo 30 km de Izegem donde vivía la familia Deforce.",
      descriptionDE: "Die Frontlinie entlang der Yser, wo belgische Truppen vier Jahre lang standhielten. Von Nieuwpoort an der Küste bis Ypern, nur 30 km von Izegem entfernt, wo die Familie Deforce lebte.",
      color: "#dc2626",
      visible: false,
      icon: <Swords className="w-4 h-4" />,
    },
    {
      id: "migratie",
      nameNL: "Migratieroute (1699)",
      nameFR: "Route de migration (1699)",
      namePCD: "Route d' migratione (1699)",
      nameVLS: "Migroasjeroute (1699)",
      nameEN: "Migration route (1699)",
      nameES: "Ruta de migración (1699)",
      nameDE: "Migrationsroute (1699)",
      descriptionNL: "De route die stamvader Hubert Deleforge in 1699 aflegde: 50 km van Hallennes-lez-Haubourdin naar Emelgem om te ontsnappen aan oorlog en onzekerheid onder Frans bewind.",
      descriptionFR: "La route que l'ancêtre fondateur Hubert Deleforge parcourut en 1699 : 50 km de Hallennes-lez-Haubourdin à Emelgem pour échapper à la guerre et l'incertitude sous domination française.",
      descriptionPCD: "L' route qu' l'anchête fondateur Hubert Deleforge parcourut in 1699 : 50 km d' Hallennes à Emelgem.",
      descriptionVLS: "De route die stamvader Hubert Deleforge in 1699 aflegde: 50 km van Hallennes-lez-Haubourdin noar Emelgem.",
      descriptionEN: "The route that founding ancestor Hubert Deleforge traveled in 1699: 50 km from Hallennes-lez-Haubourdin to Emelgem to escape war and uncertainty under French rule.",
      descriptionES: "La ruta que el antepasado fundador Hubert Deleforge recorrió en 1699: 50 km desde Hallennes-lez-Haubourdin hasta Emelgem para escapar de la guerra y la incertidumbre bajo dominio francés.",
      descriptionDE: "Die Route, die Stammvater Hubert Deleforge 1699 zurücklegte: 50 km von Hallennes-lez-Haubourdin nach Emelgem, um Krieg und Unsicherheit unter französischer Herrschaft zu entkommen.",
      color: "#22c55e",
      visible: true,
      icon: <Route className="w-4 h-4" />,
    }
  ]);

  const getName = (layer: MapLayer) => {
    switch (language) {
      case 'fr': return layer.nameFR;
      case 'pcd': return layer.namePCD;
      case 'vls': return layer.nameVLS;
      case 'en': return layer.nameEN;
      case 'es': return layer.nameES;
      case 'de': return layer.nameDE;
      case 'sv': return layer.nameEN;
      default: return layer.nameNL;
    }
  };

  const getDescription = (layer: MapLayer) => {
    switch (language) {
      case 'fr': return layer.descriptionFR;
      case 'pcd': return layer.descriptionPCD;
      case 'vls': return layer.descriptionVLS;
      case 'en': return layer.descriptionEN;
      case 'es': return layer.descriptionES;
      case 'de': return layer.descriptionDE;
      case 'sv': return layer.descriptionEN;
      default: return layer.descriptionNL;
    }
  };

  const getLocationDescription = (loc: WarLocation) => {
    switch (language) {
      case 'fr': case 'pcd': return loc.descriptionFR;
      case 'en': return loc.descriptionEN;
      case 'es': return loc.descriptionES;
      case 'de': return loc.descriptionDE;
      case 'sv': return loc.descriptionEN;
      default: return loc.descriptionNL;
    }
  };

  const sectionTitle = {
    nl: "Interactieve Oorlogs- & Migratiekaart",
    fr: "Carte Interactive des Guerres & Migrations",
    pcd: "Carte Interactive des Guerres & Migrations",
    vls: "Interactieve Oorlogs- & Migroasjekoarte",
    en: "Interactive War & Migration Map",
    es: "Mapa Interactivo de Guerras & Migraciones",
    de: "Interaktive Kriegs- & Migrationskarte",
    sv: "Interaktiv Krigs- & Migrationskarta"
  };

  const sectionSubtitle = {
    nl: "Verken de slagvelden, veroveringen en migratieroutes die onze familiegeschiedenis van 1382 tot 1918 vormden",
    fr: "Explorez les champs de bataille, conquêtes et routes de migration qui ont façonné notre histoire familiale de 1382 à 1918",
    pcd: "Explorez les champs d' bataille, conquêtes pi routes d' migration qu'ont façonné note histoère familiére",
    vls: "Verken de slagvelden, veroveringen en migroasjeroutes die uuze familiegeschiedenisse van 1382 tot 1918 vormden",
    en: "Explore the battlefields, conquests and migration routes that shaped our family history from 1382 to 1918",
    es: "Explore los campos de batalla, conquistas y rutas de migración que dieron forma a nuestra historia familiar de 1382 a 1918",
    de: "Erkunden Sie die Schlachtfelder, Eroberungen und Migrationsrouten, die unsere Familiengeschichte von 1382 bis 1918 prägten",
    sv: "Utforska slagfälten, erövringarna och migrationsrutterna som formade vår familjehistoria från 1382 till 1918"
  };

  const legendTitle = {
    nl: "Kaartlagen",
    fr: "Couches de carte",
    pcd: "Couches d' carte",
    vls: "Koartlagen",
    en: "Map Layers",
    es: "Capas del mapa",
    de: "Kartenebenen",
    sv: "Kartlager"
  };

  const lang = language as keyof typeof sectionTitle;

  const toggleLayer = (id: string) => {
    setLayers(prev => prev.map(layer => 
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  // Animate migration route
  const animateMigration = () => {
    if (!mapInstanceRef.current || isAnimating) return;
    
    setIsAnimating(true);
    const map = mapInstanceRef.current;
    
    // Zoom to start point
    map.flyTo([50.5847, 2.9397], 11, { duration: 1.5 });
    
    setTimeout(() => {
      // Pan along route
      map.flyTo([50.75, 3.08], 10, { duration: 2 });
      
      setTimeout(() => {
        // Arrive at destination
        map.flyTo([50.9094, 3.2142], 11, { duration: 1.5 });
        
        setTimeout(() => {
          // Reset view
          map.flyTo([50.75, 3.1], 9, { duration: 1 });
          setIsAnimating(false);
        }, 2000);
      }, 2500);
    }, 2000);
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on Flanders/Northern France
    const map = L.map(mapRef.current, {
      center: [50.75, 3.1],
      zoom: 9,
      scrollWheelZoom: false,
      zoomControl: true
    });

    // Add tile layer with vintage style
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map layers when visibility changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Clear existing layers (except tile layer)
    map.eachLayer((layer) => {
      if (layer instanceof L.Polyline || layer instanceof L.Polygon || layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        map.removeLayer(layer);
      }
    });

    // Always show Izegem as reference point
    L.circleMarker([50.91, 3.21] as L.LatLngExpression, {
      radius: 12,
      fillColor: '#3b82f6',
      color: '#fff',
      weight: 3,
      opacity: 1,
      fillOpacity: 0.9
    }).bindPopup(`<strong>Izegem</strong><br/>${language === 'nl' || language === 'vls' ? 'Thuisbasis familie Deforce sinds 1699' : language === 'en' ? 'Home of the Deforce family since 1699' : language === 'es' ? 'Hogar de la familia Deforce desde 1699' : language === 'de' ? 'Heimat der Familie Deforce seit 1699' : 'Résidence famille Deforce depuis 1699'}`).addTo(map);

    // Slag bij Westrozebeke (1382)
    if (layers.find(l => l.id === 'westrozebeke')?.visible) {
      // Battle locations
      const battleLocations = warLocations.filter(loc => 
        ['westrozebeke', 'gent', 'beverhoutsveld'].includes(loc.id)
      );

      battleLocations.forEach(loc => {
        const icon = L.divIcon({
          className: 'custom-battle-marker',
          html: `<div style="
            width: 28px;
            height: 28px;
            background: linear-gradient(135deg, #dc2626, #991b1b);
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(220,38,38,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
          ">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
              <path d="M14.5 17.5L3 6V3h3l11.5 11.5"/>
              <path d="M13 19l6-6"/>
              <path d="M16 16l4 4"/>
              <path d="M19 21l2-2"/>
            </svg>
          </div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 14],
          popupAnchor: [0, -14],
        });

        L.marker([loc.lat, loc.lng], { icon })
          .bindPopup(`<strong>${loc.name}</strong><br/><span style="color:#dc2626;font-weight:600">${loc.year}</span><br/><small>${getLocationDescription(loc)}</small>`)
          .addTo(map);
      });

      // Connect Gent to Westrozebeke (march route)
      const marchRoute: L.LatLngExpression[] = [
        [51.0543, 3.7174], // Gent
        [51.0094, 3.4247], // Brugge area
        [50.9167, 2.9833], // Westrozebeke
      ];

      L.polyline(marchRoute, {
        color: '#dc2626',
        weight: 3,
        opacity: 0.6,
        dashArray: '8, 8'
      }).addTo(map);
    }

    // IJzerfront (WW1 front line)
    if (layers.find(l => l.id === 'ijzer')?.visible) {
      const ijzerFront: L.LatLngExpression[] = [
        [51.13, 2.72], // Nieuwpoort
        [51.05, 2.75], // Diksmuide area
        [50.95, 2.82], // Langemark
        [50.85, 2.87], // Ieper (Ypres)
        [50.78, 2.92], // Mesen
        [50.72, 2.88], // Ploegsteert
      ];

      L.polyline(ijzerFront, {
        color: '#dc2626',
        weight: 5,
        opacity: 0.8,
        dashArray: '10, 5'
      }).addTo(map);

      // WW1 battle locations
      const ww1Locations = warLocations.filter(loc => 
        ['nieuwpoort', 'diksmuide'].includes(loc.id)
      );

      ww1Locations.forEach(loc => {
        L.circleMarker([loc.lat, loc.lng] as L.LatLngExpression, {
          radius: 8,
          fillColor: '#dc2626',
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }).bindPopup(`<strong>${loc.name}</strong><br/><span style="color:#dc2626">${loc.year}</span><br/><small>${getLocationDescription(loc)}</small>`).addTo(map);
      });
    }

    // French conquests under Louis XIV
    if (layers.find(l => l.id === 'lodewijk')?.visible) {
      // Approximate borders of French conquests
      const frenchTerritory: L.LatLngExpression[] = [
        [51.05, 2.35], // Dunkirk area
        [50.95, 2.55], // Hazebrouck
        [50.72, 2.70], // Bailleul
        [50.62, 3.07], // Lille
        [50.45, 3.40], // Tournai
        [50.35, 3.60], // Ath area
        [50.25, 3.75], // Mons area
        [50.10, 4.00], // Charleroi region
        [49.90, 4.05], // South border
        [49.85, 3.50], // Cambrai region
        [50.05, 2.85], // Arras area
        [50.30, 2.35], // Béthune
        [50.70, 2.25], // St-Omer
        [51.05, 2.35], // Back to start
      ];

      L.polygon(frenchTerritory, {
        color: '#f59e0b',
        fillColor: '#f59e0b',
        fillOpacity: 0.15,
        weight: 3,
        dashArray: '5, 5'
      }).addTo(map);

      // Key conquered cities and battles
      const lodewijkLocations = warLocations.filter(loc => 
        ['lille-siege', 'tournai-siege', 'dunkerque-siege', 'ieper-siege', 'ramillies', 'oudenaarde'].includes(loc.id)
      );

      lodewijkLocations.forEach(loc => {
        const isBattle = loc.type === 'battle';
        const color = isBattle ? '#b45309' : '#f59e0b';
        
        L.circleMarker([loc.lat, loc.lng] as L.LatLngExpression, {
          radius: isBattle ? 9 : 7,
          fillColor: color,
          color: '#fff',
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }).bindPopup(`<strong>${loc.name}</strong><br/><span style="color:${color};font-weight:600">${loc.year}</span><br/><small>${getLocationDescription(loc)}</small>`).addTo(map);
      });
    }

    // Migration route
    if (layers.find(l => l.id === 'migratie')?.visible) {
      const migrationRoute: L.LatLngExpression[] = [
        [50.5847, 2.9397], // Hallennes-lez-Haubourdin
        [50.63, 3.00], // Near Lille
        [50.70, 3.05], // Moving north
        [50.78, 3.10], // Continuing through countryside
        [50.85, 3.15], // Approaching Emelgem
        [50.9094, 3.2142], // Izegem/Emelgem
      ];

      // Animated dashed line
      L.polyline(migrationRoute, {
        color: '#22c55e',
        weight: 5,
        opacity: 0.9,
      }).addTo(map);

      // Add decorative arrows along route
      const arrowPoints = [[50.65, 3.02], [50.75, 3.08], [50.85, 3.14]];
      arrowPoints.forEach(point => {
        L.circleMarker(point as L.LatLngExpression, {
          radius: 4,
          fillColor: '#22c55e',
          color: '#fff',
          weight: 1,
          opacity: 1,
          fillOpacity: 1
        }).addTo(map);
      });

      // Migration start and end points
      const migrationLocations = warLocations.filter(loc => 
        ['hallennes', 'izegem-arrival'].includes(loc.id)
      );

      migrationLocations.forEach(loc => {
        const isStart = loc.id === 'hallennes';
        
        L.circleMarker([loc.lat, loc.lng] as L.LatLngExpression, {
          radius: 12,
          fillColor: '#22c55e',
          color: '#fff',
          weight: 3,
          opacity: 1,
          fillOpacity: 0.9
        }).bindPopup(`<strong>${loc.name}</strong><br/><span style="color:#22c55e;font-weight:600">${isStart ? (language === 'nl' ? 'Vertrek' : language === 'en' ? 'Departure' : language === 'es' ? 'Partida' : language === 'de' ? 'Abfahrt' : 'Départ') : (language === 'nl' ? 'Aankomst' : language === 'en' ? 'Arrival' : language === 'es' ? 'Llegada' : language === 'de' ? 'Ankunft' : 'Arrivée')} ${loc.year}</span><br/><small>${getLocationDescription(loc)}</small>`).addTo(map);
      });

      // Distance indicator
      const midpoint: L.LatLngExpression = [50.75, 3.08];
      L.marker(midpoint, {
        icon: L.divIcon({
          className: 'distance-marker',
          html: `<div style="
            background: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            color: #22c55e;
            border: 2px solid #22c55e;
            white-space: nowrap;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          ">~50 km</div>`,
          iconSize: [60, 24],
          iconAnchor: [30, 12],
        })
      }).addTo(map);
    }

  }, [layers, language]);

  return (
    <section id="oorlogskaart" className="section-padding bg-secondary/20" ref={containerRef}>
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="text-accent font-medium uppercase tracking-widest text-sm flex items-center justify-center gap-2">
            <Map className="w-4 h-4" />
            {language === 'fr' || language === 'pcd' ? 'Géographie Historique' : language === 'en' ? 'Historical Geography' : language === 'es' ? 'Geografía Histórica' : language === 'de' ? 'Historische Geografie' : 'Historische Geografie'}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-primary mb-4 mt-4">
            {sectionTitle[lang] || sectionTitle.nl}
          </h2>
          <p className="font-sans text-muted-foreground max-w-2xl mx-auto">
            {sectionSubtitle[lang] || sectionSubtitle.nl}
          </p>
          <div className="vintage-divider mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Legend Panel */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-background rounded-xl shadow-vintage border border-border p-5">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-5 h-5 text-accent" />
                <h3 className="font-serif text-lg font-semibold text-foreground">
                  {legendTitle[lang] || legendTitle.nl}
                </h3>
              </div>

              <div className="space-y-3">
                {layers.map((layer) => (
                  <div key={layer.id} className="space-y-2">
                    <button
                      onClick={() => toggleLayer(layer.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all ${
                        layer.visible 
                          ? 'border-accent bg-accent/5' 
                          : 'border-border bg-muted/30 opacity-60'
                      }`}
                    >
                      <div
                        className="w-5 h-5 rounded-full border-2 border-white shadow-sm flex-shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: layer.color }}
                      >
                        <span className="text-white">{layer.icon}</span>
                      </div>
                      <span className={`text-sm font-medium text-left flex-1 ${layer.visible ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {getName(layer)}
                      </span>
                    </button>

                    {layer.visible && (
                      <button
                        onClick={() => setActiveInfo(activeInfo === layer.id ? null : layer.id)}
                        className="ml-8 flex items-center gap-1 text-xs text-accent hover:text-accent/80 transition-colors"
                      >
                        <Info className="w-3 h-3" />
                        {language === 'nl' || language === 'vls' ? 'Meer info' : language === 'en' ? 'More info' : language === 'es' ? 'Más info' : language === 'de' ? 'Mehr Info' : 'Plus d\'info'}
                      </button>
                    )}

                    <AnimatePresence>
                      {activeInfo === layer.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="ml-8 p-3 bg-muted/50 rounded-lg text-sm text-muted-foreground leading-relaxed"
                        >
                          {getDescription(layer)}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Animation button for migration */}
              {layers.find(l => l.id === 'migratie')?.visible && (
                <div className="mt-4 pt-4 border-t border-border">
                  <button
                    onClick={animateMigration}
                    disabled={isAnimating}
                    className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg transition-all ${
                      isAnimating 
                        ? 'bg-green-100 text-green-700 cursor-not-allowed' 
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {isAnimating ? (
                      <>
                        <Pause className="w-4 h-4 animate-pulse" />
                        {language === 'nl' ? 'Animatie...' : language === 'en' ? 'Animating...' : language === 'es' ? 'Animando...' : language === 'de' ? 'Animation...' : 'Animation...'}
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        {language === 'nl' ? 'Toon migratieroute' : language === 'en' ? 'Show migration route' : language === 'es' ? 'Mostrar ruta de migración' : language === 'de' ? 'Migrationsroute zeigen' : 'Montrer route de migration'}
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Legend info */}
              <div className="mt-4 pt-4 border-t border-border space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span>Izegem - {language === 'nl' ? 'Thuisbasis familie' : language === 'en' ? 'Family home' : language === 'es' ? 'Hogar familiar' : language === 'de' ? 'Familienwohnsitz' : 'Résidence familiale'}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {language === 'nl' || language === 'vls' 
                    ? 'Klik op kaartlagen om ze te tonen/verbergen. Klik op markers voor details.'
                    : language === 'en'
                    ? 'Click on map layers to show/hide. Click markers for details.'
                    : language === 'es'
                    ? 'Haga clic en las capas para mostrar/ocultar. Haga clic en los marcadores para más detalles.'
                    : language === 'de'
                    ? 'Klicken Sie auf Kartenebenen zum Ein-/Ausblenden. Klicken Sie auf Markierungen für Details.'
                    : 'Cliquez sur les couches pour les afficher/masquer. Cliquez sur les marqueurs pour les détails.'
                  }
                </p>
              </div>
            </div>

            {/* Selected Location Panel */}
            <AnimatePresence>
              {selectedLocation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="mt-4 bg-background rounded-xl shadow-vintage border border-border p-5"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-serif text-lg font-semibold text-foreground">
                      {selectedLocation.name}
                    </h4>
                    <button
                      onClick={() => setSelectedLocation(null)}
                      className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {getLocationDescription(selectedLocation)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Map Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-background rounded-xl shadow-vintage border border-border overflow-hidden relative">
              <div 
                ref={mapRef} 
                className="w-full h-[500px] md:h-[600px]"
                style={{ minHeight: '400px' }}
              />
              
              {/* Map Legend Overlay */}
              <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur-sm rounded-lg p-3 border border-border shadow-lg text-xs">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Swords className="w-3 h-3 text-red-600" />
                    <span className="text-muted-foreground">{language === 'nl' ? 'Slagveld' : language === 'en' ? 'Battlefield' : language === 'es' ? 'Campo de batalla' : language === 'de' ? 'Schlachtfeld' : 'Champ de bataille'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3 text-amber-600" />
                    <span className="text-muted-foreground">{language === 'nl' ? 'Vesting' : language === 'en' ? 'Fortress' : language === 'es' ? 'Fortaleza' : language === 'de' ? 'Festung' : 'Forteresse'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Route className="w-3 h-3 text-green-600" />
                    <span className="text-muted-foreground">{language === 'nl' ? 'Migratie' : language === 'en' ? 'Migration' : language === 'es' ? 'Migración' : language === 'de' ? 'Migration' : 'Migration'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OorlogsKaart;
