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

// Messages endpoints
apiRouter.post('/messages', users.getUserID, messages.postMessage);
apiRouter.get('/messages', messages.getMessages);
// apiRouter.get('/messages/users/:username', users.getUserID, messages.getMessages);

// Do I need username here?
apiRouter.get('/messages/:messageID', messages.getMessageByID);
apiRouter.delete('/messages/:messageID', messages.deleteMessageByID);

// apiRouter.get('/messages/:messageID/palindrome', );

module.exports = apiRouter;