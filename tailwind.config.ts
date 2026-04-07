import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Forma AI brand palette
        brand: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d7fe",
          300: "#a5bdfb",
          400: "#8098f7",
          500: "#6172f1",
          600: "#4a50e5",
          700: "#3d3ec9",
          800: "#3335a2",
          900: "#2f3181",
          950: "#1c1d4b",
        },
        accent: {
          50: "#fff8ec",
          100: "#ffefd3",
          200: "#ffdba5",
          300: "#ffc16d",
          400: "#ff9d32",
          500: "#ff7f0a",
          600: "#f06200",
          700: "#c74802",
          800: "#9e390b",
          900: "#7f300c",
          950: "#451604",
        },
        surface: {
          DEFAULT: "#0f0f1a",
          card: "#16162a",
          border: "#2a2a4a",
          muted: "#1e1e38",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient":
          "linear-gradient(135deg, #0f0f1a 0%, #1c1d4b 50%, #0f0f1a 100%)",
        "card-gradient":
          "linear-gradient(135deg, rgba(97, 114, 241, 0.1) 0%, rgba(97, 114, 241, 0.05) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: "#e2e8f0",
            a: { color: "#8098f7" },
            h1: { color: "#f1f5f9" },
            h2: { color: "#f1f5f9" },
            h3: { color: "#f1f5f9" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
