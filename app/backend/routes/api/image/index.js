var express = require('express');
var router = express.Router();

router.use('/upload', require('./upload/index.js').routes);
router.use('/list', require('./list/index.js').routes);
router.use('/style', require('./style/index.js').routes);

exports.routes = router;
