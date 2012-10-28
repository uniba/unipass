
/**
 * Module dependencies.
 */

var express = require('express')
  , resource = require('express-resource')
  , namespace = require('express-namespace')
  , http = require('http')
  , https = require('https')
  , path = require('path')
  , pad = require('pad-component')
  , routes = require('./routes')
  , config = require('./config')
  , dirs = require('./config/dirs');

/**
 * Catch uncaught exceptions.
 */

process.on('uncaughtException', function(e) {
  console.error(e.message, e.stack);
});

/**
 * Create the app.
 */

var app = express();

if (config.ssl.secure) {
  var server = module.exports = https.createServer(config.ssl.options, app);
  require('./lib/redirect').listen(80);
} else {
  var server = module.exports = http.createServer(app);
}

/**
 * Configuration.
 */

app.configure(function(){
  app.set('port', config.port);
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

app.get('/', function(req, res) {
  res.redirect('/face');
});

app.namespace('/face', function() {
  app.get('/', routes.face.index);
  app.post('/', routes.face.create);
  app.get('/new', routes.face.new);
  app.get('/show/:id', routes.face.show);
});

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
  app.resource('users', routes.users);
  app.get('/notify/:serialNumber', routes.notify.index);

});

/**
 * Routes for Passbook web service.
 *
 * @see https://developer.apple.com/library/ios/#documentation/PassKit/Reference/PassKit_WebService/WebService.html
 */

app.namespace('/v1', function() {
  app.post('/log', routes.client.log);
  app.get('/passes/:identifier/:serialNumber', routes.client.show);
  app.get('/devices/:deviceId/registrations/:identifier', routes.notify.notification);
  app.post('/devices/:deviceId/registrations/:identifier/:serialNumber', routes.client.devise);
  app.del('/devices/:deviceId/registrations/:identifier/:serialNumber', routes.client.del);
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
  });
}
