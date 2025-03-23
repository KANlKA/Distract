/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#6B7280',
        accent: '#F3F4F6',
        background: '#FFFFFF',
        foreground: '#111827',
        'primary-foreground': '#FFFFFF',
        'secondary-foreground': '#374151',
        'accent-foreground': '#111827',
        input: '#E5E7EB',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(79, 70, 229, 0.3)',
      },
    },
  },
  plugins: [],
};