import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, CheckCircle2, MessageSquarePlus } from "lucide-react";
import { submitFeedback } from "@/lib/feedback";

type Category = "general" | "feature" | "bug" | "ux";
type Status = "idle" | "loading" | "success" | "error";

const CATEGORIES: { value: Category; label: string }[] = [
  { value: "general",  label: "General" },
  { value: "feature",  label: "Feature Request" },
  { value: "bug",      label: "Bug Report" },
  { value: "ux",       label: "UX / Design" },
];

const RATINGS = [
  { value: 1, emoji: "😞", label: "Very poor" },
  { value: 2, emoji: "😕", label: "Poor" },
  { value: 3, emoji: "😐", label: "Okay" },
  { value: 4, emoji: "😊", label: "Good" },
  { value: 5, emoji: "😍", label: "Excellent" },
];

export default function FeedbackWidget() {
  const [open, setOpen]               = useState(false);
  const [rating, setRating]           = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [category, setCategory]       = useState<Category>("general");
  const [message, setMessage]         = useState("");
  const [email, setEmail]             = useState("");
  const [status, setStatus]           = useState<Status>("idle");
  const [error, setError]             = useState("");

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, status]); // eslint-disable-line react-hooks/exhaustive-deps

  function reset() {
    setRating(null);
    setHoverRating(null);
    setCategory("general");
    setMessage("");
    setEmail("");
    setStatus("idle");
    setError("");
  }

  function handleClose() {
    setOpen(false);
    if (status === "success") {
      setTimeout(reset, 400);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) {
      setError("Please share your feedback.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      await submitFeedback({
        rating,
        category,
        message: message.trim(),
        email: email.trim(),
        page: window.location.pathname,
      });
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  const displayRating = hoverRating ?? rating;

  const widget = (
    <>
      {/* Floating Tab — hidden while panel is open */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(true)}
            aria-label="Open feedback panel"
            style={{
              position: "fixed",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 49,
              writingMode: "vertical-rl",
              textOrientation: "mixed",
              background: "hsl(var(--primary))",
              color: "white",
              border: "none",
              padding: "16px 10px",
              borderRadius: "8px 0 0 8px",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "-3px 0 18px rgba(0,0,0,0.18)",
              userSelect: "none",
            }}
          >
            <MessageSquarePlus size={14} aria-hidden="true" />
            Feedback
          </motion.button>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            aria-hidden="true"
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 48,
              background: "rgba(0,0,0,0.25)",
              backdropFilter: "blur(2px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Slide-out Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label="Feedback"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            style={{
              position: "fixed",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 50,
              width: "min(360px, 100vw)",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRight: "none",
              borderRadius: "12px 0 0 12px",
              boxShadow: "-8px 0 40px rgba(0,0,0,0.18)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 18px",
                borderBottom: "1px solid hsl(var(--border))",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <MessageSquarePlus
                  size={16}
                  style={{ color: "hsl(var(--primary))" }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                    color: "hsl(var(--foreground))",
                  }}
                >
                  Share Feedback
                </span>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close feedback panel"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "hsl(var(--muted-foreground))",
                  padding: "4px",
                  borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                }}
                onMouseEnter={e =>
                  ((e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--foreground))")
                }
                onMouseLeave={e =>
                  ((e.currentTarget as HTMLButtonElement).style.color = "hsl(var(--muted-foreground))")
                }
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {status === "success" ? (
                /* Success State */
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "14px",
                    padding: "48px 24px",
                    textAlign: "center",
                  }}
                >
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 14, delay: 0.1 }}
                  >
                    <CheckCircle2
                      style={{ width: 52, height: 52, color: "#10b981" }}
                      aria-hidden="true"
                    />
                  </motion.div>
                  <div>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: "1rem",
                        color: "hsl(var(--foreground))",
                        marginBottom: "6px",
                      }}
                    >
                      Thank you!
                    </p>
                    <p
                      style={{
                        fontSize: "0.8125rem",
                        color: "hsl(var(--muted-foreground))",
                        lineHeight: 1.6,
                      }}
                    >
                      Your feedback helps us build a better KubeGraf.
                      <br />
                      We read every message.
                    </p>
                  </div>
                  <button
                    onClick={handleClose}
                    style={{
                      marginTop: "4px",
                      fontSize: "0.8125rem",
                      fontWeight: 500,
                      color: "hsl(var(--primary))",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    Close
                  </button>
                </div>
              ) : (
                /* Feedback Form */
                <form onSubmit={handleSubmit} style={{ padding: "18px 18px 22px" }}>
                  {/* ── Rating ── */}
                  <div style={{ marginBottom: "20px" }}>
                    <p
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "hsl(var(--muted-foreground))",
                        marginBottom: "10px",
                      }}
                    >
                      How's your experience?
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {RATINGS.map(r => (
                        <button
                          key={r.value}
                          type="button"
                          title={r.label}
                          onClick={() =>
                            setRating(rating === r.value ? null : r.value)
                          }
                          onMouseEnter={() => setHoverRating(r.value)}
                          onMouseLeave={() => setHoverRating(null)}
                          aria-label={r.label}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "1.75rem",
                            padding: "4px",
                            transition: "transform 0.15s ease, opacity 0.15s ease",
                            transform:
                              displayRating === r.value
                                ? "scale(1.4)"
                                : "scale(1)",
                            opacity:
                              displayRating && displayRating !== r.value
                                ? 0.3
                                : 1,
                          }}
                        >
                          {r.emoji}
                        </button>
                      ))}
                    </div>
                    {displayRating && (
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: "0.75rem",
                          color: "hsl(var(--muted-foreground))",
                          marginTop: "6px",
                          minHeight: "1.1em",
                        }}
                      >
                        {RATINGS[displayRating - 1].label}
                      </p>
                    )}
                  </div>

                  {/* ── Category ── */}
                  <div style={{ marginBottom: "18px" }}>
                    <p
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "hsl(var(--muted-foreground))",
                        marginBottom: "8px",
                      }}
                    >
                      Category
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                      {CATEGORIES.map(c => (
                        <button
                          key={c.value}
                          type="button"
                          onClick={() => setCategory(c.value)}
                          style={{
                            padding: "4px 12px",
                            borderRadius: "999px",
                            fontSize: "0.75rem",
                            fontWeight: 500,
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            background:
                              category === c.value
                                ? "hsl(var(--primary))"
                                : "transparent",
                            color:
                              category === c.value
                                ? "white"
                                : "hsl(var(--muted-foreground))",
                            border:
                              category === c.value
                                ? "1px solid hsl(var(--primary))"
                                : "1px solid hsl(var(--border))",
                          }}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* ── Message ── */}
                  <div style={{ marginBottom: "14px" }}>
                    <p
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "hsl(var(--muted-foreground))",
                        marginBottom: "8px",
                      }}
                    >
                      Your feedback{" "}
                      <span style={{ color: "hsl(var(--destructive))", fontWeight: 400 }}>
                        *
                      </span>
                    </p>
                    <textarea
                      value={message}
                      onChange={e => {
                        setMessage(e.target.value);
                        if (error) setError("");
                      }}
                      placeholder="Feature ideas, issues, or general thoughts..."
                      rows={4}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        fontSize: "0.8125rem",
                        lineHeight: 1.55,
                        borderRadius: "8px",
                        resize: "none",
                        outline: "none",
                        background: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        color: "hsl(var(--foreground))",
                        boxSizing: "border-box",
                        fontFamily: "inherit",
                        transition: "border-color 0.15s",
                      }}
                      onFocus={e =>
                        (e.currentTarget.style.borderColor = "hsl(var(--primary) / 0.5)")
                      }
                      onBlur={e =>
                        (e.currentTarget.style.borderColor = "hsl(var(--border))")
                      }
                    />
                  </div>

                  {/* ── Email ── */}
                  <div style={{ marginBottom: "16px" }}>
                    <p
                      style={{
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "hsl(var(--muted-foreground))",
                        marginBottom: "8px",
                      }}
                    >
                      Email{" "}
                      <span
                        style={{
                          fontWeight: 400,
                          textTransform: "none",
                          letterSpacing: 0,
                          color: "hsl(var(--muted-foreground) / 0.6)",
                        }}
                      >
                        (optional — we'll follow up)
                      </span>
                    </p>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        fontSize: "0.8125rem",
                        borderRadius: "8px",
                        outline: "none",
                        background: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        color: "hsl(var(--foreground))",
                        boxSizing: "border-box",
                        fontFamily: "inherit",
                        transition: "border-color 0.15s",
                      }}
                      onFocus={e =>
                        (e.currentTarget.style.borderColor = "hsl(var(--primary) / 0.5)")
                      }
                      onBlur={e =>
                        (e.currentTarget.style.borderColor = "hsl(var(--border))")
                      }
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "hsl(var(--destructive))",
                        marginBottom: "12px",
                      }}
                    >
                      {error}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "11px",
                      borderRadius: "8px",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "white",
                      background: "hsl(var(--primary))",
                      border: "none",
                      cursor: status === "loading" ? "not-allowed" : "pointer",
                      opacity: status === "loading" ? 0.7 : 1,
                      transition: "opacity 0.15s",
                      fontFamily: "inherit",
                    }}
                  >
                    {status === "loading" ? (
                      <span
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          border: "2px solid rgba(255,255,255,0.3)",
                          borderTopColor: "white",
                          animation: "spin 0.7s linear infinite",
                          display: "inline-block",
                        }}
                      />
                    ) : (
                      <>
                        <Send size={14} aria-hidden="true" />
                        Send Feedback
                      </>
                    )}
                  </button>

                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "0.6875rem",
                      color: "hsl(var(--muted-foreground) / 0.5)",
                      marginTop: "10px",
                    }}
                  >
                    We read every piece of feedback.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spinner keyframe — injected once */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );

  if (typeof document === "undefined") return null;
  return createPortal(widget, document.body);
}
