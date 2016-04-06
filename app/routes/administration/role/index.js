var express = require('express');
var router = express.Router();


router.get('/dashboard', function(req, res, next) {
  res.render('administration/dashboard');
});

router.use('/create', require('./create/index').routes);
router.use('/list', require('./list/index').routes);
router.use('/update', require('./update/index').routes);
router.use('/delete', require('./delete/index').routes);


exports.routes = router;
