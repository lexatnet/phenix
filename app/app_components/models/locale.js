'use strict'
var util = require('util');
var async = require('async');
var logger = require('libs/log')(module);
var queryManager = require('libs/queryManager').queryManager;


class Locale {
    constructor(options) {
			Object.assign(this, options)
		}

    _insert(callback) {
        var own = this;
        var id = null;
        var query = queryManager.query(
            'localeInsert', [
                own.code,
                own.title
            ]
        );
        query.on('error', function(err) {
            callback(err);
        });
        query.on('row', function(row, result) {
            if (!row.id) return callback(new ResultFieldNotFindError());
            if (id === null) id = parseInt(row.id);
        });
        query.on('end', function(result) {
            if (id) {
                own.id = id;
            }
            callback(null);
        });
    };

    _update(callback) {
        var own = this;
        var now = Math.floor(Date.now() / 1000);
        var data = null;
        var query = queryManager.query(
            'localeUpdate', [
                own.code,
                own.title,
                now, own.id
            ]
        );
        query.on('error', function(err) {
            callback(err);
        });

        query.on('row', function(row, result) {
            if (data === null) {
                data = row;
            }
        });

        query.on('end', function(result) {
            callback(null);
        });
    };

    save(cb) {
        var own = this;
        async.waterfall([
            function(callback) {
                if (own.id) {
                    own._update(callback);
                } else {
                    own._insert(callback);
                }
            }
        ], function(err) {
            cb(err, own);
        });
    };
}


class Controller {
    constructor(options) {

    }

    createLocaleFromRowData(rowData) {
        var own = this;
        return new Locale({
            id: parseInt(rowData.id),
            code: rowData.code,
            title: rowData.title,
            created: rowData.created,
            updated: rowData.updated
        });
    };

    /**
     * find locale by id
     * @this   {Controller}
     * @param  {[type]}   id Locale id.
     * @param  {Function} cb function(err, locale){}.
     * @return {none}
     */
    findById(id, cb) {
        var own = this;

        var query = queryManager.query('localeById', [id]);
        var rowData = null;

        query.on('error', function(err) {
            cb(err);
        });

        query.on('row', function(row, result) {
            if (!rowData) {
                rowData = row;
            }
        });

        query.on('end', function(result) {
            if (result.rowCount > 1) {
                cb(new NotUniqueError());
            }
            if (rowData) {
                var entity = own.createLocaleFromRowData(rowData);
                cb(null, entity);
            } else {
                cb(null, null);
            }
        });

    };

    findByCode(code, cb) {
        var own = this;

        var query = queryManager.query('localeByCode', [code]);
        var rowData = null;

        query.on('error', function(err) {
            cb(err);
        });

        query.on('row', function(row, result) {
            if (!rowData) {
                rowData = row;
            }
        });

        query.on('end', function(result) {
            if (result.rowCount > 1) {
                cb(new NotUniqueError());
            }
            if (rowData) {
                var entity = own.createLocaleFromRowData(rowData);
                cb(null, entity);
            } else {
                cb(null, null);
            }
        });
    };

    list(cb) {
        var own = this;
        var query = queryManager.query('localeList');
        var entities = [];

        query.on('error', function(err) {
            cb(err);
        });

        query.on('row', function(row, result) {
            var entity = own.createLocaleFromRowData(row);
            entities.push(entity);
        });

        query.on('end', function(result) {
            cb(null, entities);
        });
    };
}



module.exports.Locale = Locale;
module.exports.controller = new Controller();
