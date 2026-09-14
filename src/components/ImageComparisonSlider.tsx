import { useState, useRef, useEffect, useCallback, ReactNode } from "react";
import { GripVertical } from "lucide-react";

interface ImageComparisonSliderProps {
  leftImage: string;
  rightImage: string;
  leftLabel: string;
  rightLabel: string;
  leftTotal?: string;
  rightTotal?: string;
  overlay?: ReactNode;
}

const ImageComparisonSlider = ({ 
  leftImage, 
  rightImage, 
  leftLabel, 
  rightLabel,
  leftTotal,
  rightTotal,
  overlay 
}: ImageComparisonSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden rounded-lg border border-border shadow-elevated select-none"
      style={{ cursor: isDragging ? 'ew-resize' : 'default' }}
    >
      {/* Right Image (Background) */}
      <div className="relative w-full">
        <img 
          src={rightImage}
          alt={rightLabel}
          className="w-full h-auto"
          draggable={false}
        />
      </div>

      {/* Left Image (Foreground with clip) */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={leftImage}
          alt={leftLabel}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Custom overlay (e.g. numbered buttons) */}
      {overlay && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          {overlay}
        </div>
      )}

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
        <span className="text-sm font-bold text-primary">{leftLabel}</span>
        {leftTotal && (
          <span className="block text-xs text-muted-foreground">{leftTotal}</span>
        )}
      </div>
      <div className="absolute top-4 right-4 z-30 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border text-right">
        <span className="text-sm font-bold text-primary">{rightLabel}</span>
        {rightTotal && (
          <span className="block text-xs text-muted-foreground">{rightTotal}</span>
        )}
      </div>

      {/* Instructions overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-border">
        <span className="text-xs text-muted-foreground">← Schuif / Drag →</span>
      </div>
    </div>
  );
};

export default ImageComparisonSlider;
