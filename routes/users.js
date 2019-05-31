//import users from './db/users';
var express = require('express');
const Sequelize = require("sequelize");                                                     const sequelize = new Sequelize("test", "qt", "allowmetouse", {
  dialect: "postgres",
  host: "localhost",
  port: "5432"
});                                                                                                                                                                                                                                                                                    
//var users = require('db/users');

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});





var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET users listing. */
router.get('/add', function(req, res, next) {
  res.render('add_user', { title: 'Expresqs' });
});

router.post('/add', function(req, res, next) {
  sequelize.sync().then(result=>{
    console.log(result);
  })
  .catch(err=> console.log(err));

  console.log(req.body); // this is what you want           
  if(!req.body.name) {                                                                                                                                                                                        
    return res.status(400).send({
      success: 'false',
      message: 'title is required'
    })
  };

  User.create({ 
    name: "Bob",                                                                                                                                                                                                                                                          
  }).then(res=>{
    const user = {id: res.id, name: res.name}
    console.log(user);
  }).catch(err=>console.log(err));
});

module.exports = router;




