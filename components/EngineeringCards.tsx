"use client";

import { motion } from "framer-motion";

const engineeringCards = [
  { icon: "⚡", title: "Automation", accent: "rgba(59, 130, 246, 0.6)", glow: "rgba(59, 130, 246, 0.4)" },
  { icon: "🛡️", title: "Reliability", accent: "rgba(99, 102, 241, 0.6)", glow: "rgba(99, 102, 241, 0.4)" },
  { icon: "✓", title: "Trust", accent: "rgba(139, 92, 246, 0.6)", glow: "rgba(139, 92, 246, 0.4)" },
  { icon: "🚀", title: "Velocity", accent: "rgba(59, 130, 246, 0.6)", glow: "rgba(59, 130, 246, 0.4)" },
  { icon: "👁️", title: "Insight", accent: "rgba(99, 102, 241, 0.6)", glow: "rgba(99, 102, 241, 0.4)" },
  { icon: "💎", title: "Clarity", accent: "rgba(139, 92, 246, 0.6)", glow: "rgba(139, 92, 246, 0.4)" },
  { icon: "📈", title: "Scale", accent: "rgba(59, 130, 246, 0.6)", glow: "rgba(59, 130, 246, 0.4)" },
  { icon: "🔒", title: "Security", accent: "rgba(99, 102, 241, 0.6)", glow: "rgba(99, 102, 241, 0.4)" },
];

export function EngineeringCards() {
  return (
    <section className="relative py-8 px-0">
      <div className="w-[min(1600px,100%)] mx-auto px-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-xl font-medium mb-10 text-white"
        >
          Engineering teams across every industry rely on KubeGraf
        </motion.p>
        <div className="grid grid-cols-4 gap-4 max-w-[900px] mx-auto md:grid-cols-2 sm:grid-cols-2">
          {engineeringCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -12,
                scale: 1.08,
                transition: { duration: 0.3 },
              }}
              className="bg-gradient-to-br from-[rgba(255,255,255,0.08)] to-[rgba(59,130,246,0.04)] border border-[rgba(59,130,246,0.3)] border-t-2 rounded-xl py-6 px-4 text-center relative overflow-hidden backdrop-blur-sm"
              style={{
                borderTopColor: card.accent,
                boxShadow: `0 0 20px ${card.glow}`,
              }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br opacity-0 hover:opacity-20 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${card.accent}, transparent)`,
                }}
              />
              
              <motion.div
                className="text-[2rem] mb-3 flex items-center justify-center h-[50px] relative z-10"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              >
                {card.icon}
              </motion.div>
              <h4 className="m-0 text-[0.95rem] font-semibold text-white tracking-[0.3px] relative z-10">
                {card.title}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
