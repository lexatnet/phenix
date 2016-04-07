var logger = require('libs/log')(module);

module.exports = function(swig) {
  logger.log('info', 'Loading custom swig filters started');
  swig.setFilter('i18n', require('./translate.js'));
  logger.log('info', 'Loading custom swig filters finished');
};
