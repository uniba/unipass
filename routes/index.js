
/**
 * Module dependencies.
 */

var base64id = require('base64id')
  , fs = require('fs')
  , path = require('path')
  , template = require('../lib/template')
  , schema = require('../models')
  , Pass = schema.Pass;

/*
 * GET index.
 */

exports.index = function(req, res){
  Pass.find({}, function(err, passes) {
    res.render('index', { title: 'Pass List', passes: passes });
  });
};

/*
 * GET new.
 */

exports.new = function(req, res){
  res.render('new', { title: 'New Pass' });
}

/**
 * POST create.
 */

exports.create = function(req, res){
  var params = req.body.pass
    , serialNumber = base64id.generateId()
    , logoText = params.logoText
    , description = params.description;

  var passInfo = {
    "backgroundColor": "rgb(255,255,255)",
    serialNumber: serialNumber,
    description: description,
    logoText: logoText
  }

  var passbook = template.createPassbook(passInfo);

  passbook.images.icon = './public/images/icon.png';
  passbook.images.logo = './public/images/logo.png';

  passbook.generate(function(error, buffer) {
    if (error) {
      return res.redirect('/passes');
    }

    fs.writeFile('./public/passes/' + serialNumber + '.pkpass', buffer);

    var pass = new Pass(passInfo);
    pass.save(function(err, pass) {
      res.redirect('/passes');
    });
  });
}

/**
 * POST create.
 */

exports.show = function(req, res){

}

/*
 * GET download.
 */

exports.download = function(req, res){
  var serialNumber = req.params.id;

  Pass.findBySerialNumber(serialNumber, function(err, pass) {
    if (!pass) {
      // handle error
    }

    var file = './public/passes/' + pass.serialNumber + '.pkpass'
      , filestream = fs.createReadStream(file)
      , filename = path.basename(file)
      , mimetype = 'application/vnd.apple.pkpass';

    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', mimetype);

    filestream.on('data', function(chunk) {
      res.write(chunk);
    });
    
    filestream.on('end', function() {
      res.end();
    });
  });
}