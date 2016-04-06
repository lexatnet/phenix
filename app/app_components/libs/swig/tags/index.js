var logger = require('libs/log')(module);

var withTag = require('./with');
var imageStyleTag = require('./imageStyle');

module.exports = function(swig) {
  logger.log('info', 'Loading custom swig tags started');
  swig.setTag('with', withTag.parse, withTag.compile, withTag.ends, withTag.blockLevel);
  swig.setTag('imagestyle', imageStyleTag.parse, imageStyleTag.compile,
    imageStyleTag.ends, imageStyleTag.blockLevel);
  logger.log('info', 'Loading custom swig tags finished');
};
