
/**
 * Module dependencies.
 */
 
var fs = require('fs')
  , os = require('os')
  , path = require('path')
  , port = require('./port')
  , config = {};

fs.readdirSync(__dirname).forEach(function(filename) {
  if (!/\.json/.test(filename)) return;
  var name = path.basename(filename, '.json');
  config[name] = require(path.join(__dirname, filename));
});

/**
 * Import SSL config.
 */

config.ssl = require('./ssl');

/**
 * Port.
 */

config.port = require('./port');

/**
 * URL.
 */

config.url = (config.ssl.secure ? 'https' : 'http')
  + '://'
  + ('production' === process.env.NODE_ENV ? 'pass.uniba.jp' : os.hostname())
  + ':' + port + '/';

/**
 * Expose config.
 */

module.exports = config;