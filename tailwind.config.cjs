/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { 
        // Main branch colors
        primary:'#1e88e5', 
        accent:'#8bc34a', 
        sun:'#ffe082', 
        steel:'#e3e7ee',
        // Audit-frontend branch colors merged for compatibility
        silver: {
          DEFAULT: "#c9d1d9",
          100: "#eff2f4",
          200: "#e2e6ea",
          300: "#cfd6dd",
          400: "#b7c3ce"
        },
        ocean:  { DEFAULT: "#2b6cb0", 600: "#2269c7", 700: "#1b57a4" },
        lemon:  { DEFAULT: "#ffd95e" },
        spring: { DEFAULT: "#38b96f" }
      },
      borderRadius: { 
        '2xl':'1rem',
        xl2: "1.25rem" // Keep both radius definitions for compatibility
      },
      boxShadow: { 
        soft: "0 10px 25px rgba(0,0,0,.08)",
        card: "0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24)" // Add card shadow for .card class
      }
    }
  },
  plugins: []
};