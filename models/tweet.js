var mongoose = require('mongoose');

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

module.exports = mongoose.model('Tweet', schema);