var async = require('async');
var reqlib = require('app-root-path').require;

var logger = require('libs/log')(module);
var userController = require('models/user').controller;
var roleController = require('models/role').controller;

var defaultUserRoleNames = [
  'registered'
];

function createContextLoader(options) {
  options = (options) ? options : {};

  return function(req, res, next) {

    var userId = req.params.userId;
    var localeId = req.localeId;

    async.waterfall(
      [
        function(callback) {
          roleController.list(localeId, function(err, roles) {
            callback(err, roles);
          });
        },
        function(roles, callback) {

          roles.forEach(function(role) {
            if (defaultUserRoleNames.indexOf(role.name) > -1) {
              role.selected = true;
            }
          });
          callback(null, roles);
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

exports.createContextLoader = createContextLoader;
