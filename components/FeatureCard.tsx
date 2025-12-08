"use client";

import { motion } from "framer-motion";
import type { IconProps } from "./icons";

type IconComponent = (props: IconProps) => JSX.Element;

type FeatureCardProps = {
  title: string;
  description: string;
  accentLabel: string;
  accentColor: string;
  Icon: IconComponent;
};

export function FeatureCard({
  title,
  description,
  accentLabel,
  accentColor,
  Icon
}: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ translateY: -6, boxShadow: "0 20px 45px rgba(139,77,255,0.25)" }}
      transition={{ type: "spring", stiffness: 160, damping: 18 }}
      className="glass-panel flex min-h-[180px] flex-col gap-4 rounded-2xl border border-white/10 p-6"
    >
      <div className="flex items-center justify-between">
        <div
          className="h-12 w-12 rounded-xl bg-white/5 p-3"
          style={{ color: accentColor, boxShadow: "0 10px 25px rgba(66,255,176,0.3)" }}
        >
          <Icon size={24} strokeWidth={1.5} />
        </div>
        <span
          className="text-xs font-semibold uppercase tracking-[0.3em] text-white"
          style={{ color: accentColor }}
        >
          {accentLabel}
        </span>
      </div>
      <h3 className="text-2xl font-semibold text-white">{title}</h3>
      <p className="text-sm leading-relaxed text-gray-300">{description}</p>
    </motion.div>
  );
}
