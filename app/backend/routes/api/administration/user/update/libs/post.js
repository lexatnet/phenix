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
        'id',
        'login',
        'email',
        'roles',
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
      var text = null;
      var message = null;
      if (!validator.isNull(req.body.password)) {
        if (validator.isNull(req.body.passwordConfirmation)) {
          text = req.__('{{fieldName}} is required', {
            fieldName: 'passwordConfirmation'
          });
          message = new Message({
            status: 'danger',
            text: text,
            tag: fieldName
          });
          messages.push(message);
        } else {
          // confirmation validation
          if (req.body.password !== req.body.passwordConfirmation) {
            text = req.__('Password confirmation doesn`t match');
            message = new Message({
              status: 'danger',
              text: text,
              tag: 'passwordConfirmation'
            });
            messages.push(message);
          }
        }
      }
      callback(null);
    },
    function(callback) {
      //email validation
      if (!validator.isEmail(req.body.email)) {
        var text = req.__('Email is invalid');
        var message = new Message({
          status: 'danger',
          text: text,
          tag: 'email'
        });
        messages.push(message);
      }
      callback(null);
    },
    function(callback) {
      //login uniquie validation
      controller.findByLogin(req.body.login, function(err, user) {
        if (err) return callback(err);
        if (user) {
          if (user.id !== parseInt(req.body.id)) {
            var text = req.__('User already exist');
            var message = new Message({
              status: 'danger',
              text: text,
              tag: 'login'
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

function processUserUpdateForm(req, res, next) {

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
        user.login = req.body.login.trim();
        user.email = req.body.email.trim();

        if (!validator.isNull(req.body.password)) {
          user.password = req.body.password;
        }

        user.save(function(err, user) {
          callback(err, user);
        });
      } else {
        var err = new Error('Cant find user');
        logger.log('error', err, {
          userId: userId
        });
        callback(err);
      }
    },
    function(user, callback) {

      var roles = req.body.roles;

      var roleIds = [];

      roles.forEach(function(roleId) {
        if (typeof roleId === 'string') {
          roleIds.push(parseInt(roleId));
        } else if (typeof roleId === 'number') {
          roleIds.push(roleId);
        }
      });

      req.accessManager.setUserRoles(user.id, roleIds, callback);

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

module.exports = processUserUpdateForm;
