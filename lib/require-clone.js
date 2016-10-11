const Module = require('module');
const path = require('path');

function requireClone(providedPath, parentPath=module.parent.filename){
	let modulePath = getPath(providedPath, parentPath);
	let requiredModule = new Module(modulePath);
	return requiredModule.exports;
}

function getPath(providedPath, parentPath) {
	let modulePath;

	// path is in node_modules
	try {
		require.resolve(providedPath);
		modulePath = providedPath;
	} catch (error) {
		if (error.code !== 'MODULE_NOT_FOUND') throw error;
	}
	// path is relative
  if (!modulePath && path.resolve(providedPath) !== path.normalize(providedPath)) {
    let callerPath = path.dirname(parentPath);
    modulePath = path.join(callerPath, providedPath);
	// path is absolute
  } else {
    modulePath = providedPath;
  }

	return modulePath;
}

module.exports = requireClone;

// delete this module from the cache so that the parent module is up to date
delete require.cache[__filename];
