var postgrator = require('postgrator');
var config = require('config');
var logger = require('libs/log')(module);

function initialize_db(cb) {

  postgrator.setConfig({
    migrationDirectory: __dirname,
    driver: 'pg', // or pg.js, mysql, mssql, tedious
    host: config.get('db.host'),
    port: config.get('db.port'),
    database: config.get('db.database'),
    username: config.get('db.user'),
    password: config.get('db.password')
  });

  postgrator.migrate('001', function(err, migrations) {
    if (err) {
      logger.log('error', err);
      cb(err);
    } else {
      logger.log(migrations);
    }
    postgrator.endConnection(function() {
      // connection is closed, unless you are using SQL Server
      cb(null);
    });
  });
}

module.exports.initialize_db = initialize_db;
