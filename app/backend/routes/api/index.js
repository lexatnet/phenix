var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
  });
});

router.use('/locale', require('./locale/index').routes);
router.use('/user', require('./user/index').routes);
router.use('/image', require('./image/index').routes);
router.use('/administration', require('./administration/index').routes);
router.use('/csrf-token', require('./csrf-token/index').routes);

exports.routes = router;
