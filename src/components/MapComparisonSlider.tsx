import { useState, useRef, useEffect, useCallback } from "react";
import { GripVertical, ZoomIn, Map } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapComparisonSliderProps {
  oldMapSrc: string;
  language: string;
  onZoomClick: () => void;
}

const MapComparisonSlider = ({ oldMapSrc, language, onZoomClick }: MapComparisonSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const modernMapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Initialize modern Leaflet map
  useEffect(() => {
    if (!modernMapRef.current || mapInstanceRef.current) return;

    // Center on Flanders region (roughly same area as old map) - shifted top-left
    const map = L.map(modernMapRef.current, {
      center: [50.5, 3.5],
      zoom: 8,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent | TouchEvent) => {
    if (!isDragging || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, [isDragging]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleMouseMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const getLabel = (key: 'old' | 'modern') => {
    const labels = {
      old: {
        nl: '16e-17e eeuw',
        fr: 'XVIe-XVIIe siècle',
        de: '16.-17. Jahrhundert',
        en: '16th-17th century',
        es: 'Siglos XVI-XVII',
        pcd: 'XVIe-XVIIe sièke',
        vls: '16e-17e eiw',
      },
      modern: {
        nl: 'Vandaag',
        fr: "Aujourd'hui",
        de: 'Heute',
        en: 'Today',
        es: 'Hoy',
        pcd: "Aujord'hui",
        vls: 'Vandoage',
      },
    };
    return labels[key][language as keyof typeof labels.old] || labels[key].nl;
  };

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden rounded-lg border border-border shadow-elevated select-none h-[350px] md:h-[450px]"
      style={{ cursor: isDragging ? 'ew-resize' : 'default' }}
    >
      {/* Modern Map (Background) */}
      <div 
        ref={modernMapRef}
        className="absolute inset-0 z-0"
      />

      {/* Old Map (Foreground with clip) */}
      <div 
        className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={oldMapSrc}
          alt="Historical map"
          className="w-full h-full object-cover"
          style={{ filter: 'sepia(0.1)' }}
          draggable={false}
        />
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 z-20 flex items-center justify-center cursor-ew-resize"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Vertical Line */}
        <div className="absolute top-0 bottom-0 w-1 bg-primary shadow-lg" />
        
        {/* Handle Button */}
        <div className="relative flex items-center justify-center w-10 h-16 bg-primary rounded-lg shadow-elevated border-2 border-background">
          <GripVertical className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-30 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border">
        <span className="text-sm font-medium text-primary">{getLabel('old')}</span>
      </div>
      <div className="absolute top-4 right-4 z-30 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border flex items-center gap-2">
        <Map className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium text-primary">{getLabel('modern')}</span>
      </div>

      {/* Zoom button for old map */}
      <button
        onClick={onZoomClick}
        className="absolute bottom-4 left-4 z-30 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-border flex items-center gap-2 hover:bg-background transition-colors"
      >
        <ZoomIn className="w-4 h-4 text-primary" />
        <span className="text-xs font-medium text-primary">
          {language === 'fr' ? 'Agrandir la carte ancienne' 
            : language === 'de' ? 'Alte Karte vergrößern'
            : language === 'en' ? 'Enlarge old map'
            : language === 'es' ? 'Ampliar mapa antiguo'
            : 'Oude kaart vergroten'}
        </span>
      </button>

      {/* Instructions overlay */}
      <div className="absolute bottom-4 right-4 z-30 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border">
        <span className="text-xs text-muted-foreground">
          {language === 'fr' ? '← Glissez →' 
            : language === 'de' ? '← Schieben →'
            : language === 'en' ? '← Drag →'
            : language === 'es' ? '← Arrastrar →'
            : '← Schuif →'}
        </span>
      </div>
    </div>
  );
};

export default MapComparisonSlider;