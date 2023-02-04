/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {},
    colors: {
      white: '#fff',

      gray: {
        900: '#121214',
        800: '#202024',
        300: '#c4c4cc',
        100: '#e1e1e6'
      },

      green: {
        500: '#00875f',
        300: '#00b37e'
      }
    },
    fontSize: {
      md: '1.125rem',
      lg: '1.25rem',
      xl: '1.5rem',
      '2xl': '2rem'
    }
  },
  plugins: []
}
