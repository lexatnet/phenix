var async = require('async');

var logger = require('libs/log')(module);
var roleController = require('models/role').controller;
var permissionController = require('models/permission').controller;

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
            callback(err);
          });
        },
        function(callback) {
          permissionController.list(localeId, function(err,
            permissions) {
            callback(err, permissions);
          });
        },
        function(permissions, callback) {
          permissionController.findByRoleId(roleId, localeId, function(err,
            rolePermissions) {
            callback(err, permissions, rolePermissions);
          });
        },
        function(permissions, rolePermissions, callback) {
          var rolePermissionsIds = [];
          rolePermissions.forEach(function(rolePermission) {
            rolePermissionsIds.push(rolePermission.id);
          });
          permissions.forEach(function(permission) {
            if (rolePermissionsIds.indexOf(permission.id) > -1) {
              permission.selected = true;
            }
          });
          callback(null, permissions, rolePermissions);
        },
        function(permissions, rolePermissions, callback) {
          res.loadContext({
            namespace: options.namespace,
            name: 'permissions',
            value: permissions
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
