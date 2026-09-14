import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '@/contexts/LanguageContext';
import { MapPin } from 'lucide-react';

// Fix for default marker icons in Leaflet with Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const HallennesKaart = () => {
  const { language } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  const content = {
    nl: {
      title: "Geboorteplaats van Hubert Deleforge",
      subtitle: "Hallennes-lez-Haubourdin, ca. 1662",
      description: "Hubert Deleforge werd rond 1662 geboren in dit kleine dorp in de Châtellenie de Lille. Het dorp ligt op slechts 8 km ten zuidwesten van Rijsel (Lille), aan de rand van het Bois d'Haubourdin waar zijn familie als houthakkers werkte.",
      lille: "Rijsel (Lille)",
      lilleDesc: "Hoofdstad van de Châtellenie, handelscentrum",
      capinghem: "Capinghem",
      capinghemDesc: "Geboorteplaats van Antoinette Follet",
      izegem: "Izegem",
      izegemDesc: "Bestemming van de migratie (ca. 1699)",
      route: "Migratieroute (~50 km)"
    },
    fr: {
      title: "Lieu de naissance de Hubert Deleforge",
      subtitle: "Hallennes-lez-Haubourdin, vers 1662",
      description: "Hubert Deleforge est né vers 1662 dans ce petit village de la Châtellenie de Lille. Le village se trouve à seulement 8 km au sud-ouest de Lille, au bord du Bois d'Haubourdin où sa famille travaillait comme bûcherons.",
      lille: "Lille",
      lilleDesc: "Capitale de la Châtellenie, centre commercial",
      capinghem: "Capinghem",
      capinghemDesc: "Lieu de naissance d'Antoinette Follet",
      izegem: "Izegem",
      izegemDesc: "Destination de la migration (vers 1699)",
      route: "Route de migration (~50 km)"
    },
    en: {
      title: "Birthplace of Hubert Deleforge",
      subtitle: "Hallennes-lez-Haubourdin, c. 1662",
      description: "Hubert Deleforge was born around 1662 in this small village in the Châtellenie de Lille. The village lies just 8 km southwest of Lille, at the edge of the Bois d'Haubourdin where his family worked as woodcutters.",
      lille: "Lille",
      lilleDesc: "Capital of the Châtellenie, trade center",
      capinghem: "Capinghem",
      capinghemDesc: "Birthplace of Antoinette Follet",
      izegem: "Izegem",
      izegemDesc: "Destination of migration (c. 1699)",
      route: "Migration route (~50 km)"
    },
    pcd: {
      title: "Lieu d'naissance de Hubert Deleforge",
      subtitle: "Hallennes-lez-Haubourdin, vers 1662",
      description: "Hubert Deleforge al est né vers 1662 dins ch'ti village éd la Châtellenie de Lille. El village i s'trouve à 8 km au sud-ouest éd Lille, au bord du Bos d'Haubourdin oùsque s'famile travaillot comme boquillons.",
      lille: "Lille",
      lilleDesc: "Capitle éd la Châtellenie, cente commercial",
      capinghem: "Capinghem",
      capinghemDesc: "Lieu d'naissance d'Antoinette Follet",
      izegem: "Izegem",
      izegemDesc: "Destination d'la migration (vers 1699)",
      route: "Route de migration (~50 km)"
    },
    vls: {
      title: "Geboorteploatse van Hubert Deleforge",
      subtitle: "Hallennes-lez-Haubourdin, ca. 1662",
      description: "Hubert Deleforge wier gebeur'n rondst 1662 in dit klein deurp in de Châtellenie de Lille. T deurp ligt op mo 8 km te zuudwest'n van Rysel (Lille), aan de kante van 't Bos d'Haubourdin woar dat zyn familie ols houtkappers werkten.",
      lille: "Rysel (Lille)",
      lilleDesc: "Hoofdstad van de Châtellenie, handescentrum",
      capinghem: "Capinghem",
      capinghemDesc: "Geboorteploatse van Antoinette Follet",
      izegem: "Izegem",
      izegemDesc: "Bestemmienge van de migroatie (ca. 1699)",
      route: "Migroatieroute (~50 km)"
    }
  };

  const t = content[language as keyof typeof content] || content.nl;

  // Locations
  const hallennes: [number, number] = [50.5878, 2.9564];
  const lille: [number, number] = [50.6292, 3.0573];
  const capinghem: [number, number] = [50.6389, 2.9667];
  const izegem: [number, number] = [50.9172, 3.215];

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map centered on Hallennes
    const map = L.map(mapRef.current, {
      center: hallennes,
      zoom: 10,
      scrollWheelZoom: false,
      attributionControl: true
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    mapInstanceRef.current = map;

    // Custom icons
    const birthplaceIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background: linear-gradient(135deg, hsl(25, 65%, 45%), hsl(25, 65%, 55%)); width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 16px;">🏠</span>
      </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });

    const cityIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background: linear-gradient(135deg, hsl(220, 60%, 50%), hsl(220, 60%, 60%)); width: 28px; height: 28px; border-radius: 50%; border: 2px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 14px;">🏛️</span>
      </div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    const villageIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background: linear-gradient(135deg, hsl(150, 50%, 45%), hsl(150, 50%, 55%)); width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.25); display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 12px;">⛪</span>
      </div>`,
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });

    const destinationIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="background: linear-gradient(135deg, hsl(280, 60%, 50%), hsl(280, 60%, 60%)); width: 28px; height: 28px; border-radius: 50%; border: 2px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
        <span style="font-size: 14px;">🎯</span>
      </div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 14]
    });

    // Add markers
    L.marker(hallennes, { icon: birthplaceIcon })
      .addTo(map)
      .bindPopup(`
        <div style="text-align: center; min-width: 180px;">
          <strong style="font-size: 14px; color: hsl(25, 65%, 45%);">Hallennes-lez-Haubourdin</strong><br>
          <span style="font-size: 12px; color: #666;">${t.subtitle}</span>
        </div>
      `);

    L.marker(lille, { icon: cityIcon })
      .addTo(map)
      .bindPopup(`
        <div style="text-align: center; min-width: 150px;">
          <strong style="color: hsl(220, 60%, 50%);">${t.lille}</strong><br>
          <span style="font-size: 12px; color: #666;">${t.lilleDesc}</span>
        </div>
      `);

    L.marker(capinghem, { icon: villageIcon })
      .addTo(map)
      .bindPopup(`
        <div style="text-align: center; min-width: 150px;">
          <strong style="color: hsl(150, 50%, 45%);">${t.capinghem}</strong><br>
          <span style="font-size: 12px; color: #666;">${t.capinghemDesc}</span>
        </div>
      `);

    L.marker(izegem, { icon: destinationIcon })
      .addTo(map)
      .bindPopup(`
        <div style="text-align: center; min-width: 150px;">
          <strong style="color: hsl(280, 60%, 50%);">${t.izegem}</strong><br>
          <span style="font-size: 12px; color: #666;">${t.izegemDesc}</span>
        </div>
      `);

    // Migration route polyline
    const migrationRoute: [number, number][] = [
      hallennes,
      [50.65, 2.98],  // Via Armentieres
      [50.75, 3.05],  // Via Comines
      [50.82, 3.12],  // Via Menen
      izegem
    ];

    L.polyline(migrationRoute, {
      color: 'hsl(25, 65%, 50%)',
      weight: 3,
      opacity: 0.8,
      dashArray: '10, 10'
    }).addTo(map).bindTooltip(t.route, { permanent: false, direction: 'center' });

    // Fit bounds to show all markers
    const bounds = L.latLngBounds([hallennes, lille, capinghem, izegem]);
    map.fitBounds(bounds, { padding: [30, 30] });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update popups when language changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    
    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        const pos = layer.getLatLng();
        
        if (Math.abs(pos.lat - hallennes[0]) < 0.01 && Math.abs(pos.lng - hallennes[1]) < 0.01) {
          layer.setPopupContent(`
            <div style="text-align: center; min-width: 180px;">
              <strong style="font-size: 14px; color: hsl(25, 65%, 45%);">Hallennes-lez-Haubourdin</strong><br>
              <span style="font-size: 12px; color: #666;">${t.subtitle}</span>
            </div>
          `);
        } else if (Math.abs(pos.lat - lille[0]) < 0.01 && Math.abs(pos.lng - lille[1]) < 0.01) {
          layer.setPopupContent(`
            <div style="text-align: center; min-width: 150px;">
              <strong style="color: hsl(220, 60%, 50%);">${t.lille}</strong><br>
              <span style="font-size: 12px; color: #666;">${t.lilleDesc}</span>
            </div>
          `);
        } else if (Math.abs(pos.lat - capinghem[0]) < 0.01 && Math.abs(pos.lng - capinghem[1]) < 0.01) {
          layer.setPopupContent(`
            <div style="text-align: center; min-width: 150px;">
              <strong style="color: hsl(150, 50%, 45%);">${t.capinghem}</strong><br>
              <span style="font-size: 12px; color: #666;">${t.capinghemDesc}</span>
            </div>
          `);
        } else if (Math.abs(pos.lat - izegem[0]) < 0.01 && Math.abs(pos.lng - izegem[1]) < 0.01) {
          layer.setPopupContent(`
            <div style="text-align: center; min-width: 150px;">
              <strong style="color: hsl(280, 60%, 50%);">${t.izegem}</strong><br>
              <span style="font-size: 12px; color: #666;">${t.izegemDesc}</span>
            </div>
          `);
        }
      }
    });
  }, [language, t]);

  return (
    <div className="bg-card/50 rounded-2xl border border-border/50 overflow-hidden shadow-xl">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-primary/10 to-primary/5 border-b border-border/30">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-content: center">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-serif text-xl font-bold text-primary">{t.title}</h4>
            <p className="text-sm text-muted-foreground">{t.subtitle}</p>
          </div>
        </div>
        <p className="text-foreground/70 text-sm mt-3">{t.description}</p>
      </div>

      {/* Map */}
      <div ref={mapRef} className="h-[400px] w-full" />

      {/* Legend */}
      <div className="p-4 bg-muted/30 border-t border-border/30">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏠</span>
            <span className="text-foreground/80">Hallennes (Hubert)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">⛪</span>
            <span className="text-foreground/80">{t.capinghem} (Antoinette)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🏛️</span>
            <span className="text-foreground/80">{t.lille}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">🎯</span>
            <span className="text-foreground/80">{t.izegem}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-0.5 border-t-2 border-dashed border-primary"></span>
            <span className="text-foreground/80">{t.route}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HallennesKaart;
