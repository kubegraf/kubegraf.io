"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🛒",
    title: "App Marketplace",
    description: "One-click deployment of 50+ applications including Istio, ArgoCD, Kong, Vault, and more. Install, configure, and manage with ease.",
    badge: "Marketplace",
    gradient: "from-[rgba(59,130,246,0.2)] to-[rgba(59,130,246,0.05)]",
    border: "rgba(59, 130, 246, 0.6)",
    glow: "rgba(59, 130, 246, 0.4)",
  },
  {
    icon: "🤖",
    title: "ML Training Jobs",
    description: "Run ML training workloads on Kubernetes with GPU support. Submit Python scripts, configure resources, and stream logs in real-time.",
    badge: "ML Workloads",
    gradient: "from-[rgba(99,102,241,0.2)] to-[rgba(99,102,241,0.05)]",
    border: "rgba(99, 102, 241, 0.6)",
    glow: "rgba(99, 102, 241, 0.4)",
  },
  {
    icon: "🚀",
    title: "ML Inference Services",
    description: "Deploy ML models as production-ready APIs. Support for multiple runtimes including FastAPI, MLServer, BentoML, and KServe with auto-scaling.",
    badge: "ML Workloads",
    gradient: "from-[rgba(99,102,241,0.2)] to-[rgba(99,102,241,0.05)]",
    border: "rgba(99, 102, 241, 0.6)",
    glow: "rgba(99, 102, 241, 0.4)",
  },
  {
    icon: "📊",
    title: "MLflow Integration",
    description: "Experiment tracking, model registry, and ML lifecycle management. Deploy MLflow with Helm, configure storage backends, and manage models.",
    badge: "ML Workloads",
    gradient: "from-[rgba(34,211,238,0.2)] to-[rgba(34,211,238,0.05)]",
    border: "rgba(99, 102, 241, 0.6)",
    glow: "rgba(99, 102, 241, 0.4)",
  },
  {
    icon: "🍽️",
    title: "Feast Feature Store",
    description: "Manage feature stores for ML pipelines. Deploy Feast for feature engineering, versioning, and serving features to training and inference workloads.",
    badge: "ML Workloads",
    gradient: "from-[rgba(59,130,246,0.2)] to-[rgba(99,102,241,0.05)]",
    border: "rgba(59, 130, 246, 0.6)",
    glow: "rgba(59, 130, 246, 0.4)",
  },
  {
    icon: "🎮",
    title: "GPU Management",
    description: "Detect and manage GPU resources across your cluster. Monitor GPU utilization, allocate GPUs to ML workloads, and optimize resource usage.",
    badge: "Hardware",
    gradient: "from-[rgba(99,102,241,0.2)] to-[rgba(99,102,241,0.05)]",
    border: "rgba(99, 102, 241, 0.6)",
    glow: "rgba(99, 102, 241, 0.4)",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 px-0">
      <div className="w-[min(1600px,100%)] mx-auto px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-full mb-12"
        >
          <p className="uppercase text-[0.8rem] tracking-[0.3em] text-[#3b82f6] inline-block py-2 px-4 bg-[rgba(59,130,246,0.15)] rounded-full border border-[rgba(59,130,246,0.4)] mb-4 backdrop-blur-sm shadow-[0_0_20px_rgba(59,130,246,0.3)]">
            Powerful Features
          </p>
          <h2 className="text-[clamp(2rem,4vw,3rem)] leading-[1.2] my-2 text-white">
            Everything you need for modern Kubernetes
          </h2>
          <p className="text-[#94a3b8] m-0">
            From app deployment to ML workloads, KubeGraf provides the tools you need to manage your clusters effectively.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-8 max-w-full xl:grid-cols-3 md:grid-cols-1">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{
                y: -15,
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className={`bg-gradient-to-br ${feature.gradient} border border-[rgba(255,255,255,0.15)] rounded-[20px] p-10 flex flex-col gap-4 relative overflow-hidden backdrop-blur-xl`}
              style={{
                borderTop: `3px solid ${feature.border}`,
                boxShadow: `0 15px 30px rgba(0,0,0,0.3), 0 0 40px ${feature.glow}`,
              }}
            >
              {/* Animated rotating gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 hover:opacity-30 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${feature.border}, transparent)`,
                }}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              <motion.div
                className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[rgba(59,130,246,0.3)] to-[rgba(99,102,241,0.2)] rounded-2xl text-[2rem] relative z-10 backdrop-blur-sm"
                style={{
                  boxShadow: `0 0 30px ${feature.glow}`,
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: [0, 10, -10, 0],
                  transition: { duration: 0.5 },
                }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut",
                  },
                }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="my-2 text-[1.25rem] text-white m-0 relative z-10 font-bold">
                {feature.title}
              </h3>
              <p className="text-[#cbd5f5] m-0 leading-[1.6] flex-grow relative z-10">
                {feature.description}
              </p>
              <motion.span
                className="inline-flex py-[0.4rem] px-4 bg-[rgba(59,130,246,0.2)] border border-[rgba(59,130,246,0.4)] rounded-full text-[0.75rem] uppercase tracking-[0.1em] font-semibold text-[#3b82f6] self-start mt-auto relative z-10 backdrop-blur-sm"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(59,130,246,0.6)",
                }}
              >
                {feature.badge}
              </motion.span>
              
              {/* Dotted particles inside card */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: "3px",
                    height: "3px",
                    background: feature.glow,
                    left: `${20 + i * 25}%`,
                    top: `${25 + (i % 2) * 35}%`,
                    boxShadow: `0 0 4px ${feature.glow}`,
                  }}
                  animate={{
                    y: [0, -12, 0],
                    x: [0, 10, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2.5 + i * 0.4,
                    repeat: Infinity,
                    delay: i * 0.25,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
