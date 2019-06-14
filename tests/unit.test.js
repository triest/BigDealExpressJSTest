

var express = require('express');

//const db = app.get('db');

//var Users = db.models.users;

let CorrectPost = {
  name: 'test'
};

let UpdatePut = {
  name: 'put'
};

var lastid;

describe("User test", function () {
  /* beforeEach((done) => { //Перед каждым тестом чистим базу
     Users.remove({}, (err) => {
       done();
     });
   });
   */

  const assert = require('assert');
  const request = require('request');
  const host = "http://127.0.0.1:3000";
  it('should get 200 and create acceptor', function (done) {
    request({
      url: host + '/users',
      method: 'POST',
      json: true,
      body: CorrectPost,
    }, function (err, response, body) {
      assert.strictEqual(err, null);
      assert.strictEqual(response.statusCode, 201);
      assert.strictEqual(response.body.name, CorrectPost.name)
      lastid = response.body.id;
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
      assert.strictEqual(typeof body[0].name, 'string')
      assert.strictEqual(body[0].name, CorrectPost.name)
      done();
    });
  })

  it('test get single', function (done) {
    request({
      url: host + '/users/' + lastid,
      method: 'get',
      json: false,
    }, function (err, response, body) {
      assert.strictEqual(err, null);
      assert.strictEqual(response.statusCode, 200);
      body = JSON.parse(body);
      assert.strictEqual(typeof body.name, 'string')
      assert.strictEqual(body.name, CorrectPost.name)
      done();
    });
  })

  it('test delete', function (done) {
    request({
      url: host + '/users/' + lastid,
      method: 'DELETE',
      json: true,
    }, function (err, response, body) {
      assert.strictEqual(err, null);
      assert.strictEqual(response.statusCode, 200);
      request({
        url: host + '/users/' + lastid,
        method: 'get',
        json: false,
      }, function (err, response, body) {
        assert.strictEqual(err, null);
        assert.strictEqual(response.statusCode, 404);
      });
      done();
    });
  })

  /*
    it('test update', function (done) {
      let lastId;
      request({
        url: host + '/users/' + lastId,
        method: 'PUT',
        json: true,
        body: UpdatePut,
      }, function (err, response, body) {
        assert.strictEqual(err, null);
        assert.strictEqual(response.statusCode, 201);
        assert.strictEqual(response.body.name, UpdatePut.name)
        lastid = response.body.id;
        done();
      });
    })
  */






});

