import fs from 'fs';
import path from 'path';
import { test } from '@jest/globals';
import genDiff from '../src/index.js';

const fixturesPath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  '..',
  '__fixtures__',
);

const generateFilePath = (filepath, extension) => {
  const filePath = path.join(fixturesPath, `${filepath}.${extension}`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return {
    filePath,
    fileContent,
  };
};

const stylishResult = generateFilePath('stylishResult', 'txt').fileContent;
const plainResult = generateFilePath('plainResult', 'txt').fileContent;
const jsonResult = generateFilePath('jsonResult', 'txt').fileContent;

const files = [
  {
    file1: 'file1',
    file2: 'file2',
    extension: 'json',
    expectedResult: stylishResult,
  },
  {
    file1: 'file1',
    file2: 'file2',
    extension: 'json',
    format: 'stylish',
    expectedResult: stylishResult,
  },
  {
    file1: 'file1',
    file2: 'file2',
    extension: 'json',
    format: 'plain',
    expectedResult: plainResult,
  },
  {
    file1: 'file1',
    file2: 'file2',
    extension: 'json',
    format: 'json',
    expectedResult: jsonResult,
  },
  {
    file1: 'file1',
    file2: 'file2',
    extension: 'yaml',
    format: 'stylish',
    expectedResult: stylishResult,
  },
  {
    file1: 'file1',
    file2: 'file2',
    extension: 'yaml',
    format: 'plain',
    expectedResult: plainResult,
  },
  {
    file1: 'file1',
    file2: 'file2',
    extension: 'yaml',
    format: 'json',
    expectedResult: jsonResult,
  },
];

test.each(files)('generate difference between %p, %p', ({
  file1, file2, extension, format, expectedResult,
}) => {
  const filePath1 = generateFilePath(file1, extension).filePath;
  const filePath2 = generateFilePath(file2, extension).filePath;
  expect(genDiff(filePath1, filePath2, format)).toBe(expectedResult);
});
