var apns = require('apn');

exports.form = function(req, res) {
  res.render('test_push/form', {
    title : 'test_push'
  });
};

exports.notify = function(req, res) {
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
  var myDevice = new apns.Device(req.body.pushToken);
  var note = new apns.Notification();
  //TODO serialNumber 
  note.serialNumber = "aaa12aaaadsadgjtwpm";
  note.device = myDevice;

  apnsConnection.sendNotification(note);
  console.log('pushToken:' + req.body.pushToken);
  res.redirect('push/form');
};

function errorCall(err, notification){
  console.log('err:' + err);
  console.log('notification:'+notification);
}
