const fs = require("fs");
const path = require("path");
const _ = require("lodash");
let pg = require("pg");
delete pg.native;
const Sequelize = require("sequelize");

const env = "config";

let config = require("../config/config.json").database;
if (!_.isObject(config)) {
  config = {};
}

let db = new Sequelize("testdb", "qt", "allowmetouse", config.options);

let directory = path.join(__dirname, "models");
fs.readdirSync(directory)
  .filter(function(file) {
    return file.indexOf(".") !== 0;
  })
  .forEach(function(file) {
    db.import(path.join(directory, file));
  });

Object.keys(db.models).forEach(function(modelName) {
  if ("associate" in db.models[modelName]) {
    db.models[modelName].associate(db.models);
  }
});

module.exports = db;
