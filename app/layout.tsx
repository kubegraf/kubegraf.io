import type { ReactNode } from "react";
import "./globals.css";
import { JetBrains_Mono, Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains"
});

export const metadata = {
  title: "KubeGraf — AI-Native Kubernetes Platform",
  description:
    "A futuristic control plane that runs locally to visualize, debug, and scale Kubernetes clusters with AI-powered insights."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen bg-background text-white">
        {children}
      </body>
    </html>
  );
}
