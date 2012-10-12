
/**
 * Module dependencies.
 */


exports.show = function(req, res){
  //console.log(req.params.id)
  console.log("aaaaa")
  res.render('form/form', { title: 'form'});
};

exports.post = function(req, res){
  console.log(req.body.value); // for logging
  res.redirect('form/post');
};