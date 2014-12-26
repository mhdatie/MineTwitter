//runner
var program = require('commander');

var config = require('./config.js').config;
var tweet = require('./config.js').tweet;

var server = require('./server.js');

// var readline = require('readline');

// var rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

program
  .version('0.0.1')
  .option('-d, --database [name]', 'Add a database (default is "MineTwitter") [name]', 'MineTwitter')
  .option('-f, --track [target]', 'Insert a tracker (no default) [hashtag/statement]')
  .parse(process.argv);

if(!program.track){
	console.log('\n	 -f / --track argument is missing');
	console.log('	Type "node miner.js --help" for help\n');
	process.exit();
}


if (program.database && program.track){
		console.log('	- Database name: %j', program.database);
		console.log('	- Capture: %j', program.track);	
		config.db = program.database;
		config.track = program.track;
		//start server
		server(config);
}	
