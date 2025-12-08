"use client";

import { motion } from "framer-motion";

export function SignalStreams() {
  const streams = Array.from({ length: 6 }, (_, index) => index);

  return (
    <div className="pointer-events-none absolute inset-0 -z-20 overflow-hidden">
      <div className="relative h-full w-full">
        {streams.map((stream) => (
          <motion.div
            key={stream}
            className="absolute left-1/2 top-0 h-full w-0.5 bg-gradient-to-b from-neon-cyan/80 via-transparent to-neon-purple/40 opacity-50"
            initial={{ y: "-100%" }}
            animate={{ y: "120%" }}
            transition={{
              repeat: Infinity,
              duration: 7 + stream,
              ease: "linear",
              delay: stream * 0.9
            }}
            style={{
              transform: `translateX(${(stream - 2.5) * 10}vw)`
            }}
          />
        ))}
      </div>
    </div>
  );
}
