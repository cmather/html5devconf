#!/usr/local/bin/node

var mongo = require('./mongo_sim');
var Fiber = require('fibers');

mongo.getCollection('items', function (err, collection) {
  collection.findOne({_id: 5}, function (err, result) {
    console.log("Few! Finally got a result");
    console.log(JSON.stringify(result));
  });
});
