var path = require('path');
var appDir = path.dirname(require.main.filename);
var request = require('request');



var Twitter = require('twitter');

var client = new Twitter({
	consumer_key: '4ty6jx5zYcTj9GPmP9cHkvJGy',
	consumer_secret: 'JlIWy5nHD96jCZD4TTOCSDbQ9Ltxpf7UbrwB5WFcxCYoD6TILe',
	access_token_key: '1637629183-iP8O5Gr6nTmLKkxwdA8ebPj7ASYOtfemLUEqnti',
	access_token_secret: '7gvBmwpC0JK3eMw0Lkq0weAejJhbOVBecaGaVcCDalVlY'
});

// Modules
var routing = require(appDir + '/app/routes/routes');
var User = require(appDir + '/app/models/user');

module.exports = function(app, passport){

	app.get('/', function(req, res){
		res.render('index.pug');
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

	app.get('/feed', function(req, res){
		var params = {screen_name: 'nodejs'};
		client.get('statuses/home_timeline', params, function(error, tweets, response) {
		  if (!error) {
		    tweets.forEach(function(item, index){
		    	tweets[index] = tweets[index].id
		    })
		    console.log(tweets);
		    res.render('feed.pug', {tweetsId : tweets});
		  }
		});


	})


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
	    	res.redirect('/feed');
		});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
};