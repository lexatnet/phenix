var async = require('async');
var lwip = require('lwip');

var logger = require('libs/log')(module);

module.exports = function(image, callback) {
  var width = 100;
  var height = 100;
  var inter = 'lanczos';
  image.cover(width, height, inter, callback);
  // image.contain(width, height, [0, 0, 0, 100], inter, callback);

}
