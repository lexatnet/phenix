var HttpError = require('libs/error').HttpError;
var HttpStatus = require('http-status-codes');


function createIsUserHasOneOfPermissionsFilter(permissionNames) {

  return function(req, res, next) {

    if (typeof req.session.userId !== 'number') {
      return next(new HttpError(HttpStatus.FORBIDDEN));
    }

    var userId = req.session.userId;

    if (!req.accessManager.isUserHasOneOfPermissions(userId, permissionNames)) {
      return next(new HttpError(HttpStatus.FORBIDDEN));
    }

    return next();
  };
}

module.exports = createIsUserHasOneOfPermissionsFilter;
