const Postgrator = require('postgrator')
var config = require('config');
var logger = require('libs/log')(module);

function initialize_db(cb) {

  const postgrator = new Postgrator({
    migrationDirectory: __dirname + '/steps',
    driver: 'pg', // or pg.js, mysql, mssql, tedious
    host: config.get('db.host'),
    port: config.get('db.port'),
    database: config.get('db.database'),
    username: config.get('db.user'),
    password: config.get('db.password')
  });

  postgrator
    .migrate('001')
    .then(migrations => logger.log(migrations))
    .catch(err => logger.log('error', err));
}

module.exports.initialize_db = initialize_db;
