import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree) => {
  const iter = (node, path) => {
    const result = node.flatMap((currentNode) => {
      switch (currentNode.type) {
        case 'nested':
          return iter(currentNode.children, `${path}${currentNode.name}.`);
        case 'added':
          return `Property '${path}${currentNode.name}' was added with value: ${stringify(currentNode.value)}`;
        case 'removed':
          return `Property '${path}${currentNode.name}' was removed`;
        case 'unchanged':
          return [];
        case 'changed':
          return `Property '${path}${currentNode.name}' was updated. From ${stringify(currentNode.valueBefore)} to ${stringify(currentNode.valueAfter)}`;
        default:
          throw new Error(`Unexpected node type: ${currentNode.type}`);
      }
    });
    return result.join('\n');
  };
  return iter(tree, '');
};

export default plain;
