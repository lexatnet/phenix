var EventEmitter = require('events').EventEmitter;
var async = require('async');

var queryManager = require('libs/queryManager').queryManager;
var NotUniqueError = require('libs/db').NotUniqueError;
var ResultFieldNotFindError = require('libs/db').ResultFieldNotFindError;
var logger = require('libs/log')(module);

var User = require('models/user').User;
var Role = require('models/role').Role;

var defaultAnonymousRolesNames = [
  'anonymous'
];
/**
 * [AccessManager description]
 * @param {[type]} options [description]
 */
function AccessManager(options) {
  var own = this;
  own._cache = {};
  Object.assign(this, options);
}

AccessManager.prototype.addPermissionToRole = function(roleId, permissionId,
  callback) {
  var own = this;

  var query = queryManager.query('rolePermissionInsert', [
    roleId,
    permissionId
  ]);

  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
      logger.log('error', 'Error can`t add permission to role',
        'permissionId =', permissionId, 'roleId =', roleId, err);
    }
    callback(err);
  });
  query.on('row', function(row, result) {});
  query.on('end', function(result) {
    callback(null);
  });
};


AccessManager.prototype.removePermissionFromRole = function(roleId,
  permissionId, callback) {
  var own = this;

  var query = queryManager.query('rolePermissionDelete', [
    roleId,
    permissionId
  ]);
  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
      logger.log('error', 'Error can`t remove permission from role.',
        'permissionId =', permissionId, 'roleId =', roleId, err);
    }
    callback(err);
  });
  query.on('row', function(row, result) {});
  query.on('end', function(result) {
    callback(null);
  });
};


AccessManager.prototype.setRolePermissions = function(roleId, permissionIds, cb) {
  var own = this;

  async.waterfall([
    function(callback) {
      var query = queryManager.query('permissionIdByRoleId', [roleId]);
      var rolePermissionIds = [];

      query.on('error', function(err) {
        err = new Error(err);
        logger.log('error', err);
        cb(err);
      });

      query.on('row', function(row, result) {
        var permissionId = parseInt(row.id);
        rolePermissionIds.push(permissionId);
      });

      query.on('end', function(result) {
        callback(null, rolePermissionIds);
      });
    },
    function(rolePermissionIds, callback) {

      var rolePermissionIdsForDelete = rolePermissionIds.filter(function(
        permissionId) {
        return permissionIds.indexOf(permissionId) < 0;
      });

      var rolePermissionIdsForInsert = permissionIds.filter(function(
        permissionId) {
        return rolePermissionIds.indexOf(permissionId) < 0;
      });

      async.waterfall([
          function(callback) {
            if (rolePermissionIdsForDelete.length <= 0) {
              return callback();
            }
            var q = async.queue(function(permissionId, callback) {
              own.removePermissionFromRole(roleId, permissionId,
                callback);
            }, 1);

            q.drain = function() {
              callback();
            };

            rolePermissionIdsForDelete.forEach(function(permissionId) {
              q.push(permissionId);
            });

          },
          function(callback) {
            if (rolePermissionIdsForInsert.length <= 0) {
              return callback();
            }

            var q = async.queue(function(permissionId, callback) {
              own.addPermissionToRole(roleId, permissionId,
                callback);
            }, 1);

            q.drain = function() {
              callback();
            };

            rolePermissionIdsForInsert.forEach(function(permissionId) {
              q.push(permissionId);
            });

          }
        ],
        function(err) {
          callback(err);
        }
      );

    }
  ], function(err) {
    cb(err);
  });
};



/**
 * add role to user
 * @param  {number}   userId   [description]
 * @param  {number}   roleId   [description]
 * @param  {Function} callback [description]
 * @return {[type]}            [description]
 */
AccessManager.prototype.addRoleToUser = function(userId, roleId, callback) {
  var own = this;

  var query = queryManager.query('userRoleInsert', [
    userId,
    roleId
  ]);

  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
      logger.log('error', 'Error can`t add role to user',
        'userId =', userId, 'roleId =', roleId, err);
    }
    callback(err);
  });
  query.on('row', function(row, result) {});
  query.on('end', function(result) {
    callback(null);
  });
};

AccessManager.prototype.removeRoleFromUser = function(userId, roleId, callback) {
  var own = this;

  var query = queryManager.query('userRoleDelete', [
    userId,
    roleId
  ]);
  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
      logger.log('error', 'Error can`t remove role from user',
        'userId =', userId, 'roleId =', roleId, err);
    }
    callback(err);
  });
  query.on('row', function(row, result) {});
  query.on('end', function(result) {
    callback(null);
  });
};

