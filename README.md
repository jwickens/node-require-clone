# require-clone

Get a completely clean copy of a module or package and all its internal dependencies. Use it like you use require.

## Usage

```javascript
const requireClone = require('require-clone')

const myPackage = requireClone('my-package');
```

## Use-case

If you have a dependent module that is returning an object, and that object depends on variables in the top scope of the module, then you can never get an independent clone of that object. Another way of putting it is that your dependency is acting like a singleton but you need multiple independent instances.
