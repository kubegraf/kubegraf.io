import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  HeroSection, 
  CoreFeatures, 
  EvidencePipeline, 
  HowItWorks, 
  Testimonials, 
  CTASection, 
  Footer, 
  UseCases,
  Platforms,
  Security 
} from "@/components/sections/futuristic";
import Navbar from "@/components/layout/Navbar";

// Loading animation component
function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black z-[100] flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full mx-auto mb-4"
        />
        <div className="text-cyan-400 font-mono">Initializing KubeGraf...</div>
      </motion.div>
    </motion.div>
  );
}

// Floating navigation indicator
function FloatingNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'how-it-works', 'security', 'testimonials'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section);
            break;
          }
        }
      }
      
      setIsVisible(window.scrollY > 500);
    };
    
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'features', label: 'Features', icon: '⚡' },
    { id: 'how-it-works', label: 'How It Works', icon: '🔧' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'testimonials', label: 'Testimonials', icon: '⭐' },
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : -100 
      }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 bg-gray-900/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-800"
    >
      <div className="flex flex-col gap-2">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => {
              const element = document.getElementById(item.id);
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`p-3 rounded-xl transition-all duration-300 ${
              currentSection === item.id 
                ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-400' 
                : 'bg-gray-800/50 border border-gray-700 text-gray-400 hover:bg-gray-700/50'
            }`}
            title={item.label}
          >
            <span className="text-xl">{item.icon}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}

// Floating chat assistant
function FloatingAssistant() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-6 z-40"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => alert("KubeGraf Assistant: How can I help you today?")}
        className="bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white p-4 rounded-full shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 relative"
      >
        <motion.div
          animate={{ rotate: isHovered ? 0 : 12 }}
          className="text-2xl"
        >
          🤖
        </motion.div>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg whitespace-nowrap border border-gray-700"
          >
            Ask KubeGraf AI
          </motion.div>
        )}
      </motion.button>
    </motion.div>
  );
}

export default function FuturisticLanding() {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      setScrollProgress((scrolled / documentHeight) * 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const sections = [
    { id: 'home', component: HeroSection },
    { id: 'features', component: CoreFeatures },
    { id: 'how-it-works', component: HowItWorks },
    { id: 'evidence-pipeline', component: EvidencePipeline },
    { id: 'security', component: Security },
    { id: 'platforms', component: Platforms },
    { id: 'use-cases', component: UseCases },
    { id: 'testimonials', component: Testimonials },
    { id: 'cta', component: CTASection },
  ];
  
  const ScrollProgressBar = () => (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 z-[100]"
      style={{ width: `${scrollProgress}%` }}
    />
  );
  
  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      
      {!isLoading && (
        <>
          <ScrollProgressBar />
          <Navbar disableScrollEffects={false} />
          <FloatingNav />
          <FloatingAssistant />
          
          <main>
            {sections.map((section, index) => {
              const Component = section.component;
              return (
                <section key={section.id} id={section.id} className="relative">
                  <Component />
                </section>
              );
            })}
          </main>
          
          <Footer />
        </>
      )}
    </>
  );
}