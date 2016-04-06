var HttpError = require('libs/error').HttpError;
var HttpStatus = require('http-status-codes');


function createUserHasPermissionFilter(permissionName) {

  return function(req, res, next) {

    if (typeof req.session.userId !== 'number') {
      return next(new HttpError(HttpStatus.FORBIDDEN));
    }

    var userId = req.session.userId;

    if (!req.accessManager.isUserHasPermission(userId, permissionName)) {
      return next(new HttpError(HttpStatus.FORBIDDEN));
    }

    return next();
  };
}

module.exports = createUserHasPermissionFilter;
