const prettierConfig = require('./prettier.config.js')

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['prettier'],
  ignorePatterns: ['android/*'],
  extends: ['universe', 'universe/shared/typescript-analysis', 'prettier'],
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
    'prettier/prettier': ['error', prettierConfig],
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
