var fs = require('fs');
var path = require('path');
var _ = require('lodash');;

function findDirectoryRecursive(currentPath, pathToFind) {
  var folders = getDirectories(currentPath);
  var valueToReturn = null;

  for (var index = 0; index < folders.length; index++) {
    var value = folders[index];

    if (pathToFind === value) {
      return currentPath + '/' + value;
    } else {
      return findDirectoryRecursive(currentPath + '/' + value, pathToFind);
    }

  }

}

function getDirectories(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

function createFoldersInAppDirectory(appDirectory) {
  var folders = getDirectories(appDirectory);
  return _.map(folders, function creatRoutAndName(folder) {
    return { name: folder, value: appDirectory + '/' + folder }
  })
}

function findAllFoldersInApp(_currentPath,callback) {
  var response = {
    err: null,
    directories: []
  };
  var currentPath = _currentPath;
  var appDirectory = _currentPath + '/src/app';

  fs.accessSync
  fs.access(appDirectory, fs.F_OK, function(err) {

    if (!err) {
      response.directories = createFoldersInAppDirectory(appDirectory);
      callback(response)

    } else {
      console.log(currentPath);
      appDirectory = findDirectoryRecursive(currentPath, 'app');

      if (appDirectory) {
        response.directories = createFoldersInAppDirectory(appDirectory);
        callback(response)

      } else {
        response.err = 'Could\'nt find the app directory'
        callback(response)
      }

    }
  });

}

var folderSelector = {
  findAllFoldersInApp: findAllFoldersInApp,

  findDirectoryRecursive: findDirectoryRecursive,

  getDirectories: getDirectories
}

module.exports = folderSelector;