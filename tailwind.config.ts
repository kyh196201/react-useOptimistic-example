import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        appear: {
          "0%": { transform: "scale(0)", transformOrigin: "center center" },
          "100%": { transform: "scale(1)", transformOrigin: "center center" },
        },
      },
      animation: {
        appear: "appear 0.3s cubic-bezier(.31,1.76,.72,.76) 1",
      },
    },
  },
  plugins: [],
} satisfies Config;
