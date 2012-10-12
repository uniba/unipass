//注目 local_ip 
var local_ip = "10.4.0.54";

exports.show = function(req, res){
  serialNumber = req.params.serialNumber;
  console.log('serialNumber'+serialNumber);
  console.log(req.headers.authorization);
  createPass(res,serialNumber);
};

exports.devise = function(req, res){
  serialNumber = req.params.serialNumber;
  console.log('serialNumber:'+serialNumber);
  deviceId = req.params.deviceId;
  console.log('deviceId:'+deviceId);
  res.send(201, 'succsess');
};

exports.del = function(req, res){
  serialNumber = req.params.serialNumber;
  console.log('serialNumber:'+serialNumber);
  deviceId = req.params.deviceId;
  console.log('deviceId:'+deviceId);
  res.send(200, 'succsess');
};

exports.log = function(req, res){
  console.log(req.body)
  res.send(201, 'succsess');
};


function createPass(res,serialNumber){
    var fs = require('fs'),
    crypto = require('crypto');

    var createTemplate = require("passbook");
      
    var template = createTemplate("coupon", {
      teamIdentifier: "2226HKV4QQ",
      passTypeIdentifier: "pass.uniba.sample",
      "backgroundColor": "rgb(255,255,255)",
      organizationName: "Uniba Inc."
    });

    template.keys("./etc/passbook/keys", "1q2w3e4r");
    
    //注目 authenticationToken
    var authenticationToken = crypto.randomBytes(48).toString('hex');
    
    //注目 authenticationToken webServiceURL
    var passbook = template.createPassbook({
      serialNumber:  serialNumber,
      logoText: "いいい",
      webServiceURL : "http://"+local_ip+":3000/",
      authenticationToken : authenticationToken,
    });

    passbook.images.icon = './public/images/icon.png';
    passbook.images.logo = './public/images/logo.png';

    passbook.generate(function(error, buffer) {
      if (error) {
        console.log(error);
      } else {
        fs.writeFile("./public/"+serialNumber+".pkpass", buffer);
        console.log('write');
        //注目  
        sendFile(res,serialNumber);
      }
    });
}

function sendFile(res,serialNumber){
  var fs = require('fs')
  , path = require('path');
  //注目 serialNumber
  var file = './public/'+serialNumber+'.pkpass'
    , filename = path.basename(file)
    , mimetype = 'application/vnd.apple.pkpass';

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