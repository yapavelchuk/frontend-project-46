import _ from 'lodash';

const generateSpaces = (depth) => depth * 4 - 2;

const stringify = (node, depth) => {
  if (_.isObject(node)) {
    const entries = Object.entries(node);
    const result = entries.map(([key, value]) => `${generateSpaces(depth + 1)}${key}: ${stringify(value, depth + 1)}`);
    return `{\n${result.join('\n')}\n  ${generateSpaces(depth)}}`;
  }
  return node;
};

const stylish = (ast) => {
  const iter = (tree, depth) => {
    const space = generateSpaces(depth);
    const result = tree.flatMap((node) => {
      switch (node.type) {
        case 'added':
          return ` ${space}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'removed':
          return ` ${space}- ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'unchanged':
          return ` ${space}  ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'nested':
          return ` ${space}  ${node.key}: ${iter(node.children, depth + 1)}`;
        case 'changed':
          return [
            `  ${space}- ${node.key}: ${stringify(node.value1, depth + 1)}`,
            `  ${space}+ ${node.key}: ${stringify(node.value2, depth + 1)}`,
          ];
        default:
          throw new Error(`Unknown format type: ${node.type}`);
      }
    });
    return `{\n${result.join('\n')}\n  ${generateSpaces(depth)}}`;
  };
  return iter(ast, 1);
};

export default stylish;
