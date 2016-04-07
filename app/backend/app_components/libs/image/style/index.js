var async = require('async');
var lwip = require('lwip');

var logger = require('libs/log')(module);

var styleNames = [
  'thumbnail'
];

module.exports = function(image, styleName, callback) {
  if (styleNames.indexOf(styleName) != -1) {
    var style = require('./' + styleName);
    style(image, callback);
  } else {
    var err = new Error('No such image style');
    callback(err);
  }
};
