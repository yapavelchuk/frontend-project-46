import fs from 'fs';
import process from 'process';
import path from 'path';
import parseData from './parser.js';
import buildTree from './buildTree.js';
import formatter from './formatters/index.js';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);

const getData = (filePath) => {
  const fileExt = path.extname(filePath).slice(1);
  const fileData = fs.readFileSync(getAbsolutePath(filePath), 'utf-8');
  const parsedData = parseData(fileData, fileExt);
  return parsedData;
};

const genDiff = (filepath1, filepath2, format) => {
  const parsedData1 = getData(filepath1);
  const parsedData2 = getData(filepath2);
  const tree = buildTree(parsedData1, parsedData2);
  return formatter(tree, format);
};

export default genDiff;
