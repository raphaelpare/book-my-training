// Absolute path
var path = require('path');
var appDir = path.dirname(require.main.filename);

//Modules
var LinkedinStrategy = require('passport-linkedin').Strategy;
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

	passport.use(new LinkedinStrategy({
        consumerKey: configAuth.linkedinAuth.consumerKey,
        consumerSecret: configAuth.linkedinAuth.consumerSecret,
        callbackURL: configAuth.linkedinAuth.callbackURL
	  },
        function(token, tokenSecret, profile, done) {
            process.nextTick(function() {
                console.log(profile);
                User.findOne({ 'linkedin.id' : profile.id }, function(err, user) {

                    if (err)
                        return done(err);

                    if (user) {
                        return done(null, user); 
                    } else {
                        var newUser = new User();


                        newUser.linkedin.id                  = profile.id;
                        newUser.linkedin.token               = token;
                        newUser.linkedin.name                = JSON.stringify(profile.name);
                        newUser.linkedin.displayName         = profile.displayName;

                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
	));
};