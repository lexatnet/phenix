var express = require('express');
var router = express.Router();

router.get('/dashboard', function(req, res, next) {
  res.render('administration/dashboard');
});

router.use('/user', require('./user/index.js').routes);
router.use('/role', require('./role/index').routes);


exports.routes = router;
