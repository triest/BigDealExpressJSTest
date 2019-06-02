//import users from './db/users';
//import mysql2 from 'mysql2';

var express = require('express');
const Sequelize = require("sequelize");
var myParser = require("body-parser");
var app = express();


/*const sequelize = new Sequelize("postgres", "postgres", "postgres", {
  dialect: "postgres",
  host: "127.0.0.1",
  port: "5432",
});
*/
/*const sequelize = new Sequelize({
    database: 'db',
    username: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});*/
const sequelize = new Sequelize({
    database: 'expressjs',
    username: 'root',
    password: '',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});

//var users = require('db/users');

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


var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    sequelize.sync().then(result => {
    });
    UserTest.findAll({raw: true}).then(data => {
         res.json(data)
        /*res.render("index", {
            users: data
        });*/
    }).catch(err => console.log("error"));

});

router.get('/:id', function (req, res) {
    sequelize.sync().then(result => {
    });

    var id = req.params.id;

    UserTest.findByPk(id).then(data => {
        res.json( data);
    }).catch(err => console.log(err.toString()));
});

router.get('/edit/:id', function (req, res) {
    sequelize.sync().then(result => {
    });

    var id = req.params.id;

    UserTest.findByPk(id).then(data => {
        res.render("edit", {
            user: data
        });
    }).catch(err => console.log(err.toString()));
    /*   UserTest.update({ name: req.body.name }, {
           where: {
               id: id
           }
       }).then((res) => {
           console.log(res);
       });
   */
});


router.put('/:id', function (req, res) {
    sequelize.sync().then(result => {
    });
    let idPar = req.params.id;
    let name = req.query.name;
    console.log(name);
    UserTest.update(
        {name: name},
        {
            where: {
                id: idPar
            }
        }
    ).then()
        .catch(console.log("err"));
    res.send("ok");
});

router.delete('/:id', function (req, res) {
    let idPar = req.params.id;
    console.log(idPar);
    /*  UserTest.destroy(
          {
              where:{
                  id:idPar
              }
          }
      );
      res.send(idPar);*/
    UserTest.findByPk(idPar).then(data => {
        data.destroy()
    });
    res.send("ok");
});

    /* GET users listing. */
    router.get('/add', function (req, res, next) {
        res.render('add_user', {title: 'Expresqs'});
    });


app.use(myParser.urlencoded({extended : true}));
router.post('/', function (req, res, next) {
        var data = req.body; // here is your data
//    console.log(data);
        var obj=JSON.parse(data);
        console.log(obj.toString());
 //   var body = ""; // request body

  /*  req.on('data', function(data) {
        body += data.toString(); // convert data to string and append it to request body
    });

    req.on('end', function() {
        value = JSON.parse(body); // request is finished receiving data, parse it
    });
     //console.log(value.toString());
    //var body =JSON.parse(req.body);
           // body=JSON.parse(body);
            //console.log(body);

       // var parsedResponse = JSON.parse(req.get_Response());
        //console.log(parsedResponse);
       // var data2=JSON.parse(req.body);
      //  console.log(data2);
       // var res_data = JSON.parse(req.body);
        //console.log(res_data);
        //const user = JSON.parse(data);
        //console.log(user);
        /*sequelize.sync().then(result => {
            //console.log(result);
        }).catch();
      */

        res.toString("ok");
    });

    module.exports = router;




