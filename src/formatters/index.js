import plain from './plain.js';
import stylish from './stylish.js';

const formatter = (tree, formatType) => {
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
