if (Meteor.isClient) {
  Template.Items.helpers({
    items: function () {
      return Items.find({},{sort:{order:1}});
    }
  });

  Meteor.subscribe('one');
  Meteor.subscribe('two');
}

if (Meteor.isServer) {
  var Future = Npm.require('fibers/future');

  Meteor.publish('one', function () {
    var future = new Future;

    // send an "added" ddp message
    this.added('items', Random.id(), {title: 'one'});

    // send a "ready" ddp message
    this.ready();

    setTimeout(function () {
      future.return();
    }, 5000);

    // Careful! This will block. Try not to block publish functions by yielding
    // the fiber. For example, don't make external API calls. You can, however,
    // put that code in a setTimeout to make it run outside this current fiber.
    // That will result in not blocking downstream publish functions from
    // running.
    return future.wait();
  });

  Meteor.publish('two', function () {
    this.added('items', Random.id(), {title: 'two'});
    this.ready();
  });


  Meteor.publish('allItems', function () {
    var subscription = this;
    var cursor = Items.find({parentId: 4},{sort: {order: 1}});

    // observeChanges is what hooks DDP up to the Mongo database for real time
    // updates. Every time a document that affects this cursor is added, changed
    // or removed, the corresponding callbacks here will be called. Then
    // the appropriate ddp messages are published to the client. The DDP server
    // takes care of making sure a client doesn't get duplicate messages.
    var handle = cursor.observeChanges({
      added: function (id, doc) {
        subscription.added('items', id, doc);
      },

      changed: function (id, doc) {
        subscription.changed('items', id, doc);
      },

      removed: function (id) {
        subscription.removed(id);
      }
    });

    subscription.ready();

    subscription.onStop(function () {
      handle.stop();
    });
  });

  Meteor.publish('item', function (id) {
    return Items.find({_id: id});
  });
}
