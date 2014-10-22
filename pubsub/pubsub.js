if (Meteor.isClient) {
}

if (Meteor.isServer) {
  Meteor.publish('allItems', function () {
    debugger;
    return Items.find({},{sort: {order: 1}});
  });

  Meteor.publish('item', function (id) {
    return Items.find({_id: id});
  });
}
