import { motion } from "framer-motion";
import { Mail, User, Building2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

// Lightweight animated terminal for mobile - typing effect without framer-motion
function MobileTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  const terminalLines = [
    { type: 'command', text: '$ kubegraf analyze --ns prod' },
    { type: 'info', text: '⚡ Scanning 24 pods...' },
    { type: 'warning', text: '⚠  CrashLoopBackOff detected' },
    { type: 'detail', text: '   └─ OOMKilled (512Mi)' },
    { type: 'success', text: '✓  Fix: Increase to 1Gi' },
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
        <div className="p-4 font-mono text-xs leading-relaxed min-h-[120px]">
          {terminalLines.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className={`
                ${line.type === 'command' ? 'text-green-600 dark:text-green-400 font-semibold' : ''}
                ${line.type === 'info' ? 'text-cyan-600 dark:text-cyan-400' : ''}
                ${line.type === 'warning' ? 'text-yellow-600 dark:text-yellow-400' : ''}
                ${line.type === 'success' ? 'text-emerald-600 dark:text-emerald-400' : ''}
                ${line.type === 'detail' ? 'text-muted-foreground' : ''}
                mb-1
              `}
            >
              {line.text}
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
    { type: 'command', text: '$ kubegraf analyze --ns prod' },
    { type: 'output', text: '' },
    { type: 'info', text: '⚡ Scanning 24 pods, 8 deployments...' },
    { type: 'output', text: '' },
    { type: 'warning', text: '⚠  CrashLoopBackOff: api-gateway-7d4f9' },
    { type: 'detail', text: '   └─ OOMKilled (limit: 512Mi)' },
    { type: 'detail', text: '   └─ 3 restarts in 10 min' },
    { type: 'output', text: '' },
    { type: 'success', text: '✓  Fix: Increase memory to 1Gi' },
    { type: 'detail', text: '   └─ 94% success rate' },
    { type: 'output', text: '' },
    { type: 'prompt', text: '? Preview fix before applying? (Y/n)' },
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
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    company: "",
    role: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showFullForm, setShowFullForm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.name) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleEmailFocus = () => {
    setShowFullForm(true);
  };

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-background" />
        {/* Gradient orbs - more prominent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-cyan-500/15 via-primary/10 to-transparent rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -translate-x-1/3" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px] translate-x-1/3" />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }}
        />
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
            A local-first Kubernetes tool that detects incidents, explains why they happen with evidence, and previews safe fixes—without SaaS lock-in.
          </p>

          {/* Waitlist Form - Centered */}
          <div className="max-w-lg mx-auto">
            {submitted ? (
              <div className="p-6 bg-primary/10 border border-primary/20 rounded-xl text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                  <Mail className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">You're on the list!</h3>
                <p className="text-muted-foreground">
                  We'll notify you when KubēGraf is ready for early access.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <p className="text-sm text-muted-foreground mb-5">
                  Enter your email to get early access
                </p>

                {/* Email field - always visible */}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={handleEmailFocus}
                    placeholder="Email address *"
                    required
                    className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border/50 rounded-xl text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                  />
                </div>

                {/* Additional fields - shown after email focus */}
                <div
                  className="overflow-hidden space-y-3 transition-all duration-200"
                  style={{
                    height: showFullForm ? 'auto' : 0,
                    opacity: showFullForm ? 1 : 0
                  }}
                >
                  {/* Name field */}
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name *"
                      required
                      className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border/50 rounded-xl text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>

                  {/* Company field */}
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company (optional)"
                      className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border/50 rounded-xl text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>

                  {/* Role field */}
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      placeholder="Role (optional)"
                      className="w-full pl-12 pr-4 py-4 bg-muted/50 border border-border/50 rounded-xl text-base placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || !formData.email || (showFullForm && !formData.name)}
                  className="w-full text-lg py-6 h-auto shadow-lg shadow-primary/25 hover:shadow-primary/40 disabled:opacity-50 rounded-xl"
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Terminal showcase - below the fold but prominent */}
        {/* Use static terminal on mobile for better performance */}
        {isMobile ? <MobileTerminal /> : <AnimatedTerminal />}
      </div>
    </section>
  );
}
