var async = require('async');

var logger = require('libs/log')(module);
var userController = require('models/user').controller;
var roleController = require('models/role').controller;

function createContextLoader(options) {
  options = (options) ? options : {};

  return function(req, res, next) {

    var userId = req.params.userId;
    var localeId = req.localeId;

    async.waterfall(
      [
        function(callback) {
          userController.findById(userId, callback);
        },
        function(user, callback) {
          res.loadContext({
            namespace: options.namespace,
            name: 'user',
            value: user
          }, function(err) {
            callback(err, user);
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
