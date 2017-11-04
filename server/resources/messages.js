'use strict';

var db = require('../database.js');
var palindrome = require('../palindrome.js');

module.exports = {

  /**
   * Creates a message resource
   * @params {String} body.subject - Message subject
   * @params {String} body.content - Message content
   * @params {Number} locals.userID - The User ID
   *
   * @params {Object} req - The request object
   * @params {Object} res - The response object
   * @params {Object} next - The callback for the next matching middleware
   *
   * @returns {HTTP 500 on server error, HTTP 400 on bad request, HTTP 201 on success}
   */
  postMessage: function(req, res, next) {

    // HTTP 400 Bad Request
    if (!req.body.subject) return res.status(400).send('Missing subject');
    if (!req.body.content) return res.status(400).send('Missing content');
               
    var args = [
      res.locals.userID,
      req.body.subject,
      req.body.content,
      palindrome(req.body.content)
    ];
    
    db.query("INSERT INTO Messages (ID, Subject, Content, Palindrome) VALUES (?, ?, ?, ?)", args, function(err, rows, fields) {
      
      // HTTP 500 Internal
      if (err) return res.status(500).send('Server error');

      // HTTP 201 Created
      return res.status(201).send('Message submitted');
    });
  },

  /**
   * Retrives a list of messages ordered by time
   * @params {Object} req - The request object
   * @params {Object} res - The response object
   * @params {Object} next - The callback for the next matching middleware
   *
   * @returns {HTTP 500 on server error, HTTP 404 on failure, HTTP 200 {array} on success}
   */
  getMessages: function(req, res, next) {

    db.query("SELECT * FROM Messages INNER JOIN Users on Messages.ID = Users.ID ORDER BY MessageID", function(err, rows, fields) {
      
      // HTTP 500 Internal
      if (err) return res.status(500).send('Server error');

      // HTTP 404 Not Found
      if (!rows.length) return res.status(404).send('Messages not found');

      // HTTP 200 Okay
      return res.status(200).send(rows);
    });
  },

  /**
   * Retrives a messages associated with a message ID
   * @params {Number} params.messageID - The Message ID
   *
   * @params {Object} req - The request object
   * @params {Object} res - The response object
   * @params {Object} next - The callback for the next matching middleware
   *
   * @returns {HTTP 500 on server error, HTTP 404 on failure, HTTP 200 {array} on success}
   */
  getMessageByID: function(req, res, next) {

    db.query("SELECT MessageID, Subject, Content, Palindrome FROM Messages WHERE MessageID=?", req.params.id, function(err, rows, fields) {

      // HTTP 500 Internal
      if (err) return res.status(500).send('Server error');

      // HTTP 404 Not Found
      if (!rows.length) return res.status(404).send('Message not found');

      // HTTP 200 Ok
      return res.status(200).send(rows[0]);
    });
  },

  /**
   * Deletes a messages associated with a message ID
   * @params {Number} params.messageID - The Message ID
   *
   * @params {Object} req - The request object
   * @params {Object} res - The response object
   * @params {Object} next - The callback for the next matching middleware
   *
   * @returns {HTTP 500 on server error, HTTP 204 on success}
   */
  deleteMessageByID: function(req, res, next) {
    
    db.query("DELETE From Messages WHERE MessageID=?", req.params.id, function(err, rows, fields) {

      // HTTP 500 Internal
      if (err) return res.status(500).send('Server error');

      // HTTP 204 Deleted
      return res.status(204).send('Message delete');
    });
  }
};