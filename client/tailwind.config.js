/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#070b14',
          card: '#0d1527',
          cardHover: '#131f38',
          border: 'rgba(56, 189, 248, 0.15)',
          borderGlow: 'rgba(56, 189, 248, 0.4)',
          primary: '#06b6d4',
          emerald: '#10b981',
          amber: '#f59e0b',
          crimson: '#ef4444',
          indigo: '#6366f1',
          violet: '#8b5cf6',
          neon: '#22d3ee'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'radar-sweep': 'radarSweep 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #070b14 0%, #0d1527 50%, #0a1122 100%)',
        'radial-glow': 'radial-gradient(circle at 50% 30%, rgba(6, 182, 212, 0.15) 0%, rgba(13, 21, 39, 0) 70%)',
        'emerald-glow': 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
        'crimson-glow': 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.18) 0%, transparent 70%)',
      }
    },
  },
  plugins: [],
}
