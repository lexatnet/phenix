var express = require('express');
var router = express.Router();
var createContextLoader = require('./libs/context.js').createContextLoader;

router.get('/:userId', [
  createContextLoader({
    namespace: 'userProfile'
  }),
  function(
    req, res, next) {
    res.render('user/profile/view');
  }
]);

exports.routes = router;
