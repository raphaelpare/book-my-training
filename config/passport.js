// Absolute path
var path = require('path');
var appDir = path.dirname(require.main.filename);

//Modules
var TwitterStrategy = require('passport-twitter').Strategy;
var configAuth   = require(appDir + '/config/apiAuthentication');
var User         = require(appDir + '/app/models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

	passport.use(new TwitterStrategy({
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL
	  },
        function(token, tokenSecret, profile, done) {
            process.nextTick(function() {
                User.findOne({ 'twitter.id' : profile.id }, function(err, user) {

                    // if there is an error, stop everything and return that
                    // ie an error connecting to the database
                    if (err)
                        return done(err);

                    // if the user is found then log them in
                    if (user) {
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser = new User();


                        // set all of the user data that we need
                        newUser.twitter.id                  = profile.id;
                        newUser.twitter.token               = token;
                        newUser.twitter.username            = profile.username;
                        newUser.twitter.profile_image_url   = profile._json.profile_image_url;

                        // save our user into the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            var setCookie = cookie.serialize('foo', 'bar');
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
	));
};