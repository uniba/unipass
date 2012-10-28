
/**
 * Module dependencies.
 */

var qs = require('qs')
  , express = require('express');

/**
 * Create the app.
 */

var app = module.exports = express();

/**
 * Redirect.
 */

app.all('*', function(req, res) {
  var query = qs.stringify(req.query);
  res.redirect('https://' + req.headers.host + req.path + (query ? '?' + query : ''));
});
