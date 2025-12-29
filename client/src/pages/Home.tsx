import { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import IncidentLifecycle from "@/components/sections/IncidentLifecycle";
import EvidencePipeline from "@/components/sections/EvidencePipeline";
import TrustAnchors from "@/components/sections/TrustAnchors";
import CTASection from "@/components/sections/CTASection";
import { useIsMobile } from "@/hooks/useIsMobile";

// Lazy load forensic grid - ONLY on desktop
const ForensicGrid = lazy(() => import("@/components/ForensicGrid"));

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
      {/* ForensicGrid only on desktop, after delay */}
      {!isMobile && showEffects && (
        <Suspense fallback={null}>
          <ForensicGrid />
        </Suspense>
      )}
      <Navbar />
      <Hero />
      <div className="relative">
        <IncidentLifecycle />
        <EvidencePipeline />
        <TrustAnchors />
        <CTASection />
      </div>
      <Footer />
    </div>
  );
}
