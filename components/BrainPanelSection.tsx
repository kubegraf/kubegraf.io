"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Incident Timelines",
    description: "Visualize anomalies over time with intelligent event correlation and root cause analysis.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18"></path>
        <path d="M18 17V9"></path>
        <path d="M13 17V5"></path>
        <path d="M8 17v-3"></path>
      </svg>
    )
  },
  {
    title: "AI Summaries",
    description: "Human-readable insights and recommendations powered by neural analysis of cluster behavior.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 6v6l4 2"></path>
      </svg>
    )
  },
  {
    title: "JSON Exports",
    description: "Integrate with your tools seamlessly. Export diagnostics, metrics, and recommendations in standard formats.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
      </svg>
    )
  }
];

export function BrainPanelSection() {
  return (
    <section className="relative py-24 px-0" id="brain-panel" style={{
      background: "linear-gradient(180deg, rgba(10, 0, 26, 0.8), rgba(30, 0, 57, 0.8))"
    }}>
      <div className="w-[min(1600px,100%)] mx-auto px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#3b82f6] text-[0.85rem] uppercase tracking-[0.4em] mb-3 font-semibold">
            Brain Panel V1
          </p>
          <h2 className="text-[clamp(2.5rem,5vw,3.5rem)] font-bold mb-6 leading-[1.1]">
            Your AI SRE
          </h2>
          <p className="text-[1.125rem] text-[#cbd5f5] max-w-3xl mx-auto leading-[1.7]">
            Context-aware diagnostics with 24-72h event analysis, JSON exports, and actionable fixes. Now with multi-namespace persistence and deployment progress overlays.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-8 max-w-[1200px] mx-auto lg:grid-cols-1">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-[rgba(255,255,255,0.05)] to-[rgba(59,130,246,0.02)] border border-[rgba(59,130,246,0.2)] rounded-2xl p-8 backdrop-blur-sm transition-all duration-300 hover:border-[rgba(59,130,246,0.5)] hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]">
                <div className="text-[#00d9ff] mb-6 flex items-center justify-center w-16 h-16 mx-auto bg-[rgba(0,217,255,0.1)] rounded-xl group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-[#94a3b8] leading-[1.7]">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
