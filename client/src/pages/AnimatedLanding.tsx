/**
 * Canva/Figma Style Animated Landing Page
 * Features: Rich animations, vibrant colors, 3D effects, interactive elements
 */

import { 
  HeroSection, 
  FeatureShowcase, 
  AnimatedMetrics,
  InteractiveDemo,
  TestimonialCarousel,
  PricingCards,
  FinalCTA,
  Footer,
  AnimatedBackground
} from "@/components/sections/animated";
import Navbar from "@/components/layout/Navbar";

// Page wrapper with animated background
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      <AnimatedBackground />
      {children}
    </div>
  );
}

export default function AnimatedLandingPage() {
  return (
    <PageWrapper>
      <Navbar />
      <main className="relative">
        {/* Hero Section */}
        <section className="relative min-h-screen">
          <HeroSection />
        </section>
        
        {/* Feature Showcase */}
        <section className="relative py-24">
          <FeatureShowcase />
        </section>
        
        {/* Animated Metrics */}
        <section className="relative py-24">
          <AnimatedMetrics />
        </section>
        
        {/* Interactive Demo */}
        <section className="relative py-24">
          <InteractiveDemo />
        </section>
        
        {/* Testimonial Carousel */}
        <section className="relative py-24">
          <TestimonialCarousel />
        </section>
        
        {/* Pricing Cards */}
        <section className="relative py-24">
          <PricingCards />
        </section>
        
        {/* Final CTA */}
        <section className="relative py-24">
          <FinalCTA />
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </PageWrapper>
  );
}