const Module = require('module');
const path = require('path');
const fs = require('fs');
const R = require('ramda');


function requireClone(providedPath, parentPath = module.parent.filename) {
    var cache = {};
    return __requireClone(providedPath, parentPath, parentPath, cache);
}

function __requireClone(providedPath, originalParentPath, parentPath, cache) {
    let modulePath = getPath(providedPath, parentPath);

		// if its native then use normal require
		if (!modulePath) return require(providedPath);

    // if its outside of the package then use normal require
    if (path.dirname(parentPath).indexOf(path.dirname(originalParentPath)) < 0) return require(modulePath);
    // handle circular requires with the cache
    if (modulePath in cache) return cache[modulePath].exports;

    // finally load the module if is in the package and not circular
    let requiredModule = new Module(modulePath);
    cache[modulePath] = requiredModule;
    requiredModule.require = R.curry(__requireClone)(R.__, originalParentPath, requiredModule.id, cache);
    if (requiredModule.children)
        requiredModule.load(requiredModule.id);
    return requiredModule.exports;
}

function getPath(providedPath, parentPath) {

    try {
    		// path is in node_modules or is native
        let modulePath = require.resolve(providedPath);
        return false;
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
