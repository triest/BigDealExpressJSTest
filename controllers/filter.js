var validateId = function (req, res, next) {
  let id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
     return res.send(400);
  }
  res.locals.id = id;

  return next();
};

var validateName = function (req, res, next) {
  let name = req.body.name;
  if (typeof name !== "string" && name !== "") {
      res.send(400);
  }
  res.locals.name = name;
  return next()
};

exports.validateId=validateId;
exports.validateName=validateName;
