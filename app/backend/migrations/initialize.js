var async = require('async');
var logger = require('libs/log')(module);

async.waterfall([
    function(callback) {
      require('./initialize_db.js').initialize_db(callback);
    },
    function(callback) {
      require('./initialize_entities.js').initialize_entities(callback);
    }
  ],
  function(err) {
    if (err) {
      logger.log('error', err);
      process.exit(1);
    }
    logger.log('info', 'ok');
    process.exit(0);
  }
);
