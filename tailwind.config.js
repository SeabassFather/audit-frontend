/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"]
, theme: {
    extend: {
      colors: {
        // Silver/Blue base + light yellow & green accents
        silver: { DEFAULT: "#c9d1d9", 50:"#f7f8f9",100:"#eff2f4",200:"#e2e6ea",300:"#cfd6dd",400:"#b7c3ce",500:"#9fb0be",600:"#869bad",700:"#6f8698",800:"#5b6f7f",900:"#4a5a67" },
        ocean: { DEFAULT: "#2b6cb0", 50:"#f0f7ff",100:"#dbeefe",200:"#bfe0fd",300:"#93c8fb",400:"#5da5f7",500:"#2b82ee",600:"#2269c7",700:"#1b57a4",800:"#174a89",900:"#133e72" },
        lemon: { DEFAULT: "#ffd95e" },
        spring: { DEFAULT: "#38b96f" }
      },
      boxShadow: { soft: "0 10px 25px rgba(0,0,0,.08)" },
      borderRadius: { xl2: "1.25rem" }
    }
  },
  plugins: [],
}