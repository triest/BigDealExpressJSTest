


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

var paramsValidte=function(req, res, next){
  var id = req.params.id;
   id=parseInt(id)
  if (typeof id != "number") {
     res.send(400)
  }
  return next
}

exports.get = async function (req, res,next) {
  paramsValidte(req,res,next)
  const db = req.app.get('db');
  var id = req.params.id;
  let user;
  try {
    user = await db.models.user.findByPk(id);
  } catch (err) {
    return next(err);
  }
  res.json(user);
};


var updateValidate=function(req, res, next){
  var id = req.params.id;
   id=parseInt(id)
   if (typeof id != "number" && typeof name != "string") {
    return res.send(400)
  }
  return next
}


exports.update = async function (req, res, next) {
  updateValidate(req,res,next)
  var id = req.params.id;
  var name = req.query.name;

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



exports.delete = async function (req, res,next) {
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
  const db = req.app.get('db');
  let data = req.body;
  let name = data["name"];
  if (name == "" && typeof name != "string") {
    res.send(400);
  }
  try {
    await db.models.user.create({
      name: name,
    })
  } catch (err) {
    return next(err)
  }
  res.send(201);
}

