import fs from 'fs';
import process from 'process';
import path from 'path';
import parseData from './parser.js';
import buildTree from './buildTree.js';
import formatter from './formatters/index.js';

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');
const getFileExtension = (filePath) => path.extname(filePath);

const genDiff = (filepath1, filepath2, format) => {
  const file1Ext = getFileExtension(filepath1).slice(1);
  const file2Ext = getFileExtension(filepath2).slice(1);
  const file1Data = readFile(getAbsolutePath(filepath1));
  const file2Data = readFile(getAbsolutePath(filepath2));

  const parsedData1 = parseData(file1Data, file1Ext);
  const parsedData2 = parseData(file2Data, file2Ext);
  const tree = buildTree(parsedData1, parsedData2);
  return formatter(tree, format);
};

export default genDiff;
