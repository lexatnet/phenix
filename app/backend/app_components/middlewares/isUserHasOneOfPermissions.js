var HttpError = require('libs/error').HttpError;
var HttpStatus = require('http-status-codes');


function createIsUserHasOneOfPermissionsFilter(permissionNames) {

  const func = async function(ctx, next) {

    if (typeof ctx.request.session.userId !== 'number') {
      throw new HttpError(HttpStatus.FORBIDDEN);
    }

    var userId = ctx.request.session.userId;

    if (!ctx.request.accessManager.isUserHasOneOfPermissions(userId, permissionNames)) {
      throw new HttpError(HttpStatus.FORBIDDEN);
    }

    await next();

    return;
  };

  return func;
}

module.exports = createIsUserHasOneOfPermissionsFilter;
