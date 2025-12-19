/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAF9F6',
        foreground: '#1A1A1A',
        cream: {
          50: '#FEFDFB',
          100: '#FAF9F6',
          200: '#F5F4F0',
        },
        primary: {
          yellow: '#FFDE4D',
          'yellow-dark': '#FFD633',
          'yellow-light': '#FFF0A1',
          // Admin Portal Blue
          blue: '#4F8CFF',
          'blue-dark': '#3B7BF5',
          'blue-light': '#A8C9FF',
          // Pharmacist Portal Green
          green: '#4ADE80',
          'green-dark': '#22C55E',
          'green-light': '#86EFAC',
        },
        status: {
          danger: '#FF3D3D',
          'danger-light': '#FF6B6B',
          success: '#4ADE80',
          'success-light': '#86EFAC',
          warning: '#FBBF24',
          'warning-light': '#FCD34D',
          expired: '#F87171',
          expiring: '#FB923C',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        dark: {
          card: '#2A2D3A',
          'card-light': '#363948',
        }
      },
      borderRadius: {
        card: '16px',
        button: '12px',
        pill: '24px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 6px 16px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
}
