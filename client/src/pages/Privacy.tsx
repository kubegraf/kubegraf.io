import { motion } from "framer-motion";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { FooterModern } from "@/components/sections/modern";

export default function Privacy() {
  useEffect(() => {
    document.title = 'Privacy Policy – KubēGraf';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'KubeGraf Privacy Policy — no cluster data collected, no telemetry, no tracking. Local-first by design.');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar disableScrollEffects />

      <main className="pt-20">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span style={{
              background: 'linear-gradient(135deg, #FE5000, #0891b2)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Privacy</span>{" "}
            <span style={{
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Policy</span>
          </h1>
          <p className="text-sm text-muted-foreground/60 mb-10">Last updated: 6 March 2026</p>

          <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground leading-relaxed">
            <p>
              The privacy of your data is important to us. KubeGraf is built local-first — your cluster data never leaves your machine. This page explains what we do and don't collect, and why.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-10 mb-3">Your cluster data stays on your machine</h2>
            <p>
              KubeGraf runs entirely locally. Your Kubernetes logs, events, configurations, resource definitions, and cluster metrics are never sent to us or any third party. All incident data and diagnostics are stored in SQLite databases on your own machine — we have no access to any of it.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-10 mb-3">KubeGraf Pro — license verification</h2>
            <p>
              The free version sends us nothing. The Pro version sends your license key to our license server to confirm it is valid. That's it — no cluster data, no usage patterns, no user profiling. We do not log client IP addresses beyond what a standard web server requires for the connection to work. Verification logs are deleted after 90 days.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-10 mb-3">This website — cookies and storage</h2>
            <p>
              kubegraf.io uses <strong>no analytics, no tracking, and no advertising</strong>. We do not use Google Analytics, Meta Pixel, or any similar service. Fonts are served from our own domain — no requests go to Google Fonts or any external CDN.
            </p>
            <p>
              The site stores two small preferences in your browser — one functional cookie (<code className="text-xs bg-muted px-1 py-0.5 rounded font-mono">sidebar_state</code>, 7-day expiry) that remembers whether the sidebar is open or collapsed, and a localStorage entry (<code className="text-xs bg-muted px-1 py-0.5 rounded font-mono">kubegraf-theme</code>) that remembers your light/dark theme choice. Neither is used for tracking or shared with anyone.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-10 mb-3">Waitlist and demo forms</h2>
            <p>
              If you sign up for early access or request a demo, you provide your email address and optionally your name, company, role, team size, and cluster count. We use this only to contact you about KubeGraf.
            </p>
            <p>
              Submissions are stored in <strong>Google Sheets</strong> via Google Apps Script — Google acts as a data processor under their standard{" "}
              <a href="https://workspace.google.com/terms/dpa_terms.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                Data Processing Amendment
              </a>. We do not share this information with anyone else or use it for advertising. Legal basis: legitimate interests (responding to your expressed interest in KubeGraf).
            </p>
            <p>
              To have your data removed, email us at{" "}
              <a href="mailto:contact@kubegraf.io" className="text-primary hover:text-primary/80">contact@kubegraf.io</a> and we'll delete it promptly.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-10 mb-3">Your rights</h2>
            <p>
              Under UK and EU GDPR you have the right to access, correct, delete, or port any personal data we hold about you, and to object to how we use it. Just email{" "}
              <a href="mailto:contact@kubegraf.io" className="text-primary hover:text-primary/80">contact@kubegraf.io</a> — we'll respond within 30 days.
            </p>
            <p>
              If you have a concern about how we handle your data, please contact us first and we'll do our best to resolve it. If you remain unsatisfied, you have the right to escalate to the{" "}
              <a href="https://ico.org.uk/" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80">
                Information Commissioner's Office (ICO)
              </a>.
            </p>

            <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-10 mb-3">Changes</h2>
            <p>
              If we make material changes we'll update this page and revise the date above.
            </p>

            <p className="text-sm text-muted-foreground/70 mt-12">
              KubēGraf is a flagship product of Orkastor.{" "}
              <a href="mailto:contact@kubegraf.io" className="text-primary hover:text-primary/80">contact@kubegraf.io</a>
            </p>
          </div>
        </motion.div>
      </section>
      </main>

      <FooterModern />
    </div>
  );
}
