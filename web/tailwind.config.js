/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Modern Dark Theme with Purple Accent
        primary: {
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
          light: '#A78BFA',
        },
        background: {
          DEFAULT: '#0F0F1E',
          light: '#1A1A2E',
          card: '#16213E',
          elevated: '#1F2937',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#9CA3AF',
          muted: '#6B7280',
        },
        accent: {
          gold: '#FBBF24',
          success: '#10B981',
          danger: '#EF4444',
        },
        border: {
          DEFAULT: '#374151',
          light: '#4B5563',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-card': 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
        'gradient-purple': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(139, 92, 246, 0.3)',
        'card': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'elevated': '0 20px 60px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}
