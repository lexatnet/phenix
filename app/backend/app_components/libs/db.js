const {Pool:PGPool} = require('pg');
const PGQuery = require('pg').Query;
const config = require('config');
const logger = require('libs/log')(module);
const EventEmitter = require('events').EventEmitter;
const async = require('async');

const pgPool = new PGPool({
  host: config.get('db.host'),
  port: config.get('db.port'),
  database: config.get('db.database'),
  user: config.get('db.user'),
  password: config.get('db.password'),
  poolSize: config.get('db.poolSize')
});


class Query extends EventEmitter {

  constructor(query, params) {
    super();
    const own = this;

    async.waterfall([
      function(callback) {
        const pool = pgPool.connect(function(err, client, done) {
          if (err) {
            err = new Error(err);
          }
          if (err) {
            done(err);
            callback(err);
            return;
          }
          callback(null, client, done);
        });
      },
      function(client, done, callback) {
        const q = new PGQuery(query, params || []);
        const result = client.query(q);
        q.on('error', function(err) {
          logger.log('error', err);
          own.emit('error', err);
        });
        q.on('row', function(row, result) {
          own.emit('row', row, result);
        });
        q.on('end', function(result) {
          done();
          own.emit('end', result);
        });
      }
    ], function(err, result) {
      if (err) {
        own.emit('error', err);
        return;
      }
    });

    return own;
  }
}

module.exports.query = function(query, params) {
  return new Query(query, params);
};

class NotUniqueError extends Error {
  constructor() {
    super(this); //super constructor
    super.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object    
    //Set the name for the ERROR
    //this.name = this.constructor.name; //set our function’s name as error name.  } 
  }
}

exports.NotUniqueError = NotUniqueError;

class ResultFieldNotFindError extends Error {
  constructor() {
    /*INHERITANCE*/
    super(this); //super constructor
    super.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object
    //Set the name for the ERROR
    //this.name = this.constructor.name; //set our function’s name as error name.
  }

}

exports.ResultFieldNotFindError = ResultFieldNotFindError;
