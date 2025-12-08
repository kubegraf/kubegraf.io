"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-8 px-0 text-center border-t border-[rgba(59,130,246,0.2)] mt-8">
      <div className="w-[min(1400px,100%)] mx-auto px-16">
        <motion.nav
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 flex-wrap mb-3 text-[0.85rem] uppercase tracking-[0.2em]"
        >
          {["Features", "Pricing", "Installation", "GitHub"].map((link, idx) => (
            <motion.a
              key={link}
              href={link === "GitHub" ? "https://github.com/kubegraf/kubegraf" : `#${link.toLowerCase()}`}
              className="text-[#94a3b8] hover:text-[#3b82f6] transition-colors"
              whileHover={{
                scale: 1.1,
                textShadow: "0 0 10px rgba(59,130,246,0.6)",
              }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              {link}
            </motion.a>
          ))}
        </motion.nav>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="m-0 text-[0.85rem] text-[#94a3b8]"
        >
          © {new Date().getFullYear()} KubeGraf. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
