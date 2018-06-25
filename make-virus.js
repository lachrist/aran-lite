const Astring = require("astring");
const Aran = require("aran");
const islower = (string) => string.toLowerCase() === string;
module.exports = (Analysis) => (antena, argm, callback) => {
  const aran = Aran();
  let analysis;
  const defscope = antena.platform === "node" ? ["this", "__dirname", "__filename", "require", "module", "exports"] : ["this"];
  const transform = (script, source) => {
    const estree = analysis.parse(script, source);
    return estree ? Astring.generate(aran.weave(estree, analysis.pointcut, {
      scope: typeof source === "number" ? source : (typeof source === "string" ? defscope : ["this"]),
      sandbox: "SANDBOX" in analysis.advice
    })) : script;
  };
  Analysis({aran, antena, argm, transform}, (error, result) => {
    if (error)
      return callback(error);
    analysis = result;
    analysis.pointcut = analysis.pointcut || Object.keys(analysis.advice).filter(islower);
    global[aran.namespace] = analysis.advice;
    global.eval(Astring.generate(aran.setup()));
    callback(null, transform);
  });
};