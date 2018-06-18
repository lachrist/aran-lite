#!/usr/bin/env node
const Minimist = require("minimist");
const options = Minimist(process.argv.slice(2));
const Advice = require(Path.resolve(options.advice));
delete options.advice;
require("./node.js")(Advice, options);