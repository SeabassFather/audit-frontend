/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e88e5",
        accent: "#8bc34a",
        sun: "#ffe082",
        steel: "#e3e7ee",
        ocean: {
          DEFAULT: "#2b6cb0",
          500: "#3182ce",
          600: "#2269c7",
          700: "#1b57a4",
        },
        silver: {
          DEFAULT: "#c9d1d9",
          100: "#eff2f4",
          200: "#e3e7ee",
          300: "#c9d1d9",
          400: "#bdbdbd"
        },
        dnaBlue: "#1e88e5",
        dnaGreen: "#8bc34a",
      },
      boxShadow: {
        soft: "0 2px 8px 0 rgba(30,136,229,0.08)",
      },
      borderRadius: {
        xl2: "1.2rem",
      }
    },
  },
  plugins: [],
};