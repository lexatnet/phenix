var async = require('async');
var reqlib = require('app-root-path').require;

var logger = require('libs/log')(module);
var controller = require('models/user').controller;

function createUserListContextLoader(options) {
  options = (options) ? options : {};
  return function(req, res, next) {
    async.waterfall(
      [
        function(callback) {
          controller.list(callback);
        },
        function(users, callback) {
          res.loadContext({
            namespace: options.namespace,
            name: 'users',
            value: users
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
exports.createContextLoader = createUserListContextLoader;
