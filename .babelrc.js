module.exports = {
    presets: [
      '@babel/preset-typescript',
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      // below plugins are required for typorm decorator support
      'babel-plugin-transform-typescript-metadata',
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      [
        'module-resolver',
        {
          // aliases for local directories
          alias: {
            utils: './src/utils',
            api: './src/api',
            entity: './src/entity',
            services: './src/services',
          },
          extensions: ['.js', '.ts'],
        },
      ],
    ],
  };
  