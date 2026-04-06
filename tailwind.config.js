/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50:  '#eef9ff',
          100: '#d8f1ff',
          200: '#b0e5ff',
          300: '#79d3ff',
          400: '#3ab8fb',
          500: '#0e9de8',
          600: '#0278c6',
          700: '#035fa0',
          800: '#075184',
          900: '#0c446d',
          950: '#082b48',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        cyan: {
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        rose: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
        amber: {
          400: '#fbbf24',
          500: '#f59e0b',
        },
        success: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        danger: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
        dark: {
          50:  '#f8fafc',
          100: '#f1f5f9',
          600: '#4b5563',
          700: '#374151',
          800: '#1a2235',
          850: '#131929',
          900: '#0d1424',
          950: '#080e1a',
          1000: '#040810',
        },
      },
      backgroundImage: {
        'gradient-radial':  'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'glass-gradient':   'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
        'glow-primary':     'radial-gradient(circle at center, rgba(14,157,232,0.15) 0%, transparent 70%)',
        'glow-violet':      'radial-gradient(circle at center, rgba(139,92,246,0.15) 0%, transparent 70%)',
        'glow-cyan':        'radial-gradient(circle at center, rgba(34,211,238,0.15) 0%, transparent 70%)',
        'glow-emerald':     'radial-gradient(circle at center, rgba(52,211,153,0.15) 0%, transparent 70%)',
        'glow-rose':        'radial-gradient(circle at center, rgba(251,113,133,0.15) 0%, transparent 70%)',
        'mesh-dark':        'radial-gradient(at 40% 20%, hsla(228,100%,10%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(257,100%,8%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(210,100%,6%,1) 0px, transparent 50%)',
      },
      boxShadow: {
        'glow-sm':      '0 0 12px rgba(14,157,232,0.25)',
        'glow-md':      '0 0 24px rgba(14,157,232,0.3)',
        'glow-lg':      '0 0 48px rgba(14,157,232,0.2)',
        'glow-violet':  '0 0 24px rgba(139,92,246,0.3)',
        'glow-cyan':    '0 0 24px rgba(34,211,238,0.3)',
        'glow-emerald': '0 0 24px rgba(52,211,153,0.25)',
        'glow-rose':    '0 0 24px rgba(251,113,133,0.25)',
        'glass':        '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
        'card':         '0 4px 24px rgba(0,0,0,0.2)',
        'card-hover':   '0 8px 40px rgba(0,0,0,0.35)',
      },
      opacity: {
        8: '0.08',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in':       'fadeIn 0.4s ease-out',
        'fade-up':       'fadeUp 0.5s ease-out',
        'slide-up':      'slideUp 0.4s ease-out',
        'slide-in':      'slideIn 0.3s ease-out',
        'slide-right':   'slideRight 0.3s ease-out',
        'scale-in':      'scaleIn 0.3s ease-out',
        'glow-pulse':    'glowPulse 3s ease-in-out infinite',
        'float':         'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'spin-slow':     'spin 8s linear infinite',
        'beam':          'beam 4s ease-in-out infinite',
        'shimmer':       'shimmer 1.8s linear infinite',
        'count-up':      'fadeUp 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5' },
          '50%':      { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        beam: {
          '0%':   { transform: 'translateX(-100%) skewX(-15deg)', opacity: '0' },
          '25%':  { opacity: '1' },
          '75%':  { opacity: '1' },
          '100%': { transform: 'translateX(200%) skewX(-15deg)', opacity: '0' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
};
