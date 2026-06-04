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
        // Primary brand accent — wine / burgundy (repointed from the old pink
        // "blush" so all existing blush-* classes now render in the brand wine).
        blush: {
          50: "#fcf3f5",
          100: "#f8e3e9",
          200: "#eec2ce",
          300: "#dd91a8",
          400: "#c9637f",
          500: "#9b2847",
          600: "#7e1f39",
          700: "#661a30",
          800: "#531528",
          900: "#420f1f",
        },
        // Explicit wine alias (burgundy) for backgrounds & brand surfaces.
        wine: {
          50: "#fcf3f5",
          100: "#f8e3e9",
          200: "#eec2ce",
          300: "#dd91a8",
          400: "#c9637f",
          500: "#9b2847",
          600: "#7e1f39",
          700: "#661a30",
          800: "#531528",
          900: "#420f1f",
          950: "#2c0a15",
        },
        // Metallic gold accent (from the logo).
        gold: {
          50: "#fbf6e7",
          100: "#f6ebc4",
          200: "#eedd96",
          300: "#e3c965",
          400: "#d4af37",
          500: "#c2a14a",
          600: "#a07f33",
          700: "#7d6226",
          800: "#5f4a1d",
          900: "#473814",
        },
        lilac: {
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
        },
        pride: "#FF6B6B",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      animation: {
        "slide-in": "slideIn 0.3s ease-out",
        marquee: "marquee 20s linear infinite",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
