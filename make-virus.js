const Astring = require("astring");
const Aran = require("aran");
const islower = (string) => string.toLowerCase() === string;
module.exports = (analysis, platform) => (antena, options, callback) => {
  const aran = Aran();
  analysis(aran, antena, options, (error, {parse, advice}) => {
    if (error)
      return callback(error);
    const pointcut = Object.keys(advice).filter(islower);
    global[aran.namespace] = advice;
    global.eval(Astring.generate(aran.setup()));
    callback(null, (script, source) => {
      const estree = parse(script, source);
      return estree ?
        Astring.generate(
          aran.weave(
            estree,
            pointcut,
            {
              scope: platform === "node" ? "node" : "global",
              sandbox: "SANDBOX" in advice})) :
        script;
    });
  });
};