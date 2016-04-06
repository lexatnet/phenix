var async = require('async');
var logger = require('libs/log')(module);

async.waterfall([
    function(callback) {
      require('./clear_db.js').clear_db(callback);
    },
    function(callback) {
      require('./clear_files.js').clear_files(callback);
    }
  ],
  function(err) {
    if (err) {
      logger.log('error', err);
    }
    logger.log('info', 'ok');
  }
);
