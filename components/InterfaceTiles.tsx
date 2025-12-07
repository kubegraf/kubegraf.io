"use client";

import { motion } from "framer-motion";
import { DashboardIcon, MonitorIcon, TerminalIcon } from "./icons";

const tiles = [
  {
    name: "Terminal UI",
    description: "JetBrains Mono controls with autocomplete AI helpers.",
    Icon: TerminalIcon
  },
  {
    name: "Web Dashboard",
    description: "High-fidelity visualization with live topology overlays.",
    Icon: MonitorIcon
  },
  {
    name: "Modern SPA",
    description: "Composable UI that syncs real-time with the backend brain.",
    Icon: DashboardIcon
  }
];

export function InterfaceTiles() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {tiles.map(({ name, description, Icon }, index) => (
        <motion.div
          key={name}
          whileHover={{ translateY: -8 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="glass-panel border border-white/10 p-6"
        >
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-white/10 p-2 text-neon-cyan">
              <Icon size={20} />
            </span>
            <h3 className="text-lg font-semibold text-white">{name}</h3>
          </div>
          <p className="mt-4 text-sm text-gray-300">{description}</p>
        </motion.div>
      ))}
    </div>
  );
}
