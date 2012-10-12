
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , form = require('./routes/form')
  , test_routing = require('./routes/test_routing')
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

app.get('/passes', routes.index);
app.post('/passes', routes.create);
app.get('/passes/new', routes.new);
app.get('/passes/:id', routes.show);

app.get('/passes/download/:id', routes.download);
app.get('/', routes.index);


app.get('/form/show', form.show);
app.post('/form/post',form.post)

app.get('/v1/passes/pass.uniba.sample/:serialNumber', test_routing.show);
app.post('/v1/devices/:deviceId/registrations/pass.uniba.sample/:serialNumber', test_routing.devise);
app.del('/v1/devices/:deviceId/registrations/pass.uniba.sample/:serialNumber', test_routing.delete);
app.post('/v1/log', test_routing.log);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});