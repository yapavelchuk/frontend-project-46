// import _ from 'lodash';

// const generateSpaces = (depth) => ' '.repeat(depth * 4 - 2);

// const stringify = (node, depth) => {
//   if (_.isObject(node)) {
//     const entries = Object.entries(node);
//     const result = entries.map(([key, value]) => `${generateSpaces(depth + 1)}${key}: ${stringify(value, depth + 1)}`);
//     return `{\n${result.join('\n')}\n${generateSpaces(depth)}}`;
//   }
//   return node;
// };

// const stylish = (ast) => {
//   const iter = (tree, depth) => {
//     const space = generateSpaces(depth);
//     const result = tree.map((node) => {
//       switch (node.type) {
//         case 'nested':
//           return ` ${space}  ${node.key}: ${iter(node.children, depth + 1)}`;
//         case 'unchanged':
//           return ` ${space}  ${node.key}: ${stringify(node.value, depth + 1)}`;
//         case 'added':
//           return ` ${space}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
//         case 'removed':
//           return ` ${space}- ${node.key}: ${stringify(node.value, depth + 1)}`;
//         case 'changed': {
//           const from = `${space}- ${node.name}: ${stringify(node.valueBefore, depth + 1)}`;
//           const to = `${space}+ ${node.name}: ${stringify(node.valueAfter, depth + 1)}`;
//           return `${from}\n${to}`;
//         }
//         default:
//           throw new Error(`Unknown format type: ${node.type}`);
//       }
//     });
//     // return `{\n${result.join('\n')}\n  ${generateSpaces(depth)}}`;
//     return ['{', ...result, `${generateSpaces(depth)}}`].join('\n');
//   };
//   return iter(ast, 1);
// };

// export default stylish;
import _ from 'lodash';

const generateSpacesWithSign = (multiplier) => ' '.repeat(4 * multiplier - 2);

const generateSpacesWithoutSign = (multiplier) => ' '.repeat(4 * multiplier);

const checkObj = (node, multiplier) => {
  if (_.isObject(node)) {
    const entries = Object.entries(node);
    const deepObjects = entries
      .reduce((acc, [key, value]) => `${acc}\n${generateSpacesWithoutSign(multiplier)}${key}: ${checkObj(value, multiplier + 1)}`, '');
    return `{${deepObjects}\n${generateSpacesWithoutSign(multiplier - 1)}}`;
  }
  return node;
};

const stylish = (ast) => {
  const iter = (tree, multiplier) => {
    const spacesWithoutSign = generateSpacesWithoutSign(multiplier);
    const spacesWithSign = generateSpacesWithSign(multiplier);
    const result = tree.map((node) => {
      switch (node.type) {
        case 'nested':
          return `${spacesWithoutSign}${node.name}: ${(iter(node.children, multiplier + 1))}`;
        case 'unchanged':
          return `${spacesWithoutSign}${node.name}: ${checkObj(node.value, multiplier + 1)}`;
        case 'added':
          return `${spacesWithSign}+ ${node.name}: ${checkObj(node.value, multiplier + 1)}`;
        case 'removed':
          return `${spacesWithSign}- ${node.name}: ${checkObj(node.value, multiplier + 1)}`;
        case 'changed': {
          const from = `${spacesWithSign}- ${node.name}: ${checkObj(node.valueBefore, multiplier + 1)}`;
          const to = `${spacesWithSign}+ ${node.name}: ${checkObj(node.valueAfter, multiplier + 1)}`;
          return `${from}\n${to}`;
        }
        default:
          throw new Error(`Unexpected node type: ${node.type}`);
      }
    });
    return ['{', ...result, `${generateSpacesWithoutSign(multiplier - 1)}}`].join('\n');
  };
  return iter(ast, 1);
};

export default stylish;
