var async = require('async');

var logger = require('libs/log')(module);
var roleController = require('models/role').controller;

function createContextLoader(options) {
  options = (options) ? options : {};

  return function(req, res, next) {

    var roleId = req.params.roleId;
    var localeId = req.localeId;

    async.waterfall(
      [
        function(callback) {
          roleController.findById(roleId, localeId, callback);
        },
        function(role, callback) {
          res.loadContext({
            namespace: options.namespace,
            name: 'role',
            value: role
          }, function(err) {
            callback(err, role);
          });
        }
      ],
      function(err) {
        return next(err);
      }
    );
  };
}

exports.createContextLoader = createContextLoader;
