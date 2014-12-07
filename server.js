var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var models = require('./models');
var app = module.exports = express();

//use cookies if you want the username authenticated.
//var cookies = require('cookies')

//twitter config part
var util = require('util');
var twit = require('twitter')({
	consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

//connect to mongodb and get Schema
mongoose.connect('mongodb://localhost/mineTwitter');
var Tweet = mongoose.model('Tweet');

//--------------------
app.get('/', twit.gatekeeper('/login'), function(req,res){
	res.json({author:"Mohamad Atie"});
})
app.get('/twauth', twit.login());
app.get('/login', function(req,res){
	res.write("twitter auth required, go back.")
})

app.listen(3000, function(){
	console.log("App listening on 3000");
})

//functionality 
twit.stream('filter', {track:'#blackfriday'}, function(stream) {
			    
			stream.on('data', function(data){
			    //inspect the data document with console.log(data)
			   if(!data.retweeted_status){
			   		newTweet(data);
				}else{
					incrementTweet(data.retweeted_status); //update retweet_count by referring to data.id_str
			   }

			});
			stream.on('error', function(err){
			   throw err;
			});
			stream.on('end', function(){
			 	console.log("Stream Disconnected!");
			});
			//setTimeout(stream.destroy, 30000);
});

function newTweet(data){
	Tweet.create({
		_id: data.id_str,
		text: data.text,
		screen_name: data.user.screen_name,
	  	verified: data.user.verified,
	  	followers_count: data.user.followers_count,
	  	image_url: data.user.profile_image_url,
	  	coordinates: (data.geo ? data.geo.coordinates : null), //array
	  	retweet_count: data.retweet_count,
	  	timestamp: data.timestamp_ms
	}, function (err, tweet) {
       if (err) throw err;
    });
};

function incrementTweet(data){
	var id = data.id_str;
	//find tweet and update retweet_count
	Tweet.findByIdAndUpdate(id, {retweet_count: data.retweet_count}, function(err, doc){
		if(err) throw err;
		if(!doc) return newTweet(data); //if doc is not found in database, it is a new tweet
		//console.log(doc); 
	});
};

