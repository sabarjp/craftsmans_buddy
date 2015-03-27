// Meteor.methods definitions

Meteor.methods({
    addCustomer: function(newCustomer){
        check(newCustomer, {
            firstName: String,
            lastName: String,
            suffix: String,
            country: String,
            streetAddress: String,
            apartmentNumber: String,
            city: String,
            state: String,
            zipCode: String,
            phoneNumber: String,
            email: String,
            webAddress: String,
            notes: String
        });

        // make sure user is logged in
        if (!Meteor.userId()){
            throw new Meteor.Error("logged-out",
                "The user must be logged in to add a customer.");
        }

        if(isStringNullOrEmpty(trimInput(newCustomer.firstName))){
            throw new Meteor.Error("required-field",
                "The first name field is required.");
        }

        if(isStringNullOrEmpty(trimInput(newCustomer.lastName))){
            throw new Meteor.Error("required-field",
                "The last name field is required.");
        }

        Customers.insert({
            firstName: newCustomer.firstName,
            lastName: newCustomer.lastName,
            suffix: newCustomer.suffix,
            phoneNumber: newCustomer.phoneNumber,
            email: newCustomer.email,
            webAddress: newCustomer.webAddress,
            notes: newCustomer.notes,
            createdAt: new Date()
        });
    }
});