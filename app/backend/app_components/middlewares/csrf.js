var async = require('async');
var uid = require('uid-safe');
var bcrypt = require('bcrypt');
var util = require('util');

var byteLength = 18;

function CSRF(options) {
  Object.assign(this, options);
  return this;
}

function csrf(req, res, next) {
  console.log('req.body->',JSON.stringify(req.body));
  async.waterfall([
    function(callback) {
      if (!req.session.csrf) {
        return uid(byteLength, callback);
      } else {
        return callback(null, req.session.csrf);
      }
    },
    function(secret, callback) {
      if (!req.body.csrf) {
        return callback(new CSRFError());
      }
      bcrypt.compare(secret, req.body.csrf, callback);
    }
  ], function(err, success) {
    if (err) return next(err);
    if (!success) return next(new CSRFError());
    next(null);
  });
}

function token(req, res, next) {
  async.waterfall([
    //get secret
    function(callback) {
      if (!req.session.csrf) {
        uid(byteLength, callback);
      } else {
        callback(null, req.session.csrf);
      }
    },
    // get salt
    function(secret, callback) {
      bcrypt.genSalt(10, function(err, salt) {
        if (err) return callback(err);
        callback(err, secret, salt);
      });
    },
    // get hash
    function(secret, salt, callback) {
      bcrypt.hash(secret, salt, function(err, hash) {
        if (err) return callback(err);
        callback(err, secret, hash);
      });
    }
  ], function(err, secret, token) {
    if (err) return next(err);
    req.session.csrf = secret;
    res.locals.csrf = token;
    next(null);
  });
}

exports.csrf = csrf;
exports.token = token;


function CSRFError() {
  /*INHERITANCE*/
  Error.call(this); //super constructor
  Error.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object

  //Set the name for the ERROR
  //this.name = this.constructor.name; //set our function’s name as error name.
}

// inherit from Error
util.inherits(CSRFError, Error);
CSRFError.prototype.name = 'CSRFError';

exports.CSRFError = CSRFError;
