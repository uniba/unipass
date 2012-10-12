
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , form = require('./routes/form')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/form', form.index);
app.post('/post',form.post)

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var createTemplate = require("passbook")
  , fs = require('fs');

var template = createTemplate("coupon", {
  teamIdentifier: "2226HKV4QQ",
  passTypeIdentifier: "pass.uniba.sample",
  organizationName: "Uniba Inc."
});

template.keys("./etc/passbook/keys", "1q2w3e4r");

var serialNumber = "123456";
var passbook = template.createPassbook({
  "backgroundColor": "rgb(255,255,255)",
  description: "20% off",
  serialNumber: serialNumber,
  logoText: "Ye!",
  barcode:{
    message:"message",
    format : "PKBarcodeFormatPDF417",
    messageEncoding : "iso-8859-1"
  }
});

passbook.images.icon = './public/images/icon.png';
passbook.images.logo = './public/images/logo.png';

passbook.generate(function(error, buffer) {
  if (error) {
    console.log(error);
  } else {
    fs.writeFile("passbook.pkpass", buffer);
  }
});
