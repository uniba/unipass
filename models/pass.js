
/**
 * Module dependencies.
 */

var Schema = require('mongoose').Schema

/**
 * Pass schema definition.
 */

var Schema = module.exports = new Schema({
  serialNumber: { type: String, unique: true },
  logoText: String,
  description: String,
  backgroundColor: String,
  primaryFields: [Schema.Types.Mixed]
});

Schema.statics.findBySerialNumber = function(serialNumber, callback){
  this.findOne({ serialNumber: serialNumber }, callback);
}

Schema.methods.toFields = function(callback) {
  var self = this;

  return {
    serialNumber: self.serialNumber,
    logoText: self.logoText,
    description: self.description,
    backgroundColor: self.backgroundColor,
    coupon: { primaryFields: self.primaryFields }
  }
}