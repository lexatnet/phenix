'use strict';
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var appRoot = require('app-root-path');
var config = require(appRoot + '/webpack.config');
var express = require('express');
var proxy = require('express-http-proxy');
var url = require('url');

var app = express();
var port = 3000;

var compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));

app.use('/img', express.static('img'));
app.use('/font', express.static('font'));
app.use('/meta', express.static('meta'));

app.use('/api', proxy('localhost:6000', {
  forwardPath: function (req, res) {
    let path = req.originalUrl;
    return path;
  },
}));

app.use('/socket.io', proxy('localhost:6000', {
  forwardPath: function (req, res) {
    let path = req.originalUrl;
    return path;
  },
}));

app.get('/', function (req, res) {
  res.sendFile(appRoot + '/index.html');
});

app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.',
      port,
      port);
  }
});
