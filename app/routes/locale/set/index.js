var express = require('express');
var router = express.Router();

var csrf = require('middlewares/csrf');
var multer = require('multer');
var multipartFormDataParser = multer();
var post = require('./libs/post.js');

router.post('', [
  multipartFormDataParser.array(),
  csrf.csrf,
  post
]);

exports.routes = router;
