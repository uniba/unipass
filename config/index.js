
/**
 * Module dependencies.
 */
 
var fs = require('fs')
  , path = require('path')
  , dir = __dirname
  , config = {};

fs.readdirSync(dir).forEach(function(filename) {
  if (!/\.json/.test(filename)) return;
  var name = path.basename(filename, '.json');
  config[name] = require(path.join(dir, filename));
});

module.exports = config;