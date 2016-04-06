var async = require('async');
var NotUniqueError = require('libs/db').NotUniqueError;
var ResultFieldNotFindError = require('libs/db').ResultFieldNotFindError;
var logger = require('libs/log')(module);
var User = require('models/user').User;
var queryManager = require('libs/queryManager').queryManager;

function Permission(options) {
  Object.assign(this, options);
  return this;
}

Permission.prototype._insert = function(callback) {
  var own = this;
  var id = null;
  var query = queryManager.query(
    'permissionInsert', [
      own.name
    ]
  );
  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
    }
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

Permission.prototype._insertInfo = function(callback) {
  var own = this;
  var query = queryManager.query(
    'permissionInfoInsert', [
      own.id,
      own.localeId,
      own.title,
      own.description
    ]
  );
  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
    }
    logger.log('error', err);
    callback(err);
  });
  query.on('row', function(row, result) {});
  query.on('end', function(result) {
    callback(null);
  });
};

Permission.prototype._update = function(callback) {
  var own = this;
  var data = null;
  var query = queryManager.query(
    'permissionUpdate', [
      own.name,
      own.id
    ]
  );
  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
    }
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

Permission.prototype._updateInfo = function(callback) {
  var own = this;
  var data = null;
  var query = queryManager.query(
    'permissionInfoUpdate', [
      own.title,
      own.description,
      own.id,
      own.localeId
    ]
  );
  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
    }
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

Permission.prototype._checkInfoExists = function(cb) {
  var own = this;
  var isInfoExists = false;
  var query = queryManager.query(
    'permissionInfoByIdAndLocaleId', [
      own.id,
      own.localeId
    ]
  );

  query.on('error', function(err) {
    cb(new Error(err));
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


Permission.prototype.save = function(cb) {
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

function Controller(options) {}

Controller.prototype.createPermissionFromRowData = function(rowData) {
  var own = this;
  return new Permission({
    id: parseInt(rowData.id),
    localeId: parseInt(rowData.locale_id),
    name: rowData.name,
    title: rowData.title
  });
};

Controller.prototype.findByName = function(name, cb) {
  var own = this;
  var rowData = null;
  var query = queryManager.query(
    'permissionByLocaleIdAndName', [
      localeId,
      name
    ]
  );

  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
    }
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
      var role = own.createPermissionFromRowData(rowData);
      cb(null, role);
    } else {
      cb(null, null);
    }
  });
};

Controller.prototype.findById = function(id, cb) {
  var own = this;
  var query = queryManager.query(
    'permissionByIdAndLocaleId', [
      id,
      localeId
    ]
  );
  var rowData = null;

  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
    }
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
      var entity = own.createPermissionFromRowData(rowData);
      cb(null, entity);
    } else {
      cb(null, null);
    }
  });
};

Controller.prototype.list = function(localeId, cb) {
  var own = this;
  var query = queryManager.query('permissionByLocaleId', [localeId]);
  var entities = [];

  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
    }
    logger.log('error', err);
    cb(err);
  });

  query.on('row', function(row, result) {
    var entity = own.createPermissionFromRowData(row);
    entities.push(entity);
  });

  query.on('end', function(result) {
    cb(null, entities);
  });
};

Controller.prototype.findByUserId = function(userId, localeId, cb) {
  var own = this;

  var query = queryManager.query(
    'permissionByUserIdAndLocaleId', [
      userId,
      localeId
    ]
  );
  var entities = [];

  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
    }
    logger.log('error', err);
    cb(err);
  });

  query.on('row', function(row, result) {
    var entity = own.createPermissionFromRowData(row);
    entities.push(entity);
  });

  query.on('end', function(result) {
    cb(null, entities);
  });
};

Controller.prototype.findByRoleName = function(roleName, localeId, cb) {
  var own = this;

  var query = queryManager.query(
    'permissionByRoleNameAndLocaleId', [
      roleName
    ]
  );
  var entities = [];

  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
    }
    logger.log('error', err);
    cb(err);
  });

  query.on('row', function(row, result) {
    var entity = own.createPermissionFromRowData(row);
    entities.push(entity);
  });

  query.on('end', function(result) {
    cb(null, entities);
  });
};

Controller.prototype.findByRoleId = function(roleId, localeId, cb) {
  var own = this;

  var query = queryManager.query(
    'permissionByRoleIdAndLocaleId', [
      roleId,
      localeId
    ]
  );
  var entities = [];

  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
    }
    logger.log('error', err);
    cb(err);
  });

  query.on('row', function(row, result) {
    var entity = own.createPermissionFromRowData(row);
    entities.push(entity);
  });

  query.on('end', function(result) {
    cb(null, entities);
  });
};


module.exports.Permission = Permission;
module.exports.controller = new Controller();
