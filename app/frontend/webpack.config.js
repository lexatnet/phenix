var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-hot-middleware/client',
        './index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
				new ExtractTextPlugin("styles.css")
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel-loader'],
            exclude: /node_modules/
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract("style-loader", ['css-loader', 'postcss-loader', 'sass-loader?sourceMap'])
        },{
            test: /\.json$/,
            loaders: ['json-loader']
        }
			]
    },
    postcss: function() {
        return [
            //selectors isolation
            require('postcss-modules'),
            require('postcss-bem-linter'),
            // local reset
            require('postcss-autoreset'),
            require('postcss-cssnext'),
            //container expressions
            require('cq-prolyfill/postcss-plugin')
        ];
    }
}
