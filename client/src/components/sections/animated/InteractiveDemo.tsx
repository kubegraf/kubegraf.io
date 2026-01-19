import { motion } from "framer-motion";
import { useState } from "react";
import { Play, RotateCcw, Terminal, Code } from "lucide-react";

const demoSteps = [
  {
    command: "kubegraf detect pods --namespace production",
    output: [
      "✓ Scanning 247 pods across 12 namespaces...",
      "⚠ Detected: 3 pods with restart loops",
      "  - payments-api-5f8c9d (42 restarts)",
      "  - auth-service-7b2a1f (18 restarts)",
      "  - worker-queue-3e6c2a (156 restarts)",
      "",
      "📊 Analysis complete in 4.2s",
    ],
  },
  {
    command: "kubegraf analyze payments-api-5f8c9d",
    output: [
      "🔍 Collecting logs from container...",
      "🔍 Fetching metrics from Prometheus...",
      "🔍 Checking config maps and secrets...",
      "",
      "🎯 Root Cause Identified: OOMKill due to memory limit (512Mi)",
      "   Recommendation: Increase to 1Gi",
      "   Confidence: 94.2%",
      "   Affected: 3,421 requests in last hour",
    ],
  },
  {
    command: "kubegraf apply fix payments-api-5f8c9d --dry-run",
    output: [
      "✓ Generated fix: update deployment memory limit",
      "✓ Dry-run simulation complete",
      "✓ Estimated impact: requests will succeed",
      "✓ Rollback plan ready",
      "",
      "🚀 Ready to apply. Run without --dry-run to execute.",
    ],
  },
];

export default function InteractiveDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [displayedOutput, setDisplayedOutput] = useState<string[]>([]);
  
  const runDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setDisplayedOutput([]);
    
    // Simulate typing each step
    demoSteps.forEach((step, stepIndex) => {
      setTimeout(() => {
        setCurrentStep(stepIndex);
        setDisplayedOutput(prev => [...prev, `$ ${step.command}`, '']);
        
        step.output.forEach((line, lineIndex) => {
          setTimeout(() => {
            setDisplayedOutput(prev => [...prev, line]);
          }, (stepIndex * 1500) + (lineIndex * 100));
        });
      }, stepIndex * 2000);
    });
    
    setTimeout(() => {
      setIsPlaying(false);
    }, demoSteps.length * 3000);
  };
  
  const resetDemo = () => {
    setCurrentStep(0);
    setDisplayedOutput([]);
    setIsPlaying(false);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Code className="w-16 h-16 text-purple-400 mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              See It
            </span>
            <br />
            In Action
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Watch KubeGraf automatically detect, analyze, and fix incidents in real-time
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-2xl border border-gray-700 shadow-2xl shadow-purple-500/20 overflow-hidden"
          >
            <div className="bg-gray-800 px-4 py-3 flex items-center justify-between border-b border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="text-gray-400 text-sm font-mono">KubeGraf CLI v3.0</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={runDemo}
                  disabled={isPlaying}
                  className="text-gray-400 hover:text-green-400 transition-colors duration-200 disabled:opacity-50"
                >
                  <Play className="w-4 h-4" />
                </button>
                <button
                  onClick={resetDemo}
                  className="text-gray-400 hover:text-yellow-400 transition-colors duration-200"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="p-6 font-mono text-sm h-96 overflow-y-auto">
              {displayedOutput.map((line, idx) => {
                let className = "text-gray-300 mb-1";
                if (line.includes('✓')) className = "text-green-400 mb-1";
                else if (line.includes('⚠')) className = "text-yellow-400 mb-1";
                else if (line.includes('🎯')) className = "text-blue-400 mb-1 font-semibold";
                else if (line.includes('🚀')) className = "text-purple-400 mb-1 font-semibold";
                else if (line.startsWith('$')) className = "text-white mb-2";
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.02 }}
                    className={className}
                  >
                    {line}
                  </motion.div>
                );
              })}
              {isPlaying && (
                <motion.div
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-2 h-4 bg-green-400 mt-2"
                />
              )}
            </div>
          </motion.div>
          
          {/* Demo steps indicator */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Automated Incident Resolution
              </h3>
              <p className="text-gray-400 text-lg mb-8">
                In just 3 simple steps, KubeGraf transforms chaos into clarity.
              </p>
            </div>
            
            {demoSteps.map((step, idx) => (
              <motion.div
                key={step.command}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-xl border transition-all duration-300 ${
                  idx === currentStep
                    ? 'bg-purple-900/30 border-purple-500 shadow-lg shadow-purple-500/20'
                    : idx < currentStep
                    ? 'bg-green-900/20 border-green-500'
                    : 'bg-gray-800/50 border-gray-700'
                }`}
              >
                <motion.div
                  initial={{ opacity: 0.5 }}
                  animate={{ 
                    opacity: idx === currentStep ? 1 : 0.5,
                    borderColor: idx === currentStep ? '#a855f7' : '#374151'
                  }}
                  className="flex items-start gap-4"
                >
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      idx < currentStep
                        ? 'bg-green-500 text-white'
                        : idx === currentStep
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-600 text-gray-300'
                    }`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {idx + 1}
                  </motion.div>
                  <div className="flex-1">
                    <motion.h4 
                      className="text-white font-semibold mb-2"
                      animate={{ 
                        color: idx === currentStep ? '#a855f7' : '#9ca3af',
                      }}
                    >
                      {idx === 0 && "Auto-Discovery"}
                      {idx === 1 && "AI Analysis"}
                      {idx === 2 && "One-Click Fix"}
                    </motion.h4>
                    <p className="text-gray-400 text-sm font-mono">
                      {step.command}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
            
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={runDemo}
              disabled={isPlaying}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 transition-all duration-300 disabled:opacity-50"
            >
              {isPlaying ? (
                <span className="inline-flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    ⚡
                  </motion.span>
                  Running Demo...
                </span>
              ) : (
                <span className="inline-flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Run Live Demo
                </span>
              )}
            </motion.button>
          </motion.div>
        </div>
    </div>
  </section>
);
}