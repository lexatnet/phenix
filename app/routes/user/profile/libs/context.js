var async = require('async');

var logger = require('libs/log')(module);
var controller = require('models/user').controller;

function createContextLoader(options) {
  options = (options) ? options : {};
  return function(req, res, next) {
    async.waterfall(
      [
        function(callback) {
          controller.findById(req.params.userId, callback);
        },
        function(user, callback) {
          res.loadContext({
            namespace: options.namespace,
            name: 'user',
            value: user
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

exports.createContextLoader = createContextLoader;
