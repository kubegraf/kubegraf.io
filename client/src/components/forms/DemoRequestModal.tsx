import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check, Loader2 } from "lucide-react";
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

  const inputBase = "h-10 text-sm border-border focus:border-primary/50 transition-all placeholder:text-muted-foreground/50 bg-background";

  const reset = () => {
    setEmail(""); setName(""); setCompany(""); setRole("");
    setTeamSize(""); setClusters(""); setUseCase("");
    setStatus("idle"); setMessage("");
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) reset();
    onOpenChange(open);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) {
      setStatus("error");
      setMessage("Email and name are required.");
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

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[480px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Request a Demo</DialogTitle>
          <DialogDescription>
            Tell us about your setup — we'll reach out within 1 business day to schedule.
          </DialogDescription>
        </DialogHeader>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-500" />
            </div>
            <p className="font-semibold text-foreground">Demo request received!</p>
            <p className="text-sm text-muted-foreground">{message}</p>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => handleOpenChange(false)}>
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2.5 mt-1">
            <Input
              type="email"
              placeholder="you@company.com (required)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputBase}
              autoComplete="email"
              required
            />
            <Input
              type="text"
              placeholder="Your name (required)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputBase}
              autoComplete="name"
            />
            <Input
              type="text"
              placeholder="Company / organization"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className={inputBase}
              autoComplete="organization"
            />
            <Input
              type="text"
              placeholder="Role — SRE, Platform Eng, DevOps"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={inputBase}
            />

            <div className="grid grid-cols-1 gap-2.5 min-[420px]:grid-cols-2">
              <select
                value={teamSize}
                onChange={(e) => setTeamSize(e.target.value)}
                className={`${inputBase} rounded-md border border-border pl-3 pr-8 cursor-pointer`}
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
      </DialogContent>
    </Dialog>
  );
}
