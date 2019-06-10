const userController = require('../controllers/userController.js');

var express = require('express');
var router = express.Router();

const Sequelize = require("sequelize");

//var app = express();

const  sequelize = new Sequelize({
    username: 'qt',
    password: 'allowmetouse',
    database: 'testdb',
    dialect: "postgres",
    host: "localhost",
    port: "5432",
    logging: console.log
});

describe("User controller test", function(){ 
  const assert = require('assert');
  const request = require('request');
 
  request({
    url: host + '/users',
    method: 'POST',
    json: true,
    body: accMock,
   
  }, function (err, response, body) {
    assert.strictEqual(err, null);
    assert.strictEqual(response.statusCode, 200);
   // assert.strictEqual(typeof body, 'json');
  //  assert.strictEqual(body.role.name, 'acceptor');
 //   assert.strictEqual(body.credit_limits instanceof Array, true);

    done();
  }); 

});
