var express = require('express');
var router = express.Router();
var isUserHasOneOfPermissions = require(
  'middlewares/isUserHasOneOfPermissions');
var createContextLoader = require('./libs/context.js').createContextLoader;


router.get('', [
  isUserHasOneOfPermissions([
    'create user profile',
    'update any user profile'
  ]),
  createContextLoader({
    namespace: 'userList'
  }),
  function(req, res, next) {
    res.render('administration/user/list');
  }
]);
exports.routes = router;
