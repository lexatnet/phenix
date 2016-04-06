var async = require('async');
var appRoot = require('app-root-path');
var path = require('path');
var fs = require('fs-extra');
var HttpStatus = require('http-status-codes');
var reqlib = require('app-root-path').require;
var validator = require('validator');


var logger = require('libs/log')(module);
var Image = require('models/image').Image;
var controller = require('models/image').controller;
var libsUtils = require('libs/utils');


var ValidationError = require('libs/error').ValidationError;

function validation(req, callback) {
  var messages = [];

  async.waterfall([
    function(callback) {
      // required validation
      // reqiredFieldNames = ['email', 'password', 'passwordConfirmation'];
      // reqiredFieldNames.forEach(function(fieldName) {
      //   if (validator.isNull(req.body[fieldName])) {
      //     var text = req.__('{{fieldName}} is required', {
      //       fieldName: fieldName
      //     });
      //     var message = new Message({
      //       status: 'danger',
      //       text: text,
      //       tag: fieldName
      //     });
      //     messages.push(message)
      //   }
      // });
      callback(null);
    }
  ], function(err) {
    if (messages.length > 0) {
      return callback(new ValidationError(messages));
    }
    callback(null);
  });
}



function processImageUploadForm(req, res, next) {
  async.waterfall([
      function(callback) {
        validation(req, callback);
      },
      function(callback) {
        var oldPath = req.files.filefield.path;
        var newPath = path.join(appRoot, '/uploads/image/', req.files.filefield
          .name);
        newPath = libsUtils.getSafePath(newPath);
        fs.move(oldPath, newPath, function(err) {
          if (err) return callback(err);
          req.files.filefield.path = newPath;
          callback(null);
        });
      },
      function(callback) {
        var image = new Image({
          title: req.body.title,
          name: req.files.filefield.originalname,
          path: req.files.filefield.path,
          extension: req.files.filefield.extension,
          userId: req.user.id
        });

        image.save(function(err, image) {
          if (err) return callback(err);
          callback(null, image);
        });
      }
    ],
    function(err, image) {
      if (err) {
        logger.log('error', err);
        if (err instanceof ValidationError) {
          return res.status(HttpStatus.BAD_REQUEST).send(err);
        }
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
      }
      return res.sendStatus(200);
    });
}

module.exports = processImageUploadForm;
