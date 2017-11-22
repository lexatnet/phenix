var express = require('express');
var router = express.Router();

var multer = require('multer');
var multipartFormDataParser = multer();
var csrf = require('middlewares/csrf');
var post = require('./libs/post.js');

// TODO check permissions

router.get('', function(req, res, next) {
  res.render('image/upload');
});

router.post('', [
  multipartFormDataParser.array(),
  csrf.csrf,
  post
]);

exports.routes = router;
