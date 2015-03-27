// Meteor.publish definitions

Customers = new Mongo.Collection("customers");

Meteor.publish("customers", function(){
    return Customers.find();
});