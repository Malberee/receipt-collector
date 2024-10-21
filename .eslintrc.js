module.exports = {
  plugins: ['prettier'],
  extends: [
    '@feature-sliced/eslint-config/rules/public-api',
    '@feature-sliced/eslint-config/rules/layers-slices',
    'universe',
    'prettier',
  ],
  rules: {
    'no-console': 'warn',
    'import/order': 'off',
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        quoteProps: 'as-needed',
        bracketSpacing: true,
        trailingComma: 'all',
        arrowParens: 'always',
        endOfLine: 'auto',
        importOrderSeparation: true,
        importOrderSortSpecifiers: true,
        importOrder: [
          '<THIRD_PARTY_MODULES>',
          '^@app/(.*)$',
          '^@pages/(.*)$',
          '^@widgets/(.*)$',
          '^@features/(.*)$',
          '^@entities/(.*)$',
          '^@shared/(.*)$',
          '^[./]',
        ],
        tailwindFunctions: ['tv'],
        plugins: [
          '@trivago/prettier-plugin-sort-imports',
          'prettier-plugin-tailwindcss',
        ],
      },
    ],
  },
  env: {
    node: true,
  },
}
