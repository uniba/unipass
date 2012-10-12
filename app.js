
/**
 * Module dependencies.
 */

var express = require('express')
  , resource = require('express-resource')
  , routes = require('./routes')
  , form = require('./routes/form')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
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

app.resource('passes', routes);
app.get('/passes/download/:id', routes.download);
app.get('/', routes.index);

app.get('/form', form.index);
app.post('/post', form.post);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});