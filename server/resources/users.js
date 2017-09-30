var db = require('../database.js')

module.exports = {
  
  createUser: function(req, res, next) {

    // Check if user exists already
    db.query("SELECT * FROM Users WHERE Username=? LIMIT 1", req.body.username, function(err, rows, fields) {
      
      // HTTP 500 Internal
      // if (err) return res.status(500).send('Server error');
      if (err) throw err;

      // User not created yet
      if (!rows.length) {
        db.query("INSERT INTO Users (Username) VALUES(?)", req.body.username, function(err, rows, fields) {
          
          //HTTP 500 Internal
          // if (err) return res.status(500).send('Server error');
          if (err) throw err;

          // HTTP 201 Created
          return res.status(201).send('User created');
        });
      }

      // HTTP 409 Conflict
      else return res.status(409).send('Username already exists');
    });
  },

  getUsers: function(req, res, next) {

    db.query("SELECT Username FROM Users", function(err, rows, fields) {
      
      // HTTP 500 Internal
      // if (err) return res.status(500).send('Server error');
      if (err) throw err;

      // HTTP 404 Not Found
      if (!rows.length) return res.status(404).send('No users are registered in the system');

      // HTTP 200 Ok
      return res.status(200).send(rows);
    });
  },

  getUserID: function(req, res, next) {

    var username = req.body.username ? req.body.username : req.params.username;
    db.query("SELECT ID FROM Users WHERE Username=? LIMIT 1", username, function(err, rows, fields) {
      
      // HTTP 500 Internal
      // if (err) return res.status(500).send('Server error');
      if (err) throw err;

      // HTTP 404 Not Found
      if (!rows.length) return res.status(404).send('User not found');

      // Store User ID and move to the next matching route handler
      res.locals.userID = rows[0].ID;
      console.log(res.locals.userID);
      next();
    });
  }
}