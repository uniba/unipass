
/**
 * Module dependencies.
 */

var express = require('express')
  , resource = require('express-resource')
  , routes = require('./routes')
  , client = require('./routes/client')
  , users = require('./routes/user')
  , notify = require('./routes/notify')
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
app.resource('users', users);
//app.get('/passes/download/:id', routes.download);
//app.get('/sample', routes.downloadSample);
app.get('/', routes.index);
app.get('/notify/:serialNumber', notify.index);
app.get('/v1/devices/:deviceId/registrations/pass.uniba.sample', notify.notification);
// app.get('/form/show', form.show);
// app.post('/form/post',form.post)

app.get('/v1/passes/pass.uniba.sample/:serialNumber', client.show);

app.post('/v1/devices/:deviceId/registrations/pass.uniba.sample/:serialNumber', client.devise);
app.del('/v1/devices/:deviceId/registrations/pass.uniba.sample/:serialNumber', client.del);
app.post('/v1/log', client.log);

// app.get('/push/form', test_push.form);
// app.get('/push/iptoy', test_push.iptoy);
// app.post('/push/notify', test_push.notify);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});