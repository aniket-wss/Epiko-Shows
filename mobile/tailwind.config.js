/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#e74c3c',
          dark: '#c0392b',
          light: '#e67e73'
        },
        background: {
          DEFAULT: '#1a1a2e',
          light: '#16213e',
          card: '#0f3460'
        },
        text: {
          primary: '#ffffff',
          secondary: '#a8a8a8',
          muted: '#6c757d'
        },
        accent: {
          gold: '#ffd700',
          silver: '#c0c0c0',
          success: '#28a745',
          warning: '#ffc107',
          danger: '#dc3545'
        }
      },
      fontFamily: {
        regular: ['System'],
        medium: ['System'],
        bold: ['System'],
        semibold: ['System']
      }
    },
  },
  plugins: [],
}
