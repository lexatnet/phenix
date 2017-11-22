const HttpStatus = require('http-status-codes');
const async = require('async');
const util = require('util');
const omit  = require('lodash/omit');

const logger = require('libs/log')(module);
const User = require('models/user').User;
const controller = require('models/user').controller;
const Message = require('libs/message').Message;

function getCurrentUser(req, res, next) {
  const user = omit(res.locals.user,['hashedPassword', 'salt'])
  res.status(HttpStatus.OK);
  res.setHeader('Content-Type', 'application/json');
  return res.send(JSON.stringify({user}));
}

module.exports = getCurrentUser;
