var async = require('async');
var AccessManager = require('libs/accessManager').AccessManager;


module.exports = async function(ctx, next) {

  if (typeof ctx.request.session.userId !== 'number') return next();

  var accessManager = new AccessManager();
  var userId = ctx.request.session.userId;
  ctx.request.accessManager = ctx.request.locals.accessManager = accessManager;


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
      ctx.request.locals.isUserHasPermission = function(permissionName) {
        return accessManager.isUserHasPermission(userId, permissionName);
      };

      ctx.request.locals.isUserHasOneOfPermissions = function(permissionNames) {
        return accessManager.isUserHasOneOfPermissions(userId,
          permissionNames);
      };

      ctx.request.locals.isUserHasRole = function(roleName) {
        return accessManager.isUserHasRole(userId, roleName);
      };

      ctx.request.locals.isUserAuthenticated = function() {
        return accessManager.isUserAuthenticated(userId);
      };
      callback(null);
    }
  ], function(err) {
    next(err);
  });

};
