# require-clone

Get a completely clean copy of a module or package. require-clone circumvents node's cache against packages. Use it like you use require.

## Usage

```javascript
const requireClone = require('require-clone')

const myPackage = require('my-package');
```

## Thanks

Thanks to Adam Lynch for the gist: https://gist.github.com/adam-lynch/11037907

This module takes it a bit further by correctly passing relative paths.
