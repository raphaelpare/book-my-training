// Absolute path
var path = require('path');
var appDir = path.dirname(require.main.filename);

//Modules
var InstagramStrategy = require('passport-twitter').Strategy;
var configAuth   = require(appDir + '/config/apiAuthentication');
var User         = require(appDir + '/app/dal/models/user');
var UserDao      = require(appDir + '/app/dal/userDao');
var userDao      = new UserDao();

module.exports = function(passport, pg) {

    passport.serializeUser(function(user, done) {
        done(null, user.u_id);
    });

    passport.deserializeUser(function(id, done) {
        userDao.findById(id, function(err, user) {
            done(err, user);
        });
    });

	passport.use(new InstagramStrategy({
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