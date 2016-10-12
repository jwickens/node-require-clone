const requireClone = require("../lib/require-clone.js");
const should = require('should');

describe("require", function() {

  it("returns the same results when loading the same module twice", function() {
        var a = require("./test-module");
        var b = require("./test-module");
        a.should.be.type('number');
        b.should.be.type('number');
        a.should.equal(b);
  });

  it("handles circular requires ok", function() {
        var a = require("./circular-a-test-module");
        var b = require("./circular-b-test-module");
        a.should.be.type('number');
        b.should.be.type('number');
        a.should.equal(b);
  });
});

describe("require-clone", function() {

    it("returns different results when loading the same module twice", function() {
        var a = requireClone("./test-module");
        var b = requireClone("./test-module");
        a.should.be.type('number');
        b.should.be.type('number');
        a.should.not.equal(b);
    });

    it("still returns different results when loading the same module though a parent module that requires it", function() {
        var a = requireClone("./parent-test-module");
        var b = requireClone("./parent-test-module");
        a.should.be.type('number');
        b.should.be.type('number');
        a.should.not.equal(b);
    });

    it("loads native modules as normal", function() {
      var shouldBeTrue = requireClone('./native-test-module.js');
      shouldBeTrue.should.equal(true);
    });

    it("handles relative paths for children alright", function() {
        var a = requireClone("./relative/parent-relative-test-module");
        var b = requireClone("./relative/parent-relative-test-module");
        a.should.be.type('number');
        b.should.be.type('number');
        a.should.not.equal(b);
    });

    it("handles circular requires ok", function() {
          var a = requireClone("./circular-a-test-module");
          var b = requireClone("./circular-b-test-module");
          a.should.be.type('number');
          b.should.be.type('number');
          a.should.not.equal(b);
    });

    it("works with loading directories", function() {
        var a = requireClone("./package");
        var b = requireClone("./package");
        a.a.should.be.type('number');
        a.b.should.be.type('number');
        a.c.should.be.type('number');
        a.d.should.be.type('number');
        b.a.should.be.type('number');
        b.b.should.be.type('number');
        b.c.should.be.type('number');
        b.d.should.be.type('number');
        a.a.should.not.equal(b.a);
        a.b.should.not.equal(b.b);
        a.c.should.not.equal(b.c);
        a.d.should.not.equal(b.d);
    })
});
