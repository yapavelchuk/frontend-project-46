import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';
import { expect } from 'expect';

const fixturesPath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  '..',
  '__fixtures__'
);

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');
const filepath = (filepath) => path.join(fixturesPath, filepath);
const expectedPath = (expectedFile) => path.join(fixturesPath, expectedFile);

test('get stylish comparison of JSON files', () => {
  const filepathExpected = expectedPath('stylishResult.txt');
  const expected = readFile(getAbsolutePath(filepathExpected));
  const result = genDiff(filepath('file1.json'), filepath('file2.json'), 'stylish');

  expect(result).toEqual(expected);
});

test('get plain comparison of JSON files', () => {
  const filepathExpected = expectedPath('plainResult.txt');
  const expected = readFile(getAbsolutePath(filepathExpected));
  const result = genDiff(filepath('file1.json'), filepath('file2.json'), 'plain');

  expect(result).toEqual(expected);
});

test('get json comparison of JSON files', () => {
  const filepathExpected = expectedPath('jsonResult.json');
  const expected = readFile(getAbsolutePath(filepathExpected));
  const result = genDiff(filepath('file1.json'), filepath('file2.json'), 'json');

  expect(result).toEqual(expected);
});

test('get stylish comparison of YAML files', () => {
  const filepathExpected = expectedPath('stylishResult.txt');
  const expected = readFile(getAbsolutePath(filepathExpected));
  const result = genDiff(filepath('file1.yml'), filepath('file2.yaml'), 'stylish');

  expect(result).toEqual(expected);
});

test('get plain comparison of YAML files', () => {
  const filepathExpected = expectedPath('plainResult.txt');
  const expected = readFile(getAbsolutePath(filepathExpected));
  const result = genDiff(filepath('file1.yml'), filepath('file2.yaml'), 'plain');

  expect(result).toEqual(expected);
});