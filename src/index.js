#!/usr/bin/env node

import fs from 'fs';
import process from 'process';
import path from 'path';
import _ from 'lodash';
import yaml from 'js-yaml';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');
const getFileExtension = (filePath) => path.extname(filePath);

const parseData = (filepath) => {
  const fileExtension = getFileExtension(filepath);
  const fileData = readFile(getAbsolutePath(filepath));

  if (fileExtension === '.json') {
    return JSON.parse(fileData);
  }
  if (fileExtension === '.yml' || fileExtension === '.yaml') {
    return yaml.load(fileData);
  }
  throw new Error(`Unsupported file format: ${fileExtension}`);
};

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
