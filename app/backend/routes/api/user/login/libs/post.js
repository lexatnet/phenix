var validator = require('validator');
var HttpStatus = require('http-status-codes');
var async = require('async');
var util = require('util');

var logger = require('libs/log')(module);
var User = require('models/user').User;
var controller = require('models/user').controller;
var Message = require('libs/message').Message;
var ValidationError = require('libs/error').ValidationError;
var AuthenticationError = require('libs/error').AuthenticationError;

function validate(req, callback) {
  var messages = [];

  async.waterfall([
    function(callback) {
      // required validation
      reqiredFieldNames = ['login', 'password'];
      reqiredFieldNames.forEach(function(fieldName) {
        if (validator.isNull(req.body[fieldName])) {
          var text = req.__('{{fieldName}} is required', {
            fieldName: fieldName
          });
          var message = new Message({
            status: 'danger',
            text: text,
            tag: fieldName
          });
          messages.push(message);
        }
      });
      callback(null);
    },
  ], function(err) {
    if (messages.length > 0) {
      return callback(new ValidationError(messages));
    }
    callback(null);
  });
}

function processLoginForm(req, res, next) {
  async.waterfall([
    function(callback) {
      validate(req, callback);
    },
    function(callback) {
      controller.findByLogin(req.body.login, function(err, user) {
        callback(null, user);
      });
    },
    function(user, callback) {
      if (user) {
        user.checkPassword(req.body.password, function(err, success) {
          if (success) {
            callback(null, user);
          } else {
            callback(new AuthenticationError());
          }
        });
      } else {
        callback(new AuthenticationError());
      }
    }
  ], function(err, user) {
    if (err) {
      if (err instanceof ValidationError) {
        return res.status(HttpStatus.BAD_REQUEST).send(err);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
    req.session.userId = user.id;
    return res.sendStatus(200);
  });
}

module.exports = processLoginForm;
