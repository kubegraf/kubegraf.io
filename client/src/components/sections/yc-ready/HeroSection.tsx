import { motion } from "framer-motion";
import { ArrowRight, Play, Github, Zap, Shield, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[radial-gradient(circle,_#111_1px,_transparent_1px)] [background-size:40px_40px]" />
      </div>
      
      {/* Floating notification */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute top-8 right-8 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm flex items-center gap-2 text-sm"
      >
        <Zap className="w-4 h-4 text-amber-500" />
        <span>Live on Product Hunt Today</span>
      </motion.div>
      
      <div className="relative max-w-6xl mx-auto">
        {/* Hero content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Open Source • Deploy in 60s • SOC2 Type II
            </motion.div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="text-gray-900">Cut Kubernetes</span>
              <br />
              <motion.span 
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                MTTR by 80%
              </motion.span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed font-light">
              AI-powered root cause analysis that automatically detects, investigates, and resolves Kubernetes incidents. 
              Built for SREs at <span className="font-medium">GitLab, Elastic, and Snyk</span>.
            </p>
            
            {/* Value props */}
            <div className="flex flex-wrap gap-4 mb-10 text-sm text-gray-700">
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                <Zap className="w-4 h-4 text-green-500" />
                No instrumentation needed
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                <Shield className="w-4 h-4 text-blue-500" />
                Runs in your VPC
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-gray-200">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                $500K+ annual savings
              </div>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold py-6 px-8 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 transition-all duration-300 flex items-center gap-2"
              >
                Start Free 14-Day Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 hover:border-gray-400 text-gray-900 hover:text-gray-900 text-lg font-semibold py-6 px-8 rounded-xl flex items-center gap-2"
              >
                <Github className="w-5 h-5" />
                View on GitHub
              </Button>
            </div>
            
            {/* Quick metrics */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200"
            >
              <div>
                <div className="text-3xl font-bold text-gray-900">500M+</div>
                <div className="text-sm text-gray-600 mt-1">Pods monitored monthly</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">15,000+</div>
                <div className="text-sm text-gray-600 mt-1">Clusters managed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600 mt-1">Uptime SLA</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Visual content - Code preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            {/* Window header */}
            <div className="bg-gray-800 rounded-t-xl px-4 py-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-auto text-gray-400 text-sm font-mono">kubegraf-terminal</div>
            </div>
            
            {/* Code content */}
            <div className="bg-gray-900 rounded-b-xl p-6 font-mono text-green-400 text-sm shadow-2xl">
              <div className="mb-4">
                <span className="text-gray-500">$</span> kubegraf incidents show restarts-payments-api
              </div>
              <div className="mb-4 text-blue-300">
                → Detected: Container restart loop (268 crashes)
              </div>
              <div className="mb-4 text-yellow-300">
                📊 Analyzing logs, metrics, traces...
              </div>
              <div className="mb-4 text-purple-300">
                🔍 Root cause: LivenessProbe timeout
              </div>
              <div className="text-emerald-400">
                ✅ Fix: Increase initialDelaySeconds to 30
              </div>
            </div>
            
            {/* Floating stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -bottom-4 -right-4 bg-white border border-gray-200 rounded-xl p-4 shadow-lg"
            >
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold">Resolved in 4m 32s</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}