// local variable to hold Math.random
var random = Math.random;

// float function will return a random float in a given range 
// min to max
// if just one argument is provided, uses range 0 to arg
// defaults to range 0..1
function float(min, max) {
	if (min === undefined) {
		return random();
	} else if (max === undefined) {
		return random()*min;
	} 		
	return random()*(max - min) + min;	
}

// another version using the list of arguments
function float2(min, max) {
		switch (arguments.length) {
		case 0: return random();
		case 1: return random()*min;
		default: return random()*(max - min) + min;
	}
}

// returns a random integer
function int(min, max) {
	// need to implement this one
}

// create the return module 
module.exports = {
	float: float,
	float2: float2,
	int: int
}

// tests that will not run from "require"
if (require.main === module) {
	console.log("float(5,10) = " , float(5,10));
	console.log("float(10) = " , float(10));
	console.log("float() = ", float());
	console.log("float2(5,10) = " , float2(5,10));
	console.log("float2(10) = " , float2(10));
	console.log("float2() = ", float2());
}