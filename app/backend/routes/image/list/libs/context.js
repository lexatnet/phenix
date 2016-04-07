var async = require('async');

var logger = require('libs/log')(module);
var controller = require('models/image').controller;

function createImageListContextLoader(options) {
  options = (options) ? options : {};
  return function(req, res, next) {
    async.waterfall(
      [
        function(callback) {
          controller.list(callback);
        },
        function(images, callback) {
          res.loadContext({
            namespace: options.namespace,
            name: 'images',
            value: images
          }, callback);
        }
      ],
      function(err) {
        if (err) return next(err);
        next();
      }
    );
  };
}

exports.createContextLoader = createImageListContextLoader;
