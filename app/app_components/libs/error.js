var util = require('util');
var http = require('http');


function HttpError(status, message) {
  /*INHERITANCE*/
  Error.call(this, arguments); //super constructor
  Error.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object

  //Set the name for the ERROR
  //this.name = this.constructor.name; //set our function’s name as error name.

  this.status = status;
  this.message = message || http.STATUS_CODES[status] || "Error";
}

// inherit from Error
util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';


exports.HttpError = HttpError;

function ValidationError(messages) {
  /*INHERITANCE*/
  Error.call(this); //super constructor
  Error.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object

  //Set the name for the ERROR
  //this.name = this.constructor.name; //set our function’s name as error name.

  this.messages = messages;
}

// inherit from Error
util.inherits(ValidationError, Error);
ValidationError.prototype.name = 'ValidationError';

exports.ValidationError = ValidationError;


function AuthenticationError() {
  /*INHERITANCE*/
  Error.call(this); //super constructor
  Error.captureStackTrace(this, this.constructor); //super helper method to include stack trace in error object

  //Set the name for the ERROR
  //this.name = this.constructor.name; //set our function’s name as error name.
}

// inherit from Error
util.inherits(AuthenticationError, Error);
AuthenticationError.prototype.name = 'AuthenticationError';

exports.AuthenticationError = AuthenticationError;
