const path = require('path');
const cwd = process.cwd();

function crossFilePath(filePath) {
  return filePath.split(path.sep).join('/');
}

function resolve(moduleName) {
  return require.resolve(moduleName);
}


function getProjectPath(...filePath) {
  return path.join(cwd, ...filePath);
}


module.exports = {
  getProjectPath,
  resolve,
  crossFilePath,
};
