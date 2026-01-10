import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Shield, Zap, Lock } from "lucide-react";
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

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(prev => {
        if (prev >= terminalLines.length) {
          setTimeout(() => setVisibleLines(0), 3000);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(timer);
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
      {visibleLines < terminalLines.length && (
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
            {/* Badge */}
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              <span className={styles.badgeText}>AI-Powered Kubernetes Intelligence</span>
            </div>

            {/* Headline */}
            <h1 className={styles.headline}>
              <span className={styles.highlight}>Next‑Gen AI Brain</span>{" "}
              for Kubernetes <span className={styles.highlightAmber}>Incident Intelligence</span>
            </h1>

            {/* Subheadline */}
            <p className={styles.subheadline}>
              Smart, evidence-driven Kubernetes incident intelligence. KubeGraf thinks like an
              SRE — providing insights and safe recommendations while you remain in control.
            </p>

            {/* CTA Buttons */}
            <div className={styles.ctaGroup}>
              <Button
                size="lg"
                className={styles.primaryCTA}
                onClick={() => (window.location.href = "/docs/installation.html")}
                aria-label="Start exploring KubeGraf"
              >
                Start Exploring
                <ArrowRight className={styles.ctaIcon} aria-hidden="true" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                className={styles.secondaryCTA}
                onClick={() => (window.location.href = "/docs/installation.html")}
                aria-label="View installation guide"
              >
                Installation
                <Download className={styles.ctaIcon} aria-hidden="true" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className={styles.trustIndicators}>
              <div className={styles.trustItem}>
                <Lock className={styles.trustLucideIcon} aria-hidden="true" />
                <span>Local-First</span>
              </div>
              <div className={styles.trustItem}>
                <Zap className={styles.trustLucideIcon} aria-hidden="true" />
                <span>Evidence-Driven</span>
              </div>
              <div className={styles.trustItem}>
                <Shield className={styles.trustLucideIcon} aria-hidden="true" />
                <span>Human-in-Loop</span>
              </div>
            </div>
            
            {/* Optional Micro-Text for Social Proof */}
            <p className={styles.socialProof}>
              Trusted by SREs | Designed for Enterprise & Local-First Deployments
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
