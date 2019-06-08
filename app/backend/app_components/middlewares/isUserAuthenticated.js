var HttpError = require('libs/error').HttpError;
var HttpStatus = require('http-status-codes');


function createUserAuthenticatedFilter() {

  const func = async (ctx, next) => {

    if (typeof ctx.request.session.userId !== 'number') {
      throw new HttpError(HttpStatus.FORBIDDEN);
    }

    var userId = ctx.request.session.userId;

    if (!ctx.request.accessManager.isUserAuthenticated(userId)) {
      throw new HttpError(HttpStatus.FORBIDDEN);
    }

    await next();
    return;
  };

  return func;
}

module.exports = createUserAuthenticatedFilter();
