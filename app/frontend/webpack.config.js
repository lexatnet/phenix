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
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            plugins: [require('babel-plugin-transform-object-rest-spread')]
          }
        },
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader:'css-loader',
              options: {
                sourceMap: true
              }
            }, {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => [

                  //selectors isolation
                  require('postcss-modules'),
                  require('postcss-bem-linter'),

                  // local reset
                  require('postcss-autoreset'),
                  require('postcss-cssnext'),

                  //container expressions
                  require('cq-prolyfill/postcss-plugin'),
                ],
                sourceMap: true
              }
            }, {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        }),
      }
    ],
  },

  resolve: {
    modules: [
      path.resolve('./app_components/'),
      'node_modules'
    ],
  },

  // watchOptions: {
  //   poll: true,
  // },
};
