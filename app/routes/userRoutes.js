var path = require('path');
var appDir = path.dirname(require.main.filename);
var request = require('request');
var moment = require('moment');
var Tweet = require(appDir + '/app/models/tweet');


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
		  	tweetsIndex = [];
		    tweets.forEach(function(item, index){
		    	if(moment(tweets[index].created_at).isAfter(moment().subtract(1,'days')) ){
		    		tweetsIndex.push(tweets[index].id_str);
		    	}
		    })
	    	console.log(tweetsIndex.length);
		    res.render('feed.pug', {tweetsId : tweetsIndex});
		  }
		});


		 //   res.render('feed.pug', {tweetsId : ['780816296233566208']});


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