Template.login.events({
    'submit #login-form': function(event, template){
        event.preventDefault();

        var email = trimInput(template.find('#login-email').value);
        var password = template.find('#login-password').value;

        Meteor.loginWithPassword(email, password, function(error){
            if (error){
                // log in attempt failed
                Session.set('loginError', 'E-mail or password incorrect!');
            } else {
                Session.set('loginError', null);
            }
        });

        return false;
    }
});

Template.login.helpers({
    loginError: function(){
        return Session.get('loginError');
    }
});

Template.logout.events({
    'submit #logout-form': function(event){
        event.preventDefault();

        Meteor.logout();

        return false;
    }
});

Template.logout.helpers({
    currentUserName: function(){
        return Meteor.user().emails[0].address;
    }
});

Template.register.events({
    'submit #register-form': function(event, template){
        event.preventDefault();

        var email = trimInput(template.find('#account-email').value);
        var password = template.find('#account-password').value;

        if (!isEmail(email)){
            Session.set('registerEmailError', 'E-mail not valid!');
            return false;
        } else {
            Session.set('registerEmailError', null);
        }

        if (!isValidPasswordLength(password)){
            // the supplied password is not secure
            Session.set('registerPasswordError', 'Your password is too short!');
            return false;
        } else {
            Session.set('registerPasswordError', null);
        }

        Accounts.createUser({
            email: email, 
            password: password
        }, function(error){
            if (error){
                // account creation failed
                Session.set('registerEmailError', 'E-mail already in use!')
            } else {
                // success, logged in
                Session.set('registerEmailError', null);
            }
        });

        return false;
    }
});

Template.register.helpers({
    registerEmailError: function(){
        return Session.get('registerEmailError');
    },

    registerPasswordError: function(){
        return Session.get('registerPasswordError');
    }
});

Template.passwordRecovery.events({
    'submit #recovery-form': function(event, template){
        event.preventDefault();

        var email = trimInput(template.find('#recovery-email').value);

        if (!isEmail(email)){
            Session.set('passwordRecoveryEmailError', 'E-mail not valid!');
            return false;
        }

        Accounts.forgotPassword({email: email}, function(error){
            if (error){
                Session.set('passwordRecoveryEmailError', 'E-mail not found!');
            } else {
                Session.set('passwordRecoveryMessage', 'Password reset e-email sent!')
                Session.set('passwordRecoveryEmailError', null);
            }
        });

        return false;
    },

    'submit #new-password': function(event, template){
        event.preventDefault();

        var password = template.find('#new-password-password').value;

        if(!isValidPasswordLength(password)){
            Session.set('passwordRecoveryNewPasswordError', 'Your password is too short!');
            return false;
        } else {
            Session.set('passwordRecoveryNewPasswordError', null);
        }

        Accounts.resetPassword(Session.get('resetPasswordToken'), password, function(error){
            if (error){
                Session.set('passwordRecoveryNewPasswordError', 'Your password reset has expired!');
            } else {
                Session.set('passwordRecoveryMessage', 'Your password has been updated!');
                Session.set('passwordRecoveryNewPasswordError', null);
                Session.set('resetPasswordToken', null);
            }
        });

        return false;
    }
});

Template.passwordRecovery.helpers({
    passwordRecoveryEmailError: function(){
        return Session.get('passwordRecoveryEmailError');
    },

    passwordRecoveryNewPasswordError: function(){
        return Session.get('passwordRecoveryNewPasswordError');
    },

    passwordRecoveryMessage: function(){
        return Session.get('passwordRecoveryMessage');
    },

    resetPasswordToken: function(){
        return Session.get('resetPasswordToken');
    }
});

if (Accounts._resetPasswordToken){
    Session.set('resetPasswordToken', Accounts._resetPasswordToken);
}