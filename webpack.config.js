var path = require('path');
var webpack = require('webpack');
var Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ['babel-polyfill', './src/app/index.js'],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  devServer: {
    contentBase: path.join(__dirname, './src/app/assets/'),
    filename: 'bundle.js',
    publicPath: '/assets/',
    proxy: {
      '^/callback': {
        target: 'http://localhost:9000/callback',
        secure: false
      },
      '^/refresh': {
        target: 'http://localhost:9000/refresh',
        secure: false
      },
      '^/log-out': {
        target: 'http://localhost:9000/log-out',
        secure: false
      }
    },
    compress: true,
    watchContentBase: true
},
  module: {
    rules: [
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
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
              disable: true
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env'
    }),
    new webpack.HotModuleReplacementPlugin({
      multiStep: true
    })
  ]
};
