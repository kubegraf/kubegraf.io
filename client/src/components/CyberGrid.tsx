import { useEffect, useRef, useState } from 'react';

export default function CyberGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      setIsMobile(window.innerWidth < 768);
    };
    resize();
    window.addEventListener('resize', resize);

    // Reduce grid density on mobile for better performance
    const gridSize = window.innerWidth < 768 ? 60 : 40;

    // Only a few nano scan lines - moving very slowly
    const scanLines: { y: number; speed: number; opacity: number; width: number }[] = [];

    // Initialize fewer lines on mobile (2) vs desktop (3)
    const numScanLines = window.innerWidth < 768 ? 2 : 3;
    for (let i = 0; i < numScanLines; i++) {
      scanLines.push({
        y: Math.random() * canvas.height,
        speed: 0.15 + Math.random() * 0.2, // Very slow
        opacity: 0.2 + Math.random() * 0.15,
        width: 80 + Math.random() * 120 // Nano width
      });
    }

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.016;

      // Clear canvas completely (transparent background)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw perspective grid
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)'; // Cyan, very subtle
      ctx.lineWidth = 1;

      // Vertical lines (converging to horizon)
      const horizonY = canvas.height * 0.3;
      const vanishX = canvas.width / 2;

      for (let x = -canvas.width; x < canvas.width * 2; x += gridSize) {
        const adjustedX = x + (time * 20) % gridSize; // Slow horizontal scroll

        ctx.beginPath();
        ctx.moveTo(adjustedX, canvas.height);
        // Lines converge toward center horizon
        const topX = vanishX + (adjustedX - vanishX) * 0.1;
        ctx.lineTo(topX, horizonY);
        ctx.stroke();
      }

      // Horizontal lines (getting closer together toward horizon)
      for (let i = 0; i < 20; i++) {
        const progress = i / 20;
        const y = horizonY + (canvas.height - horizonY) * Math.pow(progress, 1.5);
        const lineOpacity = 0.05 + progress * 0.08;

        ctx.strokeStyle = `rgba(6, 182, 212, ${lineOpacity})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Animated nano scan lines (few, slow, short)
      scanLines.forEach((line) => {
        line.y += line.speed;
        if (line.y > canvas.height + 20) {
          line.y = -20;
          line.speed = 0.15 + Math.random() * 0.2;
          line.opacity = 0.2 + Math.random() * 0.15;
          line.width = 80 + Math.random() * 120;
        }

        // Random x position for the nano line
        const x = (Math.sin(line.y * 0.005 + time * 0.1) * 0.5 + 0.5) * (canvas.width - line.width);

        // Draw nano line with subtle glow
        const gradient = ctx.createLinearGradient(x, 0, x + line.width, 0);
        gradient.addColorStop(0, 'rgba(6, 182, 212, 0)');
        gradient.addColorStop(0.3, `rgba(6, 182, 212, ${line.opacity})`);
        gradient.addColorStop(0.7, `rgba(6, 182, 212, ${line.opacity})`);
        gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, line.y);
        ctx.lineTo(x + line.width, line.y);
        ctx.stroke();
      });

      // Corner accents (tech/HUD style) - smaller on mobile
      const isMobileView = canvas.width < 768;
      const cornerSize = isMobileView ? 40 : 60;
      const cornerOffset = isMobileView ? 15 : 30;
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.lineWidth = 2;

      // Top-left corner
      ctx.beginPath();
      ctx.moveTo(cornerOffset, cornerOffset + cornerSize);
      ctx.lineTo(cornerOffset, cornerOffset);
      ctx.lineTo(cornerOffset + cornerSize, cornerOffset);
      ctx.stroke();

      // Top-right corner
      ctx.beginPath();
      ctx.moveTo(canvas.width - cornerOffset - cornerSize, cornerOffset);
      ctx.lineTo(canvas.width - cornerOffset, cornerOffset);
      ctx.lineTo(canvas.width - cornerOffset, cornerOffset + cornerSize);
      ctx.stroke();

      // Bottom-left corner
      ctx.beginPath();
      ctx.moveTo(cornerOffset, canvas.height - cornerOffset - cornerSize);
      ctx.lineTo(cornerOffset, canvas.height - cornerOffset);
      ctx.lineTo(cornerOffset + cornerSize, canvas.height - cornerOffset);
      ctx.stroke();

      // Bottom-right corner
      ctx.beginPath();
      ctx.moveTo(canvas.width - cornerOffset - cornerSize, canvas.height - cornerOffset);
      ctx.lineTo(canvas.width - cornerOffset, canvas.height - cornerOffset);
      ctx.lineTo(canvas.width - cornerOffset, canvas.height - cornerOffset - cornerSize);
      ctx.stroke();

    };

    animate();

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
