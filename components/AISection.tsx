"use client";

import { motion } from "framer-motion";

const aiFeatures = [
  {
    title: "Security",
    description: "Simple implementation of service-to-service security including mTLS authentication, authorization, and encryption.",
    gradient: "from-[rgba(59,130,246,0.2)] to-[rgba(59,130,246,0.05)]",
    glow: "rgba(59, 130, 246, 0.4)",
  },
  {
    title: "Observability",
    description: "Optimize best practices with deep visibility into applications and identify exactly where to focus to improve performance.",
    gradient: "from-[rgba(99,102,241,0.2)] to-[rgba(99,102,241,0.05)]",
    glow: "rgba(99, 102, 241, 0.4)",
  },
  {
    title: "Reliability",
    description: "Manage networking for services consistently, without any additional developer overhead.",
    gradient: "from-[rgba(99,102,241,0.2)] to-[rgba(99,102,241,0.05)]",
    glow: "rgba(99, 102, 241, 0.4)",
  },
];

export function AISection() {
  return (
    <section id="ai" className="relative py-24 px-0">
      <div className="w-[min(1400px,100%)] mx-auto px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-[800px] mb-12"
        >
          <p className="uppercase text-[0.8rem] tracking-[0.3em] text-[#3b82f6] inline-block py-2 px-4 bg-[rgba(59,130,246,0.15)] rounded-full border border-[rgba(59,130,246,0.4)] mb-4 backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            AI For DevOps & Automation
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.2] my-2 text-white">
            Automation that keeps your pipeline moving
          </h2>
          <p className="text-[#94a3b8] m-0">
            Don&apos;t let your pipeline become the bottleneck. KubeGraf AI intelligently automates, safeguards, and accelerates delivery at any scale.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-6 max-w-6xl mx-auto md:grid-cols-1">
          {aiFeatures.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{
                y: -15,
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              className={`bg-gradient-to-br ${feature.gradient} border border-[rgba(59,130,246,0.3)] rounded-[20px] p-8 relative overflow-hidden backdrop-blur-xl`}
              style={{
                boxShadow: `0 15px 30px rgba(0,0,0,0.3), 0 0 40px ${feature.glow}`,
              }}
            >
              {/* Floating gradient overlay */}
              <motion.div
                className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${feature.glow}, transparent)`,
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

              <div className="relative z-10">
                <h3 className="text-[1.25rem] text-white mb-3 m-0 font-bold">{feature.title}</h3>
                <p className="text-[#cbd5f5] m-0 leading-[1.6] mb-4">{feature.description}</p>
                <motion.a
                  href="#"
                  className="text-[#3b82f6] font-semibold text-sm inline-block"
                  whileHover={{
                    scale: 1.05,
                    textShadow: "0 0 10px rgba(59,130,246,0.8)",
                  }}
                >
                  Learn more →
                </motion.a>
                
                {/* Dotted particles inside card */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: "3px",
                      height: "3px",
                      background: feature.glow,
                      left: `${20 + i * 25}%`,
                      top: `${30 + (i % 2) * 30}%`,
                      boxShadow: `0 0 4px ${feature.glow}`,
                    }}
                    animate={{
                      y: [0, -10, 0],
                      x: [0, 8, 0],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 2.5 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
