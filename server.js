// Load and initialize express
var express = require('express');
var app = express();

// Load body parser to parse requests
var bodyParser = require('body-parser');

// Configure the port which the app is ran
var port = 7000;

// Set the response headers
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  next();
});

// Parse JSON from body on requests
app.use(bodyParser.json());

// Disable posting nested objets
app.use(bodyParser.urlencoded({ extended: false }));

// Load the api router
var api = require('./server/endpoints.js');
app.use('/api', api);

// Serves static contents from the /public folder
app.use('/', express.static(__dirname + '/public'));

// Serves the index file on any get request
app.get('*', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

// Create HTTP server
app.listen(port, function() {
  console.log("Listening on port " + port);
});