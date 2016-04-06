var async = require('async');
var AccessManager = require('libs/accessManager').AccessManager;


module.exports = function(req, res, next) {

  if (typeof req.session.userId !== 'number') return next();

  var accessManager = new AccessManager();
  var userId = req.session.userId;
  req.accessManager = res.locals.accessManager = accessManager;


  async.waterfall([
    function(callback) {
      accessManager.initialize(callback);
    },
    function(callback) {
      accessManager.loadUserAccessDetails(userId, function(err) {
        if (err) {
          err = new Error(err);
        }
        return callback(err);
      });
    },
    function(callback) {
      res.locals.isUserHasPermission = function(permissionName) {
        return accessManager.isUserHasPermission(userId, permissionName);
      };

      res.locals.isUserHasOneOfPermissions = function(permissionNames) {
        return accessManager.isUserHasOneOfPermissions(userId,
          permissionNames);
      };

      res.locals.isUserHasRole = function(roleName) {
        return accessManager.isUserHasRole(userId, roleName);
      };

      res.locals.isUserAuthenticated = function() {
        return accessManager.isUserAuthenticated(userId);
      };
      callback(null);
    }
  ], function(err) {
    next(err);
  });



};
