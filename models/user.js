const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    username: 'yourname',
    password: 'yourname',
    database: 'test',
    dialect: "postgres",
    host: "localhost",
    port: "5432"
});

const User = sequelize.define("user", {
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