/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Force la génération des classes critiques
  safelist: [
    'dark',
    'bg-afi-dark-bg',
    'bg-afi-dark-card',
    'dark:bg-afi-dark-bg',
    'dark:bg-afi-dark-card',
    'dark:bg-afi-dark-border',
    'dark:text-white',
    'dark:text-gray-200',
    'dark:text-gray-300',
    'dark:border-afi-dark-border',
  ],
  theme: {
    extend: {
      colors: {
        afi: {
          green: '#008753',
          'green-dark': '#005c38',
          yellow: '#FCD116',
          red: '#E8112D',
          cream: '#f5f0e8',
          'dark-bg': '#1e2433',
          'dark-card': '#2a3346',
          'dark-border': '#3a4558',
        }
      },
      fontFamily: {
        sans: ['Calibri', 'Segoe UI', 'sans-serif'],
        serif: ['Calibri', 'Segoe UI', 'sans-serif'],
        mono: ['Calibri', 'Segoe UI', 'monospace'],
      }
    },
  },
  plugins: [],
}
