

var express = require('express');


let CorrectPost = {
  name: 'test'
};

let EmptyPost = {
  name: ''
};


describe("User test", function(){ 
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
    assert.strictEqual(response.statusCode, 201);
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

it('test update', function (done) {
  //send delete
  let lastId;
  request({
    url: host + '/users',
    method: 'get',
    json: false,
  }, function (err, response, body) {
    assert.strictEqual(err, null);
    assert.strictEqual(response.statusCode, 200);
    body = JSON.parse(body);
    console.log(body[0]);
    lastId=body[0].id;
  }); 

  //console.log(lastId)

  request({
    url: host + '/users/'+lastId,
    method: 'put',
    json: false,
  }, function (err, response, body) {
    assert.strictEqual(err, null);
    assert.strictEqual(response.statusCode, 200);
    request({
      url: host + '/users/'+lastId,
      method: 'get',
      json: false,
    }, function (err, response, body) {
      assert.strictEqual(err, null);
      assert.strictEqual(response.statusCode, 200);
    }); 
    done();
  }); 
})

it('test delete', function (done) {
  let lastId;
  request({
    url: host + '/users',
    method: 'get',
    json: false,
  }, function (err, response, body) {
    assert.strictEqual(err, null);
    assert.strictEqual(response.statusCode, 200);
    body = JSON.parse(body);
    console.log(body[0]);
    lastId=body[0].id;
  }); 



  request({
    url: host + '/users/'+lastId,
    method: 'delete',
    json: false,
  }, function (err, response, body) {
    assert.strictEqual(err, null);
    assert.strictEqual(response.statusCode, 200);
    request({
      url: host + '/users/'+lastId,
      method: 'get',
      json: false,
    }, function (err, response, body) {
      assert.strictEqual(err, null);
      assert.strictEqual(response.statusCode, 200);
    }); 
    done();
  }); 
})

});

