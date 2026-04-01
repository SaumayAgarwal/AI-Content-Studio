/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['DM Sans', 'Inter', 'sans-serif'],
      display: ['Playfair Display', 'Georgia', 'serif'],
      outfit: ['Outfit', 'sans-serif'],
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'card-bg': 'var(--card-bg)',
        border: 'var(--border)',
        navy: 'var(--navy)',
        navy2: 'var(--navy2)',
        navy3: 'var(--navy3)',
        slate: 'var(--slate)',
        slateLight: 'var(--slate-light)',
        // Legacy (keep for backward compat)
        dark: '#0A0F1E',
        darkSecondary: '#111827',
        gold: '#C9973A',
        goldLight: '#E8B65A',
        goldPale: '#F5E4C0',
        neonPurple: '#8B5CF6',
        neonBlue: '#3B82F6',
        neonIndigo: '#6366F1',
      },
      animation: {
        'blob': 'blob 7s infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'orb-float': 'orbFloat 8s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'bar-grow': 'barGrow 2s ease 1s both',
        'scroll-up-1': 'scrollUp 25s linear infinite',
        'scroll-up-2': 'scrollUp 30s linear infinite',
        'scroll-up-3': 'scrollUp 20s linear infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        orbFloat: {
          '0%, 100%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-30px) scale(1.05)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(1.4)' },
        },
        barGrow: {
          'from': { width: '0' },
        },
        scrollUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-50%)' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9973A, #A07420)',
        'gold-gradient-light': 'linear-gradient(135deg, #E8B65A, #C9973A)',
      },
      borderColor: {
        DEFAULT: 'rgba(255,255,255,0.07)',
      },
      boxShadow: {
        'gold-sm': '0 8px 24px rgba(201,151,58,0.3)',
        'gold-md': '0 20px 60px rgba(201,151,58,0.25)',
        'dark-xl': '0 40px 100px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}

