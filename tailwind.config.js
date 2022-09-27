/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./client/**/*.{html,jsx}'],
  theme: {
    extend: {
      colors: {
        vsblack: '#1e1e1e',
        vsgreen: '#4EC9B0',
        vslightblue: '#67cdfe',
        vsbrightyellow: '#ffd710',
        vslightyellow: '#dcdc8b',
        vslightblack: '#252526',
        vsdarkgrey: '#333333',
        vsdarkblue: '#569CD6',
        vsbrightgreen: '#4EC9B0',
        vsgrey: '#CCCCCC',
        vspink: '#C586C0',
      },
    },
    fontFamily: { sans: ['Droid Sans Mono', 'monospace'] },
  },
  plugins: [],
}
