/*
module.exports = function User(u_id, token, username, profilePictureUrl){

    // The user's id
    this.user_id = 0;

    // The user's twitter id
    this.u_id = u_id;

    // The token returned by the twitter API
	this.token = token

    // The user's twitter username
	this.username = username;

    // The URL for the user's twitter profile picture
    this.profilePictureUrl = profilePictureUrl;
}

*/


var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

// define the schema for our user model
var userSchema = mongoose.Schema({
    twitter          : {
        id           : String,
        twitter_id           : String,
        token        : String,
        username     : String,
        profilePictureUrl  : String
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