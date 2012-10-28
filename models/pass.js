
/**
 * Module dependencies.
 */

var debug = require('debug')('unipass:models:pass')
  , Schema = require('mongoose').Schema
  , config = require('../config')
  , User = require('./user')
  , helpers = require('../lib/helpers')
  , template = require('../lib/template')
  , fs = require('fs')
  , crypto = require('crypto')
  , base64id = require('base64id');

/**
 * Pass schema definition.
 */

var PassSchema = module.exports = new Schema({
  serialNumber: { type: String, unique: true },
  logoText: String,
  description: String,
  backgroundColor: String,
  primaryFields: [Schema.Types.Mixed],
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  authenticationToken:{ type: String , default: crypto.randomBytes(48).toString('hex') },
  _users : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  image: String
});

PassSchema.pre('save', function(next) {
  if (!this.created) this.created = new Date;
  this.updated = new Date;
  next();
});

PassSchema.post('save', function() {
  console.log('serialNumber:'+this.serialNumber);
  createPassbook(this);
});

PassSchema.statics.findBySerialNumber = function(serialNumber, callback){
  this.findOne({ serialNumber: serialNumber }, callback);
};

PassSchema.statics.demoCreatePass = function(serialNumber, callback){
  //this.findOne({ serialNumber: serialNumber }, callback);
  
};


PassSchema.methods.toFields = function(callback){
  var self = this
    , field =  {
    serialNumber: self.serialNumber,
    logoText: self.logoText,
    description: self.description,
    backgroundColor: self.backgroundColor,
    generic: { primaryFields: self.primaryFields },
    webServiceURL: config.url,
    authenticationToken:self.authenticationToken
  };

  return field;
};

//TODO pngを正しく変換する必要があるかもしれないけどとりあえず、
//jpeg のformatに .pngの名前をつける

PassSchema.statics.saveFile = function(imageObj, callback) {
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

function createPassbook(passModel) {
  var passbook = template.createPassbook(passModel.toFields()),
    file = helpers.joinRoot('public/passes/' + passModel.serialNumber + '.pkpass');
  
  passbook.icon(helpers.joinRoot('public/images/icon.png'));
  passbook.logo(helpers.joinRoot('public/images/logo.png'));
  passbook.thumbnail(helpers.joinRoot('public/images/passImages/' + passModel.image));
  passbook.generate(function(err, buffer) {
    if (err) throw err;

    fs.writeFile(file, buffer, function(err) {
      if (err) throw err;
      return true;
    });
  });
}
