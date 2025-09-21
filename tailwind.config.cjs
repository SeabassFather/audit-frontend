/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: { primary:'#1e88e5', accent:'#8bc34a', sun:'#ffe082', steel:'#e3e7ee' },
      borderRadius: { '2xl':'1rem' }
    }
  },
  plugins: []
};