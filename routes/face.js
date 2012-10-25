
exports.index = function(req, res) {
  res.redirect('demo/new');
};

exports.new = function(req, res) {
  res.render('face/new', { action: 'face-new' });
};

exports.create = function(req, res) {
  // TODO: create new pass.
  var id = 'foo';
  res.redirect('/face/show/' + id);
};

exports.show = function(req, res) {
  res.render('face/show', { action: 'face-show' });
};
