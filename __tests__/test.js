// import { describe, test, expect } from '@jest/globals';
// import fs from 'fs';
// import path from 'path';
import genDiff from '../src/index.js';

describe('genDiff', () => {
  const file1 = path.resolve(__dirname, './__fixtures__/testFile1.json');
  const file2 = path.resolve(__dirname, './__fixtures__/testFile2.json');

  test('must return correct diff for equal files', () => {
    const expected1 = `{
      "education": "Princeton"
      "name": "Leonard Hofstadter"
      "workplace": "Caltech"
  }`;
    const expected2 = `{
      "education": "East Texas Tech"
      "name": "Sheldon Cooper"
      "quote": "BAZINGA!"
      "workplace": "Caltech"
  }`;
    expect(genDiff(file1, file1)).toEqual(expected1);
    expect(genDiff(file2, file2)).toEqual(expected2);
  });

  test('must return correct diff for diff files', () => {
    const expected = `{
     - "education": "Princeton"
     + "education": "East Texas Tech"
     - "name": "Leonard Hofstadter"
     + "name": "Sheldon Cooper"
     + "quote": "BAZINGA!"
      "workplace": "Caltech"
    }`;
    expect(genDiff(file1, file2)).toEqual(expected);
  });
});
