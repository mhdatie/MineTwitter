var cli = require('inquirer');
var config = require('./server/config.js').config;
var server = require('./server/server.js');

var helpers = require('./helpers/helperMethods.js');

var questions = [
{
	type: "input",
	name: "database",
	message: "Mongo database name?",
	default: 'MineTwitter'
},
{
	type: "input",
	name: "track",
	message: "What are you mining for?",
	default: '',
	validate: function(answer){
		if(answer === ''){
			return "Please enter a valid search term.";
		}else{
			return true;
		}
	}
},
{
	type: "input",
	name: "lang",
	message: "Insert languages (comma separated)",
	filter: function(val){ 
		if (val.length == 0) {
    		return val;
		}else{
			return helpers.listLang(val)
		}
	},
	default: [],
	validate: helpers.listLangValidation
},
{
	type: "confirm",
	name: "toBeStarted",
	message: "Schedule a starting time?",
	default: false
},
{
	type: "confirm",
	name: "toBeEnded",
	message: "Schedule an ending time?",
	default: false
},
{
	type: "input",
	name: "start",
	message: "Schedule a starting date and time (comma seperated)",
	filter: helpers.listTime,
	default: false,
	when: function( answers ) {
		return (answers.toBeStarted);
	},
	validate: helpers.listTimeValidation
},
{
	type: "input",
	name: "end",
	message: "Schedule an ending date and time (comma seperated)",
	filter: helpers.listTime,
	default: false,
	when: function( answers ) {
		return (answers.toBeEnded);
	},
	validate: helpers.listTimeValidation
},
{
	type: "confirm",
	name: "toUseDefaultSchema",
	message: "Use the default schema?",
	default: true
},
{
	type: "checkbox",
	name: "schema",
	message: "Choose the fields you want to include in your schema:",
	when: function( answers ) {
		return (!answers.toUseDefaultSchema);
	},
	choices: [
			{
				name: "id",
				checked: true
			},
			{
				name: "verfied"
			}
	]
},
{
	type: "confirm",
	name: "confirmation",
	message: "Proceed with the current configuration?",
	default: true
}
];

console.log("\n	- Welcome to MineTwitter =] \n");
startQuestions();


function startQuestions(){
	cli.prompt(questions,function(answers){
		if(answers.confirmation){
			console.log('setting configurations..\n');
			if(((answers.start && answers.end) && (Number(answers.end) < Number(answers.start)))){
				console.log('	! Error: Check your date option(s)');
				console.log('	- Starts: ' + answers.start);
				console.log('	- Ends: ' + answers.end);
				console.log('\nGoing over the questions again.. >=[\n');
				startQuestions();
			}else{
				setConfiguration(answers);
				server(config); //start app
			}
		}else{
			console.log('\nGoing over the questions again.. =[\n');
			startQuestions();
		}
	});
}


var setConfiguration = function(answers){
	config.db = answers.database;
	config.track = answers.track;
	config.lang = answers.lang;
	config.start = answers.start;
	config.end = answers.end;

	if(!answers.toUseDefaultSchema){
		//create schema
	 	config.defaultSchema = false;
	 	//set to config.model
	}
	
};

