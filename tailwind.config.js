/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        silver: { DEFAULT:"#c9d1d9",100:"#eff2f4",200:"#e2e6ea",300:"#cfd6dd",400:"#b7c3ce" },
        ocean:  { DEFAULT:"#2b6cb0",600:"#2269c7",700:"#1b57a4" },
        lemon:  { DEFAULT:"#ffd95e" },
        spring: { DEFAULT:"#38b96f" }
      },
      boxShadow: { soft: "0 10px 25px rgba(0,0,0,.08)" },
      borderRadius: { xl2: "1.25rem" }
    }
  },
  plugins: [],
};