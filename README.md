MineTwitter
===========

Simple way to configure your schema and scheduler from your CLI, and obtain tweets into your local Mongo database.

**P.S: If you are receiving a similar duplicate error on `db.[collection].[$_id_]`, try running `db.collection.dropIndexes()` in a mongo instance.**

Latest Updates: 
===============

- Converted from [commander](https://github.com/mattpat/commander) to [inquirer](https://github.com/SBoudrias/Inquirer.js) for the interface and user experience.
- Updated the streaming functionality to reflect the [recent migration](https://github.com/desmondmorris/node-twitter#migrating-to-1x).
- Organized file structure.

Installation
============

To install the required packages:

`npm install`

Head to Twitter for developers and create a new app. In `./server/config.js` you will notice:

    var client = require('twitter')({
	    consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
    });

Fill those in to have access to Twitter API v1.1 Public Stream.

Running the application
=======================

Make sure you have MongoDB installed, then run this command to start your server instance.

`mongod`

Then run your app with options.

`node miner.js`

Two things to take care of:

- For filtering languages: A list (comma separated) of languages according to Twitter API and [ISO_639-1](http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) standards. Example: `en,eu,ar,fr`.

- For scheduling - [Date(year,month,day,hour,minute,second,millis)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#Example:_Two_digit_years_map_to_1900_-_1999) object (comma separated).

As soon as the server is running, your default browser will lauch to login to Twitter.

Default: [http://localhost:3000/](http://localhost:3000/)

That's it!

Sample Run:
=========

![demo](http://oi57.tinypic.com/2dtqan9.jpg)


###Confirmation:

Saying `Yes` launches the program.
Saying `No` will re-launch the questions.

You are **not** allowed to:

- Enter a start/end time smaller or equal to current time.
- Enter an end date with no start date.
- Enter an end date smaller than start date.

**Notice that months is zero based**

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

- Set up the Tweet Schema from within the console. [FIRST]
- Set up more [scheduler](https://github.com/mattpat/node-schedule) (i.e: Periodic mining) options from console.
- Use [Forever](https://github.com/foreverjs/forever-monitor) programmatically to run application in the background.
- More options (i.e: Port #, Author Name, etc.)
