const OtilukeNode = require("otiluke/node");
const MakeVirus = require("../make-virus.js");
module.exports = (advice, command, antena_options, virus_options) => {
  OtilukeNode(MakeVirus(advice, "node"), command, antena_options, virus_options);
};