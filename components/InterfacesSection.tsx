"use client";

import { motion } from "framer-motion";

const interfaces = [
  {
    icon: "⌘",
    name: "Terminal UI",
    description: "Keyboard-first terminal interface with vim-style navigation. Browse pods, deployments, and services without leaving your shell. SSH-friendly and works over low-bandwidth connections.",
    tags: "Vim keybindings · Zero dependencies · Works over SSH",
    gradient: "from-[rgba(59,130,246,0.25)] to-[rgba(59,130,246,0.1)]",
    glow: "rgba(59, 130, 246, 0.5)",
  },
  {
    icon: "⌨",
    name: "Web Dashboard",
    description: "Browser-based dashboard with real-time WebSocket updates. View metrics, logs, and events in unified views. Perfect for team collaboration and presenting cluster health.",
    tags: "Real-time · WebSocket · Team ready",
    gradient: "from-[rgba(99,102,241,0.25)] to-[rgba(99,102,241,0.1)]",
    glow: "rgba(99, 102, 241, 0.5)",
  },
  {
    icon: "✦",
    name: "Modern SPA",
    description: "Customizable workspace with saved filters, favorite resources, and shareable views. Built-in runbooks help standardize incident response across teams.",
    tags: "Customizable · Shareable · Runbooks",
    gradient: "from-[rgba(99,102,241,0.25)] to-[rgba(99,102,241,0.1)]",
    glow: "rgba(99, 102, 241, 0.5)",
  },
];

export function InterfacesSection() {
  return (
    <section className="relative py-24 px-0">
      <div className="w-[min(1600px,100%)] mx-auto px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-full"
        >
          <p className="uppercase text-[0.8rem] tracking-[0.3em] text-[#3b82f6] inline-block py-2 px-4 bg-[rgba(59,130,246,0.15)] rounded-full border border-[rgba(59,130,246,0.4)] mb-4 backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            How You Work
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.2] my-2 text-white">
            Three Ways to Interact
          </h2>
          <p className="text-[#94a3b8] m-0">
            Choose your interface—terminal, web, or modern SPA—all synced in real-time.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-8 lg:grid-cols-1">
          {interfaces.map((iface, index) => (
            <motion.article
              key={iface.name}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -15,
                scale: 1.03,
                rotateY: 5,
                transition: { duration: 0.3 },
              }}
              className={`bg-gradient-to-br ${iface.gradient} border border-[rgba(59,130,246,0.4)] rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl`}
              style={{
                boxShadow: `0 30px 60px rgba(0,0,0,0.7), 0 0 80px ${iface.glow}`,
              }}
            >
              {/* Animated background gradient */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `linear-gradient(135deg, ${iface.glow}, transparent)`,
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
              />

              <motion.div
                className="text-5xl mb-4 relative z-10"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: index * 0.3,
                  ease: "easeInOut",
                }}
              >
                {iface.icon}
              </motion.div>
              <h3 className="text-2xl font-bold mb-4 text-white relative z-10">{iface.name}</h3>
              <p className="text-[#cbd5f5] mb-3 text-sm leading-relaxed relative z-10">{iface.description}</p>
              <p className="text-xs text-[#94a3b8] relative z-10">{iface.tags}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
