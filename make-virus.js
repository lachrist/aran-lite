const Astring = require("astring");
const Aran = require("aran");
const islower = (string) => string.toLowerCase() === string;
module.exports = (analysis) => (antena, options, callback) => {
  const aran = Aran();
  analysis(aran, antena, options, (error, {parse, advice, pointcut}) => {
    if (error)
      return callback(error);
    pointcut = pointcut || Object.keys(advice).filter(islower);
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
              scope: antena.platform === "node" ? "node" : "global",
              sandbox: "SANDBOX" in advice})) :
        script;
    });
  });
};