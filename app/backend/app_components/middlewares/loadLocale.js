var async = require('async');
var localeController = require('models/locale').controller;


module.exports = function(req, res, next) {
  req.localeId = res.locals.localeId = null;

  if (!req.session.localeId) {
    async.waterfall([
      function(callback) {
        localeController.findByCode('en', function(err, locale) {
          if (err) return callback(err);

          req.localeId = res.locals.localeId = locale.id;
          req.setLocale(locale.code);
          return callback(null, locale);
        });
      }
    ], function(err) {
      next(err);
    });
  } else {
    async.waterfall([
      function(callback) {
        localeController.findById(req.session.localeId, function(err,
          locale) {
          if (err) return callback(err);

          req.localeId = res.locals.localeId = locale.id;
          req.setLocale(locale.code);
          return callback(null, locale);
        });
      }
    ], function(err) {
      next(err);
    });
  }



};
