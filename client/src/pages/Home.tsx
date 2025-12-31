import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import LogoMarquee from "@/components/sections/LogoMarquee";
import Benefits from "@/components/sections/Benefits";
import Workflow from "@/components/sections/Workflow";
import TrustAnchors from "@/components/sections/TrustAnchors";
import CTASection from "@/components/sections/CTASection";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <div className="bg-background text-foreground selection:bg-primary/30 scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <LogoMarquee />
        <Benefits />
        <Workflow />
        <TrustAnchors />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
