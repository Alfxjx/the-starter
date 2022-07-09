/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'cola': ['cola', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'bg-paper': "url('/bg-paper.png')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
