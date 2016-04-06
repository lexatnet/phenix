'use strict'
var EventEmitter = require('events').EventEmitter;
var async = require('async');
var path = require('path');
var fs = require('fs-extra');
var recursiveReadDir = require('recursive-readdir');
var logger = require('libs/log')(module);

/**
 * Create string manager entity
 *
 * @constructor
 * @this {StringManager}
 * @param {Object} options - configuration params:
 *                         - resourceDir
 *
 */
class StringManager extends EventEmitter{
	constructor(options) {
		super()
		this._cache = {};
		this._register = null;
		this.resourceDir = options.resourceDir;
	}

	/**
	 * get string
	 *
	 * @this {StringManager}
	 * @param {string} string identificator
	 * @param {function} callback function(err, string){}
	 * @return {EventEmitter} events: string, error
	 *
	 */
	getString(id, cb) {
	  var own = this;

	  var stringEmitter = new EventEmitter();

	  if (id in own._cache) {
	    if (typeof cb !== 'undefined') {
	      cb(null, own._cache[id]);
	    } else {
	      stringEmitter.emit('string', own._cache[id]);
	    }

	  } else {
	    async.waterfall([
	      function(callback) {
	        own._loadRegister(callback);
	      },
	      function(callback) {
	        own._loadString(id, callback);
	      }
	    ], function(err, string) {
	      if (typeof cb !== 'undefined') {
	        cb(err, string);
	      } else {
	        if (err) {
	          stringEmitter.emit('error', err);
	        } else {
	          stringEmitter.emit('string', own._cache[id]);
	        }
	      }
	    });
	  }
	  return stringEmitter;
	};


	/**
	 * Clear cache
	 * @this {StringManager}
	 * @return {none}
	 */
	clearCache() {
	  var own = this;
	  own._cache = {};
	};

	/**
	 * load string register
	 * @this {StringManager}
	 * @private
	 * @param  {Function} cb [description]
	 * @return {none}
	 */
	_loadRegister(cb) {
	  var own = this;
	  if (own._register === null) {
	    own._register = {};
	    async.waterfall([
	      function(callback) {
	        recursiveReadDir(own.resourceDir, function(err, files) {
	          if (err) {
	            return callback(new Error(err));
	          }
	          callback(null, files);
	        });
	      },
	      function(files, callback) {
	        async.map(
	          files,
	          function(file, callback) {
	            var ext = path.extname(file);
	            var dirname = path.dirname(file);
	            if (ext === '.json') {
	              fs.readJson(file, function(err, json) {
	                if (err) {
	                  logger.log('error', 'Error read json file', file);
	                  return callback(new Error(err));
	                }
	                for (var key in json) {
	                  json[key] = path.resolve(dirname, json[key]);
	                }
	                callback(null, json);
	              });
	            } else {
	              callback(null);
	            }
	          },
	          function(err, results) {
	            if (err) return callback(err);
	            results.forEach(function(result) {
	              extend(true, own._register, result);
	            });
	            callback(null);
	          }
	        );
	      }
	    ], function(err) {
	      cb(err);
	    });
	  } else {
	    cb(null);
	  }
	};

	/**
	 * load string fom file
	 * @private
	 * @this {StringManager}
	 * @param  {String}   string key
	 * @param  {Function} cb function(err, string){}
	 * @return {none}
	 */
	_loadString(stringId, cb) {
	  var own = this;
	  async.waterfall([
	      function(callback) {
	        if (stringId in own._register) {
	          fs.readFile(own._register[stringId], 'utf8', function(err, data) {
	            if (err) {
	              logger.log('error', 'Error loading string from file', {
	                srtingId: stringId,
	                fileName: own._register[stringId]
	              });
	            }
	            callback(err, data);
	          });
	        } else {
	          logger.log('error', 'undefined string. ', {
	            srtingId: stringId
	          });
	          callback(new Error('undefined string stringId'));
	        }
	      }
	    ],
	    function(err, string) {
	      cb(err, string);
	    });
	};
}




module.exports.StringManager = StringManager;
