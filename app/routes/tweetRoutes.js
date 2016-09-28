var path = require('path');
var appDir = path.dirname(require.main.filename);
var request = require('request');
var moment = require('moment');
var Tweet = require(appDir + '/app/models/tweet');
//var Tweet = mongoose.model('Tweet', Tweet);

var Twitter = require('twitter');

module.exports = function(app, passport){

	app.get('/tweet', function(req, res){
		console.log("ok");
/*
		Tweet.findOne(function (err, tweet) {
		  if (err) return handleError(err);
		  console.log(tweet) // Space Ghost is a talk show host.
		});
		*/
	});

	app.post('/tweet', function(req, res){

		console.log("saving tweet...")

		newTweet = new Tweet();
		newTweet.tweet_id = req.body.id;
		console.log(newTweet);
/*
		newTweet.save(function(err) {
	        if (err)
	            throw err;
	        return res.json({ok:"ok"});
	    });
	    */
	});
}