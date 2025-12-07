"use client";

import { motion } from "framer-motion";

const terminalLines = [
  "$ kubectl get pods --all-namespaces",
  "$ kubectl describe node gpu-01",
  "$ kubectl logs -f api-server -n kube-system"
];

export function TerminalPreview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-panel relative overflow-hidden rounded-3xl border border-white/20 bg-black/30 p-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
    >
      <div className="absolute inset-4 rounded-3xl border border-white/10 px-4 py-3">
        <span className="text-[0.55rem] text-gray-400">local.kubegraf</span>
      </div>
      <div className="relative z-10 space-y-3">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-gray-500">
          <span className="h-2.5 w-2.5 rounded-full bg-neon-cyan" />
          terminal
        </div>
        <pre className="rounded-2xl bg-black/70 p-6 text-sm font-semibold text-neon-mint">
          {terminalLines.join("\n")}
        </pre>
        <div className="flex flex-wrap gap-3 text-[0.65rem] uppercase tracking-[0.3em] text-white">
          {["kubectl get pods", "kubectl top nodes", "kubectl describe svc"].map((command) => (
            <motion.span
              key={command}
              className="rounded-full border border-white/10 px-3 py-1 text-white/40"
              whileHover={{ scale: 1.05, opacity: 0.95 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              {command}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
