var path = require('path');
var webpack = require('webpack');
var Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ['@babel/polyfill', './src/app/index.js'],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  devServer: {
    static: path.join(__dirname, './src/app/assets/'),
    proxy: {
      '/api': {
        target: 'http://localhost:9000'
      }
    },
    compress: true,
    devMiddleware: {
      publicPath: '/assets/'
    }
  },
  module: {
    rules: [
      {
        test: /.jsx?$/,
        include: path.join(__dirname, '/src/app'),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
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
        type: 'asset/resource'
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
