import yaml from 'js-yaml';

const parseData = (fileData, fileExtension) => {
  if (fileExtension === '.json') {
    return JSON.parse(fileData);
  }
  if (fileExtension === '.yml' || fileExtension === '.yaml') {
    return yaml.load(fileData);
  }
  throw new Error(`Unsupported file format: ${fileExtension}`);
};

export default parseData;
