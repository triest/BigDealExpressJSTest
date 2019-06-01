//import users from './db/users';
//import mysql2 from 'mysql2';

var express = require('express');
const Sequelize = require("sequelize");
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
router.get('/', function(req, res, next) {
  sequelize.sync().then(result=>{
  });
 UserTest.findAll({raw:true}).then(data=>{
     res.render("index", {
         users:data
     });
  }).catch(err=>console.log("error"));

});

router.get('/:id', function (request, response) {
    sequelize.sync().then(result=>{
    });

    var id=request.params.id;

    UserTest.findByPk(id).then(data=>{
        res.render("view", {
            user:data
        });
      // console.log(data)
    }).catch(err=>console.log("error"));

   response.render("view",);
});


/* GET users listing. */
router.get('/add', function(req, res, next) {
  res.render('add_user', { title: 'Expresqs' });
});

router.post('/add', function(req, res, next) {
  sequelize.sync().then(result=>{
    //console.log(result);
  })
  .catch(err=> console.log(err));

    sequelize.sync().then(result=>{
        //console.log(result);
    }).catch();


  //console.log(req.body); // this is what you want
  if(!req.body.name) {                                                                                                                                                                                        
    return res.status(400).send({
      success: 'false',
      message: 'title is required'
    })
  };

  UserTest.create({ 
    name: req.body.name,                                                                                                                                                                                                                                              
  }).then(res=>{
    const user = {id: res.id, name: res.name}
  }).catch(err=>console.log(err));

   res.redirect('/users')
});

module.exports = router;




