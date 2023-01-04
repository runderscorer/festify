const path = require('path');
const webpack = require('webpack');
var Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ['@babel/polyfill', './src/app/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
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
