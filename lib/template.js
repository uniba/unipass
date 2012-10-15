
/**
 * Module dependencies.
 */

var fs = require('fs')
  , config = require('../config').template
  , createTemplate = require('passbook')
  , template = createTemplate('coupon', config);

template.keys('./etc/passbook/keys', '1q2w3e4r');

module.exports = template;