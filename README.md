# aran-lite

[Aran](https://www.npmjs.com/package/aran) and [Otiluke](https://www.npmjs.com/package/otiluke), integrated.

## Analysis Function / Module

An analysis function receives (i) an aran instance to view the source code (ii) an [isomorphic http client](https://github.com/lachrist/antena), (iii) user-defined options and should asynchronously return a parsing function and an Aran advice.
The parse function should either return an [`estree.Program` node](https://github.com/estree/estree/blob/master/es2015.md#programs) or a falsy value, in which case the script will not be analyzed.
An analysis module is a CommonJS module which exports an analysis function.
For instance, the analysis module below establishes a WebSocket connection and uses it to log every `binary` operation performed within files named `main.js`: 

```js
const Acorn = require("acorn");
module.exports = (aran, antena, options, callback) => {
  const websocket = antena.WebSocket();
  websocket.onerror = () => {
    callback(new Error("WebSocket connection error"));
  };
  websocket.onopen = () => {
    websocket.onerror = null;
    callback(null, {
      parse: (script, source) => {
        if (source.endsWith("/main.js")) {
          const estree = Acorn.parse(script, {locations:true});
          estree.source = source;
          return estree;
        }
      },
      advice: {
        binary: (operator, left, right, serial) => {
          socket.send("Performing: "+operator+" at "+aran.root(serial).source+" line: "+aran.node(serial).loc.start.line);
          return eval("left "+operator+" right");
        }
      }
    });
  };
};
```

The analysis function will be called in the following context:

```js
analysis(aran, antena, options, (error, {parse, advice}) => {
  ...
  const estree = parse(script, source);
  ...
});
```

* `aran :: aran.Aran`
* `antena :: antena.Antena`
* `options :: {string}`
* `error :: Error`
* `advice :: aran.Advice`
* `script :: string`
* `source :: string`
* `estree :: estree.Program || null`

## `require("aran-lite/node")(analysis, command, antena_options, analysis_options)`

See the doc for [`require("otiluke/node")`](https://github.com/lachrist/otiluke), the only difference is that the first argument should be an analysis function rather than a virus function.

```js
require("aran-lite/node")(analysis, [main, ...argv], {host, secure}, analysis_options);
```

```
aran-lite-node --analysis <path> [--host <host>] [--secure] ... -- <target-command>`
```

## `proxy = require("aran-lite/browser/proxy")(analysis, options)`

See the doc for [`require("otiluke/node")`](https://github.com/lachrist/otiluke), the only difference is that the first argument should be path to a analysis module rather than a path to a virus module.

```js
proxy = require("aran-lite/browser/proxy")(advice, {"ca-home":ca_home, "url-search-key":url_search_key, "global-variable":global_variable, "http-splitter":http_splitter});
```
