import { motion } from "framer-motion";
import { useState, useEffect, lazy, Suspense } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button } from "@/components/ui/button";
import { Terminal, Download, ArrowRight, Play } from "lucide-react";

// Lazy load the interactive dot grid for performance
const InteractiveDotGrid = lazy(() => import("@/components/InteractiveDotGrid"));

// Lightweight animated terminal for mobile - typing effect without framer-motion
function MobileTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  const terminalLines = [
    { type: 'command', text: '$ kubegraf analyze crash-pod-7x9a' },
    { type: 'output', text: '' },
    { type: 'info', text: '⚡ Collecting evidence...' },
    { type: 'detail', text: '  ├─ Pod logs (3 sources)' },
    { type: 'detail', text: '  ├─ Events (12 cluster events)' },
    { type: 'detail', text: '  ├─ Resource metrics (memory spike detected)' },
    { type: 'detail', text: '  └─ Recent changes (deployment @ 14:23 UTC)' },
    { type: 'output', text: '' },
    { type: 'success', text: '✓ Root cause identified:' },
    { type: 'detail', text: '  OOMKilled - memory limit 512Mi exceeded' },
    { type: 'detail', text: '  Evidence: 3 restarts, 94% correlation' },
    { type: 'output', text: '' },
    { type: 'success', text: '✓ Safe fix available:' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= terminalLines.length) {
          setTimeout(() => setVisibleLines(0), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative bg-card/95 rounded-xl border border-border shadow-lg overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 bg-muted/80 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-2 text-xs text-muted-foreground font-mono">kubegraf</span>
        </div>
        <div className="p-4 font-mono text-xs leading-relaxed h-[220px] sm:h-[260px]">
          {terminalLines.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className={`
                ${line.type === 'command' ? 'text-green-600 dark:text-green-400 font-semibold' : ''}
                ${line.type === 'info' ? 'text-cyan-600 dark:text-cyan-400' : ''}
                ${line.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : ''}
                ${line.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : ''}
                ${line.type === 'detail' ? 'text-muted-foreground' : ''}
                ${line.type === 'output' ? 'text-muted-foreground' : ''}
                mb-1
              `}
            >
              {line.text || '\u00A0'}
            </div>
          ))}
          {visibleLines < terminalLines.length && (
            <span className="inline-block w-2 h-4 bg-primary animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
}

// Animated terminal for desktop - with typing effect
function AnimatedTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  const terminalLines = [
    { type: 'command', text: '$ kubegraf analyze crash-pod-7x9a' },
    { type: 'output', text: '' },
    { type: 'info', text: '⚡ Collecting evidence...' },
    { type: 'detail', text: '  ├─ Pod logs (3 sources)' },
    { type: 'detail', text: '  ├─ Events (12 cluster events)' },
    { type: 'detail', text: '  ├─ Resource metrics (memory spike detected)' },
    { type: 'detail', text: '  └─ Recent changes (deployment @ 14:23 UTC)' },
    { type: 'output', text: '' },
    { type: 'success', text: '✓ Root cause identified:' },
    { type: 'detail', text: '  OOMKilled - memory limit 512Mi exceeded' },
    { type: 'detail', text: '  Evidence: 3 restarts, 94% correlation' },
    { type: 'output', text: '' },
    { type: 'warning', text: '✓ Safe fix available:' },
    { type: 'detail', text: '  memory: 512Mi → 1Gi' },
    { type: 'detail', text: '  confidence: 94% | risk: low' },
    { type: 'output', text: '' },
    { type: 'prompt', text: '? Preview before applying? (Y/n)' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= terminalLines.length) {
          setTimeout(() => setVisibleLines(0), 2000);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
      className="relative w-full max-w-4xl mx-auto"
    >
      {/* Glow effect behind terminal */}
      <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/30 via-primary/20 to-teal-500/30 rounded-3xl blur-3xl opacity-50" />

      {/* Terminal window - theme-aware */}
      <div className="relative bg-card/95 backdrop-blur-sm rounded-2xl border border-border shadow-2xl overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-5 py-4 bg-muted/80 border-b border-border">
          <div className="flex gap-2">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500" />
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500" />
            <div className="w-3.5 h-3.5 rounded-full bg-green-500" />
          </div>
          <span className="ml-3 text-sm text-muted-foreground font-mono">kubegraf — zsh</span>
        </div>

        {/* Terminal content */}
        <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm md:text-base leading-relaxed h-[280px] sm:h-[320px] overflow-x-auto overflow-y-hidden">
          {terminalLines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`
                ${line.type === 'command' ? 'text-green-600 dark:text-green-400 font-semibold' : ''}
                ${line.type === 'info' ? 'text-cyan-600 dark:text-cyan-400' : ''}
                ${line.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : ''}
                ${line.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : ''}
                ${line.type === 'detail' ? 'text-muted-foreground' : ''}
                ${line.type === 'prompt' ? 'text-purple-600 dark:text-purple-400' : ''}
                ${line.type === 'output' ? 'h-3' : ''}
                mb-1
              `}
            >
              {line.text}
            </motion.div>
          ))}
          {visibleLines < terminalLines.length && (
            <span className="inline-block w-2.5 h-5 bg-primary animate-pulse" />
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Hero() {
  const isMobile = useIsMobile();
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    // Delay loading the interactive grid
    if (!isMobile) {
      const timer = setTimeout(() => setShowGrid(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isMobile]);

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />

        {/* Dithered gradient overlay - Very subtle */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.08),transparent)]" />

        {/* Interactive dot grid - Portainer's signature element */}
        {!isMobile && showGrid && (
          <Suspense fallback={null}>
            <InteractiveDotGrid />
          </Suspense>
        )}
      </div>

      {/* Main Content - VERY tight like Anthropic */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* Left column - Text content */}
          <div className="text-center lg:text-left">
            {/* Badge - Anthropic style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-[0.6875rem] font-medium text-primary uppercase tracking-[0.08em]">Local-first</span>
            </motion.div>

            {/* Hero Heading - Terminal style with monospace and color - WCAG AA compliant */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: 'clamp(3.5rem, 2.89rem + 3.06vw, 6rem)' }}
              className="font-mono font-bold mb-8 leading-[1.2] tracking-[-0.01em]"
            >
              <span className="text-foreground/90">Intelligent </span>
              <span className="text-primary">Kubernetes</span>
              <br className="hidden sm:block" />
              <span className="text-foreground/90"> Incident </span>
              <span className="text-amber-500">Response</span>
            </motion.h1>

            {/* Subheading - Larger description text - WCAG AA compliant */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ fontSize: 'clamp(1.25rem, 1.17rem + 0.41vw, 1.5rem)' }}
              className="leading-[1.7] text-foreground/85 max-w-2xl mx-auto lg:mx-0 mb-10 font-normal"
            >
              Detect incidents, understand root causes with evidence analysis,
              and safely preview fixes—all running locally on your machine.
            </motion.p>

            {/* CTAs - Anthropic style buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20 text-[1rem] px-8 h-[3.25rem] font-medium transition-all duration-200"
                onClick={() => window.location.href = '/docs/quickstart.html'}
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-[1rem] px-8 h-[3.25rem] font-medium border-border/50 hover:bg-muted/50 transition-all duration-200"
                onClick={() => window.location.href = '/docs/installation.html'}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </motion.div>

            {/* Social proof - Anthropic style minimalist */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="pt-8 border-t border-border/20"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start text-[0.875rem] text-muted-foreground/75">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-primary/70" />
                  <span className="font-medium text-foreground/60">TUI + Web Dashboard</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span className="font-normal text-muted-foreground/70">macOS • Linux • Windows</span>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-muted-foreground/30" />
                <span className="font-medium text-primary/80">Apache 2.0</span>
              </div>
            </motion.div>
          </div>

          {/* Right column - Terminal demo */}
          <div className="relative">
            {isMobile ? <MobileTerminal /> : <AnimatedTerminal />}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
