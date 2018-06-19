#!/usr/bin/env node
const Path = require("path");
const Minimist = require("minimist");
const options = Minimist(process.argv.slice(2));
const Analysis = require(Path.resolve(options.analysis));
const command = options._;
const antena_options = {host:options.host, secure:options.secure};
delete options.analysis;
delete options.host;
delete options.secure;
delete options._;
require("./index.js")(Analysis, command, antena_options, options);