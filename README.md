MineTwitter
===========

Simple way to configure your Schema and obtain Tweets into your local Mongo database.

Installation
============

To install the required packages:

`npm install`

Head to Twitter for developers and create a new app. In **server.js** you will notice:

    //twitter config part
    var util = require('util');
    var twit = require('twitter')({
	    consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
    });

Fill those in to have access to Twitter API v1.1 Stream

Running the server
==================

Make sure you have MongoDB installed, then run this command to start your server

`mongod`

Then run your app

`node server.js`

Head to [http://localhost:3000/](http://localhost:3000/), and login to Twitter.

That's it!

Todo
====

- Set up the Tweet Schema from within the console.
- Set up a scheduler (i.e: Start/End of Stream)