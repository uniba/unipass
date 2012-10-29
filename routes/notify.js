
/**
 * Module dependencies.
 */

var apns = require('apn')
  , models = require('../models')
  , Pass = models.Pass
  , User = models.User;

/**
 * GET
 */

exports.index = function(req, res) {
  var pushTokens = []
    , serialNumber = req.params.serialNumber;
  
  Pass
    .findOne({ serialNumber: serialNumber })
    .populate('_users')
    .exec(function (err, pass) {
      if (err) {
        return res.send(500);
      }
      for (var i = 0; i < pass._users.length; i++) {
        if(pushTokens.indexOf(pass._users[i].pushToken) == -1) {
          pushTokens.push(pass._users[i].pushToken);
        }
      }
      pushNotification(pushTokens, serialNumber); // TODO: refactor
      res.redirect('/admin');
    });
};

/**
 * GET
 */

exports.notification = function(req, res) {
  var deviceId = req.params.deviceId;
  
  User
    .findOne({ deviceId: deviceId })
    .populate('_passbook')
    .exec(function (err, user) {
      if (err) {
        return res.send(404, 'error');
      }
      
      var updated = user._passbook.updated;
      
      var data = {
          lastUpdated: String(+new Date)  // NOTE: must be NSString
        , serialNumbers : [user._passbook.serialNumber]
      };
      
      res.json(200, data);
    });
};

//https://github.com/argon/node-apn
function pushNotification(pushTokens, serialNumber) { // TODO: refactor
  var options = {
    cert : __dirname + '/../etc/passbook/keys/uniba.sample.pem', /* Certificate file path */
    certData : null, /* String or Buffer containing certificate data, if supplied uses this instead of cert file path */
    key : __dirname + '/../etc/passbook/keys/key.pem', /* Key file path */
    keyData : null, /* String or Buffer containing key data, as certData */
    passphrase : "jhausb1f", /* A passphrase for the Key file */
    ca : null, /* String or Buffer of CA data to use for the TLS connection */
    // gateway: 'gateway.sandbox.push.apple.com',
    gateway : 'gateway.push.apple.com', /* gateway address */
    port : 2195, /* gateway port */
    enhanced : true, /* enable enhanced format */
    errorCallback : function(err, notification) { console.log(arguments); }, /* Callback when error occurs function(err,notification) */
    cacheLength : 100 /* Number of notifications to cache for error purposes */
  };
  
  var apnsConnection = new apns.Connection(options);
  
  for (var i = 0; i < pushTokens.length; i++) {
    var myDevice = new apns.Device(pushTokens[i]);
    var note = new apns.Notification();
    note.serialNumber = serialNumber;
    note.device = myDevice;
    apnsConnection.sendNotification(note);    
  }
}
