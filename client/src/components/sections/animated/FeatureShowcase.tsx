import { motion } from "framer-motion";
import { Zap, Shield, TrendingUp, Activity } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process millions of events in real-time with sub-10ms latency.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    delay: 0.1,
  },
  {
    icon: Shield,
    title: "Enterprise Secure",
    description: "SOC2 Type II certified with zero data exfiltration guarantee.",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    delay: 0.2,
  },
  {
    icon: TrendingUp,
    title: "Massive Scale",
    description: "Auto-scales to handle 10,000+ clusters and 500M+ pods monthly.",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    delay: 0.3,
  },
  {
    icon: Activity,
    title: "AI-Powered Insights",
    description: "97% accuracy in root cause analysis with continuous learning.",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    delay: 0.4,
  },
];

function FeatureCard({ icon: Icon, title, description, color, bgColor, delay }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6, type: "spring" }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 overflow-hidden group"
    >
      {/* Gradient border on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 -z-10 rounded-2xl blur-sm"
      />
      
      {/* Animated icon background */}
      <motion.div
        className={`w-16 h-16 ${bgColor} rounded-2xl flex items-center justify-center mb-6`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <Icon className={`w-8 h-8 ${color}`} />
      </motion.div>
      
      <motion.h3 
        className="text-2xl font-bold text-white mb-3"
        whileHover={{ 
          backgroundPosition: ['0% 50%', '100% 50%'],
          transition: { duration: 2 }
        }}
      >
        {title}
      </motion.h3>
      
      <p className="text-gray-400 leading-relaxed mb-6">
        {description}
      </p>
      
      <motion.button
        className="text-blue-400 hover:text-blue-300 font-semibold text-sm inline-flex items-center gap-2 group-hover:text-blue-300 transition-colors duration-300"
        whileHover={{ x: 5 }}
      >
        Learn more
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}

export default function FeatureShowcase() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold text-white mb-6"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring" }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Powering
            </span>
            <br />
            Production-Grade Operations
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Built by SREs for SREs. Our platform handles the most demanding 
            Kubernetes environments with ease.
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Icon imports
import { ArrowRight } from "lucide-react";