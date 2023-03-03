/* eslint-disable @typescript-eslint/no-var-requires */

const plugin= require('tailwindcss/plugin')
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  corePlugins:{
    container:false
  },

  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d'
      }
    }
  },
  plugins: [
   plugin(function({addComponents, theme}){
    addComponents({
      '.container':{
        maxWidth:theme('columns.7xl'),
        marginLeft:'auto',
        marginRight:'auto',
        paddingLeft:'1rem',
        paddingRight:'1rem'
      }
    })
   }),
   require('@tailwindcss/line-clamp'),
  ]
}
