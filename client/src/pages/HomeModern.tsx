/**
 * Modern Landing Page — KubeGraf AI SRE Platform
 *
 * Sections (in order):
 *  1. Hero           — AI SRE Platform for Kubernetes / Root Cause. SafeFix™. In Minutes.
 *  2. EarlyAccess    — Waitlist form immediately after the hook (Goldilocks zone)
 *  3. WhatIsAISRE    — Traditional tools vs KubeGraf explainer
 *  4. SafeFixSection — Interactive SafeFix™ showcase (split panel)
 *  5. CoreFeatures   — Decision Intelligence, Not Just Observability
 *  6. HowItWorks     — 4-step: Detect → Correlate → Simulate → Execute
 *  7. IncidentExample— Real incident card: payments-api 268 restarts
 *  8. EvidenceDesign — Every Diagnosis is Backed by Evidence
 *  9. UseCases       — Real Kubernetes problem patterns
 * 10. PlatformsPlugins
 * 11. ProductionReady— Built for Engineering Teams
 * 12. EnterpriseVC   — ROI & enterprise metrics
 * 13. CTASectionModern — Second CTA for those who read everything
 */

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import {
  HeroSection,
  WhatIsAISRE,
  SafeFixSection,
  CoreFeatures,
  HowItWorks,
  IncidentExample,
  EvidenceDesign,
  UseCases,
  PlatformsPlugins,
  ProductionReady,
  EnterpriseVC,
  EarlyAccessSection,
  CTASectionModern,
  FooterModern,
} from "@/components/sections/modern";

export default function HomeModern() {
  useEffect(() => {
    document.title = 'KubēGraf — AI SRE Platform for Kubernetes';
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'KubeGraf by Orkastor is an AI SRE Platform for Kubernetes — root cause clarity and safe remediation in minutes, powered by OrkaAI. No SaaS lock-in or cloud dependency.');
  }, []);

  return (
    <div className="bg-background text-foreground selection:bg-primary/30 scroll-smooth min-h-screen">
      <Navbar disableScrollEffects={true} />
      <main>
        {/* 1. Hero — AI SRE Platform positioning */}
        <HeroSection />

        {/* 2. Early Access — first ask right after the hook (peak intent) */}
        <EarlyAccessSection />

        {/* 3. What Is an AI SRE Platform? */}
        <WhatIsAISRE />

        {/* 4. SafeFix™ — interactive showcase */}
        <SafeFixSection />

        {/* 5. Decision Intelligence / Core Features */}
        <CoreFeatures id="features" />

        {/* 6. How It Works — 4-step flow */}
        <HowItWorks />

        {/* 7. Real Incident Example */}
        <IncidentExample />

        {/* 8. Evidence-Driven Design */}
        <EvidenceDesign />

        {/* 9. Use Cases */}
        <UseCases />

        {/* 10. Supported Platforms / Plugins */}
        <PlatformsPlugins />

        {/* 11. Production-Ready */}
        <ProductionReady />

        {/* 12. Enterprise / ROI */}
        <EnterpriseVC />

        {/* 13. Final CTA — second ask for those who read everything */}
        <CTASectionModern />
      </main>
      <FooterModern />
    </div>
  );
}
