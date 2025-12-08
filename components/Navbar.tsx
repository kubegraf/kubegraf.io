"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const opacity = useTransform(scrollY, [0, 100], [0.85, 0.95]);
  const blur = useTransform(scrollY, [0, 100], [16, 24]);

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.nav
      style={{
        backdropFilter: `blur(${blur}px)`,
        backgroundColor: `rgba(10, 10, 15, ${opacity})`,
      }}
      className="sticky top-0 z-10 border-b border-[rgba(59,130,246,0.3)]"
    >
      <div className="w-[min(1400px,100%)] mx-auto px-16 py-6 flex justify-between items-center">
        <motion.a
          href="/"
          className="flex items-center gap-[0.65rem] font-semibold text-inherit no-underline tracking-[0.02em]"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            className="w-12 h-12 flex items-center justify-center"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <svg viewBox="0 0 100 100" className="w-12 h-12">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g filter="url(#glow)">
                <path
                  d="M80 30 L60 12 L35 12 L12 30 L12 70 L35 88 L60 88 L80 70 L80 50 L55 50"
                  fill="none"
                  stroke="url(#logoGrad)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </motion.div>
          <span className="bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#8b5cf6] bg-clip-text text-transparent">
            KubeGraf
          </span>
        </motion.a>

        <ul className="flex gap-5 list-none m-0 p-0">
          {["Product", "Docs", "Open Source", "Pricing", "Contact us"].map((link, idx) => (
            <li key={link}>
              <motion.a
                href={`#${link.toLowerCase().replace(" ", "-")}`}
              className="text-[0.85rem] tracking-[0.1em] uppercase text-[rgba(226,232,240,0.75)] transition-all duration-300 relative pb-1 hover:text-white"
              whileHover={{ y: -2 }}
            >
              {link}
              <motion.span
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#8b5cf6]"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
            </li>
          ))}
        </ul>

        <motion.span
          className="px-[1.8rem] py-[0.65rem] rounded-full border border-[rgba(59,130,246,0.4)] font-semibold uppercase text-[0.85rem] tracking-[0.1em] bg-[rgba(59,130,246,0.1)] cursor-pointer backdrop-blur-sm"
          whileHover={{
            scale: 1.05,
            backgroundColor: "rgba(59,130,246,0.2)",
            boxShadow: "0 0 30px rgba(59,130,246,0.5)",
            y: -2,
          }}
        >
          Get started
        </motion.span>
      </div>
    </motion.nav>
  );
}
