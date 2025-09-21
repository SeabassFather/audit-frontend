/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // AuditDNA Color Palette: green, light yellow, blue, and silver
        'dna-green': '#16a34a',
        'dna-light-green': '#22c55e',
        'dna-yellow': '#fef08a',
        'dna-light-yellow': '#fefce8',
        'dna-blue': '#2563eb',
        'dna-light-blue': '#60a5fa',
        'dna-silver': '#94a3b8',
        'dna-light-silver': '#f1f5f9',
        // Ocean themed colors for consistency
        'ocean': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        'silver': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 8px 0 rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 16px 0 rgba(0, 0, 0, 0.12)',
        'strong': '0 8px 32px 0 rgba(0, 0, 0, 0.16)',
      },
      borderRadius: {
        'xl2': '0.875rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'dna-gradient': 'linear-gradient(135deg, #16a34a 0%, #2563eb 50%, #fef08a 100%)',
        'silver-gradient': 'linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)',
      }
    }
  },
  plugins: []
};