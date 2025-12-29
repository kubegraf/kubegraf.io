import { useEffect, useRef } from 'react';

/**
 * ForensicGrid - Incident Intelligence Background
 *
 * Static grid with occasional correlation flashes
 * Represents cluster resources and evidence correlation events
 * Minimal, ambient, forensic aesthetic
 */
export default function ForensicGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let lastFlash = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Grid configuration
    const gridSize = 80;
    const nodeSize = 3;

    // Correlation flash state
    interface Flash {
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      startTime: number;
      duration: number;
    }

    let currentFlash: Flash | null = null;

    // Draw static grid nodes
    const drawGrid = () => {
      ctx.fillStyle = 'rgba(100, 116, 139, 0.03)'; // Slate, very subtle

      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // Draw correlation flash line
    const drawFlash = (flash: Flash, progress: number) => {
      // Fade in/out
      const opacity = progress < 0.2 ? progress / 0.2 :
                      progress > 0.8 ? (1 - progress) / 0.2 : 1;

      const gradient = ctx.createLinearGradient(flash.x1, flash.y1, flash.x2, flash.y2);
      gradient.addColorStop(0, `rgba(6, 182, 212, 0)`);
      gradient.addColorStop(0.5, `rgba(6, 182, 212, ${opacity * 0.15})`);
      gradient.addColorStop(1, `rgba(6, 182, 212, 0)`);

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(flash.x1, flash.y1);
      ctx.lineTo(flash.x2, flash.y2);
      ctx.stroke();

      // Draw pulsing nodes at endpoints
      ctx.fillStyle = `rgba(6, 182, 212, ${opacity * 0.2})`;
      ctx.beginPath();
      ctx.arc(flash.x1, flash.y1, nodeSize * 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(flash.x2, flash.y2, nodeSize * 1.5, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw static grid
      drawGrid();

      // Trigger new flash every 6-8 seconds
      if (!currentFlash && time - lastFlash > 6000 + Math.random() * 2000) {
        // Random grid points
        const cols = Math.floor(canvas.width / gridSize);
        const rows = Math.floor(canvas.height / gridSize);

        const x1 = Math.floor(Math.random() * cols) * gridSize;
        const y1 = Math.floor(Math.random() * rows) * gridSize;

        // Pick a point not too close, not too far
        let x2 = Math.floor(Math.random() * cols) * gridSize;
        let y2 = Math.floor(Math.random() * rows) * gridSize;

        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        if (distance > gridSize * 3 && distance < gridSize * 8) {
          currentFlash = {
            x1, y1, x2, y2,
            startTime: time,
            duration: 800
          };
          lastFlash = time;
        }
      }

      // Draw current flash
      if (currentFlash) {
        const elapsed = time - currentFlash.startTime;
        const progress = elapsed / currentFlash.duration;

        if (progress < 1) {
          drawFlash(currentFlash, progress);
        } else {
          currentFlash = null;
        }
      }
    };

    animate(0);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}
