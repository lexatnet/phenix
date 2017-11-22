var express = require('express');
var router = express.Router();
var csrf = require('middlewares/csrf');
var isUserHasPermission = require('middlewares/isUserHasPermission');
var createContextLoader = require('./libs/context.js').createContextLoader;
var post = require('./libs/post.js');
var multer = require('multer');
var multipartFormDataParser = multer();

router.get('/:userId', [
  isUserHasPermission('delete any user profile'),
  createContextLoader({
    namespace: 'userDeleteForm'
  }),
  function(
    req, res, next) {
    res.render('administration/user/delete');
  }
]);

router.post('', [
  isUserHasPermission('delete any user profile'),
  multipartFormDataParser.array(),
  csrf.csrf,
  post
]);

exports.routes = router;
