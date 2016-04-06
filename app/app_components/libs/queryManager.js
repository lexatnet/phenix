'use strict'
var EventEmitter = require('events');
var async = require('async');
var db = require('libs/db');
var logger = require('libs/log')(module);
var StringManager = require('libs/stringManager').StringManager;

/**
 * QueryManager
 * @constructor
 * @this {QueryManager}
 * @param {Object} options - configuration params:
 *                         - resourceDir
 */
class QueryManager extends StringManager {
	constructor(params) {
		super(params)
	}

	/**
	 * Get sql
	 * @param  {String}   id - String key.
	 * @param  {Function} cb - function(err,sql){}.
	 * @return {EventEmitter}  events: error, sql.
	 */
	getSQL(id, cb) {
	  var own = this;
	  var sqlEmitter = new EventEmitter();
	  var stringEmitter = own.getString(id, cb);
	  stringEmitter.on('string', function(string) {
	    sqlEmitter.emit('sql', string);
	  });
	  stringEmitter.on('error', function(err) {
	    sqlEmitter.emit('error', err);
	  });
	  return sqlEmitter;
	};

	/**
	 * create and run query by id
	 * @param  {String} id     Query id
	 * @param  {Array} params Query params
	 * @return {EventEmitter}  events: error, row, end
	 */
	query(id, params) {
	  var own = this;

	  var queryEmitter = new EventEmitter();

	  async.waterfall([
	    function(callback) {
	      own.getSQL(id, callback);
	    },
	    function(sql, callback) {
	      var query = db.query(sql, params);

	      query.on('error', function(err) {
	        logger.log('error', 'Error query', id);
	        queryEmitter.emit('error', err);
	      });

	      query.on('row', function(row, result) {
	        queryEmitter.emit('row', row, result);
	      });

	      query.on('end', function(result) {
	        queryEmitter.emit('end', result);
	      });
	    }
	  ], function(err) {
	    if (err) {
	      queryEmitter.emit('error', err);
	    }
	  });
	  return queryEmitter;
	};

}


module.exports.queryManager = new QueryManager({
  resourceDir: 'queries'
});
