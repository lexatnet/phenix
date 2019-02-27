var path = require('path');
var webpack = require('webpack');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const postcssPresetEnv = require('postcss-preset-env');
var appRoot = require('app-root-path');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: [
      'webpack-hot-middleware/client',
      appRoot + '/app',
    ],
    vendor: appRoot + '/vendor',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-bundle.js',
    publicPath: '/static/',
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jQuery',
      'windows.jQuery': 'jquery',
      Popper: ['popper.js', 'default']
    }),
    /*new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }),*/
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-bundle.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread']
          }
        },
        exclude: /(node_modules|bower_components)/,
      },
      // Extract css files
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader:'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.scss$/,
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
                require('postcss-preset-env'),
                //postcssPresetEnv(/* pluginOptions */),

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
        ],
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
