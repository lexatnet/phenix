var async = require('async');
var extend = require('extend');
var logger = require('libs/log')(module);

var Locale = require('models/locale').Locale;
var User = require('models/user').User;
var userController = require('models/user').controller;
var Role = require('models/role').Role;
var roleController = require('models/role').controller;
var localeController = require('models/locale').controller;
var Permission = require('models/permission').Permission;
var AccessManager = require('libs/accessManager').AccessManager;

var locales = [{
  code: 'en',
  title: 'English'
}, {
  code: 'ru',
  title: 'Русский'
}];

var permissions = [
  /*roles*/
  {
    name: 'create role',
    title: 'create role',
    description: ''
  }, {
    name: 'update role',
    title: 'update role',
    description: 'update role'
  }, {
    name: 'delete role',
    title: 'delete role',
    description: 'delete role'
  },
  /*permissions*/
  {
    name: 'manage permissions',
    title: 'manage permissions',
    description: 'manage permissions'
  },
  /*user profile*/
  {
    name: 'create user profile',
    title: 'create user profile',
    description: 'create user profile'
  }, {
    name: 'update any user profile',
    title: 'update any user profile',
    description: 'update any user profile'
  }, {
    name: 'update own user profile',
    title: 'update own user profile',
    description: 'update own user profile'
  }, {
    name: 'delete any user profile',
    title: 'delete any user profile',
    description: 'delete any user profile'
  }, {
    name: 'delete own user profile',
    title: 'delete own user profile',
    description: 'delete own user profile'
  },

  /*menu*/
  {
    name: 'admin menu',
    title: 'admin menu',
    description: 'admin menu'
  }, {
    name: 'main menu',
    title: 'main menu',
    description: 'main menu'
  },

  /*administration*/
  {
    name: 'administration dashboard',
    title: 'administration dashboard',
    description: 'administration dashboard'
  }
];

var roles = [{
  name: 'root',
  title: 'Superuser'
}, {
  name: 'anonymous',
  title: 'Anonymous'
}, {
  name: 'registered',
  title: 'Registered'
}];

var users = [{
  login: 'root',
  password: 'root',
  email: 'admin@admin.com'
}];


function generateEntities(entityConstructor, entitiesData, callback) {
  var q = async.queue(function(entityData, callback) {
    var entity = new entityConstructor(entityData);
    entity.save(function(err) {
      if (err) {
        err = new Error(err);
        logger.log('error', 'Error saving',
          typeof entity, err);
      }
      callback(err);
    });
  }, 1);
  q.drain = function() {
    callback();
  };
  entitiesData.forEach(function(entityData) {
    q.push(entityData);
  });
}


function initialize_entities(cb) {

  async.waterfall([
      function(callback) {
        generateEntities(Locale, locales, callback);
      },
      function(callback) {
        localeController.findByCode('en', function(err, locale) {
          if (err) {
            err = new Error(err);
            logger.log('error', 'Error can`t find locale',
              locale, err);
            return callback(err);
          }
          return callback(null, locale);
        });
      },
      function(locale, callback) {
        permissions.map(function(permissionData) {
          extend(true, permissionData, {
            localeId: locale.id
          });
        });
        generateEntities(Permission, permissions, function(err) {
          callback(err, locale);
        });
      },
      function(locale, callback) {
        roles.map(function(roleData) {
          extend(true, roleData, {
            localeId: locale.id
          });
        });
        generateEntities(Role, roles, function(err) {
          callback(err, locale);
        });
      },
      function(locale, callback) {
        generateEntities(User, users, function(err) {
          callback(err, locale);
        });
      },
      function(locale, callback) {
        roleController.findByName('root', locale.id,
          function(err, role) {
            if (err) {
              err = new Error(err);
              logger.log('error', 'Error can`t find role',
                role, err);
              return callback(err);
            }
            return callback(null, locale, role);
          });
      },
      function(locale, role, callback) {
        userController.findByLogin('root', function(err, user) {
          if (err) {
            err = new Error(err);
            logger.log('error', 'Error can`t find user',
              user, err);
            return callback(err);
          }
          return callback(null, locale, role, user);
        });
      },
      function(locale, role, user, callback) {
        accessManager = new AccessManager();
        accessManager.addRoleToUser(user.id, role.id, function(err) {
          if (err) {
            err = new Error(err);
          }
          callback(err);
        });
      }
    ],
    function(err) {
      if (err) {
        logger.log('error', err);
        cb(err);
      }
      logger.log('info', 'ok');
      cb(null);
    }
  );

}



module.exports.initialize_entities = initialize_entities;
