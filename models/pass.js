
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
  description: String,
  backgroundColor: String,
  coupon: Schema.Types.Mixed,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  authenticationToken:{ type: String },
  _users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  image: String,
  barcode: {type:String , default:base64id.generateId(), unique: true },
  checked: {type:Boolean , default:false}
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
  console.log('this:'+this);
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
