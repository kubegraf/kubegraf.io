import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Shield, Zap, Lock, TrendingUp, ChevronDown } from "lucide-react";

// Binary code rain effect
function BinaryRain({ speed = 0.5 }: { speed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const cols = Math.floor(canvas.width / 20);
    const drops: number[] = [];
    for (let x = 0; x < cols; x++) drops[x] = 1;
    
    const matrix = "01".split("");
    let animationId: number;
    
    function draw() {
      if (!ctx) return;
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#00ffff';
      ctx.font = '14px monospace';
      
      for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * 20, drops[i] * 20);
        
        if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      
      animationId = requestAnimationFrame(draw);
    }
    
    draw();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [speed]);
  
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-20 pointer-events-none" />;
}

// Floating particles component
function FloatingParticles() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-cyan-400/30 backdrop-blur-sm"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [-20, window.innerHeight + 20],
            x: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Magic cursor effect
function MagicCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 10 + 'px';
        cursorRef.current.style.top = e.clientY - 10 + 'px';
      }
    };
    
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsPointer(target.closest('button, a') !== null);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);
  
  return (
    <div
      ref={cursorRef}
      className={`fixed rounded-full pointer-events-none z-50 transition-all duration-150 ${
        isHovered ? 'bg-cyan-400 scale-150' : 'bg-cyan-500 scale-100'
      } ${isPointer ? 'scale-150' : ''}`}
      style={{
        width: isPointer ? '30px' : '20px',
        height: isPointer ? '30px' : '20px',
        mixBlendMode: 'difference',
        boxShadow: isHovered 
          ? '0 0 30px rgba(0, 255, 255, 0.8)' 
          : '0 0 15px rgba(0, 255, 255, 0.5)',
      }}
    />
  );
}

// Cyberpunk terminal window
function CyberpunkTerminal() {
  const terminalLines = [
    { type: 'command', text: '$ kubegraf incidents show restarts-payments-api' },
    { type: 'info', text: 'Incident not found in database, scanning cluster...' },
    { type: 'success', text: '🔍 Evidence collected in 2.3s' },
    { type: 'detail', text: '═══════════════════════════════════════════════════════════════════' },
    { type: 'warning', text: 'WARN: Container app has restarted 268 times since 2025-12-21' },
    { type: 'success', text: '✅ Root cause identified: LivenessProbe failures' },
    { type: 'success', text: '💡 Recommended fix: Adjust initialDelaySeconds from 10 to 30' },
    { type: 'success', text: '⚡ Estimated resolution time: 4 minutes' },
  ];

  const [visibleLines, setVisibleLines] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const startDelay = setTimeout(() => {
      timer = setInterval(() => {
        setVisibleLines(prev => {
          if (prev >= terminalLines.length) {
            setIsComplete(true);
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 300);
    }, 500);

    return () => {
      clearTimeout(startDelay);
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div className="bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20">
      <div className="bg-gray-900/50 px-4 py-3 border-b border-cyan-500/20 flex items-center gap-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 text-center text-cyan-400 text-sm font-mono">
          kubegraf-terminal — zsh
        </div>
      </div>
      <div className="p-6 font-mono text-green-400 text-sm">
        {terminalLines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={`mb-1 ${
            line.type === 'command' ? 'text-cyan-300' :
            line.type === 'warning' ? 'text-yellow-300' :
            line.type === 'success' ? 'text-green-300' :
            'text-gray-400'
          }`}>
            {line.text || '\u00A0'}
          </div>
        ))}
        {!isComplete && (
          <span className="inline-block w-2 h-4 bg-green-400 animate-pulse" />
        )}
      </div>
    </div>
  );
}

// Hero Section Component
export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      setMousePosition({
        x: (e.clientX - centerX) / centerX,
        y: (e.clientY - centerY) / centerY,
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      {/* Background Layers */}
      <BinaryRain />
      <FloatingParticles />
      
      {/* Content Overlay */}
      <motion.div 
        className="relative z-[2] flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 py-20"
        style={{ y, opacity }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="relative">
            {/* Glow Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-fuchsia-500/5 blur-3xl" 
                 style={{
                   transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
                 }} />
            
            <div className="grid lg:grid-cols-2 gap-16 items-center relative">
              {/* Left side - Text Content */}
              <div className="space-y-8">
                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
                  className="inline-block"
                >
                  <div className="flex items-center gap-2 px-6 py-3 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-sm">
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                    />
                    <span className="text-cyan-400 font-medium text-sm">AI-Powered Kubernetes Intelligence v3.0</span>
                  </div>
                </motion.div>
                
                {/* Main Headline with Gradient Text */}
                <motion.h1
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 1, type: "spring", stiffness: 100 }}
                  className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
                >
                  <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                    Fix Kubernetes
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                    in Minutes
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                    Not Hours
                  </span>
                </motion.h1>
                
                {/* Subheadline */}
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="text-xl md:text-2xl text-gray-300 leading-relaxed"
                >
                  <span className="text-cyan-400 font-semibold">AI-powered root cause analysis</span> that cuts incident resolution by 80%. 
                  <span className="text-fuchsia-400 font-semibold">Correlates logs, metrics, traces, and events</span> into evidence-based diagnostics. 
                  Built for SREs who need <span className="text-cyan-400">answers, not dashboards</span>.
                </motion.p>
                
                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
                  className="flex flex-col sm:flex-row gap-6"
                >
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-cyan-500 to-fuchsia-500 hover:from-cyan-400 hover:to-fuchsia-400 text-white font-bold py-6 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 relative overflow-hidden shadow-lg shadow-cyan-500/25"
                    onClick={() => window.location.href = "/docs/installation.html"}
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      Install in 60 Seconds
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
                  </Button>
                  
                  <Button
                    size="lg"
                    variant="outline"
                    className="group bg-transparent border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white font-bold py-6 px-10 rounded-full text-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                    onClick={() => window.location.href = "/roi"}
                  >
                    <span className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5" />
                      See ROI – $500K+ Savings
                    </span>
                  </Button>
                </motion.div>
                
                {/* Animated Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="flex flex-wrap gap-6 pt-8"
                >
                  {[
                    { icon: Zap, text: "80% Faster MTTR", color: "text-cyan-400" },
                    { icon: Lock, text: "Zero Data Exfiltration", color: "text-fuchsia-400" },
                    { icon: Shield, text: "Enterprise-Grade Security", color: "text-blue-400" },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-3"
                    >
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                      <span className="text-gray-300 font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              
              {/* Right side - Terminal */}
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.8, duration: 1, type: "spring" }}
                className="relative"
              >
                <CyberpunkTerminal />
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 to-fuchsia-500/10 blur-2xl rounded-3xl" />
              </motion.div>
            </div>
            
            {/* Social Proof */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-center text-sm text-gray-500 pt-8"
            >
              Reduces Mean Time To Recovery (MTTR) by 80% • Built for SREs and Platform Engineers • Enterprise-Ready
            </motion.p>
          </div>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[2]"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown className="w-6 h-6 text-cyan-400" />
      </motion.div>
      
      {/* Magic Cursor */}
      <MagicCursor />
      
      {/* Global Styles for gradient animation */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}