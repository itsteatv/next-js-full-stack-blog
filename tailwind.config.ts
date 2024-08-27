import type { Config } from "tailwindcss";

const config: Config = ({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        fclamp: "clamp(0.5rem, 0.38636363636363635rem + 1.1363636363636365vw, 1.75rem)",
        sclamp: "clamp(1.25rem, -1.25rem + 5.208333333333333vw, 5rem)",
        tclamp: "clamp(0.5rem, -0.07692307692307687rem + 6.41025641025641vw, 3rem)",
        foclamp: "clamp(0.5rem, 0.38461538461538464rem + 1.282051282051282vw, 1rem)",
        ficlamp: "clamp(1rem, 0.5625rem + 3.8889vw, 1.875rem)",
        siclamp: "clamp(0.75rem, 0.625rem + 1.1111vw, 1rem)",
      },
      fontFamily: {
        "FiraSans": ["Fira Sans", "sans-serif"],
        "Archivo": ["Archivo", "sans-serif"],
      },
      screens: {
        "1140>=": { "min": "9.375em", "max": "71.25em" },
        "1180>=": { "min": "60em", "max": "73.75em" },
        "930>=": { "min": "48em", "max": "58.125em" },
        "768<=": { "max": "48em" },
        "450>=": { "min": "9.375em", "max": "28.125em" },
        "540<=": { "min": "9.375em", "max": "33.75em" },
      }
    },
  },
  plugins: []
});
export default config;