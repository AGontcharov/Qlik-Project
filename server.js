'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./server/routes.js');

var app = express();
var port = process.env.PORT || 3000;
var path = process.env.NODE_ENV === 'production' ? '/dist' : '/public/app';

// Set the response headers
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  next();
});

// Parse body requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Load the api router
app.use('/api', routes);

// Serves static content
app.use('/', express.static(__dirname + path));

// Serves the index file on any get request
app.get('*', function(req, res) {
  res.sendFile(__dirname + path + '/index.html');
});

// Create HTTP server
app.listen(port, function() {
  console.log('Listening on port', port);
});