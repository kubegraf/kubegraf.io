import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturesModern from "@/components/sections/FeaturesModern";
import HowItWorks from "@/components/sections/HowItWorks";
import CTASection from "@/components/sections/CTASection";

// Lazy load heavy visual effect - deferred to after first paint
const CyberGrid = lazy(() => import("@/components/CyberGrid"));

export default function Home() {
  const [showEffects, setShowEffects] = useState(false);

  useEffect(() => {
    // Defer heavy visual effects until after first meaningful paint
    // Use requestIdleCallback if available, otherwise use setTimeout
    let handle: number;
    if (typeof requestIdleCallback !== 'undefined') {
      handle = requestIdleCallback(() => setShowEffects(true));
      return () => cancelIdleCallback(handle);
    } else {
      handle = window.setTimeout(() => setShowEffects(true), 100);
      return () => clearTimeout(handle);
    }
  }, []);

  return (
    <div className="bg-background text-foreground selection:bg-primary/30 scroll-smooth">
      {showEffects && (
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
