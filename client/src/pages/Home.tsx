import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import PowerfulFeatures from "@/components/sections/PowerfulFeatures";
import BrainPanel from "@/components/sections/BrainPanel";
import BrainPanelDetailed from "@/components/sections/BrainPanelDetailed";
import Workflow from "@/components/sections/Workflow";
import Background3D from "@/components/Background3D";

export default function Home() {
  return (
    <div className="bg-background text-foreground selection:bg-primary/30">
      <Background3D />
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
    </div>
  );
}
