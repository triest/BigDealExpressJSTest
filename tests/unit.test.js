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

let accMock = {
  name: 'test'
};

describe("User post test", function(){ 
  const assert = require('assert');
  const request = require('request');
  const host="http://127.0.0.1:3000";
  it('should get 200 and create acceptor', function (done) {
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
 //   assert.strictEqual(body.credit_limits instanceof Array, true)
    done();
  }); 
})

});
