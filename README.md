MineTwitter
===========

Simple way to configure your Schema and scheduler from your CLI, and obtain tweets into your local Mongo database.

Installation
============

To install the required packages:

`npm install`

Head to Twitter for developers and create a new app. In **config.js** you will notice:

    //twitter config part
    var util = require('util');
    var twit = require('twitter')({
	    consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
    });

Fill those in to have access to Twitter API v1.1 Stream

Running the application
=======================

Make sure you have MongoDB installed, then run this command to start your server instance.

`mongod`

Then run your app with options.

`node miner.js -d [database name] -f [search term(s)] -l [languages]`

`-d` option to speccify DB name. Default is **"MineTwitter"**.

`-f` option to specify a search term.

`-l` option to specify a list (comma separated) of languages according to Twitter API and [ISO_639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) standards. Default is **all languages**.

`node miner.js --help` for a list of all options with usage and description.

As soon as the server is running, your default browser will lauch to login to Twitter.

Default: [http://localhost:3000/](http://localhost:3000/)

That's it!

Default Tweet Schema
====================
    var schema = mongoose.Schema({
       _id: {type: String},
  	   text: { type: String},
  	   screen_name: {type: String},
   	   verified:{type: Boolean},
  	   followers_count:{type: Number},
  	   image_url:{type:String},
  	   coordinates:{type: Array},
  	   retweet_count:{type: Number},
  	   timestamp:{type: Date}
    });

The application will look for retweeted statuses in stream data and do the following:

- If `_id` exists in local database, increment `retweet_count`.
- Else consider it as new tweet.

Todo
====

- Set up a [scheduler](https://github.com/mattpat/node-schedule) (i.e: Start/End of Stream) from console.
- Use [Forever](https://github.com/foreverjs/forever-monitor) programmatically to run application in the background.
- Set up the Tweet Schema from within the console.
- More options (i.e: Port #, Author Name, etc.)
