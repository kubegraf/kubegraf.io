"use client";

import { motion } from "framer-motion";

export function OrbitRingsBackground() {
  const dots = Array.from({ length: 5 }, (_, index) => index);

  return (
    <div className="pointer-events-none absolute inset-0 -z-20 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        className="relative h-72 w-72"
      >
        {[0, 1, 2].map((ring) => (
          <motion.div
            key={ring}
            className="absolute inset-0 rounded-full border border-neon-cyan/30"
            style={{
              transform: `scale(${1 - ring * 0.15})`
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 14 + ring * 2, ease: "linear" }}
          />
        ))}
        {dots.map((dot) => (
          <motion.span
            key={dot}
            className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-neon-mint shadow-[0_0_28px_rgba(66,255,176,0.8)]"
            style={{
              transform: `translate(-50%, -50%) rotate(${dot * 72}deg) translateY(-110px)`
            }}
            animate={{
              rotate: [0, 360],
              translateY: [-110, -120, -110]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              delay: dot * 0.4
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
