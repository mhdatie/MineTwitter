var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var models = require('./models');

var app = express();
var open = require('open');



module.exports = function(_config){
	//connect to mongodb and get Schema
	mongoose.connect('mongodb://localhost/'+_config.db);
	
	//--------------------
	var twit = _config.twit;

	app.get('/', twit.gatekeeper('/login'), function(req,res){
		res.json({author:"Mohamad Atie"});
	})
	app.get('/twauth', twit.login());
	app.get('/login', function(req,res){
		res.write("twitter auth required, go back.")
	})

	//start the stream
	require('./stream.js')(_config);


	//Todo: run with forever instead...
	app.listen(3000, function(){
		console.log("App listening on 3000...");
	})

	//start default browser
	open('http://localhost:3000');

	
};



