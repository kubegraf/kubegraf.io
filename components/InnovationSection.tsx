"use client";

import { motion } from "framer-motion";

const innovations = [
  {
    title: "Brain Panel (V1)",
    description: "Accessible via the header toggle, the Brain drawer surfaces a 24–72h timeline of incidents, spikes, and scaling events plus an AI-ready summary JSON.",
    features: [
      "Cluster timeline (incidents, warnings, scaling)",
      "AI-ready JSON export for LLM integration",
      "Context-aware recommendations",
    ],
    gradient: "from-[rgba(59,130,246,0.25)] via-[rgba(99,102,241,0.15)] to-[rgba(99,102,241,0.1)]",
    glow: "rgba(59, 130, 246, 0.5)",
  },
  {
    title: "Global Store + Cache",
    description: "A new SolidJS store centralizes cluster selection, multi-namespace state, and theming, persisting choices to localStorage.",
    features: [
      "Resource cache keyed by cluster + namespaces",
      "Pods/Deployments/Services use 15s TTL and background refreshes",
      "Skeleton-first UX with gentle updates to avoid flicker",
    ],
    gradient: "from-[rgba(99,102,241,0.25)] via-[rgba(99,102,241,0.15)] to-[rgba(34,211,238,0.1)]",
    glow: "rgba(99, 102, 241, 0.5)",
  },
];

export function InnovationSection() {
  return (
    <section className="relative py-24 px-0">
      <div className="w-[min(1400px,100%)] mx-auto px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[800px] mb-12"
        >
          <p className="uppercase text-[0.8rem] tracking-[0.3em] text-[#3b82f6] inline-block py-2 px-4 bg-[rgba(59,130,246,0.15)] rounded-full border border-[rgba(59,130,246,0.4)] mb-4 backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            Brain & Performance
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.2] my-2 text-white">
            Latest Innovations
          </h2>
          <p className="text-[#94a3b8] m-0">
            Cutting-edge features that make KubeGraf the most intelligent Kubernetes platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto md:grid-cols-1">
          {innovations.map((innovation, index) => (
            <motion.article
              key={innovation.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                y: -12,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className={`bg-gradient-to-br ${innovation.gradient} border border-[rgba(59,130,246,0.4)] rounded-3xl p-8 relative overflow-hidden backdrop-blur-xl`}
              style={{
                boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 60px ${innovation.glow}`,
              }}
            >
              {/* Rotating gradient overlay */}
              <motion.div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `linear-gradient(135deg, ${innovation.glow}, transparent)`,
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Floating particles inside card */}
              <motion.div
                className="absolute top-4 right-4 w-2 h-2 bg-[#3b82f6] rounded-full opacity-60"
                animate={{
                  y: [0, -10, 0],
                  x: [0, 5, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut",
                }}
              />

              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-3 text-white">{innovation.title}</h3>
                <p className="text-[#cbd5f5] mb-4 leading-relaxed">{innovation.description}</p>
                <ul className="space-y-2">
                  {innovation.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-2 text-[#cbd5f5] text-sm"
                    >
                      <motion.span
                        className="text-[#8b5cf6] mt-1"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.3,
                        }}
                      >
                        •
                      </motion.span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
