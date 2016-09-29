var path = require('path');
var appDir = path.dirname(require.main.filename);
var request = require('request');
var moment = require('moment');
var Tweet = require(appDir + '/app/models/tweet');
var User = require(appDir + '/app/models/user');
//var Tweet = mongoose.model('Tweet', Tweet);

var Twitter = require('twitter');

module.exports = function(app, passport, apiAuth){

	app.get('/tweet', function(req, res){
		Tweet.find(function (err, tweets) {
		  if (err) return handleError(err);
		  tweetsId = [];
		  tweets.forEach(function(item, index){
		  	tweetsId.push(item.tweet_id);
		  });
		  res.json({tweetsId : tweetsId});
		});
	});

	app.post('/tweet', function(req, res){

		console.log("saving tweet...")

		user = User.findOne({"id" : id})

		newTweet.save(function(err) {
	        if (err)
	            throw err;
	        return res.json({ok:"ok"});
	    });
	});

	app.get('/tweet/user/:id', function(req, res){
		userId = req.params.id;
		token = req.query.token;
		tokenSecret = req.query.tokenSecret;
		
		var client = new Twitter({
			consumer_key: apiAuth.twitterAuth.consumerKey,
			consumer_secret: apiAuth.twitterAuth.consumerSecret,
			access_token_key: token,
			access_token_secret: tokenSecret
		});

		var params = {screen_name: 'nodejs'};
		client.get('statuses/home_timeline', params, function(error, tweets, response) {
		  if (!error) {
		  	tweetsIndex = [];
		    tweets.forEach(function(item, index){
		    	if(moment(tweets[index].created_at).isAfter(moment().subtract(1,'days')) ){
		    		tweetsIndex.push(tweets[index].id_str);
		    	}
		    })
	    	console.log(tweetsIndex);
		    res.json({tweetsIndex});
		  }
		});

	});

	app.delete('/tweet/:id', function(req, res){

		Tweet.remove({ tweet_id: req.params.id }, function(err) {
			if(!err)
				return res.json({ok:"ok"});
		});
		
	});
}