"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const platforms = [
  {
    id: "mac",
    name: "macOS",
    icon: "🍎",
    commands: [
      {
        label: "Quick Install (Recommended)",
        command: "curl -sSL https://kubegraf.io/install.sh | bash",
        description: "Automatically detects your architecture and installs the latest version. Requires curl and tar.",
      },
    ],
    gradient: "from-[rgba(59,130,246,0.2)] to-[rgba(59,130,246,0.05)]",
  },
  {
    id: "linux",
    name: "Linux",
    icon: "🐧",
    commands: [
      {
        label: "Quick Install (Recommended)",
        command: "curl -sSL https://kubegraf.io/install.sh | bash",
        description: "Automatically detects your architecture and installs the latest version. Requires curl and tar.",
      },
    ],
    gradient: "from-[rgba(99,102,241,0.2)] to-[rgba(99,102,241,0.05)]",
  },
  {
    id: "windows",
    name: "Windows",
    icon: "🪟",
    commands: [
      {
        label: "PowerShell (Recommended)",
        command: "irm https://kubegraf.io/install.ps1 | iex",
        description: "Automatically downloads, installs, and adds to PATH. Requires PowerShell 5.1+.",
      },
    ],
    gradient: "from-[rgba(99,102,241,0.2)] to-[rgba(99,102,241,0.05)]",
  },
];

export function InstallationSection() {
  const [activePlatform, setActivePlatform] = useState("mac");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section id="installation" className="relative py-24 px-0">
      <div className="w-[min(1600px,100%)] mx-auto px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="uppercase text-[0.8rem] tracking-[0.3em] text-[#3b82f6] inline-block py-2 px-4 bg-[rgba(59,130,246,0.15)] rounded-full border border-[rgba(59,130,246,0.4)] mb-4 backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            Get Started in Seconds
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.2] mb-4 text-white">
            Quick Install
          </h2>
          <p className="text-xl text-[#94a3b8] max-w-2xl mx-auto">
            Choose your platform and install KubeGraf with a single command. No dependencies required.
          </p>
        </motion.div>

        <div className="flex justify-center gap-4 mb-8">
          {platforms.map((platform) => (
            <motion.button
              key={platform.id}
              onClick={() => setActivePlatform(platform.id)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activePlatform === platform.id
                  ? "bg-gradient-to-r from-[#3b82f6] via-[#8b5cf6] to-[#8b5cf6] text-white shadow-[0_0_30px_rgba(59,130,246,0.6)]"
                  : "bg-[rgba(255,255,255,0.05)] border border-[rgba(59,130,246,0.3)] text-[#94a3b8] hover:bg-[rgba(59,130,246,0.1)] backdrop-blur-sm"
              }`}
            >
              <span className="flex items-center gap-2">
                <span className="text-xl">{platform.icon}</span>
                <span>{platform.name}</span>
              </span>
            </motion.button>
          ))}
        </div>

        <div className="max-w-4xl mx-auto">
          {platforms.map((platform) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, x: activePlatform === platform.id ? 0 : 50 }}
              animate={{
                opacity: activePlatform === platform.id ? 1 : 0,
                x: activePlatform === platform.id ? 0 : 50,
                display: activePlatform === platform.id ? "block" : "none",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                {platform.commands.map((cmd, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                    className={`rounded-2xl border border-[rgba(59,130,246,0.4)] bg-gradient-to-br ${platform.gradient} p-6 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.5),0_0_40px_rgba(59,130,246,0.3)]`}
                  >
                    <p className="text-sm font-semibold text-[#3b82f6] mb-3">{cmd.label}</p>
                    <div className="relative">
                      <pre className="bg-[rgba(0,0,0,0.7)] rounded-lg p-4 text-sm text-[#e2e8f0] font-mono overflow-x-auto border border-[rgba(59,130,246,0.2)]">
                        {cmd.command}
                      </pre>
                      <motion.button
                        onClick={() => copyToClipboard(cmd.command, `${platform.id}-${idx}`)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-[rgba(59,130,246,0.2)] border border-[rgba(59,130,246,0.4)] text-[#3b82f6] text-sm font-semibold hover:bg-[rgba(59,130,246,0.3)] transition-all backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      >
                        {copied === `${platform.id}-${idx}` ? "✓ Copied!" : "Copy"}
                      </motion.button>
                    </div>
                    <p className="text-xs text-[#94a3b8] mt-3">{cmd.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
