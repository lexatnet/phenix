var async = require('async');
var util = require('util');
var validator = require('validator');
var HttpStatus = require('http-status-codes');

var logger = require('libs/log')(module);
var Role = require('models/role').Role;
var controller = require('models/role').controller;
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

function processRoleDeleteForm(req, res, next) {
  var localeId = req.localeId;

  async.waterfall([
    function(callback) {
      validation(req, callback);
    },
    function(callback) {
      controller.findById(req.body.id, localeId, function(err, role) {
        callback(err, role);
      });
    },
    function(role, callback) {
      if (role) {
        role.delete(function(err) {
          callback(err);
        });
      } else {
        var err = new Error('Cant find role');
        logger.log('error', err, req.body.id);
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

module.exports = processRoleDeleteForm;
