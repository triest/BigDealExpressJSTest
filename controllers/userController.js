
exports.index = function (req, res) {
  const db = req.app.get('db');
  //console.log(db);
  db.models.user.findAll().then(function (data) {
     res.json(data)
    }).catch(err => console.log(err.toString()));

};


exports.get = function (req, res) {
  const db = req.app.get('db');
  var id = req.params.id;
  if (typeof id != "number") {
    res.send(400)
  }

  db.models.user.findByPk(id).then(data => {
    res.json(data);
  }).catch(err => console.log(err.toString()));
};

exports.editPage = function (req, res) {
  if (typeof req.params.id != "number") {
    res.send(400)
  }

  User.findByPk(req.params.id).then(data => {
    res.render("edit", {
      user: data
    });
  }).catch(err => console.log(err.toString()));
};

exports.update = function (req, res) {
  var idPar = req.params.id;
  var Myname = req.query.name;
  if (typeof idPar != "number" && typeof Myname != "string") {
    res.send(400)
  }

  User.findByPk(idPar).then(data => {
    data.update({ name: Myname })
  });
  res.send("ok");
};

exports.delete = function (req, res) {
  let idPar = req.params.id;
  const db = req.app.get('db');
  /* if (typeof idPar != "number") {
    res.send(400);
  }
  */

 db.models.user.findByPk(idPar).then(data => {
    data.destroy();
  });
  res.send(200);
};

exports.create = function (req, res, next) {

  let data = req.body; // here is your data

  let name = data["name"];
  db.models.user.create({
    name: name,
  }).then(res => {
  }).catch(err => console.log(err));
}

