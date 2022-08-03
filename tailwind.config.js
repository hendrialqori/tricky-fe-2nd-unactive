/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors : {
        Light : "#F5F5F5",
        Dark : "#313131" 
      },
      fontFamily : {
        "openSans" : "Open Sans, sans-serif"
      }
    },
  },
  plugins: [],
  darkMode : "class"
}
