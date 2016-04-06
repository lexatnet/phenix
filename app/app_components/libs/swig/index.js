module.exports = function(swig) {
  require('./extensions')(swig);
  require('./filters')(swig);
  require('./tags')(swig);
};
