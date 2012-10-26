
var mkdirp = require('mkdirp');

var dirs = module.exports = {
    passFiles: './public/passes'
  , passImages: './public/images/passImages'
};

/**
 * Make directries syncronally.
 */

for (var i in dirs) {
  mkdirp.sync(__dirname + '/../' + dirs[i]);
}