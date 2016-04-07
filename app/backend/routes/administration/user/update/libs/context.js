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
        },
        function(user, callback) {
          roleController.list(localeId, function(err, roles) {
            callback(err, user, roles);
          });
        },
        function(user, roles, callback) {
          roleController.findByUserId(userId, localeId, function(err,
            userRoles) {
            callback(err, user, roles, userRoles);
          });
        },
        function(user, roles, userRoles, callback) {
          var userRolesIds = [];
          userRoles.forEach(function(userRole) {
            userRolesIds.push(userRole.id);
          });
          roles.forEach(function(role) {
            if (userRolesIds.indexOf(role.id) > -1) {
              role.selected = true;
            }
          });
          callback(null, user, roles, userRoles);
        },
        function(user, roles, userRoles, callback) {
          res.loadContext({
            namespace: options.namespace,
            name: 'roles',
            value: roles
          }, callback);
        }
      ],
      function(err) {
        return next(err);
      }
    );
  };
}

exports.createContextLoader = createContextLoader;
