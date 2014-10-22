#!/usr/local/bin/node

var mongo = require('./mongo_sim');
var Fiber = require('fibers');
var Future = require('fibers/future');

/*
mongo.getCollection('items', function (err, collection) {
  collection.findOne({_id: 5}, function (err, result) {
    console.log("Few! Finally got a result");
    console.log(JSON.stringify(result));
  });
});
*/


var tryUsingFibers = function () {
  Fiber(function () {
    var fiber = Fiber.current;

    console.log("about to go async!!!");

    setTimeout(function () {
      fiber.run({title: 'My async result'});
    }, 5000);

    var doc = Fiber.yield();
    console.log("We have a result!");
  }).run();
};

var tryUsingFutures = function () {
  var myFunc = function () {
    var future = new Future;

    setTimeout(function () {
      future.return({title: 'My async result'});
    }, 5000);

    var result = future.wait();
    console.log(result);
  };

  Fiber(myFunc).run();
};

Fiber(function () {
  var collection = mongo.getCollection('items');
  var doc = collection.findOne({_id: 5});
  console.log("doc: " + JSON.stringify(doc));
}).run();
