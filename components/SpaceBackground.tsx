"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

interface MovingObject {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number;
  color: string;
}

export function SpaceBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [movingObjects, setMovingObjects] = useState<MovingObject[]>([]);

  useEffect(() => {
    // Generate stars (small dots)
    const newStars: Star[] = [];
    for (let i = 0; i < 150; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.5 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.7,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 4,
      });
    }
    setStars(newStars);

    // Generate moving objects (space objects)
    const colors = ["rgba(59, 130, 246, 0.4)", "rgba(99, 102, 241, 0.3)", "rgba(139, 92, 246, 0.3)", "rgba(6, 182, 212, 0.3)"];
    const newObjects: MovingObject[] = [];
    for (let i = 0; i < 20; i++) {
      newObjects.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 4,
        speed: 0.01 + Math.random() * 0.03,
        direction: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setMovingObjects(newObjects);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Grid Lines */}
      <div className="absolute inset-0 opacity-20">
        {/* Horizontal lines */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-[rgba(59,130,246,0.3)] to-transparent"
            style={{
              top: `${(i + 1) * 5}%`,
              left: 0,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "easeInOut",
            }}
          />
        ))}
        {/* Vertical lines */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-[rgba(99,102,241,0.3)] to-transparent"
            style={{
              left: `${(i + 1) * 5}%`,
              top: 0,
            }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 4 + i * 0.2,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Connecting Lines (diagonal) */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
          </linearGradient>
        </defs>
        {[...Array(15)].map((_, i) => {
          const x1 = Math.random() * 100;
          const y1 = Math.random() * 100;
          const x2 = x1 + (Math.random() - 0.5) * 30;
          const y2 = y1 + (Math.random() - 0.5) * 30;
          return (
            <motion.line
              key={`line-${i}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="url(#lineGrad)"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>

      {/* Stars (small dots) */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-[rgba(59,130,246,0.8)]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px rgba(59,130,246,0.8)`,
          }}
          animate={{
            opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Additional smaller stars with different colors */}
      {[...Array(100)].map((_, i) => {
        const colors = [
          "rgba(59, 130, 246, 0.6)",
          "rgba(99, 102, 241, 0.5)",
          "rgba(99, 102, 241, 0.5)",
          "rgba(99, 102, 241, 0.4)",
        ];
        const color = colors[i % colors.length];
        return (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: "1px",
              height: "1px",
              background: color,
              boxShadow: `0 0 2px ${color}`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut",
            }}
          />
        );
      })}

      {/* Moving Space Objects */}
      {movingObjects.map((obj) => (
        <motion.div
          key={obj.id}
          className="absolute rounded-full blur-sm"
          style={{
            width: `${obj.size}px`,
            height: `${obj.size}px`,
            background: `radial-gradient(circle, ${obj.color}, transparent)`,
            boxShadow: `0 0 ${obj.size * 3}px ${obj.color}`,
          }}
          animate={{
            x: [
              `${obj.x}vw`,
              `${obj.x + Math.cos(obj.direction) * 50}vw`,
              `${obj.x}vw`,
            ],
            y: [
              `${obj.y}vh`,
              `${obj.y + Math.sin(obj.direction) * 50}vh`,
              `${obj.y}vh`,
            ],
            opacity: [0.3, 0.7, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 20 + obj.id * 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Orbiting particles */}
      {[...Array(8)].map((_, i) => {
        const radius = 100 + i * 50;
        const angle = (i * 45) * (Math.PI / 180);
        return (
          <motion.div
            key={`orbit-${i}`}
            className="absolute rounded-full"
            style={{
              width: "3px",
              height: "3px",
              background: i % 2 === 0 ? "rgba(59, 130, 246, 0.6)" : "rgba(99, 102, 241, 0.6)",
              boxShadow: `0 0 6px ${i % 2 === 0 ? "rgba(59, 130, 246, 0.8)" : "rgba(99, 102, 241, 0.8)"}`,
              left: "50%",
              top: "50%",
            }}
            animate={{
              x: [
                Math.cos(angle) * radius,
                Math.cos(angle + Math.PI * 2) * radius,
                Math.cos(angle) * radius,
              ],
              y: [
                Math.sin(angle) * radius,
                Math.sin(angle + Math.PI * 2) * radius,
                Math.sin(angle) * radius,
              ],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}

      {/* Floating lines */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`float-line-${i}`}
          className="absolute h-px bg-gradient-to-r from-transparent via-[rgba(99,102,241,0.4)] to-transparent"
          style={{
            width: "200px",
            left: `${10 + i * 8}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0.2, 0.6, 0.2],
            scaleX: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 8 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

