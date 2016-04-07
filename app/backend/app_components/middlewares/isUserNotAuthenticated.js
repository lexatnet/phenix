var HttpError = require('libs/error').HttpError;
var HttpStatus = require('http-status-codes');


function createUserNotAuthenticatedFilter() {

  return function(req, res, next) {

    if (typeof req.session.userId !== 'number') {
      return next(new HttpError(HttpStatus.FORBIDDEN));
    }

    var userId = req.session.userId;

    if (!req.accessManager.isUserAuthenticated(userId)) {
      return next();
    }

    return next(new HttpError(HttpStatus.FORBIDDEN));
  };
}

module.exports = createUserNotAuthenticatedFilter();
