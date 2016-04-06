var async = require('async');

var logger = require('libs/log')(module);
var controller = require('models/role').controller;

function createRoleListContextLoader(options) {

  options = (options) ? options : {};
  return function(req, res, next) {
    async.waterfall(
      [
        function(callback) {
          controller.list(req.localeId, callback);
        },
        function(roles, callback) {
          res.loadContext({
            namespace: options.namespace,
            name: 'roles',
            value: roles
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
exports.createContextLoader = createRoleListContextLoader;
