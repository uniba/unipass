
/**
 * Module dependencies.
 */

var fs = require('fs')
  , config = require('../config').template
  , createTemplate = require('passbook')
  , helpers = require('./helpers')
  , template = createTemplate('generic', config);

template.keys(helpers.joinRoot('etc/passbook/keys'), '1q2w3e4r');

module.exports = template;