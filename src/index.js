#!/usr/bin/env node

import _ from 'lodash';
import parseData from './parser.js';

const genDiff = (filepath1, filepath2) => {
  const file1data = parseData(filepath1);
  const file2data = parseData(filepath2);
  const file1keys = Object.keys(file1data);
  const file2keys = Object.keys(file2data);
  const allKeys = _.union(file1keys, file2keys).sort();

  const diff = allKeys.map((key) => {
    if (!_.has(file2data, key)) {
      return `- ${key}: ${file1data[key]}`;
    }
    if (!_.has(file1data, key)) {
      return `+ ${key}: ${file2data[key]}`;
    }
    if (_.isEqual(file1data[key], file2data[key])) {
      return `  ${key}: ${file2data[key]}`;
    }
    return ` - ${key}: ${file1data[key]}\n  + ${key}: ${file2data[key]}`;
  });
  return `{\n${diff.join('\n')}\n}`;
};

export default genDiff;
