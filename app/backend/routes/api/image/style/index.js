var express = require('express');
var router = express.Router();
var imageLibrary = require('libs/image');

router.get('/:imageId/:styleName', imageLibrary.loadImageStyle);
router.get('/:imageId/:styleName/:fileName', imageLibrary.loadImageStyle);

exports.routes = router;
