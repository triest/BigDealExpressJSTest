var User = require('../models/user');
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    username: 'yourname',
    password: 'yourname',
    database: 'test',
    dialect: "postgres",
    host: "localhost",
    port: "5432"
}); 

const UserTest = sequelize.define("userTest", {
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


   exports.index=function(req, res) {   
    sequelize.sync().then(result => {
    });
    UserTest.findAll({raw: true}).then(data => {
         res.json(data)
        /*res.render("index", {
            users: data
        });*/
    }).catch(err => console.log("error"));

    }

    exports.get=function(req, res) {   
        sequelize.sync().then(result => {
        });
        var id = req.params.id;
        UserTest.findByPk(id).then(data => {
            res.json( data);
          }).catch(err => console.log(err.toString()));
    }

    exports.editPage=function(req, res) { 
        sequelize.sync().then(result => {
        });
         UserTest.findByPk(req.params.id).then(data => {
            res.render("edit", {
                user: data
            });
    }).catch(err => console.log(err.toString()));  
    }

    exports.update=function(req,res){
        sequelize.sync().then(result => {
        });
        var data = req.body; // here is your data
        let idPar = req.params.id;
        let Myname = req.query.name;
       // console.log(Myname);
           UserTest.findByPk(idPar).then(data => {
            data.update({name:data["name"]})
            });
                  
    }

    exports.delete=function(req,res){
        let idPar = req.params.id;
        console.log(idPar);
          UserTest.findByPk(idPar).then(data => {
              data.destroy()
              });
        res.send("ok");
    }

    exports.post=function(req, res) {  
        var data = req.body; // here is your data
        if (data["name"]==""){
              res.send("empty");
          }
          sequelize.sync().then(result => {
          }).catch();
        UserTest.create({
              name: data["name"],
          }).then(res => {
              const user = {id: res.id, name: res.name}
          }).catch(err => console.log(err));
         res.send(200);     
     }
