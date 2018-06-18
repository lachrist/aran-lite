const Path = require("path");
const OtilukeBrowserReset = require("otiluke/browser/reset");
module.exports = (options) => {
  options.ca = options.ca || Path.join(__dirname, "..", "ca");
  OtilukeBrowserReset(options);
};