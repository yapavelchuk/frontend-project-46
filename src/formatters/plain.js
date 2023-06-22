import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  // if (_.isString(value)) {
  if (typeof value === 'string') {
    return `${value}`;
  }
  return value;
};

const plain = (ast) => {
  const iter = (tree, path) => {
    const result = tree.flatMap((node) => {
      switch (node.type) {
        case 'nested':
          return iter(node.children, `${path}${node.name}.`);
        case 'added':
          return `Property '${path}${node.name}' was added with value: '${stringify(node.value)}'`;
        case 'removed':
          return `Property '${path}${node.name}' was removed`;
        case 'unchanged':
          return [];
        case 'changed':
          return `Property '${path}${node.name}' was updated. From '${stringify(node.valueBefore)}' to '${stringify(node.valueAfter)}'`;
        default:
          throw new Error(`Unexpected node type: ${node.type}`);
      }
    });
    return result.join('\n');
  };
  return iter(ast, '');
};

export default plain;
