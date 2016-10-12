const Module = require('module');
const path = require('path');
const fs = require('fs');
const R = require('ramda');


function requireClone(providedPath, parentPath = module.parent.filename) {
    var cache = {};
    return __requireClone(providedPath, parentPath, parentPath, cache);
}

function __requireProxy(providedPath, originalParentPath, parentPath, cache) {
		// if its native or in node_modules then use normal require
		if (nativeOrNodeModules(providedPath)) return require(providedPath);
    // its in the module, go ahead and use the require clone
    else return __requireClone(providedPath, originalParentPath, parentPath, cache);
}

function __requireClone(providedPath, originalParentPath, parentPath, cache) {
    let modulePath = getPath(providedPath, parentPath);
    // handle circular requires with the cache
    if (modulePath in cache) return cache[modulePath].exports;

    // finally load the module if is in the package and not circular
    let requiredModule = new Module(modulePath);
    cache[modulePath] = requiredModule;
    requiredModule.require = R.curry(__requireProxy)(R.__, originalParentPath, requiredModule.id, cache);
    requiredModule.load(requiredModule.id);
    return requiredModule.exports;
}

function nativeOrNodeModules(providedPath) {
  try {
    require.resolve(providedPath);
    return true;
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') throw error;
    return false;
  }
}
function getPath(providedPath, parentPath) {
    try {
    		// path is in node_modules or is native
        let modulePath = require.resolve(providedPath);
        return modulePath;
    } catch (error) {
        if (error.code !== 'MODULE_NOT_FOUND') throw error;
        let callerPath = path.dirname(parentPath);
        let modulePath = require.resolve(path.join(callerPath, providedPath));
				return modulePath
		}
}

module.exports = requireClone;

// delete this module from the cache so that the parent module is up to date
delete require.cache[__filename];
