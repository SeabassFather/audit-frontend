/** @type {import(''tailwindcss'').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dnaBlue: "#2563eb",
        dnaGreen: "#16a34a",
      }
    }
  },
  plugins: []
};