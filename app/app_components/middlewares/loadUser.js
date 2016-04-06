var userController = require('models/user').controller;
var User = require('models/user').User;

module.exports = function(req, res, next) {
  req.user = res.locals.user = null;

  var userId = 0;

  if (typeof req.session.userId === 'number') {
    userId = req.session.userId;
  } else {
    req.session.userId = userId;
  }


  if (userId === 0) {
    var user = new User({
      id: userId
    });
    req.user = res.locals.user = user;
    return next(null, user);
  } else {
    userController.findById(userId, function(err, user) {
      if (err) return next(err);

      req.user = res.locals.user = user;
      return next(null, user);
    });
  }
};
