/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        silver: {
          100: "#f4f6f8",
          200: "#e3e8ee",
          300: "#cdd5de",
          400: "#b7c2ce",
          500: "#a1aebe",
        },
        dna: {
          blue: "#3b82f6",
          green: "#4ade80",
          yellow: "#facc15",
          metallic: "#dbeafe",
        },
      },
      boxShadow: {
        dna: "0 4px 20px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};
