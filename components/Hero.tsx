"use client";

import { motion } from "framer-motion";

export function Hero() {
  return (
    <section id="main-content" className="relative py-24 px-0 min-h-[85vh] flex items-center z-10">
      {/* Enhanced Floating Trails */}
      <div className="absolute inset-[10%_0_auto] w-full h-[180px] pointer-events-none z-0 overflow-visible">
        <motion.span
          className="absolute w-[200px] h-0.5 bg-gradient-to-r from-transparent via-[rgba(59,130,246,1)] to-transparent opacity-80"
          animate={{
            y: [0, -40, 0],
            scaleX: [0.2, 1, 0.2],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ left: "5%" }}
        />
        <motion.span
          className="absolute w-[200px] h-0.5 bg-gradient-to-r from-transparent via-[rgba(99,102,241,1)] to-transparent opacity-80"
          animate={{
            y: [0, -40, 0],
            scaleX: [0.2, 1, 0.2],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: 1.8,
            ease: "easeInOut",
          }}
          style={{ left: "40%" }}
        />
        <motion.span
          className="absolute w-[200px] h-0.5 bg-gradient-to-r from-transparent via-[rgba(99,102,241,1)] to-transparent opacity-80"
          animate={{
            y: [0, -40, 0],
            scaleX: [0.2, 1, 0.2],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: 3.6,
            ease: "easeInOut",
          }}
          style={{ left: "70%" }}
        />
      </div>

      {/* Enhanced Floating Icons with Glow */}
        <div className="absolute top-[15%] right-[4%] flex gap-4 pointer-events-none z-0">
        <motion.div
          className="w-12 h-12 rounded-[14px] border border-[rgba(59,130,246,0.5)] flex items-center justify-center text-white text-[1.1rem] bg-gradient-to-br from-[rgba(59,130,246,0.3)] to-[rgba(99,102,241,0.2)] shadow-[0_0_30px_rgba(59,130,246,0.6)] relative"
          animate={{
            y: [0, -12, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <span className="absolute inset-0 rounded-[inherit] border border-[rgba(59,130,246,0.4)] animate-[pulseIcon_2s_ease-in-out_infinite]" />
          ⌘
        </motion.div>
        <motion.div
          className="w-12 h-12 rounded-[14px] border border-[rgba(99,102,241,0.5)] flex items-center justify-center text-white text-[1.1rem] bg-gradient-to-br from-[rgba(99,102,241,0.4)] to-[rgba(99,102,241,0.2)] shadow-[0_0_30px_rgba(99,102,241,0.6)] relative"
          animate={{
            y: [0, -12, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut",
          }}
        >
          <span className="absolute inset-0 rounded-[inherit] border border-[rgba(99,102,241,0.4)] animate-[pulseIcon_2s_ease-in-out_infinite]" />
          ◎
        </motion.div>
        <motion.div
          className="w-12 h-12 rounded-[14px] border border-[rgba(99,102,241,0.5)] flex items-center justify-center text-white text-[1.1rem] bg-gradient-to-br from-[rgba(99,102,241,0.3)] to-[rgba(34,211,238,0.2)] shadow-[0_0_30px_rgba(99,102,241,0.6)] relative"
          animate={{
            y: [0, -12, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut",
          }}
        >
          <span className="absolute inset-0 rounded-[inherit] border border-[rgba(99,102,241,0.4)] animate-[pulseIcon_2s_ease-in-out_infinite]" />
          ≈
        </motion.div>
      </div>

      <div className="w-[min(1600px,100%)] mx-auto px-24">
        <div className="grid grid-cols-[1.2fr,1fr] gap-16 items-center max-w-[1400px] mx-auto lg:grid-cols-1 lg:gap-8">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-copy"
          >
            <div className="flex items-center gap-3 mb-3">
              <p className="text-[#3b82f6] text-[0.85rem] uppercase tracking-[0.4em] m-0 font-semibold animate-[neonFlicker_3s_ease-in-out_infinite]">
                Next-Gen AI Kubernetes Platform
              </p>
              <motion.button
                className="w-10 h-10 rounded-full border-none bg-gradient-to-br from-[#3b82f6] to-[#8b5cf6] inline-flex items-center justify-center text-white text-base cursor-pointer shadow-[0_0_30px_rgba(59,130,246,0.8)]"
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    "0 0 30px rgba(59,130,246,0.8)",
                    "0 0 50px rgba(59,130,246,1)",
                    "0 0 30px rgba(59,130,246,0.8)",
                  ],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ⚡
              </motion.button>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap gap-2 text-[clamp(3rem,6vw,4.5rem)] m-0 leading-[1.05]"
            >
              <motion.span
                className="text-white inline-flex bg-gradient-to-r from-white to-[#3b82f6] bg-clip-text text-transparent"
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
                AI-Powered
              </motion.span>
              <motion.span
                className="text-[#8b5cf6] inline-flex"
                animate={{
                  textShadow: [
                    "0 0 20px rgba(99,102,241,0.5)",
                    "0 0 40px rgba(99,102,241,0.8)",
                    "0 0 20px rgba(99,102,241,0.5)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 0.5,
                  ease: "easeInOut",
                }}
              >
                Kubernetes
              </motion.span>
              <motion.span
                className="text-[#3b82f6] inline-flex"
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
                  delay: 1,
                  ease: "easeInOut",
                }}
              >
                For Everyone
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-[1.25rem] text-[#cbd5f5] my-6 max-w-full leading-[1.7]"
            >
              The first AI-native Kubernetes control plane. Deploy, debug, and scale with natural language. Built for every engineer, from beginners to experts.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex gap-3 flex-wrap mb-5 text-[0.85rem]"
            >
              <motion.span
                className="rounded-full px-4 py-[0.35rem] border border-[rgba(59,130,246,0.4)] bg-[rgba(59,130,246,0.1)] uppercase tracking-[0.2em] font-semibold backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(59,130,246,0.6)",
                }}
              >
                ✨ AI-Powered
              </motion.span>
              <motion.span
                className="rounded-full px-4 py-[0.35rem] border border-[rgba(99,102,241,0.4)] bg-[rgba(99,102,241,0.1)] uppercase tracking-[0.2em] font-semibold backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(99,102,241,0.6)",
                }}
              >
                🚀 Fast Setup
              </motion.span>
              <motion.span
                className="rounded-full px-4 py-[0.35rem] border border-[rgba(99,102,241,0.4)] bg-[rgba(99,102,241,0.1)] uppercase tracking-[0.2em] font-semibold backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(99,102,241,0.6)",
                }}
              >
                🔒 Privacy First
              </motion.span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex gap-[0.85rem] flex-wrap"
            >
              <motion.a
                href="#installation"
                className="px-[1.6rem] py-[0.9rem] rounded-full border-none font-semibold text-[0.95rem] tracking-[0.05em] cursor-pointer text-white bg-gradient-to-br from-[#3b82f6] via-[#8b5cf6] to-[#8b5cf6] relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(59,130,246,0.8), 0 0 60px rgba(99,102,241,0.6)",
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
                <span className="relative z-10">Get started free</span>
              </motion.a>
              <motion.a
                href="#insights"
                className="px-[1.6rem] py-[0.9rem] rounded-full border border-[rgba(59,130,246,0.4)] text-white bg-[rgba(59,130,246,0.1)] font-semibold text-[0.95rem] tracking-[0.05em] cursor-pointer backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(59,130,246,0.2)",
                  boxShadow: "0 0 30px rgba(59,130,246,0.5)",
                }}
              >
                Watch demo
              </motion.a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-6 text-[0.875rem] text-[#94a3b8]"
            >
              ⚡ Install in seconds · 🎯 Works offline · 🔐 Completely local, zero security compromise
            </motion.p>
          </motion.div>

          {/* Right Column - Floating Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="relative"
          >
            <motion.div
              className="bg-gradient-to-br from-[rgba(59,130,246,0.2)] via-[rgba(99,102,241,0.15)] to-[rgba(99,102,241,0.1)] border border-[rgba(59,130,246,0.4)] rounded-[28px] p-10 shadow-[0_30px_60px_rgba(0,0,0,0.7),0_0_80px_rgba(59,130,246,0.4)] relative overflow-hidden backdrop-blur-xl"
              animate={{
                y: [0, -10, 0],
                boxShadow: [
                  "0 30px 60px rgba(0,0,0,0.7), 0 0 80px rgba(59,130,246,0.4)",
                  "0 40px 80px rgba(0,0,0,0.8), 0 0 100px rgba(59,130,246,0.6)",
                  "0 30px 60px rgba(0,0,0,0.7), 0 0 80px rgba(59,130,246,0.4)",
                ],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[rgba(59,130,246,0.1)] via-transparent to-[rgba(99,102,241,0.1)]"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {/* Glowing orb */}
              <motion.div
                className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(99,102,241,0.2),transparent_70%)] rounded-full"
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                }}
              />

              {/* Dotted particles inside panel */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: "3px",
                    height: "3px",
                    background: i % 3 === 0 ? "rgba(59,130,246,0.6)" : i % 3 === 1 ? "rgba(99,102,241,0.6)" : "rgba(99,102,241,0.6)",
                    left: `${10 + i * 12}%`,
                    top: `${20 + (i % 3) * 25}%`,
                    boxShadow: `0 0 6px ${i % 3 === 0 ? "rgba(59,130,246,0.8)" : i % 3 === 1 ? "rgba(99,102,241,0.8)" : "rgba(99,102,241,0.8)"}`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    x: [0, 10, 0],
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              ))}

              <div className="relative z-10 space-y-4">
                <h3 className="m-0 mb-2 text-[1.25rem] text-white font-bold">AI Control Plane</h3>
                <p className="text-[#3b82f6] m-0 mb-4 leading-[1.6] font-semibold">Live diagnostics · Cluster + App Continuity</p>
                <p className="text-[#cbd5f5] m-0 mb-4 leading-[1.6]">
                  Unified Control Plane · All your signals in one glance · Terminal workflows + browser insights
                </p>
                <p className="text-[#cbd5f5] m-0 mb-4 leading-[1.6]">
                  Live metrics, logs, and event correlation · AI-runbooks surface next steps · Multi-cluster GitOps ready
                </p>
                <div className="mt-4 pt-4 border-t border-[rgba(59,130,246,0.3)]">
                  <p className="text-[0.85rem] text-[#8b5cf6] font-semibold m-0 animate-[neonFlicker_3s_ease-in-out_infinite]">
                    🔒 100% Local · Zero Cloud Dependencies · Zero Security Compromise
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
