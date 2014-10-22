Items = new Meteor.Collection('items');

if (Meteor.isServer) {
  Items.remove({});

  for (var i = 0; i < 1000; i++) {
    Items.insert({
      title: "Item " + i,
      subtitle: "A shorter subtitle for item " + i,
      order: i,
      slug: "item-"+i, 
      description: "This is a super long description. The purpose of this description is to have a lot of text. Other than that it really doesn't serve any purpose at all!",

      // simulating some random foreign key 0 - 4
      parentId: i % 5
    });
  }
}
