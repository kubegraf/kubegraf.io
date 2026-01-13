import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Users, Play, Terminal, Globe } from "lucide-react";
import styles from "./CTASectionModern.module.css";

const terminalLines = [
  { type: 'command', text: '$ kubegraf scan' },
  { type: 'info', text: 'Scanning namespace: production...' },
  { type: 'warning', text: 'Found 1 high severity incident' },
  { type: 'detail', text: 'ID: crashloopbackoff-api-server' },
  { type: 'command', text: '$ kubegraf diagnose crashloopbackoff-api-server' },
  { type: 'success', text: 'Diagnosis complete: Liveness probe failure detected' },
];

function TerminalView() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines(prev => (prev < terminalLines.length ? prev + 1 : prev));
    }, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.terminalContainer}>
      {terminalLines.slice(0, visibleLines).map((line, i) => (
        <div key={i} className={`${styles.terminalLine} ${styles[line.type]}`}>
          {line.text}
        </div>
      ))}
      {visibleLines < terminalLines.length && (
        <span className={styles.cursor} />
      )}
    </div>
  );
}

function DashboardView() {
  return (
    <div className={styles.dashboardContainer}>
      <img
        src="/assets/screenshots/incident-intelligence.png"
        alt="KubeGraf Incident Intelligence"
        className={styles.dashboardImage}
      />
      <div className={styles.dashboardOverlay}>
        <div className={styles.pulseDot}></div>
        <span className={styles.statusText}>Real-time monitoring active</span>
      </div>
    </div>
  );
}

export default function CTASectionModern() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'dashboard'>('terminal');

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prev => (prev === 'terminal' ? 'dashboard' : 'terminal'));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.section} aria-label="Call to action">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              <span className={styles.highlight}>Start Reducing</span>{" "}
              <span className={styles.highlightAmber}>MTTR Today</span>
            </h2>
            <p className={styles.subtitle}>
              Install in 60 seconds. No cloud dependencies. Works with your existing Kubernetes clusters. Free for teams under 50 pods.
            </p>

            <div className={styles.ctaGroup}>
              <Button
                size="lg"
                className={styles.primaryCTA}
                onClick={() => (window.location.href = "/docs/installation.html")}
                aria-label="Get started with free install"
              >
                <Download className={styles.ctaIcon} aria-hidden="true" />
                Get Started – Free Install
              </Button>
              
              <div className={styles.secondaryCTAs}>
                <Button
                  size="lg"
                  variant="outline"
                  className={styles.secondaryCTA}
                  onClick={() => (window.location.href = "mailto:contact@kubegraf.io?subject=Enterprise Demo Request")}
                  aria-label="Request demo or enterprise information"
                >
                  <Play className={styles.ctaIcon} aria-hidden="true" />
                  Request Demo / Enterprise
                </Button>
                
                <Button
                  size="lg"
                  variant="outline"
                  className={styles.tertiaryCTA}
                  onClick={() => (window.open("https://github.com/kubegraf/kubegraf/discussions", "_blank"))}
                  aria-label="Join early access or community"
                >
                  <Users className={styles.ctaIcon} aria-hidden="true" />
                  Join Early Access / Community
                </Button>
              </div>
            </div>

            <div className={styles.trustMessage}>
              <p className={styles.trustText}>
                Trust, safety, and evidence-driven decisions. That's what KubeGraf delivers.
              </p>
            </div>
          </div>

          {/* Visual Switcher */}
          <div className={styles.visualContent}>
            <div className={styles.visualSwitcher}>
              <div className={styles.switcherHeader}>
                <div className={styles.switcherTabs}>
                  <button
                    className={`${styles.switcherTab} ${activeTab === 'terminal' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('terminal')}
                  >
                    <Terminal size={14} />
                    <span>Terminal UI</span>
                  </button>
                  <button
                    className={`${styles.switcherTab} ${activeTab === 'dashboard' ? styles.activeTab : ''}`}
                    onClick={() => setActiveTab('dashboard')}
                  >
                    <Globe size={14} />
                    <span>Web Dashboard</span>
                  </button>
                </div>
                <div className={styles.placeholderButtons}>
                  <span className={styles.placeholderButton}></span>
                  <span className={styles.placeholderButton}></span>
                  <span className={styles.placeholderButton}></span>
                </div>
              </div>
              
              <div className={styles.switcherContent}>
                <div className={styles.viewWrapper}>
                  {activeTab === 'terminal' ? <TerminalView /> : <DashboardView />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
