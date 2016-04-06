var db = require('libs/db');
var util = require('util');
var logger = require('libs/log')(module);

var oneDay = 86400;

module.exports = function(session) {
  var Store = session.Store;

  var PostgresSessionStore = function(options) {
    options = options || {};
    Store.call(this, options);
  };

  util.inherits(PostgresSessionStore, Store);

  /**
   * Attempt to fetch session by the given `sid`.
   *
   * @param {String} sid – the session id
   * @param {Function} cb – a standard Node.js callback returning the parsed session object
   * @access public
   */

  PostgresSessionStore.prototype.get = function(sid, cb) {
    var own = this;
    var query = db.query(
      ' \
      SELECT sess \
      FROM "session" \
      WHERE sid = $1 AND expire >= NOW()', [
        sid
      ]
    );
    var sessionData = null;
    query.on('error', function(err) {
      cb(err);
    });
    query.on('row', function(row, result) {
      if (sessionData === null) {
        sessionData = row;
      }
    });
    query.on('end', function(result) {
      if (!sessionData) {
        return cb();
      }
      try {
        return cb(null, ('string' === typeof sessionData.sess) ? JSON.parse(
          sessionData.sess) : sessionData.sess);
      } catch (e) {
        return own.destroy(sid, cb);
      }
    });
  };

  /**
   * Commit the given `sess` object associated with the given `sid`.
   *
   * @param {String} sid – the session id
   * @param {Object} sess – the session object to store
   * @param {Function} cb – a standard Node.js callback returning the parsed session object
   * @access public
   */

  PostgresSessionStore.prototype.set = function(sid, sess, cb) {
    var self = this,
      maxAge = sess.cookie.maxAge,
      ttl = this.ttl;

    ttl = ttl || (typeof maxAge === 'number' ? maxAge / 1000 : oneDay);
    ttl = Math.ceil(ttl + Date.now() / 1000);

    var updateData = null;

    var query = db.query(
      ' \
      UPDATE "session" SET \
      sess = $1, \
      expire = to_timestamp($2) \
      WHERE sid = $3 RETURNING sid', [
        sess, ttl, sid
      ]
    );

    query.on('error', function(err) {
      cb(err);
    })

    query.on('row', function(row, result) {
      if (updateData === null) updateData = row;
    })

    query.on('end', function(result) {
      if (!updateData) {
        var query = db.query(
          ' \
          INSERT INTO "session" \
          (sess, expire, sid) \
          SELECT $1, to_timestamp($2), $3 \
          WHERE NOT EXISTS (\
            SELECT 1 FROM "session" WHERE sid = $4 \
          )', [
            sess, ttl, sid, sid
          ]
        );

        query.on('error', function(err) {
          cb(err);
        });

        query.on('row', function(row, result) {});

        query.on('end', function(row, result) {
          cb(null);
        });
      } else {
        cb(null);
      }

    });
  };

  /**
   * Destroy the session associated with the given `sid`.
   *
   * @param {String} sid – the session id
   * @access public
   */

  PostgresSessionStore.prototype.destroy = function(sid, cb) {
    var query = db.query(
      ' \
      DELETE FROM "session" \
      WHERE sid = $1', [
        sid
      ]
    );
    query.on('error', function(err) {
      cb ? cb(err) : logger.log('error', 'Error destroy session');
    });
    query.on('row', function(row, result) {});
    query.on('end', function(result) {
      cb ? cb(null) : logger.log('info', 'destroy session successful');;
    });
  };

  return PostgresSessionStore;
};
