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
});
