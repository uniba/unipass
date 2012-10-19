var schema = require('../models')
,User = schema.User
,helpers = require('../lib/helpers')
,template = require('../lib/template');

exports.index = function(req, res){

  User.find({}, function(err, users) {
    res.render('user', { title: 'User List', users: users});
  });
};