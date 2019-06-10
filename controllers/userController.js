


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

function update(db, id, name) {
  return new Promise(resolve => {
    db.models.user.findByPk(id).then(data => {
      data.update({ name: name })
    });
  });
}

exports.update = async function (req, res, next) {
  var id = req.params.id;
  var name = req.query.name;
  if (typeof idPar != "number" && typeof name != "string") {
    res.send(400)
  }
  const db = req.app.get('db');
  try {
    await update(db, id, name)
  } catch (err) {
    return next(err)
  }
  res.send("ok");
};



exports.delete = async function (req, res, next) {
  let idPar = req.params.id;
  const db = req.app.get('db');
  t = await db.transaction();
  const o = { transaction: t };
  try {
    await db.models.user.findByPk(idPar, o).then(data => {
      data.destroy();
      res.send(200);
    })
  } catch (err) {
    //return next(err)
    res.send(500)
  }
};

exports.create = async function (req, res, next) {
  const db = req.app.get('db');
  let data = req.body;
  t = await db.transaction();
  const o = { transaction: t };
  let name = data["name"];
  try {
    await db.models.user.create({
      name: name,
    })
  } catch (err) {
    return next(err)
  }
  res.send(200);
}

