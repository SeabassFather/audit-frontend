module.exports = {
  content: ["./index.html","./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f2fbf6', 100:'#e6f7ee', 200:'#c9efd9', 300:'#a5e4c0', 400:'#6ed79b', 500:'#3bc978',
          600:'#2cab63', 700:'#248a50', 800:'#1d6d40', 900:'#145030'
        }
      },
      boxShadow: {
        // custom soft shadow used by .card
        'soft': '0 10px 30px rgba(0, 0, 0, 0.06)'
      }
    }
  },
  plugins: []
};