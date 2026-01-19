import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Zap, Shield, Brain, Eye, GitBranch, Activity, 
  Type, Globe, Lock, TrendingUp, Clock, Server 
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  color: string;
  gradient: string;
  index: number;
}

function FeatureCard({ icon: Icon, title, description, stats, color, gradient, index }: FeatureCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 50,
        rotateX: isInView ? 0 : 10,
      }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ 
        y: -10, 
        rotateX: 5,
        boxShadow: "0 25px 50px rgba(0, 255, 255, 0.2)",
      }}
      className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 overflow-hidden group"
    >
      {/* Animated gradient border */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl blur-sm" />
      
      {/* Hover glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      
      <div className="relative">
        {/* Icon */}
        <motion.div
          className={`bg-gradient-to-br ${gradient} text-white p-4 rounded-xl inline-flex mb-6`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Icon className="w-8 h-8" />
        </motion.div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-400 mb-6 leading-relaxed">
          {description}
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
              transition={{ delay: index * 0.1 + idx * 0.05 + 0.3 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="bg-gray-800/50 rounded-lg p-3 border border-gray-700 group-hover:border-gray-600 transition-colors duration-300"
            >
              <div className="text-cyan-400 font-bold text-xl mb-1">{stat.value}</div>
              <div className="text-gray-500 text-xs">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        
        {/* Feature highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: index * 0.1 + 0.5 }}
          className="mt-6 pt-6 border-t border-gray-800"
        >
          <div className="flex flex-wrap gap-2">
            {['Auto-Detection', 'Real-Time', 'AI-Powered'].map((tag, tagIdx) => (
              <motion.span
                key={tagIdx}
                initial={{ scale: 0 }}
                animate={{ scale: isInView ? 1 : 0 }}
                transition={{ delay: index * 0.1 + 0.6 + tagIdx * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Floating sphere for 3D effect
function FloatingSphere({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-sm border border-cyan-500/20"
      animate={{
        y: [-100, 500],
        x: [0, 100, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    />
  );
}

export default function CoreFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const features = [
    {
      icon: Zap,
      title: "Auto-Discovery",
      description: "Instantly detects pod crashes, high restart rates, resource exhaustion, and configuration errors using eBPF and Kubernetes API watches.",
      stats: [
        { label: "Detection Speed", value: "<5s" },
        { label: "Coverage", value: "100%" },
      ],
      color: "cyan",
      gradient: "from-cyan-400 to-blue-600",
    },
    {
      icon: Brain,
      title: "Evidence Pipeline",
      description: "Correlates logs, metrics, traces, and events into unified investigations. BigQuery-style analysis validates root cause hypotheses.",
      stats: [
        { label: "Correlation", value: "3.2TB/s" },
        { label: "Accuracy", value: "95%" },
      ],
      color: "purple",
      gradient: "from-purple-400 to-pink-600",
    },
    {
      icon: Eye,
      title: "Live Diagnostics",
      description: "InteractiveExplain-like reconstructions, step-through debugging, and zero-instrumentation visibility. Native OpenTelemetry pipelines.",
      stats: [
        { label: "Latency", value: "<10ms" },
        { label: "Visibility", value: "0.03%" },
      ],
      color: "blue",
      gradient: "from-blue-400 to-cyan-600",
    },
    {
      icon: GitBranch,
      title: "Safe Fix Preview",
      description: "Dry-run remediation using eStargz/OCI staging with Kubernetes native admission controllers for impact assessment.",
      stats: [
        { label: "Test Time", value: "45s" },
        { label: "Safety", value: "4eyes" },
      ],
      color: "green",
      gradient: "from-green-400 to-emerald-600",
    },
    {
      icon: Activity,
      title: "KPI Refinement",
      description: "Continuous learning from incidents improves AI models. Fine-tuned with your cluster's behavior and feedback.",
      stats: [
        { label: "Improvement", value: "+30%" },
        { label: "Learning", value: "Real-time" },
      ],
      color: "orange",
      gradient: "from-orange-400 to-red-600",
    },
    {
      icon: Lock,
      title: "Zero-Trust Ready",
      description: "Runs locally without SaaS dependencies. Zero data exfiltration. Air-gapped deployments with eBPF-enabled visibility.",
      stats: [
        { label: "Data Exfiltration", value: "0" },
        { label: "Compliance", value: "SOC2" },
      ],
      color: "red",
      gradient: "from-red-400 to-rose-600",
    },
  ];

  return (
    <section id="features" className="relative py-24 overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50" />
        <FloatingSphere delay={0} />
        <FloatingSphere delay={5} />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isInView ? 1 : 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-6"
          >
            <div className="bg-gradient-to-r from-cyan-400 to-fuchsia-400 text-white px-4 py-2 rounded-full text-sm font-bold">
              CORE CAPABILITIES
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              Revolutionary
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              Intelligence Platform
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Six core capabilities that transform Kubernetes incident resolution from hours to minutes
          </motion.p>
        </motion.div>
        
        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-20"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300"
            onClick={() => window.location.href = "/docs/installation.html"}
          >
            Experience the Future of K8s Management
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}