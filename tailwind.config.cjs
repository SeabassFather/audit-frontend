/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        dnaSilver: "#F4F6F8",
        ocean: {
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1"
        }
      },
      boxShadow: {
        card: "0 2px 8px 0 rgb(0 0 0 / 0.06)"
      }
    },
  },
  plugins: [],
};