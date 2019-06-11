
var idValidate=function(req,res,next){
  let id = req.params.id;
  if (typeof id != "number") {
    res.send(400)
  }
  return next
}

var nameValidate=function(req,res,next){
  let data = req.body;
  let name = data["name"];
  if (typeof name != "string" && name!="") {
    return res.send(400)
  }
  return next
}

exports.index = async function (req, res, next) {
  const db = req.app.get('db');
  let users;
  try {
    users = await db.models.user.findAll();
  } catch (err) {
    return next(err);
  }
  res.json(users);
};


exports.get = async function (req, res, next) {
  idValidate(req, res, next)
  const db = req.app.get('db');
  let id = req.params.id;
  let user;
  try {
    user = await db.models.user.findByPk(id);
  } catch (err) {
    return next(err);
  }
  res.json(user);
};


exports.update = async function (req, res, next) {
  idValidate(req, res, nameValidate)
  let id = req.params.id;
  let name = req.query.name;
  const db = req.app.get('db');
  try {
    data = await db.models.user.findByPk(id)
    if (data) {
      await data.update({ name: name })
    } else {
      return res.send(404)
    }
  } catch (err) {
    return next(err)
  }
  res.send(200);
};


exports.delete = async function (req, res, next) {
  idValidate(req, res, next)
  let idPar = req.params.id;
  const db = req.app.get('db');
  t = await db.transaction();
  const o = { transaction: t };
  try {
    data = await db.models.user.findByPk(idPar, o)
    if (!data) {
      return res.send(404)
    }
    await data.destroy();

    res.send(200);

  } catch (err) {
    next(err)
  }
};


exports.create = async function (req, res, next) {
  nameValidate(req, res, next)
  const db = req.app.get('db');
  let data = req.body;
  let name = data["name"];
  try {
    await db.models.user.create({
      name: name,
    })
  } catch (err) {
    return next(err)
  }
  res.send(201);
}

