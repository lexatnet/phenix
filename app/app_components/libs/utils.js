var async = require('async');
var moment = require('moment');
var path = require('path');
var fs = require('fs-extra');
var logger = require('libs/log')(module);


function getPathSuffix() {
  return moment().format('(YYYY-MM-DD HH:mm:ss.SS)');
}

function getSafePath(unsafePath, callback) {
  var safePath = unsafePath;
  var parsed = path.parse(unsafePath);

  async.during(function(callback) {
    fs.stat(safePath, function(err, stat) {
      if (err === null) {
        // file exists
        return callback(null, true);
      } else if (err.code == 'ENOENT') {
        // file not exists
        return callback(null, false);
      } else {
        logger.log(err);
        return callback(new Error('Cant check file exists.'));
      }
    });
  }, function(callback) {
    async.setImmediate(function() {
      var suffix = getPathSuffix();
      var newName = [parsed.name, suffix].join('');
      var newBase = [newName, parsed.ext].join('');
      safePath = path.format({
        root: parsed.root,
        dir: parsed.dir,
        base: newBase,
        ext: parsed.ext,
        name: newName
      });
      callback();
    });
  }, function(err) {
    callback(err, safePath);
  });
}

exports.getSafePath = getSafePath;
