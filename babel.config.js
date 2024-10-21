module.exports = function (api) {
  api.cache(true)
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          root: ['./src/'],
          alias: {
            '@app/*': './app',
            '@pages/*': './pages',
            '@widgets/*': './widgets',
            '@features/*': './features',
            '@entities/*': './entities',
            '@shared/*': './shared',
          },
        },
      ],
    ],
  }
}
