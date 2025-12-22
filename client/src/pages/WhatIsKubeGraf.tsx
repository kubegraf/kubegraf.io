import { Terminal, Globe, Code, Database, Lock, Zap, AlertCircle, CheckCircle, Clock, FileText } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function WhatIsKubeGraf() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            About KubeGraf
          </p>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-white via-primary to-purple-400 bg-clip-text text-transparent">
            What is KubeGraf?
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A local-first Kubernetes tool for detecting incidents, understanding root causes, and safely
            responding to failures—without SaaS lock-in.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="glass-card p-6 rounded-xl border border-white/10 text-center">
            <div className="text-3xl font-bold text-primary mb-1">100%</div>
            <div className="text-sm text-muted-foreground">Local-first</div>
          </div>
          <div className="glass-card p-6 rounded-xl border border-white/10 text-center">
            <div className="text-3xl font-bold text-primary mb-1">0</div>
            <div className="text-sm text-muted-foreground">Agents required</div>
          </div>
          <div className="glass-card p-6 rounded-xl border border-white/10 text-center">
            <div className="text-3xl font-bold text-primary mb-1">3</div>
            <div className="text-sm text-muted-foreground">Interfaces (TUI/Web/SPA)</div>
          </div>
          <div className="glass-card p-6 rounded-xl border border-white/10 text-center">
            <div className="text-3xl font-bold text-primary mb-1">∞</div>
            <div className="text-sm text-muted-foreground">Clusters supported</div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">1. Detect</h3>
              <p className="text-sm text-muted-foreground">
                Monitors for CrashLoopBackOff, OOMKilled, restart storms, and probe failures
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="font-bold mb-2">2. Diagnose</h3>
              <p className="text-sm text-muted-foreground">
                Correlates events, logs, and recent changes to explain what failed
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-bold mb-2">3. Preview Fix</h3>
              <p className="text-sm text-muted-foreground">
                Dry-run validation shows exactly what will change before applying
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="font-bold mb-2">4. Store Locally</h3>
              <p className="text-sm text-muted-foreground">
                Every diagnosis saved in SQLite for future reference and learning
              </p>
            </div>
          </div>
        </div>

        {/* Core Features */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Core Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Terminal className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Multiple Interfaces</h3>
                  <p className="text-muted-foreground mb-3">
                    Choose how you work: keyboard-driven TUI for SSH sessions, web dashboard for visual exploration, or modern SPA interface.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs px-2 py-1 rounded bg-black/40 border border-white/10">Terminal UI</span>
                    <span className="text-xs px-2 py-1 rounded bg-black/40 border border-white/10">Web Dashboard</span>
                    <span className="text-xs px-2 py-1 rounded bg-black/40 border border-white/10">SPA</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Change Intelligence</h3>
                  <p className="text-muted-foreground mb-3">
                    See what changed before an incident: deployments, configs, secrets. Correlate changes with failures to find root causes faster.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs px-2 py-1 rounded bg-black/40 border border-white/10">Deployment tracking</span>
                    <span className="text-xs px-2 py-1 rounded bg-black/40 border border-white/10">Config diffs</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <Database className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Knowledge Bank</h3>
                  <p className="text-muted-foreground mb-3">
                    Every incident stored locally in SQLite. Search by pod, namespace, error type, or fix applied. Learn from past incidents.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs px-2 py-1 rounded bg-black/40 border border-white/10">Local storage</span>
                    <span className="text-xs px-2 py-1 rounded bg-black/40 border border-white/10">Searchable</span>
                    <span className="text-xs px-2 py-1 rounded bg-black/40 border border-white/10">Exportable</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-6 h-6 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Security First</h3>
                  <p className="text-muted-foreground mb-3">
                    Credentials stay on your machine. Read-only by default. Dry-run validation before any changes. Open source and auditable.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="text-xs px-2 py-1 rounded bg-black/40 border border-white/10">Local-first</span>
                    <span className="text-xs px-2 py-1 rounded bg-black/40 border border-white/10">Read-only mode</span>
                    <span className="text-xs px-2 py-1 rounded bg-black/40 border border-white/10">Apache 2.0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Use Cases */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Common Use Cases</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <h3 className="font-bold mb-2">On-call Engineers</h3>
              <p className="text-sm text-muted-foreground">
                Get paged at 3am? KubeGraf shows you what changed, what failed, and suggests fixes—all from your terminal.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <h3 className="font-bold mb-2">Platform Teams</h3>
              <p className="text-sm text-muted-foreground">
                Track recurring incidents across namespaces. Identify patterns. Export reports for postmortems.
              </p>
            </div>
            <div className="glass-card p-6 rounded-xl border border-white/10">
              <h3 className="font-bold mb-2">DevOps Engineers</h3>
              <p className="text-sm text-muted-foreground">
                Multi-cluster visibility without SaaS overhead. Switch contexts instantly. No agents to manage.
              </p>
            </div>
          </div>
        </div>

        {/* What KubeGraf is NOT */}
        <div className="glass-card p-8 rounded-2xl border border-white/10 mb-16 bg-black/20">
          <h2 className="text-2xl font-bold mb-6">What KubeGraf is NOT</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-muted-foreground">✗</span> Not a monitoring platform
              </h3>
              <p className="text-sm text-muted-foreground">
                Use Prometheus, Datadog, or Grafana for metrics. KubeGraf focuses on incident detection and diagnosis.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-muted-foreground">✗</span> Not a deployment tool
              </h3>
              <p className="text-sm text-muted-foreground">
                Use Argo, Flux, or Jenkins for CI/CD. KubeGraf can rollback during incidents, but it's not a GitOps platform.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-muted-foreground">✗</span> Not an auto-healer
              </h3>
              <p className="text-sm text-muted-foreground">
                KubeGraf suggests fixes. You decide whether to apply them. No silent automation or black-box changes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-muted-foreground">✗</span> Not a SaaS
              </h3>
              <p className="text-sm text-muted-foreground">
                Runs locally. No accounts, no subscriptions, no cloud dependencies for core features.
              </p>
            </div>
          </div>
        </div>

        {/* Brand Clarity */}
        <div className="glass-card p-8 rounded-2xl border border-primary/20 mb-16 bg-primary/5">
          <h2 className="text-xl font-bold mb-4">Brand Clarity</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            The term <strong className="text-foreground">KubeGraf</strong> on this site refers exclusively to the product distributed via{' '}
            <span className="font-mono text-primary">kubegraf.io</span> and related installers and binaries.
          </p>
          <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
            <strong className="text-foreground">Important:</strong> KubeGraf (kubegraf.io) is an independent product and is{' '}
            <strong>not</strong> affiliated with Kubernetes, the CNCF, Grafana Labs, or the{' '}
            <strong className="text-foreground">DevOpsProdigy KubeGraf</strong> Grafana plugin.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Any references to other tools are purely for comparison and do not imply partnership or endorsement.
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to try KubeGraf?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/docs/installation.html"
              className="inline-flex items-center px-8 py-4 rounded-full border border-primary/50 bg-primary/10 hover:bg-primary/20 transition-all font-semibold"
            >
              Install KubeGraf
            </a>
            <a
              href="/docs/quickstart.html"
              className="inline-flex items-center px-8 py-4 rounded-full border border-white/20 bg-black/40 hover:bg-black/60 transition-all font-semibold"
            >
              Quick Start Guide
            </a>
            <a
              href="https://github.com/kubegraf/kubegraf"
              className="inline-flex items-center px-8 py-4 rounded-full border border-white/20 bg-black/40 hover:bg-black/60 transition-all font-semibold"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      <Footer variant="minimal" />
    </div>
  );
}
