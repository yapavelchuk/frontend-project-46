import _ from 'lodash';

const buildTree = (file1, file2) => {
  const allKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
  return allKeys.map((key) => {
    if (!_.has(file1, key)) {
      return {
        name: key,
        type: 'added',
        value: file2[key],
      };
    }
    if (!_.has(file2, key)) {
      return {
        name: key,
        type: 'removed',
        value: file1[key],
      };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return {
        name: key,
        type: 'nested',
        children: buildTree(file1[key], file2[key]),
      };
    }
    if (!_.isEqual(file1[key], file2[key])) {
      return {
        name: key,
        type: 'changed',
        valueBefore: file1[key],
        valueAfter: file2[key],
      };
    }
    return {
      name: key,
      type: 'unchanged',
      value: file1[key],
    };
  });
};

export default buildTree;
