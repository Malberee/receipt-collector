const { merloui } = require('merlo-ui/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/merlo-ui/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [merloui()],
}
