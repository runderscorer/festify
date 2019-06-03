const path = require('path');
const webpack = require('webpack');
var Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ['babel-polyfill', './src/app/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'src'),
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
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          { loader: 'image-webpack-loader' }
        ]
      }
    ]
  },
  plugins: [
    new Dotenv({
      path: './.env.deployment'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'REACT_APP_CLIENT_ID': JSON.stringify(process.env.REACT_APP_CLIENT_ID),
        'REACT_APP_CLIENT_SECRET': JSON.stringify(process.env.REACT_APP_CLIENT_SECRET),
        'REACT_APP_REDIRECT_URI': JSON.stringify(process.env.REACT_APP_REDIRECT_URI)
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
};
