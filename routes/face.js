
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
  var logoText = '顔PASS'
    , description = 'description'
    , backgroundColor = '#bf2e2e'
    , serialNumber = base64id.generateId()
    , primaryFields = [{
        key: 'origin',
        value: '割引率' + Math.round(Math.random() * 50) + '%',
        label: 'label'
    }];;
  
  Pass.saveFile(req.files.image, function(fileName) {
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
