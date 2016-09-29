var path = require('path');
var appDir = path.dirname(require.main.filename);
var request = require('request');
var moment = require('moment');
var Tweet = require(appDir + '/app/models/tweet');
var routing = require(appDir + '/app/routes/routes');
var User = require(appDir + '/app/models/user');


var Twitter = require('twitter');

// Modules

module.exports = function(app, passport){
	app.get('/', function(req, res){
		res.render('index.pug');
	});

	app.get('/user/:id', function(req, res){
		console.log(req.params.id);

        User.findOne({ 'twitter.id' : req.params.id }, function(err, user) {

            if (err)
                return res.json({'kanker':'kanker'})

            if (user) {
				res.status(200)
	        	return res.json(user);

            } else {
            	//204 No Content
            	res.status(204);
            	return res.json({'error':'User not found'})
            }
        });
	});

	app.post('/user', function(req, res){

        var newUser = new User();

        newUser.twitter.id                  = req.body.id;
        newUser.twitter.username            = req.body.username;
        newUser.twitter.displayName         = req.body.displayName;
        newUser.twitter.token               = req.body.token;
        newUser.twitter.tokenSecret         = req.body.tokenSecret;
        newUser.twitter.profile_image_url   = req.body.profile_image_url;
        newUser.twitter.savedTweets			= [];

        newUser.save(function(err) {
            if (err)
                throw err;
            //201 CREATED
			res.writeHead(201, {"Content-Type": "application/json"});
        	return res.end(JSON.stringify(newUser));

        });
        
	});

	app.post('/user/:id', function(req, res){
		userId = req.params.id
		tweetId = req.body.id
		User.findOne({ 'twitter.id' : userId }, function(err, user) {
			savedTweets = user.twitter.savedTweets;

			console.log(savedTweets);
			exists = false;

			savedTweets.forEach(function(tweet, index){
				if(typeof tweet !== 'undefined')
				{
					if(tweetId == tweet){
						exists = true;
					}
				}
			});
			if(!exists){
				savedTweets.push(tweetId);
			}

			User.update( {'twitter.id':userId}, {$set : {'twitter.savedTweets':savedTweets}}, function(error, truc){
				if(!error){
					return res.json({"ok":"ok"})
				}
			});

		});
	});



	app.get('/profile', routing.isLoggedIn, function(req, res){

		res.render('profile.pug', { user: req.user.twitter });
	});

	app.post('/profile', function(req, res){
		hobbies = req.body.hobbies;
		userDao.associateHobbies(req.user.user_id, hobbies, function(err){
			res.redirect('/profile');
		});
	});


	app.get('/auth/twitter',passport.authenticate('twitter'), function(req, res){
		console.log("AUTH");
	});

	//app.post('/auth', passport.authenticate('local', { session: false }), serialize, generateToken, respond);


	app.get('/auth/twitter/callback',
		passport.authenticate('twitter', { failureRedirect: '/' }),
		function(req, res) {
			console.log("AUTH CALLBACK");
	    	res.redirect('/feed');
		});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});

	function sortNumber(a,b) {
		return a - b;
	}
};