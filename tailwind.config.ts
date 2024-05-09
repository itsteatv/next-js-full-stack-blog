import type { Config } from "tailwindcss";

const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "FiraSans": ["Fira Sans", "sans-serif"],
        "Archivo": ["Archivo", "sans-serif"],
      },
      screens: {
        "1140>=": { "min": "9.375em", "max": "71.25em" },
      }
    },
  },
  plugins: []
});
export default config;
