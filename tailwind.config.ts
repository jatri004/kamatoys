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
        // Primary brand accent — refined feminine rose (all blush-* classes).
        blush: {
          50: "#fdf3f8",
          100: "#fbe6f0",
          200: "#f7cce0",
          300: "#f0a8c9",
          400: "#e87daa",
          500: "#db5793",
          600: "#c43b78",
          700: "#a32d61",
          800: "#82264e",
          900: "#5f1d39",
        },
        // "wine" alias — repurposed to an elegant deep plum / mauve-aubergine
        // for the dramatic dark sections (feminine-luxe, not burgundy).
        wine: {
          50: "#f8f2f7",
          100: "#f0e2ee",
          200: "#ddc3d9",
          300: "#c39bbd",
          400: "#a06f98",
          500: "#7d4c74",
          600: "#633a5c",
          700: "#4f2e49",
          800: "#3a2438",
          900: "#2c1a2b",
          950: "#1f121e",
        },
        // Metallic accent — repurposed to soft rose gold / champagne (feminine).
        gold: {
          50: "#fdf5f2",
          100: "#f9e8e1",
          200: "#f1d0c4",
          300: "#e6b3a4",
          400: "#d99e95",
          500: "#c98b88",
          600: "#b76e79",
          700: "#9c5663",
          800: "#7c4450",
          900: "#5e3540",
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
