import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface WaitlistFormProps {
  size?: "sm" | "lg";
  placeholder?: string;
}

export default function WaitlistForm({ size = "lg", placeholder = "Enter your email" }: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus("error");
      setMessage("Please enter your email");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to join waitlist");
      }

      setStatus("success");
      setMessage(data.message || "Successfully joined the waitlist!");
      setEmail("");
      
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "Something went wrong. Please try again.");
      
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 5000);
    }
  };

  const sizeClasses = {
    sm: "h-10 text-sm",
    lg: "h-14 text-lg",
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              disabled={status === "loading" || status === "success"}
              className={`${sizeClasses[size]} glass border-white/20 focus:border-primary/50 transition-all placeholder:text-muted-foreground/50`}
              data-testid="input-waitlist-email"
            />
          </div>
          
          <Button
            type="submit"
            size={size}
            disabled={status === "loading" || status === "success"}
            className={`${sizeClasses[size]} bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-6 sm:px-8 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
            data-testid="button-waitlist-submit"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span className="ml-2">Joining...</span>
              </>
            ) : status === "success" ? (
              <>
                <Check className="w-5 h-5" />
                <span className="ml-2">Joined!</span>
              </>
            ) : (
              <>
                <span>Join Waitlist</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>

        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-3 text-sm text-center ${
                status === "error" 
                  ? "text-red-400" 
                  : status === "success" 
                  ? "text-green-400" 
                  : "text-muted-foreground"
              }`}
              data-testid="text-waitlist-message"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </form>

      {status === "success" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-sm text-center text-muted-foreground"
        >
          We'll notify you when Kubegraf launches. Get ready for the future of orchestration.
        </motion.p>
      )}
    </div>
  );
}
