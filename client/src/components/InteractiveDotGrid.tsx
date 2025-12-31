import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/useIsMobile';

interface Dot {
  x: number;
  y: number;
  baseRadius: number;
  radius: number;
  baseColor: string;
  activeColor: string;
  color: string;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
}

export default function InteractiveDotGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const isMobile = useIsMobile();

  useEffect(() => {
    // Skip entirely on mobile for performance
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configuration
    const DOT_SPACING = 40;
    const BASE_RADIUS = 1.5;
    const MAX_RADIUS = 4;
    const INTERACTION_RADIUS = 150;
    const BASE_COLOR = 'rgba(6, 182, 212, 0.15)';
    const ACTIVE_COLOR = 'rgba(6, 182, 212, 0.8)';
    const RETURN_SPEED = 0.08;
    const DISPERSION_FORCE = 0.5;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      // Reinitialize dots on resize
      initDots(rect.width, rect.height);
    };

    const initDots = (width: number, height: number) => {
      dotsRef.current = [];
      const cols = Math.ceil(width / DOT_SPACING) + 1;
      const rows = Math.ceil(height / DOT_SPACING) + 1;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * DOT_SPACING;
          const y = j * DOT_SPACING;
          dotsRef.current.push({
            x,
            y,
            originalX: x,
            originalY: y,
            baseRadius: BASE_RADIUS,
            radius: BASE_RADIUS,
            baseColor: BASE_COLOR,
            activeColor: ACTIVE_COLOR,
            color: BASE_COLOR,
            vx: 0,
            vy: 0,
          });
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      dotsRef.current.forEach((dot) => {
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - dot.x;
          const dy = mouseRef.current.y - dot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < INTERACTION_RADIUS) {
            // Calculate interaction strength (1 at center, 0 at edge)
            const strength = 1 - distance / INTERACTION_RADIUS;
            const strengthSquared = strength * strength;

            // Expand radius
            dot.radius = BASE_RADIUS + (MAX_RADIUS - BASE_RADIUS) * strengthSquared;

            // Brighten color
            const alpha = 0.15 + 0.65 * strengthSquared;
            dot.color = `rgba(6, 182, 212, ${alpha})`;

            // Add dispersion force (push dots away from cursor)
            if (distance > 0) {
              const force = DISPERSION_FORCE * strengthSquared;
              dot.vx -= (dx / distance) * force;
              dot.vy -= (dy / distance) * force;
            }
          } else {
            // Reset to base state
            dot.radius += (BASE_RADIUS - dot.radius) * 0.1;
            dot.color = BASE_COLOR;
          }
        } else {
          // Mouse not active - reset everything
          dot.radius += (BASE_RADIUS - dot.radius) * 0.1;
          dot.color = BASE_COLOR;
        }

        // Apply velocity and return to original position
        dot.x += dot.vx;
        dot.y += dot.vy;
        dot.vx += (dot.originalX - dot.x) * RETURN_SPEED;
        dot.vy += (dot.originalY - dot.y) * RETURN_SPEED;
        dot.vx *= 0.9; // Friction
        dot.vy *= 0.9;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = dot.color;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ opacity: 0.7 }}
    />
  );
}
