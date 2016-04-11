var express = require('express');
var router = express.Router();

router.get('', require('./libs/get.js'));

exports.routes = router;
