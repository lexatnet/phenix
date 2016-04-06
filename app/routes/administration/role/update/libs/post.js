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
        'id',
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
      //name uniquie validation
      controller.findIdByName(req.body.name.trim(), function(err, roleId) {
        if (err) return callback(err);
        if (roleId) {
          if (roleId !== parseInt(req.body.id)) {
            var text = req.__('Role already exist');
            var message = new Message({
              status: 'danger',
              text: text,
              tag: 'name'
            });
            messages.push(message);
          }
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

function processRoleUpdateForm(req, res, next) {

  var localeId = req.localeId;
  var roleId = parseInt(req.body.id);

  async.waterfall([
    function(callback) {
      validation(req, callback);
    },
    function(callback) {
      controller.findById(roleId, localeId, function(err, role) {
        callback(err, role);
      });
    },
    function(role, callback) {
      if (role) {
        role.name = req.body.name.trim();
        role.title = req.body.title.trim();
        role.localeId = localeId;

        role.save(function(err, role) {
          callback(err, role);
        });
      } else {
        var err = new Error('Cant find role');
        logger.log('error', err, roleId);
        callback(err);
      }
    },
    function(role, callback) {

      var permissions = req.body.permissions;
      var permissionIds = [];

      permissions.forEach(function(permissionId) {
        if (typeof permissionId === 'string') {
          permissionIds.push(parseInt(permissionId));
        } else if (typeof permissionId === 'number') {
          permissionIds.push(permissionId);
        }
      });

      req.accessManager.setRolePermissions(roleId, permissionIds,
        callback);
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

module.exports = processRoleUpdateForm;
