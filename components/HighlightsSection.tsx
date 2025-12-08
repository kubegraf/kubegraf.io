"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    icon: "🎯",
    title: "Three Ways to Work",
    description: "Terminal UI for speed, Web Dashboard for visibility, or Modern SPA for collaboration. All interfaces share real-time data—choose what fits your workflow.",
    badge: "Multi-Interface",
    color: "primary",
    gradient: "from-[rgba(59,130,246,0.2)] to-[rgba(59,130,246,0.05)]",
    border: "rgba(59, 130, 246, 0.6)",
    glow: "rgba(59, 130, 246, 0.4)",
  },
  {
    icon: "🧠",
    title: "Context-Aware Diagnostics",
    description: "Brain Panel analyzes 24-72 hours of cluster events, surfaces OOM warnings, scaling anomalies, and reliability issues with actionable recommendations.",
    badge: "AI Intelligence",
    color: "secondary",
    gradient: "from-[rgba(99,102,241,0.2)] to-[rgba(99,102,241,0.05)]",
    border: "rgba(99, 102, 241, 0.6)",
    glow: "rgba(99, 102, 241, 0.4)",
  },
  {
    icon: "🔒",
    title: "Completely Local, Zero Security Compromise",
    description: "~15MB binary runs entirely on your machine. No data leaves your cluster—ever. Works completely offline, behind VPNs, and in air-gapped environments. Zero cloud dependencies, zero security risks.",
    badge: "Privacy First",
    color: "cyan",
    gradient: "from-[rgba(99,102,241,0.2)] to-[rgba(99,102,241,0.05)]",
    border: "rgba(99, 102, 241, 0.6)",
    glow: "rgba(99, 102, 241, 0.4)",
  },
  {
    icon: "🔄",
    title: "Built for GitOps Teams",
    description: "Native integrations for ArgoCD and Flux. Visualize sync status, detect drift, and trigger reconciliation—all from your preferred interface.",
    badge: "GitOps Ready",
    color: "purple",
    gradient: "from-[rgba(34,211,238,0.2)] to-[rgba(34,211,238,0.05)]",
    border: "rgba(99, 102, 241, 0.6)",
    glow: "rgba(99, 102, 241, 0.4)",
  },
];

export function HighlightsSection() {
  return (
    <section id="insights" className="relative py-24 px-0">
      <div className="w-[min(1600px,100%)] mx-auto px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-full mb-12"
        >
          <p className="uppercase text-[0.8rem] tracking-[0.3em] text-[#3b82f6] inline-block py-2 px-4 bg-[rgba(59,130,246,0.15)] rounded-full border border-[rgba(59,130,246,0.4)] mb-4 backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            Why KubeGraf
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.2] my-2 text-white">
            Built for Speed and Insight
          </h2>
          <p className="text-[#94a3b8] m-0">
            Four core capabilities that set KubeGraf apart for modern Kubernetes teams.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 max-w-full xl:grid-cols-3 md:grid-cols-1">
          {highlights.map((highlight, index) => (
            <motion.article
              key={highlight.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -15,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className={`bg-gradient-to-br ${highlight.gradient} border border-[rgba(255,255,255,0.15)] rounded-[20px] p-10 flex flex-col gap-4 relative overflow-hidden backdrop-blur-xl`}
              style={{
                borderTop: `3px solid ${highlight.border}`,
                boxShadow: `0 15px 30px rgba(0,0,0,0.3), 0 0 40px ${highlight.glow}`,
              }}
            >
              {/* Floating background effect */}
              <motion.div
                className="absolute inset-0 opacity-0 hover:opacity-20 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${highlight.border}, transparent)`,
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[rgba(59,130,246,0.3)] to-[rgba(99,102,241,0.2)] rounded-2xl text-[2rem] relative z-10 backdrop-blur-sm"
                style={{
                  boxShadow: `0 0 30px ${highlight.glow}`,
                }}
                whileHover={{
                  scale: 1.15,
                  rotate: 5,
                  transition: { duration: 0.3 },
                }}
              >
                {highlight.icon}
              </motion.div>
              <h3 className="my-2 text-[1.25rem] text-white m-0 relative z-10 font-bold">
                {highlight.title}
              </h3>
              <p className="text-[#cbd5f5] m-0 leading-[1.6] flex-grow relative z-10">
                {highlight.description}
              </p>
              <motion.span
                className="inline-flex py-[0.4rem] px-4 bg-[rgba(59,130,246,0.2)] border border-[rgba(59,130,246,0.4)] rounded-full text-[0.75rem] uppercase tracking-[0.1em] font-semibold text-[#3b82f6] self-start mt-auto relative z-10 backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(59,130,246,0.6)",
                }}
              >
                {highlight.badge}
              </motion.span>
              
              {/* Dotted particles inside card */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: "3px",
                    height: "3px",
                    background: highlight.glow,
                    left: `${15 + i * 20}%`,
                    top: `${30 + (i % 2) * 40}%`,
                    boxShadow: `0 0 4px ${highlight.glow}`,
                  }}
                  animate={{
                    y: [0, -10, 0],
                    x: [0, 8, 0],
                    opacity: [0.3, 0.7, 0.3],
                  }}
                  transition={{
                    duration: 2 + i * 0.3,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
