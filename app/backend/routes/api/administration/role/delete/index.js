var express = require('express');
var router = express.Router();
var isUserHasPermission = require('middlewares/isUserHasPermission');
var createContextLoader = require('./libs/context.js').createContextLoader;
var csrf = require('middlewares/csrf');
var post = require('./libs/post.js');

router.get('/:roleId', [
  isUserHasPermission('delete role'),
  createContextLoader({
    namespace: 'roleDeleteForm'
  }),
  function(
    req, res, next) {
    res.render('administration/role/delete');
  }
]);

router.post('', [
  isUserHasPermission('delete role'),
  csrf.csrf,
  post
]);

exports.routes = router;
