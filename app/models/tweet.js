var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

// define the schema for our tweet model
var tweetSchema = mongoose.Schema({
    tweet_id : { type : String , unique : true, dropDups: true, required: true},
});

// checking if password is valid using bcrypt
tweetSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


// this method hashes the password and sets the tweets password
tweetSchema.methods.hashPassword = function(password) {
    var tweet = this;

    // hash the password
    bcrypt.hash(password, null, null, function(err, hash) {
        if (err)
            return next(err);

        tweet.local.password = hash;
    });

};

// create the model for tweets and expose it to our app
module.exports = mongoose.model('Tweet', tweetSchema);