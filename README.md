# aran-lite

## Advice Function / Module

The advice function receive an [antena](https://github.com/lachrist/antena) (isomorphic http client), 

```js
module.exports = (antena, {node, root, arg1, arg2}, callback) => {
  // Perform setup
  if (something_went_wrong)
    return callback(error);
  callback(null, advice);
}
```

## `require("aran-lite/node")(advice, {_})`

```js
require("aran-lite/node")(advice, {_, host, secure});
```

## `aran-lite-node --advice <path> -- <command>`

```js
require("aran-lite")
```

## `proxy = require("aran-lite/browser/proxy")(advice, {})`