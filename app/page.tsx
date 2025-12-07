"use client";

import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { EngineeringCards } from "../components/EngineeringCards";
import { HighlightsSection } from "../components/HighlightsSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { AISection } from "../components/AISection";
import { InnovationSection } from "../components/InnovationSection";
import { PricingSection } from "../components/PricingSection";
import { ComparisonSection } from "../components/ComparisonSection";
import { InterfacesSection } from "../components/InterfacesSection";
import { InstallationSection } from "../components/InstallationSection";
import { FinalCTA } from "../components/FinalCTA";
import { Footer } from "../components/Footer";
import { DottedParticles } from "../components/DottedParticles";
import { SpaceBackground } from "../components/SpaceBackground";

export default function HomePage() {
  return (
    <>
      {/* Enhanced Motion Background with Multiple Layers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Base gradient orbs with blue/violet colors */}
        <span className="absolute w-[220px] h-[220px] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.3),transparent_60%)] blur-[25px] opacity-60 animate-[drift_40s_linear_infinite]" />
        <span className="absolute w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.3),transparent_65%)] blur-[25px] opacity-60 animate-[drift_50s_linear_infinite] delay-[-12s]" />
        <span className="absolute w-[180px] h-[180px] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.25),transparent_65%)] blur-[25px] opacity-50 animate-[drift_45s_linear_infinite] delay-[-28s]" />
        <span className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.15),transparent_70%)] blur-[30px] opacity-40 animate-[drift_60s_linear_infinite] delay-[-6s]" />
      </div>

      {/* Space Background with Grid Lines, Stars, and Moving Objects */}
      <SpaceBackground />

      {/* Dotted Moving Particles */}
      <DottedParticles />

      <main className="relative z-10 min-h-screen">
        <Navbar />
        <Hero />
        <EngineeringCards />
        <HighlightsSection />
        <FeaturesSection />
        <AISection />
        <InnovationSection />
        <PricingSection />
        <ComparisonSection />
        <InterfacesSection />
        <InstallationSection />
        <FinalCTA />
        <Footer />
      </main>
    </>
  );
}
