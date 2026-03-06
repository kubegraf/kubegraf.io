import { useState, useEffect } from "react";
import { Link } from "wouter";

const STORAGE_KEY = "cookie_notice_dismissed";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="complementary"
      aria-label="Cookie notice"
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-border px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-sm shadow-lg"
    >
      <p className="flex-1 text-muted-foreground">
        This site uses one functional cookie (<code className="text-xs bg-muted px-1 py-0.5 rounded">sidebar_state</code>) to remember your sidebar preference. No tracking or advertising.{" "}
        <Link href="/privacy" className="text-primary hover:text-primary/80 underline underline-offset-2">
          Learn more
        </Link>
      </p>
      <button
        onClick={dismiss}
        className="shrink-0 rounded-md bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Got it
      </button>
    </div>
  );
}
