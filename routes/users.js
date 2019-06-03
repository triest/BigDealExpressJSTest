var express = require('express');
var router = express.Router();
const Sequelize = require("sequelize");
var myParser = require("body-parser");
var app = express();


const userController = require('../controllers/userController.js');


  
// определяем маршруты и их обработчики внутри роутера userRouter
//router.use("/create", userController.addUser);
router.get("/", userController.index);
//app.use("/users", userRouter);

module.exports = router;