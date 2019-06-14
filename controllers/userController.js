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
  let user;
  try {
    user = await db.models.user.findByPk(res.locals.id);
  } catch (err) {
    return next(err);
  }
  if (!user) {
    return res.send(404)
  }
  return res.json(user);
};

exports.update = async function (req, res, next) {
  const db = req.app.get('db');
  let t;
  try {
    t = await db.transaction();
    let user = await db.models.user.findByPk(res.locals.id, { transaction: t })
    if (user) {
      user.name = res.locals.name;
      await user.save({ transaction: t });
      await t.commit();
      return res.status(200).json(user);
    } else {
      await t.commit();
      return res.sendStatus(404);
    }
  } catch (err) {
    if (t) {
      await t.rollback();
    }
    next(err);
  }
};


exports.delete = async function (req, res, next) {
  const db = req.app.get('db');
  let t;
  try {
    t = await db.transaction();
    let user = await db.models.user.findByPk(res.locals.id, { transaction: t })
    if (!user) {
      await t.commit();
      return res.send(404)
    }
    else {
      await user.destroy({ transaction: t });
      await t.commit();
      return res.send(200);
    }
  } catch (err) {
    if (t) {
      await t.rollback();
    }
    next(err);
  }
};

exports.create = async function (req, res, next) {
  const db = req.app.get('db');
  try {
    return res.status(201).json(await db.models.user.create({
      name: res.locals.name,
    }))
  } catch (err) {
    next(err)
  }
};
