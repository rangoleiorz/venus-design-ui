'use strict';
const { resolve } = require('./utils/projectHelper');
module.exports = function(modules) {
  const plugins = [
    resolve('@babel/plugin-transform-object-assign'),
    resolve('@babel/plugin-transform-object-rest-spread'),
    resolve('@babel/plugin-proposal-class-properties'),
    resolve('@babel/plugin-syntax-dynamic-import'),
  ];
  plugins.push([
    resolve('@babel/plugin-transform-runtime'),
    {
      useESModules: modules === false,
      version: '7.10.5',
    },
  ]);
  return {
    presets: [
      [
        resolve('@babel/preset-env'),
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
        resolve('@vue/babel-preset-jsx'),
      ],
    ],
    plugins,
    env: {
      test: {
        plugins: [resolve('babel-plugin-istanbul')],
      },
    },
  };
};
