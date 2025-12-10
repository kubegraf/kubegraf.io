"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09l-.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="currentColor"/>
  </svg>
);

const LinuxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
    <ellipse cx="12" cy="15" rx="6" ry="7" fill="#000000"/>
    <ellipse cx="12" cy="15" rx="4" ry="5.5" fill="#FFFFFF"/>
    <ellipse cx="12" cy="8" rx="5" ry="4.5" fill="#000000"/>
    <ellipse cx="10" cy="8" rx="1.2" ry="1.8" fill="#FFFFFF"/>
    <ellipse cx="14" cy="8" rx="1.2" ry="1.8" fill="#FFFFFF"/>
    <ellipse cx="10" cy="8.3" rx="0.6" ry="0.9" fill="#000000"/>
    <ellipse cx="14" cy="8.3" rx="0.6" ry="0.9" fill="#000000"/>
    <ellipse cx="12" cy="9.5" rx="1.2" ry="0.8" fill="#FFA500"/>
    <ellipse cx="9.5" cy="21" rx="1.5" ry="0.8" fill="#FFA500"/>
    <ellipse cx="14.5" cy="21" rx="1.5" ry="0.8" fill="#FFA500"/>
    <ellipse cx="7" cy="14" rx="1.5" ry="3" fill="#000000" transform="rotate(-20 7 14)"/>
    <ellipse cx="17" cy="14" rx="1.5" ry="3" fill="#000000" transform="rotate(20 17 14)"/>
  </svg>
);

const WindowsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
    <defs>
      <linearGradient id="winGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#0078D4"}}/>
        <stop offset="100%" style={{stopColor:"#00BCF2"}}/>
      </linearGradient>
      <linearGradient id="winGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor:"#00BCF2"}}/>
        <stop offset="100%" style={{stopColor:"#00D4FF"}}/>
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="8" height="8" rx="0.5" fill="url(#winGrad1)"/>
    <rect x="13" y="3" width="8" height="8" rx="0.5" fill="url(#winGrad2)"/>
    <rect x="3" y="13" width="8" height="8" rx="0.5" fill="url(#winGrad2)"/>
    <rect x="13" y="13" width="8" height="8" rx="0.5" fill="url(#winGrad1)"/>
  </svg>
);

const platforms = [
  {
    id: "mac",
    name: "macOS",
    icon: <AppleIcon />,
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
    icon: <LinuxIcon />,
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
    icon: <WindowsIcon />,
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
