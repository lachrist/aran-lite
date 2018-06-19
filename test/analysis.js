const Acorn = require("acorn");
module.exports = (aran, antena, options, callback) => {
  callback(null, {
    parse: (script, source) => {
      if (source.endsWith("/hello.js")) {
        const estree = Acorn.parse(script, {locations:true});
        estree.source = source;
        return estree;
      }
    },
    advice: {
      binary: (operator, left, right, serial) => {
        antena.request("POST", options["request-path"], {}, "Performing: ("+JSON.stringify(left)+operator+JSON.stringify(right)+") at "+aran.root(serial).source+" line: "+aran.node(serial).loc.start.line);
        return eval("left "+operator+" right");
      }
    }
  });
};