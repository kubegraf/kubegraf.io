/**
 * Optimized Landing Page - Single version
 * Reduced component count for better performance
 */

import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/animated/HeroSection";
import FeatureShowcase from "@/components/sections/animated/FeatureShowcase";
import AnimatedMetrics from "@/components/sections/animated/AnimatedMetrics";
import InteractiveDemo from "@/components/sections/animated/InteractiveDemo";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">
      <Navbar />
      <main className="relative">
        <HeroSection />
        <FeatureShowcase />
        <AnimatedMetrics />
        <InteractiveDemo />
      </main>
    </div>
  );
}
