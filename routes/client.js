
/**
 * Module dependencies.
 */

var util = require('util')
  , fs = require('fs')
  , path = require('path')
  , debug = require('debug')('unipass:app:client')
  , base64id = require('base64id')
  , helpers = require('../lib/helpers')
  , template = require('../lib/template')
  , models = require('../models')
  , Pass = models.Pass
  , User = models.User;

/**
 * GET
 */

exports.show = function(req, res) {
  var serialNumber = req.params.serialNumber;
  
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
};


/**
 * POST
 */

exports.create = function(req, res) {
  var deviceId = req.params.deviceId
    , serialNumber = req.params.serialNumber
    , authenticationToken = req.headers.authorization.split(' ')[1]
    , pushToken = req.body.pushToken;
  
  Pass.findOne({ serialNumber: serialNumber }, function(err, pass) {
    if (err) {
      return res.send(500);
    }
    
    var user = new User({
        _passbook: pass._id
      , deviceId: deviceId
      , pushToken: pushToken
      , authenticationToken: authenticationToken
    });
    
    user.save(function(err, user) {
      if (err) {
        return res.send(500);
      }
      
      if (pass._users.indexOf(user._id) > -1) {
        return res.send(200, 'the serial number is already registered for this device');
      }

      pass._users.push(user._id);
      pass.save(function(err, user) {
        if (err) {
          return res.send(500);
        }
        res.send(201, 'registration succeeds');
      });
    });
  });
};

/**
 * DELETE
 */

exports.delete = function(req, res) {
  var deviceId = req.params.deviceId
    , serialNumber = req.params.serialNumber
    , authenticationToken = req.headers.authorization;
  
  User.findOne({ deviceId: deviceId }, function(err, user) {
    if (err) {
      return res.send(500);
    } else if (!user) {
      return res.send(401,'the request is not authorized');
    }
    
    user.deviceId = ''; // TODO:
    
    user.save(function(err, user) {
      if (err) {
        return res.send(500);
      }
      res.send(200, 'disassociation succeeds,');
    });
  });
};

/**
 * POST
 */

exports.log = function(req, res) {
  var logs = req.body.logs;
  
  logs && logs.forEach(function(log, index) {
    debug(log);
  });
  
  res.send(201, 'succsess');
};