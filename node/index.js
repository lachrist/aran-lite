const OtilukeNode = require("otiluke/node");
const MakeVirus = require("./transform.js");
module.exports = (advice, options) => {
  OtilukeNode(MakeVirus(options.advice), options);
};