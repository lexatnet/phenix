var express = require('express');
var session = require('express-session')

var app = express();


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(6000, function () {
  console.log('Example app listening on port 6000!');
});
