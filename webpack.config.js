var path = require('path');
var webpack = require('webpack');
var Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ['babel-polyfill', './src/app/index.js'],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, '/src/app'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'env', 'react']
        }
      },
      {
        test: /.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env'
    })
  ]
};
