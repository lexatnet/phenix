var util = require('util');
var async = require('async');
var HttpStatus = require('http-status-codes');
var validator = require('validator');



var logger = require('libs/log')(module);
var controller = require('models/locale').controller;
var Message = require('libs/message').Message;
var ValidationError = require('libs/error').ValidationError;

function validate(req, callback) {
  var messages = [];

  async.waterfall([
    function(callback) {
      // required validation
      reqiredFieldNames = ['locale'];
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

function processSetLocaleForm(req, res, next) {

  async.waterfall([
    function(callback) {
      validate(req, callback);
    },
    function(callback) {
      req.session.localeId = parseInt(req.body.locale);
      callback(null);
    },
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

module.exports = processSetLocaleForm;
