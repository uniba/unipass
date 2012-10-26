var base64id = require('base64id')
  , schema = require('../models')
  , Pass = schema.Pass
  , template = require('../lib/template');

exports.index = function(req, res) {
  res.redirect('face/new');
};

exports.new = function(req, res) {
  res.render('face/new', { action: 'face-new' });
};

exports.create = function(req, res) {
  // TODO: create new pass.
  var logoText = 'logoText'
    , description = 'description'
    , backgroundColor = '#bf2e2e'
    , serialNumber = base64id.generateId()
    , primaryFields = [{
        key: 'origin',
        value: 'value',
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
        throw err;
      }
      res.redirect('face/show/' + pass.id);
    });
  });

};

exports.show = function(req, res) {
  var passId = req.params.id
  , passTypeIdentifier = template.fields.passTypeIdentifier;
  console.log('passId:'+passId)
  Pass.findOne({ _id : passId  }, function(err, pass) {
    res.render('face/show', { action: 'face-show' , pass: pass , passTypeIdentifier:passTypeIdentifier});
  });
  
};
