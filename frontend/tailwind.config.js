// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        DMSans: ['DMSans', 'sans-serif'],
      },
      colors: {
        primary: 'black',
        secondary: '#7F7F7F',
        tertiary: '#01CF83',
        quaternary: '#F6F6F6',
        greenColor: '#33d89b',
        drawer: "#F5F5F5",
        drawerTexts: "#BDBDBD",
        overlay: "rgba(0,0,0,0.7)",
      }
    },
  },
  plugins: [],
}


