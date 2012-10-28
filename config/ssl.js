
/**
 * Module dependencies.
 */

var fs = require('fs')
  , path = require('path');

/**
 * Use secure connection for production.
 */

var secure = 'production' === process.env.NODE_ENV;

/**
 * Expose config.
 */

module.exports = {
    secure: secure
  , options: {
        key: fs.readFileSync(path.join(__dirname, '/../etc/server/server.key'))
      , cert: fs.readFileSync(path.join(__dirname, '/../etc/server/server.crt'))
    }
};