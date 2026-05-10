import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      sans: ["Inter", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          50:  "rgba(0,255,136,0.05)",
          100: "rgba(0,255,136,0.10)",
          200: "rgba(0,255,136,0.20)",
          300: "#4fffb0",
          400: "#00ff99",
          500: "#00ff88",
          600: "#00cc6a",
          700: "#009950",
          800: "#006635",
          900: "rgba(0,255,136,0.08)",
        },
        violet: {
          50:  "rgba(139,92,246,0.05)",
          100: "rgba(139,92,246,0.10)",
          200: "rgba(139,92,246,0.20)",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "rgba(139,92,246,0.08)",
        },
        dark: {
          bg:     "#080808",
          card:   "#0d0d12",
          border: "#1a1a26",
          text:   "#e2e8f0",
        },
      },
      animation: {
        "glow-border":  "glowBorder 3s ease-in-out infinite",
        "orb-breathe":  "orbBreathe 7s ease-in-out infinite",
        "pulse-dot":    "pulseDot 2s ease-in-out infinite",
        "float":        "float 5s ease-in-out infinite",
        "cursor-blink": "cursorBlink 1s step-end infinite",
        "draw-line":    "drawLine 1.2s cubic-bezier(0.22,1,0.36,1) forwards",
      },
      keyframes: {
        glowBorder: {
          "0%,100%": { boxShadow: "0 0 0 1px rgba(0,255,136,0.22), 0 0 20px rgba(0,255,136,0.06)" },
          "50%":     { boxShadow: "0 0 0 1px rgba(0,255,136,0.45), 0 0 40px rgba(0,255,136,0.15)" },
        },
        orbBreathe: {
          "0%,100%": { opacity: "0.5", transform: "scale(1)" },
          "50%":     { opacity: "0.9", transform: "scale(1.12)" },
        },
        pulseDot: {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(0,255,136,0.5)" },
          "70%":     { boxShadow: "0 0 0 8px rgba(0,255,136,0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-12px)" },
        },
        cursorBlink: {
          "0%,100%": { opacity: "1" },
          "50%":     { opacity: "0" },
        },
        drawLine: {
          from: { transform: "scaleY(0)" },
          to:   { transform: "scaleY(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
