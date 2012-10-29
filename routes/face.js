
/**
 * Module dependencies.
 */

var base64id = require('base64id')
  , template = require('../lib/template')
  , schema = require('../models')
  , Pass = schema.Pass
  , util = require('util');

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
  Pass.facePassField(function(passHash) {
    Pass.saveFile(req.files.image, function(fileName) {
      passHash['image'] = fileName;
      var pass = new Pass(passHash);
      pass.save(function(err, pass) {
        if (err) {
          // TODO: handle error
          return res.send(500);
        }
        res.redirect('face/show/' + pass.id);
      });
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
