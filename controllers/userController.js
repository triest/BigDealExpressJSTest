


exports.index = async function (req, res, next) {
  const db = req.app.get('db');
  let users;
  try {
    users = await db.models.user.findAll();
  } catch (err) {
    next(err);
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
    next(err);
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
      res.send(404)
    }
  } catch (err) {
    res.send(400)
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
      res.send(404)
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
    //next(err)
  }
  res.send(201);
}

