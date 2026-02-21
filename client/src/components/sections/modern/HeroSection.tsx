import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Shield, Zap, Lock, TrendingUp, Calculator } from "lucide-react";
import styles from "./HeroSection.module.css";

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
              <span className={styles.badgeText}>AI SRE Platform for Kubernetes</span>
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
              KubeGraf acts like an AI SRE — correlating logs, metrics, events, and deployments to diagnose incidents and recommend{" "}
              <strong className={styles.subheadlineStrong}>safe, validated fixes.</strong>{" "}
              Built for SREs who need answers, not dashboards.
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

              <Button
                size="lg"
                variant="outline"
                className={styles.secondaryCTA}
                onClick={() => (window.location.href = "/docs/installation.html")}
                aria-label="View documentation"
              >
                View Docs
                <Download className={styles.ctaIcon} aria-hidden="true" />
              </Button>
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
              80% faster MTTR · Built for SREs &amp; Platform Engineers · Enterprise-ready
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
