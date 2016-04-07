var express = require('express');
var router = express.Router();
var isUserHasPermission = require('middlewares/isUserHasPermission');
var createContextLoader = require('./libs/context.js').createContextLoader;
var post = require('./libs/post.js');
var csrf = require('middlewares/csrf');


router.get('', [
  isUserHasPermission('create role'),
  createContextLoader({
    namespace: 'roleCreateForm'
  }),
  function(req, res, next) {
    res.render('administration/role/create');
  }
]);

router.post('', [
  isUserHasPermission('create role'),
  csrf.csrf,
  post
]);

exports.routes = router;
