// // import url from 'url';
// import fs from 'fs';
// import path from 'path';
// import genDiff from '../src/index.js';

// // Определяем путь к директории с фикстурами
// const fixturesPath = path.join(path.dirname(new URL(import.meta.url).pathname), '../__fixtures__');
// const getAbsolutePath = (filePath) => path.resolve(process.cwd(), filePath);
// const readFile = (filePath) => fs.readFileSync(filePath, 'utf-8');

// // test('Compare JSON files with identical contents', () => {
// //   const filepath1 = path.join(fixturesPath, 'file1.json');
// //   const filepath2 = path.join(fixturesPath, 'file1.json');
// //   const filepathExpected = path.join(fixturesPath, 'stylishResult.txt');
// //   const expected = JSON.parse(readFile(getAbsolutePath(filepathExpected)));
// //   // {
// //   //   "name": "Yana",
// //   //   "status": true
// //   // };
// //   const result = genDiff(filepath1, filepath2);
// //   expect(result).toEqual(expected);
// // });

// // Test case 3: Compare JSON files with different contents
// test('Compare JSON files with different contents', () => {
//   const filepath1 = path.join(fixturesPath, 'file1.json');
//   const filepath2 = path.join(fixturesPath, 'file3.json');
//   const filepathExpected = path.join(fixturesPath, 'stylishResult.txt');
//   const expected = JSON.parse(readFile(getAbsolutePath(filepathExpected)));
//   const result = genDiff(filepath1, filepath2);
//   expect(result).toEqual(expected);
// });
import fs from 'fs';
import path from 'path';
import * as jest from 'jest';
import genDiff from '../src/index.js';

const { expect } = jest.default;

// const fixturesPath = path.join(__dirname, '../__fixtures__');
const fixturesPath = path.join(path.dirname(new URL(import.meta.url).pathname), '../__fixtures__');

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
