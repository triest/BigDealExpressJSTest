//var User = require('../models/user');
//var Sequelize = require("sequelize");

/*
const sequelize = new Sequelize({
    username: 'yourname',
    password: 'yourname',
    database: 'test',
    dialect: "postgres",
    host: "localhost",
    port: "5432"
});

User=require('../db/models/user')
*/

/*
const User = sequelize.define("user", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
    },
});
*/

   exports.index=function(req, res) {
  /*
    const db = req.app.get('db');
      User.findAll({raw: true}).then(data => {
         res.json(data)
    }).catch(err => console.log("error"));
   */
  const db = req.app.get('db');
 // console.log("data")  
   db.models.user.findAll().then(function(data) {
            console.log(data)
       if(data!==""){
            res.json(data)}
        else{
         res.send("empty")
        }
}).catch(err => console.log("error"));
        res.send(err)
   };


    exports.get=function(req, res) {   
        var id = req.params.id;
        if (typeof id != "number" ) {
            res.send(400)
          }

        User.findByPk(id).then(data => {
            res.json( data);
          }).catch(err => console.log(err.toString()));
    };

    exports.editPage=function(req, res) { 
        if (typeof req.params.id != "number" ) {
            res.send(400)
          }

         User.findByPk(req.params.id).then(data => {
            res.render("edit", {
                user: data
            });
    }).catch(err => console.log(err.toString()));  
    };

    exports.update=function(req,res){
         var idPar = req.params.id;
         var Myname = req.query.name;
         if (typeof idPar != "number" && typeof Myname!="string") {
            res.send(400)
          }

           User.findByPk(idPar).then(data => {
            data.update({name:Myname})
            });
        res.send("ok");
    };

    exports.delete=function(req,res){
        let idPar = req.params.id;

        if (typeof idPar != "number" ) {
                res.send(400)
        }

          User.findByPk(idPar).then(data => {
              data.destroy()
              });
        res.send(200);
    };

    exports.create = function (req, res, next) {
        const db = req.app.get('db');
        console.log(db);
        let data = req.body; // here is your data

        let name=data["name"];
        db.models.user.create({
              name: name,
              }).then(res => {
                 }).catch(err => console.log(err));
    }

