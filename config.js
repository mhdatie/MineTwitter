//twitter config part
var util = require('util');
var twit = require('twitter')({
	consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});

//use cookies if you want the user authenticated object.
//var cookies = require('cookies')

var config = {
	twit: twit,
	db: '',
	track: '',
	lang: '',
	start: '',
	end: ''
};


exports.config = config;

//default tweet schema. If custom included, overwrite this.
// exports.tweet = tweet;