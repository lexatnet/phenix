var HttpError = require('libs/error').HttpError;
var HttpStatus = require('http-status-codes');


function createUserNotAuthenticatedFilter() {
  const func = async function(ctx, next) {

    if (typeof ctx.request.session.userId !== 'number') {
      throw new HttpError(HttpStatus.FORBIDDEN);
    }

    var userId = ctx.request.session.userId;

    if (!ctx.request.accessManager.isUserAuthenticated(userId)) {
      await next();
    }

    throw new HttpError(HttpStatus.FORBIDDEN);
  };

  return func;
}

module.exports = createUserNotAuthenticatedFilter();
