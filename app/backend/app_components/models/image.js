var util = require('util');
var async = require('async');
var path = require('path');

var queryManager = require('libs/queryManager').queryManager;
var NotUniqueError = require('libs/db').NotUniqueError;
var ResultFieldNotFindError = require('libs/db').ResultFieldNotFindError;
var logger = require('libs/log')(module);

function Image(options) {
  Object.assign(this, options);
  return this;
}

Image.prototype._insert = function(callback) {
  var own = this;
  var id = null;
  var query = queryManager.query('imageInsert', [
    own.title, own.name, own.path, own.extension, own.userId
  ]);
  query.on('error', function(err) {
    callback(err);
  });
  query.on('row', function(row, result) {
    if (!row.id) return callback(new ResultFieldNotFindError());
    if (id === null) id = parseInt(row.id);
  });
  query.on('end', function(result) {
    if (id) {
      own.id = id;
    }
    callback(null);
  });
};

Image.prototype._update = function(callback) {
  var own = this;
  var now = Math.floor(Date.now() / 1000);
  var data = null;
  var query = queryManager.query('imageUpdate', [
    own.title,
    own.name,
    own.path,
    own.extension,
    own.userId,
    now,
    own.id
  ]);
  query.on('error', function(err) {
    callback(err);
  });

  query.on('row', function(row, result) {
    if (data === null) {
      data = row;
    }
  });

  query.on('end', function(result) {
    callback(null);
  });
};


Image.prototype.save = function(cb) {
  var own = this;
  async.waterfall([
    function(callback) {
      if (own.id) {
        own._update(callback);
      } else {
        own._insert(callback);
      }
    }
  ], function(err) {
    cb(err, own);
  });
};

Image.prototype.getBaseName = function() {
  var own = this;
  return path.basename(own.path);
};

function Controller(options) {

}

Controller.prototype.createImageFromRowData = function(rowData) {
  var own = this;
  return new Image({
    id: parseInt(rowData.id),
    title: rowData.title,
    name: rowData.name,
    path: rowData.path,
    extension: rowData.extension,
    userId: parseInt(rowData.user_id),
    created: rowData.created,
    updated: rowData.updated
  });
};

Controller.prototype.findById = function(id, cb) {
  var own = this;
  var selectQuery = queryManager.query('imageById', [id]);
  var image = null;

  selectQuery.on('error', function(err) {
    cb(err);
  });

  selectQuery.on('row', function(row, result) {
    if (!image) {
      image = own.createImageFromRowData(row);
    }
  });

  selectQuery.on('end', function(result) {
    if (result.rowCount > 1) {
      cb(new NotUniqueError());
    }
    cb(null, image);
  });
};

Controller.prototype.list = function(cb) {
  var own = this;
  var selectQuery = queryManager.query('imageList');
  var images = [];

  selectQuery.on('error', function(err) {
    cb(err);
  });

  selectQuery.on('row', function(row, result) {
    var image = own.createImageFromRowData(row);
    images.push(image);
  });

  selectQuery.on('end', function(result) {
    cb(null, images);
  });
};


module.exports.Image = Image;
module.exports.controller = new Controller();
