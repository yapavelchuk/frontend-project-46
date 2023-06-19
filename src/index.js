#!/usr/bin/env node

import parseData from './parser.js';
import buildTree from './buildTree.js';
import formatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const file1data = parseData(filepath1);
  const file2data = parseData(filepath2);
  const tree = buildTree(file1data, file2data);
  return formatter(tree, format);
};

export default genDiff;
