import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { requestDemo } from "@/lib/waitlist";

interface DemoRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DemoRequestModal({ open, onOpenChange }: DemoRequestModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [clusters, setClusters] = useState("");
  const [useCase, setUseCase] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Lock body scroll without layout shift
  useEffect(() => {
    if (open) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.paddingRight = "";
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const reset = () => {
    setEmail(""); setName(""); setCompany(""); setRole("");
    setTeamSize(""); setClusters(""); setUseCase("");
    setStatus("idle"); setMessage("");
  };

  const handleClose = () => {
    reset();
    onOpenChange(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !name) {
      setStatus("error");
      setMessage(!name ? "Email and name are required." : "Please enter a valid email address.");
      setTimeout(() => { setStatus("idle"); setMessage(""); }, 3000);
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const { message: msg } = await requestDemo({ email, name, company, role, teamSize, clusters, useCase });
      setStatus("success");
      setMessage(msg);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Something went wrong. Please try again.");
      setTimeout(() => { setStatus("idle"); setMessage(""); }, 5000);
    }
  };

  const inputBase = "h-10 text-sm border-border focus:border-primary/50 transition-all placeholder:text-muted-foreground/50 bg-background";

  const modal = (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="demo-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            aria-hidden="true"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9998,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />

          {/*
            Centering shell — plain div (no motion, no transform).
            Uses flexbox to center the card. pointer-events:none so
            backdrop clicks pass through to the backdrop div above.
          */}
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              pointerEvents: "none",
            }}
          >
            {/* Animated card — motion.div owns transforms; centering is done by parent flexbox */}
            <motion.div
              key="demo-modal"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-label="Request a Demo"
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: "480px",
                maxHeight: "90vh",
                overflowY: "auto",
                pointerEvents: "auto",
              }}
              className="rounded-xl border border-border bg-background p-6 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h2 className="text-xl font-bold text-foreground">Request a Demo</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Tell us about your setup — we'll reach out within 1 business day to schedule.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="ml-4 flex-shrink-0 rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  aria-label="Close dialog"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Success state */}
              {status === "success" ? (
                <div className="flex flex-col items-center gap-3 py-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-500" />
                  </div>
                  <p className="font-semibold text-foreground">Demo request received!</p>
                  <p className="text-sm text-muted-foreground">{message}</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={handleClose}>
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 mt-4">
                  <Input
                    type="email"
                    placeholder="you@company.com (required)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputBase}
                    autoComplete="email"
                    aria-label="Email address"
                    required
                  />
                  <Input
                    type="text"
                    placeholder="Your name (required)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputBase}
                    autoComplete="name"
                    aria-label="Your name"
                  />
                  <Input
                    type="text"
                    placeholder="Company / organization"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={inputBase}
                    autoComplete="organization"
                    aria-label="Company or organization"
                  />
                  <Input
                    type="text"
                    placeholder="Role — SRE, Platform Eng, DevOps"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={inputBase}
                    aria-label="Your role"
                  />

                  <div className="grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2">
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className={`${inputBase} rounded-md border border-border pl-3 pr-8 cursor-pointer`}
                      aria-label="Team size"
                    >
                      <option value="">Team size</option>
                      <option value="1–10">1–10 engineers</option>
                      <option value="11–50">11–50 engineers</option>
                      <option value="51–200">51–200 engineers</option>
                      <option value="200+">200+ engineers</option>
                    </select>
                    <select
                      value={clusters}
                      onChange={(e) => setClusters(e.target.value)}
                      className={`${inputBase} rounded-md border border-border pl-3 pr-8 cursor-pointer`}
                      aria-label="Number of clusters"
                    >
                      <option value="">No. of clusters</option>
                      <option value="1–2">1–2 clusters</option>
                      <option value="3–10">3–10 clusters</option>
                      <option value="10+">10+ clusters</option>
                    </select>
                  </div>

                  <Textarea
                    placeholder="What would you like to see in the demo? (optional)"
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    className={`${inputBase} h-auto text-sm`}
                    rows={3}
                    aria-label="What you'd like to see in the demo"
                  />

                  {message && (
                    <p className={`text-xs ${status === "error" ? "text-red-500" : "text-green-500"}`}>
                      {message}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold mt-1"
                  >
                    {status === "loading" ? (
                      <><Loader2 className="w-4 h-4 animate-spin mr-2" />Submitting…</>
                    ) : (
                      <>Request Demo <ArrowRight className="w-4 h-4 ml-2" /></>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    No spam. No sales pressure. Unsubscribe anytime.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
