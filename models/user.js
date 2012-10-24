var Schema = require('mongoose').Schema
  , helpers = require('../lib/helpers')
  , template = require('../lib/template')
  , Pass = require('./pass');

var UserSchema = module.exports = new Schema({
  _passbook: { type: Schema.Types.ObjectId, ref: 'Pass' },
  deviceId: String,
  pushToken: String,
  authenticationToken: String
});