AccessManager.prototype.setUserRoles = function(userId, roleIds, cb) {
  var own = this;

  async.waterfall([
    function(callback) {
      var query = queryManager.query('roleIdByUserId', [userId]);
      var userRoleIds = [];

      query.on('error', function(err) {
        err = new Error(err);
        logger.log('error', err);
        cb(err);
      });

      query.on('row', function(row, result) {
        var roleId = parseInt(row.id);
        userRoleIds.push(roleId);
      });

      query.on('end', function(result) {
        callback(null, userRoleIds);
      });
    },
    function(userRoleIds, callback) {

      var userRoleIdsForDelete = userRoleIds.filter(function(roleId) {
        return roleIds.indexOf(roleId) < 0;
      });

      var userRoleIdsForInsert = roleIds.filter(function(roleId) {
        return userRoleIds.indexOf(roleId) < 0;
      });

      async.waterfall([
          function(callback) {
            if (userRoleIdsForDelete.length <= 0) {
              return callback();
            }
            var q = async.queue(function(roleId, callback) {
              own.removeRoleFromUser(userId, roleId, callback);
            }, 1);

            q.drain = function() {
              callback();
            };

            userRoleIdsForDelete.forEach(function(roleId) {
              q.push(roleId);
            });
          },
          function(callback) {

            if (userRoleIdsForInsert.length <= 0) {
              return callback();
            }

            var q = async.queue(function(roleId, callback) {
              own.addRoleToUser(userId, roleId, callback);
            }, 1);

            q.drain = function() {
              callback();
            };

            userRoleIdsForInsert.forEach(function(roleId) {
              q.push(roleId);
            });
          }
        ],
        function(err) {
          callback(err);
        }
      );

    }
  ], function(err) {
    cb(err);
  });
};

AccessManager.prototype.isUserHasPermission = function(userId, permissionName) {
  var own = this;

  if (typeof userId !== 'number') {
    throw new Error('AccessManager userId isn`t number.', userId);
  }

  if (!own.isPermissionNameValid(permissionName)) {
    err = new Error('AccessManager invalid permission name.');

    logger.log('error', err, permissionName);
    return false;
  }

  if (userId in own._cache) {
    return own._isUserHasPermission(userId, permissionName);
  } else {
    throw new Error('AccessManager user access details not loaded.');
  }
};

AccessManager.prototype.isUserHasOneOfPermissions = function(userId,
  permissionNames) {
  var own = this;
  var result = false;
  permissionNames.every(function(permissionName) {
    if (own.isUserHasPermission(userId, permissionName)) {
      result = true;
      return false;
    }
    return true;
  });
  return result;
};

AccessManager.prototype.getUserPermissionNames = function(userId) {
  var own = this;

  if (id in own._cache) {
    return own._cache[userId].roles.slice(0);
  } else {
    throw new Error('AccessManager user access details not loaded.');
  }
};

AccessManager.prototype.isUserHasRole = function(userId, roleName) {
  var own = this;

  if (typeof userId !== 'number') {
    throw new Error('AccessManager userId isn`t number.');
  }

  if (id in own._cache) {
    return own._isUserHasRole(userId, roleName);
  } else {
    throw new Error('AccessManager user access details not loaded.');
  }

};

AccessManager.prototype.isUserAuthenticated = function(userId) {
  var own = this;

  if (typeof userId !== 'number') {
    throw new Error('AccessManager userId isn`t number.');
  }

  return (userId !== 0);
};

AccessManager.prototype.loadUserAccessDetails = function(userId, cb) {
  var own = this;
  var accessEmitter = new EventEmitter();

  own._cache[userId] = {};

  async.waterfall([
    function(callback) {
      own.loadUserRoles(userId, callback);
    },
    function(callback) {
      own.loadUserPermissions(userId, callback);
    }
  ], function(err) {
    if (err) {
      err = new Error(err);
      logger.log('error', 'Error can`t load user access details',
        'userId =', userId, err);
    }
    if (typeof cb !== 'undefined') {
      cb(err);
    } else {
      if (err) {
        accessEmitter.emit('error', err);
      } else {
        accessEmitter.emit('done');
      }
    }
  });
  return accessEmitter;
};

AccessManager.prototype.loadUserRoles = function(userId, cb) {
  var own = this;
  if (userId === 0) {
    own._cache[userId].roles = defaultAnonymousRolesNames;
    cb(null);
  } else {
    own._roleNamesByUserId(userId, function(err, roleNames) {
      if (err) {
        err = new Error(err);
        logger.log('error', 'Error can`t add role to user',
          'userId =', userId, err);
        cb(err);
      }

      own._cache[userId].roles = roleNames;
      return cb(null);
    });
  }
};

/**
 *
 * @param  {String}   roleName Role Name.
 * @param  {Function} cb      function(err, permissionNames){}.
 *                            - err : Error object.
 *                            - permissionNames : array names of permissions
 * @return {none}            [description]
 */
