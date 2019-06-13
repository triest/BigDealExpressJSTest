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
  let id = res.locals.id;
  let name = res.locals.name;
  const db = req.app.get('db');
  try {
    let t = await db.transaction();
    data = await db.models.user.findByPk(id, { transaction: t })
    if (data) {
      data.name = name;
      await data.save();
      return res.sendStatus(200);
    } else {
      return res.sendStatus(404)
    }
  } catch (err) {
    return next(err)
  }
};


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
