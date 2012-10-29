
/**
 * Module dependencies.
 */

var base64id = require('base64id')
  , template = require('../lib/template')
  , schema = require('../models')
  , Pass = schema.Pass;

/**
 * GET /face
 */

exports.index = function(req, res) {
  res.redirect('face/new');
};

/**
 * GET /face/new
 */

exports.new = function(req, res) {
  res.render('face/new', { action: 'face-new' });
};

/**
 * POST /face
 */

exports.create = function(req, res) {
  var description = 'description'
    , backgroundColor = '#ffffff'
    , serialNumber = base64id.generateId()
    , primaryFields = [{
        key: 'offer',
        value:  Math.round(Math.random() * 50) + '%',
        label: 'あなたの割引率は'
    }];
    var date = new Date();
    var expire = new Date(date.getFullYear(),date.getMonth()+2,date.getDate());
    var auxiliaryFields = [
      {
        "key" : "expires",
        "label" : "EXPIRES",
        "value" : expire.getFullYear()+'/'+expire.getMonth()+'/'+expire.getDate()
      }
    ];
    var coupon =  {
        "primaryFields":primaryFields ,
        "auxiliaryFields":auxiliaryFields
    };

  Pass.saveFile(req.files.image, function(fileName) {
    var pass = new Pass({
      serialNumber: serialNumber,
      description: description,
      backgroundColor: backgroundColor,
      coupon: coupon,
      image: fileName
    });
    
    pass.save(function(err, pass) {
      if (err) {
        // TODO: handle error
        return res.send(500);
      }
      res.redirect('face/show/' + pass.id);
    });
  });
};

/**
 * GET /face/:id
 */

exports.show = function(req, res) {
  var passId = req.params.id
    , passTypeIdentifier = template.fields.passTypeIdentifier;
  
  Pass.findOne({ _id : passId }, function(err, pass) {
    res.render('face/show',
      { action: 'face-show', pass: pass, passTypeIdentifier:passTypeIdentifier });
  });
};
