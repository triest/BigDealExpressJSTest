
exports.validateId = function (req, res, next) {
  let id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.send(400);
  }
  res.locals.id = id;
  return next();
};
exports.validateName = function (req, res, next) {
  let name = req.body.name;
  if (typeof name !== "string" || name == "") {
    return res.send(400);
  } else {
    res.locals.name = name;
  }
  return next()
};

exports.validatePutName= function (req, res, next) {
  let name = req.params.name;
  if (typeof name !== "string" || name == "") {
    return res.send(400);
  } else {
    res.locals.name = name;
  }
  return next()
};
