const { heroui } = require('@malberee/heroui-native/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/@malberee/heroui-native/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [heroui()],
}
