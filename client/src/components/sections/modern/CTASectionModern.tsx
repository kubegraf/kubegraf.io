import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Users, Play, Terminal, Globe, TrendingUp } from "lucide-react";
import styles from "./CTASectionModern.module.css";
import DemoRequestModal from "@/components/forms/DemoRequestModal";
import WaitlistModal from "@/components/forms/WaitlistModal";
import { LINKS } from "@/config/links";

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.02.048.035.088.068.107a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

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
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab(prev => (prev === 'terminal' ? 'dashboard' : 'terminal'));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <section className={styles.section} aria-label="Call to action">
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>
              <span className={styles.highlight}>Get Started</span>{" "}
              <span className={styles.highlightAmber}>in 60 Seconds</span>
            </h2>
            <p className={styles.subtitle}>
              Install KubeGraf free. Works with your existing clusters — EKS, GKE, AKS, OpenShift, K3s. No cloud dependencies. No data leaves your environment.
            </p>

            <div className={styles.ctaGroup}>
              <Button
                size="lg"
                className={styles.primaryCTA}
                onClick={() => setWaitlistOpen(true)}
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
                  onClick={() => (window.location.href = "/roi")}
                  aria-label="See ROI and business impact"
                >
                  <TrendingUp className={styles.ctaIcon} aria-hidden="true" />
                  See ROI & Business Impact
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className={styles.secondaryCTA}
                  onClick={() => setDemoModalOpen(true)}
                  aria-label="Request demo or enterprise information"
                >
                  <Play className={styles.ctaIcon} aria-hidden="true" />
                  Request Demo / Enterprise
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className={styles.tertiaryCTA}
                  onClick={() => {
                    document.getElementById("early-access")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  aria-label="Join early access program"
                >
                  <Users className={styles.ctaIcon} aria-hidden="true" />
                  Join Early Access
                </Button>

                <a
                  href={LINKS.DISCORD_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.discordCTA}
                  aria-label="Join the KubeGraf Discord community"
                >
                  <DiscordIcon className={styles.discordIcon} />
                  Join Community on Discord
                </a>
              </div>
            </div>

            <div className={styles.trustMessage}>
              <p className={styles.trustText}>
                KubeGraf is an AI SRE platform for Kubernetes — delivering root cause clarity and safe remediation without cloud dependency.
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

    <DemoRequestModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
    <WaitlistModal open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </>
  );
}
