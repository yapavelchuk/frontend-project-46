import _ from 'lodash';

const generateSpacesWithSign = (depth) => ' '.repeat(depth * 4 - 2);
const generateSpacesWithoutSign = (depth) => ' '.repeat(depth * 4);

const stringify = (node, depth) => {
  if (_.isObject(node)) {
    const entries = Object.entries(node);
    const result = entries.map(([key, value]) => `${generateSpacesWithoutSign(depth + 1)}${key}: ${stringify(value, depth + 1)}`);
    return `{\n${result.join('\n')}\n${generateSpacesWithoutSign(depth)}}`;
  }
  return node;
};

const stylish = (ast) => {
  const iter = (tree, depth) => {
    const spacesWithoutSign = generateSpacesWithoutSign(depth);
    const spacesWithSign = generateSpacesWithSign(depth);
    const result = tree.map((node) => {
      switch (node.type) {
        case 'nested':
          return `${spacesWithoutSign}${node.name}: ${(iter(node.children, depth + 1))}`;
        case 'unchanged':
          return `${spacesWithoutSign}${node.name}: ${stringify(node.value, depth + 1)}`;
        case 'added':
          return `${spacesWithSign}+ ${node.name}: ${stringify(node.value, depth + 1)}`;
        case 'removed':
          return `${spacesWithSign}- ${node.name}: ${stringify(node.value, depth + 1)}`;
        case 'changed': {
          const from = `${spacesWithSign}- ${node.name}: ${stringify(node.valueBefore, depth + 1)}`;
          const to = `${spacesWithSign}+ ${node.name}: ${stringify(node.valueAfter, depth + 1)}`;
          return `${from}\n${to}`;
        }
        default:
          throw new Error(`Unexpected node type: ${node.type}`);
      }
    });
    return `{\n${result.join('\n')}\n  ${generateSpacesWithoutSign(depth)}}`;
  };
  return iter(ast, 1);
};

export default stylish;
