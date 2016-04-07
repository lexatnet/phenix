var async = require('async');
// var appRoot = require('app-root-path');

var logger = require('libs/log')(module);

function globalContextLoader(req, res, next) {
  async.waterfall(
    [
      // function(callback) {
      //   res.loadContext({
      //     name: 'appRoot',
      //     value: appRoot
      //   }, callback);
      // },
      function(callback) {
        var localeController = require('models/locale').controller;
        localeController.list(function(err, locales) {
          if (err) return callback(err);
          res.loadContext({
            name: 'locales',
            value: locales
          }, callback);
        });
      }
    ],
    function(err) {
      if (err) return next(err);
      next(null);
    }
  );
}

module.exports = globalContextLoader;
