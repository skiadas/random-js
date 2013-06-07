'use strict';
/* global define */
// if the module has no dependencies, the above pattern can be simplified to
(function (root, factory) {
    if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like enviroments that support module.exports,
        // like Node.
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else {
        // Browser globals (root is window)
        root.Random = factory();
    }
}(this, function () {
    // local variable to hold Math.random
    var random = Math.random,
        floor = Math.floor,
        maxInt = Math.pow(2, 53),
        unbSlice = Array.prototype.slice,
        slice = Function.prototype.call.bind(unbSlice);

    // float function will return a random float in a given range 
    // min to max
    // if just one argument is provided, uses range 0 to arg
    // defaults to range 0..1
    function float(min, max) {
        if (min === undefined) {
            return random();
        } else if (max === undefined) {
            return random() * min;
        }
        return random() * (max - min) + min;
    }

    // another version using the list of arguments
    function float2(min, max) {
        switch (arguments.length) {
        case 0:
            return random();
        case 1:
            return random() * min;
        default:
            return random() * (max - min) + min;
        }
    }

    // returns a random integer
    function int(min, max) {
        var len = arguments.length;
        if (len === 2) {
            // two args
            // returns a value in range floor(min) to floor(max)
            // assumes max > min (duh)
            min = floor(min);
            max = floor(max);
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

    // returns a random array
    function array(n, fun) {
        // no arg
        // returns an array of random floats in 0 to 1
        // random length, <= 1000??

        // one arg, a number
        // returns an array of random floats in 0 to 1
        // length  is floor(n)

        // one or more args, first is a function
        // returns an array filled with values using that function and parameters
        // random length, <= 1000??

        // two or more args, first is a number
        // returns an array of length floor(n) using the given function

        var args = slice(arguments),
            len = args.length,
            result = [],
            i;
        // set args[0] to n if needed
        if (len === 0 || args[0].call) {
            args.unshift(this.int(this.MAX_ARRAY_LEN + 1));  // "this" is our rand object
        }
        // set args[1] to float function if needed
        args[1] = (args[1] || this.float);
        n = args.shift();
        fun = args.shift();
        for (i = n; i--;) {
            result[i] = fun.apply(this, args);
        }
        return result;
    }
    // returns an ASCII code for random length-1 string
    function _char(type) {
        var n = int(65, 90),  // caps
            lc = int(0, 1),   // 1 for lowercase
            d = int(48, 57);  // digit
        switch (type) {
        case 'alpha':
            return n + lc * 32;
        case 'alphanum': 
            /*falls through*/
        default:
            // 10/62 chance of a digit
            return (random() < 10/62) ? d : (n + 32 * lc);
        }
    }
    // returns a random string of specified length and type
    function string(n, type) {
        // expecting n to be a whole number, type a string
        var args = slice(arguments);
        args.splice((typeof args[0] === 'number') ? 1 : 0, 0, _char);
        return String.fromCharCode.apply(String, this.array.apply(this,args));
    }
    // create the return module 
    return {
        float: float,
        float2: float2,
        int: int,
        array: array,
        string: string,
        MAX_ARRAY_LEN: 20
    };
}));