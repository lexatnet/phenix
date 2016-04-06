var async = require('async');
var validator = require('validator');
var HttpStatus = require('http-status-codes');

var Message = require('libs/message').Message;
var User = require('models/user').User;
var controller = require('models/user').controller;
var logger = require('libs/log')(module);

var ValidationError = require('libs/error').ValidationError;

var mailTransport = require('libs/mail').transport;

var swig = require('swig');

function validation(req, callback) {
  var messages = [];

  async.waterfall([
    function(callback) {
      // required validation
      reqiredFieldNames = ['email', 'password', 'passwordConfirmation'];
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
      // confirmation validation
      if (req.body.password !== req.body.passwordConfirmation) {
        var text = req.__('Password confirmation doesn`t match');
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
      // uniquie validation
      controller.findByLogin(req.body.email, function(err, user) {
        if (err) return callback(err);
        if (user) {
          var text = req.__('User already exist');
          var message = new Message({
            status: 'danger',
            text: text,
            tag: 'email'
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

function processRegistrationForm(req, res, next) {
  async.waterfall([
      function(callback) {
        validation(req, callback);
      },
      function(callback) {
        var user = new User({
          login: req.body.email,
          password: req.body.password,
          email: req.body.email
        });
        user.save(function(err, user) {
          if (err) return callback(err);
          callback(null, user);
        });
      },
      function(user, callback) {
        var mailBodyTemplate = swig.compileFile(
          'templates/mail/registration.swig');
        var mailBody = mailBodyTemplate({
          user: user
        });
        var mailOptions = {
          from: 'stream-at.net <robot@stream-at.net>', // sender address
          to: 'lex.at.net@gmail.com', // list of receivers
          subject: 'Registration Success', // Subject line
          text: mailBody, // plaintext body
          // html: '<b>Hello world</b>' // html body
        };

        mailTransport.sendMail(mailOptions, function(error, info) {
          if (error) {
            error = new Error(error);
            logger.log('error', error);
            return callback(error);
          }
          return callback(null, user);
        });
      }
    ],
    function(err, user) {
      if (err) {
        if (err instanceof ValidationError) {
          return res.status(HttpStatus.BAD_REQUEST).send(err);
        }
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
      }
      req.session.user = user.id;
      return res.sendStatus(200);
    });
}

module.exports = processRegistrationForm;
