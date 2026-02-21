import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Loader2, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { joinWaitlist } from "@/lib/waitlist";

interface WaitlistFormProps {
  size?: "sm" | "lg";
  placeholder?: string;
}

export default function WaitlistForm({ size = "lg", placeholder = "Enter your email" }: WaitlistFormProps) {
  const [step, setStep] = useState<"email" | "details">("email");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [clusters, setClusters] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleEmailStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      setTimeout(() => { setStatus("idle"); setMessage(""); }, 3000);
      return;
    }
    setStatus("idle");
    setMessage("");
    setStep("details");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setStatus("error");
      setMessage("Please enter your name");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const { message: successMessage } = await joinWaitlist({ email, name, company, role, teamSize, clusters });
      setStatus("success");
      setMessage(successMessage || "You're on the list! Redirecting to install…");
      setEmail("");
      setName("");
      setCompany("");
      setRole("");
      setTeamSize("");
      setClusters("");
      setStep("email");

      setTimeout(() => { window.location.href = "/docs/installation.html"; }, 1000);
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "Something went wrong. Please try again.");
      setTimeout(() => { setStatus("idle"); setMessage(""); }, 5000);
    }
  };

  const inputBase = "h-10 text-sm border-border focus:border-primary/50 transition-all placeholder:text-muted-foreground/50 bg-background";

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">

        {/* ── Step 1: Email only ── */}
        {step === "email" && (
          <motion.form
            key="email-step"
            onSubmit={handleEmailStep}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex gap-2">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={placeholder}
                disabled={status === "success"}
                className={`flex-1 ${size === "lg" ? "h-11 text-base" : "h-10 text-sm"} border-border focus:border-primary/50 bg-background placeholder:text-muted-foreground/50`}
                data-testid="input-waitlist-email"
                autoComplete="email"
              />
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-5 font-semibold whitespace-nowrap"
                style={{ height: size === "lg" ? "2.75rem" : "2.5rem" }}
                data-testid="button-waitlist-email"
              >
                Get Early Access
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>

            <AnimatePresence>
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-2 text-xs ${status === "error" ? "text-red-500" : "text-green-500"}`}
                  data-testid="text-waitlist-message"
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        )}

        {/* ── Step 2: Details ── */}
        {step === "details" && status !== "success" && (
          <motion.form
            key="details-step"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2"
          >
            {/* Confirmed email row */}
            <div className="flex items-center gap-2 px-3 py-2 bg-primary/5 border border-primary/20 rounded-md text-sm">
              <Check className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="text-muted-foreground flex-1 truncate">{email}</span>
              <button
                type="button"
                onClick={() => setStep("email")}
                className="text-xs text-primary hover:underline flex items-center gap-0.5 flex-shrink-0"
              >
                <ChevronLeft className="w-3 h-3" />
                Edit
              </button>
            </div>

            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (required)"
              disabled={status === "loading"}
              className={inputBase}
              autoComplete="name"
              autoFocus
            />
            <Input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company / organization (optional)"
              disabled={status === "loading"}
              className={inputBase}
              autoComplete="organization"
            />
            <Input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role — SRE, Platform Eng, DevOps (optional)"
              disabled={status === "loading"}
              className={inputBase}
            />

            <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2">
              <select
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                disabled={status === "loading"}
                className={`${inputBase} rounded-md border border-border px-3 cursor-pointer`}
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
                disabled={status === "loading"}
                className={`${inputBase} rounded-md border border-border px-3 cursor-pointer`}
              >
                <option value="">No. of clusters</option>
                <option value="1–2">1–2 clusters</option>
                <option value="3–10">3–10 clusters</option>
                <option value="10+">10+ clusters</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold mt-1"
              data-testid="button-waitlist-submit"
            >
              {status === "loading" ? (
                <><Loader2 className="w-4 h-4 animate-spin mr-2" />Joining…</>
              ) : (
                <><Check className="w-4 h-4 mr-2" />Join Waitlist</>
              )}
            </Button>

            <AnimatePresence>
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`text-xs text-center ${status === "error" ? "text-red-500" : "text-green-500"}`}
                  data-testid="text-waitlist-message"
                >
                  {message}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.form>
        )}

        {/* ── Success state ── */}
        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-2 py-4 text-center"
            data-testid="text-waitlist-message"
          >
            <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <Check className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-sm font-semibold text-foreground">You're on the list!</p>
            <p className="text-xs text-muted-foreground">{message}</p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
