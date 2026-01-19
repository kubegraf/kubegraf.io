/**
 * YC/VC-Ready Professional Landing Page
 * Inspired by: n8n.io, render.com, portworx.com, gumloop.com
 * Focus: Clear value prop, strong metrics, professional design
 */

import { 
  HeroSection, 
  SocialProof, 
  FeatureGrid, 
  ProductDemo, 
  Metrics,
  Testimonials,
  PricingSection,
  FinalCTA,
  Footer
} from "@/components/sections/yc-ready";
import Navbar from "@/components/layout/Navbar";

export default function YCReadyLanding() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <main>
        {/* 1. Hero Section */}
        <HeroSection />
        
        {/* 2. Social Proof */}
        <SocialProof />
        
        {/* 3. Feature Grid */}
        <FeatureGrid />
        
        {/* 4. Product Demo */}
        <ProductDemo />
        
        {/* 5. Metrics */}
        <Metrics />
        
        {/* 6. Testimonials */}
        <Testimonials />
        
        {/* 7. Pricing Section */}
        <PricingSection />
        
        {/* 8. Final CTA */}
        <FinalCTA />
      </main>
      
      {/* 9. Footer */}
      <Footer />
    </div>
  );
}