var async = require('async');
var config = require('config');
var nodemailer = require('nodemailer');
var smtpPool = require('nodemailer-smtp-pool');

var transport = nodemailer.createTransport(smtpPool(config.get('mail')));

exports.transport = transport;
