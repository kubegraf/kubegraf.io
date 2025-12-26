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
    const timer = requestIdleCallback?.(() => setShowEffects(true))
      || setTimeout(() => setShowEffects(true), 100);
    return () => {
      if (typeof timer === 'number') clearTimeout(timer);
    };
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
