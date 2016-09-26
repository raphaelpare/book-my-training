var path = require('path');
var appDir = path.dirname(require.main.filename);

// Modules
var routing = require(appDir + '/app/routes/routes');
var User = require(appDir + '/app/models/user');

module.exports = function(app, passport){

	app.get('/', function(req, res){
		res.render('index.pug');
	});

	app.get('/profile', routing.isLoggedIn, function(req, res){
		user = req.user; 
		json = '{"user": {'+ 
			'"u_id": "'+user.u_id+'",'+ 
			'"token": "'+user.token+'",'+ 
			'"username": "'+user.username+'",'+ 
			'"profilePictureUrl": "'+user.profilePictureUrl+'",'+ 
			'"followersCount": '+user.followersCount+','+ 
			'"followingCount": '+user.followingCount+ 
		'}}'; 
		//res.json(JSON.parse( json )); 
		res.render('profile.ejs', { json: JSON.parse(json), user: req.user });
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
			console.log(req.user);
	    	res.redirect('/profile');
		});

	app.get('/logout', function(req, res){
		req.logout();
		res.redirect('/');
	});
};