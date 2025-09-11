/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3faff',
          100: '#e6f3ff',
          200: '#cfe8ff',
          300: '#a9d6ff',
          400: '#7bbdff',
          500: '#4ca4ff',
          600: '#1e8cff',
          700: '#0b74e6',
          800: '#075cb4',
          900: '#064a8f'
        }
      }
    }
  },
  plugins: [],
};