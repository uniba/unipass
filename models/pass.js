
/**
 * Module dependencies.
 */

var Schema = require('mongoose').Schema
,User = require('./user')
,helpers = require('../lib/helpers')
,template = require('../lib/template')
,env = require('../config/env')
,fs = require('fs')
,crypto = require('crypto');
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
  authenticationToken:{ type: String , unique: true , default: crypto.randomBytes(48).toString('hex') },
  _users : [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

PassSchema.pre('save', function (next) {
  if (!this.created) this.created = new Date;
  this.updated = new Date;
  next();
})
PassSchema.post('save', function () {
  console.log('serialNumber:'+this.serialNumber);
  createPassbook(this)
});
PassSchema.statics.findBySerialNumber = function(serialNumber, callback){
  this.findOne({ serialNumber: serialNumber }, callback);
}

PassSchema.methods.toFields = function(callback){
  var self = this;

  return {
    serialNumber: self.serialNumber,
    logoText: self.logoText,
    description: self.description,
    backgroundColor: self.backgroundColor,
    coupon: { primaryFields: self.primaryFields },
    webServiceURL:env,
    authenticationToken:self.authenticationToken
  }
}

function createPassbook(passModel){
  console.log('createPassbook env:'+env);
  var passbook = template.createPassbook(passModel.toFields()) ,
  file = helpers.joinRoot('public/passes/' + passModel.serialNumber + '.pkpass');
  
  passbook.icon(helpers.joinRoot('public/images/icon.png'));
  passbook.logo(helpers.joinRoot('public/images/logo.png'));
  passbook.generate(function(err, buffer) {
    if (err) throw err;

    fs.writeFile(file, buffer, function(err) {
      if (err) throw err;
      return true;
    });
  });
}