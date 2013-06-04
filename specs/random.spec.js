var Random = require('../random.js');
describe('Random.float', function() {
    it('is a function', function() {
        expect(Random.float).toEqual(jasmine.any(Function));
    });
    it('returns a number', function() {
        expect(Random.float()).toEqual(jasmine.any(Number));
    });
    it('defaults to a float from 0 to less than 1', function() {
        var i,
            val;
        for(i=0; i<1000; i++) {
            val = Random.float();
            expect(val).toBeLessThan(1);
            expect(val).not.toBeLessThan(0);
        }
    });
    it('accepts a single (max) arg', function() {
        var i, val, max;
        max = Math.random()*1000+1; // max > 0
        for(i=0; i<1000; i++) {
            val = Random.float(max);
            expect(val).toBeLessThan(max);
            expect(val).not.toBeLessThan(0);
        }
    });
    it('accepts a min and a max', function() {
        var i, val, min, max;
        min = Math.random()*1000; 
        max = min + Math.random()*1000;
        for(i=0; i<1000; i++) {
            val = Random.float(min,max);
            expect(val).toBeLessThan(max);
            expect(val).not.toBeLessThan(min);
        }
    });
});
describe('Random.int', function() {
    it('is a function', function() {
        expect(Random.int).toEqual(jasmine.any(Function));
    });
    it('returns an int', function() {
        var val = Random.int();
        expect(val).toEqual(jasmine.any(Number));
        expect(Math.floor(val)).toBeCloseTo(val, 20);
    });
    it('accepts a single (sort of max) arg', function() {
        var i, val, max, fmax;
        max = Math.random()*1000+1; // max > 0
        fmax = Math.floor(max);
        for(i=0; i<1000; i++) {
            val = Random.int(max);
            expect(Math.floor(val)).toBeCloseTo(val, 20);
            expect(val).toBeLessThan(fmax);
            expect(val).not.toBeLessThan(0);
        }
    });
    it('accepts a min and a max', function() {
        // return is in range fmin to fmax, inclusive
        var i, 
            val,
            min = Math.random()*1000,
            max = min + Math.random()*1000,
            fmin = Math.floor(min),
            fmax = Math.floor(max);
        for(i = 0; i < 1000; i++) {
            val = Random.int(min, max);
            expect(Math.floor(val)).toBeCloseTo(val, 20);
            expect(val).not.toBeGreaterThan(fmax);
            expect(val).not.toBeLessThan(fmin);
        }
    });
    it('should achieve both min and max', function() {
        var i,
            min = 5,
            max = 10,
            array = [];
        for(i = 500; i -= 1;) {
            array[i] = Random.int(min, max);
        }
        expect(array).toContain(min);
        expect(array).toContain(max);
    });
});
describe('Random.array', function() {
    it('is a function', function() {
        expect(Random.array).toEqual(jasmine.any(Function));
    });
    it('returns an array when called with no arg', function() {
        expect(Random.array().length).toBeDefined();
    });
    it('returns an array when called with a num arg', function() {
        expect(Random.array(10).length).toBeDefined();
    });
    it('uses a provided length', function() {
        var n = Random.int(5,10);
        expect(Random.array(n).length).toEqual(n);
        expect(Random.array(n, Random.int).length).toEqual(n);
    });
    it('uses a provided random function', function() {
        var foo = {
            func: function() {}
        };
        spyOn(foo, 'func').andReturn(1);
        var arr = Random.array(foo.func);
        expect(foo.func).toHaveBeenCalled();
        expect(foo.func.calls.length).toEqual(arr.length);
        var n = Random.int(5,10);
        Random.array(n, foo.func);
        expect(foo.func.calls.length).toEqual(arr.length + n);
    });
    it('uses uses additional provided args', function() {
        var foo = {
            func: function() {}
        };
        spyOn(foo, 'func').andReturn(1);
        var arr = Random.array(foo.func, 1, 2, 3);
        expect(foo.func).toHaveBeenCalledWith(1, 2, 3);
    });
    it('works correctly when provided func is itself', function() {
        var i,
            n = Random.int(5, 10),
            m = Random.int(5, 10),
            foo = {func: function() {}};
        spyOn(foo, 'func').andReturn(1);
        var arr = Random.array(n, Random.array, m, foo.func);
        expect(foo.func.calls.length).toEqual(n * m);
        expect(arr.length).toEqual(n);
        for(i = 0; i < arr.length; i++) {
            expect(arr[i].length).toEqual(m);
        }
    });
});