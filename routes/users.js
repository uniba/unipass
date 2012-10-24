var models = require('../models')
  , User = models.User
  , helpers = require('../lib/helpers')
  , template = require('../lib/template');

exports.index = function(req, res) {
  User
    .find()
    .sort('-created')
    .populate('_passbook')
    .exec(function(err, users) {
      if (err) {
        return res.send(500);
      }
      res.render('admin/users/index', { title: 'User List', users: users });
    });
};