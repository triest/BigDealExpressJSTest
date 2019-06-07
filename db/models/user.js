const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    username: 'qt',
    password: 'allowmetouse',
    database: 'testdb',
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    logging: console.log
});
/*
const sequelize = new Sequelize({
    database: 'expressjs',
    username: 'root',
    password: '',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
});
*/
//module.exports =   function (sequelize, DataTypes) {

// exports.User = (sequelize, DataTypes) => {
    module.exports=(sequelize, DataTypes) => {
       /* sequelize.sync().then(result=>{
            //console.log(result);
          }).catch(err=> console.log(err))*/
        let user = sequelize.define('user',   {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
    }
}, {
        timestamps: true,
        underscored: true,
        tableName: 'users',
        hooks: {
          beforeCreate: (item) => {

          }
        },
        scopes:{
           stat: (filter) => {

          },
          typeStat: (ser_id, c_id) => {

          }
        }
      });
    }


   // return User;



