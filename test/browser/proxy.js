const proxy = require("../../browser/proxy.js")("../analysis.js", {
  "ca-home": "../../../otiluke/browser/ca-home"
});
proxy.on("request", require("../request-handler.js"));
proxy.on("error", (error, location, target) => {
  console.log(error.message+" at "+location);
});
proxy.listen(process.argv[2]);