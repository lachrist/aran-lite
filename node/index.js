const OtilukeNode = require("otiluke/node");
const MakeVirus = require("../make-virus.js");
module.exports = (analysis, options) => {
  OtilukeNode(MakeVirus(analysis), options);
};