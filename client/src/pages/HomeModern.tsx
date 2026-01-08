/**
 * Modern Landing Page - Example Implementation
 * 
 * This is an example Home page using all the new modern components.
 * To use this, rename it to Home.tsx or update your routing.
 * 
 * All components are modular with CSS modules for easy customization.
 */

import Navbar from "@/components/layout/Navbar";
import {
  HeroSection,
  CoreFeatures,
  UseCases,
  HowItWorks,
  EvidenceDesign,
  PlatformsPlugins,
  ProductionReady,
  EnterpriseVC,
  CTASectionModern,
  FooterModern,
} from "@/components/sections/modern";

export default function HomeModern() {
  return (
    <div className="bg-background text-foreground selection:bg-primary/30 scroll-smooth min-h-screen">
      <Navbar />
      <main>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Core Features / Capabilities */}
        <CoreFeatures />

        {/* 3. Use Cases */}
        <UseCases />

        {/* 4. How It Works */}
        <HowItWorks />

        {/* 5. Evidence-Driven Design */}
        <EvidenceDesign />

        {/* 6. Supported Platforms / Plugins */}
        <PlatformsPlugins />

        {/* 7. Production-Ready */}
        <ProductionReady />

        {/* 8. Optional Enterprise / VC-Focused Section */}
        <EnterpriseVC />

        {/* 9. CTA Section */}
        <CTASectionModern />
      </main>
      <FooterModern />
    </div>
  );
}
