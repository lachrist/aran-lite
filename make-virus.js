const Astring = require("astring");
const Aran = require("aran");
const islower = (string) => string.toLowerCase() === string;
module.exports = (Advice) => (antena, options, callback) => {
  const aran = Aran();
  options.node = aran.node;
  options.root = aran.root;
  Advice(antena, options, (error, advice) => {
    if (error)
      return callback(error);  
    const pointcut = Object.keys(advice).filter(islower);
    global[aran.namespace] = advice;
    global.eval(Astring.generate(aran.setup()));
    callback(null, (script, source) => {
      const estree = advice.PARSE(script, source);
      return estree ?
        Astring.generate(
          aran.weave(
            estree,
            pointcut,
            {
              scope: "window" in global ? "global" : "node",
              sandbox: "SANDBOX" in advice})) :
        script;
    });
  });
};