var express = require('express');
var router = express.Router();
var csrf = require('middlewares/csrf');
var isUserHasPermission = require('middlewares/isUserHasPermission');
var createContextLoader = require('./libs/context.js').createContextLoader;
var multer = require('multer');
var multipartFormDataParser = multer();
var post = require('./libs/post.js');

router.get('/:userId', [
  isUserHasPermission('update any user profile'),
  createContextLoader({
    namespace: 'userUpdateForm'
  }),
  function(
    req, res, next) {
    res.render('administration/user/update');
  }
]);

router.post('', [
  isUserHasPermission('update any user profile'),
  multipartFormDataParser.array(),
  csrf.csrf,
  post
]);

exports.routes = router;
