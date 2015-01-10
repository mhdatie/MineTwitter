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

exports.listLang = function listLang(val) {
	var arr = val.split(',');
	return arr;
}

exports.listLangValidation = function(val){
	if (val.length == 0) {
   		return true;
	}
	var arr = val.split(',');
	for (i in arr){
		if(arr[i].length < 2 || arr[i].length > 2){
			return 'Error: "'+arr[i]+'" does not follow the "ISO 639-1" standard.';
		}
	}
	return true;
}

exports.listTime = function listTime(val){
	var arr = val.split(',').map(Number);
	var date = Date.constructDate(arr);
	return date;
}

exports.listTimeValidation = function listTimeValidation(val){
	if(val){
		var arr = val.split(',').map(Number);
		if(arr.length >  Date.length || arr.length < 2){
			return 'Error: Arguments for the date must be between 2 & 7, given "'+arr.length+'"';
		}
		var date = Date.constructDate(arr);
		var now = new Date();
		if(Number(date) <= Number(now)){
			return 'Error: Pick some time in the future, given "'+date+'"'; 
		}
		return true;
	}else{
		return 'Please insert an appropriate date.'; //false is valid
	}
}

//---------------------------------------------------------------------------------------------------------