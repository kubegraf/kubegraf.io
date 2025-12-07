"use client";

import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="relative py-12 px-0 text-center">
      <div className="w-[min(1600px,100%)] mx-auto px-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.h2
            className="text-[clamp(2rem,4vw,3rem)] leading-[1.2] mb-4 m-0 text-white"
            animate={{
              textShadow: [
                "0 0 20px rgba(59,130,246,0.5)",
                "0 0 40px rgba(59,130,246,0.8)",
                "0 0 20px rgba(59,130,246,0.5)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            Ready to get started?
          </motion.h2>
          <p className="text-xl text-[#94a3b8] max-w-2xl mx-auto my-6">
            Join thousands of engineers using KubeGraf to deploy, monitor, and manage their clusters with confidence. Start free today.
          </p>
          <div className="flex justify-center gap-4 flex-wrap mt-8">
            <motion.a
              href="#installation"
              className="px-[1.6rem] py-[0.9rem] rounded-full border-none font-semibold text-[0.95rem] tracking-[0.05em] cursor-pointer text-white bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#8b5cf6] relative overflow-hidden"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 50px rgba(59,130,246,1), 0 0 80px rgba(99,102,241,0.8)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              />
              <span className="relative z-10">Get Started Free</span>
            </motion.a>
          </div>
          <motion.div
            className="flex justify-center gap-3 flex-wrap mt-4 text-[0.95rem]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {["~15MB binary", "Zero dependencies", "Completely local", "Zero security compromise"].map((tag, idx) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(59,130,246,0.5)",
                }}
                className="py-[0.4rem] px-4 rounded-full border border-[rgba(59,130,246,0.4)] bg-[rgba(59,130,246,0.1)] backdrop-blur-sm text-[#3b82f6]"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
