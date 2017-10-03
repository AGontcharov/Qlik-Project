var express = require('express');
var users = require('./resources/users.js');
var messages = require('./resources/messages.js');
	
// Create api router
var apiRouter = express.Router();

// Router middleware for every request. 
apiRouter.use(function(req, res, next) {
  console.log(req.method, req.url);
  console.log(req.body);
  next();
});

// Base API should return all the endpoints
apiRouter.get('/', function(req, res, next) {
  res.status(200).send('API base');
});

// Users endpoints
apiRouter.post('/users', users.createUser);
apiRouter.get('/users', users.getUsers);
apiRouter.post('/users/login', users.authenticateUser);

// Messages endpoints
apiRouter.post('/messages', users.getUserID, messages.postMessage);
apiRouter.get('/messages', messages.getMessages);
// apiRouter.get('/messages/users/:username', users.getUserID, messages.getMessages);
apiRouter.get('/messages/:messageID(\\d+)', messages.getMessageByID);
apiRouter.delete('/messages/:messageID(\\d+)', messages.deleteMessageByID);
apiRouter.get('/messages/:messageID(\\d+)/palindrome', messages.getMessageByID, messages.isPalindrome);

// Default route for requests not matched above
apiRouter.use(function(req, res) {
    res.status(404).end('Resource not found');
});

module.exports = apiRouter;