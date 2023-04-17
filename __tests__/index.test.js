import url from 'url';
import fs from 'fs';
import path, { dirname } from 'node:path';
// import path from 'path';
import genDiff from '../src/index.js';

// Определяем путь к директории с фикстурами
const fixturesPath = path.join(path.dirname(new URL(import.meta.url).pathname), '../__fixtures__');
const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

// Test case 1: Compare two empty JSON files
// test('Compare two empty JSON files', () => {
//   const filepath1 = path.join(fixturesPath, 'file1.json');
//   const filepath2 = path.join(fixturesPath, 'file2.json');
//   const expected = '{\n}\n';
//   const result = genDiff(filepath1, filepath2);
//   expect(result).toEqual(expected);
// });

// Test case 2: Compare JSON files with identical contents
test('Compare JSON files with identical contents', () => {
  const filepath1 = path.join(fixturesPath, 'file1.json');
  const filepath2 = path.join(fixturesPath, 'file1.json');
  const filepathExpected = path.join(fixturesPath, 'fileexpected.json');
  const expected = JSON.parse(readFile(getAbsolutePath(filepathExpected)));
  // {
  //   "name": "Yana",
  //   "status": true
  // };
  const result = genDiff(filepath1, filepath2);
  expect(result).toEqual(expected);
});

// Test case 3: Compare JSON files with different contents
test('Compare JSON files with different contents', () => {
  const filepath1 = path.join(fixturesPath, 'file1.json');
  const filepath2 = path.join(fixturesPath, 'file3.json');
  const expected = {
    age: 24,
    name: 'Yana',
    status: true
    
  };
  const result = genDiff(filepath1, filepath2);
  expect(result).toEqual(expected);
});
