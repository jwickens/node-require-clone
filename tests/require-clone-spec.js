const requireClone = require("../lib/require-clone.js");
const should = require('should');

describe("require-clone", function() {
    it("the result of require-clone twice of a module should not be the same", function() {
        var a = requireClone("./test-module");
        var b = requireClone("./test-module");
        a.should.not.equal(b);
    });
});
