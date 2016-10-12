const fs = require('fs');

const shouldBeTrue = fs.statSync(__filename).isFile();

module.exports = shouldBeTrue;
