if (Meteor.isClient) {
  Template.Items.helpers({
    items: function () {
      return Items.find({},{sort:{order:1}});
    }
  });

  Meteor.subscribe('allItems');
}

if (Meteor.isServer) {
  Meteor.publish('allItems', function () {
    return Items.find({},{sort: {order: 1}});
  });

  Meteor.publish('item', function (id) {
    return Items.find({_id: id});
  });
}
