var logger = require('libs/log')(module);


module.exports = function(swig) {
  logger.log('info', 'Loading custom swig extends started');
  swig.setExtension('translate', require('./translate.js'));
  logger.log('info', 'Loading custom swig extends finished');
};
