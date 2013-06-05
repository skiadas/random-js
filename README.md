# Random.js
Javascript functions for generating random numbers, integers, arrays, and strings.

## Loading
In Node, just use require: 

    var Random = require('random-js');

Other options:

1. script tag in browser
2. AMD loader

## Examples

### Random.float
Produces a random float in a given range.

    Random.float(5,10);     // produces float from 5 to less than 10
    Random.float(8);        // min defaults to 0
    Random.float();         // range defaults to [0,1)

### Random.int
Produces a random int in a given range.

    Random.int(5,10);       // produces int from 5 to 10 inclusive
    Random.int(8);          // an int from 0 to LESS than 8
    Random.int();           // an int from -(2^53) to less than 2^53


### Random.array
Produces an array of random elements.  Accepts a length specifier and 
an optional function to be used for producing random elements.

    Random.array(3);                     // a length-3 array of random floats in [0,1)

The length defaults to a random int in `[0,Random.MAX_ARRAY_LEN]`:   

    Random.array(Random.int);            // a random-length array of random integers
    Random.array(Random.int, 5, 10);     // a random-length array of random ints in [5,10]

It accepts custom functions as well:

    Random.array(8, function(a, b) { return a + b; }, 5, 10);

You can even generate an array of arrays:

    Random.array(Random.array, Random.int, 3, 7); // array of arrays of ints in [3, 7]
    Random.array(Random.array, Random.array);     // array of arrays of arrays!

### Random.string
Produces a random string of specified length and type.  Type defaults to alphanumeric:

    Random.string(5, 'alphanum');   // a length-5 alphanumeric string
    Random.string(5);               // ditto
    Random.string(8, 'alpha');      // a length-8 alphabetic string

Length defaults to a random integer in `[0,Random.MAX_ARRAY_LEN]`:

    Random.string('alpha');         // a random-length alphabetic string
