import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';
import { expect } from 'expect';
import { it } from '@jest/globals';

const fixturesPath = path.join(
  path.dirname(new URL(import.meta.url).pathname),
  '..',
  '__fixtures__'
);

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

it('should compare JSON files', () => {
  const filepath1 = path.join(fixturesPath, 'file1.json');
  const filepath2 = path.join(fixturesPath, 'file2.json');
  const filepathExpected = path.join(fixturesPath, 'jsonResult.txt');
  const expectedString = readFile(getAbsolutePath(filepathExpected));
  const expected = expectedString.trim();
  const result = genDiff(filepath1, filepath2);
  expect(result).toEqual(expected);
});

it('should compare YAML files', () => {
  const filepath1 = path.join(fixturesPath, 'file1.yml');
  const filepath2 = path.join(fixturesPath, 'file2.yaml');
  const filepathExpected = path.join(fixturesPath, 'yamlResult.txt');
  const expectedString = readFile(getAbsolutePath(filepathExpected));
  const expected = expectedString.trim();
  const result = genDiff(filepath1, filepath2);
  expect(result).toEqual(expected);
});