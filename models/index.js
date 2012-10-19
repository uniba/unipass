
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , config = require('../config').mongodb;

/**
 * Expose mongoose.
 */

exports.mongoose = mongoose;

/**
 * Expose mongoose connection.
 */

var db = exports.db = mongoose.createConnection(config.host, config.database);

/**
 * Expose models.
 */

exports.Pass = db.model('Pass', require('./pass'));
exports.User = db.model('User', require('./user'));