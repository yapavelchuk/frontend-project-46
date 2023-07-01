import yaml from 'js-yaml';

const parseData = (data, fileExtension) => {
  if (fileExtension === 'json') {
    return JSON.parse(data);
  }
  if (fileExtension === 'yml' || fileExtension === 'yaml') {
    return yaml.load(data);
  }
  throw new Error(`Unsupported file format: ${fileExtension}`);
};

export default parseData;
