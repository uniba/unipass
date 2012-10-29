
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
  , base64id = require('base64id')
  , image_processor = require('../lib/image_processor');
/**
 * Pass schema definition.
 */

var PassSchema = module.exports = new Schema({
  serialNumber: { type: String, unique: true ,default:base64id.generateId()},
  description: String,
  backgroundColor: String,
  coupon: Schema.Types.Mixed,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  authenticationToken:{ type: String },
  _users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  image: String,
  barcode: {type:String , default:base64id.generateId(), unique: true },
  checked: {type:Boolean , default:false},
  logoText: String
});

PassSchema.pre('save', function(next) {
  console.log('this save:'+this);
  if (!this.created) this.created = new Date;
  this.updated = new Date;
  this.authenticationToken = crypto.randomBytes(48).toString('hex');
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
  var field =  {
    serialNumber: this.serialNumber,
    description: this.description,
    backgroundColor: this.backgroundColor,
    coupon: this.coupon,
    webServiceURL: config.url,
    authenticationToken:this.authenticationToken,
    barcode:{
      message:this.barcode,
      format:'PKBarcodeFormatPDF417',
      messageEncoding : "iso-8859-1"
    }
  };

  return field;
};


PassSchema.statics.saveFile = image_processor;

PassSchema.statics.facePassField = function(callback){
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
  var pass = {
      serialNumber: serialNumber,
      description: description,
      backgroundColor: backgroundColor,
      coupon: coupon
    }
  return callback(pass);
}
PassSchema.statics.parsePass = function (req,callback){
  var pass = req.body.pass
    , serialNumber = pass.serialNumber
    , logoText = pass.logoText
    , description = pass.description
    , backgroundColor = pass.backgroundColor 
    , coupon = {
        primaryFields: [{
          key: 'offer',
          value: pass.coupon.primaryFields.value,
          label: pass.coupon.primaryFields.label
        }],
        auxiliaryFields : [{
          key: 'expires',
          value: pass.coupon.auxiliaryFields.value,
          label: pass.coupon.auxiliaryFields.label
        }]
      };
  var passHash = {
     serialNumber:serialNumber
    , logoText: logoText
    , description: description
    , backgroundColor: backgroundColor
    , coupon: coupon
    }
  return callback(passHash);
} 
function createPassbook(passModel) {
  var passbook = template.createPassbook(passModel.toFields()),
    file = helpers.joinRoot('public/passes/' + passModel.serialNumber + '.pkpass');
  
  passbook.icon(helpers.joinRoot('public/images/icon@2x.png'));
  passbook.logo(helpers.joinRoot('public/images/logo@2x.png'));
  passbook.strip(helpers.joinRoot('public/images/passImages/'+passModel.image));
  //passbook.thumbnail(helpers.joinRoot('public/images/passImages/' + passModel.image));
  passbook.generate(function(err, buffer) {
    if (err) throw err;

    fs.writeFile(file, buffer, function(err) {
      if (err) throw err;
      return true;
    });
  });
}
