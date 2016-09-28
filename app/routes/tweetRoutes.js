var path = require('path');
var appDir = path.dirname(require.main.filename);
var request = require('request');
var moment = require('moment');
var Tweet = require(appDir + '/app/models/tweet');
//var Tweet = mongoose.model('Tweet', Tweet);

var Twitter = require('twitter');

module.exports = function(app, passport){

	app.get('/tweet', function(req, res){
		Tweet.find(function (err, tweets) {
		  if (err) return handleError(err);
		  tweetsId = [];
		  tweets.forEach(function(item, index){
		  	tweetsId.push(item.tweet_id);
		  });
		  res.render('tweets.pug', {tweetsId : tweetsId});
		});
	});

	app.post('/tweet', function(req, res){

		console.log("saving tweet...")

		newTweet = new Tweet();
		newTweet.tweet_id = req.body.id;
		console.log(newTweet);

		newTweet.save(function(err) {
	        if (err)
	            throw err;
	        return res.json({ok:"ok"});
	    });
	});

	app.delete('/tweet/:id', function(req, res){

		Tweet.remove({ tweet_id: req.params.id }, function(err) {
			if(!err)
				return res.json({ok:"ok"});
		});
		
	});
}