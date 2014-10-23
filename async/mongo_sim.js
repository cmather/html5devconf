var Future = require('fibers/future');

var findOne = function (sel, callback) {
  // create a new future
  var future = new Future;

  // put this callback function back on the event loop (queue) in 2 seconds.
  // It will execute when it makes its way to the front of the line. This code
  // is called "asynchronous" because it executes at a *later time* on the
  // event loop.
  setTimeout(function () {

    // return a value at the point where we called "wait"
    future.return({title: "My great title!"});
  }, 2000);

  // pause execution of the fiber here. When we return the future, execution
  // will resume at this point, and the value returned from future.wait() will
  // be the parameter passed into future.return. In this case the value will
  // be the object: {title: "My great title"}
  return future.wait();
};

getCollection = function (name, callback) {
  var future = new Future;
  setTimeout(function () {
    console.log("Got collection! " + name);
    future.return({findOne: findOne});
  }, 2000);
  return future.wait();
};

/**
 * Export an object we can use in other files that import this one.
 */
module.exports = {
  getCollection: getCollection
};
