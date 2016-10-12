var a = Math.floor(Math.random * 100);
var b = require('../subdir2/test.js');
var c = require('./anotherSubdir/test.js');
module.exports = {
  a: a,
  b: b,
  c: c
};
