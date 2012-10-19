
/**
 * Module dependencies.
 */

var base64id = require('base64id')
  , fs = require('fs')
  , helpers = require('../lib/helpers')
  , path = require('path')
  , template = require('../lib/template')
  , schema = require('../models')
  , Pass = schema.Pass
  , util = require('util');

/*
 * GET index.
 */

exports.index = function(req, res){
  var passTypeIdentifier = template.fields.passTypeIdentifier;
  Pass.find({}, function(err, passes) {
    res.render('index', { title: 'Pass List', passes: passes ,passTypeIdentifier:passTypeIdentifier});
  });
};

exports.show = function(req, res){
  res.redirect('/passes');
}
/*
 * GET new.
 */

exports.new = function(req, res){
  res.render('new', { title: 'New Pass' });
}

exports.edit = function(req, res){
  var passId = req.params.pass
  console.log(passId);
  Pass.findOne({ _id : passId  }, function(err, pass) {
    console.log(pass);
    res.render('edit', { title: 'Pass Edit', pass: pass});
  });
};

exports.update = function(req, res){
  var pass = req.body.pass
  , serialNumber = pass.serialNumber
  , logoText = pass.logoText
  , description = pass.description
  , backgroundColor = pass.backgroundColor 
  , primaryFields = [{
    key: 'origin',
    value: pass.value ,
    label: pass.label
  }];
  console.log('params:'+util.inspect(req.params.pass))

  Pass.findOne({ _id : req.params.pass  }, function(err, pass) {
    console.log(pass);
    pass.logoText = logoText;
    pass.description = description;
    pass.backgroundColor = backgroundColor;
    pass.primaryFields = primaryFields;
    pass.save();
    res.redirect('/passes');
  });

}
/**
 * POST create.
 */
exports.create = function(req, res){
  var params = req.body.pass
    , serialNumber = base64id.generateId()
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
    res.redirect('/passes');
  })
}



/*
 * GET download.
 */

// exports.download = function(req, res){
// }

/*
 * GET download sample.
 */

// exports.downloadSample = function(req, res){
  // var file = helpers.joinRoot('public/passes/sample.pkpass');
  // console.log(file);
// 
  // var passbook = template.createPassbook({
    // backgroundColor: "#FFFFFF",
    // serialNumber: base64id.generateId(),
    // description: 'Yeah!',
    // logoText: 'SOS!',
    // "coupon": {
      // "primaryFields": [
        // {
          // "key": "origin",
          // "value": "肩もみ券1",
          // "label": "1回だけ有効"
        // },
        // {
          // "key": "destination",
          // "value": "肩もみ券2",
          // "label": "1回だけ有効"
        // }
     // ]
    // }
  // });
// 
  // passbook.images.icon = helpers.joinRoot('public/images/icon.png');
  // passbook.images.logo = helpers.joinRoot('public/images/logo.png');
// 
  // passbook.generate(function(error, buffer) {
    // if (error) {
      // return res.redirect('/passes');
    // }
// 
    // fs.writeFile(file, buffer);
// 
    // var filestream = fs.createReadStream(file)
      // , filename = path.basename(file)
      // , mimetype = 'application/vnd.apple.pkpass';
// 
    // res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    // res.setHeader('Content-type', mimetype);
// 
    // filestream.on('data', function(chunk) {
      // res.write(chunk);
    // });
// 
    // filestream.on('end', function() {
      // res.end();
    // });
  // });
// }

