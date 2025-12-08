"use client";

import { motion } from "framer-motion";
import { DownloadCloudIcon } from "./icons";
import { OrbitRingsBackground } from "./OrbitRingsBackground";

export function CTA() {
  return (
    <section className="relative isolate mt-16 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#07030f] to-[#130429] p-10">
      <OrbitRingsBackground />
      <div className="relative z-10 flex flex-col gap-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.6em] text-neon-mint">Get Started Free</p>
        <h2 className="text-4xl font-semibold text-white sm:text-5xl">
          No credit card. No limits on local clusters. KubeGraf is fully open-source.
        </h2>
        <p className="text-base text-gray-300">
          Download the lightweight ~15MB binary and control Kubernetes with AI-powered clarity.
        </p>
        <motion.a
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="inline-flex items-center justify-center gap-3 rounded-full border border-neon-cyan/80 bg-gradient-to-r from-neon-cyan/60 to-neon-mint/40 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-black shadow-[0_20px_50px_rgba(66,255,176,0.4)]"
          href="#"
        >
          <DownloadCloudIcon size={18} />
          Download Now · Free Forever
        </motion.a>
      </div>
    </section>
  );
}
