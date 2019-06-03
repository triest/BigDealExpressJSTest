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
