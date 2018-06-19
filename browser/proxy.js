
const OtilukeBrowserProxy = require("otiluke/browser/proxy");
const Fs = require("fs");
const Path = require("path");
const Os = require("os");

module.exports = (apath, options) => {
  const path = Path.join(Os.platform() === "win32" ? process.env.TEMP : "/tmp", "aran-lite-virus-"+Math.random().toString(36).substring(2));
  Fs.writeFileSync(path, [
    `const MakeVirus = require(${JSON.stringify(Path.join(__dirname, "..", "make-virus.js"))});`,
    `const Analysis = require(${JSON.stringify(Path.resolve(apath))});`,
    `module.exports = MakeVirus(Analysis, "browser");`
  ].join("\n"));
  process.on("exit", () => {
    Fs.unlinkSync(path);
  });
  return OtilukeBrowserProxy(path, options);
};
