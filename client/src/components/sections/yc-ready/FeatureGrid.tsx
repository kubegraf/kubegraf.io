import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Zap, Shield, Brain, Eye, GitBranch, Activity, 
  Database, FileSearch, Lock, TrendingUp, Clock, Server, 
  Code, AlertCircle, CheckCircle, Filter 
} from "lucide-react";

interface FeatureProps {
  icon: React.ElementType;
  title: string;
  description: string;
  tags: string[];
  stats?: { label: string; value: string };
  index: number;
}

function FeatureCard({ icon: Icon, title, description, tags, stats, index }: FeatureProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 40,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="group relative bg-white border border-gray-200 rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      {/* Gradient border on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm" />
      
      <div className="relative">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: isInView ? 1 : 0, rotate: isInView ? 0 : -180 }}
          transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
          className="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 p-3 rounded-lg inline-flex mb-6 group-hover:from-blue-600 group-hover:to-purple-600 group-hover:text-white transition-all duration-300"
        >
          <Icon className="w-6 h-6" />
        </motion.div>
        
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 group-hover:text-white/90 transition-colors duration-300">
          {description}
        </p>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, idx) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -10 }}
              transition={{ delay: index * 0.1 + idx * 0.05 + 0.3 }}
              whileHover={{ scale: 1.05, y: -1 }}
              className="text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full group-hover:bg-white/20 group-hover:text-white transition-all duration-300"
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        {/* Stats */}
        {stats && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            whileHover={{ scale: 1.02 }}
            className="border-t border-gray-200 pt-4 group-hover:border-white/20 transition-colors duration-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 group-hover:text-white/70 transition-colors duration-300">
                {stats.label}
              </span>
              <span className="text-lg font-bold text-blue-600 group-hover:text-white transition-colors duration-300">
                {stats.value}
              </span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function FeatureGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const features = [
    {
      icon: AlertCircle,
      title: "Instant Detection",
      description: "Detect pod crashes, OOMKills, and configuration errors in under 5 seconds with our eBPF-based monitoring agent.",
      tags: ["Zero Instrumentation", "Real-time", "eBPF"],
      stats: { label: "Detection Speed", value: "<5s" },
      index: 0,
    },
    {
      icon: Brain,
      title: "AI Root Cause Analysis",
      description: "Automatically correlate logs, metrics, traces, and events using graph neural networks trained on production incidents.",
      tags: ["Machine Learning", "Graph Analysis", "97% Accuracy"],
      stats: { label: "Mean Time to Identify", value: "3.2min" },
      index: 1,
    },
    {
      icon: FileSearch,
      title: "Interactive Investigations",
      description: "Step through incident timelines like a debugger. Reconstruct application state with distributed tracing visualization.",
      tags: ["Timeline View", "Distributed Tracing", "Live Replay"],
      stats: { label: "Investigation Speed", value: "10x" },
      index: 2,
    },
    {
      icon: GitBranch,
      title: "Safe Fix Preview",
      description: "Test remediation steps in an isolated environment. Predict impact using dependency graphs before applying changes.",
      tags: ["Dry Run", "Impact Analysis", "Rollback Ready"],
      stats: { label: "Config Changes", value: "100%" },
      index: 3,
    },
    {
      icon: Filter,
      title: "Smart Alerting",
      description: "Reduce alert fatigue with intelligent correlation. Group related failures and suppress noise automatically.",
      tags: ["Alert Correlation", "Noise Reduction", "SLA Tracking"],
      stats: { label: "Alert Noise Reduction", value: "85%" },
      index: 4,
    },
    {
      icon: Database,
      title: "Unified Observability",
      description: "Aggregate data from Prometheus, Grafana, Datadog, and your existing tools. No need to rip and replace.",
      tags: ["Prometheus", "OpenTelemetry", "DataDog"],
      stats: { label: "Integration Time", value: "15min" },
      index: 5,
    },
  ];
  
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: isInView ? 1 : 0,
            y: isInView ? 0 : 30,
          }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: isInView ? 1 : 0.9, opacity: isInView ? 1 : 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
              ENTERPRISE-READY FEATURES
            </span>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything you need for
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              production-grade operations
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built from the ground up for teams managing mission-critical 
            Kubernetes infrastructure at scale.
          </p>
        </motion.div>
        
        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={feature.title} {...feature} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}