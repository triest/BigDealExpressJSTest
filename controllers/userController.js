const filter = require('../controllers/filter.js');


exports.index = async function (req, res, next) {
  const db = req.app.get('db');
  let users;
  try {
    users = await db.models.user.findAll();
  } catch (err) {
    return next(err);
  }
    return res.json(users);
};

exports.get = async function (req, res, next) {
  const db = req.app.get('db');
  let id = res.locals.id;
  let user;
  try {
    user = await db.models.user.findByPk(id);
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return res.send(404)
  }
  res.json(user);
};


exports.update = async function (req, res, next) {
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

/*
exports.update = async function (req, res, next) {
  let id = req.params.id;
  let name = res.locals.name;
  const db = req.app.get('db');
  try {
    data = await db.models.user.findByPk(id)
    if (data) {
      await db.models.update({ name: name })
      await data.transaction(transaction=>db.models.update({ name: name,transaction }))
    } else {
      return res.send(404)
    }
  } catch (err) {
    return res.send(400)
  }
  return res.send(200);
};
*/

exports.delete = async function (req, res, next) {
  let idPar = res.locals.id;
  const db = req.app.get('db');
  t = await db.transaction();
  const o = { transaction: t };
  try {
    data = await db.models.user.findByPk(idPar, o)
    if (!data) {
      return res.send(404)
    }
    else {
      await data.destroy();
      return res.send(200);
    }
  } catch (err) {
    next(err)
  }
};

exports.create = async function (req, res, next) {
  const db = req.app.get('db');
  try {
    await db.models.user.create({
      name: res.locals.name,
    })
  } catch (err) {
    next(err)
  }
  return res.send(201);
};