AccessManager.prototype._permissionNameByRoleName = function(roleName, cb) {
  var own = this;

  var query = queryManager.query(
    'permissionNameByRoleName', [
      roleName
    ]
  );
  var entities = [];

  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
      logger.log('error', 'Error can`t load permission names',
        'roleName =', roleName, err);
    }
    cb(err);
  });

  query.on('row', function(row, result) {
    var entity = row.name;
    entities.push(entity);
  });

  query.on('end', function(result) {
    cb(null, entities);
  });
};

/**
 *
 * @param  {int}   userId User Id.
 * @param  {Function} cb      function(err, permissionNames){}.
 *                            - err : Error object.
 *                            - permissionNames : array names of permissions
 * @return {none}            [description]
 */
AccessManager.prototype._permissioNameByUserId = function(userId, cb) {
  var own = this;

  var query = queryManager.query(
    'permissionNameByUserId', [
      userId
    ]
  );
  var entities = [];

  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
      logger.log('error', 'Error can`t load permission names',
        'userId =', userId, err);
    }
    cb(err);
  });

  query.on('row', function(row, result) {
    var entity = row.name;
    entities.push(entity);
  });

  query.on('end', function(result) {
    cb(null, entities);
  });
};

/**
 *
 * @param  {int}   userId User Id.
 * @param  {Function} cb      function(err, roleNames){}.
 *                            - err : Error object.
 *                            - roleNames : array names of permissions
 * @return {none}            [description]
 */
AccessManager.prototype._roleNamesByUserId = function(userId, cb) {
  var own = this;

  var query = queryManager.query(
    'roleNameByUserId', [
      userId
    ]
  );
  var entities = [];

  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
      logger.log('error', 'Error can`t load role names',
        'userId =', userId, err);
    }
    cb(err);
  });

  query.on('row', function(row, result) {
    var entity = row.name;
    entities.push(entity);
  });

  query.on('end', function(result) {
    cb(null, entities);
  });
};

AccessManager.prototype.loadUserPermissions = function(userId, cb) {
  var own = this;
  if (userId === 0) {
    var listOfPermissionNames = [];

    var q = async.queue(function(roleName, callback) {
      own._permissionNameByRoleName(roleName, function(err,
        permissionNames) {
        if (err) return cb(new Error(err));
        listOfPermissionNames.concat(permissionNames);
        return callback(null);
      });
    }, 1);
    q.drain = function() {
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }
      own._cache[userId].permissions = listOfPermissionNames.filter(
        onlyUnique);
      cb(null);
    };
    defaultAnonymousRolesNames.forEach(function(roleName) {
      q.push(roleName);
    });
  } else {
    own._permissioNameByUserId(userId, function(err, permissionNames) {
      if (err) return cb(new Error(err));

      own._cache[userId].permissions = permissionNames;
      return cb(null);
    });
  }
};

AccessManager.prototype._isUserHasPermission = function(userId, permissionName) {
  var own = this;
  if (own._isUserHasRole(userId, 'root')) {
    return true;
  }
  if (own._cache[userId].permissions.indexOf(permissionName) > -1) {
    return true;
  }
  return false;
};

AccessManager.prototype._isUserHasRole = function(userId, roleName) {
  var own = this;
  if (own._cache[userId].roles.indexOf(roleName) > -1) {
    return true;
  }
  return false;
};

/**
 *
 * @param  {Function} cb      function(err, permissionNames){}.
 *                            - err : Error object.
 *                            - permissionNames : array names of permissions
 * @return {none}            [description]
 */
AccessManager.prototype._loadPermissionNames = function(cb) {
  var own = this;

  var query = queryManager.query('permissionNames');
  var entities = [];

  query.on('error', function(err) {
    if (err) {
      err = new Error(err);
      logger.log('error', 'Error can`t load permission names', err);
    }
    cb(err);
  });

  query.on('row', function(row, result) {
    var entity = row.name;
    entities.push(entity);
  });

  query.on('end', function(result) {
    cb(null, entities);
  });
};

AccessManager.prototype.initialize = function(cb) {
  var own = this;
  var accessEmitter = new EventEmitter();

  async.waterfall([
    function(callback) {
      own._loadPermissionNames(callback);
    },
    function(permissionNames, callback) {
      own._permissionNames = permissionNames;
      callback();
    }
  ], function(err) {
    if (err) {
      err = new Error(err);
      logger.log('error', 'Error can`t initialize access manager', err);
    }
    if (typeof cb !== 'undefined') {
      cb(err);
    } else {
      if (err) {
        accessEmitter.emit('error', err);
      } else {
        accessEmitter.emit('done');
      }
    }
  });
  return accessEmitter;
};

AccessManager.prototype.isPermissionNameValid = function(permissionName) {
  var own = this;
  if (own._permissionNames.indexOf(permissionName) > -1) {
    return true;
  }
  return false;
};



module.exports.AccessManager = AccessManager;
