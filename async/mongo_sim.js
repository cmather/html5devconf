var findOne = function (sel, callback) {
  var future = new Future;
  setTimeout(function () {
    callback(null /* error */, {
      title: "My great title!"
    });
  }, 2000);

  return future.wait();
};

getCollection = function (name, callback) {
  setTimeout(function () {
    console.log("Got collection! " + name);
    callback(null, {
      findOne: findOne
    });
  }, 2000);
};

module.exports = {
  getCollection: getCollection
};
