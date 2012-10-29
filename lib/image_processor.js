//TODO pngを正しく変換する必要があるかもしれないけどとりあえず、
//jpeg のformatに .pngの名前をつける

var base64id = require('base64id')
  , fs = require('fs');

module.exports = function (imageObj, callback){
  var ext = imageObj.type.match(/\/\w*/)[0].replace(/\//, '.');
  var fromPath = imageObj.path;
  var fileName = base64id.generateId() + '.png';
  var toPath = __dirname + '/../public/images/passImages/' + fileName;
  fs.rename(fromPath, toPath, function(err) {
    if (err) {
      throw err;
    }
    //return fileName;
    return callback(fileName);
  }); 
};
