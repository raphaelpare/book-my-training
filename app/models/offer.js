var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

// define the schema for our tweet model
var offerSchema = mongoose.Schema({
    title : { type : String , required: true},
    description : { type : String , required: true}
    created_at : Date,
    location_lat: String,
    location_lon: String,
    city		: String
});

// checking if password is valid using bcrypt
offerSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


// this method hashes the password and sets the tweets password
offerSchema.methods.hashPassword = function(password) {
    var tweet = this;

    // hash the password
    bcrypt.hash(password, null, null, function(err, hash) {
        if (err)
            return next(err);

        tweet.local.password = hash;
    });

};

// create the model for tweets and expose it to our app
module.exports = mongoose.model('Offer', offerSchema);