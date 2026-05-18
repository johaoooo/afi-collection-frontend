/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        afi: {
          green: '#008753',
          'green-dark': '#005c38',
          yellow: '#FCD116',
          red: '#E8112D',
          'dark-bg': '#1e2433',
          'dark-card': '#2a3346',
          'dark-border': '#3a4558',
          cream: '#f5f0e8',
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
