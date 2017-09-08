var path = require('path');
var webpack = require('webpack');
var Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/app/index.js',
  output: {
    path: __dirname,
    filename: 'dist/bundle.js',
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env'
    })
  ],
};
