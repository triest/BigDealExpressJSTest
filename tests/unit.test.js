const userController = require('../controllers/userController.js');

var express = require('express');
var router = express.Router();

const Sequelize = require("sequelize");

var app = express();




let CorrectPost = {
  name: 'test'
};

let EmptyPost = {
  name: ''
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
    body: CorrectPost,
  }, function (err, response, body) {
    assert.strictEqual(err, null);
    assert.strictEqual(response.statusCode, 200);
    done();
  }); 
})

it('test get', function (done) {  
  request({
    url: host + '/users',
    method: 'get',
    json: false,
  }, function (err, response, body) {
    assert.strictEqual(err, null);
    assert.strictEqual(response.statusCode, 200);
    body = JSON.parse(body);
    assert.strictEqual(typeof body[0].name,'string')
    assert.strictEqual(body[0].name,'test')
    done();
  }); 
})





it('should get 500 and create acceptor', function (done) {    
  request({
    url: host + '/users',
    method: 'POST',
    json: true,
    body: EmptyPost,
  }, function (err, response, body) {
    assert.strictEqual(err, null);
    assert.strictEqual(response.statusCode, 200);
    done();
  }); 
})



});
