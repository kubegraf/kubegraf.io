import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import heroBg from "@assets/generated_images/futuristic_dark_cyber_grid_background_with_neon_blue_and_purple_data_streams.png";
import sphereImg from "@assets/generated_images/3d_floating_sphere_with_data_connections.png";
import cubeImg from "@assets/generated_images/glassmorphism_3d_cube_icon_glowing.png";
import { useEffect, useRef, useState } from "react";
import WaitlistForm from "@/components/forms/WaitlistForm";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [isLightTheme, setIsLightTheme] = useState(false);
  
  // Check theme
  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
      setIsLightTheme(theme === 'light' || (!theme && prefersLight));
    };
    
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    mediaQuery.addEventListener('change', checkTheme);
    
    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener('change', checkTheme);
    };
  }, []);
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Mouse move effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX - innerWidth / 2) / 25;
      const y = (clientY - innerHeight / 2) / 25;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={`relative min-h-screen flex items-center justify-center overflow-hidden pt-20 ${isLightTheme ? 'hero-light-theme' : ''}`}>
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Background" 
          className={`w-full h-full object-cover ${isLightTheme ? 'opacity-40' : 'opacity-40'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${isLightTheme ? 'from-transparent via-transparent to-background/30' : 'from-background/0 via-background/50 to-background'}`} />
        <div className={`absolute inset-0 bg-grid-pattern ${isLightTheme ? 'opacity-3' : 'opacity-20'}`} />
      </div>

      {/* Floating 3D Elements */}
      <motion.div 
        style={{ x: springX, y: springY, rotate: rotate }}
        className={`absolute top-1/4 left-10 md:left-1/4 z-0 ${isLightTheme ? 'opacity-85' : 'opacity-60 blur-[1px]'}`}
      >
        <img src={cubeImg} className="w-24 h-24 md:w-32 md:h-32 animate-float" alt="Cube" />
      </motion.div>

      <motion.div 
        style={{ x: useTransform(springX, (val) => val * -1.5), y: y1 }}
        className={`absolute bottom-1/3 right-10 md:right-1/4 z-0 ${isLightTheme ? 'opacity-85' : 'opacity-60'}`}
      >
        <img src={sphereImg} className="w-32 h-32 md:w-48 md:h-48 animate-float" style={{ animationDelay: "1s" }} alt="Sphere" />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-primary/20 text-primary text-sm font-mono mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          v2.0 is now live
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-6 leading-tight md:leading-none px-4"
        >
          KubēGraf<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-accent animate-gradient-x">
            Intelligent Insight
          </span>
          {" "}for Kubernetes Incidents
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed px-4 ${isLightTheme ? 'text-slate-700' : 'text-muted-foreground'}`}
        >
          A local-first Kubernetes tool that detects incidents, explains why they happen with evidence, and previews safe fixes—without SaaS lock-in.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-2xl px-4"
        >
          <WaitlistForm size="lg" placeholder="Enter your email to get early access" />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${isLightTheme ? 'text-slate-600' : 'text-muted-foreground'}`}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </div>
  );
}
