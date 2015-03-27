Meteor.subscribe("customers");

Customers = new Mongo.Collection("customers");

Template.customersMain.events({
    'click #customer-add-button': function(event, target){
        Session.set('showCustomerAddArea', true);

        return false;
    },
});

Template.customersMain.helpers({
    customers:  function(){
        return Customers.find({});
    },

    isCustomerBeingAdded: function(){
        return Session.get('showCustomerAddArea');
    }
});

Template.customerAddForm.events({
    'submit #customer-add-form': function(event, target){
        var newCustomer = {
            firstName: target.find('#first-name').value,
            lastName: target.find('#last-name').value,
            suffix: target.find('#suffix').value,
            country: target.find('#country').value,
            streetAddress: target.find('#street-address').value,
            apartmentNumber: target.find('#apartment-number').value,
            city: target.find('#city').value,
            state: target.find('#state').value,
            zipCode: target.find('#zip-code').value,
            phoneNumber: target.find('#phone-number').value,
            email: target.find('#e-mail').value,
            webAddress: target.find('#web-address').value,
            notes: target.find('#notes').value
        };

        Meteor.call("addCustomer", newCustomer, function(error){
            if(error !== undefined){
                // error with the form
                if(error.error === "logged-out"){
                    // TODO: redirect to log in page
                } else if (error.error === "required-field"){
                    Session.set('addCustomerError', error.reason);
                }
            } else {
                // clear form
                target.$('form')[0].reset();
                Session.set('addCustomerError', null);
            }
        });

        return false;
    },

    'click #cancel-button': function(event, target){
        // clear form
        target.$('form')[0].reset();
        Session.set('addCustomerError', null);

        Session.set('showCustomerAddArea', false);

        return false;
    }
});

Template.customerAddForm.helpers({
    addCustomerError: function(){
        return Session.get('addCustomerError');
    }
});