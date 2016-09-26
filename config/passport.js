// Absolute path
var path = require('path');
var appDir = path.dirname(require.main.filename);

//Modules
var TwitterStrategy = require('passport-twitter').Strategy;
var configAuth   = require(appDir + '/config/apiAuthentication');
var User         = require(appDir + '/app/models/user');

module.exports = function(passport, pg) {

    passport.serializeUser(function(user, done) {
        done(null, user.u_id);
    });

    passport.deserializeUser(function(id, done) {
        userDao.findById(id, function(err, user) {
            done(err, user);
        });
    });

	passport.use(new TwitterStrategy({
        consumerKey: configAuth.twitterAuth.consumerKey,
        consumerSecret: configAuth.twitterAuth.consumerSecret,
        callbackURL: configAuth.twitterAuth.callbackURL
	  },
        function(token, tokenSecret, profile, cb) {
            User.findOrCreate({ twitterId: profile.id }, function (err, user) {
                return cb(err, user);
        });
        }
	));


};