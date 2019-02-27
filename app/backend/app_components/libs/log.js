const { createLogger, transports, format } = require('winston');
var config = require('config');

// var ENV = process.env.NODE_ENV;

// can be much more flexible than that O_o
function getLogger(module) {

  var path = module.filename.split('/').slice(-2).join('/');

  return new (createLogger)({
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.label(
            {
              label: path
            }
          )
        ),
        level: config.get('logger.level'),
        immediate:config.get('logger.immediate'),
      })
    ]
  });
}

module.exports = getLogger;
