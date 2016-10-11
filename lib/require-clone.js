const stackTrace = require('stack-trace');
const path = require('path');

function deleteRequireCacheForFile(filePath){
	delete require.cache[require.resolve(filePath)];
}

function requireClone(modulePath){
  let filePath;
  // if the pth is not absolute use stack trace to find where the calling module meant for it to come from
  if (path.resolve( modulePath ) !== path.normalize( modulePath )) {
    let callerPath = path.dirname(stackTrace.get()[1].getFileName());
    filePath = path.join(callerPath, modulePath);
  } else {
    filePath = modulePath;
  }
	deleteRequireCacheForFile(filePath);
	return require(filePath);
}

module.exports = requireClone;
