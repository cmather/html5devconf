#!/usr/local/bin/node

// Import other code modules
var mongo = require('./mongo_sim');
var Fiber = require('fibers');
var Future = require('fibers/future');

/*
 * "Callback hell" is when we have to nest callback functions in order to
 *  control the order of execution. It can get very difficult to read!
 */

/*
Example of callback hell:

mongo.getCollection('items', function (err, collection) {
  collection.findOne({_id: 5}, function (err, result) {
    console.log("Few! Finally got a result");
    console.log(JSON.stringify(result));
  });
});
*/

/**
 * We can use the Fibers library to turn asynchronous code into synchronous
 * code. It makes it easier to read. You can "yield" a fiber which only blocks
 * the code within it, and not the entire event loop.
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

/**
 * Futures is a nice api on top of Fibers and is the preferred way to work with
 * Fibers. Notice the future can "wait" which will yield the current fiber.
 * It can also "return" which will resume execution where we left off with
 * the "wait()" call.
 */
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

/**
 * Here's where we create a fiber and run it. Notice we pass in a function.
 * This is the code that will be executed inside the fiber and can be "paused"
 * by "yielding" the fiber.
 */
Fiber(function () {
  var collection = mongo.getCollection('items');
  var doc = collection.findOne({_id: 5});
  console.log("doc: " + JSON.stringify(doc));
}).run();
