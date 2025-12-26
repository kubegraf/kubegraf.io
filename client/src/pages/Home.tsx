import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturesModern from "@/components/sections/FeaturesModern";
import HowItWorks from "@/components/sections/HowItWorks";
import CTASection from "@/components/sections/CTASection";
import { useIsMobile } from "@/hooks/useIsMobile";

// Lazy load heavy visual effect - ONLY on desktop
const CyberGrid = lazy(() => import("@/components/CyberGrid"));

export default function Home() {
  const isMobile = useIsMobile();
  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    // Skip effects entirely on mobile
    if (isMobile) return;

    // Defer heavy visual effects until after first meaningful paint (desktop only)
    const timer = setTimeout(() => setShowEffects(true), 200);
    return () => clearTimeout(timer);
  }, [isMobile]);

  return (
    <div className="bg-background text-foreground selection:bg-primary/30 scroll-smooth">
      {/* CyberGrid only on desktop, after delay */}
      {!isMobile && showEffects && (
        <Suspense fallback={null}>
          <CyberGrid />
        </Suspense>
      )}
      <Navbar />
      <Hero />
      <div className="relative">
        <FeaturesModern />
        <HowItWorks />
        <CTASection />
      </div>
      <Footer />
    </div>
  );
}
