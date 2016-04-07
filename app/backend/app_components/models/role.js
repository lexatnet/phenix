var async = require('async');
var queryManager = require('libs/queryManager').queryManager;
var NotUniqueError = require('libs/db').NotUniqueError;
var ResultFieldNotFindError = require('libs/db').ResultFieldNotFindError;
var logger = require('libs/log')(module);

function Role(options) {
  Object.assign(this, options);
  return this;
}

Role.prototype._insert = function(callback) {
  var own = this;
  var id = null;
  var query = queryManager.query('roleInsert', [
    own.name
  ]);
  query.on('error', function(err) {
    err = new Error(err);
    logger.log('error', err);
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

Role.prototype._insertInfo = function(callback) {
  var own = this;
  var query = queryManager.query('roleInfoInsert', [
    own.id,
    own.localeId,
    own.title
  ]);
  query.on('error', function(err) {
    err = new Error(err);
    logger.log('error', err);
    callback(err);
  });
  query.on('row', function(row, result) {});
  query.on('end', function(result) {
    callback(null);
  });
};

Role.prototype._update = function(callback) {
  var own = this;
  var data = null;
  var query = queryManager.query('roleUpdate', [
    own.name,
    own.id
  ]);
  query.on('error', function(err) {
    err = new Error(err);
    logger.log('error', err);
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

Role.prototype._updateInfo = function(callback) {
  var own = this;
  var data = null;
  var query = queryManager.query(
    'roleInfoUpdate', [
      own.title,
      own.id,
      own.localeId
    ]
  );
  query.on('error', function(err) {
    err = new Error(err);
    logger.log('error', err);
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

Role.prototype._checkInfoExists = function(cb) {
  var own = this;
  var isInfoExists = false;
  var query = queryManager.query('roleInfoByIdAndLocaleId', [
    own.id,
    own.localeId
  ]);

  query.on('error', function(err) {
    err = new Error(err);
    logger.log('error', err);
    cb(err);
  });

  query.on('row', function(row, result) {
    isInfoExists = true;
  });

  query.on('end', function(result) {
    if (result.rowCount > 1) {
      cb(new NotUniqueError());
    }
    cb(null, isInfoExists);
  });
};


Role.prototype.save = function(cb) {
  var own = this;
  async.waterfall([
    function(callback) {
      if (own.id) {
        own._update(callback);
      } else {
        own._insert(callback);
      }
    },
    function(callback) {
      own._checkInfoExists(callback);
    },
    function(isInfoExists, callback) {
      if (isInfoExists) {
        own._updateInfo(callback);
      } else {
        own._insertInfo(callback);
      }
    }
  ], function(err) {
    cb(err, own);
  });
};

Role.prototype.delete = function(cb) {
  var own = this;
  async.waterfall([
    function(callback) {
      var data = null;
      var query = queryManager.query('roleDeleteById', [own.id]);

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
    }
  ], function(err) {
    cb(err, own);
  });
};

function Controller(options) {}

Controller.prototype.createRoleFromRowData = function(rowData) {
  var own = this;
  return new Role({
    id: parseInt(rowData.id),
    localeId: parseInt(rowData.locale_id),
    name: rowData.name,
    title: rowData.title
  });
};

Controller.prototype.findByName = function(name, localeId, cb) {
  var own = this;
  var rowData = null;
  var query = queryManager.query('roleByNameAndLocaleId', [
    name,
    localeId
  ]);

  query.on('error', function(err) {
    err = new Error(err);
    logger.log('error', err);
    cb(err);
  });

  query.on('row', function(row, result) {
    if (!rowData) {
      rowData = row;
    }
  });

  query.on('end', function(result) {
    if (result.rowCount > 1) {
      cb(new NotUniqueError());
    }
    if (rowData) {
      var role = own.createRoleFromRowData(rowData);
      cb(null, role);
    } else {
      cb(null, null);
    }
  });
};

Controller.prototype.findIdByName = function(name, cb) {
  var own = this;
  var rowData = null;
  var query = queryManager.query('roleIdByName', [
    name
  ]);

  query.on('error', function(err) {
    err = new Error(err);
    logger.log('error', err);
    cb(err);
  });

  query.on('row', function(row, result) {
    if (!rowData) {
      rowData = row;
    }
  });

  query.on('end', function(result) {
    if (result.rowCount > 1) {
      cb(new NotUniqueError());
    }
    if (rowData) {
      cb(null, parseInt(rowData.id));
    } else {
      cb(null, null);
    }
  });
};

Controller.prototype.findById = function(id, localeId, cb) {
  var own = this;
  var query = queryManager.query('roleByIdAndLocaleId', [
    id,
    localeId
  ]);
  var rowData = null;

  query.on('error', function(err) {
    err = new Error(err);
    logger.log('error', err);
    cb(err);
  });

  query.on('row', function(row, result) {
    if (!rowData) {
      rowData = row;
    }
  });

  query.on('end', function(result) {
    if (result.rowCount > 1) {
      cb(new NotUniqueError());
    }
    if (rowData) {
      var entity = own.createRoleFromRowData(rowData);
      cb(null, entity);
    } else {
      cb(null, null);
    }
  });
};

Controller.prototype.list = function(localeId, cb) {
  var own = this;
  var query = queryManager.query('roleByLocaleId', [localeId]);
  var entities = [];

  query.on('error', function(err) {
    err = new Error(err);
    logger.log('error', err);
    cb(err);
  });

  query.on('row', function(row, result) {
    var entity = own.createRoleFromRowData(row);
    entities.push(entity);
  });

  query.on('end', function(result) {
    cb(null, entities);
  });
};

Controller.prototype.findByUserId = function(userId, localeId, cb) {
  var own = this;

  var query = queryManager.query('roleByUserIdAndLocaleId', [
    userId,
    localeId
  ]);
  var entities = [];

  query.on('error', function(err) {
    err = new Error(err);
    logger.log('error', err);
    cb(err);
  });

  query.on('row', function(row, result) {
    var entity = own.createRoleFromRowData(row);
    entities.push(entity);
  });

  query.on('end', function(result) {
    cb(null, entities);
  });
};


module.exports.Role = Role;
module.exports.controller = new Controller();
