/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Poppins', 'Inter', 'Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'
        ],
      },
      colors: {
        butter: {
          DEFAULT: '#FFD600', // BreadButter yellow
          dark: '#FFC400',
        },
        bread: {
          DEFAULT: '#181818', // BreadButter black
        },
        accent: {
          DEFAULT: '#F5F5F5', // Soft gray
        },
      },
    },
  },
  plugins: [],
}

