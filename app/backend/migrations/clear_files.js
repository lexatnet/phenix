var config = require('config');
var fs = require('fs-extra');
var logger = require('libs/log')(module);

function clear_files(cb) {
  fs.removeSync('uploads');
  fs.removeSync('tmp');
  cb(null);
}

module.exports.clear_files = clear_files;
