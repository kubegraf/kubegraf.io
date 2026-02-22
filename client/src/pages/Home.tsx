import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import DemoExecution from "@/components/sections/DemoExecution";
import LogoMarquee from "@/components/sections/LogoMarquee";
import Benefits from "@/components/sections/Benefits";
import Workflow from "@/components/sections/Workflow";
import TrustAnchors from "@/components/sections/TrustAnchors";
import CTASection from "@/components/sections/CTASection";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Home() {
  const isMobile = useIsMobile();

  useEffect(() => {
    document.title = 'KubēGraf – AI SRE Platform for Kubernetes Incident Detection';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Local-first Kubernetes incident detection, root cause analysis, and safe fix previews. No SaaS lock-in. No telemetry. Runs entirely on your machine.');
    }
  }, []);

  return (
    <div className="bg-background text-foreground selection:bg-primary/30 scroll-smooth">
      <Navbar disableScrollEffects={true} />
      <main>
        <Hero />
        <DemoExecution />
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
