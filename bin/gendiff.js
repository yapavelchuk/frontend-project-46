#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('')
  // .option('-V, --version', 'output the version number')
  // .option('-h, --help', 'display help for command');
  
program.parse();