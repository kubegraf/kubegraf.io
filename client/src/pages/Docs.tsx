import Navbar from "@/components/layout/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Bug, Code2, Cpu, HelpCircle, Layers, LifeBuoy, Network, ServerCog, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

type DocCardProps = {
  title: string;
  description: string;
  href: string;
  badge?: string;
};

function DocCard({ title, description, href, badge }: DocCardProps) {
  return (
    <a href={href} className="group block">
      <Card className="h-full border-white/10 bg-black/40 backdrop-blur-sm group-hover:border-primary/60 transition-colors">
        <CardHeader className="pb-3">
          {badge && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-primary mb-2">
              {badge}
            </span>
          )}
          <CardTitle className="text-base md:text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </a>
  );
}

export default function Docs() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('kubegraf-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      setTheme('light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('kubegraf-theme', newTheme);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="relative pb-20">
        {/* Hero */}
        <section className="border-b border-white/5 bg-gradient-to-b from-black/60 via-black/40 to-black/0">
          <div className="container mx-auto max-w-5xl px-4 pt-28 pb-16">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                KubeGraf Documentation
              </h1>
              <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
                Learn how to install KubeGraf, connect real clusters, and use it to debug faster, understand
                changes, and reduce incident time across your Kubernetes environments.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                className="rounded-full px-6 sm:px-8 text-sm font-medium"
                onClick={() => (window.location.href = "/docs/quickstart.html")}
              >
                Get started in 5 minutes
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-6 sm:px-8 text-sm font-medium border-primary/40 text-primary"
                onClick={() => {
                  const el = document.getElementById("troubleshooting-playbooks");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                  else window.location.href = "/docs/workflows/debug-crashloop.html";
                }}
              >
                Troubleshooting playbooks
              </Button>
            </div>
          </div>
        </section>

        {/* Role-based entry cards */}
        <section className="py-12 md:py-16 border-b border-white/5 bg-black/40">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">Start from your current job to be done</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <DocCard
                title="I'm new to KubeGraf"
                description="Install KubeGraf, connect your first cluster, and get a safe tour of the terminal UI and web dashboard."
                href="/docs/getting-started/first-cluster.html"
                badge="Onboard"
              />
              <DocCard
                title="I'm debugging an issue"
                description="Use KubeGraf to walk through CrashLoopBackOffs and other incidents with logs, events, and incident timelines."
                href="/docs/workflows/debug-crashloop.html"
                badge="Troubleshoot"
              />
              <DocCard
                title="I'm deploying or rolling out"
                description="Understand how to watch rollouts, validate changes, and roll back safely using KubeGraf together with your GitOps / CI flow."
                href="/docs/commands.html"
                badge="Delivery"
              />
              <DocCard
                title="I want to understand how it works"
                description="Learn the core concepts behind KubeGraf – clusters and contexts, topology graph, event timeline, and incident mode."
                href="/docs/introduction/what-is-kubegraf.html"
                badge="Concepts"
              />
            </div>
          </div>
        </section>

        {/* Common Kubernetes problems */}
        <section
          id="troubleshooting-playbooks"
          className="py-12 md:py-16 border-b border-white/5 bg-black/20"
        >
          <div className="container mx-auto max-w-5xl px-4">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">Common Kubernetes problems</h2>
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Troubleshooting playbooks
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <DocCard
                title="CrashLoopBackOff"
                description="Walk a real CrashLoopBackOff from red pod to likely root cause using logs, events, and the Incident Timeline."
                href="/docs/workflows/debug-crashloop.html"
              />
              <DocCard
                title="Rollout stuck"
                description="Check rollout status, probe failures, and recent configuration changes when a deployment never becomes Ready."
                href="/docs/troubleshooting/rollout-stuck.html"
              />
              <DocCard
                title="High CPU / memory"
                description="Use topology and resource views to see which workloads are noisy, how they relate, and where to start tuning."
                href="/docs/troubleshooting/high-cpu-memory.html"
              />
              <DocCard
                title="Restarts after config change"
                description="Correlate config updates, pod restarts, and failing probes to understand what changed and how to roll back safely."
                href="/docs/troubleshooting/restarts-after-config-change.html"
              />
            </div>
          </div>
        </section>

        {/* Core concepts */}
        <section className="py-12 md:py-16 border-b border-white/5 bg-black/30">
          <div className="container mx-auto max-w-5xl px-4">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Core concepts</h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-2xl">
              These pages explain KubeGraf’s mental model so the UI feels predictable: how clusters, contexts,
              topology, and events fit together.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              <DocCard
                title="Clusters & contexts"
                description="How KubeGraf uses your kubeconfig, contexts, and namespaces without changing your existing setup."
                href="/docs/configuration.html"
              />
              <DocCard
                title="Topology graph"
                description="Visualizing workloads, services, and dependencies so you can see blast radius at a glance."
                href="/docs/resource-map.html"
              />
              <DocCard
                title="Event timeline"
                description="Ordering rollouts, config changes, probe failures, and restarts into a single narrative."
                href="/docs/web-dashboard.html"
              />
              <DocCard
                title="Incident mode"
                description="Using incident-focused views and Brain Panel summaries when you’re actively firefighting."
                href="/docs/workflows/debug-crashloop.html"
              />
              <DocCard
                title="Local-first architecture"
                description="How KubeGraf runs locally against your clusters and what data never leaves your environment."
                href="/docs/introduction/what-is-kubegraf.html"
              />
            </div>
          </div>
        </section>

        {/* Reference */}
        <section className="py-12 md:py-16 bg-black/40">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">Reference</h2>
              <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                For everyday use
              </span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              <DocCard
                title="CLI reference"
                description="Flags, subcommands, and examples for the KubeGraf CLI."
                href="/docs/commands.html"
              />
              <DocCard
                title="Config"
                description="Configure themes, keybindings, and preferences for your workflow."
                href="/docs/configuration.html"
              />
              <DocCard
                title="Integrations"
                description="Extend KubeGraf with plugins and integrations like Prometheus and ArgoCD."
                href="/docs/plugins.html"
              />
              <DocCard
                title="FAQ"
                description="Common questions and answers about installing and running KubeGraf."
                href="/faq"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p className="mb-2">© 2025 KubēGraf</p>
          <p className="mb-4">
            <a href="mailto:contact@kubegraf.io" className="hover:text-primary transition-colors">
              contact@kubegraf.io
            </a>
          </p>
          <div className="flex justify-center gap-6 text-xs">
            <a href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="/license" className="hover:text-primary transition-colors">License</a>
          </div>
        </div>
      </footer>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-white/10 flex items-center justify-center cursor-pointer hover:scale-110 hover:border-primary transition-all duration-300 shadow-lg z-50"
        aria-label="Toggle theme"
      >
        <span className="text-xl">{theme === 'dark' ? '☀️' : '🌙'}</span>
      </button>
    </div>
  );
}
