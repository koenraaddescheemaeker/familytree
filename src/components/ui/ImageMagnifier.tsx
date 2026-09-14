import { useState, useRef, useCallback } from "react";
import { Search } from "lucide-react";

interface ImageMagnifierProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  magnifierSize?: number;
  zoomLevel?: number;
  rotation?: number;
}

const ImageMagnifier = ({
  src,
  alt,
  className = "",
  imgClassName = "",
  magnifierSize = 250,
  zoomLevel = 4,
  rotation = 0,
}: ImageMagnifierProps) => {
  const [showMagnifier, setShowMagnifier] = useState(false);
  const [magnifierPos, setMagnifierPos] = useState({ x: 0, y: 0 });
  const [imgBgPos, setImgBgPos] = useState({ x: "0%", y: "0%" });
  const imgRef = useRef<HTMLImageElement>(null);
  const [naturalSize, setNaturalSize] = useState({ w: 0, h: 0 });

  const handleMouseEnter = useCallback(() => {
    if (imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      setNaturalSize({ w: naturalWidth, h: naturalHeight });
    }
    setShowMagnifier(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!imgRef.current) return;
      const rect = imgRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Percentage position on the displayed image
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      setMagnifierPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setImgBgPos({ x: `${xPercent}%`, y: `${yPercent}%` });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setShowMagnifier(false);
  }, []);

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={imgClassName}
        loading="lazy"
        style={rotation ? { transform: `rotate(${rotation}deg)` } : undefined}
      />

      {/* Hint icon */}
      {!showMagnifier && (
        <div className="absolute bottom-3 right-3 bg-black/50 text-white p-2 rounded-full opacity-70 pointer-events-none flex items-center gap-1.5">
          <Search className="w-4 h-4" />
          <span className="text-xs hidden sm:inline">Vergrootglas</span>
        </div>
      )}

      {/* Magnifier lens */}
      {showMagnifier && (
        <div
          className="absolute pointer-events-none border-2 border-white/80 rounded-full shadow-2xl z-10"
          style={{
            width: magnifierSize,
            height: magnifierSize,
            left: magnifierPos.x - magnifierSize / 2,
            top: magnifierPos.y - magnifierSize / 2,
            backgroundImage: `url(${src})`,
            backgroundSize: `${naturalSize.w * zoomLevel}px ${naturalSize.h * zoomLevel}px`,
            backgroundPosition: imgBgPos.x + " " + imgBgPos.y,
            backgroundRepeat: "no-repeat",
            transform: rotation ? `rotate(${rotation}deg)` : undefined,
            backgroundColor: "white",
          }}
        />
      )}
    </div>
  );
};

export default ImageMagnifier;
