import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect, useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

// Lazy load all pages for code splitting
const Home = lazy(() => import("@/pages/Home"));
const HomeModern = lazy(() => import("@/pages/HomeModern"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Docs = lazy(() => import("@/pages/Docs"));
const WhatIsKubeGraf = lazy(() => import("@/pages/WhatIsKubeGraf"));
const Compare = lazy(() => import("@/pages/Compare"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const License = lazy(() => import("@/pages/License"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const Support = lazy(() => import("@/pages/Support"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Lazy load heavy visual components - only on desktop
const CursorGlow = lazy(() => import("@/components/CursorGlow"));

// Minimal loading fallback - just background color, no spinner
function PageLoader() {
  return (
    <div className="min-h-screen bg-background" />
  );
}

function Routes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={HomeModern} />
        <Route path="/classic" component={Home} />
        <Route path="/kubegraf" component={WhatIsKubeGraf} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/compare" component={Compare} />
        <Route path="/docs-overview" component={Docs} />
        <Route path="/faq" component={FAQ} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/license" component={License} />
        <Route path="/support" component={Support} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Check if device is desktop (no touch) - must be in useEffect for SSR safety
    setIsDesktop(!('ontouchstart' in window) && window.matchMedia('(pointer: fine)').matches);
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          {/* Only load cursor glow on desktop devices */}
          {isDesktop && (
            <Suspense fallback={null}>
              <CursorGlow />
            </Suspense>
          )}
          <Toaster />
          <Routes />
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
