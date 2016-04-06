var express = require('express');
var router = express.Router();

router.use('/list', require('./list/index').routes);
router.use('/registration', require('./registration/index').routes);
router.use('/login', require('./login/index').routes);
router.use('/logout', require('./logout/index').routes);
router.use('/profile', require('./profile/index').routes);

exports.routes = router;
