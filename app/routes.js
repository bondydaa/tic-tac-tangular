/**
 * @fileOverview App route creation
 */

module.exports = function(app) { // jshint ignore:line
 app.get('/', function(req, res) {
 res.sendFile(__dirname + '/web/index.html');
 });

};