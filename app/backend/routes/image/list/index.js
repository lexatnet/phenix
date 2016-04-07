var express = require('express');
var router = express.Router();
var createContextLoader = require('./libs/context.js').createContextLoader;

router.get('', [
  createContextLoader({
    namespace: 'imageList'
  }),
  function(req, res, next) {
    res.render('image/list');
  }
]);

exports.routes = router;
