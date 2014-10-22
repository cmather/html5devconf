var Future = require('fibers/future');

var findOne = function (sel, callback) {
  var future = new Future;
  setTimeout(function () {
    future.return({title: "My great title!"});
  }, 2000);

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

module.exports = {
  getCollection: getCollection
};
