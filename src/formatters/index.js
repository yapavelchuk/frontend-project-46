import plain from './plain.js';
import stylish from './stylish.js';

const formatter = (tree, formatType) => {
  // switch (formatType) {
  //   case 'stylish':
  //     return stylish(tree);
  //   case 'plain':
  //     return plain(tree);
  //   case 'json':
  //     return JSON.stringify(tree, null, 2);
  //   default:
  //     throw new Error(`Unexpected format: ${formatType}`);
  // }
  if (formatType === 'stylish') {
    return stylish(tree);
  }
  if (formatType === 'plain') {
    return plain(tree);
  }
  if (formatType === 'json') {
    return JSON.stringify(tree, null, 2);
  }
  return stylish(tree);
};

export default formatter;
