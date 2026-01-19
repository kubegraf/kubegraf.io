import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Play, Zap, Code, Terminal } from "lucide-react";

interface StepProps {
  number: number;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  gradient: string;
}

function Step({ number, title, description, icon: Icon, color, gradient }: StepProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : 50,
      }}
      transition={{
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 40px rgba(0, 255, 255, 0.1)",
      }}
      className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 text-center"
    >
      {/* Step Number */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: isInView ? 1 : 0, rotate: isInView ? 0 : -180 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className={`absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}
      >
        {number}
      </motion.div>
      
      {/* Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: isInView ? 1 : 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
        className={`bg-gradient-to-br ${gradient} text-white p-6 rounded-2xl inline-flex mb-6 mx-auto shadow-lg`}
        whileHover={{ scale: 1.1, rotate: 5 }}
      >
        <Icon className="w-10 h-10" />
      </motion.div>
      
      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-2xl font-bold mb-4 text-white"
      >
        {title}
      </motion.h3>
      
      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="text-gray-400 leading-relaxed"
      >
        {description}
      </motion.p>
      
      {/* Connector Line for Desktop */}
      {number < 4 && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: isInView ? "100%" : 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className={`hidden lg:block absolute top-24 right-0 h-1 bg-gradient-to-r ${gradient} rounded-full`}
        />
      )}
    </motion.div>
  );
}

// Floating visualization
function FloatingVisualization() {
  return (
    <motion.div
      className="absolute inset-0 pointer-events-none"
      animate={{
        background: [
          "radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.05) 0%, transparent 50%)",
          "radial-gradient(circle at 80% 70%, rgba(255, 0, 255, 0.05) 0%, transparent 50%)",
          "radial-gradient(circle at 50% 50%, rgba(0, 255, 255, 0.05) 0%, transparent 50%)",
        ],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const steps = [
    {
      number: 1,
      title: "Deploy Agent",
      description: "Install KubeGraf's lightweight agent via Helm or kubectl. eBPF probes auto-attach to kernel for zero-instrumentation visibility.",
      icon: Code,
      color: "cyan",
      gradient: "from-cyan-400 to-blue-600",
    },
    {
      number: 2,
      title: "Auto-Discovery",
      description: "Agent continuously monitors cluster state using Kubernetes API watches. Detects anomalies, crashes, and health degradations in <5s.",
      icon: Zap,
      color: "purple",
      gradient: "from-purple-400 to-pink-600",
    },
    {
      number: 3,
      title: "Investigate",
      description: "Run 'kubegraf incidents show <id>' to correlate logs, metrics, traces, and events. AI identifies root cause with 95% accuracy.",
      icon: Terminal,
      color: "blue",
      gradient: "from-blue-400 to-cyan-600",
    },
    {
      number: 4,
      title: "Deploy Fix",
      description: "Apply validated remediation with dry-run preview. Monitor fix effectiveness with real-time KPIs and rollback if needed.",
      icon: Play,
      color: "green",
      gradient: "from-green-400 to-emerald-600",
    },
  ];
  
  return (
    <section id="how-it-works" className="relative py-24 overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* Background Effects */}
      <FloatingVisualization />
      
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
            <div className="bg-gradient-to-r from-cyan-400 to-purple-400 text-white px-4 py-2 rounded-full text-sm font-bold">
              GET STARTED IN SECONDS
            </div>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
          >
            <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
              Four Steps to
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Kubernetes Freedom
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            From deployment to resolution in under 60 seconds
          </motion.p>
        </motion.div>
        
        {/* Steps Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="grid lg:grid-cols-4 gap-8"
        >
          {steps.map((step) => (
            <Step key={step.number} {...step} />
          ))}
        </motion.div>
        
        {/* Installation Command */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-gray-900/80 backdrop-blur-sm border border-cyan-500/30 rounded-2xl p-6 max-w-4xl w-full">
            <h4 className="text-cyan-400 font-bold mb-3">Quick Start Command</h4>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black rounded-lg p-4 font-mono text-green-400 text-sm md:text-base border border-gray-800 flex items-center justify-between"
            >
              <span>$ helm install kubegraf kubegraf/kubegraf --set agent.enabled=true</span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigator.clipboard.writeText("helm install kubegraf kubegraf/kubegraf --set agent.enabled=true")}
                className="ml-4 bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-md hover:bg-cyan-500/40 transition-colors duration-300"
              >
                Copy
              </motion.button>
            </motion.div>
            <p className="text-gray-500 text-sm mt-3">One command, zero configuration needed</p>
          </div>
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 inline-flex items-center gap-3"
            onClick={() => window.location.href = "/docs/installation.html"}
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}