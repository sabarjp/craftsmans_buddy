Customers.attachSchema(new SimpleSchema({
    firstName: {
        type: String,
        label: "First name",
        max: 50
    },

    lastName: {
        type: String,
        label: "Last name",
        max: 50
    },

    suffix: {
        type: String,
        label: "Suffix",
        max: 20,
        optional: true
    },

    country: {
        type: String,
        label: "Country",
        max: 100,
        optional: true
    },

    streetAddress: {
        type: String,
        label: "Street address",
        max: 200,
        optional: true
    },

    apartmentNumber: {
        type: String,
        label: "Apartment number",
        max: 20,
        optional: true
    },

    city: {
        type: String,
        label: "City",
        max: 100,
        optional: true
    },

    state: {
        type: String,
        label: "State",
        max: 2,
        optional: true
    },

    zipCode: {
        type: String,
        label: "Zip code",
        max: 20,
        optional: true
    },

    phoneNumber: {
        type: String,
        label: "Phone number",
        max: 50,
        optional: true
    },

    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email,
        label: "E-mail address",
        max: 100,
        optional: true
    },

    webAddress: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        label: "Web address",
        max: 400,
        optional: true
    },

    notes: {
        type: String,
        label: "Notes",
        max: 4000,
        optional: true
    }
}));

Customers.allow({
    insert: function(userId){
        // must be logged in
        return userId !== undefined;
    },

    update: function(userId){
        //must be logged in
        return userId !== undefined;
    },

    remove: function(userId){
        //must be logged in
        return userId !== undefined;
    }
});