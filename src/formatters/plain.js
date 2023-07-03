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
          return iter(node.children, `${path}${node.name}.`);
        case 'added':
          return `Property '${path}${node.name}' was added with value: ${stringify(node.value)}`;
        case 'removed':
          return `Property '${path}${node.name}' was removed`;
        case 'unchanged':
          return [];
        case 'changed':
          return `Property '${path}${node.name}' was updated. From ${stringify(node.valueBefore)} to ${stringify(node.valueAfter)}`;
        default:
          throw new Error(`Unexpected node type: ${node.type}`);
      }
    });
    return result.join('\n');
  };
  return iter(tree, '');
};

export default plain;
