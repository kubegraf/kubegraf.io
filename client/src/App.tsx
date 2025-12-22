import { Switch, Route, Router, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import Docs from "@/pages/Docs";
import WhatIsKubeGraf from "@/pages/WhatIsKubeGraf";
import Compare from "@/pages/Compare";
import Privacy from "@/pages/Privacy";
import License from "@/pages/License";
import FAQ from "@/pages/FAQ";
import Support from "@/pages/Support";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { logWebVitals } from "@/lib/webVitals";

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}

function Routes() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Switch location={location}>
        <Route path="/">
          <PageTransition><Home /></PageTransition>
        </Route>
        <Route path="/kubegraf">
          <PageTransition><WhatIsKubeGraf /></PageTransition>
        </Route>
        <Route path="/pricing">
          <PageTransition><Pricing /></PageTransition>
        </Route>
        <Route path="/compare">
          <PageTransition><Compare /></PageTransition>
        </Route>
        <Route path="/docs-overview">
          <PageTransition><Docs /></PageTransition>
        </Route>
        <Route path="/faq">
          <PageTransition><FAQ /></PageTransition>
        </Route>
        <Route path="/privacy">
          <PageTransition><Privacy /></PageTransition>
        </Route>
        <Route path="/license">
          <PageTransition><License /></PageTransition>
        </Route>
        <Route path="/support">
          <PageTransition><Support /></PageTransition>
        </Route>
        <Route>
          <PageTransition><NotFound /></PageTransition>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    // Initialize Web Vitals monitoring in development
    logWebVitals();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Routes />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
