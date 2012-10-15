//注目 local_ip
var local_ip = "10.4.0.54";
var util = require('util');

exports.show = function(req, res) {
  reqLog(req);
  createPass(res, req.params.serialNumber);
};

exports.devise = function(req, res) {
  reqLog(req);
  res.send(201, 'succsess');
}; 

exports.del = function(req, res) {
  reqLog(req);
  res.send(200, 'succsess');
};

exports.log = function(req, res) {
  //console.log(req.body)
  //reqLog(req);
  res.send(201, 'succsess');
};

exports.notification = function(req, res) {
  console.log('passesUpdatedSince:'+util.inspect(req.query));
  var update = new Date();
  
  data = {
    lastUpdated:update,
    serialNumbers:["aaa12tlj4525"]
    }
  res.send(200, JSON.stringify(data));
};
function reqLog(req){
  console.log('serialNumber:' + req.params.serialNumber);
  console.log('deviceId:' + req.params.deviceId);
  console.log('authorization:'+req.headers.authorization);
  console.log('pushToken:'+req.body.pushToken);
  //console.log('req:' + util.inspect(req, true, null));
}

function createPass(res, serialNumber) {
  var fs = require('fs'), crypto = require('crypto'), createTemplate = require("passbook");

  var template = createTemplate("coupon", {
    teamIdentifier : "2226HKV4QQ",
    passTypeIdentifier : "pass.uniba.sample",
    backgroundColor : "rgb(200,200,255)",
    organizationName : "Uniba Inc."
  });

  template.keys("./etc/passbook/keys", "1q2w3e4r");

  //注目 authenticationToken
  var authenticationToken = crypto.randomBytes(48).toString('hex');

  //注目 authenticationToken webServiceURL
  var passbook = template.createPassbook({
    serialNumber : serialNumber,
    description : "uniba",
    logoText : "uniba new",
    webServiceURL : "http://" + local_ip + ":3000/",
    authenticationToken : authenticationToken//z,
    /*locations : [{
      "longitude" : 139.70502,
      "latitude" : 35.663411
    }]*/
  });

  passbook.images.icon = './public/images/icon.png';
  passbook.images.logo = './public/images/logo.png';

  passbook.generate(function(error, buffer) {
    if (error) {
      console.log('error:' + error);
    } else {
      fs.writeFile("./public/" + serialNumber + ".pkpass", buffer);
      console.log('write');
      //注目
      sendFile(res, serialNumber);
    }
  });
}

function sendFile(res, serialNumber) {
  var fs = require('fs'), path = require('path');
  //注目 serialNumber
  var file = './public/' + serialNumber + '.pkpass', filename = path.basename(file), mimetype = 'application/vnd.apple.pkpass';

  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
  res.setHeader('Content-type', mimetype);

  var filestream = fs.createReadStream(file);
  filestream.on('data', function(chunk) {
    res.write(chunk);
  });
  filestream.on('end', function() {
    res.end();
  });
  console.log('send');
}