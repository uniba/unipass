
exports.index = function(req, res) {
  res.render('face/index');
};

exports.new = function(req, res) {
  res.render('face/new');
};

exports.create = function(req, res) {
  // TODO: create new pass.
  var id = 'foo';
  res.redirect('/face/show/' + id);
};

exports.show = function(req, res) {
  res.render('face/show');
};