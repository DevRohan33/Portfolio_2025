import { type Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        ink: "#0B0C0E",
        surface: "#14161A",
        "surface-raised": "#1C1F24",
        hairline: "rgba(255,255,255,0.08)",
        "text-primary": "#F2F3F1",
        "text-muted": "#9BA1A6",
        "text-subtle": "#61666B",
        accent: "#C6F24E",
        paper: "#F5F4F0",
        "paper-muted": "#EDEBE5",
        "paper-text": "#0B0C0E",
      },
      fontFamily: {
        sans: ["var(--font-inter-tight)", "Inter", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      fontSize: {
        display: ["5rem", { lineHeight: "1.05", letterSpacing: "-0.04em" }],
        h1: ["3.5rem", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        h2: ["2rem", { lineHeight: "1.1", letterSpacing: "-0.02em" }],
        h3: ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        label: ["0.75rem", { lineHeight: "1", letterSpacing: "0.06em" }],
      },
      maxWidth: {
        container: "1280px",
      },
      borderRadius: {
        card: "20px",
        control: "10px",
      },
      keyframes: {
        "rise-fade": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        "rise-fade": "rise-fade 0.6s cubic-bezier(.16,1,.3,1) forwards",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
      },
      transitionTimingFunction: {
        reveal: "cubic-bezier(.16,1,.3,1)",
      },
    },
  },
  plugins: [],
} satisfies Config;
