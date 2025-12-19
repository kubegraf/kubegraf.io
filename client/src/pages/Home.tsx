import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import PowerfulFeatures from "@/components/sections/PowerfulFeatures";
import BrainPanel from "@/components/sections/BrainPanel";
import BrainPanelDetailed from "@/components/sections/BrainPanelDetailed";
import Workflow from "@/components/sections/Workflow";
import { useEffect, useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
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
    <div className="bg-background text-foreground selection:bg-primary/30">
      <Navbar />
      <Hero />
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <Features />
        <PowerfulFeatures />
        <BrainPanel />
        <BrainPanelDetailed />
        <Workflow />
      </div>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Copyright */}
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-2">
                © 2025 KubeGraf
              </p>
              <p className="text-sm text-muted-foreground">
                <a href="https://kubegraf.io" className="hover:text-primary transition-colors">kubegraf.io</a>
                {" · "}
                <a href="mailto:contact@kubegraf.io" className="hover:text-primary transition-colors">contact@kubegraf.io</a>
              </p>
            </div>

            {/* Tagline & Description */}
            <div className="text-center mb-8 pb-8 border-b border-white/5">
              <h3 className="text-xl font-display font-bold mb-3">
                KubeGraf — Intelligent Insight for Kubernetes Incidents
              </h3>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                KubeGraf is a local-first Kubernetes tool for detecting incidents, understanding root causes, and safely responding to failures.
                It runs on your laptop or inside your environment. No mandatory SaaS. No vendor lock-in.
              </p>
            </div>

            {/* Brand Clarity */}
            <div className="text-center">
              <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
                <strong>Brand clarity:</strong> KubeGraf (kubegraf.io) is an independent product and is not affiliated with Kubernetes,
                the CNCF, Grafana Labs, or the DevOpsProdigy KubeGraf Grafana plugin.
              </p>
            </div>

            {/* Footer Links */}
            <div className="text-center mt-6 flex justify-center gap-6 text-xs">
              <a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="/license" className="text-muted-foreground hover:text-primary transition-colors">
                License
              </a>
            </div>
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
