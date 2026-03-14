import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Lock, TrendingUp, Calculator } from "lucide-react";
import styles from "./HeroSection.module.css";
import { LINKS } from "@/config/links";

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.02.048.035.088.068.107a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

const terminalLines = [
  { type: 'command', text: '$ kubegraf incidents show restarts-payments-api' },
  { type: 'info', text: 'Incident not found in database, scanning cluster...' },
  { type: 'detail', text: '═══════════════════════════════════════════════════════════════════' },
  { type: 'detail', text: 'INCIDENT DETAILS' },
  { type: 'detail', text: '═══════════════════════════════════════════════════════════════════' },
  { type: 'detail', text: 'ID:          restarts-payments-api-service-7c9bd978bb-mp28c-app' },
  { type: 'warning', text: 'Severity:    WARNING' },
  { type: 'detail', text: 'Started:     2025-12-21 19:10:40 GMT' },
  { type: 'detail', text: 'Namespace:   secrets-test' },
  { type: 'detail', text: 'Resource:    Pod/test-app-csi-7c9bd978bb-mp28c' },
  { type: 'detail', text: '' },
  { type: 'detail', text: 'Type:        high_restarts' },
  { type: 'warning', text: 'Summary:     Container app has restarted 268 times' },
  { type: 'detail', text: 'Count:       268' },
  { type: 'detail', text: '' },
  { type: 'success', text: '🔍 Investigation Steps:' },
  { type: 'detail', text: '   1. Check container logs for error patterns' },
  { type: 'detail', text: '   2. Review recent pod events' },
  { type: 'detail', text: '   3. Check previous container logs (if crashed)' },
  { type: 'detail', text: '   4. Analyze resource limits vs usage' },
  { type: 'detail', text: '' },
  { type: 'info', text: 'Recommendation: Check for LivenessProbe failures in logs.' },
];

function AnimatedTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Small delay before starting to prevent initial flicker
    let timer: NodeJS.Timeout | null = null;
    
    const startDelay = setTimeout(() => {
      timer = setInterval(() => {
        setVisibleLines(prev => {
          if (prev >= terminalLines.length) {
            setIsComplete(true);
            if (timer) clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 400);
    }, 300);

    return () => {
      clearTimeout(startDelay);
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.demoContent}>
      {terminalLines.slice(0, visibleLines).map((line, i) => (
        <div
          key={i}
          className={`${styles.terminalLine} ${styles[line.type]}`}
        >
          {line.text || '\u00A0'}
        </div>
      ))}
      {!isComplete && visibleLines < terminalLines.length && (
        <span className={styles.cursor} />
      )}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className={styles.heroSection} aria-label="Hero section">
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Left Column - Text Content */}
          <div className={styles.textContent}>
            {/* Eyebrow badge — above the headline */}
            <div className={styles.badge}>
              <span className={styles.badgeDot} aria-hidden="true" />
              <span className={styles.badgeText}>Autonomous AI SRE — Kubernetes-Native · Local-First</span>
            </div>

            {/* Headline — layered typographic treatment */}
            <h1 className={styles.headline}>
              <span className={styles.headlineDisplay}>
                Root Cause.
              </span>
              <span className={styles.headlineScale}>
                <span className={styles.highlight}>SafeFix™</span>
                <span className={styles.headlinePunctuation}>.</span>
              </span>
              <span className={styles.headlineContrast}>
                In <span className={styles.highlightAmber}>Minutes.</span>
              </span>
            </h1>

            {/* Subheadline */}
            <p className={styles.subheadline}>
              KubeGraf is your{" "}
              <strong style={{ color: 'hsl(var(--primary))' }}>autonomous, always-on AI SRE</strong>
              {" "}— built exclusively for Kubernetes. It detects incidents, self-heals where safe, and delivers{" "}
              <strong className={styles.subheadlineStrong}>evidence-backed SafeFix™ remediations</strong>
              {" "}with dry-run validation. Powered by{" "}
              <a href="https://orkastor.com" target="_blank" rel="noopener noreferrer" style={{ color: 'hsl(var(--primary))', fontWeight: 700, textDecoration: 'none' }}>OrkaAI</a>
              {" "}— your data never leaves your environment.
            </p>

            {/* CTA Buttons */}
            <div className={styles.ctaGroup}>
              <Button
                size="lg"
                className={styles.primaryCTA}
                onClick={() => {
                  document.getElementById("early-access")?.scrollIntoView({ behavior: "smooth" });
                }}
                aria-label="Join the KubeGraf early access waitlist"
              >
                Get Early Access
                <ArrowRight className={styles.ctaIcon} aria-hidden="true" />
              </Button>

              <Button
                size="lg"
                className={styles.roiCTA}
                onClick={() => (window.location.href = "/roi")}
                aria-label="Calculate your ROI with KubeGraf"
                style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #14b8a6 100%)',
                  color: 'white',
                  fontWeight: '600',
                  boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3), 0 4px 10px -2px rgba(16, 185, 129, 0.2)',
                }}
              >
                <Calculator className={styles.ctaIcon} aria-hidden="true" />
                Calculate Your ROI
              </Button>

              <a
                href={LINKS.DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className={styles.discordText}
                aria-label="Join the KubeGraf Discord community"
              >
                <DiscordIcon className={styles.discordIcon} />
                Join our Discord Community
              </a>
            </div>

            {/* Trust Strip */}
            <div className={styles.trustIndicators}>
              <div className={styles.trustItem}>
                <Shield className={styles.trustLucideIcon} aria-hidden="true" />
                <span>Local-first</span>
              </div>
              <div className={styles.trustItem}>
                <Lock className={styles.trustLucideIcon} aria-hidden="true" />
                <span>Zero data exfiltration</span>
              </div>
              <div className={styles.trustItem}>
                <Zap className={styles.trustLucideIcon} aria-hidden="true" />
                <span>Human-approved fixes</span>
              </div>
              <div className={styles.trustItem}>
                <TrendingUp className={styles.trustLucideIcon} aria-hidden="true" />
                <span>Dry-run validated</span>
              </div>
            </div>

            {/* Social Proof */}
            <p className={styles.socialProof}>
              Kubernetes-native · 80% faster MTTR · Always-on autonomous remediation · No SaaS required
            </p>

            {/* Terminal Demo - Mobile: appears after social proof */}
            <div className={styles.visualContentMobile}>
              <div className={styles.demoContainer}>
                <div className={styles.demoPlaceholder}>
                  <div className={styles.demoHeader}>
                    <div className={styles.demoButtons}>
                      <span className={styles.demoButton}></span>
                      <span className={styles.demoButton}></span>
                      <span className={styles.demoButton}></span>
                    </div>
                    <span className={styles.demoTitle}>kubegraf — zsh</span>
                  </div>
                  <AnimatedTerminal />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Demo - Desktop */}
          <div className={styles.visualContent}>
            <div className={styles.demoContainer}>
              {/* Placeholder for Terminal UI + Web Dashboard GIF */}
              <div className={styles.demoPlaceholder}>
                <div className={styles.demoHeader}>
                  <div className={styles.demoButtons}>
                    <span className={styles.demoButton}></span>
                    <span className={styles.demoButton}></span>
                    <span className={styles.demoButton}></span>
                  </div>
                  <span className={styles.demoTitle}>kubegraf — zsh</span>
                </div>
                <AnimatedTerminal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
