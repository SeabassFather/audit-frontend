/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1e88e5",
        accent: "#8bc34a",
        sun: "#ffe082",
        steel: "#e3e7ee",
        ocean: {
          DEFAULT: "#2b6cb0",
          500: "#3182ce",
          600: "#2269c7",
          700: "#1b57a4",
        },
        silver: {
          DEFAULT: "#c9d1d9",
          100: "#eff2f4",
          200: "#e3e7ee",
          300: "#c9d1d9",
          400: "#bdbdbd"
        },
        // DNA-themed colors for futuristic mode
        dna: {
          blue: "#00d4ff",
          green: "#8bc34a",
          purple: "#a855f7",
          cyan: "#06b6d4",
          teal: "#14b8a6",
        },
        // Neon colors for futuristic effects
        neon: {
          blue: "#00d4ff",
          green: "#39ff14",
          purple: "#bf00ff",
          pink: "#ff1493",
          cyan: "#00ffff",
        },
        // Glass morphism colors
        glass: {
          light: "rgba(255, 255, 255, 0.1)",
          dark: "rgba(0, 0, 0, 0.1)",
          blue: "rgba(0, 212, 255, 0.1)",
          green: "rgba(139, 195, 74, 0.1)",
        }
      },
      boxShadow: {
        soft: "0 2px 8px 0 rgba(30,136,229,0.08)",
        glow: "0 0 20px rgba(0, 212, 255, 0.5)",
        "glow-green": "0 0 20px rgba(139, 195, 74, 0.5)",
        "glow-purple": "0 0 20px rgba(168, 85, 247, 0.5)",
        "glass": "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "neon": "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
      },
      borderRadius: {
        xl2: "1.2rem",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 3s ease-in-out infinite",
        "slide-up": "slideUp 0.3s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px currentColor" },
          "100%": { boxShadow: "0 0 20px currentColor, 0 0 30px currentColor" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cyber-grid": "linear-gradient(rgba(0,212,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.1) 1px, transparent 1px)",
      },
      backgroundSize: {
        "cyber-grid": "50px 50px",
      }
    },
  },
  plugins: [],
};