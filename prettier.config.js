module.exports = {
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  trailingComma: 'all',
  arrowParens: 'always',
  endOfLine: 'auto',
  importOrderSeparation: true,
  importOrderSortSpecifiers: false,
  importOrder: [
    'react-native-get-random-values',
    '<THIRD_PARTY_MODULES>',
    '^@screens|@components|@icons|@hooks|@utils|@constants|@providers',
    '^[./]',
  ],
  tailwindFunctions: ['tv'],
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
}
