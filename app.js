
/**
 * Module dependencies.
 */

var express = require('express')
  , resource = require('express-resource')
  , namespace = require('express-namespace')
  , routes = require('./routes')
  , face = require('./routes/face')
  , client = require('./routes/client')
  , users = require('./routes/users')
  , notify = require('./routes/notify')
  , http = require('http')
  , https = require('https')
  , path = require('path')
  , pad = require('pad-component')
  , env = require('./config/env') 
  , dirs = require('./config/dirs')
  , fs = require('fs');

/**
 * Catch uncaught exceptions.
 */

process.on('uncaughtException', function(e) {
  console.error(e.message, e.stack);
});

/**
 * Create the app.
 */
var options = {
  key: fs.readFileSync(path.join(__dirname, 'etc/server/server.key')),
  cert: fs.readFileSync(path.join(__dirname, 'etc/server/server.crt'))
};

var app = express()
  , server = module.exports = https.createServer(options, app);

/**
 * Configuration.
 */

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

app.locals.title = 'Unipass';

app.configure('development', function(){
  app.use(express.errorHandler());
});

/**
 * Routes for demonstration.
 */

app.resource('/demos', face);
app.namespace('/face',function(){
  app.get('/', face.index);
  app.post('/', face.create);
  app.get('/new', face.new);
  app.get('/show/:id',face.show);
})
/**
 * Routes for reader.
 */

app.namespace('/reader', function() {
  // TODO: add routes.
});

/**
 * Routes for administration.
 */

app.namespace('/admin', function() {
  app.get('/', routes.index);
  app.resource('passes', routes);
  app.resource('users', users);
  app.get('/notify/:serialNumber', notify.index);

});

/**
 * Routes for Passbook web service.
 *
 * @see https://developer.apple.com/library/ios/#documentation/PassKit/Reference/PassKit_WebService/WebService.html
 */

app.namespace('/v1', function() {
  app.post('/log', client.log);
  app.get('/devices/:deviceId/registrations/pass.uniba.sample', notify.notification);
  app.get('/passes/pass.uniba.sample/:serialNumber', client.show);
  app.post('/devices/:deviceId/registrations/pass.uniba.sample/:serialNumber', client.devise);
  app.del('/devices/:deviceId/registrations/pass.uniba.sample/:serialNumber', client.del);
});

/**
 * Show all routes.
 */

Object.keys(app.routes).forEach(function(method) {
  app.routes[method].forEach(function(route) {
    console.log(' \033[33m%s\033[0m : \033[90m%s\033[0m', pad.left(route.method.toUpperCase(), 6), route.path);
  });
});

/**
 * Boot.
 */

if (!module.parent) {
  server.listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
    console.log("config/env.js。 あなたのPCのドメインと一致しているか確認して下さい。: " + env );
  });
}
