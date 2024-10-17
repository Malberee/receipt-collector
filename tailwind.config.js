const { nextui } = require('@malberee/nextui-native/theme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    'node_modules/@malberee/nextui-native/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],
}
