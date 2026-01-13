import { Terminal, Globe, Code, Database, Lock, Zap, AlertCircle, CheckCircle, Clock, FileText, Shield, Search, Wrench, Download, ArrowRight, Play } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { FooterModern } from "@/components/sections/modern";

export default function WhatIsKubeGraf() {

  return (
    <div className="bg-background text-foreground selection:bg-primary/30 scroll-smooth min-h-screen">
      <Navbar disableScrollEffects />

      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-16 overflow-hidden bg-background" aria-label="About KubeGraf Hero">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(6,182,212,0.1),transparent)]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 max-w-6xl">
            <div className="text-center max-w-4xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10"
              >
                <div className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">
                  Everything you need to know
                </div>
                <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-[1.1] tracking-tight">
                  <span style={{
                    background: 'linear-gradient(135deg, #FE5000, #0891b2)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>What is</span>{" "}
                  <span style={{
                    background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>KubeGraf?</span>
                </h1>
                <p className="text-xl md:text-2xl text-foreground opacity-90 leading-relaxed font-medium">
                  A local-first Kubernetes intelligence brain for detecting incidents, understanding root causes, and safely
                  responding to failures—without SaaS lock-in.
                </p>
              </motion.div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { label: "Local-first", value: "100%" },
                { label: "Agents required", value: "0" },
                { label: "Interfaces (TUI/Web/SPA)", value: "3" },
                { label: "Clusters supported", value: "∞" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-8 rounded-2xl border border-border/50 bg-card dark:bg-card/30 backdrop-blur-sm text-center hover:border-primary/50 transition-all group shadow-md dark:shadow-sm"
                >
                  <div
                    className="text-4xl font-bold mb-2 group-hover:scale-110 transition-transform"
                    style={{
                      background: 'linear-gradient(135deg, #FE5000, #0891b2)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm font-semibold text-foreground/75 dark:text-muted-foreground uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span style={{
                  background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>How It Works</span>
              </h2>
              <p className="text-lg max-w-2xl mx-auto text-foreground/75 dark:text-muted-foreground">
                KubeGraf streamlines the entire incident lifecycle with an evidence-driven approach.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  icon: AlertCircle, 
                  title: "1. Detect", 
                  desc: "Monitors for CrashLoopBackOff, OOMKilled, restart storms, and probe failures in real-time.", 
                  color: "#06b6d4" 
                },
                { 
                  icon: FileText, 
                  title: "2. Diagnose", 
                  desc: "Correlates events, logs, and recent changes to explain exactly why the resource failed.", 
                  color: "#f59e0b" 
                },
                { 
                  icon: CheckCircle, 
                  title: "3. Preview Fix", 
                  desc: "Dry-run validation shows exactly what will change before applying any fix to your cluster.", 
                  color: "#10b981" 
                },
                { 
                  icon: Database, 
                  title: "4. Store Locally", 
                  desc: "Every diagnosis is saved in a local SQLite database for future reference and machine learning.", 
                  color: "#f97316" 
                },
              ].map((step, i) => (step && (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-8 rounded-2xl border border-border/50 bg-card/10 backdrop-blur-md hover:border-primary/30 transition-all flex flex-col items-center text-center group"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`} style={{ backgroundColor: `${step.color}20` }}>
                    <step.icon className={`w-8 h-8`} style={{ color: step.color }} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-foreground/75 dark:text-muted-foreground leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              )))}
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="py-24 bg-card/20 dark:bg-card/5">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                <span style={{
                  background: 'linear-gradient(135deg, #FE5000, #0891b2)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Core Capabilities</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Terminal,
                  title: "Multiple Interfaces",
                  desc: "Choose how you work: keyboard-driven TUI for SSH sessions, web dashboard for visual exploration, or modern SPA interface.",
                  tags: ["Terminal UI", "Web Dashboard", "Modern SPA"],
                  color: "#06b6d4"
                },
                {
                  icon: Clock,
                  title: "Change Intelligence",
                  desc: "See what changed before an incident: deployments, configs, secrets. Correlate changes with failures to find root causes faster.",
                  tags: ["Deployment tracking", "Config diffs"],
                  color: "#3b82f6"
                },
                {
                  icon: Search,
                  title: "Knowledge Bank",
                  desc: "Every incident stored locally in SQLite. Search by pod, namespace, error type, or fix applied. Learn from past incidents.",
                  tags: ["Local storage", "Searchable", "Exportable"],
                  color: "#10b981"
                },
                {
                  icon: Shield,
                  title: "Security First",
                  desc: "Credentials stay on your machine. Read-only by default. Dry-run validation before any changes. Open source and auditable.",
                  tags: ["Local-first", "Read-only mode", "Apache 2.0"],
                  color: "#f59e0b"
                }
              ].map((cap, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="p-8 rounded-3xl border border-border/50 bg-card/20 backdrop-blur-sm hover:border-primary/50 transition-all group"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center flex-shrink-0 group-hover:border-primary/50 transition-colors">
                      <cap.icon className={`w-8 h-8`} style={{ color: cap.color }} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3">{cap.title}</h3>
                      <p className="text-foreground/75 dark:text-muted-foreground mb-6 leading-relaxed">
                        {cap.desc}
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {cap.tags.map(tag => (
                          <span key={tag} className="text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Grid */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">
                <span style={{
                  background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>Common Use Cases</span>
              </h2>
            </div>
            
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { title: "On-call Engineers", desc: "Get paged at 3am? KubeGraf shows you what changed, what failed, and suggests fixes—all from your terminal." },
                { title: "Platform Teams", desc: "Track recurring incidents across namespaces. Identify patterns. Export reports for postmortems." },
                { title: "DevOps Engineers", desc: "Multi-cluster visibility without SaaS overhead. Switch contexts instantly. No agents to manage." }
              ].map((useCase, i) => (
                <div key={i} className="p-8 rounded-2xl border border-border/50 bg-card/10 hover:border-primary/30 transition-all">
                  <h3 className="text-xl font-bold mb-4">{useCase.title}</h3>
                  <p className="text-foreground/75 dark:text-muted-foreground leading-relaxed">
                    {useCase.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What KubeGraf is NOT */}
        <section className="py-24 bg-card/10 border-y border-border/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center tracking-tight">
              <span style={{
                background: 'linear-gradient(135deg, #FE5000, #0891b2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>What KubeGraf is</span>{" "}
              <span className="text-destructive">NOT</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Not a monitoring platform", desc: "Use Prometheus, Datadog, or Grafana for metrics. KubeGraf focuses on incident detection and diagnosis." },
                { title: "Not a deployment tool", desc: "Use Argo, Flux, or Jenkins for CI/CD. KubeGraf can rollback during incidents, but it's not a GitOps platform." },
                { title: "Not an auto-healer", desc: "KubeGraf suggests fixes. You decide whether to apply them. No silent automation or black-box changes." },
                { title: "Not a SaaS", desc: "Runs locally. No accounts, no subscriptions, no cloud dependencies for core features." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-6 rounded-2xl bg-background/50 border border-border/50">
                  <div className="text-destructive font-bold text-2xl">✗</div>
                  <div>
                    <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                    <p className="text-foreground/75 dark:text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent)]" />
          <div className="container relative z-10 mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">
              <span style={{
                background: 'linear-gradient(135deg, #FE5000, #0891b2)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>Ready to try</span>{" "}
              <span style={{
                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>KubeGraf?</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/docs/installation.html">
                <Button size="lg" className="h-14 px-10 text-lg font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all rounded-full group">
                  <Download className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Install KubeGraf
                </Button>
              </Link>
              <Link href="/docs/quickstart.html">
                <Button variant="outline" size="lg" className="h-14 px-10 text-lg font-bold border-border hover:bg-card/50 transition-all rounded-full group">
                  <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Quick Start Guide
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <FooterModern />
    </div>
  );
}
