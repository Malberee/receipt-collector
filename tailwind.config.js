const { nextui } = require('@malberee/nextui-native/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/@malberee/nextui-native/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],
}
