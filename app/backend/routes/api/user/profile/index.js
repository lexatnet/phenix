const express = require('express');
const router = express.Router();
const isUserAuthenticated = require('middlewares/isUserAuthenticated');
const get = require('./libs/get.js');

router.get('/current', [
  //isUserAuthenticated,
  get
]);
/*
router.get('/:userId', [
  isUserAuthenticated,
  get
]);
*/
exports.routes = router;
