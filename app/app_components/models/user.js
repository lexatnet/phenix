'use strict'
var bcrypt = require('bcrypt');
var async = require('async');
var queryManager = require('libs/queryManager').queryManager;
var NotUniqueError = require('libs/db').NotUniqueError;
var ResultFieldNotFindError = require('libs/db').ResultFieldNotFindError;
var logger = require('libs/log')(module);


class User {
	constructor(options) {
		Object.assign(this, options) // TODO: split options
	}

	checkPassword(password, cb) {
	  var own = this;
	  bcrypt.compare(password, own.hashedPassword, cb);
	};

	_insert(callback) {
	  var own = this;
	  var id = null;
	  var query = queryManager.query(
	    'userInsert', [
	      own.login, own.hashedPassword, own.salt, own.email
	    ]
	  );
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

	_update(callback) {
	  var own = this;
	  var now = Math.floor(Date.now() / 1000);
	  var data = null;
	  var query = queryManager.query('userUpdate', [
	    own.login,
	    own.hashedPassword,
	    own.salt,
	    own.email,
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

	_generateSalt(callback) {
	  var own = this;
	  bcrypt.genSalt(10, function(err, salt) {
	    if (err) return callback(err);
	    own.salt = salt;
	    callback(err);
	  });
	};

	_generateHashedPassword(callback) {
	  var own = this;
	  bcrypt.hash(own.password, own.salt, function(err, hash) {
	    if (err) return callback(err);
	    own.hashedPassword = hash;
	    callback(err);
	  });
	};

	save (cb) {
	  var own = this;
	  async.waterfall([
	    function(callback) {
	      if (own.salt) {
	        return callback(null);
	      } else {
	        own._generateSalt(callback);
	      }
	    },
	    function(callback) {
	      if (own.hashedPassword) {
	        callback(null);
	      } else {
	        own._generateHashedPassword(callback);

	      }
	    },
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

	delete(cb) {
	  var own = this;
	  async.waterfall([
	    function(callback) {
	      var data = null;
	      var query = queryManager.query('userDeleteById', [own.id]);
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

}

function Controller(options) {

}

Controller.prototype.createUserFromRowData = function(rowData) {
  var own = this;
  return new User({
    id: parseInt(rowData.id),
    login: rowData.login,
    hashedPassword: rowData.password,
    salt: rowData.salt,
    email: rowData.email,
    created: rowData.created,
    updated: rowData.updated
  });
};

Controller.prototype.findByLogin = function(login, cb) {
  var own = this;
  var userData = null;
  var query = queryManager.query('userByLogin', [login]);

  query.on('error', function(err) {
    cb(err);
  });

  query.on('row', function(row, result) {
    if (!userData) {
      userData = row;
    }
  });

  query.on('end', function(result) {
    if (result.rowCount > 1) {
      cb(new NotUniqueError());
    }
    if (userData) {
      var user = own.createUserFromRowData(userData);
      cb(null, user);
    } else {
      cb(null, null);
    }
  });
};

Controller.prototype.findByEmail = function(email, cb) {
  var own = this;
  var userData = null;
  var query = queryManager.query('', [email]);

  query.on('error', function(err) {
    cb(err);
  });

  query.on('row', function(row, result) {
    if (!userData) {
      userData = row;
    }
  });

  query.on('end', function(result) {
    if (result.rowCount > 1) {
      cb(new NotUniqueError());
    }
    if (userData) {
      var user = own.createUserFromRowData(userData);
      cb(null, user);
    } else {
      cb(null, null);
    }
  });
};

Controller.prototype.findById = function(id, cb) {
  var own = this;
  var selectQuery = queryManager.query('userById', [id]);
  var userData = null;

  selectQuery.on('error', function(err) {
    cb(err);
  });

  selectQuery.on('row', function(row, result) {
    if (!userData) {
      userData = row;
    }
  });

  selectQuery.on('end', function(result) {
    if (result.rowCount > 1) {
      cb(new NotUniqueError());
    }
    if (userData) {
      var user = own.createUserFromRowData(userData);
      cb(null, user);
    } else {
      cb(null, null);
    }
  });
};

Controller.prototype.list = function(cb) {
  var own = this;
  var selectQuery = queryManager.query('userList');
  var users = [];

  selectQuery.on('error', function(err) {
    cb(err);
  });

  selectQuery.on('row', function(row, result) {
    var user = own.createUserFromRowData(row);
    users.push(user);
  });

  selectQuery.on('end', function(result) {
    cb(null, users);
  });
};


module.exports.User = User;
module.exports.controller = new Controller();
