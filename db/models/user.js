const Sequelize = require("sequelize");



    module.exports=(sequelize, DataTypes) => {

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

          },
          getAlldata:(db)=>{
            return new Promise(resolve => {
              db.models.user.findAll().then( function (data) {
                 resolve(data)
               }, ).catch(err => console.log(err.toString()));
            });
          }
        }
      });
    }


