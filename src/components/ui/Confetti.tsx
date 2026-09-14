import { useEffect, useRef } from 'react';

interface ConfettiPiece {
  x: number;
  y: number;
  rotation: number;
  speedX: number;
  speedY: number;
  speedRotation: number;
  color: string;
  size: number;
  shape: 'square' | 'circle' | 'triangle';
}

interface ConfettiProps {
  isActive: boolean;
  duration?: number;
}

const COLORS = [
  'hsl(45, 93%, 47%)',   // gold
  'hsl(45, 93%, 60%)',   // light gold
  'hsl(45, 93%, 75%)',   // pale gold
  'hsl(25, 95%, 53%)',   // orange
  'hsl(25, 95%, 65%)',   // light orange
  'hsl(280, 65%, 60%)',  // purple
  'hsl(280, 65%, 75%)',  // light purple
  'hsl(200, 98%, 48%)',  // blue
  'hsl(200, 98%, 65%)',  // light blue
  'hsl(142, 71%, 45%)',  // green
  'hsl(142, 71%, 60%)',  // light green
  'hsl(340, 82%, 52%)',  // pink
  'hsl(340, 82%, 70%)',  // light pink
  'hsl(0, 85%, 60%)',    // red
  'hsl(55, 95%, 55%)',   // yellow
];

const Confetti = ({ isActive, duration = 3000 }: ConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const piecesRef = useRef<ConfettiPiece[]>([]);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create confetti pieces - more pieces for intensity
    const pieceCount = 300;
    piecesRef.current = [];

    // Create pieces in waves for more dramatic effect
    for (let i = 0; i < pieceCount; i++) {
      const shapes: ConfettiPiece['shape'][] = ['square', 'circle', 'triangle'];
      const wave = Math.floor(i / 100); // 3 waves of 100 pieces
      piecesRef.current.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 200 - wave * 50,
        rotation: Math.random() * 360,
        speedX: (Math.random() - 0.5) * 12,
        speedY: Math.random() * 4 + 1.5,
        speedRotation: (Math.random() - 0.5) * 15,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: Math.random() * 10 + 5,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
      });
    }

    const startTime = Date.now();

    const drawPiece = (piece: ConfettiPiece) => {
      ctx.save();
      ctx.translate(piece.x, piece.y);
      ctx.rotate((piece.rotation * Math.PI) / 180);
      ctx.fillStyle = piece.color;

      switch (piece.shape) {
        case 'square':
          ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
          break;
        case 'circle':
          ctx.beginPath();
          ctx.arc(0, 0, piece.size / 2, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(0, -piece.size / 2);
          ctx.lineTo(piece.size / 2, piece.size / 2);
          ctx.lineTo(-piece.size / 2, piece.size / 2);
          ctx.closePath();
          ctx.fill();
          break;
      }

      ctx.restore();
    };

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      piecesRef.current.forEach((piece) => {
        // Update position
        piece.x += piece.speedX;
        piece.y += piece.speedY;
        piece.rotation += piece.speedRotation;

        // Add gravity (slightly less for longer float time)
        piece.speedY += 0.08;

        // Add slight air resistance and wobble
        piece.speedX *= 0.995;
        piece.speedX += Math.sin(piece.y * 0.02) * 0.3;

        // Fade out near the end
        ctx.globalAlpha = progress > 0.75 ? 1 - (progress - 0.75) / 0.25 : 1;

        drawPiece(piece);
      });

      ctx.globalAlpha = 1;

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, duration]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[60]"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

export default Confetti;
