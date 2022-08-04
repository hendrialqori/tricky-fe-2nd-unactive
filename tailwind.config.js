/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors : {
        Light : "#F5F5F5",
        Dark : "#1E1E1E" 
      },
      fontFamily : {
        "openSans" : "Open Sans, sans-serif"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode : "class"
}
