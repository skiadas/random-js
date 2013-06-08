var Random = require('../random.js');
describe('Random.float', function() {
    it('is a function', function() {
        expect(Random.float).to.be.a('function');
        expect(Random).to.respondTo('float');
    });
    it('returns a number', function() {
        expect(Random.float()).to.be.a('number');
    });
    it('defaults to a float from 0 to less than 1', function() {
        var i,
            val;
        for(i=0; i<1000; i++) {
            val = Random.float();
            expect(val).to.be.below(1);
            expect(val).to.be.at.least(0);
        }
    });
    it('accepts a single (max) arg', function() {
        var i, val, max;
        max = Math.random()*1000+1; // max > 0
        for(i=0; i<1000; i++) {
            val = Random.float(max);
            expect(val).to.be.below(max);
            expect(val).to.be.at.least(0);
        }
    });
    it('accepts a min and a max', function() {
        var i, val, min, max;
        min = Math.random()*1000; 
        max = min + Math.random()*1000;
        for(i=0; i<1000; i++) {
            val = Random.float(min,max);
            expect(val).to.be.below(max);
            expect(val).to.be.at.least(min);
        }
    });
});
describe('Random.int', function() {
    it('is a function', function() {
        expect(Random.int).to.be.a('function');
        expect(Random).to.respondTo('int');
    });
    it('returns an int', function() {
        var val = Random.int();
        expect(val).to.be.a('number');
        expect(Math.floor(val)).to.be.closeTo(val, 1e-20)
    });
    it('accepts a single (sort of max) arg', function() {
        var i, val, max, fmax;
        max = Math.random()*1000+1; // max > 0
        fmax = Math.floor(max);
        for(i=0; i<1000; i++) {
            val = Random.int(max);
            expect(Math.floor(val)).to.be.closeTo(val, 1e-20)
            expect(val).to.be.below(fmax);
            expect(val).to.be.at.least(0);
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
            expect(Math.floor(val)).to.be.closeTo(val, 1e-20)
            expect(val).to.be.at.most(fmax);
            expect(val).to.be.at.least(fmin);
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
        expect(array).to.contain(min);
        expect(array).to.contain(max);
    });
});
describe('Random.array', function() {
    it('is a function', function() {
        Random.array.should.be.a('function');
    });
    it('returns an array when called with no arg', function() {
        Random.array().length.should.be.defined;
    });
    it('returns an array when called with a num arg', function() {
        Random.array(10).length.should.be.defined;
    });
    it('uses a provided length', function() {
        var n = Random.int(5,10);
        Random.array(n).length.should.equal(n);
        Random.array(n, Random.int).length.should.equal(n);
    });
    it('uses a provided random function', function() {
        var spy = sinon.stub().returns(1);
        var arr = Random.array(spy);
        spy.should.have.been.called;
        spy.callCount.should.equal(arr.length);
        var n = Random.int(5,10);
        Random.array(n, spy);
        spy.callCount.should.equal(arr.length + n);
    });
    it('uses uses additional provided args', function() {
        var spy = sinon.stub().returns(1);
        var arr = Random.array(spy, 1, 2, 3);
        spy.should.have.been.calledWith(1, 2, 3);
    });
    it('works correctly when provided func is itself', function() {
        var i,
            n = Random.int(5, 10),
            m = Random.int(5, 10),
            spy = sinon.stub().returns(1),
            arr = Random.array(n, Random.array, m, spy);
        spy.callCount.should.equal(n * m);
        arr.length.should.equal(n);
        for(i = 0; i < arr.length; i++) {
            arr[i].length.should.equal(m);
        }
    });
});
describe('Random.string', function() {
    it('is a function', function() {
        expect(Random.string).to.be.a('function');
    });
    it('returns a string in all cases', function() {
        expect(Random.string()).to.be.a('string');
        expect(Random.string(12)).to.be.a('string');
        expect(Random.string('alpha')).to.be.a('string');
        expect(Random.string(5,'alpha')).to.be.a('string');       
    });
    it('uses a provided length', function() {
        var n = Random.int(5,10);
        expect(Random.string(n).length).to.equal(n);
        expect(Random.string(n, 'alpha').length).to.equal(n);
    });
    it('returns the expected type of string', function() {
        var s = Random.string(10000,'alpha');
        expect(s).to.match(/^[a-zA-Z]+$/);  // chars are all alphabetic
        expect(s).to.contain('a');
        expect(s).to.contain('z');
        expect(s).to.contain('A');
        expect(s).to.contain('Z');
        s = Random.string(10000);  // should use alphnum (default)
        expect(s).to.match(/^[a-zA-Z0-9]+$/);  // chars are all alphabetic
        expect(s).to.contain('a');
        expect(s).to.contain('z');
        expect(s).to.contain('A');
        expect(s).to.contain('Z');
        expect(s).to.contain('0');
        expect(s).to.contain('9');
    });
});