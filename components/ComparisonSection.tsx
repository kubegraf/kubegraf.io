"use client";

import { motion } from "framer-motion";

export function ComparisonSection() {
  return (
    <section className="relative py-24 px-0">
      <div className="w-[min(1400px,100%)] mx-auto px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.2] mb-4 text-white">
            How KubeGraf Compares
          </h2>
          <p className="text-xl text-[#94a3b8] max-w-3xl mx-auto">
            Transparent comparison with popular Kubernetes tools. We believe in letting the features speak for themselves.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <div className="min-w-full inline-block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[rgba(59,130,246,0.3)]">
                  <th className="text-left p-4 text-[#94a3b8] font-semibold">Feature</th>
                  <th className="text-center p-4">
                    <motion.div
                      className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#8b5cf6] text-white font-bold backdrop-blur-sm"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(59,130,246,0.5)",
                          "0 0 40px rgba(59,130,246,0.8)",
                          "0 0 20px rgba(59,130,246,0.5)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      KubeGraf
                    </motion.div>
                  </th>
                  <th className="text-center p-4 text-[#94a3b8]">Lens Desktop</th>
                  <th className="text-center p-4 text-[#94a3b8]">k9s</th>
                  <th className="text-center p-4 text-[#94a3b8]">Kubectl</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: "Terminal UI", kubegraf: "✓", lens: "⚠", k9s: "✓", kubectl: "✗" },
                  { feature: "Web Dashboard", kubegraf: "✓", lens: "✓", k9s: "✗", kubectl: "✗" },
                  { feature: "AI Diagnostics", kubegraf: "✓", lens: "✗", k9s: "✗", kubectl: "✗" },
                  { feature: "Local-First", kubegraf: "✓", lens: "✓", k9s: "✓", kubectl: "✓" },
                ].map((row, idx) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(59,130,246,0.05)] transition-colors"
                  >
                    <td className="p-4 text-[#e2e8f0]">{row.feature}</td>
                    <td className="p-4 text-center">
                      <motion.span
                        className="text-[#8b5cf6] text-xl"
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: idx * 0.3,
                        }}
                      >
                        {row.kubegraf}
                      </motion.span>
                    </td>
                    <td className="p-4 text-center text-[#94a3b8]">{row.lens}</td>
                    <td className="p-4 text-center">
                      {row.k9s === "✓" ? (
                        <span className="text-[#8b5cf6] text-xl">{row.k9s}</span>
                      ) : (
                        <span className="text-[#94a3b8]">{row.k9s}</span>
                      )}
                    </td>
                    <td className="p-4 text-center text-[#94a3b8]">{row.kubectl}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
