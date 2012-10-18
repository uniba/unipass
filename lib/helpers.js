
/**
 * Module dependencies.
 */

var path = require('path');

exports.joinRoot = function(filename) {
  return path.normalize(path.join(__dirname + '/../', filename));
};