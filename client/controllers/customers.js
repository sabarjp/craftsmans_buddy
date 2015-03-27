Meteor.subscribe("customers");

Template.customersMain.events({
    'click #customer-add-button': function(){
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

Template.customer.events({
    'click .customer-modify': function(event, template){
        //show edit and delete
        $(event.target).hide();
        template.$('.customer-modify-group').show();
    },

    'click .customer-delete': function(event, template){
        // confirm the deletion
        $(event.target).hide();
        template.$('.customer-edit').hide();
        template.$('.customer-confirm-delete-group').show();
    },

    'click .customer-cancel-delete': function(event, template){
        template.$('.customer-confirm-delete-group').hide();
        template.$('.customer-edit').show();
        template.$('.customer-delete').show();
    },

    'click .customer-confirm-delete': function(event, template){
        template.$('.customer-confirm-delete-group').hide();
        template.$('.customer-edit').show();
        template.$('.customer-delete').show();

        Meteor.call("removeCustomer", this._id, function(error){
            if(error !== undefined){
                // this is bad
                console.log(error.reason);
            }
        });

        return false;
    },
});

Template.customer.helpers({
    showConfirmDelete: function(){
        return Session.get('showConfirmDelete');
    }
});

Template.customerAddForm.rendered = function(){
    $('.ui.dropdown').dropdown();
};

Template.customerAddForm.events({
    'submit #customer-add-form': function(event, template){
        var newCustomer = {
            firstName: template.find('#first-name').value,
            lastName: template.find('#last-name').value,
            suffix: template.find('#suffix').value,
            country: template.find('#country').value,
            streetAddress: template.find('#street-address').value,
            apartmentNumber: template.find('#apartment-number').value,
            city: template.find('#city').value,
            state: template.find('#state').value,
            zipCode: template.find('#zip-code').value,
            phoneNumber: template.find('#phone-number').value,
            email: template.find('#e-mail').value,
            webAddress: template.find('#web-address').value,
            notes: template.find('#notes').value
        };

        Meteor.call("addCustomer", newCustomer, function(error){
            if(error !== undefined){
                // this is bad
                console.log(error.reason);
            } else {
                // clear form
                template.$('form')[0].reset();
                Session.set('addCustomerError', null);
            }
        });

        return false;
    },

    'click #cancel-button': function(event, template){
        // clear form
        template.$('form')[0].reset();
        Session.set('addCustomerError', null);
        Customers.simpleSchema().namedContext().resetValidation();

        Session.set('showCustomerAddArea', false);

        return false;
    }
});

Template.customerAddForm.helpers({
    addCustomerError: function(){
        return Session.get('addCustomerError');
    }
});