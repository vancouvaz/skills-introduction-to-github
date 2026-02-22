import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design system tokens
        bg: {
          DEFAULT: "#0A0A0B",
          surface: "#111113",
          elevated: "#1A1A1E",
          border: "#252529",
        },
        ice: {
          DEFAULT: "#A8D8EA",
          dim: "#6BB8D4",
          bright: "#C8EAFA",
        },
        amber: {
          chair: "#FFB347",
          dim: "#E89030",
        },
        neutral: {
          50: "#F9F9FA",
          100: "#F2F2F4",
          200: "#E4E4E8",
          300: "#C8C8D0",
          400: "#9898A8",
          500: "#68687A",
          600: "#48485A",
          700: "#32323E",
          800: "#1E1E26",
          900: "#111118",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"Segoe UI"',
          "system-ui",
          "sans-serif",
        ],
        mono: ['"SF Mono"', '"Fira Code"', "monospace"],
      },
      fontSize: {
        // Typographic scale
        "display-xl": ["clamp(3rem,6vw,5rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem,4.5vw,3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem,3vw,2.5rem)", { lineHeight: "1.12", letterSpacing: "-0.02em" }],
        "heading": ["clamp(1.25rem,2vw,1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.015em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7" }],
        "body": ["1rem", { lineHeight: "1.65" }],
        "body-sm": ["0.875rem", { lineHeight: "1.6" }],
        "caption": ["0.75rem", { lineHeight: "1.5", letterSpacing: "0.04em" }],
      },
      spacing: {
        section: "7rem",
        "section-sm": "4rem",
      },
      maxWidth: {
        content: "1120px",
        prose: "680px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "ice-glow": "radial-gradient(ellipse at 50% 0%, rgba(168,216,234,0.15) 0%, transparent 70%)",
        "amber-glow": "radial-gradient(ellipse at 50% 100%, rgba(255,179,71,0.1) 0%, transparent 60%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
