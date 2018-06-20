#!/usr/bin/env node
const Path = require("path");
const Minimist = require("minimist");
const AranLiteNode = require("./index.js");
const options = Minimist(process.argv.slice(2));
const Analysis = require(Path.resolve(options.analysis));
delete options.analysis;
AranLiteNode(Analysis, options);