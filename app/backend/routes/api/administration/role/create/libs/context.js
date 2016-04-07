var async = require('async');

var logger = require('libs/log')(module);
var permissionController = require('models/permission').controller;

function createContextLoader(options) {
  options = (options) ? options : {};

  return function(req, res, next) {

    var localeId = req.localeId;

    async.waterfall(
      [
        function(callback) {
          permissionController.list(localeId, function(err,
            permissions) {
            callback(err, permissions);
          });
        },
        function(permissions, callback) {
          res.loadContext({
            namespace: options.namespace,
            name: 'permissions',
            value: permissions
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
