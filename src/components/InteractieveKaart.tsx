import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '@/contexts/LanguageContext';
import { useGame } from '@/contexts/GameContext';
import { MapPin, Layers, ZoomIn, ZoomOut, ExternalLink, Map, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Fix for default marker icons in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface MapMarker {
  position: [number, number];
  titleNL: string;
  titleFR: string;
  titlePCD: string;
  titleVLS: string;
  titleEN: string;
  titleES: string;
  titleDE: string;
  titleSV?: string;
  descriptionNL: string;
  descriptionFR: string;
  descriptionPCD: string;
  descriptionVLS: string;
  descriptionEN: string;
  descriptionES: string;
  descriptionDE: string;
  descriptionSV?: string;
}

const markers: MapMarker[] = [
  {
    // Sint-Tillokerk: Kerkstraat, Izegem centrum
    position: [50.9139, 3.2142],
    titleNL: "Sint-Tillokerk",
    titleFR: "Église Saint-Tillo",
    titlePCD: "Église Saint-Tillo",
    titleVLS: "Sint-Tillokerke",
    titleEN: "Saint Tillo Church",
    titleES: "Iglesia de San Tillo",
    titleDE: "Sankt-Tillo-Kirche",
    descriptionNL: "De historische parochiekerk van Izegem, gebouwd in de 19e eeuw op de plaats van een oudere kerk.",
    descriptionFR: "L'église paroissiale historique d'Izegem, construite au 19e siècle sur l'emplacement d'une église plus ancienne.",
    descriptionPCD: "L'église paroissiale historique d'Izegem, construite au 19e siécle sus l'emplacemint d'eune église pus ancienne.",
    descriptionVLS: "De historische paroachiekerke van Izegem, gebouwd in de 19e eeuw op de ploatse van e oudere kerke.",
    descriptionEN: "The historic parish church of Izegem, built in the 19th century on the site of an older church.",
    descriptionES: "La iglesia parroquial histórica de Izegem, construida en el siglo XIX en el lugar de una iglesia más antigua.",
    descriptionDE: "Die historische Pfarrkirche von Izegem, im 19. Jahrhundert an der Stelle einer älteren Kirche erbaut."
  },
  {
    // Marktplein/Grote Markt Izegem
    position: [50.9147, 3.2137],
    titleNL: "Marktplein",
    titleFR: "Place du Marché",
    titlePCD: "Place du Marché",
    titleVLS: "Marktplein",
    titleEN: "Market Square",
    titleES: "Plaza del Mercado",
    titleDE: "Marktplatz",
    descriptionNL: "Het centrale plein van Izegem waar de wekelijkse markt plaatsvindt.",
    descriptionFR: "La place centrale d'Izegem où se tient le marché hebdomadaire.",
    descriptionPCD: "La place cintrale d'Izegem oùsqu'el marché hebdomadaire s'tint.",
    descriptionVLS: "T centroale plein van Izegem woar da de wekelikse markt is.",
    descriptionEN: "The central square of Izegem where the weekly market takes place.",
    descriptionES: "La plaza central de Izegem donde se celebra el mercado semanal.",
    descriptionDE: "Der zentrale Platz von Izegem, auf dem der Wochenmarkt stattfindet."
  },
  {
    // Kanaal Roeselare-Leie: noordwest van Izegem centrum
    position: [50.9230, 3.2015],
    titleNL: "Kanaal Roeselare-Leie",
    titleFR: "Canal Roeselare-Leie",
    titlePCD: "Canal Roeselare-Leie",
    titleVLS: "Kanoal Roeselare-Leie",
    titleEN: "Roeselare-Leie Canal",
    titleES: "Canal Roeselare-Leie",
    titleDE: "Kanal Roeselare-Leie",
    descriptionNL: "Het kanaal dat Roeselare met de Leie verbindt, aangelegd in de 19e eeuw.",
    descriptionFR: "Le canal reliant Roulers à la Lys, creusé au 19e siècle.",
    descriptionPCD: "L'canal qu'i relie Roulers à la Lys, creusé au 19e siécle.",
    descriptionVLS: "T kanoal da Roeselare mee de Leie verbindt, aangelegd in de 19e eeuw.",
    descriptionEN: "The canal connecting Roeselare to the Leie river, constructed in the 19th century.",
    descriptionES: "El canal que conecta Roeselare con el río Leie, construido en el siglo XIX.",
    descriptionDE: "Der Kanal, der Roeselare mit der Leie verbindet, im 19. Jahrhundert angelegt."
  },
  {
    // De Mandel rivier: oostelijk van centrum waar de rivier stroomt
    position: [50.9095, 3.2285],
    titleNL: "De Mandel",
    titleFR: "La Mandel",
    titlePCD: "La Mandel",
    titleVLS: "De Mandel",
    titleEN: "The Mandel River",
    titleES: "El Río Mandel",
    titleDE: "Die Mandel",
    descriptionNL: "De Mandel ontspringt in Passendale en stroomt 39,5 km naar de Leie bij Wakken. Al sinds de prehistorie bepaalde deze rivier het leven in de Mandelvallei. De naam 'Ten Mandere' van de heemkring verwijst naar deze rivier. In 1979 werd de Mandel in Izegem ingekokerd, maar ze blijft cruciaal voor de industriële geschiedenis van de regio.",
    descriptionFR: "La Mandel prend sa source à Passchendaele et parcourt 39,5 km jusqu'à la Lys à Wakken. Depuis la préhistoire, cette rivière a façonné la vie dans la vallée de la Mandel. Le nom 'Ten Mandere' du cercle historique fait référence à cette rivière. En 1979, la Mandel a été canalisée à Izegem, mais elle reste cruciale pour l'histoire industrielle de la région.",
    descriptionPCD: "La Mandel prind s'source à Passchendaele et parcourt 39,5 km jusqu'à la Lys à Wakken. Deupuis la préhistoère, chte riviére a façonné la vie dins la vallée d'la Mandel. L'nom 'Ten Mandere' du cercle historiqu fait référince à chte riviére. In 1979, la Mandel a té canalisée à Izegem.",
    descriptionVLS: "De Mandel ontspringt in Passendale en stroomt 39,5 km noar de Leie bie Wakken. Al van in de prehistorie bepaolde dezen rivier t leven in de Mandelvallei. De noam 'Ten Mandere' van de heemkringe verwijst noar dezen rivier. In 1979 wier de Mandel in Izegem ingekokerd, mo ze bluuft cruciaal voe de industriële geschiedenisse.",
    descriptionEN: "The Mandel originates in Passendale and flows 39.5 km to the Leie river at Wakken. Since prehistoric times, this river has shaped life in the Mandel Valley. The name 'Ten Mandere' of the local history society refers to this river. In 1979, the Mandel was enclosed in pipes in Izegem, but it remains crucial to the region's industrial history.",
    descriptionES: "El Mandel nace en Passendale y recorre 39,5 km hasta el río Leie en Wakken. Desde la prehistoria, este río ha moldeado la vida en el valle del Mandel. El nombre 'Ten Mandere' del círculo histórico local hace referencia a este río. En 1979, el Mandel fue canalizado en Izegem, pero sigue siendo crucial para la historia industrial.",
    descriptionDE: "Die Mandel entspringt in Passendale und fließt 39,5 km zur Leie bei Wakken. Seit der Vorgeschichte hat dieser Fluss das Leben im Mandeltal geprägt. Der Name 'Ten Mandere' des Heimatvereins bezieht sich auf diesen Fluss. 1979 wurde die Mandel in Izegem verrohrt, bleibt aber entscheidend für die Industriegeschichte der Region."
  },
  {
    // E403 Snelweg: zuidwest van Izegem centrum
    position: [50.9020, 3.1880],
    titleNL: "E403 Snelweg",
    titleFR: "Autoroute E403",
    titlePCD: "Autoroute E403",
    titleVLS: "E403 Autoweg",
    titleEN: "E403 Highway",
    titleES: "Autopista E403",
    titleDE: "Autobahn E403",
    descriptionNL: "De snelweg die Izegem verbindt met Brugge en Doornik.",
    descriptionFR: "L'autoroute reliant Izegem à Bruges et Tournai.",
    descriptionPCD: "L'autoroute qu'i relie Izegem à Bruges et Tournai.",
    descriptionVLS: "De autoweg die Izegem verbindt mee Brugge en Doorniek.",
    descriptionEN: "The highway connecting Izegem to Bruges and Tournai.",
    descriptionES: "La autopista que conecta Izegem con Brujas y Tournai.",
    descriptionDE: "Die Autobahn, die Izegem mit Brügge und Tournai verbindet."
  }
];

type MapLayer = 'osm' | 'satellite' | 'topo';

const InteractieveKaart = () => {
  const { language } = useLanguage();
  const { unlockAchievement } = useGame();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [activeLayer, setActiveLayer] = useState<MapLayer>('osm');
  const [clickedMarkers, setClickedMarkers] = useState<Set<number>>(new Set());
  const layerRef = useRef<L.TileLayer | null>(null);

  // Handle marker click for achievement tracking
  const handleMarkerClick = (index: number) => {
    if (!clickedMarkers.has(index)) {
      const newClickedMarkers = new Set(clickedMarkers);
      newClickedMarkers.add(index);
      setClickedMarkers(newClickedMarkers);
      
      // Unlock kaart_verkenner when 3 or more markers are clicked
      if (newClickedMarkers.size >= 3) {
        unlockAchievement('kaart_verkenner');
      }
    }
  };

  const content = {
    nl: {
      title: "Interactieve Kaart van Izegem",
      subtitle: "Ontdek de stad en omgeving",
      description: "Verken Izegem met deze interactieve kaart. Klik op de markers voor meer informatie over belangrijke locaties.",
      layers: {
        osm: "Stratenkaart",
        satellite: "Satelliet",
        topo: "Topografisch"
      },
      zoomIn: "Inzoomen",
      zoomOut: "Uitzoomen"
    },
    fr: {
      title: "Carte Interactive d'Izegem",
      subtitle: "Découvrez la ville et ses environs",
      description: "Explorez Izegem avec cette carte interactive. Cliquez sur les marqueurs pour plus d'informations sur les lieux importants.",
      layers: {
        osm: "Plan des rues",
        satellite: "Satellite",
        topo: "Topographique"
      },
      zoomIn: "Zoomer",
      zoomOut: "Dézoomer"
    },
    pcd: {
      title: "Carte Interactive d'Izegem",
      subtitle: "Découvrez la ville et ses alintours",
      description: "Esplorez Izegem aveuc chte carte interactive. Cliquez sus les marqueurs pour pus d'infos sus les places importants.",
      layers: {
        osm: "Plan des rues",
        satellite: "Satellite",
        topo: "Topographique"
      },
      zoomIn: "Zoomer",
      zoomOut: "Dézoomer"
    },
    vls: {
      title: "Interactieve Koarte van Izegem",
      subtitle: "Ontdekt de stad en omstreeken",
      description: "Verkent Izegem mee deze interactieve koarte. Klikt op de markers voe mee informoasje over belangrike ploatsen.",
      layers: {
        osm: "Stroatenkoarte",
        satellite: "Satelliet",
        topo: "Topografisch"
      },
      zoomIn: "Inzoemen",
      zoomOut: "Uutzoemen"
    },
    en: {
      title: "Interactive Map of Izegem",
      subtitle: "Discover the city and surroundings",
      description: "Explore Izegem with this interactive map. Click on the markers for more information about important locations.",
      layers: {
        osm: "Street Map",
        satellite: "Satellite",
        topo: "Topographic"
      },
      zoomIn: "Zoom in",
      zoomOut: "Zoom out"
    },
    es: {
      title: "Mapa Interactivo de Izegem",
      subtitle: "Descubre la ciudad y sus alrededores",
      description: "Explore Izegem con este mapa interactivo. Haga clic en los marcadores para más información sobre lugares importantes.",
      layers: {
        osm: "Mapa de calles",
        satellite: "Satélite",
        topo: "Topográfico"
      },
      zoomIn: "Acercar",
      zoomOut: "Alejar"
    },
    de: {
      title: "Interaktive Karte von Izegem",
      subtitle: "Entdecken Sie die Stadt und Umgebung",
      description: "Erkunden Sie Izegem mit dieser interaktiven Karte. Klicken Sie auf die Markierungen für weitere Informationen über wichtige Orte.",
      layers: {
        osm: "Straßenkarte",
        satellite: "Satellit",
        topo: "Topografisch"
      },
      zoomIn: "Vergrößern",
      zoomOut: "Verkleinern"
    }
  };

  const t = content[language as keyof typeof content] || content.nl;

  const tileLayers: Record<MapLayer, { url: string; attribution: string }> = {
    osm: {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: '&copy; Esri, Maxar, Earthstar Geographics'
    },
    topo: {
      url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
    }
  };

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on Izegem
    const map = L.map(mapRef.current, {
      center: [50.9172, 3.215],
      zoom: 14,
      zoomControl: false
    });

    // Add initial tile layer
    layerRef.current = L.tileLayer(tileLayers.osm.url, {
      attribution: tileLayers.osm.attribution
    }).addTo(map);

    // Add markers
    markers.forEach((marker, index) => {
      const title = language === 'sv' ? (marker.titleSV || marker.titleEN) : language === 'nl' ? marker.titleNL : language === 'fr' ? marker.titleFR : language === 'vls' ? marker.titleVLS : language === 'en' ? marker.titleEN : language === 'es' ? marker.titleES : language === 'de' ? marker.titleDE : marker.titlePCD;
      const description = language === 'sv' ? (marker.descriptionSV || marker.descriptionEN) : language === 'nl' ? marker.descriptionNL : language === 'fr' ? marker.descriptionFR : language === 'vls' ? marker.descriptionVLS : language === 'en' ? marker.descriptionEN : language === 'es' ? marker.descriptionES : language === 'de' ? marker.descriptionDE : marker.descriptionPCD;
      
      const leafletMarker = L.marker(marker.position)
        .addTo(map)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold text-base mb-1">${title}</h3>
            <p class="text-sm text-gray-600">${description}</p>
          </div>
        `);
      
      leafletMarker.on('click', () => {
        handleMarkerClick(index);
      });
    });

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update markers when language changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    
    // Clear existing markers and re-add with new language
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current?.removeLayer(layer);
      }
    });

    markers.forEach((marker, index) => {
      const title = language === 'sv' ? (marker.titleSV || marker.titleEN) : language === 'nl' ? marker.titleNL : language === 'fr' ? marker.titleFR : language === 'vls' ? marker.titleVLS : language === 'en' ? marker.titleEN : language === 'es' ? marker.titleES : language === 'de' ? marker.titleDE : marker.titlePCD;
      const description = language === 'sv' ? (marker.descriptionSV || marker.descriptionEN) : language === 'nl' ? marker.descriptionNL : language === 'fr' ? marker.descriptionFR : language === 'vls' ? marker.descriptionVLS : language === 'en' ? marker.descriptionEN : language === 'es' ? marker.descriptionES : language === 'de' ? marker.descriptionDE : marker.descriptionPCD;
      
      const leafletMarker = L.marker(marker.position)
        .addTo(mapInstanceRef.current!)
        .bindPopup(`
          <div class="p-2">
            <h3 class="font-semibold text-base mb-1">${title}</h3>
            <p class="text-sm text-gray-600">${description}</p>
          </div>
        `);
      
      leafletMarker.on('click', () => {
        handleMarkerClick(index);
      });
    });
  }, [language]);

  const changeLayer = (layer: MapLayer) => {
    if (!mapInstanceRef.current || !layerRef.current) return;
    
    mapInstanceRef.current.removeLayer(layerRef.current);
    layerRef.current = L.tileLayer(tileLayers[layer].url, {
      attribution: tileLayers[layer].attribution
    }).addTo(mapInstanceRef.current);
    
    setActiveLayer(layer);
  };

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  return (
    <section id="kaart" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <MapPin className="h-8 w-8 text-primary" />
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
              {t.title}
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.description}
          </p>
        </div>

        <div className="relative rounded-xl overflow-hidden shadow-2xl border border-border">
          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
            {/* Layer Switcher */}
            <div className="bg-background/95 backdrop-blur-sm rounded-lg shadow-lg p-2 border border-border">
              <div className="flex items-center gap-1 mb-2">
                <Layers className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex flex-col gap-1">
                {(Object.keys(tileLayers) as MapLayer[]).map((layer) => (
                  <Button
                    key={layer}
                    variant={activeLayer === layer ? "default" : "ghost"}
                    size="sm"
                    className="text-xs justify-start"
                    onClick={() => changeLayer(layer)}
                  >
                    {t.layers[layer]}
                  </Button>
                ))}
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="bg-background/95 backdrop-blur-sm rounded-lg shadow-lg border border-border">
              <Button
                variant="ghost"
                size="sm"
                className="w-full rounded-b-none"
                onClick={handleZoomIn}
                aria-label={t.zoomIn}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <div className="border-t border-border" />
              <Button
                variant="ghost"
                size="sm"
                className="w-full rounded-t-none"
                onClick={handleZoomOut}
                aria-label={t.zoomOut}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Map Container */}
          <div 
            ref={mapRef} 
            className="w-full h-[250px] md:h-[300px]"
            style={{ background: 'hsl(var(--muted))' }}
          />
        </div>

        <p className="text-center text-sm text-muted-foreground mt-4 mb-8">
          {language === 'nl' 
            ? "Kaartgegevens © OpenStreetMap contributors" 
            : language === 'vls'
            ? "Koartgegevens © OpenStreetMap contributors"
            : language === 'en'
            ? "Map data © OpenStreetMap contributors"
            : language === 'es'
            ? "Datos del mapa © OpenStreetMap contributors"
            : language === 'de'
            ? "Kartendaten © OpenStreetMap contributors"
            : "Données cartographiques © OpenStreetMap contributors"}
        </p>

        {/* External Map Resources */}
        <div className="mt-8 p-6 bg-card rounded-xl border border-border">
          <h3 className="font-serif text-xl font-bold text-foreground mb-4 text-center">
            {language === 'nl' 
              ? "Bekijk historische kaarten" 
              : language === 'vls'
              ? "Bekiek historische koarten"
              : language === 'fr'
              ? "Consultez les cartes historiques"
              : language === 'en'
              ? "View historical maps"
              : language === 'es'
              ? "Ver mapas históricos"
              : language === 'de'
              ? "Historische Karten ansehen"
              : "Consultez les cartes historiques"}
          </h3>
          <p className="text-muted-foreground text-center mb-6">
            {language === 'nl'
              ? "Voor echte historische kaarten van Izegem (Ferrariskaart, Popp kadaster, stafkaarten) kun je terecht bij deze officiële bronnen:"
              : language === 'vls'
              ? "Voe echte historische koarten van Izegem (Ferrariskoarte, Popp kadaster, stafkoarten) ku je terechte bie deze officiële bronnen:"
              : language === 'fr'
              ? "Pour les véritables cartes historiques d'Izegem (carte de Ferraris, cadastre Popp, cartes d'état-major), consultez ces sources officielles :"
              : language === 'en'
              ? "For authentic historical maps of Izegem (Ferraris map, Popp cadastre, staff maps), visit these official sources:"
              : language === 'es'
              ? "Para mapas históricos auténticos de Izegem (mapa de Ferraris, catastro Popp, mapas de estado mayor), consulte estas fuentes oficiales:"
              : language === 'de'
              ? "Für authentische historische Karten von Izegem (Ferrariskarte, Popp-Kataster, Stabskarten) besuchen Sie diese offiziellen Quellen:"
              : "Pour les vraies cartes historiques d'Izegem (carte d'Ferraris, cadastre Popp, cartes d'état-major), consultez ches sources officielles :"}
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="https://www.geopunt.be/kaart?b=grb_basiskaart&l=ferraris&o=50.917,3.215,15"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <Map className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  Geopunt.be
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'nl' 
                    ? "Ferrariskaart (1771-1778)" 
                    : language === 'vls'
                    ? "Ferrariskoarte (1771-1778)"
                    : language === 'fr'
                    ? "Carte de Ferraris (1771-1778)"
                    : language === 'en'
                    ? "Ferraris Map (1771-1778)"
                    : language === 'es'
                    ? "Mapa de Ferraris (1771-1778)"
                    : language === 'de'
                    ? "Ferrariskarte (1771-1778)"
                    : "Carte d'Ferraris (1771-1778)"}
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a
              href="https://www.cartesius.be/CartesiusPortal/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  Cartesius.be
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'nl' 
                    ? "Popp kadasterkaarten (1850)" 
                    : language === 'vls'
                    ? "Popp kadasterkoarten (1850)"
                    : language === 'fr'
                    ? "Atlas cadastral Popp (1850)"
                    : language === 'en'
                    ? "Popp Cadastral Maps (1850)"
                    : language === 'es'
                    ? "Mapas catastrales Popp (1850)"
                    : language === 'de'
                    ? "Popp-Katasterkarten (1850)"
                    : "Atlas cadastral Popp (1850)"}
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>

            <a
              href="https://www.kbr.be/nl/projecten/kaart-van-ferraris/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-background rounded-lg border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  KBR.be
                </h4>
                <p className="text-sm text-muted-foreground">
                  {language === 'nl' 
                    ? "Koninklijke Bibliotheek" 
                    : language === 'vls'
                    ? "Koninklike Bibliotheke"
                    : language === 'fr'
                    ? "Bibliothèque Royale"
                    : language === 'en'
                    ? "Royal Library"
                    : language === 'es'
                    ? "Biblioteca Real"
                    : language === 'de'
                    ? "Königliche Bibliothek"
                    : "Bibliothéque Royale"}
                </p>
              </div>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractieveKaart;
