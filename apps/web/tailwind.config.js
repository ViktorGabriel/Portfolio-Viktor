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
        gh: {
          canvas: '#0d1117',
          subtle: '#161b22',
          muted: '#21262d',
          border: '#30363d',
          text: '#e6edf3',
          textMuted: '#8b949e',
          accent: '#2f81f7',
          success: '#238636',
          danger: '#da3633',
          header: '#010409'
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'SF Mono', 'Menlo', 'Consolas', 'Liberation Mono', 'monospace'],
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Noto Sans', 'Helvetica', 'Arial', 'sans-serif']
      }
    },
  },
  plugins: [],
}
