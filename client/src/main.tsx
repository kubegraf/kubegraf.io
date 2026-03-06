import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Self-hosted fonts — avoids sending user IPs to Google Fonts CDN (GDPR)
import "@fontsource-variable/outfit";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";

createRoot(document.getElementById("root")!).render(<App />);
