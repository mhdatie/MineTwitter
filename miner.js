//runner
var program = require('commander');
var readline = require('readline');
var config = require('./config.js').config;
var tweet = require('./config.js').tweet;
var server = require('./server.js');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//helper methods --- MUST BE MOVED TO HELPERS.JS--------------------------------------------------------------

if (!Function.prototype.constructDate) {
        Function.prototype.constructDate = function(argArray) {
            if (! Array.isArray(argArray)) {
                throw new TypeError("Argument must be an array");
            }
            var constr = this;
            var nullaryFunc = Function.prototype.bind.apply(
                constr, [null].concat(argArray));
            return new nullaryFunc();
        };
}

function listLang(val) {
	var arr = val.split(',');
	for (i in arr){
		if(arr[i].length < 2 || arr[i].length > 2){
			console.log('	! Error: %j does not follow the "ISO 639-1" standard.', arr[i]);
			process.exit();
		}
	}
	return arr;
}

function listTime(val){
	var arr = val.split(',').map(Number);
	if(arr.length >  Date.length || arr.length < 2){
		console.log('	! Error: Arguments for the date must be between 2 & 7, given %j', arr.length); 
		process.exit();
	}
	var date = Date.constructDate(arr);
	var now = new Date();
	if(Number(date) <= Number(now)){
		console.log('	! Error: Pick some time in the future, given ' + date); 
		process.exit();
	}
	return date;
}
//---------------------------------------------------------------------------------------------------------
program
  .version('0.0.1')
  .option('-d, --database [name]', 'Add a database (default is "MineTwitter") [name]', 'MineTwitter')
  .option('-f, --track [target]', 'Insert a tracker (hashtag/statement)')
  .option('-l, --lang <targets>', 'Insert languages (comma separated)', listLang, [])
  .option('-s, --start <date>', 'Schedule a starting date and time (comma separated)', listTime, 0)
  .option('-e, --end <date>', 'Schedule an ending date and time (comma separated)', listTime, 0)
  .parse(process.argv);

if(!program.track){
	console.log('\n	 -f / --track argument is missing');
	console.log('	Type "node miner.js --help" for help\n');
	process.exit();
}

if((!program.start && program.end) || ((program.start && program.end) && (Number(program.end) < Number(program.start)))){
	console.log('	! Error: Check your date option(s)');
	console.log('	- Starts: ' + program.start);
	console.log('	- Ends: ' + program.end);

	process.exit();
}

if (program.database && program.track){
		console.log('	- Database name: %j', program.database);
		console.log('	- Capture: %j', program.track);	

		var lang = ((program.lang.length > 0) ? program.lang : 'any');
		console.log('	- Languages: %j', lang);	

		var start_time = ((program.start) ? program.start : 'not specified');
		var end_time = ((program.end) ? program.end : 'not specified');
		console.log('	- Starts: '+start_time);
		console.log('	- Ends: '+end_time);

		config.db = program.database;
		config.track = program.track;
		config.lang = program.lang;
		config.start = program.start;
		config.end = program.end;

		rl.question("Proceed with the above configurations? (y/n) ", function(answer) {
			if(answer == 'yes' || answer == 'y'){
				console.log("Let the mining start!");
				rl.close();
				//start server
				server(config);
			}else{
				rl.close();
				process.exit();
			}
		});
}	
