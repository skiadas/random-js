// local variable to hold Math.random
var random = Math.random,
    floor = Math.floor,
    maxInt = Math.pow(2,53);

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
    var len = arguments.length;
    if (len === 2) {
        // two args
        // returns a value in range floor(min) to floor(max)
        // assumes max > min (duh)
        return floor(min + random() * (max - min + 1));
    } else if (len === 1) {
        // one argument version 
        // returns a value in range 0 to less than floor(n)
        // assumes n is at least one
        return floor(random() * floor(min));
    }
    // no argument version returns an int in range -maxInt to less than maxInt
    return floor((random() - 0.5) * 2 * maxInt);
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
    console.log("int(5,10) = " , int(5,10));
    console.log("int(10) = " , int(10));
    console.log("int() = ", int());
}