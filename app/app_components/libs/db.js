var pg = require('pg');
var util = require('util');
var config = require('config');
var logger = require('libs/log')(module);
var EventEmitter = require('events').EventEmitter;
var async = require('async');

pg.defaults.host = config.get('db.host');
pg.defaults.port = config.get('db.port');
pg.defaults.database = config.get('db.database');
pg.defaults.user = config.get('db.user');
pg.defaults.password = config.get('db.password');
pg.defaults.poolSize = config.get('db.poolSize');


function Query(query, params) {
  var own = this;
  EventEmitter.call(own);

  async.waterfall([
    function(callback) {
      var pool = pg.connect(function(err, client, done) {
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
      var q = client.query(query, params || []);
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

util.inherits(Query, EventEmitter);

module.exports.query = function(query, params) {
  return new Query(query, params);
};

function NotUniqueError() {
  /*INHERITANCE*/
  Error.call(this); //super constructor
  Error.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object

  //Set the name for the ERROR
  //this.name = this.constructor.name; //set our function’s name as error name.
}

// inherit from Error
util.inherits(NotUniqueError, Error);
NotUniqueError.prototype.name = 'NotUniqueError';


exports.NotUniqueError = NotUniqueError;

function ResultFieldNotFindError() {
  /*INHERITANCE*/
  Error.call(this); //super constructor
  Error.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object

  //Set the name for the ERROR
  //this.name = this.constructor.name; //set our function’s name as error name.
}

// inherit from Error
util.inherits(ResultFieldNotFindError, Error);
ResultFieldNotFindError.prototype.name = 'ResultFieldNotFindError';


exports.ResultFieldNotFindError = ResultFieldNotFindError;
