'use strict';

module.exports = function(modules) {
  const plugins = [
    require.resolve('@babel/plugin-transform-object-assign'),
  ];
  plugins.push([
    require.resolve('@babel/plugin-transform-runtime'),
    {
      helpers: false,
    },
  ]);
  return {
    presets: [
      [
        require.resolve('@babel/preset-env'),
        {
          modules,
          targets: {
            browsers: [
              'last 2 versions',
              'Firefox ESR',
              '> 1%',
              'ie >= 11',
            ],
          },
        },
      ],
      [
        require.resolve('@vue/babel-preset-jsx')
      ]
    ],
    plugins,
    env: {
      test: {
        plugins: [require.resolve('babel-plugin-istanbul')],
      },
    },
  };
};
