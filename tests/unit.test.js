const userController = require('../controllers/userController.js');

var express = require('express');
var router = express.Router();

const Sequelize = require("sequelize");

var app = express();

const  sequelize = new Sequelize({
    username: 'yourname',
    password: 'yourname',
    database: 'test',
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    logging: console.log
});

describe("User controller test", function(){
  const db = app.get('db');
  db.models.user.destroy();
  let name="testname"
  //add new
  db.models.user.create( {
    name: name,
  }).then(console.log("success created")).catch(err => console.log(err));
  //try wind new
 db.models.user.findOne().then( user => {
}).catch(err => console.log(err.toString()));

 if (name!=user.name){
  throw new Error(`Expected ${name}, but got ${user.name}`);
 }

});
