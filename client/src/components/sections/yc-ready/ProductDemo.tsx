import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, RotateCcw, Eye, Zap, Activity, CheckCircle } from "lucide-react";

// Simulated incident timeline data
const incidentData = [
  { time: "00:00", event: "Pod restarts detected", severity: "warning", active: true },
  { time: "00:05", event: "Collecting logs and metrics", severity: "info", active: true },
  { time: "00:12", event: "Root cause identified: OOMKill", severity: "critical", active: false },
  { time: "00:18", event: "Suggested fix: Increase memory limit", severity: "success", active: false },
  { time: "00:25", event: "Fix applied successfully", severity: "success", active: false },
];

// Mock terminal output
const terminalSteps = [
  [
    "$ kubegraf incidents show dns-resolution-failure-nginx",
    "Incident ID: dns-resolution-failure-nginx-pod-5f8c9d",
    "Severity: HIGH | Status: Active | Namespace: production",
  ],
  [
    "📊 Collecting telemetry data...",
    "✓ Pod logs collected (12,423 lines)",
    "✓ Metrics fetched (Prometheus)",
    "✓ Network traces captured",
    "✓ ConfigMap snapshot taken",
  ],
  [
    "🔍 Running correlation analysis...",
    "Pattern match: DNS lookup timeout",
    "Candidate root cause: CoreDNS overload",
    "Confidence: 94.2%",
  ],
  [
    "💡 Recommended fix: CoreDNS horizontal scaling",
    "Command: kubectl scale --replicas=5 -n kube-system deployment/coredns",
    "Estimated impact: 4 pods affected → 0% error rate",
  ],
  [
    "✅ Fix applied successfully",
    "Monitoring for 5 minutes...",
    "Confirmed: Error rate dropped to 0%",
    "Resolution time: 7 minutes 23 seconds",
  ],
];

export default function ProductDemo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  
  const startDemo = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    setTerminalOutput([]);
    
    // Simulate typing effect
    terminalSteps.forEach((step, stepIndex) => {
      step.forEach((line, lineIndex) => {
        setTimeout(() => {
          setTerminalOutput(prev => [...prev, line]);
          setCurrentStep(stepIndex + 1);
        }, (stepIndex * 1500) + (lineIndex * 200));
      });
    });
    
    // Stop after demo completes
    setTimeout(() => {
      setIsPlaying(false);
    }, terminalSteps.flat().length * 200 + terminalSteps.length * 1500);
  };
  
  const resetDemo = () => {
    setCurrentStep(0);
    setTerminalOutput([]);
    setIsPlaying(false);
  };

  return (
    <section id="demo" className="py-24 bg-gray-50">
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
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4 inline-block">
            SEE IT IN ACTION
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Resolve incidents in
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              7 minutes, not 2 hours
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch how KubeGraf automatically diagnoses and fixes a production DNS issue
          </p>
        </motion.div>
        
        {/* Demo container */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Incident timeline */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Incident Timeline</h3>
            <div className="space-y-4">
              {incidentData.map((step, idx) => (
                <motion.div
                  key={step.event}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-300 ${
                    idx < currentStep ? 'bg-white border border-gray-200 shadow-sm' : 'bg-gray-100'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      idx < currentStep
                        ? step.severity === 'success'
                          ? 'bg-green-500'
                          : step.severity === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                        : 'bg-gray-300'
                    }`}
                  />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600">{step.time}</div>
                    <div className="font-medium text-gray-900">{step.event}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Terminal output */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-xl shadow-2xl overflow-hidden">
              {/* Terminal header */}
              <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-sm font-mono">kubegraf-cli v3.0.0</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={startDemo}
                    disabled={isPlaying}
                    className="text-gray-400 hover:text-white transition-colors duration-200 disabled:opacity-50"
                  >
                    <Play className="w-4 h-4" />
                  </button>
                  <button
                    onClick={resetDemo}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Terminal content */}
              <div className="p-6 font-mono text-sm h-96 overflow-y-auto">
                <div className="mb-4">
                  <span className="text-gray-500">$</span> <span className="text-white font-bold">kubegraf incident show dns-resolution-failure</span>
                </div>
                
                {terminalOutput.map((line, idx) => {
                  let className = "text-white";
                  if (line.includes("✓")) className = "text-green-400";
                  else if (line.includes("📊") || line.includes("🔍")) className = "text-blue-400";
                  else if (line.includes("⚠") || line.includes("⚡")) className = "text-yellow-400";
                  else if (line.includes("❌")) className = "text-red-400";
                  else if (line.includes("───")) className = "text-gray-600";
                  else if (line.includes("→")) className = "text-cyan-400";
                  
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className={`mb-1 ${className}`}
                    >
                      {line}
                    </motion.div>
                  );
                })}
                
                {isPlaying && (
                  <motion.div
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-white mt-2"
                  />
                )}
              </div>
            </div>
            
            {/* Demo controls */}
            {!isPlaying && terminalOutput.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-8 text-center"
              >
                <button
                  onClick={startDemo}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2"
                >
                  <Play className="w-5 h-5" />
                  Play Demo
                </button>
                <p className="mt-3 text-gray-600 text-sm">
                  See KubeGraf diagnose and fix a real incident
                </p>
              </motion.div>
            )}
          </div>
        </div>
        
        {/* Bottom metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-16 grid md:grid-cols-4 gap-8 pt-8 border-t border-gray-200"
        >
          {[
            { icon: Zap, label: "Time to first insight", value: "5 seconds" },
            { icon: Activity, label: "Mean resolution time", value: "4.2 minutes" },
            { icon: Eye, label: "Investigation steps saved", value: "12-15 minutes" },
            { icon: CheckCircle, label: "First-time fix rate", value: "94%" },
          ].map((metric, idx) => (
            <motion.div
              key={metric.label}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center"
            >
              <metric.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}