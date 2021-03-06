var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    linkedin          : {
        id                  : String,
        name                : String,
        displayName         : String,
        token               : String,   
        tokenSecret         : String,
        recruteur           : {type: Boolean, default: false}
    }

});

// checking if password is valid using bcrypt
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// this method hashes the password and sets the users password
userSchema.methods.hashPassword = function(password) {
    var user = this;

    // hash the password
    bcrypt.hash(password, null, null, function(err, hash) {
        if (err)
            return next(err);

        user.local.password = hash;
    });

};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);