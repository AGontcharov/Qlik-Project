var db = require('../database.js')

module.exports = {

  /**
   * Creates a message resource
   * @params {string} body.subject - Message subject
   * @params {string} body.content - Message content
   * @params {number} locals.userID - The User ID
   * @params {Object} req - The request object
   * @params {Object} res - The response object
   * @params {function} next - The callback for the next matching middleware
   * @returns {HTTP 500 on server error, HTTP 400 on bad request, HTTP 201 on success}
   */
  postMessage: function(req, res, next) {

    // HTTP 400 Bad Request
    if (!req.body.subject) return res.status(400).send('Mising subject');
    if (!req.body.content) return res.status(400).send('Missing content');
               
    var args = [res.locals.userID, req.body.subject, req.body.content];
    db.query("INSERT INTO Messages (ID, Subject, Content) VALUES (?, ?, ?)", args, function(err, rows, fields) {
      
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
   * @params {function} next - The callback for the next matching middleware
   * @returns {HTTP 500 on server error, HTTP 404 on failure, HTTP 200 on success}
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
   * @params {number} params.messageID - The Message ID
   * @params {Object} req - The request object
   * @params {Object} res - The response object
   * @params {function} next - The callback for the next matching middleware
   * @returns {HTTP 500 on server error, HTTP 404 on failure, HTTP 200 on success}
   */
  getMessageByID: function(req, res, next) {

    db.query("SELECT MessageID, Subject, Content FROM Messages WHERE MessageID=?", req.params.messageID, function(err, rows, fields) {

      // HTTP 500 Internal
      if (err) return res.status(500).send('Server error');

      // HTTP 404 Not Found
      if (!rows.length) return res.status(404).send('Message not found');

      // Check if palindrome action has been called on the message
      if (req.route.path === '/messages/:messageID(\\d+)/palindrome') {
        res.locals.palindrome = rows[0].Content;
        next();
      }

      // HTTP 200 Ok
      else return res.status(200).send(rows[0]);
    });
  },

  /**
   * Deletes a messages associated with a message ID
   * @params {number} params.messageID - The Message ID
   * @params {Object} req - The request object
   * @params {Object} res - The response object
   * @params {function} next - The callback for the next matching middleware
   * @returns {HTTP 500 on server error, HTTP 204 on success}
   */
  deleteMessageByID: function(req, res, next) {
    
    db.query("DELETE From Messages WHERE MessageID=?", req.params.messageID, function(err, rows, fields) {

      // HTTP 500 Internal
      if (err) return res.status(500).send('Server error');

      // HTTP 204 Deleted
      return res.status(204).send('Message delete');
    });
  },

  /**
   * A helper function used to check if a string is a palindrome
   * @params {string} locals.palindrome - The string to check
   * @params {Object} req - The request object
   * @params {Object} res - The response object
   * @params {function} next - The callback for the next matching middleware
   * @returns {HTTP 200 true if palindrome, HTTP 200 false otherwise}
   */
  isPalindrome: function(req, res, next) {

    // Allow validating case insentive phrases
    var palindrome = res.locals.palindrome.toUpperCase().replace(/ /g,'');
    var strlen = palindrome.length - 1;

    // Iterate over the string
    for (i = 0; i < palindrome.length; i++) {
      
      // Post decrement strlen after comparison
      if (palindrome[i] !== palindrome[strlen--]) {

        // HTTP 200k Ok False
        return res.status(200).send(false);
      }
    }

    // HTTP 200 Ok True
    return res.status(200).send(true);
  }
}