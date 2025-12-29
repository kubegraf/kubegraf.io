import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

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
        <div className="p-4 font-mono text-xs leading-relaxed min-h-[220px] sm:min-h-[260px]">
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
      <div className="absolute -inset-8 bg-gradient-to-r from-cyan-500/30 via-primary/20 to-purple-500/30 rounded-3xl blur-3xl opacity-50" />

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
        <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm md:text-base leading-relaxed min-h-[220px] sm:min-h-[260px] overflow-x-auto">
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

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background - minimal, forensic */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        {/* Single subtle gradient - graphite tones */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-cyan-500/5 to-transparent rounded-full blur-[120px]" />
      </div>

      {/* Main Content - Centered layout */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-40 pb-16">

        {/* Centered headline section */}
        <div className="text-center max-w-5xl mx-auto mb-12 lg:mb-16">
          {/* Brand Name - fade in */}
          <div
            className="mb-6 animate-fade-in-up"
            style={{ animationDelay: '0ms' }}
          >
            <span className="text-3xl sm:text-4xl font-display font-bold tracking-tight text-primary">
              KubēGraf
            </span>
          </div>

          {/* Hero Heading - fade in with delay */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.05] animate-fade-in-up"
            style={{ animationDelay: '150ms' }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-cyan-400 to-cyan-500">
              Intelligent Insight
            </span>
            <br />
            <span className="text-foreground">for Kubernetes Incidents</span>
          </h1>

          {/* Subheading - fade in with more delay */}
          <p
            className="text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            Local-first incident intelligence. Evidence-backed diagnosis. Safe fix previews. No SaaS lock-in.
          </p>
        </div>

        {/* Terminal showcase - below the fold but prominent */}
        <div
          className="animate-fade-in-up"
          style={{ animationDelay: '600ms' }}
        >
          {isMobile ? <MobileTerminal /> : <AnimatedTerminal />}
        </div>
      </div>
    </section>
  );
}
