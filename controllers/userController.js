


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


exports.get = async function (req, res) {
  const db = req.app.get('db');
  var id = req.params.id;
  let users;
  try {
    users = await db.models.user.findByPk(id);
  } catch (err) {
    return next(err);
  }
  res.json(users);
};




exports.update = async function (req, res, next) {
  var id = req.params.id;
  var name = req.query.name;
  if (typeof idPar != "number" && typeof name != "string") {
    res.send(400)
  }
  const db = req.app.get('db');
  try {
    data = await db.models.user.findByPk(id)
    if (data) {
      data.update({ name: name })
    } else {
      return res.send(500)
    }
  } catch (err) {
    return next(err)
  }
  res.send(200);
};



exports.delete = async function (req, res, next) {
  let idPar = req.params.id;
  const db = req.app.get('db');
  t = await db.transaction();
  const o = { transaction: t };
  try {
    data = await db.models.user.findByPk(idPar, o)
    if (data) {
      data.destroy();
      res.send(200);
    }

  } catch (err) {
    res.send(500)
  }
};

exports.create = async function (req, res, next) {
  const db = req.app.get('db');
  let data = req.body;
  t = await db.transaction();
  const o = { transaction: t };
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

