/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Core dark palette
        void:     '#050505',
        charcoal: '#0a0a0f',
        surface:  '#0d1117',
        panel:    '#111827',
        border:   '#1f2937',
        // Neon accents
        cyan:    { DEFAULT: '#00FFFF', dim: '#00c8c8', glow: '#00ffff33' },
        magenta: { DEFAULT: '#FF00FF', dim: '#cc00cc', glow: '#ff00ff33' },
        gold:    { DEFAULT: '#FFD700', dim: '#ccac00', glow: '#ffd70033' },
        // Text scale
        ink:  { hi: '#f9fafb', mid: '#9ca3af', lo: '#4b5563' }
      },
      fontFamily: {
        display: ['"Space Mono"', '"Courier New"', 'monospace'],
        body:    ['Inter', 'sans-serif'],
        mono:    ['"Space Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan':    '0 0 30px -4px rgba(0,255,255,0.4)',
        'glow-magenta': '0 0 30px -4px rgba(255,0,255,0.4)',
        'glow-gold':    '0 0 30px -4px rgba(255,215,0,0.4)',
        'panel':        '0 8px 32px rgba(0,0,0,0.8)',
        'inset-glow':   'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      backgroundImage: {
        'grad-cyan-magenta': 'linear-gradient(135deg, #00FFFF, #FF00FF)',
        'grad-cyan-gold':    'linear-gradient(135deg, #00FFFF, #FFD700)',
        'grad-tri':          'linear-gradient(135deg, #00FFFF 0%, #FF00FF 50%, #FFD700 100%)',
      },
      animation: {
        'pulse-slow':  'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow':   'spin 8s linear infinite',
        'float':       'float 6s ease-in-out infinite',
        'scan':        'scan 4s linear infinite',
        'flicker':     'flicker 0.15s infinite',
        'glow-pulse':  'glow-pulse 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.85' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px -4px rgba(0,255,255,0.4)' },
          '50%':      { boxShadow: '0 0 40px -2px rgba(0,255,255,0.7)' },
        }
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
};