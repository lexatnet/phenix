
module.exports = function (req, res, next) {

  res.send({
    csrf:res.locals.csrf
  });

}
