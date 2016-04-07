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
        'name',
        'title'
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
    },
    function(callback) {
      // name uniquie validation
      controller.findIdByName(req.body.name, function(err, roleId) {
        if (err) return callback(err);
        if (roleId) {
          var text = req.__('Role with such name already exists.');
          var message = new Message({
            status: 'danger',
            text: text,
            tag: 'name'
          });
          messages.push(message);
        }
        callback(null);
      });
    }
  ], function(err) {
    if (messages.length > 0) {
      return callback(new ValidationError(messages));
    }
    callback(null);
  });
}

function processRoleCreateForm(req, res, next) {

  var localeId = req.localeId;

  async.waterfall([
      function(callback) {
        validation(req, callback);
      },
      function(callback) {
        var role = new Role({
          name: req.body.name,
          title: req.body.title,
          localeId: localeId
        });
        role.save(function(err, role) {
          if (err) return callback(err);
          callback(null, role);
        });
      },
      function(role, callback) {
        req.accessManager.setRolePermissions(roleId, req.body.permissions,
          callback);
      }
    ],
    function(err) {
      if (err) {
        if (err instanceof ValidationError) {
          return res.status(HttpStatus.BAD_REQUEST).send(err);
        }
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
      }
      return res.sendStatus(200);
    });
}

module.exports = processRoleCreateForm;
