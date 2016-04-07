var express = require('express');
var router = express.Router();
var csrf = require('middlewares/csrf');
var post = require('./libs/post.js');
var multer = require('multer');
var multipartFormDataParser = multer();

router.post('', [
  multipartFormDataParser.array(),
  csrf.csrf,
  post
]);

exports.routes = router;
