import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeaturesModern from "@/components/sections/FeaturesModern";
import HowItWorks from "@/components/sections/HowItWorks";
import CTASection from "@/components/sections/CTASection";
import CyberGrid from "@/components/CyberGrid";

export default function Home() {
  return (
    <div className="bg-background text-foreground selection:bg-primary/30 scroll-smooth">
      <CyberGrid />
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
