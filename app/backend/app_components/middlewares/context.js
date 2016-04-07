var logger = require('libs/log')(module);



/**
 * middleware
 * Create loadContext function in responce object
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function createContextLoader(req, res, next) {

  if (res.loadContext) {
    logger.log('error', 'res.loadContext already exists');
    return next(new Error('loadContext'));
  }

  /**
   * set root[namespace][name] = value
   *
   * root[namespace] - sub object contained name->value pairs
   * create namespace if not exists
   * override value if exists
   *
   * @param  {Object}   options  :
   *                             options.namespace
   *                             options.contextRoot
   *                             options.name
   *                             options.value
   * @param  {Function} callback [description]
   * @return {undefined}          [description]
   */
  function loadContext(options, callback) {

    try {
      var namespace = (options.namespace) ? options.namespace : 'global';
      var contextRoot = (options.contextRoot) ? options.contextRoot : res.locals;
      var name = options.name;
      var value = options.value;

      if (namespace) {
        if (!contextRoot.context) {
          contextRoot.context = {};
        }
        contextRoot = contextRoot.context;
        if (!contextRoot[namespace]) {
          contextRoot[namespace] = {};
        }
        contextRoot = contextRoot[namespace];
        if (contextRoot) {
          contextRoot[name] = value;
        }
      }
    } catch (e) {
      logger.log('error', e);
      return callback(e);
    }
    if (callback) callback();
  }

  res.loadContext = loadContext;
  return next();
}
module.exports = createContextLoader;
