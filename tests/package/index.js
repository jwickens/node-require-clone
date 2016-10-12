var a = Math.floor(Math.random * 100)
var b = require('./subdir');

module.exports = {
  a: a,
  b: b.a,
  c: b.b,
  d: b.c
}
