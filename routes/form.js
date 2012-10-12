
/**
 * Module dependencies.
 */

var fs = require('fs');

exports.index = function(req, res){
  res.render('form', { title: 'form' });
};

exports.post = function(req, res){
  console.log(req.body.value); // for logging
  res.redirect('/form');
};
