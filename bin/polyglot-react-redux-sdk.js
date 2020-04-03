#!/usr/bin/env node
const chalk  = require('chalk')
const argv = require('yargs').argv

if (argv && argv.config) {
  require = require("esm")(module);
  module.exports = require("../update-default.js").default(argv.config);
} else {
  console.log(chalk.red('Polyglot: No config path provided'))
}
