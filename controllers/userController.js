
const Sequelize = require("sequelize");

const  sequelize = new Sequelize({
    username: 'yourname',
    password: 'yourname',
    database: 'test',
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    logging: console.log
});

exports.index =async function (req, res) {
  sequelize.sync().then(result=>{
  }).catch(err=> console.log(err));
  const db = req.app.get('db');
 await db.models.user.findAll().then( function (data) {
     res.json(data)
    }).catch(err => console.log(err.toString()));
};


exports.get =async function (req, res) {
  const db = req.app.get('db');

  var id = req.params.id;
  if (typeof id != "number") {
    res.send(400)
  }

  await db.models.user.findByPk(id).then( data => {
    res.json(data);
  }).catch(err => console.log(err.toString()));
};

exports.editPage =async function (req, res) {
  if (typeof req.params.id != "number") {
    res.send(400)
  }

 await User.findByPk(req.params.id).then( data => {
    res.render("edit", {
      user: data
    });
  }).catch(err => console.log(err.toString()));
};

exports.update =async function (req, res) {
  var idPar = req.params.id;
  var Myname = req.query.name;
  if (typeof idPar != "number" && typeof Myname != "string") {
    res.send(400)
  }
  const db = req.app.get('db');
  await  db.models.user.findByPk(idPar).then( data => {
    data.update({ name: Myname })
  });
  res.send("ok");
};

exports.delete =async function (req, res) {
  let idPar = req.params.id;
  const db = req.app.get('db');

   await db.models.user.findByPk(idPar).then( data => {
     data.destroy();
  });
  res.send(200);
};

exports.create =async function (req, res, next) {
  const db = req.app.get('db');
  let data = req.body; // here is your data

  let name = data["name"];
 await db.models.user.create( {
    name: name,
  }).then(res => {
    res.send(200)
  }).catch(err => console.log(err));
}

