
/**
 * Module dependencies.
 */

var base64id = require('base64id')
  , fs = require('fs')
  , path = require('path')
  , util = require('util')
  , im = require('imagemagick')
  , formidable = require('formidable') 
  , helpers = require('../lib/helpers')
  , template = require('../lib/template')
  , schema = require('../models')
  , Pass = schema.Pass;

/**
 * Expose routes.
 */

exports.client = require('./client');
exports.face = require('./face');
exports.notify = require('./notify');
exports.users = require('./users');

/*
 * GET index.
 */

exports.index = function(req, res) {
  var passTypeIdentifier = template.fields.passTypeIdentifier;
  
  Pass
    .find()
    .sort('-created')
    .exec(function(err, passes) {
      if (err) {
        return res.send(500);
      }
      res.render('admin/index', { title: 'Pass List', passes: passes, passTypeIdentifier: passTypeIdentifier});
    });
};

/**
 * GET
 */

exports.show = function(req, res) {
  res.redirect('/admin/passes');
};

/*
 * GET new.
 */

exports.new = function(req, res) {
  res.render('admin/passes/new', { title: 'New Pass' });
};

/**
 * GET
 */

exports.edit = function(req, res) {
  var passId = req.params.pass;
  Pass.findOne({ _id : passId  }, function(err, pass) {
    res.render('admin/passes/edit', { title: 'Edit Pass', pass: pass});
  });
};

/**
 * PUT
 */

exports.update = function(req, res) {
  var pass = req.body.pass
    , serialNumber = pass.serialNumber
    , logoText = pass.logoText
    , description = pass.description
    , backgroundColor = pass.backgroundColor 
    , primaryFields = [{
        key: 'origin',
        value: pass.value,
        label: pass.label
      }];
  
  Pass.findOne({ _id: req.params.pass }, function(err, pass) {
    saveFile(req.files.pass.image, function(fileName) {
      pass.logoText = logoText;
      pass.description = description;
      pass.backgroundColor = backgroundColor;
      pass.primaryFields = primaryFields;
      pass.image = fileName;
      pass.save(function(err, pass) {
        if (err) {
          return res.send(500);
        }
        res.redirect('/admin/passes');
      });
    });
  });
};

/**
 * POST create.
 */

exports.create = function(req, res) {
  var params = req.body.pass
    , serialNumber = base64id.generateId()
    , logoText = params.logoText
    , description = params.description
    , backgroundColor = params.backgroundColor
    , primaryFields = [{
        key: 'origin',
        value: params.value,
        label: params.label
    }];

  saveFile(req.files.pass.image, function(fileName) {
    var pass = new Pass({
      serialNumber: serialNumber,
      description: description,
      logoText: logoText,
      backgroundColor: backgroundColor,
      primaryFields: primaryFields,
      image: fileName
    });
  
    pass.save(function(err, pass) {
      if (err) {
        // TODO: handle error
        throw err;
      }
      res.redirect('/admin/passes');
    });
  });
};


//TODO pngを正しく変換する必要があるかもしれないけどとりあえず、
//jpeg のformatに .pngの名前をつける

function saveFile(imageObj, callback) {
  console.log(imageObj);
  var ext = imageObj.type.match(/\/\w*/)[0].replace(/\//, '.');
  var fromPath = imageObj.path;
  var fileName = base64id.generateId() + '.png';
  var toPath = __dirname + '/../public/images/passImages/' + fileName;
  fs.rename(fromPath, toPath, function(err) {
    if (err) {
      throw err;
    }
    //return fileName;
    return callback(fileName);
  });
};

// TODO あとで使うかも
//iphoneの画像はmeatadataで方向とかが指定されているのでそれの修正
//http://www.netoven.com/det.php?d=20120927134402
//http://thenewglory.blog.fc2.com/blog-category-12.html

// function saveFile(imageObj) {
  // var ext = imageObj.type.match(/\/\w*/)[0].replace(/\//, '.');
// 
  // var fromPath = imageObj.path;
  // im.readMetadata(fromPath,function(err,metadata){

    // console.log(metadata.exif)
    // var orientation = metadata.exif.orientation;
    // switch(orientation){
      // case 1:
        // break;
      // case 2:
//       
        // break;
    // }
  // })
//   
  // var fileName = base64id.generateId() + '.png';
  // var toPath = __dirname + '/../etc/passImages/' + fileName; 
  // if (ext == '.png') {
    // fs.rename(fromPath, toPath, function(err) {
      // if (err)
        // throw err;
    // });
  // } else {
//        
    // console.log(fromPath);
    // console.log(toPath);
    // im.convert([fromPath, toPath], function(err, stdout) {
      // if (err)
        // throw err;
      // fs.unlink(fromPath, function(err) {
        // if (err)
          // throw err;
        // //console.log('successfully deleted /tmp/hello');
      // })
    // });
  // }
  // return fileName;
// }