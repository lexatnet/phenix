var multer = require('multer');
var multipartFormDataParser = multer();

function validation(req, callback) {
  var messages = [];

  async.waterfall([
    function(callback) {
      // required validation
      reqiredFieldNames = ['userId'];
      reqiredFieldNames.forEach(function(fieldName) {
        if (validator.isNull(req.body[fieldName])) {
          var text = req.__('{{fieldName}} is required', {
            fieldName: fieldName
          });
          var message = new Message({
            status: 'danger',
            text: text,
            tag: fieldName
          });
          messages.push(message);
        }
      });
      callback();
    }
  ], function(err) {
    if (messages.length > 0) {
      return callback(new ValidationError(messages));
    }
    callback();
  });
}

function processTrackUploadForm(req, res, next) {
  async.waterfall([
      function(callback) {
        multipartFormDataParser.array()(req, res, callback);
      },
      function(callback) {
        csrf.csrf(req, res, callback);
      },
      function(callback) {
        validation(req, callback);
      },
      function(callback) {
        req.session.destroy(callback);
        req.session.userId = parseInt(req.body.userId);
      }
    ],
    function(err) {
      if (err) {
        if (err instanceof ValidationError) {
          return res.status(HttpStatus.BAD_REQUEST).send(err);
        }
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
      }
      return res.sendStatus(200);
    });
}

function generateEntities(entityConstructor, entitiesData, callback) {

}

module.exports = processTrackUploadForm;
