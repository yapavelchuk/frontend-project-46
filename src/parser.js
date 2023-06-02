import yaml from 'js-yaml';
import fs from 'fs';
import process from 'process';
import path from 'path';

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

export default parseData;
