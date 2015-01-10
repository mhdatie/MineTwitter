//twitter config part
var util = require('util');
var mongoose = require('mongoose');

var client = require('twitter')({
	consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
});


var config = {
	twit: client,
	db: '',
	track: '',
	lang: '',
	start: '',
	end: '',
	defaultSchema: true
};



exports.config = config;
