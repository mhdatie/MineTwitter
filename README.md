MineTwitter
===========

Simple way to configure your Schema and scheduler from your CLI, and obtain tweets into your local Mongo database.

**P.S: If you are receiving a similar duplicate error on db.[collection].[$_id_], try running db.collection.dropIndexes() in a mongo instance.**

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

`-d` option to specify DB name. Default is "MineTwitter".

`-f` option to specify a search term.

`-l` option to specify a list (comma separated) of languages according to Twitter API and [ISO_639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) standards. Default is all languages.

`-s/-e` option to schedule a start/end date as a [Date(year,month,day,hour,minute,second,millis)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Example:_Two_digit_years_map_to_1900_-_1999) object (comma separated). Default is instant start of stream.

`node miner.js --help` for a list of all options with usage and description.

As soon as the server is running, your default browser will lauch to login to Twitter.

Default: [http://localhost:3000/](http://localhost:3000/)

That's it!

Scheduler
=========
Here is an example of a sample run command:

`node miner.js -d test -f "#newyear" -l en,ar -s 2014,11,31,1,20,0,0 -e 2015,0,2,0,46,10,0`

Confirmation:

    - Database name: "test"
	- Capture: "#newyear"
	- Languages: ["en","ar"]
	- Starts: Wed Dec 31 2014 01:20:00 GMT-0500 (EST)
	- Ends: Fri Jan 02 2015 00:46:10 GMT-0500 (EST)
    Proceed with the above configurations? (y/n)

**Notice that months is zero based**

You are **not** allowed to:

- Enter a start/end time smaller or equal to current time.
- Enter an end date with no start date.
- Enter an end date smaller than start date.

If you do not specify start/end time(s), manual interaction will be required. 

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

- Set up more [scheduler](https://github.com/mattpat/node-schedule) (i.e: Periodic mining) options from console.
- Use [Forever](https://github.com/foreverjs/forever-monitor) programmatically to run application in the background.
- Set up the Tweet Schema from within the console.
- More options (i.e: Port #, Author Name, etc.)
