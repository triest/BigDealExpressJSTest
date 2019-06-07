
const Sequelize = require("sequelize");

const  sequelize = new Sequelize({
    username: 'qt',
    password: 'allowmetouse',
    database: 'testdb',
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    logging: console.log
});

exports.index =async function (req, res) {
  sequelize.sync().then(result=>{
    //console.log(result);
  })

  .catch(err=> console.log(err))
  
  const db = req.app.get('db');
  t = await db.transaction();
  const o = { transaction: t };
    await db.models.user.findAll(o).then( function (data) {
     res.json(data)
    }, ).catch(err => console.log(err.toString()));
};


exports.get =async function (req, res) {
  sequelize.sync().then(result=>{
    //console.log(result);
  })

  .catch(err=> console.log(err))
  const db = req.app.get('db');

  var id = req.params.id;
  /*if (typeof id != "number") {
    res.send(400)
  }*/
//  t = await db.transaction();
  //const o = { transaction: t };

  await db.models.user.findByPk(id/*,o*/).then( data => {
    res.json(data);
  }).catch(err => console.log(err.toString()));
};

exports.editPage =async function (req, res) {
  if (typeof req.params.id != "number") {
    res.send(400)
  }
  t = await db.transaction();
  //const o = { transaction: t };

 await User.findByPk(req.params.id).then( data => {
    res.render("edit", {
      user: data
    });
  }).catch(err => console.log(err.toString()));
};

exports.update =async function (req, res) {
  sequelize.sync().then(result=>{
    //console.log(result);
  })

  .catch(err=> console.log(err))
  var idPar = req.params.id;
  var Myname = req.query.name;
  if (typeof idPar != "number" && typeof Myname != "string") {
    res.send(400)
  }
  const db = req.app.get('db');
  t = await db.transaction();
  const o = { transaction: t };

  await  db.models.user.findByPk(idPar,o).then( data => {
    data.update({ name: Myname })
  });
  res.send("ok");
};

exports.delete =async function (req, res) {
  sequelize.sync().then(result=>{
    //console.log(result);
  })

  .catch(err=> console.log(err))
  let idPar = req.params.id;
  const db = req.app.get('db');
  t = await db.transaction();
  const o = { transaction: t };
   
   await db.models.user.findByPk(idPar,o).then( data => {
     data.destroy();
     res.send(200);
  }).catch(err=>console.log(err));

};

exports.create =async function (req, res, next) {
  sequelize.sync().then(result=>{
   // console.log(result);
  }).catch(err=> console.log(err))
  const db = req.app.get('db');
  let data = req.body; // here is your data
  t = await db.transaction();
  const o = { transaction: t };
  let name = data["name"];
  console.log(name);
  db.models.user.create({
    name: name,
  }).then(res => {
  }).catch(err => console.log(err));
  res.send(200);
}

