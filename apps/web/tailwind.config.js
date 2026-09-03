/** @type {i+]port('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#07090e',
          surface: '#0d111a',
          card: '#121824',
          cardHover: '#162030',
          border: '#1e293b',
          borderActive: '#38bdf8',
          text: '#f8fafc',
          muted: '#94a3b8',
          dim: '#64748b',
          cyan: '#00f2fe',
          cyanGlow: '#38bdf8',
          purple: '#a855f7',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e'
        }
      },
      boxShadow: {
        'glow-cyan': '0 0 30px -5px rgba(56, 189, 248, 0.25)',
        'glow-purple': '0 0 30px -5px rgba(168, 85, 247, 0.25)',
        'glow-emerald': '0 0 30px -5px rgba(16, 185, 129, 0.25)',
        'card': '0 10px 30px -10px rgba(0, 0, 0, 0.7)'
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
      },
      backgroundImage: {
        'cyber-grid': 'radial-gradient(circle at 1px 1px, rgba(56, 189, 248, 0.08) 1px, transparent 0)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
};