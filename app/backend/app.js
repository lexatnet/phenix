var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('config');
var session = require('express-session');
var i18n = require('i18n');
var swig = require('swig');

var PosgresSessionStore = require('libs/postgresSessionStore')(session);

//attach custom extesions, tags and filters to swig
//----------------------------------------------------------------------------
require('libs/swig')(swig);

i18n.configure({
  // setup some locales - other locales default to en silently
  locales: ['en', 'ru'],

  // you may alter a site wide default locale
  defaultLocale: 'en',

  // sets a custom cookie name to parse locale settings from  - defaults to NULL
  cookie: null,

  // where to store json files - defaults to './locales' relative to modules directory
  directory: __dirname + '/locales',

  // whether to write new locale information to disk - defaults to true
  updateFiles: true,

  // what to use as the indentation unit - defaults to "\t"
  indent: "\t",

  // setting extension of json files - defaults to '.json' (you might want to set this to '.js' according to webtranslateit)
  extension: '.json',

  // enable object notation
  objectNotation: false
});



var app = express();

// view engine setup
app.engine('swig', swig.renderFile);
	app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'swig');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({
  cache: false
});
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(i18n.init);
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  // genid: function(req) {
  //   return genuuid() // use UUIDs for session IDs
  // },
  secret: config.get('session.secret'),
  key: config.get('session.key'),
  cookie: config.get('session.cookie'),
  store: new PosgresSessionStore()
}));


// custom middleware
// --------------------------------------------------------------------------

// set locale
app.use(require('middlewares/loadLocale'));

//load current User object to req and req.locals
app.use(require('middlewares/loadUser'));

// load AccessManager Object and access utils to req and req.locals
app.use(require('middlewares/loadAccessManager'));

// generate csrf token
app.use(require('middlewares/csrf').token);

//create res.loadContext method
app.use(require('middlewares/context'));

// load global context
app.use(require('middlewares/loadGlobalContext'));

//attach routes
//---------------------------------------------------------------------------
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
