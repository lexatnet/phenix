var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var appRoot = require('app-root-path');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    appRoot + '/app',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('styles.css'),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style-loader',
          [
            'css-loader',
            'postcss-loader',
            'sass-loader?sourceMap',
          ]
        ),
      },
      {
        test: /\.json$/,
        loaders: ['json-loader'],
      },
    ],
  },
  postcss: function () {
    return [

      //selectors isolation
      require('postcss-modules'),
      require('postcss-bem-linter'),

      // local reset
      require('postcss-autoreset'),
      require('postcss-cssnext'),

      //container expressions
      require('cq-prolyfill/postcss-plugin'),
    ];
  },

  resolve: {
    root: [
      path.resolve('./app_components/'),
    ],
  },

  // watchOptions: {
  //   poll: true,
  // },
};
