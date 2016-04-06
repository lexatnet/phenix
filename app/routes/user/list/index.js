var express = require('express');
var router = express.Router();
var createContextLoader = require('./libs/context.js').createContextLoader;

router.get('', [
  createContextLoader({
    namespace: 'userList'
  }),
  function(req, res, next) {
    res.render('user/list');
  }
]);

exports.routes = router;
