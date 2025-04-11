/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6200EA', // Purple
          50: '#F4EAFE',
          100: '#E8D5FD',
          200: '#D1ABFC',
          300: '#BA81FB',
          400: '#A357FA',
          500: '#8C2DF9',
          600: '#7520FA',
          700: '#6200EA',
          800: '#5000C2',
          900: '#3E009A',
        },
        secondary: {
          DEFAULT: '#03DAC6', // Teal
          50: '#E6FDFB',
          100: '#CCFBF6',
          200: '#99F7EE',
          300: '#66F3E5',
          400: '#33EFDD',
          500: '#03DAC6',
          600: '#02B8A7',
          700: '#029688',
          800: '#017469',
          900: '#01524A',
        },
        dark: {
          DEFAULT: '#121212',
          50: '#2C2C2C',
          100: '#262626',
          200: '#1F1F1F',
          300: '#181818',
          400: '#141414',
          500: '#121212',
          600: '#0E0E0E',
          700: '#0A0A0A',
          800: '#060606',
          900: '#020202',
        },
        light: '#FFFFFF',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'sans-serif'],
      },
      animation: {
        'waveform': 'waveform 1.2s infinite ease-in-out',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        waveform: {
          '0%, 100%': { height: '20%' },
          '50%': { height: '100%' },
        },
      },
    },
  },
  plugins: [],
} 