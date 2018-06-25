# aran-lite

[Aran](https://www.npmjs.com/package/aran) and [Otiluke](https://www.npmjs.com/package/otiluke), integrated.

## Analysis

An analysis function receives (i) an aran instance to view the source code (ii) an [isomorphic http client](https://github.com/lachrist/antena) (iii) user-defined options and should asynchronously return a (i) parsing function (ii) an Aran advice (iii) possibly a cleanup function to handle direct eval calls.
The parse function should either return an [`estree.Program` node](https://github.com/estree/estree/blob/master/es2015.md#programs) or a falsy value, in which case the script will still be executed but not analyzed.
An analysis module is a CommonJS module which exports an analysis function.
For instance, the analysis module below establishes a WebSocket connection and uses it to log every `binary` operation performed within files named `main.js` 

```js
const Acorn = require("acorn");
module.exports = ({aran, antena, argm, transform}, callback) => {
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
        eval: transform,
        binary: (operator, left, right, serial) => {
          socket.send("Performing: "+operator+" at "+aran.root(serial).source+" line: "+aran.node(serial).loc.start.line);
          return eval("left "+operator+" right");
        }
      }
    });
  };
};
```

## Analysis API

```js
analysis({aran, antena, argm, transform}, (error, ({parse, advice}) => { ... }));
```

* `aran :: aran.Aran`
  An aran instance which should only be used to call `aran.node(serial)` and `aran.root(serial)`.
* `antena :: antena.Antena`:
  Http(s) isomorphic client.
* `argm :: {string}`:
  User-defined arguments mapping.
  For `aran-lite/node` this will be computed from the command line arguments preceding `--`.
  For `aran-lite/browser` this will be computed from url search parameters statifying the prefix condition.
* `script2 = transform(script1, source)`
  This function is invoked by the framework but the user can also invoke it to support dynamic code evaluation -- i.e.: `eval` calls (direct/indirect), `Function` calls and `<script>` tags insertion.
  * `script1 :: string`:
    Original script.
  * `source :: number || string`:
    The script's source.
    * `number`:
      `script2` will be evaluated within a direct eval call.
    * `string`:
      Normally the user should never have to call `transform` with a string.
      For `aran-lite/node`, it indicates that `script2` will be evaluated as commonjs node module.
      For `aran-lite/browser`, it indicates that `script2` will be evaluated as global code (indirect eval call).
    * `*`
      `script2` will be evaluated as global code (indirect eval call).
  * `script2 :: string`:
    Transformed script.
* `error :: Error`
* `estree = parse(script, source)`:
  This function is called within `transform` to establish whether `script` should be transformed or not.
  * `script :: string`
    Original script as given to `transform`.
  * `source :: number || string`
    The sript's source as given to `transform`.
  * `estree :: estree.Program || falsy`
    A falsy value indicates that the script should not be transformed before evaluation.
* `advice :: aran.Advice`
  An Aran advice.

## `require("aran-lite/node")(analysis, options)`

Deploy an analysis function an a node process, example [here](/test/node).

```js
require("aran-lite/node")(analysis, {host, secure, _:[main_path, ...argv], ...argm});
```

* `analysis :: function`:
  Analysis function.
* `host :: string || number`:
  Host to which the antena should point to.
* `secure :: boolean`:
  Indicates whether the antena should perform secure communication or not.
* `main_path :: string`:
  Path to main module.
* `argv :: [string]`:
  Command line arguments.
* `argm :: {string}`:
  Mapping to pass as `argm` to the analysis

```
aran-lite-node --analysis <path> [--host <host>] [--secure] ... -- <node-command>`
```

## `proxy = require("aran-lite/browser/proxy")(analysis_path, options)`

```js
proxy = require("aran-lite/browser/proxy")(analysis_path, {"ca-home":ca_home, "url-search-key":url_search_key});
```

* `analysis_path :: string`:
  Path to an analysis module.
* `ca_home :: string`:
  Path to a certificate authority directory.
* `url_search_key :: string`
  Prefix to compute `argm`.
