// Meteor.publish definitions

Meteor.publish("customers", function(){
    return Customers.find();
});