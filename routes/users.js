//import users from './db/users';
var express = require('express');
const Sequelize = require("sequelize");                                                     const sequelize = new Sequelize("test", "yourname", "yourname", {
  dialect: "postgres",
  host: "localhost",
  port: "5432"
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
  })
 users=UserTest.findAll({raw:true}).then(UserTest=>{
  }).catch(err=>console.log("error"));
   
  console.log(users)
  res.render("index", {
    users:users
});
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

  console.log(req.body); // this is what you want           
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




