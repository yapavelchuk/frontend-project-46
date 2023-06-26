import fs from 'fs';
import path from 'path';
import { expect } from 'expect';
import { test } from '@jest/globals';
import genDiff from '../src/index.js';

const fixturesPath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  '..',
  '__fixtures__',
);

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');
const getFilepath = (filepath) => path.join(fixturesPath, filepath);
const expectedPath = (expectedFile) => path.join(fixturesPath, expectedFile);

const stylishResult = readFile(getAbsolutePath(expectedPath('stylishResult.txt')));
const plainResult = readFile(getAbsolutePath(expectedPath('plainResult.txt')));
const jsonResult = readFile(getAbsolutePath(expectedPath('jsonResult.json')));

const jsonFile1 = getFilepath('file1.json');
const jsonFile2 = getFilepath('file2.json');
const yamlFile1 = getFilepath('file1.yml');
const yamlFile2 = getFilepath('file2.yaml');

test.each([
  {
    file1: jsonFile1, file2: jsonFile2, expectedResult: stylishResult,
  },
  {
    file1: jsonFile1, file2: jsonFile2, format: 'stylish', expectedResult: stylishResult,
  },
  {
    file1: jsonFile1, file2: jsonFile2, format: 'plain', expectedResult: plainResult,
  },
  {
    file1: jsonFile1, file2: jsonFile2, format: 'json', expectedResult: jsonResult,
  },
  {
    file1: yamlFile1, file2: yamlFile2, format: 'stylish', expectedResult: stylishResult,
  },
  {
    file1: yamlFile1, file2: yamlFile2, format: 'plain', expectedResult: plainResult,
  },
  {
    file1: yamlFile1, file2: yamlFile2, format: 'json', expectedResult: jsonResult,
  },
])('test different scenarios', ({
  file1, file2, format, expectedResult,
}) => {
  expect(genDiff(file1, file2, format)).toBe(expectedResult);
});
