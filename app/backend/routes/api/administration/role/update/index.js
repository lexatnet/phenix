var express = require('express');
var router = express.Router();
var isUserHasPermission = require('middlewares/isUserHasPermission');
var createContextLoader = require('./libs/context.js').createContextLoader;
var csrf = require('middlewares/csrf');
var post = require('./libs/post.js');


router.get('/:roleId', [
  isUserHasPermission('update role'),
  createContextLoader({
    namespace: 'roleUpdateForm'
  }),
  function(req, res, next) {
    res.render('administration/role/update');
  }
]);

router.post('', [
  isUserHasPermission('update role'),
  csrf.csrf,
  post
]);

exports.routes = router;
