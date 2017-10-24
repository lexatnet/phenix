'use strict';
var webpack = require('webpack');
var appRoot = require('app-root-path');
var config = require(appRoot + '/webpack.config');
var express = require('express');
var proxy = require('express-http-proxy');
var url = require('url');

var app = express();
var port = 3000;

var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
}));
app.use(require('webpack-hot-middleware')(compiler));

app.use('/img', express.static('img'));
app.use('/font', express.static('font'));
app.use('/meta', express.static('meta'));

app.use('/api', proxy('backend:6000', {
  forwardPath: function (req, res) {
    console.log('call API');
    let path = req.originalUrl;
    return path;
  },
}));

app.use('/app', proxy('backend:6000', {
  forwardPath: function (req, res) {
    console.log('call Socket.io');
    console.log('req.url', req.url);

    // let path = req.originalUrl;
    let path = url.parse(req.url).path;

    return path;
  },
}));

app.get('/*', function (req, res) {
  console.log('call application');
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
