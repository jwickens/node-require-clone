const Module = require('module');
const path = require('path');
const fs = require('fs');
const R = require('ramda');

function requireClone(providedPath, parentPath = module.parent.filename) {
    let modulePath = getPath(providedPath, parentPath);
    let requiredModule = new Module(modulePath);
    try {
        fs.statSync(requiredModule.id);
        requiredModule.require = R.curry(requireClone)(R._, requiredModule.id);
        requiredModule.load(requiredModule.id);
        return requiredModule.exports;
    } catch (error) {
				if(error.code == 'ENOENT') return require(modulePath);
				else throw error;
    }
}

function getPath(providedPath, parentPath) {
    let modulePath;

    // path is in node_modules or is native
    try {
        require.resolve(providedPath);
        modulePath = providedPath;
    } catch (error) {
        if (error.code !== 'MODULE_NOT_FOUND') throw error;
    }
    // path is relative
    if (!modulePath && path.resolve(providedPath) !== path.normalize(providedPath)) {
        let callerPath = path.dirname(parentPath);
        modulePath = require.resolve(path.join(callerPath, providedPath));
        // path is absolute
    } else {
        modulePath = require.resolve(providedPath);
    }

    return modulePath;
}

module.exports = requireClone;

// delete this module from the cache so that the parent module is up to date
delete require.cache[__filename];
