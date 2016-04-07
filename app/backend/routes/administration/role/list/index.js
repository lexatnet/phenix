var express = require('express');
var router = express.Router();
var isUserHasOneOfPermissions = require(
  'middlewares/isUserHasOneOfPermissions');
var createContextLoader = require('./libs/context.js').createContextLoader;

router.get('', [
  isUserHasOneOfPermissions([
    'create role',
    'update role'
  ]),
  createContextLoader({
    namespace: 'roleList'
  }),
  function(req, res, next) {
    res.render('administration/role/list');
  }
]);

exports.routes = router;
