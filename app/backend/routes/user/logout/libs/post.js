var async = require('async');
var HttpStatus = require('http-status-codes');

function processLogoutForm(req, res, next) {

  async.waterfall([
    function(callback) {
      req.session.destroy(callback);
    },
  ], function(err) {
    if (err) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(
        err);
    }
    return res.sendStatus(200);
  });
}

module.exports = processLogoutForm;
