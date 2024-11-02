module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  extends: [
    '@feature-sliced/eslint-config/rules/public-api',
    '@feature-sliced/eslint-config/rules/layers-slices',
    'universe',
    'universe/shared/typescript-analysis',
    'prettier',
  ],
  rules: {
    'no-console': 'error',
    'import/order': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
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
          'react-native-get-random-values',
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
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.d.ts'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  env: {
    node: true,
  },
}
