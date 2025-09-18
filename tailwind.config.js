/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        auditdna: {
          bg: '#F7FAFF',
          steel: '#E5E7EB',
          ink: '#0F172A',
          primary: '#2563EB',
          accent: '#84CC16',
          glow: '#FDE047'
        }
      },
      boxShadow: {
        glass: '0 10px 30px rgba(2,6,23,.08)'
      },
      borderRadius: { '3xl': '1.5rem' }
    }
  },
  plugins: [],
}