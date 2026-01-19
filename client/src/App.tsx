import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense, useEffect, useState } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

// Core pages only - optimized for performance
const Home = lazy(() => import("@/pages/Home"));
const Pricing = lazy(() => import("@/pages/Pricing"));
const Docs = lazy(() => import("@/pages/Docs"));
const WhatIsKubeGraf = lazy(() => import("@/pages/WhatIsKubeGraf"));
const Compare = lazy(() => import("@/pages/Compare"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const ROI = lazy(() => import("@/pages/ROI"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const License = lazy(() => import("@/pages/License"));
const Support = lazy(() => import("@/pages/Support"));
const NotFound = lazy(() => import("@/pages/not-found"));

// Lightweight loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen bg-gray-950" />
  );
}

function Routes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/kubegraf" component={WhatIsKubeGraf} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/compare" component={Compare} />
        <Route path="/docs-overview" component={Docs} />
        <Route path="/faq" component={FAQ} />
        <Route path="/roi" component={ROI} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/license" component={License} />
        <Route path="/support" component={Support} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default function App() {
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