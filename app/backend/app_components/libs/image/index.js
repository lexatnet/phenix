var async = require('async');
var sharp = require('sharp');
var appRoot = require('app-root-path');
var reqlib = require('app-root-path').require;
var fs = require('fs-extra');
var path = require('path');

var logger = require('libs/log')(module);
var controller = require('models/image').controller;
var style = require('./style');

function ImageStyleManager(options) {
  Object.assign(this, options);
  return this;
}

ImageStyleManager.prototype.createImageSytleFile = function(image, styleName,
  callback) {
  var own = this;
  var fileName = own.getStylePath(image, styleName);
  async.waterfall([
      function(callback) {
        sharp.open(image.path, callback);
      },
      function(image, callback) {
        style(image, styleName, callback);
      },
      function(image, callback) {
        image.toBuffer('jpg', callback);
      },
      function(buffer, callback) {
        fs.outputFile(fileName, buffer, callback);
      }
    ],
    function(err) {
      if (err) return callback(err);
      callback(null, fileName);
    });
};

ImageStyleManager.prototype.getStyleRoot = function(image, styleName, baseName) {
  return path.join(appRoot.toString(), '/tmp/image/style/');
};


ImageStyleManager.prototype.getStylePath = function(image, styleName, baseName) {
  var own = this;
  var styleRoot = own.getStyleRoot();
  if (styleName && baseName) {
    return path.join(styleRoot, styleName, baseName);
  } else {
    return path.join(styleRoot, styleName, image.getBaseName());
  }
};

ImageStyleManager.prototype.getStyleFile = function(options, callback) {
  var own = this;
  if (options.styleName && options.baseName) {
    return own.getStylePath(null, options.styleName, options.baseName);
  }

  async.waterfall([
    function(callback) {
      // if(options.imageId){
      controller.findById(options.imageId, callback);
      // }else {
      //   callback( new Error(''))
      // }

    },
    function(image, callback) {
      fileName = own.getStylePath(image, options.styleName);
      if (!fs.existsSync(fileName)) {
        own.createImageSytleFile(image, options.styleName, callback);
      } else {
        callback(null, fileName);
      }
    }
  ], callback);
};

exports.loadImageStyle = function(req, res, next) {
  var imageStyleManager = new ImageStyleManager();

  async.waterfall(
    [
      function(callback) {
        imageStyleManager.getStyleFile({
          imageId: req.params.imageId,
          styleName: req.params.styleName,
          baseName: req.params.baseName
        }, callback);
      },
      function(fileName, callback) {
        res.sendFile(fileName, function(err) {
          if (err) {
            return callback(err);
          } else {
            // logger.log('info', 'Sent:', fileName);
            callback();
          }
        });
      }
    ],
    function(err) {
      if (err) {
        logger.log('error', err);
        return next(err);
      }
    }
  );
};
