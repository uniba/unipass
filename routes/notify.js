var models = require('../models')
  , Pass = models.Pass
  , User = models.User
  , util = require('util')
  , apns = require('apn');
  
exports.index = function(req, res) {
  var serialNumber = req.params.serialNumber,
    pushTokens = [];
  
  Pass.findOne({ serialNumber: serialNumber }).populate('_users').exec(function (err, pass) {
    console.log('pass:' + pass);
    for (var i = 0; i < pass._users.length; i++) {
      if(pushTokens.indexOf(pass._users[i].pushToken) == -1) {
        pushTokens.push(pass._users[i].pushToken);
      }
    }
    console.log('pushTokens:'+pushTokens);
    pushNotification(pushTokens,serialNumber);
  })
  res.redirect('/admin');
}
//https://github.com/argon/node-apn
function pushNotification(pushTokens, serialNumber) {
  var options = {
    cert : './etc/passbook/keys/uniba.sample.pem', /* Certificate file path */
    certData : null, /* String or Buffer containing certificate data, if supplied uses this instead of cert file path */
    key : './etc/passbook/keys/key.pem', /* Key file path */
    keyData : null, /* String or Buffer containing key data, as certData */
    passphrase : "jhausb1f", /* A passphrase for the Key file */
    ca : null, /* String or Buffer of CA data to use for the TLS connection */
    //gateway.sandbox.push.apple.com
    gateway : 'gateway.push.apple.com', /* gateway address */
    port : 2195, /* gateway port */
    enhanced : true, /* enable enhanced format */
    errorCallback : errorCall, /* Callback when error occurs function(err,notification) */
    cacheLength : 100 /* Number of notifications to cache for error purposes */
  };
  var apnsConnection = new apns.Connection(options);
  for (var i = 0; i < pushTokens.length; i++) {
    var myDevice = new apns.Device(pushTokens[i]);
    var note = new apns.Notification();
    //TODO serialNumber 
    note.serialNumber = serialNumber;
    note.device = myDevice;
    apnsConnection.sendNotification(note);    
  }
};

function errorCall(err, notification){
  console.log('err:' + err);
  console.log('notification:' + notification);  
}

exports.notification = function(req, res) {
  var deviceId = req.params.deviceId;
  console.log('notification----------------------------');
  reqLog(req);
  
  User.findOne({ deviceId: deviceId }).populate('_passbook').exec(function (err, user) {
    if (err){
      return res.send(404,'error');
    }
    var updated = user._passbook.updated;
    data = {
      lastUpdated : updated,
      serialNumbers : [user._passbook.serialNumber]
    };
    res.send(200, JSON.stringify(data));
  });
};
 
function reqLog(req) {
  console.log('serialNumber:' + req.params.serialNumber);
  console.log('deviceId:' + req.params.deviceId);
  console.log('authorization:' + req.headers.authorization);
  console.log('pushToken:' + req.body.pushToken);
}