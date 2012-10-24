var util = require('util');
var base64id = require('base64id')
  , fs = require('fs')
  , helpers = require('../lib/helpers')
  , path = require('path')
  , template = require('../lib/template')
  , schema = require('../models')
  , Pass = schema.Pass
  , User = schema.User;;

exports.show = function(req, res) {
  console.log('show----------------------------');
  reqLog(req);
  var serialNumber = req.params.serialNumber;
  sendPkpass(serialNumber, res);
};


//post devise情報をpost
exports.devise = function(req, res) {
  console.log('devise----------------------------');
  
  reqLog(req);
  
  var deviceId = req.params.deviceId,
    serialNumber = req.params.serialNumber,
    authenticationToken = req.headers.authorization.replace(/ApplePass/,'').trim(),
    pushToken = req.body.pushToken;
  
  Pass.findOne({ serialNumber: serialNumber }, function(err, pass) {
    console.log(pass);
    
    var user = new User({
      _passbook:pass._id,
      deviceId:deviceId,
      pushToken:pushToken,
      authenticationToken:authenticationToken
    });
    
    console.log(user);
    
    user.save(function(err, user) {
      if (err) return console.log(err);
      
      if (pass._users.indexOf(user._id) == -1) {
        pass._users.push(user._id);
        console.log('user._id:'+user._id);
        pass.save(function(err, user) {
          if (err) return console.log(err);
          res.send(201, 'registration succeeds');
        });
      } else {
        res.send(200, 'the serial number is already registered for this device');
      }
    });
  });
};

// /v1/devices/5cb9371598cf8c76211a611d368b71d8/registrations/pass.uniba.sample/E-6NWW0hd-3I23pFAAAA
// serialNumber:E-6NWW0hd-3I23pFAAAA
// deviceId:5cb9371598cf8c76211a611d368b71d8
// authorization:ApplePass f940cc8e3a106dbba04671cd580c85865730b64bb3064c08a969b0d7ab84ff7a540a6bd5f37d11bf4c65867031b4c9fe

exports.del = function(req, res) {
  console.log('del----------------------------');
  
  reqLog(req);
  
  var deviceId = req.params.deviceId,
    serialNumber = req.params.serialNumber,
    authenticationToken = req.headers.authorization;
  
  User.findOne({ deviceId: deviceId }, function(err, user) {
    console.log(user);
    if (user) {
      user.deviceId = '';
      user.save(function(err,user) {
        if (err) return console.log(err);
        res.send(200, 'disassociation succeeds,');
      });
    } else {
      res.send(401,'the request is not authorized');
    }
  });
  
  res.send(200, 'succsess');
};

exports.log = function(req, res) {
  console.log('log----------------------------');
  console.log(res.body);
  reqLog(req);
  res.send(201, 'succsess');
};


function reqLog(req) {
  console.log('serialNumber:' + req.params.serialNumber);
  console.log('deviceId:' + req.params.deviceId);
  console.log('authorization:' + req.headers.authorization);
  console.log('pushToken:' + req.body.pushToken);
}

function sendPkpass(serialNumber, res) {
  Pass.findBySerialNumber(serialNumber, function(err, pass) {
    if (err) {
      // TODO: handle error
      return res.send(500);
    }

    var filePath = helpers.joinRoot('public/passes/' + pass.serialNumber + '.pkpass')
      , filename = path.basename(filePath);
    
    res.setHeader('Content-disposition', 'attachment; filename=' + filename);
    res.setHeader('Content-type', 'application/vnd.apple.pkpass');
    res.sendfile(filePath);
  });
}