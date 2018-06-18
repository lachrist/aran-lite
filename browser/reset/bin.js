#!/usr/bin/env node
const Minimist = require("minimist");
const AranLiteBrowserReset = require("./index.js");
const options = Minimist(process.argv.slice(2));
AranLiteBrowserReset(options);