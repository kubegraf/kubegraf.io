import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

// Animated background component
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-800 to-orange-700" />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"
        animate={{
          y: [0, -50, 0],
          x: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20"
        animate={{
          y: [0, 50, 0],
          x: [0, -40, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
      />
      
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-orange-400 rounded-full blur-3xl opacity-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10,
        }}
      />
      
      {/* Animated grid pattern */}
      <motion.div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 24%, rgba(255,255,255,0.5) 25%, rgba(255,255,255,0.5) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.5) 75%, rgba(255,255,255,0.5) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(255,255,255,0.5) 25%, rgba(255,255,255,0.5) 26%, transparent 27%, transparent 74%, rgba(255,255,255,0.5) 75%, rgba(255,255,255,0.5) 76%, transparent 77%, transparent)`,
          backgroundSize: '50px 50px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '50px 50px'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// Animated illustration (simulating Canva/Figma style)
function AnimatedIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, type: "spring" }}
      >
        {/* Main container shape */}
        <motion.div
          className="w-96 h-96 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl backdrop-blur-lg border border-white/20 shadow-2xl"
          animate={{
            rotateY: [0, 5, 0],
            rotateX: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Inner animated elements */}
          <div className="p-12 h-full flex flex-col justify-between">
            <motion.div
              className="bg-gradient-to-r from-pink-400 to-purple-400 h-2 rounded-full"
              animate={{ scaleX: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="bg-white/10 h-12 rounded-lg"
                  animate={{ x: [0, i * 5, 0] }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
            
            <motion.div
              className="bg-gradient-to-r from-orange-400 to-pink-400 h-2 rounded-full"
              animate={{ scaleX: [0.6, 1, 0.6] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
            />
          </div>
        </motion.div>
        
        {/* Floating icons */}
        <motion.div
          className="absolute -top-8 -right-8 bg-yellow-400 p-4 rounded-full shadow-lg"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>
        
        <motion.div
          className="absolute -bottom-8 -left-8 bg-blue-400 p-4 rounded-full shadow-lg"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity, delay: 2 }}
        >
          <Shield className="w-6 h-6 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      <AnimatedBackground />
      
      <motion.div 
        className="relative z-10 w-full"
        style={{ y, opacity }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white border border-white/30"
              >
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ✨
                </motion.span>
                <span className="text-sm font-semibold">New: AI-Powered Auto-Healing</span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-6 mt-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <motion.span
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent bg-[length:200%_200%]"
                >
                  Fix Kubernetes
                </motion.span>
                <br />
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  In Minutes
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                AI-powered root cause analysis that automatically detects, investigates, 
                and resolves incidents. Built for SREs at leading tech companies.
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-lg font-bold py-6 px-8 rounded-xl shadow-xl shadow-purple-500/30 hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5" />
                </Button>
                
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm text-lg font-semibold py-6 px-8 rounded-xl inline-flex items-center gap-2"
                >
                  <Zap className="w-5 h-5" />
                  Watch Demo
                </Button>
              </motion.div>
              
              <motion.div
                className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                {[
                  { label: "MTTR Reduction", value: "85%" },
                  { label: "Clusters Protected", value: "15K+" },
                  { label: "Accuracy Rate", value: "96%" },
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <motion.div 
                      className="text-3xl font-bold text-white mb-1"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-white/70">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Right content - Animated illustration */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
            >
              <AnimatedIllustration />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}