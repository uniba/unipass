
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
  , util = require('util')
  , formidable = require('formidable') 
  , im = require('imagemagick');

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

exports.create = function(req, res) {
  var params = req.body.pass
  , serialNumber = base64id.generateId()
  , logoText = params.logoText
  , description = params.description
  , backgroundColor = params.backgroundColor
  , primaryFields = [{
    key : 'origin',
    value : params.value,
    label : params.label
  }];

  console.log('image:' + util.inspect(req.files.pass.image));
  saveFile(req.files.pass.image,function(fileName){
    console.log('imgName:'+fileName);
    var pass = new Pass({
      serialNumber : serialNumber,
      description : description,
      logoText : logoText,
      backgroundColor : backgroundColor,
      primaryFields : primaryFields,
      image:fileName
    });
  
    pass.save(function(err) {
      if (err)
        throw err;
      // TODO: handle error
      res.redirect('/passes');
    })    
  });
}



//TODO pngを正しく変換する必要があるかもしれないけどとりあえず、
//jpeg のformatに .pngの名前をつける

function saveFile(imageObj,callback) {
  var ext = imageObj.type.match(/\/\w*/)[0].replace(/\//, '.');
  var fromPath = imageObj.path;
  var fileName = base64id.generateId() + '.png';
  var toPath = __dirname + '/../etc/passImages/' + fileName;
  fs.rename(fromPath, toPath, function(err) {
    if (err)throw err;
    //return fileName;
    return callback(fileName);
  });
};

// TODO あとで使う
// function saveFile(imageObj) {
  // var ext = imageObj.type.match(/\/\w*/)[0].replace(/\//, '.');
// 
  // var fromPath = imageObj.path;
  // im.readMetadata(fromPath,function(err,metadata){
    // //http://www.netoven.com/det.php?d=20120927134402
    // //http://thenewglory.blog.fc2.com/blog-category-12.html
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














