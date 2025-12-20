import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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

      <Footer />

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
