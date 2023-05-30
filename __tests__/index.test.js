import fs from 'fs';
import path from 'path';
import * as jest from 'jest';
import genDiff from '../src/index.js';

const { expect } = jest.default;

const fixturesPath = path.join(__dirname, '../__fixtures__');

const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

it('should compare JSON files with different contents', () => {
  const filepath1 = path.join(fixturesPath, 'file1.json');
  const filepath2 = path.join(fixturesPath, 'file3.json');
  const filepathExpected = path.join(fixturesPath, 'stylishResult.txt');
  const expected = JSON.parse(readFile(getAbsolutePath(filepathExpected)));
  const result = genDiff(filepath1, filepath2);
  expect(result).toEqual(expected);
});
