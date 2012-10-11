
/**
 * Module dependencies.
 */

var fs = require('fs')
  , path = require('path');

/*
 * GET home page.
 */

exports.index = function(req, res){
  var file = './passbook.pkpass'
    , filename = path.basename(file)
    , mimetype = 'application/vnd.apple.pkpass';

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.on('data', function(chunk) {
    res.write(chunk);
  });
  filestream.on('end', function() {
    res.end();
  });
};