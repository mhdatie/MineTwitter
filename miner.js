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


program
  .version('0.0.1')
  .option('-d, --database [name]', 'Add a database (default is "MineTwitter") [name]', 'MineTwitter')
  .option('-f, --track [target]', 'Insert a tracker (no default) [hashtag/statement]')
  .option('-l, --lang <targets>', 'Insert languages (comma separated)', listLang, [])
  .parse(process.argv);

if(!program.track){
	console.log('\n	 -f / --track argument is missing');
	console.log('	Type "node miner.js --help" for help\n');
	process.exit();
}


if (program.database && program.track){
		console.log('	- Database name: %j', program.database);
		console.log('	- Capture: %j', program.track);	

		var lang = ((program.lang.length > 0) ? program.lang : 'any');
		console.log('	- Languages: %j', lang);	

		config.db = program.database;
		config.track = program.track;
		config.lang = program.lang;

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
