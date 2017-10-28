'use strict';

var express = require('express');
var users = require('./resources/users.js');
var messages = require('./resources/messages.js');
	
// Create api router
var apiRouter = express.Router();

// Router middleware for every request
apiRouter.use(function(req, res, next) {
  console.log(req.method, req.url);
  console.log(req.body);
  next();
});

// Base API should return information on the endpoints
apiRouter.get('/', function(req, res, next) {
  res.status(200).send({ version: '1.0', documentation: 'https://github.com/AGontcharov/Qlik-Project' });
});

// Users endpoints
apiRouter.post('/users', users.createUser);
apiRouter.get('/users', users.getUsers);
apiRouter.post('/users/login', users.authenticateUser);

// Messages endpoints
apiRouter.post('/messages', users.getUserID, messages.postMessage);
apiRouter.get('/messages', messages.getMessages);

// Match positive integers for these routes
apiRouter.get('/messages/:messageID(\\d+)', messages.getMessageByID);
apiRouter.delete('/messages/:messageID(\\d+)', messages.deleteMessageByID);
apiRouter.get('/messages/:messageID(\\d+)/palindrome', messages.getMessageByID, messages.isPalindrome);

// Default response for requests not matched above
apiRouter.use(function(req, res) {
  res.status(404).end('Resource not found');
});

module.exports = apiRouter;