var express = require('express');
var router = express.Router();
var csrf = require('middlewares/csrf');
var multer = require('multer');
var multipartFormDataParser = multer();
var post = require('./libs/post.js');
var isUserNotAuthenticated = require('middlewares/isUserNotAuthenticated');


router.get('', [
  isUserNotAuthenticated,
  function(req, res, next) {
    res.render('user/registration');
  }
]);
router.post('', [
  isUserNotAuthenticated,
  multipartFormDataParser.array(),
  csrf.csrf,
  post
]);

exports.routes = router;
