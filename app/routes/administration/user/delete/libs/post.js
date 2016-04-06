var async = require('async');
var util = require('util');
var validator = require('validator');
var HttpStatus = require('http-status-codes');
var reqlib = require('app-root-path').require;

var logger = require('libs/log')(module);
var User = require('models/user').User;
var controller = require('models/user').controller;
var Message = require('libs/message').Message;
var ValidationError = require('libs/error').ValidationError;

function validation(req, callback) {
  var messages = [];

  async.waterfall([
    function(callback) {
      // required validation
      reqiredFieldNames = [
        'id'
      ];
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
    }
  ], function(err) {
    if (messages.length > 0) {
      return callback(new ValidationError(messages));
    }
    callback(null);
  });
}

function processUserDeleteForm(req, res, next) {

  var userId = parseInt(req.body.id);

  async.waterfall([
    function(callback) {
      validation(req, callback);
    },
    function(callback) {
      controller.findById(userId, function(err, user) {
        callback(err, user);
      });
    },
    function(user, callback) {
      if (user) {
        user.delete(function(err) {
          callback(err);
        });
      } else {
        var err = new Error('Cant find user');
        logger.log('error', err, {
          userId: userId
        });
        callback(err);
      }
    }
  ], function(err) {
    if (err) {
      if (err instanceof ValidationError) {
        return res.status(HttpStatus.BAD_REQUEST).send(err);
      }
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
    return res.sendStatus(200);
  });
}

module.exports = processUserDeleteForm;
