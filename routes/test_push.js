var apns = require('apn');

exports.form = function(req, res) {
  console.log('aaaaa')
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
  var myDevice = new apns.Device(req.body.devise_id);
  var note = new apns.Notification();

  // note.expiry = Math.floor(Date.now() / 1000) + 3600;
  // // Expires 1 hour from now.
  // note.badge = 3;
   note.sound = "ping.aiff";
   note.alert = "You have a new message";
  // note.payload = {};
  note.serialNumber = "aaa12tlj4525";
  note.device = myDevice;

  apnsConnection.sendNotification(note);
  console.log('devise_id:'+req.body.devise_id)
  res.redirect('push/form');
};
function errorCall(err,notification){
  console.log('err:'+err);
  console.log('notification:'+notification);  
}
