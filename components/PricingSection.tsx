"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Free",
    subtitle: "Perfect for learning",
    features: [
      "✓ All three interfaces (Terminal, Web, SPA)",
      "✓ Unlimited local clusters",
      "✓ Multi-cluster support (up to 5 clusters)",
      "✓ Basic observability",
    ],
    cta: "Get Started Free",
    featured: false,
    gradient: "from-[rgba(59,130,246,0.15)] to-[rgba(59,130,246,0.05)]",
    border: "rgba(59, 130, 246, 0.4)",
  },
  {
    name: "Pro",
    subtitle: "🚀 Grab it soon - Limited time offer",
    features: [
      "✓ Everything in Free, plus:",
      "✓ Brain Panel with AI diagnostics",
      "✓ Advanced tools & exports",
      "✓ Unlimited cluster connections",
    ],
    cta: "Start 14-Day Trial",
    featured: true,
    gradient: "from-[rgba(59,130,246,0.25)] via-[rgba(99,102,241,0.2)] to-[rgba(99,102,241,0.15)]",
    border: "rgba(59, 130, 246, 0.6)",
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 px-0">
      <div className="w-[min(1600px,100%)] mx-auto px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 max-w-full mx-auto"
        >
          <p className="uppercase text-[0.8rem] tracking-[0.3em] text-[#3b82f6] inline-block py-2 px-4 bg-[rgba(59,130,246,0.15)] rounded-full border border-[rgba(59,130,246,0.4)] mb-4 backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            Get Started Free
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.2] my-2 text-white">
            Always Free, Always Open Source
          </h2>
          <p className="text-[#94a3b8] m-0">
            Start with full free features. Upgrade to Pro when you&apos;re ready for advanced capabilities.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-12 max-w-[1200px] mx-auto md:grid-cols-1">
          {plans.map((plan, index) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{
                y: plan.featured ? -8 : -12,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
              className={`relative ${plan.featured ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {plan.featured && (
                <motion.div
                  className="absolute -top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#8b5cf6] text-white text-sm font-bold z-10 backdrop-blur-sm"
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
                  Most Popular
                </motion.div>
              )}
              <motion.div
                className={`relative rounded-3xl border ${plan.gradient} p-8 backdrop-blur-xl h-full`}
                style={{
                  borderColor: plan.border,
                  boxShadow: plan.featured
                    ? "0 30px 60px rgba(0,0,0,0.5), 0 0 80px rgba(59,130,246,0.4)"
                    : "0 20px 40px rgba(0,0,0,0.3), 0 0 40px rgba(59,130,246,0.2)",
                }}
                animate={
                  plan.featured
                    ? {
                        boxShadow: [
                          "0 30px 60px rgba(0,0,0,0.5), 0 0 80px rgba(59,130,246,0.4)",
                          "0 40px 80px rgba(0,0,0,0.6), 0 0 100px rgba(59,130,246,0.6)",
                          "0 30px 60px rgba(0,0,0,0.5), 0 0 80px rgba(59,130,246,0.4)",
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Animated gradient overlay for featured */}
                {plan.featured && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-[rgba(59,130,246,0.1)] via-transparent to-[rgba(99,102,241,0.1)] rounded-3xl"
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                )}

                <div className="relative z-10 mb-6">
                  <h3 className="text-3xl font-bold mb-2 text-white">{plan.name}</h3>
                  <p
                    className={`text-sm ${
                      plan.featured ? "text-[#8b5cf6] font-semibold" : "text-[#94a3b8]"
                    }`}
                  >
                    {plan.subtitle}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 relative z-10">
                  {plan.features.map((feature, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="text-[#e2e8f0]"
                    >
                      {feature}
                    </motion.li>
                  ))}
                </ul>

                <motion.a
                  href="#installation"
                    className={`block w-full text-center py-4 rounded-full font-semibold transition-all duration-300 relative z-10 ${
                    plan.featured
                      ? "bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#8b5cf6] text-white"
                      : "bg-[rgba(59,130,246,0.15)] border border-[rgba(59,130,246,0.4)] text-white hover:bg-[rgba(59,130,246,0.25)]"
                  }`}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: plan.featured
                      ? "0 0 40px rgba(59,130,246,0.8), 0 0 60px rgba(99,102,241,0.6)"
                      : "0 0 30px rgba(59,130,246,0.5)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {plan.cta}
                </motion.a>
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
