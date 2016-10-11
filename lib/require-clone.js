const stackTrace = require('stack-trace');
const path = require('path');

function deleteRequireCacheForFile(filePath){
	delete require.cache[require.resolve(filePath)];
}

function requireClone(modulePath){
  let filePath;
	// path is in node_modules
	if (require.resolve(modulePath)) {
		filePath = modulePath;
	}
	// path is relative
  else if (path.resolve( modulePath ) !== path.normalize( modulePath )) {
    let callerPath = path.dirname(stackTrace.get()[1].getFileName());
    filePath = path.join(callerPath, modulePath);
	// path is absolute
  } else {
    filePath = modulePath;
  }
	deleteRequireCacheForFile(filePath);
	return require(filePath);
}

module.exports = requireClone;
