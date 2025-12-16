import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import PowerfulFeatures from "@/components/sections/PowerfulFeatures";
import BrainPanel from "@/components/sections/BrainPanel";
import BrainPanelDetailed from "@/components/sections/BrainPanelDetailed";
import Workflow from "@/components/sections/Workflow";

export default function Home() {
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

      {/* Footer Simple */}
      <footer className="py-12 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p className="mb-2">© 2024 Kubegraf.io. All rights reserved.</p>
          <p>
            <a href="mailto:contact@kubegraf.io" className="hover:text-primary transition-colors">
              contact@kubegraf.io
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
