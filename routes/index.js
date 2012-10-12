
/**
 * Module dependencies.
 */

var fs = require('fs')
  , path = require('path');

/*
 * GET list passbooks.
 */

exports.index = function(req, res){
  var passes = [];
  res.render('index', { title: 'Pass List', passes: passes });
};

/*
 * GET new passbook.
 */

exports.new = function(req, res){
  res.render('new', { title: 'New Pass' });
}

/*
 * POST create passbook.
 */

exports.create = function(req, res){
  var passbook = template.createPassbook({
    "backgroundColor": "rgb(255,255,255)",
    description: "20% off",
    serialNumber: "123456",
    logoText: "Ye!"
  });

  passbook.images.icon = './public/images/icon.png';
  passbook.images.logo = './public/images/logo.png';

  passbook.generate(function(error, buffer) {
    if (error) {
      console.log(error);
    } else {
      fs.writeFile("./public/passes/passbook.pkpass", buffer);
    }
  });
}

/*
 * GET download passbook.
 */

exports.download = function(req, res){
  var file = './public/passes/passbook.pkpass'
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
}