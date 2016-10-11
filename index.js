const requireClone = require('./lib/require-clone');

// pass along the calling parent so require clone knows how to append the path.
module.exports = function(filename) {
  return requireClone(filename, module.parent.filename);
};

// delete this module from the cache so that the parent module is up to date
delete require.cache[__filename];
