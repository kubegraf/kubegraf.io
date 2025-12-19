import { Switch, Route, Router } from "wouter";
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

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/kubegraf" component={WhatIsKubeGraf} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/compare" component={Compare} />
      <Route path="/docs" component={Docs} />
      <Route path="/faq" component={FAQ} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/license" component={License} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Routes />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
