/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/**/*.{html,jsx}'],
  theme: {
    extend: {
      colors: {
        vsblack: '#1e1e1e',
        vsalmostblack: '#252526',
        vsgreen: '#1e4f3e',
        vslightblue: '#67cdfe',
        vsbrightyellow: '#ffd710',
        vslightyellow: '#dcdc8b',
        vslightblack: '#252526',
        vsdarkgrey: '#333333',
      },
    },
    fontFamily: { sans: ['Droid Sans Mono', 'monospace'] },
  },
  plugins: [],
}
