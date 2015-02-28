/**
 * @fileOverview Server configuration and initialization
 */

/* jshint ignore:start */

// modules
// =======
var express = require('express');
var http = require('http');
var app = express();
var server = http.Server(app);

// configuration
// =============
var port = process.env.PORT || 1337;

// set the static files location
app.use(express.static(__dirname + '/web'));

// pass application into routes
require('./app/routes')(app);

// start the app
server.listen(port);
console.log('Site on port ' + port);

// expose app
exports = module.exports = app;

/* jshint ignore:end */