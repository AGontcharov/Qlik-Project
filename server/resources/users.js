var db = require('../database.js')

module.exports = {
  
  /**
   * Creates a user resource
   * @params {String} body.username - The username
   *
   * @params {Object} req - The request object
   * @params {Object} res - The response object
   * @params {Object} next - The callback for the next matching middleware
   *
   * @returns {HTTP 500 on server error, HTTP 400 on bad request, HTTP 409 on conflict, HTTP 201 on success}
   */
  createUser: function(req, res, next) {

    // HTTP 400 Bad Request
    if (!req.body.username) return res.status(400).send('Missing username');

    // Check if user exists already
    db.query("SELECT * FROM Users WHERE Username=? LIMIT 1", req.body.username, function(err, rows, fields) {
      
      // HTTP 500 Internal
      if (err) return res.status(500).send('Server error');

      // User not created yet
      if (!rows.length) {
        db.query("INSERT INTO Users (Username) VALUES(?)", req.body.username, function(err, rows, fields) {
          
          //HTTP 500 Internal
          if (err) return res.status(500).send('Server error');

          // HTTP 201 Created
          return res.status(201).send('User created');
        });
      }

      // HTTP 409 Conflict
      else return res.status(409).send('Username already exists');
    });
  },

  /**
   * Authenticates a user credential
   * @params {String} body.username - The username
   *
   * @params {Object} req - The request object
   * @params {Object} res - The response object
   * @params {Object} next - The callback for the next matching middleware
   *
   * @returns {HTTP 500 on server error, HTTP 200 on success}
   */
  authenticateUser: function(req, res, next) {

    // HTTP 400 Bad Request
    if (!req.body.username) return res.status(400).send('Missing username');

    db.query("SELECT * FROM Users WHERE Username=? LIMIT 1", req.body.username, function(err, rows, fields) {

      // HTTP 500 Internal
      if (err) return res.status(500).send('Server error');

      // HTTP 404 Not Found
      if (!rows.length) return res.status(404).send('User does not exist');

      // HTTP 200 Ok
      return res.status(200).send('Authenticated');
    });
  },

  /**
   * Retrieves a list of user resources
   * @params {Object} req - the request object
   * @params {Object} res - the response object
   * @params {Object} next - The callback for the next matching middleware
   *
   * @returns {HTTP 500 on server error, HTTP 404 on failture, HTTP 200 {array} on success}
   */
  getUsers: function(req, res, next) {
    db.query("SELECT Username FROM Users", function(err, rows, fields) {
      
      // HTTP 500 Internal
      if (err) return res.status(500).send('Server error');

      // HTTP 404 Not Found
      if (!rows.length) return res.status(404).send('No users are registered in the system');

      // HTTP 200 Ok
      return res.status(200).send(rows);
    });
  },

  /**
   * A helper function used to retrieve the user ID
   * @params {String} body.username - The username
   *
   * @params {Object} req - The request object
   * @params {Object} res - The response object
   * @params {Object} next - The callback for the next matching middleware
   *
   * @returns {The user ID stored inside res.locals for the next middleware}
   */
  getUserID: function(req, res, next) {
    
    // HTTP 400 Bad Request
    if (!req.body.username) return res.status(400).send('Missing username');

    var username = req.body.username ? req.body.username : req.params.username;
    db.query("SELECT ID FROM Users WHERE Username=? LIMIT 1", username, function(err, rows, fields) {
      
      // HTTP 500 Internal
      if (err) return res.status(500).send('Server error');

      // HTTP 404 Not Found
      if (!rows.length) return res.status(404).send('User not found');

      // Store User ID and move to the next matching route handler
      res.locals.userID = rows[0].ID;
      next();
    });
  }
}