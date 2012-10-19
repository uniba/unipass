
/**
 * Module dependencies.
 */

var base64id = require('base64id')
  , fs = require('fs')
  , helpers = require('../lib/helpers')
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
    , file = helpers.joinRoot('public/passes/' + serialNumber + '.pkpass')
    , logoText = params.logoText
    , description = params.description
    , backgroundColor = params.backgroundColor
    , primaryFields = [
      {
        key: 'origin',
        value: params.value,
        label: params.label
      }
    ];

  var pass = new Pass({
    serialNumber: serialNumber,
    description: description,
    logoText: logoText,
    backgroundColor: backgroundColor,
    primaryFields: primaryFields
  });

  pass.save(function(err) {
    if (err) throw err; // TODO: handle error
    
    var passbook = template.createPassbook(pass.toFields());

    passbook.icon(helpers.joinRoot('public/images/icon.png'));
    passbook.logo(helpers.joinRoot('public/images/logo.png'));
    passbook.generate(function(err, buffer) {
      if (err) throw err;

      fs.writeFile(file, buffer, function(err) {
        if (err) throw err;
        res.redirect('/passes');
      });
    });
  })
}

/**
 * GET show.
 */

exports.show = function(req, res){

}

/*
 * GET download.
 */

exports.download = function(req, res){
  var serialNumber = req.params.id;

  Pass.findBySerialNumber(serialNumber, function(err, pass) {
    if (err) throw err; // TODO: handle error

    var file = helpers.joinRoot('public/passes/' + pass.serialNumber + '.pkpass')
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

/*
 * GET download sample.
 */

exports.downloadSample = function(req, res){
  var file = helpers.joinRoot('public/passes/sample.pkpass');
  console.log(file);

  var passbook = template.createPassbook({
    backgroundColor: "#FFFFFF",
    serialNumber: base64id.generateId(),
    description: 'Yeah!',
    logoText: 'SOS!',
    "coupon": {
      "primaryFields": [
        {
          "key": "origin",
          "value": "肩もみ券1",
          "label": "1回だけ有効"
        },
        {
          "key": "destination",
          "value": "肩もみ券2",
          "label": "1回だけ有効"
        }
     ]
    }
  });

  passbook.images.icon = helpers.joinRoot('public/images/icon.png');
  passbook.images.logo = helpers.joinRoot('public/images/logo.png');

  passbook.generate(function(error, buffer) {
    if (error) {
      return res.redirect('/passes');
    }

    fs.writeFile(file, buffer);

    var filestream = fs.createReadStream(file)
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