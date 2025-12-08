/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular"]
      },
      colors: {
        dark: "#0a0a0f",
        deep: "#050510",
        primary: "#00f0ff",
        secondary: "#00ff88",
        muted: "#94a3b8",
        "accent-cyan": "#00f0ff",
        "accent-purple": "#a855f7",
        "accent-pink": "#ff00ff",
        "neon-blue": "#00f0ff",
        "neon-green": "#00ff88",
        "neon-purple": "#a855f7",
        "neon-pink": "#ff00ff",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #326ce5, #4ade80)",
        "gradient-hero": "radial-gradient(circle at top, rgba(50, 108, 229, 0.25), transparent 45%)",
      },
      boxShadow: {
        glow: "0 20px 40px rgba(50, 108, 229, 0.35), 0 0 30px rgba(74, 222, 128, 0.3)",
      },
      spacing: {
        "page-inner": "min(1400px, 100%)",
        "page-inner-wide": "min(1600px, 100%)",
      }
    }
  },
  plugins: []
};
