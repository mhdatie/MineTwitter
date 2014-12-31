var mongoose = require('mongoose');
var _ = require('underscore');
var Tweet = mongoose.model('Tweet');

module.exports = function(_config){

	var _track = _config.track;
	var _twit = _config.twit;
	var _langs = _config.lang;

	_twit.stream('filter', {track: _track}, function(stream) {
			stream.on('data', function(_data){
				//inspect the _data document with console.log(_data)
				if(_langs.length == 0 || _.contains(_langs ,_data.lang)){
					if(!_data.retweeted_status){
			   			newTweet(_data);
					}else{
						//update retweet_count by referring to _data.id_str
						incrementTweet(_data.retweeted_status); 
			   		}
				}

			});
			stream.on('error', function(err){
			   throw err;
			});
			stream.on('end', function(){
			 	console.log("Stream Disconnected!");
			 	process.exit();
			});
			//setTimeout(stream.destroy, 30000);
	});
};

function newTweet(_data){
	Tweet.create({
		_id: _data.id_str,
		text: _data.text,
		screen_name: _data.user.screen_name,
	  	verified: _data.user.verified,
	  	followers_count: _data.user.followers_count,
	  	image_url: _data.user.profile_image_url,
	  	coordinates: (_data.geo ? _data.geo.coordinates : null), //array
	  	retweet_count: _data.retweet_count,
	  	timestamp: _data.timestamp_ms
	}, function (err, tweet) {
       	if (err) throw err;
    });
};

function incrementTweet(_data){
	var id = _data.id_str;
	//find tweet and update retweet_count
	Tweet.findByIdAndUpdate(id, {retweet_count: _data.retweet_count}, function(err, doc){
		if(err) throw err;
		if(!doc) return newTweet(_data); //if doc is not found in _database, it is a new tweet
		//console.log(doc); 
	});
};
