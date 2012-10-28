
/**
 * Module dependencies.
 */

var express = require('express');

/**
 * Create the app.
 */

var app = module.exports = express();

/**
 * Redirect.
 */

app.all('*', function(req, res) {
  res.redirect('https://' + req.headers.host + '/' + req.path);
});
