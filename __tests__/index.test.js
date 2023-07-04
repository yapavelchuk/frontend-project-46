import fs from 'fs';
import path from 'path';
import { test, describe } from '@jest/globals';
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

const extensions = ['json', 'yaml'];
const formats = ['stylish', 'plain', 'json'];

describe.each(formats)('generate difference using %s format', (format) => {
  test.each(extensions)('for %s files', (extension) => {
    const file1 = `file1.${extension}`;
    const file2 = `file2.${extension}`;

    const file1Path = getFilepath(file1);
    const file2Path = getFilepath(file2);

    const expectedResult = readFile(getAbsolutePath(expectedPath(`${format}Result.txt`)));

    expect(genDiff(file1Path, file2Path, format)).toBe(expectedResult);
  });
});
