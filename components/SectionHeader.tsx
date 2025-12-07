"use client";

import { motion } from "framer-motion";

type SectionHeaderProps = {
  title: React.ReactNode;
  subtitle: string;
};

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl space-y-2 text-center text-gray-200"
    >
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="text-base text-gray-400 sm:text-lg">{subtitle}</p>
    </motion.div>
  );
}
