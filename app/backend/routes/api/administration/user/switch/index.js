var express = require('express');
var router = express.Router();
var isUserHasPermission = require('middlewares/isUserHasPermission');
var post = require('./libs/post.js');

router.post('', [
  isUserHasPermission('update any user profile'),
  post
]);

exports.routes = router;
