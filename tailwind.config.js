/** @type {import('tailwindcss').Config} */

export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#0d0d0d",
          925: "#131313",
          900: "#191919",
          850: "#1f1f1f",
          800: "#262626",
          750: "#333333",
          700: "#404040",
          600: "#595959",
          500: "#737373",
        },
        line: "#424242",
        modal: "#242424",
      },
      screens: {
        xs: "576px",
        sm: "768px",
        md: "992px",
        lg: "1200px",
        xl: "1408px",
        // sm: { min: "640px", max: "767px" },
        // md: { min: "768px", max: "1023px" },
        // lg: { min: "1024px", max: "1279px" },
        // xl: { min: "1280px", max: "1535px" },
        // "2xl": { min: "1536px" },
      },
    },
  },
  plugins: [],
};
