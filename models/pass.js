
/**
 * Module dependencies.
 */

var Schema = require('mongoose').Schema

/**
 * Pass schema definition.
 */

var Schema = module.exports = new Schema({
  backgroundColor: String,
  serialNumber: { type: String, unique: true },
  description: String,
  logoText: String
});