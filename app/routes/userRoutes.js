var path = require('path');
var appDir = path.dirname(require.main.filename);
var request = require('request');


// Modules
var routing = require(appDir + '/app/routes/routes');
var User = require(appDir + '/app/models/user');

module.exports = function(app, passport){

	app.get('/', function(req, res){
		res.render('index.pug');
	});

	app.get('/profile', routing.isLoggedIn, function(req, res){

		var options = {
			url: 'https://api.twitter.com/1.1/statuses/home_timeline.json',
			headers: {
				'Authorization'	: 'Authorization: OAuth oauth_consumer_key="4ty6jx5zYcTj9GPmP9cHkvJGy", oauth_nonce="26ae56caf27a52a8a9a73eea6f6d8d0b", oauth_signature="7YB5c8u5%2Fk%2FVW3qbtX7Kplreqn4%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="'+req.user.twitter.token+'", oauth_version="1.0"',
				'X-Target-URI'	: 'https://api.twitter.com',
				'Host'	: 'api.twitter.com',
				'Connection'	: 'Keep-Alive'
			}
		};

 
		function callback(error, response, body) {
		  if (!error) {
		    var info = JSON.parse(body);
		    console.log(info);
		  }
		  else
		  	console.log("ERROR")
		  	console.log(error)
		}
		 
		request(options, callback);

		user = req.user;
		//res.render('profile.pug', { user: user.twitter });
	});

	app.post('/profile', function(req, res){
		hobbies = req.body.hobbies;
		userDao.associateHobbies(req.user.user_id, hobbies, function(err){
			res.redirect('/profile');
		});
	});

	app.get('/profile/edit', function(req, res){
		campaignDao.getHobbies(function(err, hobbies){
			if(err){
	 			console.log(err);
	 			res.statusCode = 500;
	 			return res.json({
	 				errors: ['Problème lors de la récupération des hobbies']
	 			});
			}

			res.render('update-peon', {hobbies: hobbies});
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
	    	res.redirect('/profile');
		});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
};