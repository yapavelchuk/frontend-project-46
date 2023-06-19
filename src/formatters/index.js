import plain from './plain.js';
import stylish from './stylish.js';

const formatter = (tree, formatType) => {
  switch (formatType) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return JSON.stringify(tree, null, 2);
    default:
      throw new Error(`Unexpected format: ${formatType}`);
  }
};

export default formatter;
