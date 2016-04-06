var express = require('express');
var router = express.Router();

router.use('/set', require('./set/index').routes);

exports.routes = router;
