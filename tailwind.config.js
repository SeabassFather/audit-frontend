module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        dnaBlue: "#2563eb",
        dnaGreen: "#16a34a",
        dnaYellow: "#eab308",
        dnaSilver: "#e5e7eb"
      },
      boxShadow:{ card:"0 8px 24px rgba(0,0,0,.08)" }
    }
  },
  plugins: []
};